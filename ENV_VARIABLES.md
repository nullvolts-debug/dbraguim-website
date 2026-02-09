# Variáveis de Ambiente - D.Braguim

## 🔑 Variáveis Obrigatórias para Vercel

Configure estas variáveis no painel do Vercel (Settings → Environment Variables):

### 1. RESEND_API_KEY
- **Descrição**: Chave de API do Resend para envio de emails
- **Onde obter**: https://resend.com/api-keys
- **Formato**: `re_...`
- **Exemplo**: `re_123abc456def`

### 2. VITE_SANITY_PROJECT_ID
- **Descrição**: ID do projeto Sanity CMS
- **Valor**: `9kunhe1k`
- **Fixo**: Não alterar

### 3. VITE_SANITY_DATASET
- **Descrição**: Dataset do Sanity
- **Valor**: `production`
- **Fixo**: Não alterar

### 4. DATABASE_URL
- **Descrição**: String de conexão MySQL/TiDB
- **Onde obter**: Vercel fornecerá automaticamente ao adicionar banco de dados
- **Formato**: `mysql://user:password@host:port/database`
- **Nota**: Opcional se não usar banco de dados

---

## ⚠️ Variáveis NÃO Necessárias no Vercel

As seguintes variáveis são específicas do ambiente Manus e **não devem** ser configuradas no Vercel:

- `JWT_SECRET`
- `OAUTH_SERVER_URL`
- `VITE_OAUTH_PORTAL_URL`
- `OWNER_OPEN_ID`
- `OWNER_NAME`
- `BUILT_IN_FORGE_API_KEY`
- `BUILT_IN_FORGE_API_URL`
- `VITE_FRONTEND_FORGE_API_KEY`
- `VITE_FRONTEND_FORGE_API_URL`
- `VITE_ANALYTICS_ENDPOINT`
- `VITE_ANALYTICS_WEBSITE_ID`
- `VITE_APP_ID`
- `VITE_APP_LOGO`
- `VITE_APP_TITLE`

---

## 📋 Checklist de Configuração

Antes de fazer deploy no Vercel:

- [ ] `RESEND_API_KEY` configurada
- [ ] `VITE_SANITY_PROJECT_ID` configurada
- [ ] `VITE_SANITY_DATASET` configurada
- [ ] Todas as variáveis aplicadas a: Production, Preview e Development
- [ ] CORS do Sanity configurado para domínio de produção
- [ ] Domínio verificado no Resend (se usar domínio personalizado)

---

## 🔒 Segurança

- **Nunca** commite arquivos `.env` no GitHub
- **Nunca** exponha API keys publicamente
- Use o painel do Vercel para gerenciar secrets
- Rotacione keys periodicamente

---

## 📝 Como Adicionar no Vercel

1. Acesse o projeto no Vercel
2. Vá em **Settings** → **Environment Variables**
3. Para cada variável:
   - Clique em "Add"
   - **Key**: Nome da variável (ex: `RESEND_API_KEY`)
   - **Value**: Valor da variável
   - **Environments**: Marque todos (Production, Preview, Development)
   - Clique em "Save"
4. Após adicionar todas, faça redeploy

---

**Última atualização**: 09/02/2026
