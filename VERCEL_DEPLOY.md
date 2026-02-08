# Deploy na Vercel - D.Braguim

## Pré-requisitos

1. Conta na Vercel (https://vercel.com)
2. Projeto Sanity configurado (veja SANITY_SETUP.md)
3. Código do projeto no GitHub/GitLab/Bitbucket

## Passo 1: Preparar Repositório

1. Faça push do código para seu repositório Git
2. Certifique-se de que o `.gitignore` está configurado corretamente

## Passo 2: Importar Projeto na Vercel

1. Acesse https://vercel.com/new
2. Importe seu repositório
3. Configure o projeto:
   - **Framework Preset**: Other
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`

## Passo 3: Configurar Variáveis de Ambiente

Na seção "Environment Variables", adicione:

### Variáveis do Sanity CMS

```
VITE_SANITY_PROJECT_ID=seu_project_id_aqui
VITE_SANITY_DATASET=production
```

### Variáveis do Banco de Dados

Se estiver usando banco de dados externo (MySQL/PostgreSQL):

```
DATABASE_URL=sua_connection_string_aqui
```

### Outras Variáveis (Opcional)

```
NODE_ENV=production
```

## Passo 4: Deploy

1. Clique em "Deploy"
2. Aguarde o build completar (geralmente 2-5 minutos)
3. Acesse a URL gerada pela Vercel

## Passo 5: Configurar Domínio Customizado (Opcional)

1. Na dashboard do projeto na Vercel, vá em "Settings" → "Domains"
2. Adicione seu domínio customizado (ex: dbraguim.com)
3. Configure os registros DNS conforme instruções da Vercel:
   - Tipo A: 76.76.21.21
   - Tipo CNAME: cname.vercel-dns.com

## Passo 6: Configurar CORS no Sanity

1. Acesse https://www.sanity.io/manage
2. Selecione seu projeto
3. Vá em "API" → "CORS Origins"
4. Adicione a URL do seu site Vercel:
   - Exemplo: `https://dbraguim.vercel.app`
   - Ou seu domínio customizado: `https://dbraguim.com`
5. Marque "Allow credentials"

## Estrutura do Projeto para Vercel

```
dbraguim-site/
├── client/               # Frontend React
│   ├── src/
│   ├── public/
│   └── index.html
├── server/               # Backend Express + tRPC
│   ├── routers.ts
│   ├── contactRouter.ts
│   └── sanityRouter.ts
├── shared/               # Código compartilhado
│   ├── sanity.ts
│   └── i18n.ts
├── package.json
└── vercel.json           # Configuração Vercel (criar se necessário)
```

## Configuração Avançada (vercel.json)

Crie um arquivo `vercel.json` na raiz do projeto se precisar de configurações customizadas:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/_core/index.ts",
      "use": "@vercel/node"
    },
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/_core/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "client/$1"
    }
  ]
}
```

## Troubleshooting

### Build falha com erro de TypeScript

- Verifique se todos os tipos estão corretos
- Execute `pnpm check` localmente antes de fazer deploy

### Erro 404 nas rotas

- Certifique-se de que o `vercel.json` está configurado corretamente
- Verifique se as rotas do React Router estão funcionando

### Imagens não carregam

- Verifique se as imagens estão na pasta `client/public/`
- Confirme que os caminhos estão corretos (começando com `/`)

### Erro de CORS

- Adicione a URL da Vercel nas configurações de CORS do Sanity
- Verifique se as credenciais estão habilitadas

## Atualizações Automáticas

A Vercel faz deploy automático quando você:
- Faz push para a branch principal (main/master)
- Cria um pull request (deploy de preview)

## Monitoramento

- Acesse a dashboard da Vercel para ver:
  - Logs de build
  - Logs de runtime
  - Analytics
  - Performance metrics

## Custos

- Vercel oferece plano gratuito generoso
- Plano Pro necessário para:
  - Domínios customizados ilimitados
  - Analytics avançado
  - Mais builds simultâneos

## Próximos Passos

1. Configure o Sanity Studio (veja SANITY_SETUP.md)
2. Adicione as facas reais no Sanity
3. Teste todas as funcionalidades em produção
4. Configure analytics (Google Analytics, Vercel Analytics, etc.)
5. Configure SEO (meta tags, sitemap, robots.txt)

## Suporte

- Documentação Vercel: https://vercel.com/docs
- Documentação Sanity: https://www.sanity.io/docs
- Issues do projeto: [link do seu repositório]
