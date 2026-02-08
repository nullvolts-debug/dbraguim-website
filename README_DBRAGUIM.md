# D.Braguim - Site de Cutelaria Artesanal

Site moderno e responsivo para D.Braguim, cutelaria artesanal especializada em facas forjadas à mão.

## 🎯 Características

- ✅ **Design Moderno**: Interface elegante com tema escuro e detalhes em dourado
- ✅ **Internacionalização**: Suporte completo para Português e Inglês
- ✅ **Formulário de Contato**: Sistema funcional com validação e notificações
- ✅ **Sanity CMS**: Gerenciamento fácil de conteúdo das facas
- ✅ **Responsivo**: Otimizado para desktop, tablet e mobile
- ✅ **SEO Otimizado**: Meta tags, Open Graph, Schema.org
- ✅ **Performance**: Carregamento rápido e otimizado

## 🛠️ Tecnologias

### Frontend
- **React 19**: Biblioteca UI moderna
- **TypeScript**: Tipagem estática
- **Tailwind CSS 4**: Framework CSS utility-first
- **Wouter**: Roteamento leve
- **tRPC**: Type-safe API calls
- **Zod**: Validação de schemas

### Backend
- **Express 4**: Framework web Node.js
- **tRPC 11**: Type-safe API
- **Drizzle ORM**: ORM TypeScript-first
- **MySQL/TiDB**: Banco de dados

### CMS
- **Sanity**: Headless CMS para gerenciamento de conteúdo

### Deploy
- **Vercel**: Hospedagem e deploy contínuo
- **Manus**: Plataforma de desenvolvimento

## 📁 Estrutura do Projeto

```
dbraguim-site/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Layout.tsx
│   │   │   └── KnifeCard.tsx
│   │   ├── contexts/       # Contextos React
│   │   │   ├── LanguageContext.tsx
│   │   │   └── ThemeContext.tsx
│   │   ├── pages/          # Páginas da aplicação
│   │   │   ├── Home.tsx
│   │   │   ├── Portfolio.tsx
│   │   │   ├── Sobre.tsx
│   │   │   └── Contato.tsx
│   │   ├── lib/            # Utilitários
│   │   │   └── trpc.ts
│   │   ├── dbraguim.css    # Estilos customizados
│   │   ├── index.css       # Estilos globais
│   │   └── App.tsx         # Componente raiz
│   └── public/             # Assets estáticos
│       ├── images/
│       └── videos/
├── server/                 # Backend Express + tRPC
│   ├── routers.ts          # Router principal
│   ├── contactRouter.ts    # API de contato
│   ├── sanityRouter.ts     # API Sanity
│   └── db.ts               # Configuração DB
├── shared/                 # Código compartilhado
│   ├── sanity.ts           # Cliente Sanity
│   ├── i18n.ts             # Traduções
│   └── contactSchema.ts    # Schemas de validação
├── drizzle/                # Schemas do banco
│   └── schema.ts
├── SANITY_SETUP.md         # Guia de configuração Sanity
├── VERCEL_DEPLOY.md        # Guia de deploy Vercel
└── todo.md                 # Lista de tarefas
```

## 🚀 Começando

### Pré-requisitos

- Node.js 22+
- pnpm 10+
- Conta Sanity (https://www.sanity.io)
- Conta Vercel (https://vercel.com) - para deploy

### Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd dbraguim-site
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite `.env` e adicione:
```env
VITE_SANITY_PROJECT_ID=seu_project_id
VITE_SANITY_DATASET=production
DATABASE_URL=sua_connection_string
```

4. Execute o projeto:
```bash
pnpm dev
```

O site estará disponível em `http://localhost:3000`

## 📝 Configuração do Sanity CMS

Veja o guia completo em [SANITY_SETUP.md](./SANITY_SETUP.md)

Resumo:
1. Crie um projeto no Sanity.io
2. Configure os schemas (knife, siteSettings)
3. Faça deploy do Sanity Studio
4. Adicione as facas no Studio
5. Configure CORS para seu domínio

## 🌐 Deploy na Vercel

Veja o guia completo em [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md)

Resumo:
1. Conecte seu repositório Git à Vercel
2. Configure variáveis de ambiente
3. Deploy automático a cada push

## 🎨 Personalização

### Cores

As cores principais estão definidas em `client/src/dbraguim.css`:

```css
:root {
  --gold: #c5a059;      /* Dourado principal */
  --dark: #080808;      /* Fundo escuro */
  --paper: #111;        /* Cards e containers */
  --line: rgba(255, 255, 255, 0.12);  /* Bordas */
  --muted: #aaa;        /* Texto secundário */
}
```

### Traduções

Adicione ou modifique traduções em `shared/i18n.ts`:

```typescript
export const translations = {
  pt: {
    // Traduções em português
  },
  en: {
    // Traduções em inglês
  }
};
```

### Adicionar Nova Faca

1. Acesse o Sanity Studio
2. Clique em "Knife" → "Create new"
3. Preencha todos os campos
4. Upload de imagens e vídeos
5. Publique

## 🧪 Testes

```bash
# Executar testes
pnpm test

# Verificar tipos TypeScript
pnpm check

# Formatar código
pnpm format
```

## 📱 Páginas

- **Home** (`/`): Hero section, destaques do portfólio, sobre
- **Portfólio** (`/portfolio`): Todas as facas com filtros
- **Sobre** (`/sobre`): História e valores da marca
- **Contato** (`/contato`): Formulário de contato e redes sociais

## 🔧 Scripts Disponíveis

```bash
pnpm dev          # Desenvolvimento local
pnpm build        # Build para produção
pnpm start        # Executar build de produção
pnpm check        # Verificar tipos TypeScript
pnpm format       # Formatar código
pnpm test         # Executar testes
pnpm db:push      # Aplicar mudanças no schema do DB
```

## 📞 Contato

- **Email**: contato@dbraguim.com
- **WhatsApp**: +55 11 99195-3021
- **Instagram**: [@d.braguim](https://instagram.com/d.braguim)

## 📄 Licença

Este projeto é proprietário e confidencial.

## 🙏 Créditos

Desenvolvido com ❤️ para D.Braguim Cutelaria Artesanal
