import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header__inner">
        <Link href="/" className="brand" title="D.Braguim - Cutelaria Artesanal">
          <span className="brand__logo">
            <img src="/images/logo/logo.svg" alt="D.Braguim - Logo" width={48} height={48} />
          </span>
          <span className="brand__name">D.Braguim</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="mobile-menu-button md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <nav className="nav hidden md:flex" aria-label="Navegação Principal">
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

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <nav className="mobile-nav md:hidden" aria-label="Navegação Mobile">
            <Link
              href="/"
              className={location === '/' ? 'active' : ''}
              title={t('nav_home')}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav_home')}
            </Link>
            <Link
              href="/portfolio"
              className={location === '/portfolio' ? 'active' : ''}
              title={t('nav_portfolio')}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav_portfolio')}
            </Link>
            <Link
              href="/sobre"
              className={location === '/sobre' ? 'active' : ''}
              title={t('nav_sobre')}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav_sobre')}
            </Link>
            <Link
              href="/contato"
              className={location === '/contato' ? 'active' : ''}
              title={t('nav_contato')}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav_contato')}
            </Link>
            <div className="mobile-nav__lang">
              <button
                type="button"
                className={language === 'pt' ? 'active' : ''}
                onClick={() => { setLanguage('pt'); setMobileMenuOpen(false); }}
                title="Português Brasileiro"
              >
                PT
              </button>
              <button
                type="button"
                className={language === 'en' ? 'active' : ''}
                onClick={() => { setLanguage('en'); setMobileMenuOpen(false); }}
                title="English"
              >
                EN
              </button>
            </div>
          </nav>
        )}

        <div className="lang hidden md:flex" aria-label="Seletor de Idioma">
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
