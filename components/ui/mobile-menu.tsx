"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { name: "Trabalhos", href: "/trabalhos" },
  { name: "Sobre", href: "/#about" },
  { name: "Currículo", href: "/curriculo" },
  { name: "Contato", href: "/#contact" },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Mount check for portal
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLinkClick = (href: string) => {
    // Handle anchor links with smooth scroll
    if (typeof window !== "undefined" && href.includes("#")) {
      const hash = href.split("#")[1];
      
      // If we're on the home page, scroll smoothly
      if (window.location.pathname === "/") {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        // Navigate to home page with hash
        router.push(href);
      }
    } else {
      // Regular navigation
      router.push(href);
    }
    
    // Close menu after navigation
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!mounted) return null;

  const menuContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Leve opacidade com blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-md"
            style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0,
              zIndex: 9999,
              touchAction: 'none'
            }}
          />

          {/* Menu Panel - Lateral Direita */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              mass: 0.8
            }}
            className="fixed top-0 right-0 bg-zinc-950/80 backdrop-blur-2xl border-l border-white/5 shadow-2xl"
            style={{ 
              position: 'fixed', 
              top: 0, 
              right: 0, 
              height: '100vh',
              width: '85vw',
              maxWidth: '384px',
              zIndex: 10000,
              touchAction: 'pan-y'
            }}
          >
            {/* Header */}
            <div className="relative z-10 flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="text-sm font-light text-zinc-400 uppercase tracking-widest">
                Menu
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/5 transition-colors duration-300 text-zinc-400 hover:text-white"
                aria-label="Fechar menu"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="relative z-10 flex flex-col p-6 gap-3 mt-4">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: index * 0.08 + 0.15,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <button
                    onClick={() => handleLinkClick(item.href)}
                    className={cn(
                      "w-full text-left px-6 py-4 rounded-xl font-light text-lg text-zinc-300 hover:text-white transition-all duration-300 relative group",
                      "border border-transparent hover:border-white/10 bg-white/0 hover:bg-white/5"
                    )}
                  >
                    <span className="relative z-10 flex items-center">
                      {item.name}
                      <motion.span
                        className="ml-auto opacity-0 group-hover:opacity-100 text-purple-400"
                        initial={false}
                        transition={{ duration: 0.3 }}
                      >
                        →
                      </motion.span>
                    </span>
                    
                    {/* Gradient overlay on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-purple-600/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={false}
                    />
                  </button>
                </motion.div>
              ))}
            </nav>

            {/* Footer */}
            <div className="absolute z-10 bottom-0 left-0 right-0 p-6 border-t border-white/5">
              <p className="text-xs text-zinc-500 text-center font-light">
                © 2025 Rick Cunha
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return mounted ? createPortal(menuContent, document.body) : null;
}
