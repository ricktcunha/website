"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Home, User, Briefcase, FileText, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  section?: string;
}

const navItems: NavItem[] = [
  { name: "Início", href: "/", icon: Home, section: "hero" },
  { name: "Sobre", href: "/#about", icon: User, section: "about" },
  { name: "Trabalhos", href: "/trabalhos", icon: Briefcase },
  { name: "Currículo", href: "/curriculo", icon: FileText },
  { name: "Contato", href: "/#contact", icon: Mail, section: "contact" },
];

export function BottomNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<string>("/");

  // Função para atualizar item ativo baseado no scroll
  const handleScroll = useCallback(() => {
    if (pathname !== "/") return;

    const sections = ["about", "contact"];
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    let activeSection = "hero";

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i]);
      if (section && section.offsetTop <= scrollPosition) {
        activeSection = sections[i];
        break;
      }
    }

    const item = navItems.find((item) => item.section === activeSection);
    if (item) {
      setActiveItem(item.href);
    } else {
      setActiveItem("/");
    }
  }, [pathname]);

  useEffect(() => {
    // Inicializar item ativo baseado na rota e hash
    const hash = window.location.hash.replace("#", "");
    
    if (pathname === "/") {
      // Se há hash, verificar se é uma seção válida
      if (hash && ["about", "contact"].includes(hash)) {
        const item = navItems.find((item) => item.section === hash);
        if (item) {
          setActiveItem(item.href);
        }
      } else {
        setActiveItem("/");
      }
      
      // Adicionar listener de scroll
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll(); // Chamar uma vez para inicializar
      
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    } else {
      // Em outras páginas, encontrar item que corresponde à rota
      const item = navItems.find((item) => {
        if (item.href.includes("#")) return false;
        return pathname.startsWith(item.href);
      });
      if (item) {
        setActiveItem(item.href);
      } else {
        setActiveItem(pathname);
      }
    }
  }, [pathname, handleScroll]);

  const handleClick = useCallback(
    (item: NavItem, e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      
      // Se é o link para a home sem hash
      if (item.href === "/") {
        setActiveItem("/");
        if (pathname !== "/") {
          router.push("/");
        } else {
          // Se já está na home, scrollar para o topo
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }
      
      // Se tem seção e estamos na home
      if (item.section && pathname === "/") {
        setActiveItem(item.href);
        const element = document.getElementById(item.section);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } 
      // Se é link com hash (navegar de outra página)
      else if (item.href.includes("#")) {
        setActiveItem(item.href);
        const hash = item.href.split("#")[1];
        
        if (pathname !== "/") {
          // Navegar para home primeiro
          router.push("/");
          // Aguardar navegação e então scrollar
          setTimeout(() => {
            const element = document.getElementById(hash);
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 300);
        } else {
          // Já está na home, apenas scrollar
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      } 
      // Navegação normal para outra página
      else {
        setActiveItem(item.href);
        router.push(item.href);
      }
    },
    [pathname, router]
  );

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed bottom-6 left-4 right-4 z-50 md:hidden pointer-events-none"
    >
      {/* Barra flutuante estilo Apple com blur intenso */}
      <div 
        className="relative rounded-2xl border border-white/20 shadow-2xl px-2 py-3 pointer-events-auto overflow-hidden" 
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
        }}
      >
        {/* Overlay de brilho sutil - estilo Apple */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent pointer-events-none rounded-2xl" />
        {/* Glassmorphism effect */}
        <div className="relative flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            
            // Lógica melhorada para determinar se está ativo
            let isActive = false;
            if (pathname === "/") {
              // Na home, verificar pelo activeItem (que pode ser / ou /#section)
              isActive = activeItem === item.href;
            } else {
              // Em outras páginas, comparar pela rota
              if (item.href.includes("#")) {
                // Links com hash não podem estar ativos fora da home
                isActive = false;
              } else {
                isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              }
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleClick(item, e)}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-2xl transition-all duration-300 group",
                  isActive ? "text-purple-400" : "text-zinc-500 hover:text-zinc-400"
                )}
                aria-label={item.name}
              >
                {/* Spotlight effect quando ativo */}
                {isActive && (
                  <motion.div
                    layoutId="activeSpotlight"
                    className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-10 pointer-events-none z-0"
                    initial={false}
                    transition={{ 
                      type: "spring", 
                      stiffness: 350, 
                      damping: 35,
                      mass: 0.8
                    }}
                  >
                    {/* Spotlight beam */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/15 to-transparent rounded-full blur-xl" />
                    {/* Indicator line */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-white/80 rounded-full" />
                  </motion.div>
                )}

                {/* Ícone */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.15 : 1,
                    y: isActive ? -2 : 0,
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    duration: 0.3
                  }}
                  className="relative z-10"
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 transition-all duration-300",
                      isActive
                        ? "text-purple-400 drop-shadow-[0_0_12px_rgba(196,181,253,0.6)]"
                        : "group-active:scale-90 text-zinc-500"
                    )}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </motion.div>

                {/* Label */}
                <span
                  className={cn(
                    "text-[9px] font-light transition-colors duration-200",
                    isActive ? "text-purple-400" : "text-zinc-500"
                  )}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
