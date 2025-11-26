"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  // Posições do cursor - usando lerp/interpolação para movimento suave e atrasado
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring config para movimento suave e elegante (lerp effect)
  const springConfig = { 
    damping: 20, // Controle do atraso (menor = mais atraso)
    stiffness: 150, // Suavidade do movimento
    mass: 0.5 
  };
  
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  // Estados para interatividade
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detectar dispositivos touch
    setIsTouchDevice(
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0
    );

    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => {
      setIsActive(true);
    };

    const handleMouseUp = () => {
      setIsActive(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Verificar se é elemento interativo
      const isInteractive = 
        target.matches('a, button, [role="button"], input, textarea, select, label, [data-interactive]') ||
        target.closest('a, button, [role="button"], [data-interactive]') !== null ||
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.onclick !== null;

      setIsHovering(isInteractive);
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    // Adicionar listeners
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver, true);
    document.addEventListener("mouseout", handleMouseOut, true);

    // Esconder cursor padrão
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver, true);
      document.removeEventListener("mouseout", handleMouseOut, true);
      document.body.style.cursor = "auto";
    };
  }, [cursorX, cursorY, isTouchDevice]);

  // Não renderizar em dispositivos touch
  if (isTouchDevice) return null;

  return (
    <>
      {/* Cursor principal - círculo suave com brilho difuso */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isActive ? 0.9 : isHovering ? 1.8 : 1,
          opacity: isActive ? 0.9 : isHovering ? 1 : 0.85,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
          mass: 0.3,
        }}
      >
        {/* Círculo externo com borda fina e brilho difuso */}
        <div
          className="relative"
          style={{
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Brilho difuso - glow sutil */}
          <div
            className={`absolute inset-0 rounded-full blur-md transition-opacity duration-500 ${
              isHovering 
                ? "bg-purple-400/20 opacity-100" 
                : "bg-white/10 opacity-60"
            }`}
            style={{
              width: isHovering ? "32px" : "16px",
              height: isHovering ? "32px" : "16px",
              transform: "translate(-50%, -50%)",
              left: "50%",
              top: "50%",
            }}
          />
          
          {/* Círculo principal */}
          <div
            className={`rounded-full border transition-all duration-500 ${
              isHovering
                ? "w-5 h-5 border-purple-400/60 bg-purple-400/10"
                : "w-2.5 h-2.5 border-white/70 bg-white/5"
            }`}
            style={{
              borderWidth: isHovering ? "1.5px" : "1px",
              boxShadow: isHovering
                ? "0 0 12px rgba(196, 181, 253, 0.4), inset 0 0 8px rgba(196, 181, 253, 0.1)"
                : "0 0 6px rgba(255, 255, 255, 0.2), inset 0 0 4px rgba(255, 255, 255, 0.05)",
            }}
          />
        </div>
      </motion.div>

      {/* Ponto central - sempre presente para precisão */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isActive ? 1.2 : isHovering ? 0.5 : 1,
          opacity: isActive ? 0.9 : isHovering ? 0.7 : 1,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 400,
          mass: 0.2,
        }}
      >
        <div
          className={`w-1 h-1 rounded-full transition-colors duration-300 ${
            isHovering ? "bg-purple-400" : "bg-white/90"
          }`}
          style={{
            transform: "translate(-50%, -50%)",
            boxShadow: isHovering
              ? "0 0 4px rgba(196, 181, 253, 0.6)"
              : "0 0 3px rgba(255, 255, 255, 0.4)",
          }}
        />
      </motion.div>
    </>
  );
}

