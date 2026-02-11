import { useParams, useLocation } from 'wouter';
import { useMemo, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { type SanityKnife } from '@shared/sanity';
import { getCardImageUrl, getFullImageUrl, getFileUrl } from '@/lib/sanityImage';
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, Play, Image as ImageIcon } from 'lucide-react';
import '../dbraguim.css';

export default function KnifePage() {
  const params = useParams();
  const slug = params.slug;
  const [, navigate] = useLocation();
  const { language, t } = useLanguage();
  
  // Controle de Mídia
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false); // Toggle entre Video e Foto

  // Controle do Form
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  
  const contactMutation = trpc.contact.submit.useMutation();
  const { data: sanityKnives, isLoading } = trpc.sanity.getKnives.useQuery();

  const knife = useMemo(() => {
    if (!sanityKnives || !slug) return null;

    const foundSanityKnife = sanityKnives.find((k: SanityKnife) => {
      const currentSlug = k.slug?.current || k.name.toLowerCase().trim().replace(/\s+/g, '-');
      return currentSlug === slug;
    });

    if (!foundSanityKnife) return null;

    const sanityImages = foundSanityKnife.images?.map((img: any) => ({
      cardUrl: getCardImageUrl(img),
      fullUrl: getFullImageUrl(img),
      raw: img 
    })) || [];

    return {
      name: foundSanityKnife.name,
      // Array de URLs das imagens Full
      fullImages: sanityImages.map(i => i.fullUrl),
      video_mp4: getFileUrl(foundSanityKnife.video),
      video_poster: getFileUrl(foundSanityKnife.videoPoster),
      category: foundSanityKnife.category,
      status: foundSanityKnife.status,
      description_pt: foundSanityKnife.description_pt,
      description_en: foundSanityKnife.description_en,
      specs: [
        { label: language === 'pt' ? 'Modelo' : 'Model', value: foundSanityKnife.model },
        { label: language === 'pt' ? 'Aço' : 'Steel', value: language === 'pt' ? foundSanityKnife.steel_pt : foundSanityKnife.steel_en },
        { label: language === 'pt' ? 'Empunhadura' : 'Handle', value: language === 'pt' ? foundSanityKnife.handle_pt : foundSanityKnife.handle_en },
        { label: language === 'pt' ? 'Comprimento' : 'Length', value: foundSanityKnife.length },
        { label: language === 'pt' ? 'Espessura' : 'Thickness', value: foundSanityKnife.thickness },
        { label: language === 'pt' ? 'Largura' : 'Width', value: foundSanityKnife.width },
      ].filter(spec => spec.value)
    };
  }, [sanityKnives, slug, language]);

  // Navegação de Imagens (Setinhas)
  const nextImage = () => {
    if (!knife) return;
    setCurrentImageIndex((prev) => (prev + 1) % knife.fullImages.length);
    setShowVideo(false); // Se mudar foto, sai do vídeo
  };

  const prevImage = () => {
    if (!knife) return;
    setCurrentImageIndex((prev) => (prev - 1 + knife.fullImages.length) % knife.fullImages.length);
    setShowVideo(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!knife) return;

    try {
      await contactMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        message: language === 'pt'
          ? `Me interessei pela faca ${knife.name}, gostaria de mais informações.`
          : `I'm interested in the ${knife.name} knife, I would like more information.`,
      });
      toast.success(language === 'pt' ? 'Mensagem enviada com sucesso!' : 'Message sent successfully!');
      setTimeout(() => {
        setShowEmailForm(false);
        setFormData({ name: '', email: '' });
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(language === 'pt' ? 'Erro ao enviar mensagem.' : 'Error sending message.');
    }
  };

  if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center text-[var(--muted)]">Carregando...</div>;

  if (!knife) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
        <h2 className="text-white text-xl">Faca não encontrada</h2>
        <button onClick={() => navigate('/portfolio')} className="px-6 py-2 border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black transition">
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto px-4 max-w-[1600px] pt-24 pb-20">
        
        {/* Botão Voltar (Mobile apenas, no Desktop fica no layout) */}
        <button 
          onClick={() => navigate('/portfolio')} 
          className="lg:hidden text-[var(--muted)] hover:text-[var(--gold)] mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em]"
        >
          ← {language === 'pt' ? 'Voltar' : 'Back'}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* --- COLUNA ESQUERDA: Mídia Grande (7 colunas) --- 
              Sticky: Fica parada enquanto rola a direita
          */}
          <div className="lg:col-span-7 lg:sticky lg:top-24 h-[50vh] lg:h-[calc(100vh-8rem)] bg-[#050505] border border-[var(--line)] rounded-sm overflow-hidden relative group">
            
            {/* Visualizador */}
            {showVideo && knife.video_mp4 ? (
              <video 
                src={knife.video_mp4} 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
                poster={knife.video_poster || undefined}
              />
            ) : (
              <img 
                src={knife.fullImages[currentImageIndex]} 
                alt={knife.name}
                className="w-full h-full object-contain p-4 lg:p-8 transition-transform duration-700 hover:scale-105"
              />
            )}

            {/* Navegação (Setas) - Só mostra se não estiver vendo vídeo e tiver mais de 1 foto */}
            {!showVideo && knife.fullImages.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-[var(--gold)] hover:text-black transition-all opacity-0 group-hover:opacity-100">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-[var(--gold)] hover:text-black transition-all opacity-0 group-hover:opacity-100">
                  <ChevronRight size={24} />
                </button>
                {/* Contador discreto */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[var(--muted)] text-xs tracking-widest bg-black/50 px-3 py-1 rounded-full">
                  {currentImageIndex + 1} / {knife.fullImages.length}
                </div>
              </>
            )}

            {/* Botão Flutuante: Trocar Foto/Vídeo */}
            {knife.video_mp4 && (
              <button 
                onClick={() => setShowVideo(!showVideo)}
                className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-sm border border-[var(--line)] text-white px-4 py-2 rounded-full hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all text-xs uppercase tracking-widest"
              >
                {showVideo ? (
                  <> <ImageIcon size={14} /> {language === 'pt' ? 'Ver Fotos' : 'Photos'} </>
                ) : (
                  <> <Play size={14} /> {language === 'pt' ? 'Ver Vídeo' : 'Video'} </>
                )}
              </button>
            )}
          </div>

          {/* --- COLUNA DIREITA: Conteúdo (5 colunas) --- */}
          <div className="lg:col-span-5 flex flex-col gap-10 lg:pl-8">
            
            {/* Header Texto */}
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/portfolio')} 
                className="hidden lg:flex text-[var(--muted)] hover:text-[var(--gold)] items-center gap-2 text-xs uppercase tracking-[0.2em] mb-8 transition-colors"
              >
                ← {language === 'pt' ? 'Voltar ao Portfolio' : 'Back to Portfolio'}
              </button>

              <span className="text-[var(--gold)] uppercase tracking-[0.2em] text-xs font-bold block">
                D.Braguim Custom Knives
              </span>
              <h1 className="text-5xl lg:text-6xl font-playfair text-white leading-none">
                {knife.name}
              </h1>
              
              <div className="flex items-center gap-4">
                <div className={`inline-flex items-center px-4 py-1.5 rounded-full border text-xs uppercase tracking-widest font-medium
                  ${knife.status === 'available' 
                    ? 'border-green-500/30 text-green-400 bg-green-900/10' 
                    : 'border-red-500/30 text-red-400 bg-red-900/10'}`}>
                  {knife.status === 'available' 
                    ? (language === 'pt' ? 'Disponível' : 'Available')
                    : (knife.status === 'sold' 
                        ? (language === 'pt' ? 'Vendida' : 'Sold') 
                        : (language === 'pt' ? 'Sob Encomenda' : 'Made to Order'))}
                </div>
                <span className="text-[var(--muted)] text-sm font-light uppercase tracking-wider">
                  {knife.category}
                </span>
              </div>
            </div>

            {/* Descrição */}
            <div className="text-[var(--muted)] leading-relaxed text-lg font-light">
              {language === 'pt' ? knife.description_pt : knife.description_en}
            </div>

            {/* Specs */}
            <div className="pt-8 border-t border-[var(--line)]">
              <h3 className="text-white font-playfair text-2xl mb-6">
                {language === 'pt' ? 'Especificações' : 'Specifications'}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {knife.specs.map((spec: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-[var(--line)] border-dashed">
                    <span className="text-[var(--muted)] uppercase tracking-wider text-xs">{spec.label}</span>
                    <span className="text-white font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Área de Ação (Sticky bottom no mobile se quiser, mas aqui deixei normal) */}
            <div className="bg-[var(--paper)] p-8 border border-[var(--line)] rounded-sm">
              <h4 className="text-[var(--gold)] font-bold text-sm tracking-widest uppercase mb-2">
                {language === 'pt' ? "TENHO INTERESSE" : "I'M INTERESTED"}
              </h4>
              <p className="text-[var(--muted)] text-sm mb-6 font-light">
                {language === 'pt'
                  ? 'Peça exclusiva. Entre em contato para adquirir ou encomendar.'
                  : "Exclusive piece. Contact us to purchase or order."}
              </p>

              {!showEmailForm ? (
                <div className="flex flex-col gap-3">
                  <a
                    href={`https://wa.me/5518996346820?text=${language === 'pt' ? 'Olá! Tenho interesse na faca' : 'Hi! I\'m interested in the knife'} ${knife.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center bg-[var(--gold)] text-black font-bold uppercase tracking-[0.15em] py-4 px-6 rounded-sm hover:brightness-110 transition-all shadow-lg shadow-[var(--gold)]/20"
                  >
                    {t('portfolio_interest_whatsapp') || 'WhatsApp'}
                  </a>
                  <button
                    onClick={() => setShowEmailForm(true)}
                    className="w-full text-center border border-[var(--line)] text-white font-medium uppercase tracking-[0.15em] py-4 px-6 rounded-sm hover:bg-white hover:text-black hover:border-white transition-all"
                  >
                    {t('portfolio_interest_email') || 'E-mail'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={language === 'pt' ? 'Seu nome completo' : 'Your full name'}
                    disabled={contactMutation.isPending}
                    className="bg-black border border-[var(--line)] text-white p-3 rounded-sm focus:border-[var(--gold)] focus:outline-none transition-colors"
                  />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="seu@email.com"
                    disabled={contactMutation.isPending}
                    className="bg-black border border-[var(--line)] text-white p-3 rounded-sm focus:border-[var(--gold)] focus:outline-none transition-colors"
                  />
                  
                  <div className="flex gap-3 mt-2">
                    <button
                      type="button"
                      onClick={() => setShowEmailForm(false)}
                      className="flex-1 border border-[var(--line)] text-[var(--muted)] hover:text-white uppercase tracking-widest text-xs font-bold py-3 rounded-sm transition-all"
                    >
                      {language === 'pt' ? 'Cancelar' : 'Cancel'}
                    </button>
                    <button 
                      type="submit" 
                      disabled={contactMutation.isPending}
                      className="flex-[2] bg-[var(--gold)] text-black font-bold uppercase tracking-widest text-xs py-3 rounded-sm hover:brightness-110 disabled:opacity-50"
                    >
                      {contactMutation.isPending
                        ? (language === 'pt' ? 'Enviando...' : 'Sending...')
                        : (language === 'pt' ? 'Enviar' : 'Send')}
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
