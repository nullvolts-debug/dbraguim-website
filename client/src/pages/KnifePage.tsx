import { useParams, useLocation } from 'wouter';
import { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import KnifeModal from '@/components/KnifeModal';
import { type KnifeData } from '@shared/knivesData';
import { type SanityKnife } from '@shared/sanity';
// IMPORTE A FUNÇÃO DO VÍDEO AQUI
import { getCardImageUrl, getFullImageUrl, getFileUrl } from '@/lib/sanityImage';
import '../dbraguim.css';

export default function KnifePage() {
  // Pega o slug da URL (ex: blue-hunter)
  const params = useParams();
  const slug = params.slug; 
  
  const [, navigate] = useLocation();
  const { language } = useLanguage();

  // Buscar todas as facas
  const { data: sanityKnives, isLoading } = trpc.sanity.getKnives.useQuery();

  const knife = useMemo(() => {
    if (!sanityKnives || !slug) return null;

    // --- CORREÇÃO PRINCIPAL AQUI ---
    // Tenta encontrar a faca comparando o slug da URL tanto com o slug do banco
    // quanto com o slug gerado (nome transformado), para garantir que encontre.
    const foundSanityKnife = sanityKnives.find((k: SanityKnife) => {
      const storedSlug = k.slug?.current;
      const generatedSlug = k.name.toLowerCase().trim().replace(/\s+/g, '-');
      
      // Verifica se o slug da URL bate com algum dos dois
      return storedSlug === slug || generatedSlug === slug;
    });
    // --------------------------------

    if (!foundSanityKnife) return null;

    // Converter as imagens
    const sanityImages = foundSanityKnife.images?.map((img: any) => {
      const cardUrl = getCardImageUrl(img);
      const fullUrl = getFullImageUrl(img);
      return { cardUrl, fullUrl, raw: img };
    }) || [];

    const localImageName = foundSanityKnife.name.toLowerCase().replace(/\s+/g, '_') + '.webp';
    const fallbackCardUrl = `/images/portfolio/${localImageName}`;

    // Montar o objeto final
    const converted: KnifeData = {
      name: foundSanityKnife.name,
      slug: slug,
      category: foundSanityKnife.category === 'hunting' ? 'Caça' : foundSanityKnife.category === 'fighter' ? 'Luta' : 'Chef',
      status: foundSanityKnife.status === 'available' ? 'disponivel' : foundSanityKnife.status === 'sold' ? 'vendida' : 'encomenda',
      images: sanityImages.length > 0
        ? sanityImages.map((img: any) => img.cardUrl)
        : [fallbackCardUrl],
      fullImages: sanityImages.length > 0
        ? sanityImages.map((img: any) => img.fullUrl)
        : [fallbackCardUrl],
        
      // --- CORREÇÃO DO VÍDEO AQUI ---
      video_mp4: getFileUrl(foundSanityKnife.video),
      video_poster: getFileUrl(foundSanityKnife.videoPoster),
      // ------------------------------

      description_pt: foundSanityKnife.description_pt,
      description_en: foundSanityKnife.description_en,
      modelo: foundSanityKnife.model || '',
      comprimento: foundSanityKnife.length || '',
      largura: foundSanityKnife.width || '',
      espessura: foundSanityKnife.thickness || '',
      steel_pt: foundSanityKnife.steel_pt || '',
      steel_en: foundSanityKnife.steel_en || '',
      handle_pt: foundSanityKnife.handle_pt || '',
      handle_en: foundSanityKnife.handle_en || '',
    };

    return converted;
  }, [sanityKnives, slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-lg">Carregando detalhes...</div>
      </div>
    );
  }

  if (!knife) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black gap-6">
        <div className="text-white text-lg text-center">
          Faca não encontrada: "{slug}"
        </div>
        <button
          onClick={() => navigate('/portfolio')}
          className="px-6 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition"
        >
          Voltar ao Portfólio
        </button>
      </div>
    );
  }

  // Renderiza o modal forçado como "aberto"
  return (
    <div className="min-h-screen bg-black">
      <KnifeModal
        knife={knife}
        isOpen={true}
        onClose={() => navigate('/portfolio')}
      />
    </div>
  );
}
