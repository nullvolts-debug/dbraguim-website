import { describe, expect, it } from 'vitest';
import { appRouter } from './routers';
import type { TrpcContext } from './_core/context';

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

describe('sanity.getKnives', () => {
  it('deve retornar todas as facas sem filtros', async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const knives = await caller.sanity.getKnives();

    expect(knives).toBeDefined();
    expect(knives.length).toBeGreaterThan(0);
    expect(knives[0]).toHaveProperty('name');
    expect(knives[0]).toHaveProperty('category');
    expect(knives[0]).toHaveProperty('status');
  });

  it('deve filtrar facas por categoria', async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const knives = await caller.sanity.getKnives({ category: 'hunting' });

    expect(knives).toBeDefined();
    knives.forEach((knife) => {
      expect(knife.category).toBe('hunting');
    });
  });

  it('deve filtrar facas por status', async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const knives = await caller.sanity.getKnives({ status: 'available' });

    expect(knives).toBeDefined();
    knives.forEach((knife) => {
      expect(knife.status).toBe('available');
    });
  });

  it('deve retornar apenas facas em destaque', async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const knives = await caller.sanity.getKnives({ featured: true });

    expect(knives).toBeDefined();
    knives.forEach((knife) => {
      expect(knife.featured).toBe(true);
    });
  });
});

describe('sanity.getKnifeById', () => {
  it('deve retornar faca específica por ID', async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const knife = await caller.sanity.getKnifeById({ id: '1' });

    expect(knife).toBeDefined();
    expect(knife._id).toBe('1');
    expect(knife.name).toBe('Blue Hunter');
  });

  it('deve lançar erro para ID inexistente', async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.sanity.getKnifeById({ id: '999' })).rejects.toThrow('Faca não encontrada');
  });
});

describe('sanity.getSiteSettings', () => {
  it('deve retornar configurações do site', async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const settings = await caller.sanity.getSiteSettings();

    expect(settings).toBeDefined();
    expect(settings).toHaveProperty('title_pt');
    expect(settings).toHaveProperty('title_en');
    expect(settings).toHaveProperty('whatsappNumber');
    expect(settings).toHaveProperty('email');
  });
});
