import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@sanity/client';
import { Resend } from 'resend';
import { initTRPC } from '@trpc/server';
import { nodeHTTPRequestHandler } from '@trpc/server/adapters/node-http';
import superjson from 'superjson';
import { z } from 'zod';

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
      from: 'D.Braguim Site <noreply@dbraguim.com>',
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
        console.log('[Newsletter] New subscriber:', input.email, 'source:', input.source);
        return {
          success: true,
          message: 'Email cadastrado com sucesso!',
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;

// ============================================================
// Vercel Serverless Handler (Node.js runtime)
// ============================================================
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Extract the tRPC path from the catch-all route parameter
  const pathParam = req.query.trpc;
  const path = Array.isArray(pathParam) ? pathParam.join('/') : (pathParam || '');

  return nodeHTTPRequestHandler({
    router: appRouter,
    req,
    res,
    path,
    createContext: () => ({}),
  });
}
