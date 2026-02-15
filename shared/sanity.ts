import { createClient } from '@sanity/client';
import createImageUrlBuilder from '@sanity/image-url';

// Configuração do cliente Sanity
// O projectId é hardcoded como fallback para garantir que funcione
// tanto no servidor (process.env) quanto no frontend (import.meta.env)
const getProjectId = () => {
  try {
    // Frontend (Vite)
    if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SANITY_PROJECT_ID) {
      return import.meta.env.VITE_SANITY_PROJECT_ID;
    }
  } catch {}
  try {
    // Servidor (Node.js)
    if (typeof process !== 'undefined' && process.env?.VITE_SANITY_PROJECT_ID) {
      return process.env.VITE_SANITY_PROJECT_ID;
    }
  } catch {}
  // Fallback hardcoded
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

// Builder para URLs de imagens
const builder = createImageUrlBuilder(sanityClient); 

export function urlForImage(source: any) {
  return builder.image(source);
}

// Tipos para o schema do Sanity
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
  images: Array<{
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
