import { createClient } from '@sanity/client';
// ✅ AGORA SIM: Usando chaves { } para importar a função nomeada
import { createImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
// Se a linha acima der erro de tipo, use esta:
// import createImageUrlBuilder from '@sanity/image-url'; 

// Configuração do cliente Sanity
const getProjectId = () => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SANITY_PROJECT_ID) {
      return import.meta.env.VITE_SANITY_PROJECT_ID;
    }
  } catch {}
  try {
    if (typeof process !== 'undefined' && process.env?.VITE_SANITY_PROJECT_ID) {
      return process.env.VITE_SANITY_PROJECT_ID;
    }
  } catch {}
  return '9kunhe1k';
};

const getDataset = () => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SANITY_DATASET) {
      return import.meta.env.VITE_SANITY_DATASET;
    }
  } catch {}
  try {
    if (typeof process !== 'undefined' && process.env?.VITE_SANITY_DATASET) {
      return process.env.VITE_SANITY_DATASET;
    }
  } catch {}
  return 'production';
};

export const sanityConfig = {
  projectId: getProjectId(),
  dataset: getDataset(),
  apiVersion: '2024-02-08',
  useCdn: true,
};

// Cliente Sanity para uso no servidor
export const sanityClient = createClient(sanityConfig);

// ✅ AGORA SIM: Usando a função nomeada importada
// Se der erro de "not a function", volte para:
// const builder = imageUrlBuilder(sanityClient);
// Mas com a importação certa lá em cima, isso deve funcionar:
const builder = createImageUrlBuilder(sanityClient);

export function urlForImage(source: any) {
  // Verificação de segurança: se source for nulo ou indefinido, retorna null
  if (!source || !source.asset) return undefined;
  return builder.image(source);
}

// Tipos para o schema do Sanity (MANTIDOS IGUAIS)
export interface SanityKnife {
  _id: string;
  _type: 'knife';
  name: string;
  slug?: {
    _type: 'slug';
    current: string;
  };
  category: 'hunting' | 'fighter' | 'chef';
  status: 'available' | 'sold' | 'commission';
  images: Array&lt;{
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  }>;
  video?: {
    _type: 'file';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  videoPoster?: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  description_pt: string;
  description_en: string;
  model: string;
  length: string;
  width: string;
  thickness: string;
  steel_pt: string;
  steel_en: string;
  handle_pt: string;
  handle_en: string;
  featured?: boolean;
  order?: number;
}

export interface SanitySiteSettings {
  _id: string;
  _type: 'siteSettings';
  title_pt: string;
  title_en: string;
  slogan_pt: string;
  slogan_en: string;
  whatsappNumber: string;
  instagramHandle: string;
  email: string;
  phone: string;
}