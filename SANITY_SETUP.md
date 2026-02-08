# Configuração do Sanity CMS para D.Braguim

## 1. Criar Projeto no Sanity

1. Acesse https://www.sanity.io/
2. Crie uma conta ou faça login
3. Crie um novo projeto chamado "D.Braguim"
4. Escolha o dataset: `production`
5. Anote o **Project ID** que será gerado

## 2. Instalar Sanity CLI e Criar Studio

```bash
npm install -g @sanity/cli
sanity init
```

Quando solicitado:
- Selecione o projeto "D.Braguim" criado anteriormente
- Escolha dataset: `production`
- Escolha template: `Clean project with no predefined schemas`
- Nome da pasta: `dbraguim-studio`

## 3. Schemas do Sanity

Crie os seguintes arquivos dentro de `dbraguim-studio/schemas/`:

### `knife.ts` - Schema para Facas

```typescript
export default {
  name: 'knife',
  title: 'Faca',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Caça', value: 'hunting' },
          { title: 'Luta', value: 'fighter' },
          { title: 'Chef', value: 'chef' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Disponível', value: 'available' },
          { title: 'Vendida', value: 'sold' },
          { title: 'Encomenda', value: 'commission' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'images',
      title: 'Imagens',
      type: 'array',
      of: [{ type: 'image' }],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'video',
      title: 'Vídeo',
      type: 'file',
      options: {
        accept: 'video/mp4',
      },
    },
    {
      name: 'videoPoster',
      title: 'Poster do Vídeo',
      type: 'image',
    },
    {
      name: 'description_pt',
      title: 'Descrição (Português)',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description_en',
      title: 'Descrição (Inglês)',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'model',
      title: 'Modelo',
      type: 'string',
    },
    {
      name: 'length',
      title: 'Comprimento',
      type: 'string',
    },
    {
      name: 'width',
      title: 'Largura',
      type: 'string',
    },
    {
      name: 'thickness',
      title: 'Espessura',
      type: 'string',
    },
    {
      name: 'steel_pt',
      title: 'Aço (Português)',
      type: 'string',
    },
    {
      name: 'steel_en',
      title: 'Aço (Inglês)',
      type: 'string',
    },
    {
      name: 'handle_pt',
      title: 'Cabo (Português)',
      type: 'string',
    },
    {
      name: 'handle_en',
      title: 'Cabo (Inglês)',
      type: 'string',
    },
    {
      name: 'featured',
      title: 'Destaque',
      type: 'boolean',
      description: 'Mostrar na página inicial',
    },
    {
      name: 'order',
      title: 'Ordem',
      type: 'number',
      description: 'Ordem de exibição (menor número aparece primeiro)',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'images.0',
    },
  },
}
```

### `siteSettings.ts` - Schema para Configurações do Site

```typescript
export default {
  name: 'siteSettings',
  title: 'Configurações do Site',
  type: 'document',
  fields: [
    {
      name: 'title_pt',
      title: 'Título (Português)',
      type: 'string',
    },
    {
      name: 'title_en',
      title: 'Título (Inglês)',
      type: 'string',
    },
    {
      name: 'slogan_pt',
      title: 'Slogan (Português)',
      type: 'string',
    },
    {
      name: 'slogan_en',
      title: 'Slogan (Inglês)',
      type: 'string',
    },
    {
      name: 'whatsappNumber',
      title: 'Número WhatsApp',
      type: 'string',
      description: 'Formato: 5511991953021',
    },
    {
      name: 'instagramHandle',
      title: 'Instagram Handle',
      type: 'string',
      description: 'Sem @, exemplo: d.braguim',
    },
    {
      name: 'email',
      title: 'E-mail',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Telefone',
      type: 'string',
    },
  ],
}
```

### `index.ts` - Exportar Schemas

```typescript
import knife from './knife'
import siteSettings from './siteSettings'

export const schemaTypes = [knife, siteSettings]
```

## 4. Configurar Variáveis de Ambiente

Adicione ao arquivo `.env` do projeto:

```env
VITE_SANITY_PROJECT_ID=seu_project_id_aqui
VITE_SANITY_DATASET=production
```

## 5. Iniciar Sanity Studio

```bash
cd dbraguim-studio
sanity start
```

O Studio estará disponível em `http://localhost:3333`

## 6. Deploy do Sanity Studio

Para hospedar o Studio online:

```bash
cd dbraguim-studio
sanity deploy
```

Escolha um nome único para o Studio (ex: `dbraguim-cms`)

O Studio estará disponível em: `https://dbraguim-cms.sanity.studio`

## 7. Migrar Dados Existentes

Após configurar o Studio, adicione manualmente as 4 facas existentes:

1. **Blue Hunter** (Caça, Disponível)
2. **Spear Bowie** (Luta, Disponível)
3. **Flame Chef** (Chef, Encomenda)
4. **Amber Chef** (Chef, Vendida)

Use as imagens e informações do site atual.

## 8. Configurar CORS

No painel do Sanity (https://www.sanity.io/manage):
1. Acesse seu projeto
2. Vá em "API" → "CORS Origins"
3. Adicione:
   - `http://localhost:3000` (desenvolvimento)
   - Seu domínio Vercel (produção)

## 9. Variáveis de Ambiente na Vercel

Ao fazer deploy na Vercel, configure:

```
VITE_SANITY_PROJECT_ID=seu_project_id
VITE_SANITY_DATASET=production
```
