import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';

// 1. Configurar Cliente Sanity (usando as vars de ambiente)
const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID,
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  useCdn: true, // Importante para ser rápido
  apiVersion: '2023-05-03',
});

async function generateSitemap() {
  console.log('🗺️  Iniciando geração do Sitemap...');

  try {
    // 2. Buscar Facas do Sanity
    // Buscamos apenas o que precisamos: nome, slug e data de atualização
    const knives = await client.fetch(`
      *[_type == "knife"] | order(_updatedAt desc) {
        name,
        "slug": slug.current,
        _updatedAt
      }
    `);

    console.log(`🔪 Encontradas ${knives.length} facas.`);

    // 3. Definir URLs Estáticas
    const baseUrl = 'https://dbraguim.com';
    const staticPages = [
      '',
      '/portfolio',
      '/sobre',
      '/contato'
    ];

    // 4. Construir o XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    // Adicionar Páginas Estáticas
    staticPages.forEach(page => {
      xml += `  <url>
    <loc>${baseUrl}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>
`;
    });

    // Adicionar Facas Dinâmicas
    knives.forEach((knife: any) => {
      // Fallback para slug se não existir (igual seu código anterior)
      const slug = knife.slug || knife.name.toLowerCase().trim().replace(/\s+/g, '-');
      
      xml += `  <url>
    <loc>${baseUrl}/faca/${slug}</loc>
    <lastmod>${knife._updatedAt.split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
    });

    xml += `</urlset>`;

    // 5. Salvar o arquivo na pasta public
    const publicDir = path.resolve(process.cwd(), 'public');
    
    // Garante que a pasta public existe
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
    console.log('✅', publicDir);
    console.log('✅ sitemap.xml gerado com sucesso em /public/sitemap.xml');

  } catch (error) {
    console.error('❌ Erro ao gerar sitemap:', error);
    process.exit(1); // Falha o build se o sitemap der erro
  }
}

generateSitemap();
