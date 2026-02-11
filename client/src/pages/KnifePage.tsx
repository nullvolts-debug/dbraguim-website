import { useParams, useLocation } from 'wouter';
import { useMemo, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { type KnifeData } from '@shared/knivesData';
import { type SanityKnife } from '@shared/sanity';
import { getCardImageUrl, getFullImageUrl, getFileUrl } from '@/lib/sanityImage';
import '../dbraguim.css';

export default function KnifePage() {
  const params = useParams();
  const slug = params.slug;
  const [, navigate] = useLocation();
  const { language } = useLanguage();
  
  // Estado para controlar qual imagem (ou vídeo) está sendo exibida grande
  const [activeMedia, setActiveMedia] = useState<'video' | number>(0);

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
      ].filter(spec => spec.value)
    };
  }, [sanityKnives, slug, language]);

  if (isLoading) {
    return <div className="min-h-[60vh] flex items-center justify-center text-[var(--muted)]">Carregando...</div>;
  }

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

  // Defina seu email aqui
  const CONTACT_EMAIL = "seu_email@dbraguim.com"; 

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
          
          {/* COLUNA ESQUERDA: Mídia (Ocupa 7 colunas) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Visualizador Principal */}
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

            {/* Carrossel de Miniaturas */}
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

          {/* COLUNA DIREITA: Informações (Ocupa 5 colunas) */}
          <div className="lg:col-span-5 flex flex-col gap-8 sticky top-32">
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

            <div className="text-[var(--muted)] leading-relaxed text-base font-light border-l-2 border-[var(--line)] pl-4">
              {language === 'pt' ? knife.description_pt : knife.description_en}
            </div>

            <div className="pt-6 border-t border-[var(--line)]">
              <h3 className="text-white font-playfair text-xl mb-6">
                {language === 'pt' ? 'Especificações Técnicas' : 'Technical Specifications'}
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

            {/* BOTÕES DE AÇÃO - CORRIGIDO AQUI */}
            <div className="flex flex-col gap-4 mt-8">
              {/* Botão WhatsApp (Principal) */}
              <a
                href={`https://wa.me/5518996346820?text=Olá, tenho interesse na faca ${knife.name}`}
                target="_blank"
                rel="noreferrer"
                className="w-full text-center bg-[var(--gold)] text-black font-bold uppercase tracking-[0.15em] py-4 px-8 rounded-sm hover:brightness-110 transition-all duration-300 shadow-lg shadow-[var(--gold)]/20"
              >
                {language === 'pt' ? 'Chamar no WhatsApp' : 'Contact via WhatsApp'}
              </a>

              {/* Botão Email (Secundário) */}
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Interesse na faca: ${knife.name}`}
                className="w-full text-center border border-[var(--line)] text-white font-medium uppercase tracking-[0.15em] py-4 px-8 rounded-sm hover:bg-white hover:text-black hover:border-white transition-all duration-300"
              >
                {language === 'pt' ? 'Enviar E-mail' : 'Send Email'}
              </a>
              
              <p className="text-center text-[var(--muted)] text-xs mt-2 opacity-60">
                {language === 'pt' ? 'Envio seguro para todo o Brasil e Mundo' : 'Worldwide secure shipping available'}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
