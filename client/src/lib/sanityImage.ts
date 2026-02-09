import imageUrlBuilder from '@sanity/image-url';
import { createClient } from '@sanity/client';

// Cliente Sanity para o frontend (apenas leitura, usa CDN)
// O projectId é hardcoded como fallback para garantir que funcione em produção
const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '9kunhe1k',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-02-08',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

/**
 * Gera URL da imagem do Sanity CDN a partir de uma referência de imagem
 * @param source - Objeto de imagem do Sanity (com asset._ref) ou string _ref
 * @returns URL builder do Sanity para encadear transformações
 */
export function urlForImage(source: any) {
  return builder.image(source);
}

/**
 * Gera URL da imagem com tamanho otimizado
 * @param source - Objeto de imagem do Sanity
 * @param width - Largura desejada (padrão: 800)
 * @returns URL string da imagem
 */
export function getImageUrl(source: any, width: number = 800): string {
  if (!source) return '';
  try {
    const url = urlForImage(source).width(width).auto('format').quality(80).url();
    // Verificar se a URL gerada é válida (deve conter cdn.sanity.io)
    if (url && url.includes('cdn.sanity.io')) {
      return url;
    }
    // Se a URL não contém cdn.sanity.io, construir manualmente
    if (source?.asset?._ref) {
      const ref = source.asset._ref;
      // Formato: image-{id}-{dimensions}-{format}
      const match = ref.match(/^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/);
      if (match) {
        return `https://cdn.sanity.io/images/9kunhe1k/production/${ref.replace('image-', '').replace(/-(\w+)$/, '.$1')}?w=${width}&auto=format&q=80`;
      }
    }
    return url || '';
  } catch {
    // Fallback: construir URL manualmente a partir do _ref
    if (source?.asset?._ref) {
      const ref = source.asset._ref;
      const match = ref.match(/^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/);
      if (match) {
        return `https://cdn.sanity.io/images/9kunhe1k/production/${match[1]}-${match[2]}.${match[3]}?w=${width}&auto=format&q=80`;
      }
    }
    return '';
  }
}

/**
 * Gera URL da imagem para thumbnail/card
 */
export function getCardImageUrl(source: any): string {
  return getImageUrl(source, 600);
}

/**
 * Gera URL da imagem em alta resolução para modal
 */
export function getFullImageUrl(source: any): string {
  return getImageUrl(source, 1200);
}
