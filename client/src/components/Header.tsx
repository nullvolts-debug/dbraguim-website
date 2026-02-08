import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [location] = useLocation();

  return (
    <header className="header">
      <div className="container header__inner">
        <Link href="/" className="brand" title="D.Braguim - Cutelaria Artesanal">
          <span className="brand__logo">
            <img src="/images/logo/logo.svg" alt="D.Braguim - Logo" width={48} height={48} />
          </span>
          <span className="brand__name">D.Braguim</span>
        </Link>

        <nav className="nav" aria-label="Navegação Principal">
          <Link href="/" className={location === '/' ? 'active' : ''} title={t('nav_home')}>
            {t('nav_home')}
          </Link>
          <Link href="/portfolio" className={location === '/portfolio' ? 'active' : ''} title={t('nav_portfolio')}>
            {t('nav_portfolio')}
          </Link>
          <Link href="/sobre" className={location === '/sobre' ? 'active' : ''} title={t('nav_sobre')}>
            {t('nav_sobre')}
          </Link>
          <Link href="/contato" className={location === '/contato' ? 'active' : ''} title={t('nav_contato')}>
            {t('nav_contato')}
          </Link>
        </nav>

        <div className="lang" aria-label="Seletor de Idioma">
          <button
            type="button"
            className={language === 'pt' ? 'active' : ''}
            onClick={() => setLanguage('pt')}
            title="Português Brasileiro"
          >
            PT
          </button>
          <button
            type="button"
            className={language === 'en' ? 'active' : ''}
            onClick={() => setLanguage('en')}
            title="English"
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}
