import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react'; // Importe useEffect

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
}

export function SEO({ title, description, image, url }: SEOProps) {
  const siteName = 'DBraguim Cutelaria';
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  // --- CONTROLE SUPREMO DO PRERENDER ---
  // Só libera a foto quando o Título E a Imagem estiverem definidos!
  useEffect(() => {
    // Se tiver imagem (URL válida) e título, libera o Prerender
    if (image && image.startsWith('http') && title) {
      // Pequeno delay pro Helmet aplicar as tags no <head>
      const timer = setTimeout(() => {
        if (window.prerenderReady === false) { // Só muda se ainda estiver false
           (window as any).prerenderReady = true;
           console.log('✅ SEO PRONTO: Prerender Liberado com imagem:', image);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [image, title]);

  return (
    <Helmet>
      {/* ... mesmo código de antes ... */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {/* Força a renderização da imagem se existir */}
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
}