import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import NewsletterForm from '@/components/NewsletterForm';
// 1. IMPORTANTE: Use o componente SEO
import { SEO } from '@/components/SEO';

const CONTACT = {
  whatsappNumber: '5511991953021',
  instagramHandle: 'd.braguim',
  email: 'contato@dbraguim.com',
};

export default function Contato() {
  const { t, language } = useLanguage();
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const submitContact = trpc.contact.submit.useMutation({
    onSuccess: () => {
      toast.success(t('contact_form_success'));
      setFormData({ name: '', email: '', message: '' });
    },
    onError: (error) => {
      toast.error(error.message || t('contact_form_error'));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitContact.mutate(formData);
  };

  const broadcastMsg =
    language === 'en'
      ? "Hi! I'd like to join your D.Braguim broadcast list. My name is _____. Thank you!"
      : 'Olá! Quero entrar na sua lista de transmissão da D.Braguim. Meu nome é _____. Obrigado!';

  // REMOVIDO: useSEO(...)

  return (
    <>
      {/* 2. ADICIONE O COMPONENTE SEO AQUI */}
      <SEO
        title="Contato"
        description="Entre em contato para encomendas, dúvidas ou compra de facas artesanais exclusivas."
        url="https://www.dbraguim.com/contato"
      />

      <section className="section">
        <div className="container">
          <div className="contact__intro" style={{ 
            marginBottom: '48px',
            background: 'var(--paper)',
            border: '1px solid var(--line)',
            borderRadius: '12px',
            padding: '32px',
          }}>
            <h2>{t('contact_intro_title')}</h2>
            <p className="lead">{t('contact_intro_text')}</p>
            <div className="contact__buttons">
              <a
                className="btn btn--whatsapp"
                href={`https://wa.me/${CONTACT.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                title={t('contact_btn_whatsapp')}
              >
                {t('contact_btn_whatsapp')}
              </a>
              <button
                className="btn btn--secondary"
                onClick={() => setShowEmailForm(!showEmailForm)}
                title={t('contact_btn_email')}
              >
                {showEmailForm ? 'Ocultar Formulário' : t('contact_btn_email')}
              </button>
            </div>
          </div>

          {/* Formulário de Contato */}
          {showEmailForm && (
            <div style={{ maxWidth: '600px', marginBottom: '48px', marginTop: '48px' }}>
              <h2 style={{ marginBottom: '24px' }}>Formulário de Contato</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">{t('contact_form_name_label')}</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t('contact_form_name_placeholder')}
                    required
                    disabled={submitContact.isPending}
                  />
                </div>

                <div>
                  <Label htmlFor="email">{t('contact_form_email_label')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t('contact_form_email_placeholder')}
                    required
                    disabled={submitContact.isPending}
                  />
                </div>

                <div>
                  <Label htmlFor="message">{t('contact_form_message_label')}</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('contact_form_message_placeholder')}
                    required
                    disabled={submitContact.isPending}
                    rows={6}
                  />
                </div>

                <Button type="submit" disabled={submitContact.isPending} className="w-full">
                  {submitContact.isPending ? 'Enviando...' : t('contact_form_submit')}
                </Button>
              </form>
            </div>
          )}

          {/* Newsletter Section */}
          <section style={{ marginTop: '64px' }}>
            <h2>{t('contact_news_title')}</h2>
            <p className="lead">{t('contact_news_text')}</p>

            <div className="contact__newsletter-grid">
              {/* WhatsApp */}
              <div
                style={{
                  background: 'var(--paper)',
                  border: '1px solid var(--line)',
                  borderRadius: '12px',
                  padding: '24px',
                }}
              >
                <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>{t('contact_tab_whatsapp')}</h3>
                <p style={{ color: '#888888', marginBottom: '16px' }}>{t('contact_whats_instructions')}</p>
                <a
                  className="btn btn--whatsapp"
                  href={`https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(broadcastMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('contact_whats_btn')}
                </a>
              </div>

              {/* Email Newsletter */}
              <div
                style={{
                  background: 'var(--paper)',
                  border: '1px solid var(--line)',
                  borderRadius: '12px',
                  padding: '24px',
                }}
              >
                <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>E-mail</h3>
                <p style={{ color: '#888888', marginBottom: '16px' }}>
                  {language === 'en'
                    ? 'Enter your email to subscribe to our newsletter.'
                    : 'Digite seu e-mail para se inscrever na nossa newsletter.'}
                </p>
                <NewsletterForm />
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}