"use client";

import { motion } from "framer-motion";
import React from "react";
import { SplineBackground } from "@/components/ui/spline-background";
import { AnimatedParticles } from "@/components/ui/animated-particles";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-tokens";
import { RainbowButton } from "@/components/ui/rainbow-button";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <SplineBackground />
      {/* Partículas animadas interativas */}
      <AnimatedParticles 
        particleCount={80}
        mouseInteractionRadius={150}
        className="z-[5]"
      />
      <div className="relative z-10 w-full h-full">
        <div className="w-full h-full flex items-center justify-center relative z-20 pt-0 pb-2 md:py-32 min-h-screen max-h-screen overflow-hidden">
          <div className={cn(
            "container mx-auto px-6 w-full",
            ds.spacing.containerMaxWidth
          )}>
            {/* Logo no topo - Mobile */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex md:hidden justify-center mb-4 pt-1"
            >
              <div className="w-24 h-6 relative">
                <Image
                  src="/images/assets/logos/rick-logo.svg"
                  alt="Rick Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-16 lg:gap-24 items-center relative z-20">

              {/* Coluna Esquerda - Conteúdo */}
              <div className="max-w-3xl mx-auto md:mx-0 text-center md:text-left">

                {/* Badge de Status */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4 md:mb-16"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="relative text-xs text-zinc-400 uppercase tracking-widest inline-block overflow-hidden">
                    <span 
                      className="relative bg-gradient-to-r from-zinc-400 via-white to-zinc-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-shiny-text"
                      style={{
                        backgroundSize: '200% auto',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Disponível para novos projetos
                    </span>
                  </span>
                </motion.div>

                {/* Título Principal - Duas Linhas */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-3 md:mb-12"
                >
                  <h1 className="text-[12vw] sm:text-[11vw] md:text-[8.5vw] lg:text-[7rem] font-extralight leading-[0.85] tracking-tighter mb-2 md:mb-4">
                    <span className="block text-white">Alquimista</span>
                    <span className="block text-zinc-500 italic font-serif font-light">Digital</span>
                  </h1>
                </motion.div>

                {/* Descrição Principal */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-2 md:mb-6 max-w-3xl"
                >
                  <p className="text-sm md:text-xl lg:text-2xl text-zinc-400 font-extralight leading-relaxed tracking-tight">
                    Transformando ideias complexas em interfaces fluidas e experiências digitais imersivas.
                  </p>
                </motion.div>

                {/* Subtítulo */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-4 md:mb-16"
                >
                  <p className="text-xs md:text-base lg:text-lg text-zinc-600 font-light">
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
                  <RainbowButton
                    className="w-full sm:flex-1 rounded-full px-6 py-3 md:px-8 md:py-4 h-auto text-xs md:text-sm font-medium group"
                    onClick={() => {
                      const phoneNumber = "5535997657991"; // 55 (Brasil) + 35 (DDD) + 997657991
                      const message = encodeURIComponent("Olá! Gostaria de conversar sobre um projeto.");
                      window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
                    }}
                  >
                    <span>Iniciar Projeto</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </RainbowButton>

                  <a
                    href="#portfolio"
                    className="w-full sm:flex-1 inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 border border-white/10 text-white rounded-full text-xs md:text-sm font-light hover:bg-white/5 transition-colors"
                  >
                    Ver Portfólio
                  </a>
                </motion.div>
              </div>

              {/* Coluna Direita - Logo 2D */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 30, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="hidden lg:flex justify-center lg:justify-end"
              >
                <div className="relative flex items-center justify-center">
                  <Image
                    src="/images/assets/logos/rick-logo-vertical.svg"
                    alt="Logo RICK"
                    width={450}
                    height={450}
                    className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] object-contain"
                    priority
                  />
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-4 md:bottom-12 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
            <span className="text-[10px] md:text-xs text-zinc-600 uppercase tracking-[0.2em]">Role</span>
          <div className="w-[1px] h-10 md:h-16 bg-gradient-to-b from-purple-500/50 via-purple-500/30 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
