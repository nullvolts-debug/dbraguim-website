import { z } from 'zod';
import { publicProcedure, router } from './_core/trpc';
// MUDANÇA: Usando o driver Serverless do Neon (HTTP)
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { newsletterSubscribers } from '../drizzle/schema';
import { eq } from 'drizzle-orm';
import * as dotenv from "dotenv";

dotenv.config();

// MUDANÇA: Configuração de conexão HTTP (Mais segura para Serverless)
// O neon() cria uma conexão leve via HTTP, perfeita para Vercel
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export const newsletterRouter = router({
  subscribe: publicProcedure
    .input(
      z.object({
        email: z.string().email('Email inválido'),
        source: z.enum(['whatsapp', 'email']).default('email'),
      })
    )
    .mutation(async ({ input }) => {
      // Log para debug (pode remover depois se quiser)
      console.log('[DEBUG] URL do Banco (Início):', process.env.DATABASE_URL?.substring(0, 15) + '...');
      
      try {
        console.log(`[Newsletter] Tentando inscrever: ${input.email}`);

        // Verificar se já existe
        const existing = await db
          .select()
          .from(newsletterSubscribers)
          .where(eq(newsletterSubscribers.email, input.email));
          // Nota: neon-http retorna array direto, não precisa de .execute()

        if (existing.length > 0) {
          console.log('[Newsletter] Email já existe.');
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

        console.log('[Newsletter] Sucesso! Registro inserido via HTTP.');
        return {
          success: true,
          message: 'Email cadastrado com sucesso!',
        };
      } catch (error) {
        console.error('[Newsletter] Erro ao cadastrar:', error);
        throw new Error('Erro ao salvar no banco de dados');
      }
    }),
});