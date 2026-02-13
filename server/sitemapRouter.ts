import { publicProcedure, router } from "./_core/trpc";
import { sanityClient } from '@shared/sanity';

// Função para gerar slug a partir do nome
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export const sitemapRouter = router({
  // Gerar sitemap.xml dinamicamente
  getSitemap: publicProcedure
    .query(async () => {
      try {
        // Buscar todas as facas do Sanity
        const knives = await sanityClient.fetch(
          '*[_type == "knife"] | order(order asc) { name, _updatedAt }'
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

        return xml;
      } catch (error) {
        console.error('Erro ao gerar sitemap:', error);
        throw error;
      }
    }),
});
