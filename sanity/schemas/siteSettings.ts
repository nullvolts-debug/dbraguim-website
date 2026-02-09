import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Configurações do Site',
  type: 'document',
  fields: [
    defineField({
      name: 'title_pt',
      title: 'Título (Português)',
      type: 'string',
      description: 'Nome do site em português',
    }),
    defineField({
      name: 'title_en',
      title: 'Título (Inglês)',
      type: 'string',
      description: 'Nome do site em inglês',
    }),
    defineField({
      name: 'slogan_pt',
      title: 'Slogan (Português)',
      type: 'string',
      description: 'Slogan do site em português',
    }),
    defineField({
      name: 'slogan_en',
      title: 'Slogan (Inglês)',
      type: 'string',
      description: 'Slogan do site em inglês',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'Número WhatsApp',
      type: 'string',
      description: 'Formato: 5511991953021 (código do país + DDD + número)',
      validation: (Rule) => Rule.regex(/^[0-9]+$/).error('Apenas números'),
    }),
    defineField({
      name: 'instagramHandle',
      title: 'Instagram Handle',
      type: 'string',
      description: 'Sem @, exemplo: d.braguim',
    }),
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
      validation: (Rule) => Rule.email().error('E-mail inválido'),
    }),
    defineField({
      name: 'phone',
      title: 'Telefone',
      type: 'string',
      description: 'Formato: +55 11 99195-3021',
    }),
  ],
  preview: {
    select: {
      title: 'title_pt',
      subtitle: 'slogan_pt',
    },
  },
});
