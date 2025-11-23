# Logo 3D + Hero Banner Glassmorphism

Implementação profissional e performática de um logo 3D usando Three.js e um hero banner com glassmorphism, totalmente integrado ao design system do site.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Instalação](#instalação)
- [Componentes](#componentes)
- [Design Tokens](#design-tokens)
- [Uso](#uso)
- [Customização](#customização)
- [Performance](#performance)
- [Acessibilidade](#acessibilidade)
- [Checklist de Deploy](#checklist-de-deploy)

## 🎯 Visão Geral

Esta implementação transforma o logo SVG em um objeto 3D realista com materiais transmissores, bloom/glow effects e interatividade. O hero banner utiliza glassmorphism moderno com shapes animadas e efeitos de parallax.

### Características

- ✅ Logo 3D extrudado do SVG original
- ✅ Material transmissores com reflexos realistas
- ✅ Bloom/Glow effects configuráveis
- ✅ Interatividade (rotação automática, drag, hover, parallax)
- ✅ Hero banner com glassmorphism
- ✅ Shapes/partículas animadas no background
- ✅ Suporte a dark/light mode
- ✅ Fallback para mobile/baixa performance
- ✅ Respeita `prefers-reduced-motion`
- ✅ 100% integrado aos tokens do design system

## 📦 Instalação

### Dependências

```bash
npm install three @react-three/fiber @react-three/drei
```

### Arquivos Necessários

1. **Componente Logo 3D**: `components/ui/logo-3d.tsx`
2. **Componente Hero Glass**: `components/ui/hero-glass.tsx`
3. **CSS Variables**: Já adicionadas em `app/globals.css`
4. **SVG do Logo**: Já definido inline no componente (ou pode usar arquivo externo)

## 🧩 Componentes

### `<Logo3D />`

Componente React que renderiza o logo em 3D usando React Three Fiber.

#### Props

```typescript
interface Logo3DProps {
  /** Profundidade da extrusão do logo (padrão: 1.5) */
  depth?: number;
  /** Transmissão do material (0-1, padrão: 0.9) */
  transmission?: number;
  /** Rugosidade do material (0-1, padrão: 0.1) */
  roughness?: number;
  /** Intensidade do bloom/glow (padrão: 0.6) */
  bloomIntensity?: number;
  /** Tint do envMap usando cor primária do site (padrão: true) */
  usePrimaryTint?: boolean;
  /** Habilita rotação automática (padrão: true) */
  autoRotate?: boolean;
  /** Velocidade de rotação (padrão: 0.5) */
  rotationSpeed?: number;
  /** Habilita interação com mouse (padrão: true) */
  interactive?: boolean;
  /** Preset visual: 'brand', 'soft', 'high-contrast' (padrão: 'brand') */
  preset?: "brand" | "soft" | "high-contrast";
  /** Habilita fallback para PNG em dispositivos móveis ou baixa performance */
  fallbackOnMobile?: boolean;
  /** URL do SVG do logo (padrão: usa o SVG inline) */
  logoSvg?: string;
  /** URL da imagem PNG de fallback */
  fallbackImage?: string;
  /** Tamanho do logo (padrão: 'auto') */
  size?: "small" | "medium" | "large" | "auto";
}
```

#### Exemplo de Uso

```tsx
import { Logo3D } from "@/components/ui/logo-3d";

// Uso básico
<Logo3D />

// Com customizações
<Logo3D
  depth={2}
  transmission={0.95}
  preset="soft"
  autoRotate={true}
  rotationSpeed={0.3}
  size="large"
/>
```

### `<HeroGlass />`

Componente React que renderiza um hero banner completo com glassmorphism.

#### Props

```typescript
interface HeroGlassProps {
  /** Título principal do hero */
  title?: string;
  /** Subtítulo do hero */
  subtitle?: string;
  /** Descrição do hero */
  description?: string;
  /** Badge de status */
  badge?: string;
  /** Texto do botão CTA principal */
  ctaPrimary?: string;
  /** Texto do botão CTA secundário */
  ctaSecondary?: string;
  /** Callback quando clicar no botão principal */
  onCtaPrimaryClick?: () => void;
  /** Callback quando clicar no botão secundário */
  onCtaSecondaryClick?: () => void;
  /** Habilita o logo 3D (padrão: true) */
  showLogo3D?: boolean;
  /** Props adicionais para o Logo3D */
  logo3DProps?: React.ComponentProps<typeof Logo3D>;
  /** Classe CSS adicional */
  className?: string;
  /** Habilita shapes/partículas animadas (padrão: true) */
  showAnimatedShapes?: boolean;
  /** Habilita noise overlay (padrão: true) */
  showNoiseOverlay?: boolean;
}
```

#### Exemplo de Uso

```tsx
import { HeroGlass } from "@/components/ui/hero-glass";

<HeroGlass
  title="Alquimista Digital"
  description="Transformando ideias complexas em interfaces fluidas."
  badge="Disponível para novos projetos"
  ctaPrimary="Iniciar Projeto"
  ctaSecondary="Ver Portfólio"
  onCtaPrimaryClick={() => window.open("https://wa.me/...")}
  onCtaSecondaryClick={() => window.location.href = "#portfolio"}
  showLogo3D={true}
  logo3DProps={{
    depth: 1.5,
    preset: "brand",
    autoRotate: true,
  }}
/>
```

## 🎨 Design Tokens

Todos os tokens são definidos como CSS variables em `app/globals.css`:

### Cores

```css
/* Dark Mode */
--color-primary: hsl(265, 89%, 78%); /* Lilac/Purple */
--color-primary-rgb: 193, 153, 255;
--color-accent: hsl(265, 89%, 78%);
--color-accent-rgb: 193, 153, 255;
--color-accent-light: hsl(265, 89%, 85%);

/* Light Mode */
--color-primary: hsl(267, 85%, 58%); /* Purple */
--color-primary-rgb: 139, 92, 246;
```

### Glassmorphism

```css
--glass-bg: rgba(255, 255, 255, 0.05);
--glass-border: rgba(255, 255, 255, 0.1);
--glass-blur: 18px;
```

### Bloom/Glow

```css
--bloom-strength: 0.6;
--bloom-threshold: 0.85;
```

### Motion

```css
--motion-amplitude: 0.6;
```

### Espaçamentos

```css
--space-xx: 8px;
--space-md: 16px;
--space-lg: 24px;
--radius-lg: 18px;
```

## 🔧 Uso

### Integração no Hero Atual

Substitua o componente `Hero` atual por `HeroGlass`:

```tsx
// app/page.tsx ou components/sections/hero.tsx
import { HeroGlass } from "@/components/ui/hero-glass";

export default function Home() {
  return (
    <>
      <HeroGlass
        title="Alquimista Digital"
        description="Transformando ideias complexas em interfaces fluidas e experiências digitais imersivas."
        badge="Disponível para novos projetos"
        ctaPrimary="Iniciar Projeto"
        ctaSecondary="Ver Portfólio"
        onCtaPrimaryClick={() => {
          const phoneNumber = "5535997657991";
          const message = encodeURIComponent("Olá! Gostaria de conversar sobre um projeto.");
          window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
        }}
        onCtaSecondaryClick={() => {
          window.location.href = "#portfolio";
        }}
        showLogo3D={true}
        logo3DProps={{
          depth: 1.5,
          transmission: 0.9,
          roughness: 0.1,
          preset: "brand",
          autoRotate: true,
          rotationSpeed: 0.5,
        }}
      />
      {/* ... outros componentes ... */}
    </>
  );
}
```

### Uso Standalone do Logo3D

```tsx
import { Logo3D } from "@/components/ui/logo-3d";

export function MyComponent() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Logo3D
        size="large"
        preset="soft"
        interactive={true}
      />
    </div>
  );
}
```

## 🎛️ Customização

### Ajustar Profundidade/Extrusão

```tsx
<Logo3D depth={2} /> {/* Mais profundo */}
<Logo3D depth={1} /> {/* Mais plano */}
```

### Trocar o SVG do Logo

Edite o array `LOGO_SVG_PATHS` em `components/ui/logo-3d.tsx` ou passe `logoSvg` como prop:

```tsx
<Logo3D logoSvg="/path/to/your/logo.svg" />
```

### Ajustar Materiais

```tsx
<Logo3D
  transmission={0.95}  // Mais transparente
  roughness={0.05}      // Mais brilhante
  bloomIntensity={0.8}  // Mais glow
/>
```

### Usar Presets Diferentes

```tsx
<Logo3D preset="soft" />         // Mais suave
<Logo3D preset="high-contrast" /> // Mais contraste
<Logo3D preset="brand" />        // Padrão (brand)
```

### Trocar o Environment Map

No componente `Logo3D`, altere a linha:

```tsx
<Environment preset="sunset" />
```

Para outros presets disponíveis:
- `"sunset"` (padrão)
- `"dawn"`
- `"night"`
- `"warehouse"`
- `"forest"`
- `"apartment"`
- `"studio"`
- `"city"`
- `"park"`
- `"lobby"`

Ou use um HDRI customizado:

```tsx
<Environment files="/path/to/your.hdr" />
```

### Ajustar Glassmorphism

No `app/globals.css`, modifique:

```css
--glass-bg: rgba(255, 255, 255, 0.05);     /* Mais/menos opaco */
--glass-border: rgba(255, 255, 255, 0.1);  /* Borda mais/menos visível */
--glass-blur: 18px;                         /* Mais/menos blur */
```

## ⚡ Performance

### Otimizações Implementadas

1. **Lazy Loading**: Three.js carrega apenas quando necessário
2. **Fallback Automático**: Mobile e dispositivos com GPU fraco usam PNG estático
3. **Adaptive Quality**: DPR ajustado automaticamente (1-2)
4. **Reduced Motion**: Respeita `prefers-reduced-motion`
5. **GPU Detection**: Detecta GPU fraca e usa fallback

### Monitoramento

Para verificar performance:

```bash
# Lighthouse audit
npm run build
# Abra o site em produção e rode Lighthouse no DevTools
```

**Métricas esperadas:**
- Performance: 90+
- FPS: 60 (desktop), 30+ (mobile)
- Bundle size: +150KB (Three.js)

## ♿ Acessibilidade

### Checklist

- [x] Respeita `prefers-reduced-motion`
- [x] Fallback PNG para mobile/baixa performance
- [x] Contraste de texto AA/AAA
- [x] Navegação por teclado (OrbitControls desabilitado por padrão em mobile)
- [x] ARIA labels (pode adicionar via props)

### Adicionar ARIA Labels

```tsx
<div
  role="img"
  aria-label="Logo RICK em 3D"
  className="..."
>
  <Logo3D />
</div>
```

## ✅ Checklist de Deploy

Antes de fazer deploy, verifique:

- [ ] **CSS Variables**: Todas as variáveis definidas em `globals.css`
- [ ] **Fallback Image**: Imagem PNG do logo existe em `/public/rick-logo.svg`
- [ ] **Performance**: Testado em mobile e desktop
- [ ] **Acessibilidade**: Respeita `prefers-reduced-motion`
- [ ] **Dark/Light Mode**: Testado em ambos os temas
- [ ] **Browser Compatibility**: Testado em Chrome, Firefox, Safari
- [ ] **Bundle Size**: Three.js não quebra o bundle limite
- [ ] **Errors**: Sem erros no console
- [ ] **Responsive**: Funciona em todos os breakpoints

## 📚 Recursos Adicionais

### Documentação Three.js
- [Three.js Docs](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Drei](https://github.com/pmndrs/drei)

### Design System
- Ver `lib/design-tokens.ts` para tokens completos
- Ver `app/globals.css` para CSS variables

## 🐛 Troubleshooting

### Logo não aparece
- Verifique se o fallback está sendo usado (cheque `shouldUseFallback`)
- Verifique se o SVG está correto no array `LOGO_SVG_PATHS`
- Verifique console para erros do Three.js

### Performance ruim
- Habilite `fallbackOnMobile={true}`
- Reduza `bloomIntensity`
- Use preset `"soft"` (menos complexo)

### Cores não batem com o site
- Verifique se as CSS variables estão definidas corretamente
- Verifique se está usando `hsl()` ao invés de `rgb()` onde necessário
- Verifique o tema (dark/light) no `data-theme` ou classe `.dark`

## 📝 Notas

- O SVG é processado client-side, então pode haver um delay inicial
- Em dispositivos muito antigos, o fallback PNG será usado automaticamente
- O bloom effect requer post-processing (EffectComposer), que adiciona overhead
- Para melhor performance em produção, considere pré-processar o SVG em um modelo GLTF

---

**Versão**: 1.0.0  
**Última atualização**: 2025-01-XX  
**Autor**: Rick Tavares Cunha

