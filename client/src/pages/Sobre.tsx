import { useLanguage } from '@/contexts/LanguageContext';
// 1. IMPORTANTE: Importe o componente SEO que criamos
import { SEO } from '@/components/SEO'; 

export default function Sobre() {
  const { t } = useLanguage();

  // Removemos o hook useSEO e usamos o componente direto no JSX
  
  return (
    <>
      {/* 2. INSERÇÃO DO HELMET AQUI */}
      <SEO
        title="Sobre Mim | D.Braguim Cutelaria"
        description="Conheça a história de Dennis Braguim e o processo artesanal de alta performance por trás de cada faca exclusiva."
        // Se quiser, pode adicionar a imagem do Dennis para aparecer no compartilhamento:
        image="/images/dennis.webp"
      />

      <section className="section">
        <div className="container">
          {/* História com Foto */}
          <div className="about-story">
            <div>
              <img
                src="/images/dennis.webp"
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
          <div className="about-values">
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
    </>
  );
}