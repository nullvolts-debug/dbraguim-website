import { z } from 'zod';
import { publicProcedure, router } from './_core/trpc';
// Importamos o Drizzle direto daqui, sem getDb complicado
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { newsletterSubscribers } from '../drizzle/schema'; // Ajuste o caminho se necessário
import { eq } from 'drizzle-orm';
import * as dotenv from "dotenv";

dotenv.config();

// Configura conexão rápida para a rota
const connectionString = process.env.DATABASE_URL!;
// O cliente do banco
const client = postgres(process.env.DATABASE_URL!, { prepare: false });
const db = drizzle(client);

export const newsletterRouter = router({
  subscribe: publicProcedure
    .input(
      z.object({
        email: z.string().email('Email inválido'),
        source: z.enum(['whatsapp', 'email']).default('email'),
      })
    )
    .mutation(async ({ input }) => {
      console.log('[DEBUG] URL do Banco:', process.env.DATABASE_URL?.substring(0, 20) + '...');
      try {
        console.log(`[Newsletter] Tentando inscrever: ${input.email}`);

        // Verificar se já existe
        const existing = await db
          .select()
          .from(newsletterSubscribers)
          .where(eq(newsletterSubscribers.email, input.email))
          .limit(1);

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

        console.log('[Newsletter] Sucesso!');
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