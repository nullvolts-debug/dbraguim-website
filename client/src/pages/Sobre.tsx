import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter'; // Importante para o botão funcionar
import { SEO } from '@/components/SEO'; 
import { ArrowRight } from 'lucide-react'; // Ícone para dar um charme (opcional, mas fica ótimo)

export default function Sobre() {
  const { t } = useLanguage();

  return (
    <>
      <SEO
        title="Sobre Mim"
        description="Conheça a história de Dennis Braguim e o processo artesanal de alta performance por trás de cada faca exclusiva."
        image="https://www.dbraguim.com/og-image.jpg" 
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
            
            <div className="flex flex-col items-start">
              <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>{t('about_story_title')}</h2>

              <p className="lead" style={{ marginBottom: '24px' }}>
                {t('about_story_p1')}
              </p>
              
              <p className="lead" style={{ marginBottom: '24px' }}>
                {t('about_story_p2')}
              </p>

              {/* Texto limpo e finalizado */}
              <p className="lead" style={{ marginBottom: '32px' }}>
                {t('about_story_p3')}
              </p>

              {/* BOTÃO PREMIUM "VER PORTFÓLIO" */}
              <Link href="/portfolio">
                <a className="inline-flex items-center gap-2 px-8 py-3 border border-white/20 text-white uppercase tracking-widest text-sm font-medium hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all duration-300 group">
                  {t('hero_cta_primary') || "Ver Portfólio"}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </Link>
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