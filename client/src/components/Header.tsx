import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [location] = useLocation();

  return (
    <header className="header">
      <div className="container header__inner">
        <Link href="/">
          <a className="brand" title="D.Braguim - Cutelaria Artesanal">
            <span className="brand__logo">
              <img src="/images/logo/logo.svg" alt="D.Braguim - Logo" width={48} height={48} />
            </span>
            <span className="brand__name">D.Braguim</span>
          </a>
        </Link>

        <nav className="nav" aria-label="Navegação Principal">
          <Link href="/">
            <a className={location === '/' ? 'active' : ''} title={t('nav_home')}>
              {t('nav_home')}
            </a>
          </Link>
          <Link href="/portfolio">
            <a className={location === '/portfolio' ? 'active' : ''} title={t('nav_portfolio')}>
              {t('nav_portfolio')}
            </a>
          </Link>
          <Link href="/sobre">
            <a className={location === '/sobre' ? 'active' : ''} title={t('nav_sobre')}>
              {t('nav_sobre')}
            </a>
          </Link>
          <Link href="/contato">
            <a className={location === '/contato' ? 'active' : ''} title={t('nav_contato')}>
              {t('nav_contato')}
            </a>
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
