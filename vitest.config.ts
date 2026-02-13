import { defineConfig } from "vitest/config";
import path from "path";

const templateRoot = path.resolve(import.meta.dirname);
import { execSync } from 'child_process';

const generateSitemapPlugin = () => {
  return {
    name: 'generate-sitemap',
    buildStart() {
      // Só roda no modo produção (build)
      if (process.env.NODE_ENV === 'production') {
        try {
          console.log('🗺️  Disparando gerador de sitemap via Vite Plugin...');
          // Executa o script usando tsx
          execSync('npx tsx scripts/generate-sitemap.ts', { stdio: 'inherit' });
        } catch (e) {
          console.error('❌ Erro no sitemap:', e);
        }
      }
    }
  }
}
export default defineConfig({
  root: templateRoot,
  plugins: [
    generateSitemapPlugin(),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(templateRoot, "client", "src"),
      "@shared": path.resolve(templateRoot, "shared"),
      "@assets": path.resolve(templateRoot, "attached_assets"),
    },
  },
  test: {
    environment: "node",
    include: ["server/**/*.test.ts", "server/**/*.spec.ts"],
  },
});
