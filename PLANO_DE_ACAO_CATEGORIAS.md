# 📋 Plano de Ação: Reorganização de Categorias de Trabalhos

## 🎯 Objetivos

1. Adicionar novas categorias de trabalhos (Campanhas → Postagens e KV's)
2. Criar sistema de pastas para organizar imagens WebP
3. Implementar leitura automática de imagens das pastas
4. Atualizar filtros e exibição na página inicial e seção "Trabalhos"
5. Configurar seleção específica de trabalhos na página inicial (2 Branding, 2 Websites, 1 Postagens, 1 KV's)

---

## ⚠️ PONTOS IMPORTANTES (Baseado nas Observações)

### Estrutura Diferenciada:

**Branding:**

- ✅ Cada projeto tem sua própria subpasta
- ✅ Thumbnail: `thumbnail.webp` dentro da subpasta
- ✅ Galeria: ~8 fotos numeradas (`01.webp`, `02.webp`, etc.) para galeria interna do projeto

**Websites:**

- ✅ Cada projeto tem sua própria subpasta
- ✅ Thumbnail: `thumbnail.webp` dentro da subpasta
- ✅ **NÃO tem galeria** - apenas a foto do thumbnail (que serve como preview e leva para o projeto real)

**Campanhas (Postagens e KV's):**

- ✅ **NÃO há subpastas** - todas as fotos ficam juntas na pasta da categoria (duas pastas separadas: uma para KV's e uma para Postagens)
- ✅ Apenas 2 projetos no total (um "Postagens", um "KV's")
- ✅ Thumbnail: `thumbnail.webp` (contexto determinado pela pasta: `campanhas/postagens/` ou `campanhas/kvs/`)
- ✅ Galeria mostra todas as fotos da pasta da categoria:
  - **Postagens**: ~40 fotos + 1 thumbnail
  - **KV's**: ~20 fotos + 1 thumbnail

### Nomenclatura Padronizada:

- **Branding/Websites:** `/branding/[slug-projeto]/thumbnail.webp` ou `/websites/[slug-projeto]/thumbnail.webp`
- **Campanhas:** `/campanhas/postagens/thumbnail.webp` ou `/campanhas/kvs/thumbnail.webp`

---

## 📂 Estrutura de Categorias Proposta

### Categorias Principais:

1. **WEBSITES** (categoria existente: "Desenvolvedor Front-End")
2. **BRANDING** (categoria existente: "Design de Marcas")
3. **CAMPANHAS** (nova categoria com subcategorias):
   - **POSTAGENS** (subcategoria)
   - **KV'S** (subcategoria)

---

## 📁 Estrutura de Pastas para Imagens

**IMPORTANTE:** A estrutura difere entre categorias:

### Branding e Websites (com subpastas por projeto):

```
public/
  images/
    trabalhos/
      branding/
        [slug-do-projeto]/
          thumbnail.webp        ← Thumbnail do card
          01.webp               ← Galeria interna (~8 fotos)
          02.webp
          03.webp
          ...
          08.webp
      websites/
        [slug-do-projeto]/
          thumbnail.webp        ← ÚNICA foto (não tem galeria)
                                   Esta foto aparece no card e leva ao site real
```

### Campanhas (SEM subpastas - todas as fotos juntas):

```
public/
  images/
    trabalhos/
      campanhas/
        postagens/
          thumbnail.webp  ← Thumbnail para o card
          01.webp                   ← Galeria: ~40 fotos de postagens
          02.webp
          03.webp
          ...
          40.webp
        kvs/
          thumbnail.webp        ← Thumbnail para o card
          01.webp                   ← Galeria: ~20 fotos de KV's
          02.webp
          03.webp
          ...
          20.webp
```

**Exemplo Completo:**

```
public/
  images/
    trabalhos/
      branding/
        rick-brand/
          thumbnail.webp        ← Card do projeto
          01.webp               ← Galeria interna (~8 fotos)
          02.webp
          ...
          08.webp
        netexperts/
          thumbnail.webp
          01.webp
          ...
          08.webp
      websites/
        rick-website/
          thumbnail.webp        ← ÚNICA foto (leva ao site real)
        adubos-real/
          thumbnail.webp        ← ÚNICA foto (leva ao site real)
      campanhas/
        postagens/
          thumbnail.webp  ← Card mostra esta foto
          01.webp                   ← Galeria: ~40 fotos de postagens
          02.webp
          03.webp
          ...
          40.webp
        kvs/
          thumbnail.webp        ← Card mostra esta foto
          01.webp                   ← Galeria: ~20 fotos de KV's
          02.webp
          03.webp
          ...
          20.webp
```

---

## 🔄 Mudanças Necessárias

### 1. **Atualizar Interface `Project` em `lib/projects-data.ts`**

**Mudanças:**

- Atualizar `category` para incluir: `"Desenvolvedor Front-End" | "Design de Marcas" | "Campanhas - Postagens" | "Campanhas - KV's"`
- Adicionar campo `subcategory` opcional para identificar se é Postagens ou KV's
- Manter campo `images` para todos os tipos (será populado automaticamente)

**Nova estrutura:**

```typescript
export interface Project {
  id: string;
  title: string;
  category:
    | "Desenvolvedor Front-End"
    | "Design de Marcas"
    | "Campanhas - Postagens"
    | "Campanhas - KV's";
  slug: string;
  thumbnail: string; // Caminho relativo para thumbnail
  featured: boolean;
  featuredInHome?: boolean; // Novo campo para trabalhos exibidos na home
  description: string;
  year: string;
  tags: string[];
  images?: string[]; // Será preenchido automaticamente pela função
  siteUrl?: string; // Apenas para Websites
  siteImage?: string; // Apenas para Websites
}
```

### 2. **Criar Função de Leitura Automática de Imagens**

**Novo arquivo: `lib/project-images.ts`**

Função que:

- Lê as imagens WebP das pastas automaticamente
- Retorna array de caminhos para cada projeto
- Detecta automaticamente se o projeto tem imagens na pasta
- Suporta diferentes estruturas:
  - **Branding**: Lê imagens de subpastas por projeto (`branding/[slug-projeto]/`) - retorna ~8 fotos
  - **Websites**: NÃO lê galeria (apenas usa o thumbnail)
  - **Campanhas (Postagens e KV's)**: Lê todas as imagens da pasta da categoria (sem subpastas)

**Estrutura da função:**

```typescript
// Função que retorna as imagens de um projeto baseado no slug e categoria
export function getProjectImages(
  slug: string,
  category: Project["category"]
): string[] {
  // Se for Branding: ler de /images/trabalhos/branding/[slug]/
  //   - Retornar array ordenado (01.webp, 02.webp, ... até ~08.webp)
  //   - Excluir thumbnail.webp da lista
  //
  // Se for Website: retornar array vazio [] (não tem galeria)
  //
  // Se for Campanhas: chamar getCampanhaImages()
  // Retornar array de caminhos ordenados
}

// Função específica para campanhas (retorna todas as imagens da pasta)
export function getCampanhaImages(type: "postagens" | "kvs"): string[] {
  // Ler todas as imagens de /images/trabalhos/campanhas/[type]/
  // Excluir o thumbnail da lista (thumbnail.webp)
  // Retornar array ordenado (01.webp, 02.webp, ... até ~40.webp para postagens ou ~20.webp para kvs)
}
```

### 3. **Atualizar `lib/projects-data.ts`**

**Mudanças:**

- Atualizar tipos de `category`
- Adicionar projetos de Campanhas (Postagens e KV's)
  - **IMPORTANTE**: Para Campanhas, criar APENAS 2 projetos:
    - 1 projeto "Postagens" (representa toda a categoria)
    - 1 projeto "KV's" (representa toda a categoria)
- Adicionar campo `featuredInHome` para selecionar trabalhos da home
- Integrar função de leitura automática de imagens
- Atualizar lógica de thumbnail:
  - **Branding/Websites**: `thumbnail: "/images/trabalhos/[categoria]/[slug]/thumbnail.webp"`
  - **Campanhas**: `thumbnail: "/images/trabalhos/campanhas/postagens/thumbnail.webp"` ou `/images/trabalhos/campanhas/kvs/thumbnail.webp`

**Estrutura de projetos para Campanhas:**

```typescript
// Apenas 2 projetos para Campanhas:
{
  id: "campanhas-postagens",
  title: "Postagens",
  category: "Campanhas - Postagens",
  slug: "postagens",
  thumbnail: "/images/trabalhos/campanhas/postagens/thumbnail.webp",
  featured: true,
  featuredInHome: true,
  description: "Coleção de postagens para redes sociais...",
  year: "2024",
  tags: ["Social Media", "Design Gráfico"],
  // images será preenchido automaticamente lendo todas as fotos da pasta
},
{
  id: "campanhas-kvs",
  title: "Key Visuals",
  category: "Campanhas - KV's",
  slug: "kvs",
  thumbnail: "/images/trabalhos/campanhas/kvs/thumbnail.webp",
  featured: true,
  featuredInHome: true,
  description: "Coleção de key visuals para campanhas...",
  year: "2024",
  tags: ["Design Gráfico", "Marketing"],
  // images será preenchido automaticamente lendo todas as fotos da pasta
}
```

**Lógica de seleção para página inicial:**

- Buscar 2 projetos de Branding com `featuredInHome: true`
- Buscar 2 projetos de Websites com `featuredInHome: true`
- Buscar 1 projeto de Postagens com `featuredInHome: true` (apenas um projeto "Postagens")
- Buscar 1 projeto de KV's com `featuredInHome: true` (apenas um projeto "KV's")
- Total: 6 trabalhos

### 4. **Atualizar Filtros na Página Inicial (`components/sections/portfolio.tsx`)**

**Mudanças:**

- Atualizar `tabs` para incluir: "TODOS OS TRABALHOS", "WEBSITES", "BRANDING", "CAMPANHAS"
- Criar função `getHomePageProjects()` que retorna os 6 trabalhos específicos
- Atualizar lógica de filtro para incluir Campanhas

**Nova estrutura de tabs:**

```typescript
const tabs = [
  { id: "all", label: "TODOS OS TRABALHOS" },
  { id: "websites", label: "WEBSITES" },
  { id: "branding", label: "BRANDING" },
  { id: "campanhas", label: "CAMPANHAS" },
];
```

### 5. **Atualizar Filtros na Página Trabalhos (`app/trabalhos/page.tsx`)**

**Mudanças:**

- Atualizar `tabs` para incluir Campanhas
- Adicionar filtros para Postagens e KV's dentro de Campanhas
- Atualizar lógica de filtro

**Opções:**

- **Opção A:** Manter filtros simples: "TODOS", "WEBSITES", "BRANDING", "CAMPANHAS" (Siga Essa Opção)

**Recomendação:** Opção A (mais simples), mas criar função que filtra corretamente Postagens e KV's dentro de "CAMPANHAS"

### 6. **Atualizar `ProjectCard` (`components/ui/project-card.tsx`)**

**Mudanças:**

- Atualizar `categoryLabel` para incluir "POSTAGENS" e "KV'S"
- Garantir que as labels apareçam corretamente nos cards

### 7. **Criar Estrutura de Pastas**

**Ações:**

- Criar todas as pastas necessárias em `public/images/trabalhos/`
- Criar estrutura para:
  - **`branding/`**:
    - Criar subpastas para cada marca/projeto (ex: `rick-brand/`, `netexperts/`, etc.)
    - Cada subpasta terá:
      - `thumbnail.webp` (foto principal que aparece no card do projeto)
      - `01.webp`, `02.webp`, `03.webp`, ... até ~8 fotos (galeria interna do projeto)
  - **`websites/`**:
    - Criar subpastas para cada site/projeto (ex: `rick-website/`, `adubos-real/`, etc.)
    - Cada subpasta terá:
      - `thumbnail.webp` (foto principal que aparece no card do projeto)
      - **IMPORTANTE:** Websites NÃO têm galeria - apenas esta foto thumbnail que leva ao site real
  - **`campanhas/postagens/`**:
    - **IMPORTANTE**: NÃO há subpastas por projeto aqui - todas as fotos ficam na mesma pasta
    - `thumbnail.webp` (foto única que representa toda a categoria de Postagens no card)
    - `01.webp`, `02.webp`, `03.webp`, ... até ~40.webp (todas as fotos de postagens juntas - galeria)
  - **`campanhas/kvs/`**:
    - **IMPORTANTE**: NÃO há subpastas por projeto aqui - todas as fotos ficam na mesma pasta
    - `thumbnail.webp` (foto única que representa toda a categoria de KV's no card)
    - `01.webp`, `02.webp`, `03.webp`, ... até ~20.webp (todas as fotos de KV's juntas - galeria)
- Adicionar arquivo `.gitkeep` em cada pasta para garantir que sejam versionadas

**Estrutura Final Corrigida:**

```
public/
  images/
    trabalhos/
      branding/
        rick-brand/
          thumbnail.webp
          01.webp
          02.webp
          ...
          08.webp
        netexperts/
          thumbnail.webp
          01.webp
          ...
      websites/
        rick-website/
          thumbnail.webp
        adubos-real/
          thumbnail.webp
      campanhas/
        postagens/
          thumbnail.webp  ← Thumbnail para toda categoria de Postagens
          01.webp
          02.webp
          ... (todas as fotos de postagens juntas)
        kvs/
          thumbnail.webp  ← Thumbnail para toda categoria de KV's
          01.webp
          02.webp
          ... (todas as fotos de KV's juntas)
```

---

## 🎨 Página Inicial - Lógica de Seleção

### Função `getHomePageProjects()`

```typescript
export function getHomePageProjects(): Project[] {
  const branding = projects
    .filter((p) => p.category === "Design de Marcas" && p.featuredInHome)
    .slice(0, 2);

  const websites = projects
    .filter((p) => p.category === "Desenvolvedor Front-End" && p.featuredInHome)
    .slice(0, 2);

  const postagens = projects
    .filter((p) => p.category === "Campanhas - Postagens" && p.featuredInHome)
    .slice(0, 1);

  const kvs = projects
    .filter((p) => p.category === "Campanhas - KV's" && p.featuredInHome)
    .slice(0, 1);

  return [...branding, ...websites, ...postagens, ...kvs].slice(0, 6);
}
```

---

## 📝 Checklist de Implementação

### Fase 1: Estrutura Base

- [ ] Criar estrutura de pastas em `public/images/trabalhos/`
- [ ] Criar arquivo `.gitkeep` em cada pasta
- [ ] Atualizar interface `Project` em `lib/projects-data.ts`
- [ ] Criar função de leitura de imagens em `lib/project-images.ts`

### Fase 2: Dados e Categorias

- [ ] Atualizar tipos de `category` em `lib/projects-data.ts`
- [ ] Adicionar campo `featuredInHome` aos projetos
- [ ] Migrar projetos existentes para nova estrutura
- [ ] Adicionar projetos de Campanhas (Postagens e KV's) como exemplos

### Fase 3: Página Inicial

- [ ] Criar função `getHomePageProjects()` em `lib/projects-data.ts`
- [ ] Atualizar `components/sections/portfolio.tsx` para usar nova função
- [ ] Atualizar tabs para incluir "CAMPANHAS"
- [ ] Testar exibição dos 6 trabalhos corretos (2+2+1+1)

### Fase 4: Página Trabalhos

- [ ] Atualizar `app/trabalhos/page.tsx` com novos filtros
- [ ] Adicionar tab "CAMPANHAS"
- [ ] Atualizar lógica de filtro para incluir Postagens e KV's
- [ ] Testar filtros funcionando corretamente

### Fase 5: Componentes

- [ ] Atualizar `ProjectCard` para exibir labels corretas
- [ ] Garantir que imagens sejam carregadas automaticamente
- [ ] Testar cards em todas as páginas

### Fase 6: Documentação e Testes

- [ ] Documentar estrutura de pastas para você
- [ ] Criar exemplo de como adicionar novos trabalhos
- [ ] Testar em mobile e desktop
- [ ] Verificar performance de carregamento de imagens

---

## 📖 Como Adicionar Novos Trabalhos (Após Implementação)

### Para Branding e Websites:

1. **Criar pasta do projeto:**

   ```
   public/images/trabalhos/[categoria]/[slug-do-projeto]/
   ```

   Exemplo: `public/images/trabalhos/branding/nova-marca/`

2. **Adicionar imagens na pasta:**

   - Para **Branding:**
     - `thumbnail.webp` (obrigatório - aparece no card)
     - `01.webp`, `02.webp`, `03.webp`, ... até ~8 fotos (galeria interna)
   - Para **Websites:**
     - `thumbnail.webp` (obrigatório - única foto, aparece no card e leva ao site real)
     - **NÃO precisa de galeria**

3. **Adicionar projeto em `lib/projects-data.ts`:**
   ```typescript
   {
     id: "novo-id",
     title: "Nova Marca",
     category: "Design de Marcas", // ou "Desenvolvedor Front-End"
     slug: "nova-marca",
     thumbnail: "/images/trabalhos/branding/nova-marca/thumbnail.webp",
     featured: true,
     featuredInHome: true, // Se deve aparecer na home
     description: "Descrição...",
     year: "2025",
     tags: ["Tag1", "Tag2"],
     // images será preenchido automaticamente pela função
   }
   ```

### Para Campanhas (Postagens ou KV's):

**IMPORTANTE:** Campanhas já têm projetos criados. Se quiser adicionar mais fotos:

1. **Adicionar fotos diretamente na pasta da categoria:**

   ```
   public/images/trabalhos/campanhas/postagens/
   ```

   - Simplesmente adicione: `03.webp`, `04.webp`, etc.
   - As imagens serão lidas automaticamente

2. **Para criar novo projeto de campanha** (raramente necessário):
   - Adicionar projeto em `lib/projects-data.ts` similar aos existentes
   - O thumbnail deve apontar para: `/images/trabalhos/campanhas/[postagens|kvs]/thumbnail.webp`

---

## ✅ Observações Validadas e Correções Aplicadas

1. ✅ **Estrutura de Pastas para Branding:** Subpastas criadas para cada projeto com thumbnail + ~8 fotos para galeria
2. ✅ **Estrutura de Pastas para Websites:** Subpastas criadas para cada projeto com APENAS thumbnail (não tem galeria - foto leva ao site real)
3. ✅ **Estrutura de Pastas para Campanhas:** Sem subpastas - todas as fotos juntas na pasta da categoria
4. ✅ **Nomenclatura de Thumbnails (PADRONIZADA):**
   - **Todos os thumbnails:** `thumbnail.webp`
   - **Branding/Websites:** `thumbnail.webp` dentro da subpasta do projeto (ex: `branding/[slug]/thumbnail.webp`)
   - **Campanhas:** `thumbnail.webp` dentro da pasta da categoria (ex: `campanhas/postagens/thumbnail.webp` ou `campanhas/kvs/thumbnail.webp`)
   - O contexto é determinado automaticamente pela pasta onde está inserido
5. ✅ **Filtros:** Opção A confirmada (filtros simples)
6. ✅ **Projetos de Campanhas:** Apenas 2 projetos (um para Postagens, um para KV's)
7. ✅ **Quantidade de Fotos:**
   - Branding: ~8 fotos por projeto (galeria interna)
   - Websites: 0 fotos (apenas thumbnail - não tem galeria)
   - Postagens: ~40 fotos + 1 thumbnail
   - KV's: ~20 fotos + 1 thumbnail

## ❓ Questões Restantes para Validação

1. **Leitura de Imagens:** Quer que as imagens sejam lidas automaticamente em build-time ou runtime?

   - **Build-time:** Mais rápido, mas requer rebuild ao adicionar fotos
   - **Runtime:** Mais flexível, mas pode ser mais lento
   - **Recomendação:** Build-time (melhor performance)

2. **Ordem de Exibição na Home:** Como ordenar os 6 trabalhos na home?

   - Por data (mais recente primeiro)?
   - Por categoria (2 branding, 2 websites, 1 postagens, 1 kvs)?
   - Aleatório?
   - **Recomendação:** Por categoria (ordem fixa: branding, websites, postagens, kvs)

3. ✅ **Número de fotos por projeto Branding:** Confirmado - ~8 fotos por projeto (pode variar, mas média é 8)

4. ✅ **Thumbnail para Websites:** Confirmado - Websites NÃO têm galeria, apenas thumbnail (que serve como preview e leva ao site real)

5. ✅ **Número de fotos em Campanhas:**
   - Postagens: ~40 fotos + 1 thumbnail
   - KV's: ~20 fotos + 1 thumbnail

---

## 🚀 Próximos Passos

1. **Validar este plano com você**
2. **Implementar Fase 1 e 2** (estrutura base e dados)
3. **Criar sistema de leitura de imagens**
4. **Atualizar componentes** (Fase 3, 4, 5)
5. **Testar e ajustar** (Fase 6)

---

**Status:** ⏳ Aguardando validação
