import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'knife',
  title: 'Faca',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Caça', value: 'hunting' },
          { title: 'Luta', value: 'fighter' },
          { title: 'Chef', value: 'chef' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Disponível', value: 'available' },
          { title: 'Vendida', value: 'sold' },
          { title: 'Encomenda', value: 'commission' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Imagens',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule) => Rule.required().min(1),
    }),
    
    // --- MUDANÇA AQUI: NOVO CAMPO DE URL ---
    defineField({
      name: 'videoUrl',
      title: 'Link do Vídeo (Cloudinary/YouTube)',
      type: 'url',
      description: 'Cole aqui o link do vídeo (ex: https://res.cloudinary.com/... ou YouTube). Prefira usar este campo para economizar banda.',
    }),
    
    // --- MUDANÇA AQUI: CAMPO ANTIGO DEPRECIADO ---
    defineField({
      name: 'video',
      title: 'Vídeo (Arquivo - Depreciado)',
      type: 'file',
      description: '⚠️ Evite usar upload direto. Use o campo "Link do Vídeo" acima para melhor performance.',
      options: {
        accept: 'video/mp4',
      },
    }),

    defineField({
      name: 'videoPoster',
      title: 'Poster do Vídeo (Capa)',
      type: 'image',
      description: 'Imagem de capa do vídeo (Obrigatória para o player não ficar preto antes do play)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description_pt',
      title: 'Descrição (Português)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description_en',
      title: 'Descrição (Inglês)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'model',
      title: 'Modelo',
      type: 'string',
      description: 'Ex: Hunter, Fighter, Chef',
    }),
    defineField({
      name: 'length',
      title: 'Comprimento',
      type: 'string',
      description: 'Ex: 22 cm',
    }),
    defineField({
      name: 'width',
      title: 'Largura',
      type: 'string',
      description: 'Ex: 3,5 cm',
    }),
    defineField({
      name: 'thickness',
      title: 'Espessura',
      type: 'string',
      description: 'Ex: 4 mm',
    }),
    defineField({
      name: 'steel_pt',
      title: 'Aço (Português)',
      type: 'string',
      description: 'Ex: Damasco liga 1095 com 15N20',
    }),
    defineField({
      name: 'steel_en',
      title: 'Aço (Inglês)',
      type: 'string',
      description: 'Ex: Damascus liga 1095 com 15N20',
    }),
    defineField({
      name: 'handle_pt',
      title: 'Cabo (Português)',
      type: 'string',
      description: 'Ex: Poplar burl',
    }),
    defineField({
      name: 'handle_en',
      title: 'Cabo (Inglês)',
      type: 'string',
      description: 'Ex: Poplar burl',
    }),
    defineField({
      name: 'featured',
      title: 'Destaque',
      type: 'boolean',
      description: 'Mostrar na página inicial',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Ordem',
      type: 'number',
      description: 'Ordem de exibição (menor número aparece primeiro)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'images.0',
      status: 'status',
      slug: 'slug',
    },
    prepare({ title, subtitle, media, status, slug }) {
      const statusLabels: Record&lt;string, string> = {
        available: '✅ Disponível',
        sold: '❌ Vendida',
        commission: '⏳ Encomenda',
      };
      const slugValue = slug?.current ? ` (/${slug.current})` : '';
      
      return {
        title,
        subtitle: `${subtitle} - ${statusLabels[status] || status}${slugValue}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Ordem',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Nome',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{ field: 'status', direction: 'asc' }],
    },
  ],
});