import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
// IMPORT NOVO
import { GlobalShareButton } from '@/components/ui/GlobalShareButton';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header__inner flex items-center justify-between">
        
        {/* LOGO E NOME */}
        <Link href="/" className="brand flex items-center gap-2" title="D.Braguim - Cutelaria Artesanal">
          <span className="brand__logo">
            <img src="/images/logo/logo.svg" alt="D.Braguim - Logo" width={70} height={48} />
          </span>
          <span className="brand__name text-xl font-serif">D.Braguim</span>
        </Link>

        {/* 
           MOBILE: Botão de Menu Hambúrguer 
           (Adicionei 'ml-auto' para empurrar para direita se precisar)
        */}
        <div className="md:hidden flex items-center gap-2">
          {/* Opcional: Share no topo mobile também? Se não, deixe só dentro do menu */}
          <GlobalShareButton className="md:hidden mr-2" /> 

          <button
            className="mobile-menu-button p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* DESKTOP NAV */}
        <nav className="nav hidden md:flex items-center gap-6" aria-label="Navegação Principal">
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

          {/* ÁREA DE AÇÕES (LANG + SHARE) */}
          <div className="flex items-center gap-3 border-l border-white/10 pl-4 ml-2">
            
            {/* 🆕 SHARE BUTTON DESKTOP */}
            <GlobalShareButton />
            
            <div className="lang flex items-center gap-2" aria-label="Seletor de Idioma">
              <button
                type="button"
                className={`text-sm ${language === 'pt' ? 'font-bold text-[var(--gold)]' : 'text-white/50'}`}
                onClick={() => setLanguage('pt')}
                title="Português Brasileiro"
              >
                PT
              </button>
              <span className="text-white/20">|</span>
              <button
                type="button"
                className={`text-sm ${language === 'en' ? 'font-bold text-[var(--gold)]' : 'text-white/50'}`}
                onClick={() => setLanguage('en')}
                title="English"
              >
                EN
              </button>
            </div>
          </div>
        </nav>

        {/* MOBILE MENU EXPANDIDO */}
        {mobileMenuOpen && (
          <nav className="mobile-nav md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-md p-6 flex flex-col gap-4 border-t border-white/10" aria-label="Navegação Mobile">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>{t('nav_home')}</Link>
            <Link href="/portfolio" onClick={() => setMobileMenuOpen(false)}>{t('nav_portfolio')}</Link>
            <Link href="/sobre" onClick={() => setMobileMenuOpen(false)}>{t('nav_sobre')}</Link>
            <Link href="/contato" onClick={() => setMobileMenuOpen(false)}>{t('nav_contato')}</Link>
            
            <div className="mobile-nav__lang flex items-center justify-center gap-4 mt-4 pt-4 border-t border-white/10">
              <button 
                className={language === 'pt' ? 'text-[var(--gold)]' : 'text-white/50'}
                onClick={() => { setLanguage('pt'); setMobileMenuOpen(false); }}
              >
                PT
              </button>
              <button 
                className={language === 'en' ? 'text-[var(--gold)]' : 'text-white/50'}
                onClick={() => { setLanguage('en'); setMobileMenuOpen(false); }}
              >
                EN
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}