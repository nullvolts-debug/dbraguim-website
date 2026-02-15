import { useParams, useLocation } from 'wouter';
import { useMemo, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { type SanityKnife } from '@shared/sanity';
import { getCardImageUrl, getFullImageUrl, getFileUrl } from '@/lib/sanityImage';
// 1. IMPORTAR A FUNÇÃO DO SANITY.TS
// Ajuste o caminho '@shared/sanity' se seu sanity.ts estiver em outro lugar (ex: '@/lib/sanity')
import { urlForImage } from '@shared/sanity'; 
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, Play, Image as ImageIcon } from 'lucide-react';
import { SEO } from '@/components/SEO';
import '../dbraguim.css';

export default function KnifePage() {
  const params = useParams();
  const slug = params.slug;
  const [, navigate] = useLocation();
  const { language, t } = useLanguage();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
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
      raw: img // Guardamos o objeto original para usar no SEO
    })) || [];

    const videoUrl = getFileUrl(foundSanityKnife.video);
    const videoPoster = getFileUrl(foundSanityKnife.videoPoster);

    return {
      name: foundSanityKnife.name,
      images: sanityImages.map((i: any) => i.cardUrl),
      fullImages: sanityImages.map((i: any) => i.fullUrl),
      rawImages: sanityImages.map((i: any) => i.raw), // Adicionado para acesso fácil
      video_mp4: videoUrl,
      video_poster: videoPoster,
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

  // --- PREPARAÇÃO DOS DADOS DE SEO (ATUALIZADO) ---
  const seoTitle = knife 
    ? `${knife.name} | D.Braguim`
    : 'D.Braguim - Cutelaria Artesanal';

  const descText = knife 
    ? (language === 'pt' ? knife.description_pt : knife.description_en) 
    : '';

  const seoDesc = descText 
    ? descText.substring(0, 150) + '...'
    : 'Detalhes exclusivos desta peça de cutelaria artesanal.';

  // 2. GERAR URL DA IMAGEM OTIMIZADA PARA WHATSAPP (1200x630)
  const seoImage = useMemo(() => {
    if (knife?.rawImages && knife.rawImages.length > 0) {
      try {
        return urlForImage(knife.rawImages[0])
          .width(1200)
          .height(630)
          .fit('crop')
          .url();
      } catch (e) {
        console.error('Erro ao gerar imagem SEO:', e);
        return 'https://dbraguim.com/og-image.jpg';
      }
    }
    return 'https://dbraguim.com/og-image.jpg';
  }, [knife]);


  const nextImage = () => {
    if (!knife) return;
    setCurrentIndex((prev) => (prev + 1) % knife.fullImages.length);
    setShowVideo(false);
  };

  const prevImage = () => {
    if (!knife) return;
    setCurrentIndex((prev) => (prev - 1 + knife.fullImages.length) % knife.fullImages.length);
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

  if (isLoading) return <div className="min-h-[60vh] flex items-center justify-center text-[var(--muted)]">Carregando...</div>;

  if (!knife) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <SEO title="Faca não encontrada" />
        <h2 className="text-white text-xl">Faca não encontrada</h2>
        <button onClick={() => navigate('/portfolio')} className="px-6 py-2 border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black transition">
          Voltar ao Portfólio
        </button>
      </div>
    );
  }

  return (
    <>
      {/* 3. PASSANDO A URL OTIMIZADA PARA O SEO */}
      <SEO
        title={seoTitle}
        description={seoDesc}
        image={seoImage} // Agora é a URL 1200x630 do Sanity
        url={`https://www.dbraguim.com/faca/${slug}`}
      />

      <div className="section page-knife pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-[1400px]">
          
          <button 
            onClick={() => navigate('/portfolio')} 
            className="text-[var(--muted)] hover:text-[var(--gold)] mb-8 flex items-center gap-2 text-xs uppercase tracking-[0.2em] transition-colors"
          >
            ← {language === 'pt' ? 'Voltar ao Portfolio' : 'Back to Portfolio'}
          </button>

          <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-start">
            
            {/* COLUNA ESQUERDA (FOTO) */}
            <div className="w-full md:w-[60%] lg:w-[65%] relative group">
              <div className="w-full bg-[#050505] border border-[var(--line)] rounded-sm overflow-hidden relative aspect-[4/3] flex items-center justify-center">
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
                    src={knife.fullImages[currentIndex]} 
                    alt={knife.name}
                    className="w-full h-full object-contain p-4 md:p-8"
                  />
                )}

                {/* Botão Flutuante */}
                {knife.video_mp4 && (
                  <button 
                    onClick={() => setShowVideo(!showVideo)}
                    className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-[var(--line)] text-white px-4 py-2 rounded-full hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all text-xs uppercase tracking-widest"
                  >
                    {showVideo ? (
                      <> <ImageIcon size={14} /> {language === 'pt' ? 'Ver Fotos' : 'Photos'} </>
                    ) : (
                      <> <Play size={14} /> {language === 'pt' ? 'Ver Vídeo' : 'Video'} </>
                    )}
                  </button>
                )}

                {/* Setas de Navegação */}
                {!showVideo && knife.fullImages.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-[var(--gold)] hover:text-black transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-[var(--gold)] hover:text-black transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight size={24} />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-[0.2em] bg-black/40 px-3 py-1 rounded-full">
                      {currentIndex + 1} / {knife.fullImages.length}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* COLUNA DIREITA (CONTEÚDO) */}
            <div className="w-full md:w-[40%] lg:w-[35%] flex flex-col gap-8">
              
              {/* Header */}
              <div>
                <span className="text-[var(--gold)] uppercase tracking-[0.2em] text-xs font-bold mb-2 block">
                  D.Braguim
                </span>
                <h1 className="text-4xl md:text-5xl font-playfair text-white mb-4 leading-tight">
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
                  <span className="text-[var(--muted)] text-xs font-medium uppercase tracking-widest pl-2 border-l border-[var(--line)]">
                    {knife.category}
                  </span>
                </div>
              </div>

              {/* Descrição */}
              <div className="text-[var(--muted)] leading-relaxed text-base font-light border-l-2 border-[var(--line)] pl-4">
                {language === 'pt' ? knife.description_pt : knife.description_en}
              </div>

              {/* Specs */}
              <div className="pt-6 border-t border-[var(--line)]">
                <h3 className="text-white font-playfair text-xl mb-6">
                  {language === 'pt' ? 'Especificações' : 'Specifications'}
                </h3>
                <div className="space-y-3">
                  {knife.specs.map((spec: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-[var(--line)] border-dashed pb-2">
                      <span className="text-[var(--muted)] uppercase tracking-wider text-xs">{spec.label}</span>
                      <span className="text-white font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AREA DE INTERESSE */}
              <div className="mt-4 bg-[var(--paper)] p-6 border border-[var(--line)] rounded-sm">
                <h4 className="text-[var(--gold)] font-bold text-sm tracking-widest uppercase mb-2">
                  {language === 'pt' ? "TENHO INTERESSE" : "I'M INTERESTED"}
                </h4>

                {!showEmailForm ? (
                  <div className="flex flex-col gap-3">
                    <p className="text-[var(--muted)] text-sm mb-4">
                      {language === 'pt'
                        ? 'Se tem interesse em uma peça como essa, escolha uma opção abaixo.'
                        : "If you're interested in a piece like this, choose an option below."}
                    </p>
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
                    <p className="text-[var(--muted)] text-xs mb-2">
                      {language === 'pt' ? 'Preencha seus dados para receber o contato.' : 'Fill in your details to get in touch.'}
                    </p>
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
    </>
  );
}