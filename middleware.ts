// middleware.ts (Versão Blindada - Vite/Vercel)

export const config = {
  // MATCHER MAIS ROBUSTO:
  // Exclui API, Next.js internals, e arquivos estáticos comuns (jpg, png, svg, ico, etc)
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\.png$|.*\.jpg$|.*\.jpeg$|.*\.gif$|.*\.svg$|.*\.webp$).*)',
  ],
};

export default function middleware(request: Request) {
  const url = new URL(request.url);
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';

  // PROTEÇÃO EXTRA NO CÓDIGO (Caso o matcher falhe):
  // Se a URL terminar com extensão de imagem/arquivo, PARA AQUI.
  const isStaticFile = /\.(jpg|jpeg|png|gif|svg|ico|webp|css|js)$/i.test(url.pathname);
  if (isStaticFile) {
    return; // Deixa o Vercel entregar o arquivo direto (sem Prerender)
  }
  
  // Lista de Bots
  const botUserAgents = [
    'googlebot', 'yahoo! slurp', 'bingbot', 'yandex', 'baiduspider', 
    'facebookexternalhit', 'twitterbot', 'rogerbot', 'linkedinbot', 
    'embedly', 'quora link preview', 'showyoubot', 'outbrain', 
    'pinterest/0.', 'developers.google.com/+/web/snippet', 'slackbot', 
    'vkShare', 'W3C_Validator', 'redditbot', 'Applebot', 'WhatsApp', 
    'flipboard', 'tumblr', 'bitlybot', 'SkypeUriPreview', 'nuzzel', 
    'Discordbot', 'Google Page Speed', 'Qwantify', 'pinterest', 
    'wordpress', 'x-buffer-bot',
  ];

  const isBot = botUserAgents.some((bot) => userAgent.includes(bot));

  if (isBot) {
    const prerenderUrl = `https://service.prerender.io/${request.url}`;
    
    // Redireciona o request interno para o Prerender
    return fetch(prerenderUrl, {
      headers: {
        'X-Prerender-Token': 'dq0r0Yjw2zlxekM5wEGD', // Seu Token
      },
    });
  }
}