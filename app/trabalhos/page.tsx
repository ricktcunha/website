"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { projects } from "@/lib/projects-data";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-tokens";

const tabs = [
  { id: "all", label: "TODOS OS TRABALHOS" },
  { id: "websites", label: "WEBSITES" },
  { id: "branding", label: "BRANDING" },
];

export default function TrabalhosPag() {
  const [activeTab, setActiveTab] = useState("all");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const router = useRouter();

  // Garantir que a página sempre comece no topo ao carregar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Se não há hash, rolar para o topo
      if (!window.location.hash) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
  }, []);

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "all") return true;
    if (activeTab === "websites") return project.category === "Desenvolvedor Front-End";
    if (activeTab === "branding") return project.category === "Design de Marcas" || project.category === "Designer Gráfico";
    return true;
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white pt-32 pb-24">
      <div className={cn("container mx-auto px-6", ds.spacing.containerMaxWidth)}>
        {/* Header */}
        <div className="mb-20">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Voltar ao Início
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-purple-500 font-medium tracking-widest text-xs uppercase mb-4 block"
              >
                Portfolio Completo
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl md:text-7xl font-normal text-white mb-6 tracking-tight"
              >
                Todos os <span className="text-purple-400 font-serif italic">Projetos</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-zinc-500 text-lg max-w-md"
              >
                Explore minha coleção completa de projetos de design de marcas,
                desenvolvimento front-end e design gráfico.
              </motion.p>
            </div>

            <div className="flex gap-4 md:gap-8 mb-2 flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-xs font-medium tracking-widest uppercase transition-colors relative pb-2 ${activeTab === tab.id ? "text-white" : "text-zinc-600 hover:text-zinc-400"
                    }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 w-full h-[1px] bg-white"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                transition={{
                  duration: 0.5,
                  ease: [0.32, 0.72, 0, 1],
                  layout: { duration: 0.5, ease: [0.32, 0.72, 0, 1] }
                }}
                className="w-full"
              >
                {/* Desktop: Link direto */}
                <Link 
                  href={`/trabalhos/${project.slug}`} 
                  className="hidden md:block group relative"
                >
                  <div className="relative h-[500px] w-full bg-black border border-white/10 rounded-3xl transition-all duration-700 ease-out overflow-hidden group-hover:bg-[#0a1f1c] group-hover:border-emerald-900/30">
                    {/* Big Number Background - Always visible but subtle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-bold text-white/[0.03] pointer-events-none select-none transition-opacity duration-500 group-hover:text-white/[0.05]">
                      {index + 1}
                    </div>

                    {/* Content Container - Desktop hover */}
                    <div className="absolute inset-0 p-16 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75 group-hover:translate-y-0 translate-y-4">
                      {/* Top Info */}
                      <div className="flex justify-between items-start z-10">
                        <span className="text-xs font-medium tracking-widest text-zinc-400 uppercase">
                          {project.category === "Desenvolvedor Front-End" ? "WEBSITES" : "BRANDING"}
                        </span>
                        <span className="text-xs font-medium text-zinc-500">
                          {project.year}
                        </span>
                      </div>

                      {/* Bottom Info */}
                      <div className="z-10">
                        <h3 className="text-5xl md:text-7xl font-medium text-white mb-6">
                          {project.title}
                        </h3>
                        <p className="text-zinc-400 text-lg mb-8 line-clamp-2 max-w-2xl font-light">
                          {project.description}
                        </p>

                        <div className="flex items-center justify-between border-t border-white/10 pt-8">
                          <div className="flex gap-4">
                            {project.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                            <ArrowUpRight className="w-6 h-6" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Mobile: Card com interação de dois toques */}
                <div 
                  className={cn(
                    "md:hidden group relative w-full bg-black border border-white/10 rounded-3xl transition-all duration-700 ease-out overflow-hidden",
                    expandedCard === project.id ? "bg-[#0a1f1c] border-emerald-900/30" : "h-[280px]"
                  )}
                  style={{
                    height: expandedCard === project.id ? 'auto' : '280px',
                  }}
                >
                  {/* Big Number Background */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-bold text-white/[0.03] pointer-events-none select-none transition-opacity duration-500">
                    {index + 1}
                  </div>

                  {/* Clickable overlay - Primeiro toque: expande, Segundo toque: navega */}
                  {expandedCard !== project.id ? (
                    // Primeiro toque: expande o card
                    <div 
                      className="absolute inset-0 z-20 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setExpandedCard(project.id);
                      }}
                    />
                  ) : (
                    // Segundo toque: navega para o projeto (qualquer lugar do card)
                    <div 
                      className="absolute inset-0 z-20 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        router.push(`/trabalhos/${project.slug}`);
                      }}
                    />
                  )}

                  {/* Content Container - Mobile: visible quando expandido */}
                  <div className={cn(
                    "p-6 flex flex-col justify-between transition-all duration-500 relative z-10",
                    expandedCard === project.id 
                      ? "opacity-100 translate-y-0" 
                      : "absolute inset-0 opacity-0 translate-y-4"
                  )}>
                    {/* Top Info */}
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[11px] font-medium tracking-widest text-zinc-400 uppercase">
                        {project.category === "Desenvolvedor Front-End" ? "WEBSITES" : "BRANDING"}
                      </span>
                      <span className="text-[11px] font-medium text-zinc-500">
                        {project.year}
                      </span>
                    </div>

                    {/* Bottom Info */}
                    <div className="flex-1 flex flex-col justify-end">
                      <h3 className="text-3xl font-medium text-white mb-3 leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-sm text-zinc-400 mb-4 line-clamp-2 max-w-2xl font-light leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-4">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Ícone visual (não clicável, apenas decorativo) */}
                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center shrink-0 bg-white/5 pointer-events-none">
                          <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-32">
            <p className="text-zinc-500 text-lg">
              Nenhum projeto encontrado nesta categoria.
            </p>
          </div>
        )}
      </div>
      </main>
      <Footer />
    </>
  );
}
