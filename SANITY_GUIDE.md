# Guia Completo: Gerenciar Facas via Sanity CMS

## 🎯 Visão Geral

O site D.Braguim usa o **Sanity CMS** para gerenciar todo o conteúdo das facas. Você pode adicionar, editar e remover facas através de uma interface visual amigável, sem precisar editar código.

---

## 🔑 Acesso ao Sanity Studio

### Opção 1: Studio Online (Recomendado)
Acesse: **https://dbraguim.sanity.studio**

### Opção 2: Studio Local
```bash
cd /home/ubuntu/dbraguim-site
pnpm sanity dev
```
Acesse: `http://localhost:3333`

**Login:** Use sua conta Sanity (mesmo email/senha que você criou o projeto)

---

## ➕ Como Adicionar uma Nova Faca

1. **Acesse o Sanity Studio** (link acima)

2. **Clique em "Facas" no menu lateral**

3. **Clique no botão "+ Create" no canto superior direito**

4. **Preencha os campos:**

### Campos Obrigatórios ⚠️

- **Nome**: Nome da faca (ex: "Blue Hunter")
- **Categoria**: Escolha entre Caça, Luta ou Chef
- **Status**: Disponível, Vendida ou Encomenda
- **Imagens**: Clique em "Upload" e adicione pelo menos 1 foto
  - Recomendado: 3-5 fotos de diferentes ângulos
  - Formato: JPG, PNG ou WebP
  - Tamanho: até 10MB por imagem
- **Descrição (Português)**: Texto descritivo em português
- **Descrição (Inglês)**: Texto descritivo em inglês

### Campos Opcionais

- **Vídeo (MP4)**: Upload de vídeo da faca
- **Poster do Vídeo**: Imagem de capa do vídeo
- **Modelo**: Ex: Hunter, Fighter, Chef
- **Comprimento**: Ex: 22 cm
- **Largura**: Ex: 3,5 cm
- **Espessura**: Ex: 4 mm
- **Aço (Português/Inglês)**: Ex: Damasco liga 1095 com 15N20
- **Cabo (Português/Inglês)**: Ex: Poplar burl
- **Destaque**: Marque para aparecer na página inicial
- **Ordem**: Número para ordenação (menor = aparece primeiro)

5. **Clique em "Publish" no canto superior direito**

✅ **Pronto!** A faca aparecerá automaticamente no site em alguns segundos.

---

## ✏️ Como Editar uma Faca Existente

1. Acesse o Sanity Studio
2. Clique em "Facas" no menu lateral
3. Clique na faca que deseja editar
4. Faça as alterações necessárias
5. Clique em "Publish" para salvar

---

## 🗑️ Como Remover uma Faca

1. Acesse o Sanity Studio
2. Clique em "Facas" no menu lateral
3. Clique na faca que deseja remover
4. Clique no botão "⋯" (três pontos) no canto superior direito
5. Selecione "Delete"
6. Confirme a exclusão

---

## 📸 Dicas para Imagens

### Qualidade
- **Resolução mínima**: 1200x800px
- **Formato recomendado**: WebP ou JPG
- **Iluminação**: Fotos bem iluminadas, fundo neutro (preto ou branco)

### Quantidade
- **Mínimo**: 1 foto
- **Recomendado**: 3-5 fotos mostrando:
  1. Faca completa (visão geral)
  2. Detalhe da lâmina/damasco
  3. Detalhe do cabo
  4. Ângulo lateral
  5. Faca em uso (opcional)

### Ordem
- A **primeira imagem** é a que aparece nos cards do site
- Arraste para reordenar as imagens no Sanity Studio

---

## 🎬 Vídeos

### Formato
- **Tipo**: MP4
- **Duração**: 10-60 segundos
- **Tamanho máximo**: 100MB
- **Resolução**: 1080p (1920x1080)

### Poster
- Adicione uma imagem de capa atraente
- Será exibida antes do vídeo carregar

---

## ⚙️ Configurações do Site

Para editar informações globais do site:

1. Acesse o Sanity Studio
2. Clique em "Configurações do Site" no menu lateral
3. Edite:
   - Título do site (PT/EN)
   - Slogan (PT/EN)
   - Número WhatsApp
   - Instagram handle
   - E-mail
   - Telefone
4. Clique em "Publish"

---

## 🔄 Como Funciona a Sincronização

- **Tempo de atualização**: Instantâneo (1-3 segundos)
- **Cache**: O site usa cache inteligente para performance
- **Publicação**: Mudanças só aparecem após clicar em "Publish"
- **Rascunhos**: Você pode salvar rascunhos sem publicar

---

## 📊 Lógica de Destaques na Home

A página inicial mostra **3 facas em destaque**:

1. **Prioridade**: Facas com status "Disponível" aparecem primeiro
2. **Fallback**: Se não houver 3 disponíveis, preenche com outras
3. **Controle manual**: Marque "Destaque" para garantir que apareça
4. **Ordenação**: Use o campo "Ordem" para controlar sequência

---

## 🐛 Problemas Comuns

### "Não consigo fazer upload de imagem"
- Verifique o tamanho (máx 10MB)
- Tente converter para JPG ou WebP
- Limpe o cache do navegador

### "Mudanças não aparecem no site"
- Certifique-se de clicar em "Publish" (não apenas "Save")
- Aguarde 5 segundos e recarregue a página
- Limpe o cache do navegador (Ctrl+Shift+R)

### "Erro ao acessar Sanity Studio"
- Verifique se está logado com a conta correta
- Limpe cookies e faça login novamente
- Contate o administrador se persistir

---

## 📞 Suporte

**Projeto Sanity**: https://www.sanity.io/manage/personal/project/9kunhe1k

**Documentação Sanity**: https://www.sanity.io/docs

**Deploy do Studio**: Para hospedar o Studio online, execute:
```bash
cd /home/ubuntu/dbraguim-site
pnpm sanity deploy
```

---

## ✅ Checklist: Adicionar Nova Faca

- [ ] Preparar fotos de qualidade (mínimo 1, recomendado 3-5)
- [ ] Acessar Sanity Studio
- [ ] Criar novo documento de faca
- [ ] Preencher nome, categoria e status
- [ ] Upload das imagens
- [ ] Escrever descrições (PT e EN)
- [ ] Preencher especificações técnicas
- [ ] Marcar "Destaque" se quiser na home
- [ ] Definir "Ordem" para controlar posição
- [ ] Clicar em "Publish"
- [ ] Verificar no site se apareceu corretamente

---

**Última atualização**: 09/02/2026
