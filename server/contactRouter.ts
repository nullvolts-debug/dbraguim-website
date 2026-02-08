import { router, publicProcedure } from './_core/trpc';
import { contactFormSchema } from '@shared/contactSchema';
import { sendContactEmail } from './_core/email';

export const contactRouter = router({
  submit: publicProcedure
    .input(contactFormSchema)
    .mutation(async ({ input }) => {
      const { name, email, message } = input;

      // Enviar email via Resend
      const emailResult = await sendContactEmail({
        name,
        email,
        message,
      });

      if (!emailResult.success) {
        console.error('[Contact] Failed to send email:', emailResult.error);
        throw new Error('Falha ao enviar mensagem. Tente novamente.');
      }

      return {
        success: true,
        message: 'Mensagem enviada com sucesso!',
      };
    }),
});
