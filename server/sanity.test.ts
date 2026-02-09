import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock Sanity client
vi.mock("@shared/sanity", () => ({
  sanityClient: {
    fetch: vi.fn(),
  },
}));

import { sanityClient } from "@shared/sanity";

const mockedFetch = vi.mocked(sanityClient.fetch);

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

const mockKnives = [
  {
    _id: "knife-1",
    name: "Blue Hunter",
    category: "hunting",
    status: "available",
    images: [{ asset: { _ref: "image-abc123" } }],
    description_pt: "Uma faca de caça azul",
    description_en: "A blue hunting knife",
    model: "Hunter",
    length: "22 cm",
    width: "3.5 cm",
    thickness: "4 mm",
    steel_pt: "Damasco liga 1095 com 15N20",
    steel_en: "Damascus 1095 with 15N20",
    handle_pt: "Poplar burl",
    handle_en: "Poplar burl",
    order: 1,
  },
  {
    _id: "knife-2",
    name: "Flame Chef",
    category: "chef",
    status: "commission",
    images: [{ asset: { _ref: "image-def456" } }],
    description_pt: "Uma faca chef com design de chamas",
    description_en: "A chef knife with flame design",
    model: "Chef",
    length: "30 cm",
    width: "5 cm",
    thickness: "3 mm",
    steel_pt: "Aço damasco",
    steel_en: "Damascus steel",
    handle_pt: "Madeira estabilizada",
    handle_en: "Stabilized wood",
    order: 2,
  },
];

describe("sanity.getKnives", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns all knives when no filter is provided", async () => {
    mockedFetch.mockResolvedValueOnce(mockKnives);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.sanity.getKnives();

    expect(result).toEqual(mockKnives);
    expect(mockedFetch).toHaveBeenCalledWith(
      '*[_type == "knife"] | order(order asc)',
      {}
    );
  });

  it("filters by category when provided", async () => {
    mockedFetch.mockResolvedValueOnce([mockKnives[0]]);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.sanity.getKnives({ category: "hunting" });

    expect(result).toHaveLength(1);
    expect(mockedFetch).toHaveBeenCalledWith(
      '*[_type == "knife" && category == $category] | order(order asc)',
      { category: "hunting" }
    );
  });

  it("filters by status when provided", async () => {
    mockedFetch.mockResolvedValueOnce([mockKnives[1]]);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.sanity.getKnives({ status: "commission" });

    expect(result).toHaveLength(1);
    expect(mockedFetch).toHaveBeenCalledWith(
      '*[_type == "knife" && status == $status] | order(order asc)',
      { status: "commission" }
    );
  });

  it("ignores 'all' category filter", async () => {
    mockedFetch.mockResolvedValueOnce(mockKnives);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await caller.sanity.getKnives({ category: "all" });

    expect(mockedFetch).toHaveBeenCalledWith(
      '*[_type == "knife"] | order(order asc)',
      {}
    );
  });

  it("combines category and status filters", async () => {
    mockedFetch.mockResolvedValueOnce([]);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await caller.sanity.getKnives({ category: "chef", status: "available" });

    expect(mockedFetch).toHaveBeenCalledWith(
      '*[_type == "knife" && category == $category && status == $status] | order(order asc)',
      { category: "chef", status: "available" }
    );
  });
});

describe("sanity.getSiteSettings", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns site settings from Sanity", async () => {
    const mockSettings = {
      title_pt: "D.Braguim",
      title_en: "D.Braguim",
      slogan_pt: "Tradição Forjada",
      slogan_en: "Forged Tradition",
      whatsappNumber: "5511991953021",
      instagramHandle: "d.braguim",
      email: "contato@dbraguim.com",
      phone: "+55 11 99195-3021",
    };

    mockedFetch.mockResolvedValueOnce(mockSettings);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.sanity.getSiteSettings();

    expect(result).toEqual(mockSettings);
  });

  it("returns fallback settings when Sanity returns null", async () => {
    mockedFetch.mockResolvedValueOnce(null);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.sanity.getSiteSettings();

    expect(result).toMatchObject({
      title_pt: "D.Braguim",
      title_en: "D.Braguim",
      whatsappNumber: "5511991953021",
      email: "contato@dbraguim.com",
    });
  });
});

describe("sanity.getKnifeById", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns a knife by ID", async () => {
    mockedFetch.mockResolvedValueOnce(mockKnives[0]);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.sanity.getKnifeById({ id: "knife-1" });

    expect(result).toEqual(mockKnives[0]);
    expect(result.name).toBe("Blue Hunter");
  });

  it("throws error when knife not found", async () => {
    mockedFetch.mockResolvedValueOnce(null);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.sanity.getKnifeById({ id: "nonexistent" })
    ).rejects.toThrow("Faca não encontrada");
  });
});
