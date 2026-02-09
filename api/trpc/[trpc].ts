import { createClient } from '@sanity/client';
import { Resend } from 'resend';
import { drizzle } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm';
import { initTRPC } from '@trpc/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import superjson from 'superjson';
import { z } from 'zod';
import { int, mysqlTable, text, timestamp, varchar } from 'drizzle-orm/mysql-core';

// ============================================================
// Database Schema (inline to avoid import issues in serverless)
// ============================================================
const newsletterSubscribers = mysqlTable('newsletter_subscribers', {
  id: int('id').autoincrement().primaryKey(),
  email: varchar('email', { length: 320 }).notNull().unique(),
  source: varchar('source', { length: 50 }).notNull().default('whatsapp'),
  subscribedAt: timestamp('subscribedAt').defaultNow().notNull(),
});

// ============================================================
// Sanity Client
// ============================================================
const sanityClient = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || '',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-02-08',
  useCdn: true,
});

// ============================================================
// Resend (Email)
// ============================================================
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendContactEmail(params: {
  name: string;
  email: string;
  message?: string;
  knifeName?: string;
}) {
  const { name, email, message, knifeName } = params;

  const subject = knifeName
    ? 'Me interessei por uma D.Braguim'
    : 'Novo contato do site D.Braguim';

  const html = knifeName
    ? `
      <h2>Novo interesse em faca</h2>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Faca:</strong> ${knifeName}</p>
      <p><strong>Mensagem:</strong> Me interessei pela faca ${knifeName}, gostaria de mais informações</p>
    `
    : `
      <h2>Novo contato do site</h2>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mensagem:</strong> ${message || 'Sem mensagem'}</p>
    `;

  try {
    const { data, error } = await resend.emails.send({
      from: 'noreply@dbraguim.com',
      to: 'contato@dbraguim.com',
      subject,
      html,
    });

    if (error) {
      console.error('[Email] Failed to send:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error: any) {
    console.error('[Email] Exception:', error);
    return { success: false, error: error.message };
  }
}

// ============================================================
// Database connection (lazy)
// ============================================================
let _db: ReturnType<typeof drizzle> | null = null;

function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn('[Database] Failed to connect:', error);
      _db = null;
    }
  }
  return _db;
}

// ============================================================
// tRPC Setup
// ============================================================
const t = initTRPC.create({
  transformer: superjson,
});

const router = t.router;
const publicProcedure = t.procedure;

// ============================================================
// Contact Form Schema
// ============================================================
const contactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
});

// ============================================================
// App Router
// ============================================================
const appRouter = router({
  sanity: router({
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
        let query = '*[_type == "knife"';
        const params: Record<string, any> = {};

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
        return knives;
      }),

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

    getSiteSettings: publicProcedure.query(async () => {
      const settings = await sanityClient.fetch(
        '*[_type == "siteSettings" && _id == "siteSettings"][0]'
      );

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
  }),

  contact: router({
    submit: publicProcedure
      .input(contactFormSchema)
      .mutation(async ({ input }) => {
        const { name, email, message } = input;

        const emailResult = await sendContactEmail({ name, email, message });

        if (!emailResult.success) {
          console.error('[Contact] Failed to send email:', emailResult.error);
          throw new Error('Falha ao enviar mensagem. Tente novamente.');
        }

        return {
          success: true,
          message: 'Mensagem enviada com sucesso!',
        };
      }),
  }),

  newsletter: router({
    subscribe: publicProcedure
      .input(
        z.object({
          email: z.string().email('Email inválido'),
          source: z.enum(['whatsapp', 'email']).default('email'),
        })
      )
      .mutation(async ({ input }) => {
        const db = getDb();
        if (!db) {
          // Fallback: just log if no DB
          console.log('[Newsletter] No DB, subscriber:', input.email);
          return {
            success: true,
            message: 'Email cadastrado com sucesso!',
          };
        }

        try {
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
  }),
});

export type AppRouter = typeof appRouter;

// ============================================================
// Vercel Serverless Handler
// ============================================================
export default async function handler(req: Request) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({}),
  });
}

export const config = {
  runtime: 'nodejs',
};
