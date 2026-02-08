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
- [ ] Criar componente Modal de detalhes da faca
- [ ] Criar componente Video Lightbox
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
- [ ] Modal de detalhes da faca com specs
- [ ] Lightbox de vídeo em tela cheia
- [ ] Botões WhatsApp com mensagem pré-preenchida
- [ ] Links de email com assunto pré-preenchido
- [ ] Filtros de categoria no portfólio

## SEO e Meta Tags
- [ ] Configurar meta tags Open Graph
- [ ] Configurar Twitter Cards
- [ ] Implementar Schema.org JSON-LD
- [ ] Criar sitemap.xml
- [ ] Criar robots.txt

## Deploy e Documentação
- [ ] Documentar variáveis de ambiente necessárias
- [ ] Criar guia de deploy na Vercel
- [ ] Documentar como adicionar novas facas no Sanity
- [ ] Testar build de produção
- [ ] Criar checkpoint final

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
