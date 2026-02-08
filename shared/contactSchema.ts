import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100),
  email: z.string().email('E-mail inválido'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres').max(1000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
