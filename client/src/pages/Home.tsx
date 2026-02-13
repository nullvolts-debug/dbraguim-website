import { Link, useLocation } from 'wouter'; 
import { useMemo } from 'react'; 
import { useLanguage } from '@/contexts/LanguageContext';
// Removido KnifeModal import
import { type KnifeData } from '@shared/knivesData';
import { trpc } from '@/lib/trpc';
import { type SanityKnife } from '@shared/sanity';
import { getCardImageUrl, getFullImageUrl } from '@/lib/sanityImage';
// 1. IMPORTANTE: Troque useSEO por SEO
import { SEO } from '@/components/SEO';

export default function Home() {
  const { t, language } = useLanguage();
  const [, navigate] = useLocation();

  // REMOVIDO: useSEO({...}) e window.location.href (que pode dar erro no servidor)

  // Buscar todas as facas do Sanity
  const { data: allKnives, isLoading } = trpc.sanity.getKnives.useQuery();

  const handleKnifeClick = (knife: KnifeData) => {
    window.scrollTo(0, 0);
    // Corrigido para template string (crase)
    navigate(`/faca/${knife.slug}`);
  };

  // ... (lógica do featuredKnives continua igual) ...
  const featuredKnives = useMemo(() => {
    if (!allKnives) return [];

    const converted: any[] = allKnives.map((knife: SanityKnife) => {
      const slug = knife.slug?.current || knife.name.toLowerCase().trim().replace(/\s+/g, '-');

      const sanityImages = knife.images?.map((img: any) => {
        const cardUrl = getCardImageUrl(img);
        const fullUrl = getFullImageUrl(img);
        return { cardUrl, fullUrl, raw: img };
      }) || [];

      const localImageName = knife.name.toLowerCase().replace(/\s+/g, '_') + '.webp';
      const fallbackCardUrl = `/images/portfolio/${localImageName}`;

      return {
        // ... (mesma estrutura de antes) ...
        name: knife.name,
        slug: slug,
        category: knife.category === 'hunting' ? 'Caça' : knife.category === 'fighter' ? 'Luta' : 'Chef',
        status: knife.status === 'available' ? 'disponivel' : knife.status === 'sold' ? 'vendida' : 'encomenda',
        images: sanityImages.length > 0 ? sanityImages.map((img: any) => img.cardUrl) : [fallbackCardUrl],
        fullImages: sanityImages.length > 0 ? sanityImages.map((img: any) => img.fullUrl) : [fallbackCardUrl],
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

    const disponiveis = converted.filter(k => k.status === 'disponivel');
    const outras = converted.filter(k => k.status !== 'disponivel');
    
    return [...disponiveis, ...outras].slice(0, 3);
  }, [allKnives]);

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
      {/* 2. ADICIONE O COMPONENTE SEO AQUI */}
      <SEO
        title="D.Braguim - Cutelaria Artesanal de Alta Performance"
        description="Facas exclusivas forjadas à mão pelo cuteleiro Dennis Braguim. Arte, tradição e precisão em cada lâmina."
        // Url hardcoded é mais seguro que window.location para evitar erros de hidratação
        url="https://www.dbraguim.com/"
        // Se tiver uma imagem de capa bacana, coloque aqui:
        // image="https://www.dbraguim.com/images/hero-bg.jpg"
      />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero__contentOverlay">
          <div className="hero__panel">
            <div className="kicker">{t('hero_kicker')}</div>
            <h1>{t('hero_title')}</h1>
            <p className="subtitle">{t('hero_subtitle')}</p>
            <div className="hero__cta">
              <Link href="/portfolio" className="btn btn--primary" title={t('hero_cta_primary')}>
                {t('hero_cta_primary')}
              </Link>
              <a
                className="btn btn--secondary"
                href="https://wa.me/5511991953021"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Destaques Section */}
      <section className="section">
        <div className="container">
          <h2 className="section__title">{t('home_section_highlights')}</h2>
          {isLoading ? (
            <div className="grid">
              <div style={{ color: 'var(--muted)', textAlign: 'center' }}>Carregando...</div>
            </div>
          ) : (
            <div className="grid">
              {featuredKnives.map((knife) => (
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

      {/* Sobre Section */}
      <section className="section">
        <div className="container">
          <h2>{t('home_section_about')}</h2>
          <p className="lead">{t('home_about_text')}</p>
          <Link href="/sobre" className="btn btn--secondary" title={t('home_about_link')}>
            {t('home_about_link')}
          </Link>
        </div>
      </section>
    </>
  );
}