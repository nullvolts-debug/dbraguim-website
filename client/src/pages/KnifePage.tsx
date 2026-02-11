import { useParams, useLocation } from 'wouter';
import { useMemo, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { type SanityKnife } from '@shared/sanity';
import { getCardImageUrl, getFullImageUrl, getFileUrl } from '@/lib/sanityImage';
import { toast } from "sonner";
import '../dbraguim.css';

export default function KnifePage() {
  const params = useParams();
  const slug = params.slug;
  const [, navigate] = useLocation();
  const { language, t } = useLanguage();
  
  // Controle de Mídia (Foto/Vídeo)
  const [activeMedia, setActiveMedia] = useState<'video' | number>(0);

  // --- LÓGICA DO FORMULÁRIO (Igual ao Modal) ---
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  
  // Mutação do tRPC (igual ao modal)
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

    const videoUrl = getFileUrl(foundSanityKnife.video);
    const videoPoster = getFileUrl(foundSanityKnife.videoPoster);

    return {
      name: foundSanityKnife.name,
      images: sanityImages.map(i => i.cardUrl),
      fullImages: sanityImages.map(i => i.fullUrl),
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
      ].filter(spec => spec.value),
      // Campos originais para usar na lógica do email
      modelo: foundSanityKnife.model,
      comprimento: foundSanityKnife.length,
      largura: foundSanityKnife.width,
      espessura: foundSanityKnife.thickness
    };
  }, [sanityKnives, slug, language]);

  // Função de envio (Lógica do Modal adaptada)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!knife) return;

    try {
      await contactMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        // Mensagem automática igual ao modal
        message: language === 'pt'
          ? `Me interessei pela faca ${knife.name}, gostaria de mais informações.`
          : `I'm interested in the ${knife.name} knife, I would like more information.`,
      });

      toast.success(language === 'pt' ? 'Mensagem enviada com sucesso!' : 'Message sent successfully!');
      
      // Reset após sucesso
      setTimeout(() => {
        setShowEmailForm(false);
        setFormData({ name: '', email: '' });
      }, 2000);

    } catch (error) {
      console.error(error);
      toast.error(language === 'pt' ? 'Erro ao enviar mensagem. Tente novamente.' : 'Error sending message. Please try again.');
    }
  };

  if (isLoading) return <div className="min-h-[60vh] flex items-center justify-center text-[var(--muted)]">Carregando...</div>;

  if (!knife) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <h2 className="text-white text-xl">Faca não encontrada</h2>
        <button onClick={() => navigate('/portfolio')} className="px-6 py-2 border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black transition">
          Voltar ao Portfólio
        </button>
      </div>
    );
  }

  return (
    <div className="section page-knife pt-32 pb-20">
      <div className="container">
        
        {/* Botão Voltar */}
        <button 
          onClick={() => navigate('/portfolio')} 
          className="text-[var(--muted)] hover:text-[var(--gold)] mb-8 flex items-center gap-2 text-xs uppercase tracking-[0.2em] transition-colors"
        >
          ← {language === 'pt' ? 'Voltar ao Portfolio' : 'Back to Portfolio'}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* COLUNA ESQUERDA: Mídia (7 colunas) */}
          <div className="lg:col-span-7 space-y-4 sticky top-32">
            <div className="aspect-square w-full bg-[#111] border border-[var(--line)] rounded-sm overflow-hidden relative group">
              {activeMedia === 'video' && knife.video_mp4 ? (
                <video 
                  src={knife.video_mp4} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-contain"
                  poster={knife.video_poster || undefined}
                />
              ) : (
                <img 
                  src={knife.fullImages[typeof activeMedia === 'number' ? activeMedia : 0]} 
                  alt={knife.name}
                  className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
              {knife.video_mp4 && (
                <button
                  onClick={() => setActiveMedia('video')}
                  className={`flex-shrink-0 w-20 h-20 border-2 rounded-sm overflow-hidden relative transition-all duration-300
                    ${activeMedia === 'video' ? 'border-[var(--gold)] opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <span className="text-white text-xl">▶</span>
                  </div>
                  {knife.video_poster && <img src={knife.video_poster} className="w-full h-full object-cover" />}
                </button>
              )}
              {knife.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveMedia(idx)}
                  className={`flex-shrink-0 w-20 h-20 border-2 rounded-sm overflow-hidden transition-all duration-300
                    ${activeMedia === idx ? 'border-[var(--gold)] opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* COLUNA DIREITA: Informações (5 colunas) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* Header Info */}
            <div>
              <span className="text-[var(--gold)] uppercase tracking-[0.2em] text-xs font-bold mb-2 block">
                D.Braguim Custom Knives
              </span>
              <h1 className="text-4xl md:text-5xl font-playfair text-white mb-4 leading-tight">
                {knife.name}
              </h1>
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
            </div>

            {/* Descrição */}
            <div className="text-[var(--muted)] leading-relaxed text-base font-light border-l-2 border-[var(--line)] pl-4">
              {language === 'pt' ? knife.description_pt : knife.description_en}
            </div>

            {/* Especificações */}
            <div className="pt-6 border-t border-[var(--line)]">
              <h3 className="text-white font-playfair text-xl mb-6">
                {language === 'pt' ? 'Especificações' : 'Specifications'}
              </h3>
              <div className="space-y-3">
                {knife.specs.map((spec: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <span className="text-[var(--muted)] uppercase tracking-wider text-xs">{spec.label}</span>
                    <span className="text-white font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* --- ÁREA DE INTERESSE (Lógica do Modal) --- */}
            <div className="mt-8 bg-[var(--paper)] p-6 border border-[var(--line)] rounded-sm">
              <h4 className="text-[var(--gold)] font-bold text-sm tracking-widest uppercase mb-2">
                {language === 'pt' ? "TENHO INTERESSE" : "I'M INTERESTED"}
              </h4>
              <p className="text-[var(--muted)] text-sm mb-6">
                {language === 'pt'
                  ? 'Se tem interesse em uma peça como essa, escolha uma opção abaixo.'
                  : "If you're interested in a piece like this, choose an option below."}
              </p>

              {!showEmailForm ? (
                // MODO BOTÕES (Padrão)
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
                // MODO FORMULÁRIO (Ao clicar em Email)
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
                  
                  {/* Campos ocultos simulando o comportamento do modal */}
                  <div className="text-xs text-[var(--muted)] italic mt-1">
                     * {language === 'pt' ? 'Assunto preenchido automaticamente' : 'Subject automatically filled'}
                  </div>

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
