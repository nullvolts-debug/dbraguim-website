// middleware.ts (Versão para Vite/Vercel Puro)

export const config = {
  // Roda em todas as rotas, exceto arquivos estáticos
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
};

export default function middleware(request: Request) {
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
  
  // Lista de Bots (mesma de antes)
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