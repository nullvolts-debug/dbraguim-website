import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const CONTACT = {
  whatsappNumber: '5511991953021',
  instagramHandle: 'd.braguim',
  email: 'contato@dbraguim.com',
};

export default function Contato() {
  const { t, language } = useLanguage();
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

  return (
    <>
      <section className="section">
        <div className="container">
          <h1>{t('nav_contato')}</h1>

          <div className="contact__intro" style={{ marginBottom: '48px' }}>
            <h2>{t('contact_intro_title')}</h2>
            <p className="lead">{t('contact_intro_text')}</p>
            <div className="hero__cta" style={{ marginTop: '24px' }}>
              <a
                className="btn btn--whatsapp"
                href={`https://wa.me/${CONTACT.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                title={t('contact_btn_whatsapp')}
              >
                {t('contact_btn_whatsapp')}
              </a>
              <a
                className="btn btn--secondary"
                href={`mailto:${CONTACT.email}`}
                title={t('contact_btn_email')}
              >
                {t('contact_btn_email')}
              </a>
            </div>
          </div>

          {/* Formulário de Contato */}
          <div style={{ maxWidth: '600px', marginBottom: '48px' }}>
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

          {/* Newsletter Section */}
          <section style={{ marginTop: '64px' }}>
            <h2>{t('contact_news_title')}</h2>
            <p className="lead">{t('contact_news_text')}</p>

            <div style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>{t('contact_tab_whatsapp')}</h3>
              <p style={{ color: 'var(--muted)', marginBottom: '16px' }}>{t('contact_whats_instructions')}</p>
              <a
                className="btn btn--whatsapp"
                href={`https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(broadcastMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('contact_whats_btn')}
              </a>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
