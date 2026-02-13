import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner'; // Importante para feedback visual

export default function NewsletterForm() {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');

  // MUDANÇA 1: Usar 'contact.subscribe' em vez de 'newsletter.subscribe'
  // (Ou verifique se no backend existe mesmo 'newsletter')
  const subscribe = trpc.contact.subscribe.useMutation({
    onSuccess: () => {
      toast.success(
        language === 'en' 
          ? 'Successfully subscribed!' 
          : 'Inscrito com sucesso!'
      );
      setEmail('');
    },
    onError: (error) => {
      toast.error(
        language === 'en' 
          ? error.message || 'Error subscribing.' 
          : error.message || 'Erro ao se inscrever.'
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // MUDANÇA 2: Enviar apenas o email (a menos que o backend exija 'source')
    subscribe.mutate({ email });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={language === 'en' ? 'Your best email' : 'Seu melhor e-mail'}
        required
        disabled={subscribe.isPending}
        className="bg-black border border-[var(--line)] text-white placeholder:text-gray-500"
      />
      
      <Button 
        type="submit" 
        disabled={subscribe.isPending} 
        className="w-full btn btn--secondary font-bold uppercase tracking-wider"
      >
        {subscribe.isPending
          ? (language === 'en' ? 'Subscribing...' : 'Inscrevendo...')
          : (language === 'en' ? 'Sign Up' : 'Cadastrar')}
      </Button>
    </form>
  );
}