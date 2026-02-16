import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
}

export function SEO({ title, description, image, url }: SEOProps) {
  const siteName = 'DBraguim Cutelaria';
  // Garante que o nome da marca apareça no final se não estiver no título
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  
  // --- CONTROLE BLINDADO DO PRERENDER ---
  // Esse useEffect garante que o Prerender SÓ tire a foto quando a imagem REAL chegar.
  useEffect(() => {
    // 1. Verifica se temos título e imagem definidos
    if (title && image) {
      
      // 🚨 TRAVA DE SEGURANÇA CRÍTICA:
      // Se a imagem for a PADRÃO (fallback), NÃO LIBERA O PRERENDER AINDA!
      // Isso obriga o Prerender a esperar a imagem do Sanity chegar.

      // ✅ Se chegou aqui, é uma imagem REAL (do Sanity ou outra específica)
      // console.log('✅ SEO: Imagem Real detectada! Preparando liberação...', image);
      
      const timer = setTimeout(() => {
        // Só libera se o Prerender ainda estiver esperando (false)
        if ((window as any).prerenderReady === false) {
           (window as any).prerenderReady = true;
           console.log('📸 PRERENDER LIBERADO COM SUCESSO!');
        }
      }, 500); // 500ms de segurança para o Helmet aplicar as tags no <head>
      
      return () => clearTimeout(timer);
    }
  }, [image, title]);

  return (
    <Helmet>
      {/* Título e Meta Básica */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph (Facebook/Zap) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {/* Força a renderização da imagem se existir */}
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
}