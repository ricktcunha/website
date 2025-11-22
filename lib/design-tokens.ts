/**
 * DESIGN SYSTEM - TOKENS PADRONIZADOS
 * Use estes tokens em TODOS os componentes para garantir consistência
 */

export const designTokens = {
  // ============================================
  // TIPOGRAFIA
  // ============================================
  typography: {
    // ====== HIERARQUIA REFINADA: DELICADA & EQUILIBRADA ======
    // Foco: Pesos ultra-leves, espaçamento generoso, escala harmônica

    // Título Hero (H1) - Monumental mas leve
    heroTitle: "text-7xl sm:text-8xl md:text-9xl font-extralight tracking-tighter leading-[0.85]",

    // Títulos de Seção (H2) - Elegantes e respiráveis
    sectionTitle: "text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight leading-[1.1]",

    // Títulos Secundários - Suaves
    sectionTitleMedium: "text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-tight",

    // Subtítulos de Cards (H3) - Refinado
    cardTitle: "text-xl md:text-2xl lg:text-3xl font-light tracking-tight",

    // Cards grandes Portfolio - Ultra delicado
    portfolioCardTitle: "text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight leading-tight",

    // Body Text - Leitura confortável e espaçada
    body: "text-base md:text-lg text-muted-foreground font-light leading-relaxed",

    // Body Secundário - Sutil
    bodySmall: "text-sm md:text-base text-muted-foreground font-extralight leading-relaxed",

    // Labels/Tags - Minimalista
    label: "text-[10px] md:text-xs uppercase tracking-[0.2em] text-zinc-500 font-light",

    // Stats - Ultra finos
    stat: "text-3xl md:text-4xl font-extralight text-white leading-none tracking-tight",
  },

  // ============================================
  // CORES CONSISTENTES - SUAVES
  // ============================================
  colors: {
    titlePrimary: "text-foreground", // Adapta ao tema (White/Black)
    titleAccent: "text-zinc-400 dark:text-zinc-500", // Mais suave

    body: "text-zinc-600 dark:text-zinc-400", // Contraste ideal
    bodyLight: "text-zinc-500 dark:text-zinc-500",

    label: "text-zinc-500 dark:text-zinc-500",

    hoverPrimary: "hover:text-black dark:hover:text-white transition-colors",
    hoverAccent: "hover:text-primary transition-colors",
  },

  // ============================================
  // ESPAÇAMENTOS - RESPIRÁVEIS
  // ============================================
  spacing: {
    // Padding vertical - "Ar" entre seções
    section: "py-24 md:py-32 lg:py-40",

    // Padding horizontal
    containerX: "px-6 md:px-12 lg:px-24",

    // Max width controlado para leitura
    containerMaxWidth: "max-w-6xl mx-auto",
    containerWide: "max-w-[1600px] mx-auto",

    // Gaps harmônicos
    gridGap: "gap-8 md:gap-12 lg:gap-16",
    gridGapSmall: "gap-6 md:gap-8",
    gridGapLarge: "gap-12 md:gap-20",

    // Margins controladas
    titleMargin: "mb-8 md:mb-12",
    subtitleMargin: "mb-4 md:mb-6",
  },

  // ============================================
  // BORDER RADIUS
  // ============================================
  radius: {
    card: "rounded-xl",
    cardLarge: "rounded-2xl",
    button: "rounded-full",
    badge: "rounded-full",
    input: "rounded-lg",
  },

  // ============================================
  // EFEITOS E TRANSIÇÕES
  // ============================================
  effects: {
    // Glass morphism
    glass: "bg-white/5 backdrop-blur-md border border-white/10",
    glassHover: "hover:bg-white/10 hover:border-white/20",

    // Cards
    card: "border border-white/5 bg-zinc-900/20",
    cardHover: "hover:bg-zinc-900/40 transition-all duration-500",

    // Transições
    transition: "transition-all duration-300",
    transitionSlow: "transition-all duration-500",

    // Glow effect
    glow: "shadow-[0_0_20px_rgba(167,139,250,0.3)]",

    // Animated stroke gradient
    animatedStroke: {
      padding: '2px',
      background: 'linear-gradient(#000000, #000000) padding-box, linear-gradient(45deg, #ff6f61, #6f61ff, #61ff6f, #6f61ff) border-box',
      WebkitBackgroundClip: 'padding-box, border-box',
      backgroundClip: 'padding-box, border-box',
      backgroundSize: '400% 400%',
      border: '2px solid transparent',
      animation: 'photo-stroke-animate 5s linear infinite',
    },
  },

  // ============================================
  // BOTÕES
  // ============================================
  buttons: {
    // Botão primário (branco)
    primary: "px-8 py-4 bg-white text-black rounded-full font-medium text-sm hover:bg-zinc-200 transition-all",

    // Botão secundário (outline)
    secondary: "px-8 py-4 border border-white/10 rounded-full font-medium text-sm hover:bg-white/5 transition-all text-zinc-300 hover:text-white backdrop-blur-sm",

    // Botão pequeno
    small: "px-6 py-3 rounded-full font-medium text-sm transition-colors",
  },

  // ============================================
  // ANIMAÇÕES (Framer Motion)
  // ============================================
  animation: {
    // Fade in from bottom
    fadeInUp: {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.8 },
    },

    // Fade in
    fadeIn: {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport: { once: true },
      transition: { duration: 0.8 },
    },

    // Scale in
    scaleIn: {
      initial: { opacity: 0, scale: 0.95 },
      whileInView: { opacity: 1, scale: 1 },
      viewport: { once: true },
      transition: { duration: 0.8 },
    },
  },
} as const;

// Helper para combinar classes facilmente
export const ds = designTokens;

