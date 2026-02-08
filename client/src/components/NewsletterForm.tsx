import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

export default function NewsletterForm() {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const subscribe = trpc.newsletter.subscribe.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        setStatus('success');
        setMessage(
          language === 'en'
            ? 'Successfully subscribed to newsletter!'
            : 'Inscrito na newsletter com sucesso!'
        );
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message);
      }
    },
    onError: () => {
      setStatus('error');
      setMessage(
        language === 'en'
          ? 'Error subscribing. Please try again.'
          : 'Erro ao se inscrever. Tente novamente.'
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setMessage('');
    subscribe.mutate({ email, source: 'email' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={language === 'en' ? 'Your email' : 'Seu e-mail'}
        required
        disabled={subscribe.isPending}
      />
      <Button type="submit" disabled={subscribe.isPending} className="w-full btn btn--secondary">
        {subscribe.isPending
          ? language === 'en'
            ? 'Subscribing...'
            : 'Inscrevendo...'
          : language === 'en'
          ? 'Subscribe'
          : 'Cadastrar'}
      </Button>

      {status === 'success' && (
        <div
          style={{
            padding: '12px',
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            color: '#22c55e',
            borderRadius: '6px',
            fontSize: '0.9rem',
            textAlign: 'center',
          }}
        >
          {message}
        </div>
      )}

      {status === 'error' && (
        <div
          style={{
            padding: '12px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#ef4444',
            borderRadius: '6px',
            fontSize: '0.9rem',
            textAlign: 'center',
          }}
        >
          {message}
        </div>
      )}
    </form>
  );
}
