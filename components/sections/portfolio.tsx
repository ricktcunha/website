"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { projects, getHomePageProjects } from "@/lib/projects-data";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { ProjectCard } from "@/components/ui/project-card";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-tokens";
import type React from "react";

const tabs = [
  { id: "all", label: "TODOS OS TRABALHOS" },
  { id: "websites", label: "WEBSITES" },
  { id: "branding", label: "BRANDING" },
  { id: "campanhas", label: "CAMPANHAS" },
];

export function Portfolio() {
  const [activeTab, setActiveTab] = useState("all");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const router = useRouter();

  // Para a página inicial, usar getHomePageProjects() que retorna os 6 trabalhos específicos
  const homeProjects = getHomePageProjects();
  
  const filteredProjects = homeProjects.filter((project) => {
    if (activeTab === "all") return true;
    if (activeTab === "websites") return project.category === "Desenvolvedor Front-End";
    if (activeTab === "branding") return project.category === "Design de Marcas";
    if (activeTab === "campanhas") return project.category === "Campanhas - Postagens" || project.category === "Campanhas - KV's";
    return true;
  });

  return (
    <section id="portfolio" className="py-32 bg-black text-white">
      <div className={cn("container mx-auto px-6", ds.spacing.containerMaxWidth)}>
        {/* Header with Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-purple-500 font-medium tracking-widest text-xs uppercase mb-4 block"
            >
              Projetos Selecionados
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-normal text-white mb-6 tracking-tight"
            >
              Trabalhos <span className="text-purple-400 font-serif italic">Selecionados</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-zinc-500 text-lg max-w-md"
            >
              Narrativa visual através de código e design.
            </motion.p>
          </div>

          <div className="flex gap-8 mb-2">
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

        {/* Projects Stack */}
        <motion.div
          layout
          className="flex flex-col gap-8"
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

        {/* View All Button */}
        <div className="mt-32 flex justify-center">
          <Link
            href="/trabalhos"
            style={{
              "--spread": "90deg",
              "--shimmer-color": "#ffffff",
              "--radius": "100px",
              "--speed": "3s",
              "--cut": "0.05em",
              "--bg": "rgba(0, 0, 0, 1)",
            } as React.CSSProperties}
            className="group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-8 py-4 text-sm font-medium tracking-widest uppercase text-white shadow-2xl transform-gpu transition-all duration-500 ease-in-out active:translate-y-px hover:bg-white hover:text-black hover:border-white [background:var(--bg)] [border-radius:var(--radius)]"
          >
            {/* spark container */}
            <div className="-z-30 blur-[2px] absolute inset-0 overflow-visible [container-type:size]">
              {/* spark */}
              <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
                {/* spark before */}
                <div className="animate-spin-around absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
              </div>
            </div>
            
            <span className="flex items-center gap-3 relative z-10">
              Ver Todos os Projetos
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500" />
            </span>

            {/* backdrop */}
            <div className="absolute -z-20 [border-radius:var(--radius)] [inset:var(--cut)] bg-black transition-all duration-500 ease-in-out group-hover:bg-white" />
          </Link>
        </div>
      </div>
    </section>
  );
}
