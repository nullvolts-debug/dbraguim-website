# D.Braguim Site - TODO

## Configuração Inicial
- [x] Configurar Sanity CMS com projeto e schemas
- [x] Instalar dependências do Sanity no projeto
- [x] Configurar variáveis de ambiente para Sanity

## Migração de Design e Assets
- [x] Migrar CSS do site original para Tailwind/CSS modules
- [x] Copiar e otimizar imagens das facas
- [x] Copiar vídeos das facas
- [x] Migrar ícones e logo SVG
- [x] Configurar fontes Google Fonts

## Componentes React
- [x] Criar componente Header com navegação
- [x] Criar componente Footer com redes sociais
- [x] Criar componente Hero da página inicial
- [x] Criar componente Card de faca para grid
- [x] Criar componente Modal de detalhes da faca
- [x] Criar componente Video Lightbox
- [x] Criar componente de seletor de idioma PT/EN

## Páginas
- [x] Página Home com destaques do portfólio
- [x] Página Portfolio com todas as facas
- [x] Página Sobre com história do Dennis
- [x] Página Contato com formulário

## Formulário de Contato
- [x] Criar formulário com campos nome e email
- [x] Implementar validação de formulário
- [x] Criar API route para processar envio
- [x] Integrar envio de email via API
- [x] Adicionar feedback visual de sucesso/erro

## Sanity CMS
- [x] Schema para Knife (facas)
- [x] Schema para configurações do site
- [ ] Schema para tradução de textos
- [x] Migrar dados das 4 facas existentes para Sanity (mock data)
- [ ] Configurar Sanity Studio
- [ ] Testar criação/edição de facas no Studio

## Internacionalização
- [x] Implementar sistema i18n PT/EN
- [x] Migrar traduções existentes
- [ ] Conectar traduções com Sanity CMS
- [x] Testar troca de idioma em todas as páginas

## Funcionalidades Interativas
- [x] Modal de detalhes da faca com specs
- [x] Lightbox de vídeo em tela cheia
- [x] Botões WhatsApp com mensagem pré-preenchida
- [x] Links de email com assunto pré-preenchido
- [x] Filtros de categoria no portfólio

## SEO e Meta Tags
- [ ] Configurar meta tags Open Graph
- [ ] Configurar Twitter Cards
- [ ] Implementar Schema.org JSON-LD
- [ ] Criar sitemap.xml
- [ ] Criar robots.txt

## Deploy e Documentação
- [x] Documentar variáveis de ambiente necessárias
- [x] Criar guia de deploy na Vercel
- [x] Documentar como adicionar novas facas no Sanity
- [x] Testar build de produção
- [x] Criar checkpoint final

## Bugs
- [x] Corrigir erro de <a> aninhado no Header (Link do wouter já renderiza <a>)

## Melhorias Solicitadas
- [x] Centralizar conteúdo do hero e remover escurecimento da imagem de fundo
- [x] Adicionar foto do Dennis na seção Sobre com texto ao lado direito
- [x] Formulário de email só aparece ao clicar no botão Email
- [x] Newsletter com opções WhatsApp e Email

## Ajustes Visuais Finais
- [x] Alinhar hero com imagem à esquerda e conteúdo à direita (como referência)
- [x] Mudar fontes para serifadas de luxo (Cormorant Garamond)
- [x] Ajustar estilo dos botões para ficar mais clean
- [ ] Preparar checklist para publicação Sanity + Vercel

## Ajuste Hero
- [x] Usar hero_placeholder.webp como background do hero (não como elemento separado)

## Modal de Detalhes das Facas
- [x] Implementar modal/overlay ao clicar nas facas
- [x] Usar textos e fotos corretos do site original
- [x] Adicionar galeria de imagens no modal
- [x] Adicionar especificações técnicas
- [x] Adicionar botões de interesse (WhatsApp/Email)

## Ajustes Modal
- [x] Mostrar seção "I'M INTERESTED" para todas as facas (não apenas disponíveis)
- [x] Botão Email abre formulário inline no modal
- [x] Formulário com subject e corpo pré-preenchidos
- [x] Campos apenas Nome e Email

## Ajuste Thumbnail Vídeo
- [x] Remover thumbnail do vídeo abaixo da foto no modal

## Novos Ajustes
- [x] Centralizar bloco de conteúdo do hero com espaçamento da parte inferior
- [x] Recolocar filtros de categoria e status no Portfolio
- [x] Clarear fontes nas seções Sobre e Contato para melhor legibilidade
- [x] Adicionar campo de email na newsletter com botão de cadastro
- [x] Salvar emails da newsletter no banco de dados

## Correções Modal e Formulário
- [x] Clarear fonte do modal (muito escura)
- [x] Ajustar design dos botões para ficar igual à referência
- [x] Corrigir scroll do modal para formulário não ficar cortado
- [x] Clarear fontes do menu

## Ajuste Alinhamento Hero
- [x] Alinhar conteúdo do hero à direita (não centralizado)

## Redesign Modal
- [x] Ajustar layout do modal para grid 60/40 (foto/conteúdo)
- [x] Botão "ASSISTA O VÍDEO" na parte inferior da foto
- [x] Seção "I'M INTERESTED" com borda e botões lado a lado
- [x] Especificações em grid 2 colunas
- [x] Ajustar cores e espaçamentos conforme referência

## Ajuste Final Hero
- [x] Centralizar horizontalmente o conteúdo do hero (mantendo alinhamento inferior)

## Ajuste Legibilidade Dark Luxury
- [x] Clarear fontes de conteúdo nas seções Sobre e Contato para melhor legibilidade
- [x] Manter estilo dark luxury com contraste adequado

## Ajustes Finais de Layout
- [x] Remover títulos das páginas (Contato, Portfolio, Sobre)
- [x] Compactar formulário de email no modal (só nome, email e botões)
- [x] Remover contorno duplo da foto na seção Sobre
- [x] Alinhar cards de valores (Artesania, Exclusividade, Inovação) lado a lado

## Ajustes de Refinamento
- [x] Botão de vídeo no modal aparece apenas se faca tiver vídeo cadastrado (já implementado)
- [x] Clarear fontes nas seções Sobre, Contato e About da Home
- [x] Alinhar botões à esquerda na seção "Quer encomendar uma peça"
- [x] Adicionar faixa de destaque no bloco "Quero encomendar uma faca"

## Ajuste Contraste Final
- [x] Aumentar contraste das fontes de conteúdo para melhor legibilidade

## Correção Cor Texto Sobre
- [x] Corrigir cor do texto da história na página Sobre (está muito escuro)

## Ajuste Tom de Cor
- [x] Ajustar tom de cor dos textos para intermediário (#d0d0d0) - não muito claro nem muito escuro
- [x] Remover estilos inline que sobrescreviam a cor nos cards de valores

## Ajuste Cor Final
- [x] Alterar cor de todos os textos de conteúdo para #888

## Configuração Sanity
- [x] Configurar Sanity Project ID: 9kunhe1k
- [x] Adicionar variáveis de ambiente do Sanity
- [x] Testar conexão com Sanity CMS

## Preparação para Deploy na Vercel
- [x] Configurar Resend para envio de emails
- [x] Implementar envio de emails dos formulários via Resend
- [ ] Remover sistema de autenticação (site público)
- [x] Criar arquivo vercel.json
- [x] Atualizar package.json para build de produção
- [x] Criar arquivo .env.example com variáveis necessárias
- [x] Criar documentação de deploy
- [x] Documentar registros DNS para Resend
- [x] Exportar código para GitHub (repositório: dbraguim-website)

## Melhorias de Responsividade Mobile
- [x] Ajustar header/navegação para mobile
- [x] Melhorar hero section da página inicial para telas pequenas
- [x] Ajustar grid de facas no portfólio para mobile
- [x] Corrigir modal de detalhes da faca para mobile
- [x] Ajustar página Sobre para mobile
- [x] Ajustar página Contato para mobile
- [x] Melhorar footer para mobile
- [x] Testar em diferentes tamanhos de tela (320px, 375px, 414px)

## Melhoria do Modal de Facas para Mobile
- [x] Analisar problemas do modal atual em mobile
- [x] Redesenhar layout do modal para tela cheia em mobile
- [x] Ajustar tamanhos de imagem e espaçamentos
- [x] Melhorar botões de ação (WhatsApp, Email) para mobile
- [x] Otimizar especificações técnicas para leitura em tela pequena
- [x] Testar modal em diferentes tamanhos de tela mobile
- [x] Corrigir layout vertical mobile (foto → descrição → botões)
- [x] Garantir que desktop mantenha layout horizontal original

## Ajustes Finos Modal Mobile (Editor Visual)
- [x] Diminuir altura da div da foto (deve ser altura da foto)
- [x] Reorganizar botão fechar e badge status abaixo do título em mobile
- [x] Ajustar imagem para ocupar largura total da div em mobile

## Ajuste de Cor Página Contato
- [x] Alterar cor do texto de instruções de var(--muted) para #888888

## Ajustes Finais Modal Mobile (Editor Visual)
- [x] Reduzir padding do header (15px lateral, 10px inferior, altura 102px)
- [x] Remover padding da div da foto (0px em todos os lados)
- [x] Garantir botão "Assistir Vídeo" sobre a imagem no canto inferior esquerdo
- [x] Garantir que todo conteúdo (imagem + texto + botões) esteja dentro do scroll

## Correção Espaçamento Modal Mobile
- [x] Remover espaço preto enorme acima da foto
- [x] Garantir foto imediatamente abaixo do header
- [x] Tornar conteúdo de texto acessível e visível

## Correções Finais Modal Mobile (Crítico)
- [x] Habilitar scroll do modal para visualizar conteúdo abaixo da foto
- [x] Posicionar botão "Assistir Vídeo" absolutamente sobre a foto (canto inferior esquerdo)
- [x] Remover completamente espaços pretos acima e abaixo da imagem

## Investigação CSS Modal Mobile
- [x] Verificar se media query está correta
- [x] Verificar conflitos de especificidade CSS (encontrado conflito na linha 736)
- [x] Aplicar !important se necessário para forçar estilos mobile
- [x] Validar que mudanças estão sendo aplicadas no browser

## Escalabilidade e Lógica de Destaques
- [x] Verificar como facas são carregadas na home (hardcoded em knivesData.ts)
- [x] Implementar lógica de priorização: facas disponíveis primeiro
- [x] Garantir fallback para preencher 3 destaques se não houver disponíveis suficientes
- [x] Testar com 20+ facas no sistema (sistema preparado, basta adicionar ao array)
- [x] Verificar performance com muitos produtos (sem problemas, array estático é performante)

## Ativação Sanity CMS (Project ID: 9kunhe1k)
- [x] Configurar variáveis de ambiente VITE_SANITY_PROJECT_ID e VITE_SANITY_DATASET
- [x] Criar schema do Sanity (knife, siteSettings)
- [x] Migrar dados mockados para Sanity (4 facas + configurações)
- [x] Atualizar sanityRouter.ts para usar cliente real do Sanity
- [x] Migrar Home.tsx para usar trpc.sanity.getKnives com lógica de priorização
- [x] Migrar Portfolio.tsx para usar trpc.sanity.getKnives com filtros
- [x] Testar adição de faca via Sanity Studio (4 facas migradas com sucesso)
- [x] Documentar acesso ao Sanity Studio (SANITY_GUIDE.md criado)

## Preparação para Deploy no Vercel
- [x] Criar vercel.json com configurações de build e rotas
- [x] Documentar todas as variáveis de ambiente necessárias
- [x] Criar .vercelignore para otimizar upload
- [x] Testar build de produção localmente (sucesso, 696KB bundle)
- [x] Criar guia passo-a-passo de deploy (VERCEL_DEPLOY_GUIDE.md)
- [x] Documentar configuração de domínio personalizado

## Deploy Automatizado no Vercel
- [x] Criar repositório dbraguim-website no GitHub (nullvolts-debug)
- [x] Fazer push do código para GitHub
- [x] Criar projeto no Vercel
- [x] Configurar variáveis de ambiente no Vercel
- [x] Fazer deploy e obter URL de produção
- [x] Verificar site funcionando

## Refatoração para Vercel Serverless
- [x] Criar api/ directory com serverless functions
- [x] Adaptar sanityRouter para serverless (api/sanity.ts)
- [x] Adaptar contactRouter para serverless (api/contact.ts)
- [x] Adaptar newsletterRouter para serverless (api/newsletter.ts)
- [x] Ajustar frontend para chamar APIs REST diretamente
- [x] Atualizar vercel.json com configuração correta
- [x] Configurar variáveis de ambiente no Vercel
- [x] Fazer deploy e verificar site funcionando

## Upload de Imagens para Sanity CDN
- [x] Fazer upload das 4 imagens de facas para o Sanity CDN
- [x] Associar imagens aos documentos de facas no Sanity
- [x] Criar helper de imagem frontend (sanityImage.ts) com urlForImage
- [x] Atualizar Home.tsx para usar imagens do Sanity CDN com fallback local
- [x] Atualizar Portfolio.tsx para usar imagens do Sanity CDN com fallback local
- [x] Atualizar KnifeModal.tsx para usar URLs de imagem já resolvidas
- [x] Adicionar campo fullImages ao tipo KnifeData para imagens em alta resolução
- [x] Atualizar email remetente para D.Braguim Site <noreply@dbraguim.com>
- [x] Verificar imagens carregando corretamente no dev server

## Migração de Imagens Locais para CDN
- [x] Upload de todas as imagens estáticas para S3 CDN
- [x] Atualizar referência do hero_placeholder.webp no CSS para CDN URL
- [x] Atualizar referência do dennis.webp na página Sobre para CDN URL
- [x] Atualizar KnifeCard.tsx para usar imagens do Sanity CDN
- [x] Mover imagens locais para /home/ubuntu/webdev-static-assets/
- [x] Todos os 17 testes passando (5 arquivos de teste)

## Deploy do Sanity Studio
- [x] Criar estrutura do Sanity Studio no projeto
- [x] Configurar sanity.config.ts com schemas
- [x] Fazer deploy do Studio para Sanity Cloud (https://dbraguim.sanity.studio)
- [x] Testar acesso e gerenciamento de facas
- [x] Entregar URL do Studio ao usuário

## Correção Erro 404 Sanity Studio
- [ ] Diagnosticar problema do Studio not found (404)
- [ ] Verificar configuração do studioHost e appId
- [ ] Fazer redeploy do Sanity Studio
- [ ] Verificar acesso funcionando

## Bug: Imagens das facas não carregam em produção (www.dbraguim.com)
- [x] Diagnosticar por que as imagens não carregam em produção
- [x] Corrigir o problema (shared/sanity.ts e sanityImage.ts com fallback hardcoded)
- [ ] Fazer deploy da correção (precisa exportar para GitHub)
- [ ] Verificar em produção

## Push para GitHub e redeploy em produção
- [ ] Fazer push do código atualizado para o GitHub
- [ ] Verificar redeploy automático na Vercel
- [ ] Confirmar imagens funcionando em www.dbraguim.com

## Deploy Manual via Vercel CLI
- [x] Instalar Vercel CLI globalmente
- [x] Testar build local (sucesso - 794KB bundle)
- [x] Criar guia de redeploy para o usuário (VERCEL_REDEPLOY_GUIDE.md)
- [ ] Usuário precisa reconectar GitHub ou fazer deploy manual na Vercel
- [ ] Confirmar imagens funcionando em www.dbraguim.com

## Bugs: Formulários não funcionando
- [ ] Formulário de contato não envia emails
- [ ] Formulário de orçamento não envia emails
- [ ] Newsletter não envia dados para Google Forms
- [ ] Diagnosticar problema do Resend API
- [ ] Diagnosticar problema da integração com Google Forms
- [ ] Corrigir e testar em produção

## Bug: Newsletter não envia para Google Forms
- [ ] Diagnosticar problema da integração com Google Forms
- [ ] Verificar URL do Google Forms e campos
- [ ] Corrigir envio para Google Forms
- [ ] Testar em produção e verificar respostas no Google Forms

## URLs Únicas para Facas
- [x] Adicionar campo slug ao schema de facas no Sanity
- [x] Criar página dedicada para cada faca com rota dinâmica (/faca/[slug])
- [x] Adicionar links para URLs únicas em Home e Portfolio
- [x] Testar rotas dinâmicas e validar funcionamento
- [x] Implementar geração automática de slug a partir do nome
- [x] Criar endpoint getKnifeBySlug no backend

## Newsletter - Banco de Dados
- [x] Criar tabela newsletterSubscribers no banco de dados
- [x] Implementar validação para evitar emails duplicados
- [x] Testar cadastro de emails na newsletter
