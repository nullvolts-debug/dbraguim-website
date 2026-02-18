// ✅ CORREÇÃO: Usando a importação nomeada para remover o aviso "deprecated"
import { createImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
// Se a linha acima der erro de tipo (vermelho), use esta alternativa:
// import imageUrlBuilder from '@sanity/image-url'; 

import { createClient } from '@sanity/client';

// Cliente Sanity para o frontend (apenas leitura, usa CDN)
const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '9kunhe1k',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-02-08',
  useCdn: true,
});

// ✅ CORREÇÃO: Usando a função importada corretamente
// OBS: Se você não conseguir usar o named import acima, 
// mantenha como estava, pois o aviso não quebra o site.
const builder = createImageUrlBuilder(client);

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
    
    if (url && url.includes('cdn.sanity.io')) {
      return url;
    }
    
    // Fallback manual se a URL falhar
    if (source?.asset?._ref) {
      const ref = source.asset._ref;
      const match = ref.match(/^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/);
      if (match) {
        return `https://cdn.sanity.io/images/9kunhe1k/production/${ref.replace('image-', '').replace(/-(\w+)$/, '.$1')}?w=${width}&auto=format&q=80`;
      }
    }
    return url || '';
  } catch {
    return '';
  }
}

export function getCardImageUrl(source: any): string {
  return getImageUrl(source, 600);
}

export function getFullImageUrl(source: any): string {
  return getImageUrl(source, 1200);
}

export function getFileUrl(source: any): string | null {
  const ref = source?.asset?._ref || (typeof source === 'string' ? source : null);
  if (!ref) return null;

  const parts = ref.split('-');
  if (parts.length < 3 || parts[0] !== 'file') return null;

  const id = parts[1];
  const format = parts[2];
  const { projectId, dataset } = client.config();

  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${format}`;
}