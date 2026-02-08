import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Configuração do cliente Sanity
// Estas variáveis serão configuradas via environment variables
export const sanityConfig = {
  projectId: process.env.VITE_SANITY_PROJECT_ID || '',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-02-08',
  useCdn: process.env.NODE_ENV === 'production',
};

// Cliente Sanity para uso no servidor
export const sanityClient = createClient(sanityConfig);

// Builder para URLs de imagens
const builder = imageUrlBuilder(sanityClient);

export function urlForImage(source: any) {
  return builder.image(source);
}

// Tipos para o schema do Sanity
export interface SanityKnife {
  _id: string;
  _type: 'knife';
  name: string;
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
