import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { GlobalShareButton } from '@/components/ui/GlobalShareButton';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header fixed top-0 left-0 w-full z-[100] bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="container h-20 flex items-center justify-between">
        
        {/* 1. LOGO (Sempre Visível) */}
        <Link href="/" className="brand flex items-center gap-2" title="D.Braguim - Cutelaria Artesanal">
          <span className="brand__logo">
            {/* Ajuste o tamanho da logo se necessário */}
            <img src="/images/logo/logo.svg" alt="D.Braguim" className="h-10 w-auto" />
          </span>
          <span className="brand__name text-xl font-serif text-white">D.Braguim</span>
        </Link>

        {/* 
            2. CONTROLES MOBILE (Share + Lang + Menu)
            Visível apenas em telas pequenas (md:hidden)
        */}
        <div className="flex items-center gap-3 md:hidden">
          
          {/* A. Compartilhar Mobile */}
          <GlobalShareButton />

          {/* B. Idioma Mobile (Compacto) */}
          <div className="flex items-center gap-1 text-sm font-medium border-l border-white/10 pl-3">
            <button
              type="button"
              className={`${language === 'pt' ? 'text-[var(--gold)]' : 'text-white/50'}`}
              onClick={() => setLanguage('pt')}
            >
              PT
            </button>
            <span className="text-white/20">|</span>
            <button
              type="button"
              className={`${language === 'en' ? 'text-[var(--gold)]' : 'text-white/50'}`}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
          </div>

          {/* C. Botão Hambúrguer */}
          <button
            className="p-1 text-[var(--gold)] hover:text-white transition-colors ml-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* 
            3. NAVEGAÇÃO DESKTOP 
            Escondida no mobile (hidden), visível no PC (md:flex)
        */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegação Principal">
          <Link href="/" className={`nav-link hover:text-[var(--gold)] transition-colors ${location === '/' ? 'text-[var(--gold)]' : 'text-white/80'}`}>
            {t('nav_home')}
          </Link>
          <Link href="/portfolio" className={`nav-link hover:text-[var(--gold)] transition-colors ${location === '/portfolio' ? 'text-[var(--gold)]' : 'text-white/80'}`}>
            {t('nav_portfolio')}
          </Link>
          <Link href="/sobre" className={`nav-link hover:text-[var(--gold)] transition-colors ${location === '/sobre' ? 'text-[var(--gold)]' : 'text-white/80'}`}>
            {t('nav_sobre')}
          </Link>
          <Link href="/contato" className={`nav-link hover:text-[var(--gold)] transition-colors ${location === '/contato' ? 'text-[var(--gold)]' : 'text-white/80'}`}>
            {t('nav_contato')}
          </Link>

          {/* Ações Desktop (Share + Lang) */}
          <div className="flex items-center gap-4 border-l border-white/10 pl-6 ml-2">
            <GlobalShareButton />
            
            <div className="flex items-center gap-2 text-sm font-medium">
              <button
                type="button"
                className={`transition-colors ${language === 'pt' ? 'text-[var(--gold)]' : 'text-white/50 hover:text-white'}`}
                onClick={() => setLanguage('pt')}
              >
                PT
              </button>
              <span className="text-white/20">|</span>
              <button
                type="button"
                className={`transition-colors ${language === 'en' ? 'text-[var(--gold)]' : 'text-white/50 hover:text-white'}`}
                onClick={() => setLanguage('en')}
              >
                EN
              </button>
            </div>
          </div>
        </nav>

        {/* 
            4. MENU EXPANDIDO (MOBILE APENAS)
            Agora só tem os links, já que Lang/Share subiram para a barra
        */}
        {mobileMenuOpen && (
          <nav className="mobile-nav md:hidden absolute top-20 left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 flex flex-col p-6 animate-in slide-in-from-top-5 duration-200 shadow-2xl">
            <Link href="/" className={`text-lg py-3 border-b border-white/5 ${location === '/' ? 'text-[var(--gold)]' : 'text-white/80'}`} onClick={() => setMobileMenuOpen(false)}>
              {t('nav_home')}
            </Link>
            <Link href="/portfolio" className={`text-lg py-3 border-b border-white/5 ${location === '/portfolio' ? 'text-[var(--gold)]' : 'text-white/80'}`} onClick={() => setMobileMenuOpen(false)}>
              {t('nav_portfolio')}
            </Link>
            <Link href="/sobre" className={`text-lg py-3 border-b border-white/5 ${location === '/sobre' ? 'text-[var(--gold)]' : 'text-white/80'}`} onClick={() => setMobileMenuOpen(false)}>
              {t('nav_sobre')}
            </Link>
            <Link href="/contato" className={`text-lg py-3 ${location === '/contato' ? 'text-[var(--gold)]' : 'text-white/80'}`} onClick={() => setMobileMenuOpen(false)}>
              {t('nav_contato')}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}