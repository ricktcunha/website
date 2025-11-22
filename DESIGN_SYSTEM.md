# Design System

## 🎨 1. Visual Foundations

### Color Palette
The "Aurora" palette combines deep, rich backgrounds with vibrant, ethereal accents.

#### Primary Colors
- **Background**: `hsl(240 10% 3.9%)` (Deep Zinc/Black)
- **Foreground**: `hsl(0 0% 98%)` (White)
- **Primary**: `hsl(265 89% 78%)` (Delicate Lilac/Purple)

#### Accent Colors
- **Blue**: `hsl(217 91% 60%)`
- **Purple**: `hsl(270 50% 40%)`
- **Pink**: `hsl(330 80% 60%)`

### Typography
We use **Syne** for headings and **Inter** (system default sans) for body text.

| Role | Font | Size (Desktop) | Weight | Tracking |
|------|------|----------------|--------|----------|
| **Hero H1** | Syne | `text-9xl` | Extralight | `-0.05em` |
| **Section H2** | Syne | `text-7xl` | Extralight | `-0.02em` |
| **Card H3** | Syne | `text-3xl` | Light | `-0.01em` |
| **Body** | Sans | `text-lg` | Light | `0` |
| **Label** | Sans | `text-xs` | Regular | `0.2em` |

### Spacing & Grid
- **Container**: `max-w-[1600px]` (Wide), `max-w-6xl` (Standard)
- **Padding**: `px-6 md:px-12 lg:px-24`
- **Section Gap**: `py-24 md:py-32`

### Effects
- **Glass**: `bg-white/5 backdrop-blur-md border border-white/10`
- **Glow**: `shadow-[0_0_20px_rgba(167,139,250,0.3)]`
- **Hover**: `hover:bg-white/10 transition-all duration-300`

---

## 🧱 2. Component Library

### Buttons
**Primary**
- **Style**: Solid White, Black Text, Rounded Full.
- **Usage**: Main CTAs (e.g., "Start Project").
- **Code**: `bg-white text-black rounded-full px-8 py-4 hover:bg-zinc-200`

**Secondary**
- **Style**: Outline, White Text, Glass Effect.
- **Usage**: Secondary actions (e.g., "View Portfolio").
- **Code**: `border border-white/10 text-white rounded-full px-8 py-4 hover:bg-white/5`

### Cards
- **Style**: Glassmorphism, minimal border.
- **Behavior**: Scale up slightly on hover, border glow.
- **Code**: `bg-zinc-900/50 border border-white/5 rounded-2xl`

### Hero Section
- **Layout**: Split screen (Text Left, Visual Right) or Center Aligned.
- **Animation**: Staggered fade-in for text elements.
- **Background**: Interactive particles or Aurora gradients.

### Navbar
- **Style**: Floating glass bar or minimal top bar.
- **Behavior**: Hides on scroll down, shows on scroll up (optional) or fixed glass.

### Modals
- **Overlay**: `bg-black/80 backdrop-blur-sm`
- **Content**: Centered, glass effect, `scale-in` animation.

---

## 🎬 Motion Guidelines

### Framer Motion
- **Ease**: `[0.22, 1, 0.36, 1]` (Custom "Delicate" Ease)
- **Duration**: `0.8s` for entrance, `0.3s` for hover.
- **Stagger**: `0.1s` between list items.

### GSAP
- Use for complex timelines and scroll-triggered animations.
- Always clean up ScrollTriggers in `useEffect` return.

### Lenis
- Smooth scrolling is enabled globally.
- Use `data-lenis-prevent` for scrollable internal containers.
