import { Resend } from 'resend';

// REMOVEMOS A INICIALIZAÇÃO GLOBAL AQUI QUE CAUSAVA O ERRO
// const resend = new Resend(process.env.RESEND_API_KEY); 

export interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

/**
 * Send email using Resend
 * @param params Email parameters
 * @returns Promise with send result
 */
export async function sendEmail(params: SendEmailParams) {
  const { to, subject, html, from = 'onboarding@resend.dev' } = params;

  // VERIFICAÇÃO DE SEGURANÇA
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.error('[Email] ERRO CRÍTICO: RESEND_API_KEY não encontrada no .env');
    return { success: false, error: "Server configuration error: Missing API Key" };
  }

  // INICIALIZAÇÃO "LAZY" (Preguiçosa)
  // Só cria o cliente quando a função é chamada. 
  // Nesse momento, o .env JÁ vai estar carregado com certeza.
  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    if (error) {
      console.error('[Email] Failed to send:', error);
      return { success: false, error: error.message };
    }

    console.log('[Email] Sent successfully:', data);
    return { success: true, data };
  } catch (error: any) {
    console.error('[Email] Exception:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Send contact form email
 */
export async function sendContactEmail(params: {
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

  return sendEmail({
    to: 'contato@dbraguim.com',
    from: 'D.Braguim Site <noreply@dbraguim.com>',
    subject,
    html,
  });
}