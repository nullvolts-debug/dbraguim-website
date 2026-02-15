import { Share2, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useLocation } from 'wouter'; // Adicionado para ouvir mudanças de rota

export function GlobalShareButton({ className = '' }: { className?: string }) {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [location] = useLocation(); // Hook que detecta a mudança de página

  // Atualiza a URL sempre que a rota mudar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(window.location.href);
    }
  }, [location]); // Dependência: location (executa quando muda a rota)

  const handleShare = async () => {
    if (!url) return;

    const shareData = {
      title: document.title || 'D.Braguim - Cutelaria Artesanal',
      text: 'Confira esta arte em aço da D.Braguim.',
      url: url,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelado');
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        toast.success('Link copiado!');
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        toast.error('Erro ao copiar link');
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`
        p-2 rounded-full 
        text-white/70 hover:text-[var(--gold)] 
        transition-colors duration-300
        flex items-center justify-center
        ${className}
      `}
      aria-label="Compartilhar esta página"
      title="Compartilhar Página Atual"
    >
      {copied ? <Check size={20} className="text-green-500" /> : <Share2 size={20} />}
    </button>
  );
}