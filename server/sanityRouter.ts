import { router, publicProcedure } from './_core/trpc';
import { z } from 'zod';
import { sanityClient } from '@shared/sanity';

// Função para gerar slug a partir do nome
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

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
    .query(async ({ input }) => {
      // Construir query do Sanity
      let query = '*[_type == "knife"';
      const params: Record<string, any> = {};

      // Filtros
      if (input?.category && input.category !== 'all') {
        query += ' && category == $category';
        params.category = input.category;
      }

      if (input?.status && input.status !== 'all') {
        query += ' && status == $status';
        params.status = input.status;
      }

      if (input?.featured !== undefined) {
        query += ' && featured == $featured';
        params.featured = input.featured;
      }

      query += '] | order(order asc)';

      const knives = await sanityClient.fetch(query, params);
      
      // Adicionar slug gerado dinamicamente se não existir
      return knives.map((knife: any) => {
        const slugValue = knife.slug?.current || generateSlug(knife.name);
        return {
          ...knife,
          slug: { current: slugValue }
        };
      });
    }),

  // Buscar faca por ID
  getKnifeById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const knife = await sanityClient.fetch(
        '*[_type == "knife" && _id == $id][0]',
        { id: input.id }
      );
      
      if (!knife) {
        throw new Error('Faca não encontrada');
      }
      
      return knife;
    }),

  // Buscar faca por slug
  getKnifeBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      // Primeiro tenta buscar pelo slug do Sanity
      let knife = await sanityClient.fetch(
        '*[_type == "knife" && slug.current == $slug][0]',
        { slug: input.slug }
      );

      // Se não encontrar, tenta buscar por nome gerado dinamicamente
      if (!knife) {
        const allKnives = await sanityClient.fetch(
          '*[_type == "knife"] | order(order asc)'
        );
        
        // Encontra a faca cujo slug gerado dinamicamente corresponde
        knife = allKnives.find((k: any) => generateSlug(k.name) === input.slug);
      }
      
      if (!knife) {
        throw new Error('Faca não encontrada');
      }
      
      return knife;
    }),

  // Configurações do site
  getSiteSettings: publicProcedure.query(async () => {
    const settings = await sanityClient.fetch(
      '*[_type == "siteSettings" && _id == "siteSettings"][0]'
    );
    
    // Fallback para valores padrão se não encontrar
    return settings || {
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
