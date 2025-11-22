"use client";

import { motion } from "framer-motion";
import React from "react";
import { InteractiveBackground } from "@/components/ui/interactive-background";
import { InteractiveLogo } from "@/components/ui/interactive-logo";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-tokens";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <InteractiveBackground>
        <div className="w-full h-full flex items-center justify-center relative z-20 px-6 py-32">
          <div className={cn(
            "container mx-auto",
            ds.spacing.containerMaxWidth
          )}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              
              {/* Coluna Esquerda - Conteúdo */}
              <div className="max-w-3xl">
              
                {/* Badge de Status */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-16"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-xs text-zinc-400 uppercase tracking-widest">Available for new projects</span>
                </motion.div>

                {/* Título Principal - Duas Linhas */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-12"
                >
                  <h1 className="text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[8.5rem] font-extralight leading-[0.85] tracking-tighter mb-4 text-left">
                    <span className="block text-white">Digital</span>
                    <span className="block text-zinc-500 italic font-serif font-light">Alchemist</span>
                  </h1>
                </motion.div>

                {/* Descrição Principal */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-6 max-w-3xl"
                >
                  <p className="text-xl md:text-2xl text-zinc-400 font-extralight leading-relaxed text-left tracking-tight">
                    Transformando ideias complexas em interfaces fluidas e experiências digitais imersivas.
                  </p>
                </motion.div>

                {/* Subtítulo */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-16"
                >
                  <p className="text-base md:text-lg text-zinc-600 font-light text-left">
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
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors group"
                  >
                    <span>Iniciar Projeto</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>

                  <a
                    href="#portfolio"
                    className="inline-flex items-center justify-center px-8 py-4 border border-white/10 text-white rounded-full text-sm font-light hover:bg-white/5 transition-colors"
                  >
                    Ver Portfólio
                  </a>
                </motion.div>
              </div>

              {/* Coluna Direita - Logo Interativo */}
              <div className="flex justify-center lg:justify-end">
                <InteractiveLogo />
              </div>

            </div>
          </div>
        </div>
      </InteractiveBackground>

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
          <span className="text-xs text-zinc-600 uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-purple-500/50 via-purple-500/30 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
