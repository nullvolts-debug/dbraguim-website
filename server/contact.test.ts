import { describe, expect, it, vi } from 'vitest';
import { appRouter } from './routers';
import type { TrpcContext } from './_core/context';

// Mock da função notifyOwner
vi.mock('./_core/notification', () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createMockContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: 'https',
      headers: {},
    } as TrpcContext['req'],
    res: {} as TrpcContext['res'],
  };
}

describe('contact.submit', () => {
  it('deve enviar formulário de contato com dados válidos', async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: 'João Silva',
      email: 'joao@example.com',
      message: 'Gostaria de saber mais sobre as facas artesanais.',
    });

    expect(result).toEqual({
      success: true,
      message: 'Mensagem enviada com sucesso!',
    });
  });

  it('deve rejeitar nome muito curto', async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: 'J',
        email: 'joao@example.com',
        message: 'Mensagem de teste',
      })
    ).rejects.toThrow();
  });

  it('deve rejeitar email inválido', async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: 'João Silva',
        email: 'email-invalido',
        message: 'Mensagem de teste',
      })
    ).rejects.toThrow();
  });

  it('deve rejeitar mensagem muito curta', async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: 'João Silva',
        email: 'joao@example.com',
        message: 'Curta',
      })
    ).rejects.toThrow();
  });
});
