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
  const { t, language } = useLanguage();
  
  // Estado para controlar qual imagem (ou vídeo) está sendo exibida grande
  const [activeMedia, setActiveMedia] = useState<'video' | number>(0);

  const { data: sanityKnives, isLoading } = trpc.sanity.getKnives.useQuery();

  const knife = useMemo(() => {
    if (!sanityKnives || !slug) return null;

    // Lógica robusta de busca (Slug ou Nome gerado)
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

    // Tratamento dos vídeos usando a função correta
    const videoUrl = getFileUrl(foundSanityKnife.video);
    const videoPoster = getFileUrl(foundSanityKnife.videoPoster);

    return {
      ...foundSanityKnife, // Mantém dados originais se precisar
      name: foundSanityKnife.name,
      images: sanityImages.map(i => i.cardUrl),
      fullImages: sanityImages.map(i => i.fullUrl),
      video_mp4: videoUrl,
      video_poster: videoPoster,
      category: foundSanityKnife.category,
      status: foundSanityKnife.status,
      // Mapeamento dos campos técnicos
      specs: [
        { label: language === 'pt' ? 'Modelo' : 'Model', value: foundSanityKnife.model },
        { label: language === 'pt' ? 'Aço' : 'Steel', value: language === 'pt' ? foundSanityKnife.steel_pt : foundSanityKnife.steel_en },
        { label: language === 'pt' ? 'Empunhadura' : 'Handle', value: language === 'pt' ? foundSanityKnife.handle_pt : foundSanityKnife.handle_en },
        { label: language === 'pt' ? 'Comprimento' : 'Length', value: foundSanityKnife.length },
        { label: language === 'pt' ? 'Espessura' : 'Thickness', value: foundSanityKnife.thickness },
        { label: language === 'pt' ? 'Largura' : 'Width', value: foundSanityKnife.width },
      ].filter(spec => spec.value) // Remove specs vazias
    };
  }, [sanityKnives, slug, language]);

  if (isLoading) {
    return <div className="section container text-center py-20">Carregando...</div>;
  }

  if (!knife) {
    return (
      <div className="section container text-center py-20 flex flex-col items-center gap-4">
        <h2>Faca não encontrada</h2>
        <button onClick={() => navigate('/portfolio')} className="btn btn-primary">
          Voltar ao Portfólio
        </button>
      </div>
    );
  }

  return (
    <div className="section page-knife">
      <div className="container">
        {/* Botão Voltar (Opcional, mas bom para UX) */}
        <button 
          onClick={() => navigate('/portfolio')} 
          className="text-muted hover:text-white mb-8 flex items-center gap-2 text-sm uppercase tracking-widest"
        >
          ← {language === 'pt' ? 'Voltar' : 'Back'}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* COLUNA ESQUERDA: Mídia (Fotos e Vídeo) */}
          <div className="space-y-4">
            {/* Visualizador Principal */}
            <div className="aspect-square w-full bg-[#111] border border-[var(--line)] rounded-lg overflow-hidden relative">
              {activeMedia === 'video' && knife.video_mp4 ? (
                <video 
                  src={knife.video_mp4} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-cover"
                  poster={knife.video_poster || undefined}
                />
              ) : (
                <img 
                  src={knife.fullImages[typeof activeMedia === 'number' ? activeMedia : 0]} 
                  alt={knife.name}
                  className="w-full h-full object-contain p-4"
                />
              )}
            </div>

            {/* Carrossel de Miniaturas */}
            <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
              {/* Miniatura do Vídeo (se existir) */}
              {knife.video_mp4 && (
                <button
                  onClick={() => setActiveMedia('video')}
                  className={`flex-shrink-0 w-20 h-20 border-2 rounded overflow-hidden relative group
                    ${activeMedia === 'video' ? 'border-[var(--gold)]' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <span className="text-white text-2xl">▶</span>
                  </div>
                  {knife.video_poster && <img src={knife.video_poster} className="w-full h-full object-cover" />}
                </button>
              )}

              {/* Miniaturas das Fotos */}
              {knife.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveMedia(idx)}
                  className={`flex-shrink-0 w-20 h-20 border-2 rounded overflow-hidden
                    ${activeMedia === idx ? 'border-[var(--gold)]' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* COLUNA DIREITA: Informações */}
          <div className="flex flex-col gap-8">
            <div>
              <span className="text-[var(--gold)] uppercase tracking-[0.2em] text-sm font-medium">
                D.Braguim Cutlery
              </span>
              <h1 className="text-4xl md:text-5xl font-playfair text-white mt-2 mb-4">
                {knife.name}
              </h1>
              <div className={`inline-flex items-center px-3 py-1 rounded-full border text-xs uppercase tracking-wider
                ${knife.status === 'available' 
                  ? 'border-green-900 text-green-500 bg-green-900/20' 
                  : 'border-red-900 text-red-500 bg-red-900/20'}`}>
                {knife.status === 'available' 
                  ? (language === 'pt' ? 'Disponível' : 'Available')
                  : (knife.status === 'sold' 
                      ? (language === 'pt' ? 'Vendida' : 'Sold') 
                      : (language === 'pt' ? 'Sob Encomenda' : 'Made to Order'))}
              </div>
            </div>

            {/* Descrição em Texto */}
            <div className="text-gray-300 leading-relaxed text-lg">
              {language === 'pt' ? knife.description_pt : knife.description_en}
            </div>

            {/* Tabela de Especificações */}
            <div className="border-t border-[var(--line)] pt-6">
              <h3 className="text-white font-playfair text-xl mb-4">
                {language === 'pt' ? 'Especificações' : 'Specifications'}
              </h3>
              <div className="grid grid-cols-1 gap-y-3">
                {knife.specs.map((spec: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-[var(--line)] border-dashed">
                    <span className="text-muted uppercase text-sm tracking-wider">{spec.label}</span>
                    <span className="text-white font-medium text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Botão de Ação (WhatsApp) */}
            <div className="mt-4">
              <a
                href={`https://wa.me/5518996346820?text=Olá, tenho interesse na faca ${knife.name}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block w-full text-center bg-[var(--gold)] text-black font-bold uppercase tracking-widest py-4 px-8 rounded hover:bg-white transition-colors duration-300"
              >
                {language === 'pt' ? 'Tenho Interesse' : 'I am Interested'}
              </a>
              <p className="text-center text-muted text-xs mt-3">
                {language === 'pt' ? 'Fale diretamente com o cuteleiro' : 'Talk directly to the bladesmith'}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
