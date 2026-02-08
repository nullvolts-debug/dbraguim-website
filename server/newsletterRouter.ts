import { z } from 'zod';
import { publicProcedure, router } from './_core/trpc';
import { getDb } from './db';
import { newsletterSubscribers } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

export const newsletterRouter = router({
  subscribe: publicProcedure
    .input(
      z.object({
        email: z.string().email('Email inválido'),
        source: z.enum(['whatsapp', 'email']).default('email'),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new Error('Database not available');
      }

      try {
        // Verificar se já existe
        const existing = await db
          .select()
          .from(newsletterSubscribers)
          .where(eq(newsletterSubscribers.email, input.email))
          .limit(1);

        if (existing.length > 0) {
          return {
            success: false,
            message: 'Este email já está cadastrado na newsletter',
          };
        }

        // Inserir novo subscriber
        await db.insert(newsletterSubscribers).values({
          email: input.email,
          source: input.source,
        });

        return {
          success: true,
          message: 'Email cadastrado com sucesso!',
        };
      } catch (error) {
        console.error('[Newsletter] Error subscribing:', error);
        throw new Error('Erro ao cadastrar email');
      }
    }),
});
