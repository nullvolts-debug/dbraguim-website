import { Link } from 'wouter';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import KnifeModal from '@/components/KnifeModal';
import { knivesData, type KnifeData } from '@shared/knivesData';
import { trpc } from '@/lib/trpc';
import { KnifeCard } from '@/components/KnifeCard';

function FeaturedKnives() {
  const { t } = useLanguage();
  const { data: knives, isLoading } = trpc.sanity.getKnives.useQuery({ featured: true });

  if (isLoading) {
    return (
      <section className="section">
        <div className="container">
          <h2>{t('home_section_highlights')}</h2>
          <div className="grid">
            <div style={{ color: 'var(--muted)' }}>Carregando...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <h2>{t('home_section_highlights')}</h2>
        <div className="grid">
          {knives?.map((knife) => (
            <KnifeCard key={knife._id} knife={knife} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { t, language } = useLanguage();
  const [selectedKnife, setSelectedKnife] = useState<KnifeData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleKnifeClick = (knife: KnifeData) => {
    setSelectedKnife(knife);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedKnife(null), 300);
  };

  // Lógica de destaques: priorizar facas disponíveis
  const featuredKnives = (() => {
    // 1. Separar facas por status
    const disponiveis = knivesData.filter(k => k.status === 'disponivel');
    const outras = knivesData.filter(k => k.status !== 'disponivel');
    
    // 2. Priorizar disponíveis, depois preencher com outras se necessário
    const featured = [...disponiveis, ...outras].slice(0, 3);
    
    return featured;
  })();

  return (
    <>
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
                    src={`/images/portfolio/${knife.images[0]}`}
                    alt={knife.name}
                    loading="lazy"
                  />
                </div>
                <div className="card__content">
                  <div className="card__header">
                    <h3 className="card__title">{knife.name}</h3>
                    <span className={`badge badge--${knife.status}`}>
                      {knife.status === 'disponivel'
                        ? language === 'pt'
                          ? 'Disponível'
                          : 'Available'
                        : knife.status === 'vendida'
                        ? language === 'pt'
                          ? 'Vendida'
                          : 'Sold'
                        : language === 'pt'
                        ? 'Sob Encomenda'
                        : 'Made to Order'}
                    </span>
                  </div>
                  <p className="card__excerpt">
                    {language === 'pt' ? knife.description_pt : knife.description_en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <KnifeModal knife={selectedKnife} isOpen={isModalOpen} onClose={handleCloseModal} />

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
