"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
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
    // Número do WhatsApp: (35) 99765-7991
    const phoneNumber = "5535997657991"; // 55 (Brasil) + 35 (DDD) + 997657991
    const message = encodeURIComponent("Olá! Gostaria de conversar sobre um projeto.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="fixed bottom-32 md:bottom-8 right-8 z-40 md:z-50 flex flex-col gap-4">
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
        <FaWhatsapp className="w-7 h-7 text-white" />

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
            className="group relative w-14 h-14 rounded-full border border-white/20 flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden md:bg-zinc-800 md:hover:bg-zinc-700 md:border-white/10"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            }}
          >
            {/* Overlay de brilho para mobile */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent pointer-events-none rounded-full md:hidden" />
            <ArrowUp className="w-5 h-5 text-white relative z-10" />

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
