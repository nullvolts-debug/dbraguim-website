import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  
  // Sitemap.xml endpoint
  app.get('/sitemap.xml', async (req, res) => {
    try {
      const { sanityClient } = await import('@shared/sanity');
      
      // Função para gerar slug
      const generateSlug = (name: string) => {
        return name
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
      };
      
      // Buscar todas as facas
      const knives = await sanityClient.fetch(
        '*[_type == "knife"] | order(order asc) { name, _updatedAt, slug }'
      );
      
      // URLs estáticas
      const staticUrls = [
        { loc: 'https://dbraguim.com/', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: '1.0' },
        { loc: 'https://dbraguim.com/portfolio/', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: '0.9' },
        { loc: 'https://dbraguim.com/sobre/', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.5' },
        { loc: 'https://dbraguim.com/contato/', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.5' },
      ];
      
      // URLs dinâmicas das facas
      const knifeUrls = knives.map((knife: any) => {
        const slug = knife.slug?.current || generateSlug(knife.name);
        const lastmod = knife._updatedAt ? knife._updatedAt.split('T')[0] : new Date().toISOString().split('T')[0];
        return {
          loc: `https://dbraguim.com/faca/${slug}`,
          lastmod,
          changefreq: 'monthly',
          priority: '0.8'
        };
      });
      
      // Combinar todas as URLs
      const allUrls = [...staticUrls, ...knifeUrls];
      
      // Gerar XML
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
      
      for (const url of allUrls) {
        xml += '  <url>\n';
        xml += `    <loc>${url.loc}</loc>\n`;
        xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
        xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
        xml += `    <priority>${url.priority}</priority>\n`;
        xml += '  </url>\n';
      }
      
      xml += '</urlset>';
      
      res.type('application/xml');
      res.send(xml);
    } catch (error) {
      console.error('Erro ao gerar sitemap:', error);
      res.status(500).send('Erro ao gerar sitemap');
    }
  });
  
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
