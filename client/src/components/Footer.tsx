import { useLanguage } from '@/contexts/LanguageContext';

const CONTACT = {
  whatsappNumber: '5511991953021',
  instagramHandle: 'd.braguim',
  email: 'contato@dbraguim.com',
};

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>© {currentYear} D.Braguim</span>
        <span>{t('footer_rights')}</span>
        <div className="footer__social">
          <a
            href={`https://instagram.com/${CONTACT.instagramHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Siga D.Braguim no Instagram"
            title="Instagram"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <circle cx="17.5" cy="6.5" r="1.5"></circle>
            </svg>
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            aria-label="Envie um e-mail para D.Braguim"
            title="E-mail"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
