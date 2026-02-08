import { useLanguage } from '@/contexts/LanguageContext';

export default function Sobre() {
  const { t } = useLanguage();

  return (
    <section className="section">
      <div className="container">
        {/* História com Foto */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '48px', alignItems: 'start', marginTop: '48px', marginBottom: '64px' }}>
          <div>
            <img
              src="/images/about/dennis.webp"
              alt="Dennis Braguim"
              style={{
                width: '100%',
                borderRadius: '12px',
              }}
            />
          </div>
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>{t('about_story_title')}</h2>

            <p className="lead" style={{ marginBottom: '24px' }}>
              {t('about_story_p1')}
            </p>

            <p className="lead" style={{ marginBottom: '24px' }}>
              {t('about_story_p2')}
            </p>

            <p className="lead" style={{ marginBottom: '0' }}>
              {t('about_story_p3')}
            </p>
          </div>
        </div>

        {/* Valores */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginTop: '64px' }}>
            <div
              style={{
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                borderRadius: '12px',
                padding: '24px',
              }}
            >
              <h3 style={{ fontSize: '1.4rem', marginBottom: '12px', color: 'var(--gold)' }}>
                {t('about_value_craft_title')}
              </h3>
              <p style={{ lineHeight: '1.7' }}>{t('about_value_craft_text')}</p>
            </div>

            <div
              style={{
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                borderRadius: '12px',
                padding: '24px',
              }}
            >
              <h3 style={{ fontSize: '1.4rem', marginBottom: '12px', color: 'var(--gold)' }}>
                {t('about_value_exclusive_title')}
              </h3>
              <p style={{ lineHeight: '1.7' }}>{t('about_value_exclusive_text')}</p>
            </div>

            <div
              style={{
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                borderRadius: '12px',
                padding: '24px',
              }}
            >
              <h3 style={{ fontSize: '1.4rem', marginBottom: '12px', color: 'var(--gold)' }}>
                {t('about_value_innovation_title')}
              </h3>
              <p style={{ lineHeight: '1.7' }}>{t('about_value_innovation_text')}</p>
            </div>
        </div>
      </div>
    </section>
  );
}
