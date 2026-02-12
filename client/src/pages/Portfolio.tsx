import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
// Removi o KnifeModal import
import { type KnifeData } from '@shared/knivesData';
import { trpc } from '@/lib/trpc';
import { type SanityKnife } from '@shared/sanity';
import { getCardImageUrl, getFullImageUrl } from '@/lib/sanityImage';
import { useLocation } from 'wouter'; // Import para navegação

export default function Portfolio() {
  const { t, language } = useLanguage();
  const [, navigate] = useLocation(); // Hook de navegação

  // Removi os estados do Modal (selectedKnife, isModalOpen)
  
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const { data: sanityKnives, isLoading } = trpc.sanity.getKnives.useQuery();

  // Função atualizada: Navega para a página em vez de abrir modal
  const handleKnifeClick = (knife: KnifeData) => {
    // Rola para o topo antes de navegar (opcional, mas bom para UX)
    window.scrollTo(0, 0);
    navigate(`/faca/${knife.slug}`);
  };

  const filteredKnives = useMemo(() => {
    if (!sanityKnives) return [];

    const converted: KnifeData[] = sanityKnives.map((knife: SanityKnife) => {
      // Garante que o slug existe
      const slug = knife.slug?.current || knife.name.toLowerCase().trim().replace(/\s+/g, '-');
      
      const sanityImages = knife.images?.map((img: any) => {
        const cardUrl = getCardImageUrl(img);
        const fullUrl = getFullImageUrl(img);
        return { cardUrl, fullUrl, raw: img };
      }) || [];

      const localImageName = knife.name.toLowerCase().replace(/\s+/g, '_') + '.webp';
      const fallbackCardUrl = `/images/portfolio/${localImageName}`;

      return {
        name: knife.name,
        slug: slug, // Importante: O slug está sendo passado aqui
        category: knife.category === 'hunting' ? 'Caça' : knife.category === 'fighter' ? 'Luta' : 'Chef',
        status: knife.status === 'available' ? 'disponivel' : knife.status === 'sold' ? 'vendida' : 'encomenda',
        images: sanityImages.length > 0
          ? sanityImages.map((img: any) => img.cardUrl)
          : [fallbackCardUrl],
        fullImages: sanityImages.length > 0
          ? sanityImages.map((img: any) => img.fullUrl)
          : [fallbackCardUrl],
        video_mp4: knife.video?.asset?._ref,
        video_poster: knife.videoPoster?.asset?._ref,
        description_pt: knife.description_pt,
        description_en: knife.description_en,
        modelo: knife.model || '',
        comprimento: knife.length || '',
        largura: knife.width || '',
        espessura: knife.thickness || '',
        steel_pt: knife.steel_pt || '',
        steel_en: knife.steel_en || '',
        handle_pt: knife.handle_pt || '',
        handle_en: knife.handle_en || '',
      };
    });

    return converted.filter((knife) => {
      if (categoryFilter !== 'all' && knife.category !== categoryFilter) return false;
      if (statusFilter !== 'all' && knife.status !== statusFilter) return false;
      return true;
    });
  }, [sanityKnives, categoryFilter, statusFilter]);

  const getStatusLabel = (status: string) => {
    if (status === 'disponivel') {
      return language === 'pt' ? 'Disponível' : 'Available';
    } else if (status === 'vendida') {
      return language === 'pt' ? 'Vendida' : 'Sold';
    } else {
      return language === 'pt' ? 'Sob Encomenda' : 'Made to Order';
    }
  };

  return (
    <>
      <section className="section">
        <div className="container">
          {/* Filtros */}
          <div className="filters">
            <div className="filter__group">
              <label className="filter__label">
                {language === 'pt' ? 'Categoria' : 'Category'}
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="filter__select"
              >
                <option value="all">{language === 'pt' ? 'Todas' : 'All'}</option>
                <option value="Caça">{language === 'pt' ? 'Caça' : 'Hunting'}</option>
                <option value="Luta">{language === 'pt' ? 'Luta' : 'Fighter'}</option>
                <option value="Chef">Chef</option>
              </select>
            </div>

            <div className="filter__group">
              <label className="filter__label">
                {language === 'pt' ? 'Status' : 'Status'}
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter__select"
              >
                <option value="all">{language === 'pt' ? 'Todos' : 'All'}</option>
                <option value="disponivel">{language === 'pt' ? 'Disponível' : 'Available'}</option>
                <option value="vendida">{language === 'pt' ? 'Vendida' : 'Sold'}</option>
                <option value="encomenda">{language === 'pt' ? 'Sob Encomenda' : 'Made to Order'}</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div style={{ color: 'var(--muted)', padding: '2rem 0', textAlign: 'center' }}>Carregando...</div>
          ) : (
            <div className="grid">
              {filteredKnives.map((knife) => (
                <div
                  key={knife.name}
                  className="card"
                  onClick={() => handleKnifeClick(knife)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card__media">
                    <img
                      src={knife.images[0]}
                      alt={knife.name}
                      loading="lazy"
                    />
                  </div>
                  <div className="card__content">
                    <div className="card__header">
                      <h3 className="card__title">{knife.name}</h3>
                      <span className={`badge badge--${knife.status}`}>
                        {getStatusLabel(knife.status)}
                      </span>
                    </div>
                    <p className="card__excerpt">
                      {language === 'pt' ? knife.description_pt : knife.description_en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Removi o componente <KnifeModal /> daqui */}
    </>
  );
}
