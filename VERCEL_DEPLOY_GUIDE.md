# Guia Completo: Deploy no Vercel

## 📋 Pré-requisitos

Antes de fazer o deploy, certifique-se de ter:

- ✅ Conta no Vercel (https://vercel.com)
- ✅ Conta no GitHub
- ✅ Resend API Key configurada
- ✅ Sanity Project ID e Dataset
- ✅ Imagens das facas adicionadas no Sanity Studio

---

## 🚀 Passo 1: Preparar Repositório GitHub

### 1.1 Criar Repositório

1. Acesse https://github.com/new
2. Nome: `dbraguim-website`
3. Visibilidade: **Private** (recomendado) ou Public
4. **NÃO** inicialize com README, .gitignore ou license
5. Clique em "Create repository"

### 1.2 Fazer Push do Código

```bash
cd /home/ubuntu/dbraguim-site

# Inicializar git (se ainda não foi)
git init

# Adicionar remote
git remote add origin https://github.com/SEU_USUARIO/dbraguim-website.git

# Adicionar arquivos
git add .

# Commit
git commit -m "Initial commit: D.Braguim website with Sanity CMS"

# Push
git push -u origin main
```

---

## ⚙️ Passo 2: Configurar Variáveis de Ambiente

Você precisará configurar as seguintes variáveis no Vercel:

### Variáveis Obrigatórias

| Variável | Valor | Onde Obter |
|----------|-------|------------|
| `RESEND_API_KEY` | `re_...` | https://resend.com/api-keys |
| `VITE_SANITY_PROJECT_ID` | `9kunhe1k` | Já configurado |
| `VITE_SANITY_DATASET` | `production` | Já configurado |
| `DATABASE_URL` | `mysql://...` | Vercel fornecerá automaticamente |

### Variáveis Opcionais (já configuradas pelo Manus)

Estas variáveis são específicas do Manus e **não são necessárias** no Vercel:

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

## 🌐 Passo 3: Deploy no Vercel

### 3.1 Importar Projeto

1. Acesse https://vercel.com/new
2. Clique em "Import Git Repository"
3. Selecione o repositório `dbraguim-website`
4. Clique em "Import"

### 3.2 Configurar Build

O Vercel detectará automaticamente as configurações do `vercel.json`:

- **Framework Preset**: Other
- **Build Command**: `pnpm build`
- **Output Directory**: `dist`
- **Install Command**: `pnpm install`

**Não altere** essas configurações.

### 3.3 Adicionar Variáveis de Ambiente

1. Na página de configuração do projeto, vá para "Environment Variables"

2. Adicione cada variável:

**RESEND_API_KEY**
```
Key: RESEND_API_KEY
Value: re_SuaChaveAqui
Environment: Production, Preview, Development
```

**VITE_SANITY_PROJECT_ID**
```
Key: VITE_SANITY_PROJECT_ID
Value: 9kunhe1k
Environment: Production, Preview, Development
```

**VITE_SANITY_DATASET**
```
Key: VITE_SANITY_DATASET
Value: production
Environment: Production, Preview, Development
```

3. Clique em "Deploy"

### 3.4 Aguardar Deploy

- O Vercel fará o build e deploy automaticamente
- Tempo estimado: 2-5 minutos
- Você receberá uma URL temporária: `https://dbraguim-website.vercel.app`

---

## 🔗 Passo 4: Configurar Domínio Personalizado

### 4.1 Adicionar Domínio no Vercel

1. No dashboard do projeto, vá para "Settings" → "Domains"
2. Clique em "Add"
3. Digite: `dbraguim.com`
4. Clique em "Add"

### 4.2 Configurar DNS no Squarespace

O Vercel fornecerá registros DNS. Adicione no Squarespace:

**Opção A: CNAME (Recomendado)**
```
Type: CNAME
Host: www
Value: cname.vercel-dns.com
```

**Opção B: A Record**
```
Type: A
Host: @
Value: 76.76.21.21
```

### 4.3 Aguardar Propagação

- Tempo: 24-48 horas (geralmente 1-2 horas)
- Verifique em: https://dnschecker.org

---

## 🔒 Passo 5: Configurar CORS no Sanity

Para que o Sanity funcione no domínio de produção:

1. Acesse https://www.sanity.io/manage/personal/project/9kunhe1k
2. Vá em "API" → "CORS Origins"
3. Clique em "Add CORS origin"
4. Adicione:
   - `https://dbraguim.com`
   - `https://www.dbraguim.com`
   - `https://dbraguim-website.vercel.app` (URL temporária)
5. Marque "Allow credentials"
6. Clique em "Save"

---

## ✅ Passo 6: Testar Site em Produção

### Checklist de Testes

- [ ] Site carrega corretamente
- [ ] Imagens das facas aparecem
- [ ] Modal de facas abre e fecha
- [ ] Formulário de contato envia email
- [ ] Newsletter funciona
- [ ] Filtros do portfólio funcionam
- [ ] Troca de idioma (PT/EN) funciona
- [ ] Links do WhatsApp e Instagram funcionam
- [ ] Site responsivo em mobile

---

## 🔄 Passo 7: Deploy Automático

Após o setup inicial, **qualquer push** para o GitHub dispara deploy automático:

```bash
# Fazer mudanças no código
git add .
git commit -m "Descrição das mudanças"
git push

# Vercel fará deploy automaticamente
```

---

## 📊 Monitoramento

### Analytics

O Vercel fornece analytics gratuito:
- Acesse: Dashboard do projeto → "Analytics"
- Métricas: Pageviews, visitors, performance

### Logs

Para ver logs de erros:
- Acesse: Dashboard do projeto → "Deployments"
- Clique no deployment → "Function Logs"

---

## 🐛 Troubleshooting

### Build Falha

**Erro**: `Module not found`
- **Solução**: Verifique se todas as dependências estão no `package.json`
- Execute localmente: `pnpm build`

**Erro**: `Environment variable not found`
- **Solução**: Verifique se todas as variáveis foram adicionadas no Vercel
- Vá em Settings → Environment Variables

### Site Não Carrega

**Erro**: Página em branco
- **Solução**: Verifique logs no Vercel
- Verifique se o build foi bem-sucedido

**Erro**: Imagens não aparecem
- **Solução**: Verifique se adicionou imagens no Sanity Studio
- Verifique CORS do Sanity

### Emails Não Enviam

**Erro**: Formulário não envia
- **Solução**: Verifique `RESEND_API_KEY` no Vercel
- Verifique se o domínio está verificado no Resend

---

## 🔐 Segurança

### Recomendações

1. **Nunca commite** arquivos `.env` no GitHub
2. **Use secrets** do Vercel para variáveis sensíveis
3. **Ative HTTPS** (Vercel faz automaticamente)
4. **Configure CSP** headers (já incluído no `vercel.json`)

---

## 💰 Custos

### Vercel

- **Plano Hobby**: Gratuito
  - Domínios ilimitados
  - 100GB bandwidth/mês
  - Suficiente para sites pequenos/médios

- **Plano Pro**: $20/mês
  - 1TB bandwidth
  - Analytics avançado
  - Necessário apenas se ultrapassar limites

### Sanity

- **Plano Free**: Gratuito
  - 3 usuários
  - 10GB assets
  - 100k requests/mês
  - Suficiente para começar

- **Plano Growth**: $99/mês
  - Usuários ilimitados
  - 200GB assets
  - Necessário apenas se crescer muito

### Resend

- **Plano Free**: Gratuito
  - 100 emails/dia
  - 1 domínio verificado
  - Suficiente para começar

- **Plano Pro**: $20/mês
  - 50k emails/mês
  - Domínios ilimitados

---

## 📞 Suporte

**Vercel**: https://vercel.com/support
**Sanity**: https://www.sanity.io/help
**Resend**: https://resend.com/support

---

## ✅ Checklist Final

Antes de considerar o deploy completo:

- [ ] Código no GitHub
- [ ] Deploy no Vercel bem-sucedido
- [ ] Variáveis de ambiente configuradas
- [ ] Domínio personalizado configurado
- [ ] DNS propagado
- [ ] CORS do Sanity configurado
- [ ] Imagens das facas no Sanity
- [ ] Testes de funcionalidade passaram
- [ ] Site acessível em produção
- [ ] Emails funcionando

---

**Última atualização**: 09/02/2026
