"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Logo3D } from "./logo-3d";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-tokens";

// ============================================
// DESIGN TOKENS - CSS Variables
// ============================================
// Estas variáveis devem ser injetadas no CSS global do site

// ============================================
// INTERFACES E TIPOS
// ============================================
interface HeroGlassProps {
  /** Título principal do hero */
  title?: string;
  /** Subtítulo do hero */
  subtitle?: string;
  /** Descrição do hero */
  description?: string;
  /** Badge de status (ex: "Disponível para novos projetos") */
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
  /** Classe CSS adicional para o container */
  className?: string;
  /** Habilita shapes/partículas animadas no background (padrão: true) */
  showAnimatedShapes?: boolean;
  /** Habilita noise overlay (padrão: true) */
  showNoiseOverlay?: boolean;
}

// ============================================
// COMPONENTE: Animated Shapes Background
// ============================================
function AnimatedShapes({ count = 8 }: { count?: number }) {
  const shapes = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((index) => (
        <motion.div
          key={index}
          className="absolute rounded-full opacity-[0.03]"
          style={{
            width: `${20 + Math.random() * 40}%`,
            height: `${20 + Math.random() * 40}%`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)`,
          }}
          animate={{
            x: [
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
            ],
            y: [
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
            ],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20 + Math.random() * 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ============================================
// COMPONENTE: Noise Overlay
// ============================================
function NoiseOverlay() {
  return (
    <div
      className="absolute inset-0 opacity-[0.015] pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px",
        mixBlendMode: "overlay",
      }}
    />
  );
}

// ============================================
// COMPONENTE: Hero Glass Principal
// ============================================
export function HeroGlass({
  title = "Alquimista Digital",
  subtitle = "Digital",
  description = "Transformando ideias complexas em interfaces fluidas e experiências digitais imersivas.",
  badge = "Disponível para novos projetos",
  ctaPrimary = "Iniciar Projeto",
  ctaSecondary = "Ver Portfólio",
  onCtaPrimaryClick,
  onCtaSecondaryClick,
  showLogo3D = true,
  logo3DProps,
  className,
  showAnimatedShapes = true,
  showNoiseOverlay = true,
}: HeroGlassProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  // Parallax do mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className={cn(
        "relative min-h-screen w-full flex items-center justify-center overflow-hidden",
        className
      )}
      style={{
        // Background gradient usando tokens do site
        background: `
          radial-gradient(ellipse at top, hsl(var(--primary) / 0.05) 0%, transparent 50%),
          radial-gradient(ellipse at bottom, hsl(var(--primary) / 0.03) 0%, transparent 50%),
          hsl(var(--background))
        `,
      }}
    >
      {/* Animated Shapes Background */}
      {showAnimatedShapes && <AnimatedShapes count={8} />}

      {/* Noise Overlay */}
      {showNoiseOverlay && <NoiseOverlay />}

      {/* Conteúdo Principal */}
      <div className={cn("relative z-20 w-full", ds.spacing.containerMaxWidth, ds.spacing.containerX)}>
        <div className="py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Coluna Esquerda - Conteúdo Textual */}
            <div className="max-w-3xl">
              {/* Badge de Status */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-16"
                style={{
                  background: "var(--glass-bg, rgba(255, 255, 255, 0.05))",
                  borderColor: "var(--glass-border, rgba(255, 255, 255, 0.1))",
                  backdropFilter: "blur(var(--glass-blur, 18px))",
                  boxShadow: "0 8px 30px rgba(var(--color-accent-rgb, 139, 92, 246), 0.08)",
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="relative text-xs text-zinc-400 uppercase tracking-widest inline-block overflow-hidden">
                  <span
                    className="relative bg-gradient-to-r from-zinc-400 via-white to-zinc-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-shiny-text"
                    style={{
                      backgroundSize: "200% auto",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {badge}
                  </span>
                </span>
              </motion.div>

              {/* Título Principal */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="mb-12"
              >
                <h1 className={cn("text-[12vw] sm:text-[10vw] md:text-[8.5vw] lg:text-[7rem] font-extralight leading-[0.85] tracking-tighter mb-4 text-left", ds.typography.heroTitle)}>
                  <span className="block text-white">{title.split(" ")[0]}</span>
                  <span className="block text-zinc-500 italic font-serif font-light">
                    {title.split(" ").slice(1).join(" ")}
                  </span>
                </h1>
              </motion.div>

              {/* Descrição */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mb-6 max-w-3xl"
              >
                <p className={cn("text-xl md:text-2xl text-zinc-400 font-extralight leading-relaxed text-left tracking-tight", ds.typography.body)}>
                  {description}
                </p>
              </motion.div>

              {/* Subtítulo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mb-16"
              >
                <p className={cn("text-base md:text-lg text-zinc-600 font-light text-left", ds.typography.bodySmall)}>
                  Design estratégico + Engenharia de alta performance.
                </p>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col sm:flex-row items-start gap-4"
              >
                <button
                  onClick={onCtaPrimaryClick}
                  className={cn(
                    "rounded-full px-8 py-4 h-auto text-sm font-medium group",
                    ds.buttons.primary
                  )}
                >
                  <span>{ctaPrimary}</span>
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform inline"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>

                <button
                  onClick={onCtaSecondaryClick}
                  className={cn(
                    "inline-flex items-center justify-center px-8 py-4 border border-white/10 text-white rounded-full text-sm font-light hover:bg-white/5 transition-colors",
                    ds.buttons.secondary
                  )}
                >
                  {ctaSecondary}
                </button>
              </motion.div>
            </div>

            {/* Coluna Direita - Logo 3D */}
            {showLogo3D && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 30, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex justify-center lg:justify-end"
                style={{
                  transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
                  transition: "transform 0.1s ease-out",
                }}
              >
                <Logo3D size="auto" {...logo3DProps} />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className={cn("text-xs text-zinc-600 uppercase tracking-[0.2em]", ds.typography.label)}>
            Role
          </span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-purple-500/50 via-purple-500/30 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

