# 📋 Resumo: Padronização de Arquivos - Plano de Ação

## 🎯 Objetivo

Padronizar nomes de arquivos e pastas para que o site leia automaticamente as imagens corretamente.

---

## ✅ **O QUE ESTÁ CORRETO**

### Websites:

- ✅ Estrutura de pastas ok
- ✅ Thumbnails já são `thumbnail.webp`

### Campanhas:

- ✅ Thumbnails já são `thumbnail.webp`
- ✅ Estrutura de pastas ok

---

## ⚠️ **O QUE PRECISA SER CORRIGIDO**

### 1. **RENOMEAR PASTAS** (para alinhar com slugs do código)

**Branding:**

- `rick/` → `rick-brand/` (slug: `rick-brand`)
- `fernanda/` → `fernanda-s/` (slug: `fernanda-s`)
- `ouro-texas/` → `ouro-western/` (slug: `ouro-western`)
- `movbee/` → `movbee-brand/` (slug: `movbee-brand`)

**Websites:**

- `adubos real/` → `adubos-real/` (slug: `adubos-real`) - remover espaço
- `movbee/` → `movbee-website/` (slug: `movbee-website`)
- **Criar:** `rick-website/` (slug existe mas pasta não)

### 2. **RENOMEAR SVGs DE BRANDING**

Todos os logos SVG → `thumbnail.svg`:

- `rick.svg` → `thumbnail.svg`
- `netexperts.svg` → `thumbnail.svg`
- `fernanda-s.svg` → `thumbnail.svg`
- `lotus.svg` → `thumbnail.svg`
- `2medcenter-logo.svg` → `thumbnail.svg`
- `2campotech.svg` → `thumbnail.svg`
- `movbee.svg` → `thumbnail.svg`
- `2ouro-western.svg` → `thumbnail.svg`
- `vinca.svg` → `thumbnail.svg`

### 3. **RENOMEAR IMAGENS DE BRANDING**

Todas as imagens .webp → `01.webp`, `02.webp`, `03.webp`, etc.

- NetExperts: `1.webp-8.webp` → `01.webp-08.webp`
- Demais projetos: renomear todas as imagens em ordem

### 4. **LIMPAR DUPLICATAS**

- MedCenter: remover arquivos .png (manter apenas .webp)

---

## 🔧 **ATUALIZAÇÕES NO CÓDIGO**

1. Atualizar `lib/projects-data.ts`:

   - Thumbnails de branding: usar `thumbnail.svg` em vez de `.webp`
   - Corrigir caminhos após renomeação de pastas

2. Atualizar `lib/project-images.ts`:

   - Suportar leitura de `.svg` para thumbnails de branding
   - Atualizar função para reconhecer novos nomes de pastas

3. Atualizar `components/ui/project-card.tsx`:
   - Suportar exibição de `.svg` como thumbnail

---

## 📊 **RESUMO DE AÇÕES**

| Tipo                          | Quantidade | Status      |
| ----------------------------- | ---------- | ----------- |
| Pastas a renomear             | 7          | ⏳ Pendente |
| Pasta a criar                 | 1          | ⏳ Pendente |
| SVGs a renomear               | 9          | ⏳ Pendente |
| Imagens a numerar             | ~70        | ⏳ Pendente |
| Arquivos duplicados a remover | ~8 PNGs    | ⏳ Pendente |

---

## ❓ **QUESTÕES PARA VALIDAÇÃO**

1. **Ordem das imagens:** Como numerar as imagens de cada projeto?

   - Por ordem alfabética do nome atual?
   - Por ordem de importância visual?
   - Você quer definir manualmente a ordem?

2. **Rick Website:** Quer que eu crie a pasta `rick-website/` agora ou você vai adicionar depois?

3. **Confirmação:** Posso prosseguir com a renomeação seguindo este plano?

---

**Status:** ⏳ Aguardando sua validação para prosseguir
