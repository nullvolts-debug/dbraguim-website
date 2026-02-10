import { useParams, useLocation } from 'wouter';
import { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import KnifeModal from '@/components/KnifeModal';
import { type KnifeData } from '@shared/knivesData';
import { type SanityKnife } from '@shared/sanity';
import { getCardImageUrl, getFullImageUrl } from '@/lib/sanityImage';
import '../dbraguim.css';

export default function KnifePage() {
  const { slug } = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const { language } = useLanguage();

  // Buscar todas as facas do Sanity
  const { data: sanityKnives, isLoading } = trpc.sanity.getKnives.useQuery();

  // Encontrar e converter a faca correspondente ao slug
  const knife = useMemo(() => {
    if (!sanityKnives) return null;

    const foundSanityKnife = sanityKnives.find(
      (k: SanityKnife) => k.slug?.current === slug
    );

    if (!foundSanityKnife) return null;

    // Converter formato Sanity para formato local
    const sanityImages = foundSanityKnife.images?.map((img: any) => {
      const cardUrl = getCardImageUrl(img);
      const fullUrl = getFullImageUrl(img);
      return { cardUrl, fullUrl, raw: img };
    }) || [];

    // Fallback para imagem local baseada no nome
    const localImageName = foundSanityKnife.name.toLowerCase().replace(/\s+/g, '_') + '.webp';
    const fallbackCardUrl = `/images/portfolio/${localImageName}`;

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
      video_mp4: foundSanityKnife.video?.asset?._ref,
      video_poster: foundSanityKnife.videoPoster?.asset?._ref,
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
        <div className="text-white text-lg">Carregando...</div>
      </div>
    );
  }

  if (!knife) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black gap-6">
        <div className="text-white text-lg text-center">
          Faca não encontrada
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

  // Renderizar o modal da faca em tela cheia
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
