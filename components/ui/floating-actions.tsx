"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

export function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openWhatsApp = () => {
    // Substitua pelo seu número (formato internacional sem +)
    const phoneNumber = "5511999999999"; // Exemplo: 55 (Brasil) + DDD + Número
    const message = encodeURIComponent("Olá! Gostaria de conversar sobre um projeto.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
      {/* WhatsApp Button - Always Visible */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={openWhatsApp}
        className="group relative w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 px-3 py-2 bg-zinc-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Fale no WhatsApp
          <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-zinc-900 rotate-45" />
        </div>

        {/* Pulse Ring */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
      </motion.button>

      {/* Scroll to Top Button - Conditional */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="group relative w-14 h-14 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-white/10 flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <ArrowUp className="w-5 h-5 text-white" />
            
            {/* Tooltip */}
            <div className="absolute right-full mr-3 px-3 py-2 bg-zinc-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Voltar ao topo
              <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-zinc-900 rotate-45" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

