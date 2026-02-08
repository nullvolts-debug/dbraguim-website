import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
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
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__contentOverlay">
          <div className="container">
            <div className="hero__panel">
              <div className="kicker">{t('hero_kicker')}</div>
              <h1>{t('hero_title')}</h1>
              <p className="subtitle">{t('hero_subtitle')}</p>
              <div className="hero__cta">
                <Link href="/portfolio">
                  <a className="btn btn--primary" title={t('hero_cta_primary')}>
                    {t('hero_cta_primary')}
                  </a>
                </Link>
                <a
                  className="btn btn--whatsapp"
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
        </div>
      </section>

      {/* Destaques Section */}
      <FeaturedKnives />

      {/* Sobre Section */}
      <section className="section">
        <div className="container">
          <h2>{t('home_section_about')}</h2>
          <p className="lead">{t('home_about_text')}</p>
          <Link href="/sobre">
            <a className="btn btn--secondary" title={t('home_about_link')}>
              {t('home_about_link')}
            </a>
          </Link>
        </div>
      </section>
    </>
  );
}
