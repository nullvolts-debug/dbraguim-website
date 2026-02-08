import { useLanguage } from '@/contexts/LanguageContext';

export default function Sobre() {
  const { t } = useLanguage();

  return (
    <section className="section">
      <div className="container">
        <h1>{t('nav_sobre')}</h1>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '24px', marginTop: '48px' }}>{t('about_story_title')}</h2>

          <p className="lead" style={{ marginBottom: '24px' }}>
            {t('about_story_p1')}
          </p>

          <p className="lead" style={{ marginBottom: '24px' }}>
            {t('about_story_p2')}
          </p>

          <p className="lead" style={{ marginBottom: '48px' }}>
            {t('about_story_p3')}
          </p>

          {/* Valores */}
          <div style={{ display: 'grid', gap: '32px', marginTop: '64px' }}>
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
              <p style={{ color: 'var(--muted)', lineHeight: '1.7' }}>{t('about_value_craft_text')}</p>
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
              <p style={{ color: 'var(--muted)', lineHeight: '1.7' }}>{t('about_value_exclusive_text')}</p>
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
              <p style={{ color: 'var(--muted)', lineHeight: '1.7' }}>{t('about_value_innovation_text')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
