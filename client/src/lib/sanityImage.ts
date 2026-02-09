import imageUrlBuilder from '@sanity/image-url';
import { createClient } from '@sanity/client';

// Cliente Sanity para o frontend (apenas leitura, usa CDN)
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
    return urlForImage(source).width(width).auto('format').quality(80).url();
  } catch {
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
