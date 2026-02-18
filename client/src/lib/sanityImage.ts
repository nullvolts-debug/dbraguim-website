// ✅ MUDANÇA AQUI: Usando chaves { } para pegar a exportação nomeada
import { createImageUrlBuilder } from '@sanity/image-url';
import { createClient } from '@sanity/client';

// Cliente Sanity para o frontend (apenas leitura, usa CDN)
const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '9kunhe1k',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-02-08',
  useCdn: true,
});

// ✅ MUDANÇA AQUI: Usando a função nomeada
const builder = createImageUrlBuilder(client);

/**
 * Gera URL da imagem do Sanity CDN a partir de uma referência de imagem
 * @param source - Objeto de imagem do Sanity (com asset._ref) ou string _ref
 * @returns URL builder do Sanity para encadear transformações
 */
export function urlForImage(source: any) {
  // Verifica se a fonte é válida antes de chamar o builder
  if (!source || (!source.asset && typeof source !== 'string')) {
    // Retorna um objeto mock seguro para evitar quebras se a imagem for nula
    return {
      width: () => ({ auto: () => ({ quality: () => ({ url: () => '' }) }) }),
    } as any;
  }
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
    // Se a URL não contém cdn.sanity.io, construir manualmente (Fallback)
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
    // Fallback final: construir URL manualmente a partir do _ref
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

/**
 * Gera URL de arquivo (Vídeo, PDF, etc) do Sanity
 * Transforma 'file-123...-mp4' em 'https://cdn.sanity.io/files/...'
 */
export function getFileUrl(source: any): string | null {
  // Tenta pegar o _ref seja passando o objeto completo ou só a string
  const ref = source?.asset?._ref || (typeof source === 'string' ? source : null);

  if (!ref) return null;

  // O ref vem no formato: "file-ID-FORMATO" (ex: file-abc12345-mp4)
  const parts = ref.split('-');
  
  if (parts.length < 3 || parts[0] !== 'file') {
    return null; // Não é um arquivo válido
  }

  const id = parts[1];
  const format = parts[2];

  // Pega as configs direto do cliente já instanciado no topo do arquivo
  const { projectId, dataset } = client.config();

  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${format}`;
}