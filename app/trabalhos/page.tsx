"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/lib/projects-data";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { ProjectCard } from "@/components/ui/project-card";
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
                <ProjectCard
                  project={project}
                  index={index}
                  expanded={expandedCard === project.id}
                  onExpand={(id) => setExpandedCard(id)}
                  onNavigate={(slug) => {
                    setExpandedCard(null);
                    router.push(`/trabalhos/${slug}`);
                  }}
                />
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
