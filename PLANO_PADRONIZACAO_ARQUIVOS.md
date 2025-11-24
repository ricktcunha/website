# 📋 Plano de Ação: Padronização de Arquivos e Nomes

## 🎯 Objetivo

Padronizar todos os nomes de arquivos nas pastas de trabalhos para facilitar a leitura automática e manter organização consistente.

---

## 📁 Estrutura Atual vs. Estrutura Desejada

### ✅ **WEBSITES** (Já está correto!)

```
websites/
  adubos real/
    thumbnail.webp ✓
  mandu-cultural/
    thumbnail.webp ✓
  movbee/
    thumbnail.webp ✓
```

**Status:** ✅ Não precisa de mudanças

### ⚠️ **BRANDING** (Precisa padronização)

**Estrutura Atual:**

- Cada projeto tem um SVG com nome variado (logo do projeto)
- Imagens com nomes diversos que precisam ser renomeadas

**Estrutura Desejada:**

```
branding/
  [slug-projeto]/
    thumbnail.svg     ← Logo SVG padronizado
    01.webp          ← Imagens numeradas sequencialmente
    02.webp
    03.webp
    ...
```

**Mapeamento necessário:**

- `rick/rick.svg` → `rick/thumbnail.svg`
- `netexperts/netexperts.svg` → `netexperts/thumbnail.svg`
- `fernanda-s/fernanda-s.svg` → `fernanda-s/thumbnail.svg`
- `lotus/lotus.svg` → `lotus/thumbnail.svg`
- `medcenter/2medcenter-logo.svg` → `medcenter/thumbnail.svg`
- `campotech/2campotech.svg` → `campotech/thumbnail.svg`
- `movbee/movbee.svg` → `movbee/thumbnail.svg`
- `ouro-texas/2ouro-western.svg` → `ouro-texas/thumbnail.svg`
- `vinca/vinca.svg` → `vinca/thumbnail.svg`

### ⚠️ **CAMPANHAS** (Precisa verificar imagens)

**Postagens:**

```
campanhas/postagens/
  thumbnail.webp ✓
  [precisa verificar se há outras imagens para numerar]
```

**KV's:**

```
campanhas/kvs/
  thumbnail.webp ✓
  [precisa verificar se há outras imagens para numerar]
```

---

## 🔍 Análise Detalhada por Projeto

### **Branding - Rick**

- **Pasta:** `branding/rick/`
- **SVG atual:** `rick.svg` → renomear para `thumbnail.svg`
- **Imagens para renomear:**
  - `camisa.webp`, `cartao.webp`, `cores.webp`, `cracha.webp`, `logo.webp`, `mock-post.webp`, `phone.webp`, `relogio.webp`
  - Ordem sugerida: 01-08 (total: 8 imagens)

### **Branding - NetExperts**

- **Pasta:** `branding/netexperts/`
- **SVG atual:** `netexperts.svg` → renomear para `thumbnail.svg`
- **Imagens:** ✅ Já estão numeradas (1.webp a 8.webp)
- **Ação:** Renomear `1.webp` → `01.webp`, `2.webp` → `02.webp`, etc.

### **Branding - Fernanda S.**

- **Pasta:** `branding/fernanda/`
- **SVG atual:** `fernanda-s.svg` → renomear para `thumbnail.svg`
- **Imagens para renomear:** ~8 imagens webp

### **Branding - Lotus**

- **Pasta:** `branding/lotus/`
- **SVG atual:** `lotus.svg` → renomear para `thumbnail.svg`
- **Imagens para renomear:** ~8 imagens webp

### **Branding - MedCenter**

- **Pasta:** `branding/medcenter/`
- **SVG atual:** `2medcenter-logo.svg` → renomear para `thumbnail.svg`
- **Imagens:** Muitas duplicatas (PNG e WEBP) - manter apenas WEBP
- **Imagens para renomear:** ~8 imagens webp

### **Branding - Campotech**

- **Pasta:** `branding/campotech/`
- **SVG atual:** `2campotech.svg` → renomear para `thumbnail.svg`
- **Imagens para renomear:** ~8 imagens webp

### **Branding - MovBee**

- **Pasta:** `branding/movbee/`
- **SVG atual:** `movbee.svg` → renomear para `thumbnail.svg`
- **Imagens:** Apenas o SVG (sem galeria ainda)

### **Branding - Ouro Western**

- **Pasta:** `branding/ouro-texas/`
- **SVG atual:** `2ouro-western.svg` → renomear para `thumbnail.svg`
- **Slug no código:** `ouro-western` → **PROBLEMA:** pasta é `ouro-texas` mas slug é `ouro-western`
- **Imagens para renomear:** ~8 imagens webp

### **Branding - Vinca**

- **Pasta:** `branding/vinca/`
- **SVG atual:** `vinca.svg` → renomear para `thumbnail.svg`
- **Imagens para renomear:** ~8 imagens webp

---

## ❓ Problemas Identificados - DISCREPÂNCIAS PASTA vs SLUG

### **BRANDING:**

1. **Rick:**

   - Pasta: `rick/`
   - Slug: `rick-brand`
   - **Ação:** Renomear pasta para `rick-brand/` OU criar link simbólico

2. **Ouro Western:**

   - Pasta: `ouro-texas/`
   - Slug: `ouro-western`
   - **Ação:** Renomear pasta para `ouro-western/` (slug parece ser o correto)

3. **MovBee:**
   - Pasta: `movbee/`
   - Slug: `movbee-brand`
   - **Ação:** Renomear pasta para `movbee-brand/` OU criar link simbólico

### **WEBSITES:**

1. **Adubos Real:**

   - Pasta: `adubos real/` (com espaço!)
   - Slug: `adubos-real` (com hífen)
   - **Ação:** Renomear pasta para `adubos-real/` (sem espaço)

2. **MovBee Website:**

   - Pasta: `movbee/`
   - Slug: `movbee-website`
   - **Ação:** Renomear pasta para `movbee-website/`

3. **Rick Website:**
   - Pasta: **NÃO EXISTE**
   - Slug: `rick-website`
   - **Ação:** Criar pasta `rick-website/` e adicionar thumbnail

### **CAMPANHAS:**

- ✅ Postagens: Apenas `thumbnail.webp` (correto se não houver mais imagens)
- ✅ KV's: Apenas `thumbnail.webp` (correto se não houver mais imagens)
- **Observação:** Se houver outras imagens, precisam ser numeradas como `01.webp`, `02.webp`, etc.

---

## 📝 Plano de Ação Detalhado

### Fase 1: Análise e Mapeamento

- [ ] Listar todos os arquivos em cada pasta
- [ ] Identificar ordem lógica para numerar as imagens
- [ ] Verificar discrepâncias entre slugs e nomes de pastas
- [ ] Criar mapeamento completo de renomeação

### Fase 2: Renomeação - Branding SVGs

- [ ] Renomear todos os SVGs para `thumbnail.svg`:
  - `rick.svg` → `thumbnail.svg`
  - `netexperts.svg` → `thumbnail.svg`
  - `fernanda-s.svg` → `thumbnail.svg`
  - `lotus.svg` → `thumbnail.svg`
  - `2medcenter-logo.svg` → `thumbnail.svg`
  - `2campotech.svg` → `thumbnail.svg`
  - `movbee.svg` → `thumbnail.svg`
  - `2ouro-western.svg` → `thumbnail.svg`
  - `vinca.svg` → `thumbnail.svg`

### Fase 3: Renomeação - Imagens Branding

- [ ] **Rick:** Renomear 8 imagens para `01.webp` a `08.webp`
- [ ] **NetExperts:** Renomear `1.webp-8.webp` para `01.webp-08.webp`
- [ ] **Fernanda:** Renomear imagens para `01.webp-08.webp`
- [ ] **Lotus:** Renomear imagens para `01.webp-08.webp`
- [ ] **MedCenter:** Remover duplicatas PNG, renomear WEBPs para `01.webp-08.webp`
- [ ] **Campotech:** Renomear imagens para `01.webp-08.webp`
- [ ] **Ouro Western:** Renomear imagens para `01.webp-08.webp`
- [ ] **Vinca:** Renomear imagens para `01.webp-08.webp`

### Fase 4: Verificar Campanhas

- [ ] Listar todas as imagens em `campanhas/postagens/`
- [ ] Listar todas as imagens em `campanhas/kvs/`
- [ ] Renomear para `01.webp`, `02.webp`, etc. se houver

### Fase 5: Verificar Websites

- [ ] Verificar se falta pasta `rick-website/`
- [ ] Confirmar que todos têm `thumbnail.webp`

### Fase 6: Atualizar Código

- [ ] Atualizar `lib/projects-data.ts` para usar `thumbnail.svg` para branding
- [ ] Corrigir caminhos de thumbnails
- [ ] Atualizar função `getProjectImages` para suportar SVG em branding
- [ ] Verificar se `ouro-texas` ou `ouro-western` está correto

### Fase 7: Testar

- [ ] Testar carregamento de thumbnails
- [ ] Testar galeria de imagens
- [ ] Verificar que todas as imagens aparecem corretamente

---

## ⚠️ Decisões Necessárias

1. **Pasta Ouro Western:** Pasta é `ouro-texas/` mas slug é `ouro-western`. O que está correto?

   - Opção A: Renomear pasta para `ouro-western/`
   - Opção B: Mudar slug no código para `ouro-texas`

2. **Ordem das Imagens:** Como definir a ordem de numeração?

   - Por ordem alfabética do nome atual?
   - Por ordem de importância visual?
   - Manter ordem atual dos arquivos?

3. **Projeto Rick Website:** Não existe pasta. Precisa criar?

4. **Duplicatas PNG/WEBP:** Remover os PNGs e manter apenas WEBP?

---

## 🚀 Próximos Passos

1. **Aguardar validação deste plano**
2. **Resolver as questões acima**
3. **Executar renomeação em batch**
4. **Atualizar código**
5. **Testar**

---

**Status:** ⏳ Aguardando validação e respostas às questões
