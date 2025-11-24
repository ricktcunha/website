# 📋 Mapeamento Completo de Renomeação

## 🎯 Padrão Final Esperado

### **BRANDING:**

```
branding/
  [slug-projeto]/
    thumbnail.svg     ← Logo SVG padronizado
    01.webp          ← Imagens numeradas
    02.webp
    ...
    08.webp
```

### **WEBSITES:**

```
websites/
  [slug-projeto]/
    thumbnail.webp   ← Apenas thumbnail
```

### **CAMPANHAS:**

```
campanhas/
  postagens/
    thumbnail.webp   ← Thumbnail
    01.webp         ← Imagens numeradas (se houver)
    02.webp
    ...
  kvs/
    thumbnail.webp   ← Thumbnail
    01.webp         ← Imagens numeradas (se houver)
    02.webp
    ...
```

---

## 📝 Mapeamento Detalhado por Projeto

### **BRANDING**

#### 1. Rick → rick-brand

- **Pasta atual:** `branding/rick/`
- **Pasta desejada:** `branding/rick-brand/`
- **Slug:** `rick-brand`
- **SVG:** `rick.svg` → `thumbnail.svg`
- **Imagens:** Renomear para `01.webp` a `08.webp`

#### 2. NetExperts → netexperts

- **Pasta:** `branding/netexperts/` ✅
- **Slug:** `netexperts` ✅
- **SVG:** `netexperts.svg` → `thumbnail.svg`
- **Imagens:** `1.webp` → `01.webp`, `2.webp` → `02.webp`, etc.

#### 3. Fernanda S. → fernanda-s

- **Pasta:** `branding/fernanda/` → `branding/fernanda-s/`
- **Slug:** `fernanda-s`
- **SVG:** `fernanda-s.svg` → `thumbnail.svg`
- **Imagens:** Renomear para `01.webp` a `08.webp`

#### 4. MedCenter → medcenter

- **Pasta:** `branding/medcenter/` ✅
- **Slug:** `medcenter` ✅
- **SVG:** `2medcenter-logo.svg` → `thumbnail.svg`
- **Imagens:** Remover PNGs duplicados, renomear WEBPs para `01.webp` a `08.webp`

#### 5. Vinca → vinca

- **Pasta:** `branding/vinca/` ✅
- **Slug:** `vinca` ✅
- **SVG:** `vinca.svg` → `thumbnail.svg`
- **Imagens:** Renomear para `01.webp` a `08.webp`

#### 6. Lotus → lotus

- **Pasta:** `branding/lotus/` ✅
- **Slug:** `lotus` ✅
- **SVG:** `lotus.svg` → `thumbnail.svg`
- **Imagens:** Renomear para `01.webp` a `08.webp`

#### 7. Campotech → campotech

- **Pasta:** `branding/campotech/` ✅
- **Slug:** `campotech` ✅
- **SVG:** `2campotech.svg` → `thumbnail.svg`
- **Imagens:** Renomear para `01.webp` a `08.webp`

#### 8. Ouro Western → ouro-western

- **Pasta atual:** `branding/ouro-texas/`
- **Pasta desejada:** `branding/ouro-western/`
- **Slug:** `ouro-western`
- **SVG:** `2ouro-western.svg` → `thumbnail.svg`
- **Imagens:** Renomear para `01.webp` a `08.webp`

#### 9. MovBee → movbee-brand

- **Pasta atual:** `branding/movbee/`
- **Pasta desejada:** `branding/movbee-brand/`
- **Slug:** `movbee-brand`
- **SVG:** `movbee.svg` → `thumbnail.svg`
- **Imagens:** Apenas SVG (sem galeria ainda)

### **WEBSITES**

#### 1. Adubos Real → adubos-real

- **Pasta atual:** `websites/adubos real/` (com espaço)
- **Pasta desejada:** `websites/adubos-real/` (com hífen)
- **Slug:** `adubos-real`
- **Thumbnail:** `thumbnail.webp` ✅ (já está correto)

#### 2. Mandu Cultural → mandu-cultural

- **Pasta:** `websites/mandu-cultural/` ✅
- **Slug:** `mandu-cultural` ✅
- **Thumbnail:** `thumbnail.webp` ✅

#### 3. MovBee Website → movbee-website

- **Pasta atual:** `websites/movbee/`
- **Pasta desejada:** `websites/movbee-website/`
- **Slug:** `movbee-website`
- **Thumbnail:** `thumbnail.webp` ✅

#### 4. Rick Website → rick-website

- **Pasta:** **NÃO EXISTE** - Precisa criar
- **Slug:** `rick-website`
- **Ação:** Criar pasta `websites/rick-website/` e adicionar `thumbnail.webp`

### **CAMPANHAS**

#### Postagens

- **Pasta:** `campanhas/postagens/` ✅
- **Thumbnail:** `thumbnail.webp` ✅
- **Imagens:** Verificar se há outras imagens para numerar

#### KV's

- **Pasta:** `campanhas/kvs/` ✅
- **Thumbnail:** `thumbnail.webp` ✅
- **Imagens:** Verificar se há outras imagens para numerar

---

## ✅ Checklist de Execução

### Fase 1: Renomear Pastas (Alinhar com slugs)

- [ ] `rick/` → `rick-brand/`
- [ ] `fernanda/` → `fernanda-s/`
- [ ] `ouro-texas/` → `ouro-western/`
- [ ] `movbee/` (branding) → `movbee-brand/`
- [ ] `adubos real/` → `adubos-real/` (websites)
- [ ] `movbee/` (websites) → `movbee-website/`
- [ ] Criar pasta `rick-website/`

### Fase 2: Renomear SVGs (Branding)

- [ ] Todos os SVGs → `thumbnail.svg`

### Fase 3: Renomear Imagens (Branding)

- [ ] Numerar todas as imagens como `01.webp`, `02.webp`, etc.
- [ ] Remover duplicatas PNG (manter apenas WEBP)

### Fase 4: Atualizar Código

- [ ] Atualizar caminhos de thumbnails em `lib/projects-data.ts`
- [ ] Atualizar função para suportar `.svg` em branding
- [ ] Testar carregamento

---

**Status:** ⏳ Aguardando validação
