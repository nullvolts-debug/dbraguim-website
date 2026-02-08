import { describe, expect, it } from "vitest";
import { Resend } from 'resend';

describe("Resend Email Configuration", () => {
  it("should have valid RESEND_API_KEY configured", () => {
    expect(process.env.RESEND_API_KEY).toBeDefined();
    expect(process.env.RESEND_API_KEY).toMatch(/^re_[a-zA-Z0-9_]+$/);
  });

  it("should initialize Resend client without errors", () => {
    expect(() => {
      const resend = new Resend(process.env.RESEND_API_KEY);
      expect(resend).toBeDefined();
    }).not.toThrow();
  });
});
