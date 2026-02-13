import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

export default function NewsletterForm() {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');

  // 1. APONTA PARA O ROUTER CORRETO (newsletter)
  const subscribe = trpc.newsletter.subscribe.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message); // Usa a mensagem que vem do backend
        setEmail('');
      } else {
        toast.error(data.message); // Email já cadastrado, etc.
      }
    },
    onError: (error) => {
      toast.error(error.message || (
        language === 'en' 
          ? 'Error subscribing.' 
          : 'Erro ao se inscrever.'
      ));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // 2. ENVIA O OBJETO COMO O ZOD ESPERA (com source)
    subscribe.mutate({ 
      email, 
      source: 'email' 
    });
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