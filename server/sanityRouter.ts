import { router, publicProcedure } from './_core/trpc';
import { z } from 'zod';

// Mock data temporário até configurar Sanity
const mockKnives = [
  {
    _id: '1',
    name: 'Blue Hunter',
    category: 'hunting' as const,
    status: 'available' as const,
    images: [{ asset: { _ref: 'blue_hunter.webp' } }],
    description_pt: 'Uma lâmina de caça com presença e acabamento premium, feita para uso real e para durar.',
    description_en: 'A premium hunting knife with strong presence, built for real use and made to last.',
    model: 'Hunter',
    length: '22 cm',
    width: '3,5 cm',
    thickness: '4 mm',
    steel_pt: 'Damasco liga 1095 com 15N20',
    steel_en: 'Damascus liga 1095 com 15N20',
    handle_pt: 'Poplar burl',
    handle_en: 'Poplar burl',
    featured: true,
    order: 1,
  },
  {
    _id: '2',
    name: 'Spear Bowie',
    category: 'fighter' as const,
    status: 'available' as const,
    images: [{ asset: { _ref: 'spear_bowie.webp' } }],
    description_pt: 'Inspirada em uma bowie, mas criada com linhas mais modernas e agressiva',
    description_en: 'Inspired by a Bowie, but created with more modern, aggressive lines.',
    model: 'Fighter',
    length: '22 cm',
    width: '3,5 cm',
    thickness: '4 mm',
    steel_pt: 'Damasco liga 1095 com 15N20',
    steel_en: 'Damascus liga 1095 com 15N20',
    handle_pt: 'Maple burl',
    handle_en: 'Maple burl',
    featured: true,
    order: 2,
  },
  {
    _id: '3',
    name: 'Flame Chef',
    category: 'chef' as const,
    status: 'commission' as const,
    images: [{ asset: { _ref: 'flame_chef.webp' } }],
    description_pt: 'Uma chef com um design todo pensado nas chamas, um ferramenta elegante e muito eficiente',
    description_en: 'A chef\'s knife with a design entirely inspired by flames—an elegant and highly efficient tool.',
    model: 'Chef',
    length: '22 cm',
    width: '50 mm',
    thickness: '5 mm',
    steel_pt: 'Damasco liga 1095 com 15N20',
    steel_en: 'Damascus liga 1095 com 15N20',
    handle_pt: 'Box Elder burl',
    handle_en: 'Box Elder burl',
    featured: true,
    order: 3,
  },
  {
    _id: '4',
    name: 'Amber Chef',
    category: 'chef' as const,
    status: 'sold' as const,
    images: [{ asset: { _ref: 'amber_chef.webp' } }],
    description_pt: 'Uma chef com um design todo pensado nas chamas, um ferramenta elegante e muito eficiente',
    description_en: 'A chef\'s knife with a design entirely inspired by flames—an elegant and highly efficient tool.',
    model: 'Chef',
    length: '22 cm',
    width: '50 mm',
    thickness: '5 mm',
    steel_pt: 'Damasco liga 1095 com 15N20',
    steel_en: 'Damascus liga 1095 com 15N20',
    handle_pt: 'Box Elder burl',
    handle_en: 'Box Elder burl',
    featured: false,
    order: 4,
  },
];

export const sanityRouter = router({
  // Buscar todas as facas
  getKnives: publicProcedure
    .input(
      z
        .object({
          category: z.enum(['hunting', 'fighter', 'chef', 'all']).optional(),
          status: z.enum(['available', 'sold', 'commission', 'all']).optional(),
          featured: z.boolean().optional(),
        })
        .optional()
    )
    .query(({ input }) => {
      let knives = [...mockKnives];

      if (input?.category && input.category !== 'all') {
        knives = knives.filter((k) => k.category === input.category);
      }

      if (input?.status && input.status !== 'all') {
        knives = knives.filter((k) => k.status === input.status);
      }

      if (input?.featured !== undefined) {
        knives = knives.filter((k) => k.featured === input.featured);
      }

      return knives.sort((a, b) => a.order - b.order);
    }),

  // Buscar faca por ID
  getKnifeById: publicProcedure.input(z.object({ id: z.string() })).query(({ input }) => {
    const knife = mockKnives.find((k) => k._id === input.id);
    if (!knife) {
      throw new Error('Faca não encontrada');
    }
    return knife;
  }),

  // Configurações do site
  getSiteSettings: publicProcedure.query(() => {
    return {
      title_pt: 'D.Braguim',
      title_en: 'D.Braguim',
      slogan_pt: 'Tradição Forjada, Emoção Afiada.',
      slogan_en: 'Forged Tradition, Sharpened Emotion.',
      whatsappNumber: '5511991953021',
      instagramHandle: 'd.braguim',
      email: 'contato@dbraguim.com',
      phone: '+55 11 99195-3021',
    };
  }),
});
