// Design System Constants
// Use these values to ensure consistency across the application

export const DS = {
  layout: {
    maxWidth: "max-w-[1600px]", // Standard max-width for full-width feel
    paddingX: "px-6 md:px-12 lg:px-24", // Standard horizontal padding
    sectionPadding: "py-24 md:py-32", // Standard vertical spacing
  },
  typography: {
    h1: "text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1]",
    h2: "text-4xl md:text-6xl font-medium tracking-tight mb-8",
    h3: "text-2xl font-medium mb-4",
    body: "text-lg text-muted-foreground font-light leading-relaxed",
    label: "text-xs uppercase tracking-[0.2em] text-zinc-500",
  },
  effects: {
    glass: "bg-white/5 backdrop-blur-md border border-white/10",
    glassHover: "hover:bg-white/10 hover:border-white/20 transition-all duration-300",
    glow: "shadow-[0_0_20px_rgba(167,139,250,0.3)]",
  },
  animation: {
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }, // Custom ease for delicate feel
  }
} as const;

