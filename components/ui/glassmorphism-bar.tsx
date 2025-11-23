"use client";

import { motion } from "framer-motion";

export function GlassmorphismBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px] overflow-hidden pointer-events-none">
      {/* Barra Glassmorphism com Gradiente Animado */}
      <motion.div
        className="h-full w-full relative"
        style={{
          background: "linear-gradient(90deg, rgba(139, 92, 246, 0.4), rgba(59, 130, 246, 0.4), rgba(236, 72, 153, 0.4), rgba(59, 130, 246, 0.4), rgba(139, 92, 246, 0.4))",
          backgroundSize: "300% 100%",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          boxShadow: "0 0 10px rgba(139, 92, 246, 0.3)",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Overlay com brilho */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50" />
        
        {/* Efeito de luz deslizante */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
          style={{
            width: "40%",
            height: "100%",
          }}
          animate={{
            x: ["-100%", "350%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 1,
          }}
        />
      </motion.div>
    </div>
  );
}

