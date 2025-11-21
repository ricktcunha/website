"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Scene3D } from "@/components/ui/scene-3d";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Elements - Full Width Scene */}
      <div className="absolute inset-0 z-0">
        <Scene3D />
        {/* Subtle gradients to blend the 3D scene edges if needed */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 w-full mx-auto pointer-events-none" // pointer-events-none on container to let clicks pass to 3D if needed, but we re-enable on buttons
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md pointer-events-auto"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-300 font-medium">
            Available for new projects
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-6xl md:text-8xl lg:text-[9rem] font-medium tracking-tighter mb-8 leading-[0.95] mix-blend-overlay text-white/90"
        >
          <span className="block">Digital</span>
          <span className="block italic font-serif opacity-80">Alchemist</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          Transformando ideias complexas em interfaces fluídas e experiências digitais imersivas.
          <br className="hidden md:block" />
          Design estratégico + Engenharia de alta performance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center pointer-events-auto"
        >
          <a href="#contact" className="group px-8 py-4 bg-white text-black rounded-full font-medium text-sm hover:bg-zinc-200 transition-all flex items-center gap-2">
            Iniciar Projeto
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a href="#work" className="px-8 py-4 border border-white/10 rounded-full font-medium text-sm hover:bg-white/5 transition-all text-zinc-300 hover:text-white backdrop-blur-sm">
            Ver Portfólio
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-zinc-600 to-transparent opacity-30" />
      </motion.div>
    </section>
  );
}
