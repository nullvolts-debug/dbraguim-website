import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
}

export function useSEO({ title, description, image, url }: SEOProps) {
  useEffect(() => {
    // 1. Título
    document.title = title;

    // Função auxiliar para meta tags
    const setMeta = (attr: string, key: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Descrição Básica
    if (description) {
      setMeta('name', 'description', description);
    }

    // 3. Open Graph (Facebook/WhatsApp)
    setMeta('property', 'og:title', title);
    if (description) setMeta('property', 'og:description', description);
    if (image) setMeta('property', 'og:image', image);
    if (url) setMeta('property', 'og:url', url);
    setMeta('property', 'og:type', 'website');

    // 4. Twitter
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    if (description) setMeta('name', 'twitter:description', description);
    if (image) setMeta('name', 'twitter:image', image);

  }, [title, description, image, url]);
}
