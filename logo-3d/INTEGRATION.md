# Guia de Integração - Logo 3D no Site

Este guia mostra como integrar o logo 3D no hero banner atual do site.

## Opção 1: Substituir InteractiveLogo por Logo3D (Recomendado)

Substitua o componente `InteractiveLogo` pelo `Logo3D` no hero atual:

### Passo 1: Importar Logo3D

```tsx
// components/sections/hero.tsx
import { Logo3D } from "@/components/ui/logo-3d";
```

### Passo 2: Substituir InteractiveLogo

**Antes:**
```tsx
<InteractiveLogo />
```

**Depois:**
```tsx
<Logo3D
  depth={1.5}
  transmission={0.9}
  roughness={0.1}
  preset="brand"
  autoRotate={true}
  rotationSpeed={0.5}
  size="auto"
  fallbackOnMobile={true}
/>
```

### Passo 3: Completar a Integração

O componente Hero atual já tem toda a estrutura necessária. Apenas substitua o logo:

```tsx
{/* Coluna Direita - Logo 3D */}
<motion.div
  initial={{ opacity: 0, scale: 0.8, y: 30, rotate: -5 }}
  animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
  transition={{
    duration: 1,
    delay: 0.8,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="flex justify-center lg:justify-end"
>
  <Logo3D
    depth={1.5}
    transmission={0.9}
    roughness={0.1}
    preset="brand"
    autoRotate={true}
    rotationSpeed={0.5}
    size="auto"
    fallbackOnMobile={true}
    fallbackImage="/rick-logo.svg"
  />
</motion.div>
```

## Opção 2: Usar HeroGlass Completo (Substituir Hero)

Se preferir usar o componente `HeroGlass` completo (que já inclui o logo 3D):

### Passo 1: Importar HeroGlass

```tsx
// app/page.tsx
import { HeroGlass } from "@/components/ui/hero-glass";
```

### Passo 2: Substituir Hero por HeroGlass

**Antes:**
```tsx
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <>
      <Hero />
      {/* ... outros componentes ... */}
    </>
  );
}
```

**Depois:**
```tsx
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

## Verificações Pós-Integração

1. **CSS Variables**: Verifique se todas as variáveis estão definidas em `app/globals.css`
2. **Fallback Image**: Certifique-se que `/public/rick-logo.svg` existe
3. **Build**: Execute `npm run build` para verificar erros
4. **Performance**: Teste em mobile e desktop
5. **Accessibility**: Verifique se respeita `prefers-reduced-motion`

## Solução de Problemas

### Logo não aparece
- Verifique se o fallback está sendo usado (cheque console)
- Verifique se as dependências estão instaladas (`three`, `@react-three/fiber`, `@react-three/drei`)
- Verifique se o SVG está correto

### Performance ruim
- Habilite `fallbackOnMobile={true}`
- Reduza `bloomIntensity`
- Use preset `"soft"`

### Cores não batem
- Verifique as CSS variables em `app/globals.css`
- Verifique se o tema está correto (dark/light)

## Próximos Passos

1. Ajuste os parâmetros do `Logo3D` conforme necessário
2. Teste diferentes presets (`brand`, `soft`, `high-contrast`)
3. Ajuste a profundidade e transmissão para o visual desejado
4. Configure o fallback para seu próprio PNG se necessário

