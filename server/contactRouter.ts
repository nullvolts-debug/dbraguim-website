import { router, publicProcedure } from './_core/trpc';
import { contactFormSchema } from '@shared/contactSchema';
import { notifyOwner } from './_core/notification';

export const contactRouter = router({
  submit: publicProcedure
    .input(contactFormSchema)
    .mutation(async ({ input }) => {
      const { name, email, message } = input;

      // Enviar notificação para o dono do projeto
      const notificationSent = await notifyOwner({
        title: `Novo contato de ${name}`,
        content: `
**Nome:** ${name}
**E-mail:** ${email}

**Mensagem:**
${message}

---
Enviado via formulário de contato do site D.Braguim
        `.trim(),
      });

      if (!notificationSent) {
        console.error('[Contact] Failed to send notification to owner');
      }

      // Aqui você pode adicionar lógica adicional, como:
      // - Salvar no banco de dados
      // - Enviar e-mail via serviço externo
      // - Integrar com CRM

      return {
        success: true,
        message: 'Mensagem enviada com sucesso!',
      };
    }),
});
