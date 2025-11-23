"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects, Project } from "@/lib/projects-data";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-tokens";
import type React from "react";

const tabs = [
  { id: "all", label: "TODOS OS TRABALHOS" },
  { id: "websites", label: "WEBSITES" },
  { id: "branding", label: "BRANDING" },
];

export function Portfolio() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "all") return true;
    if (activeTab === "websites") return project.category === "Desenvolvedor Front-End";
    if (activeTab === "branding") return project.category === "Design de Marcas" || project.category === "Designer Gráfico";
    return true;
  }).slice(0, 6); // Show only 6 featured projects as requested

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
                <Link href={`/trabalhos/${project.slug}`} className="block group relative">
                  <div className="relative h-[400px] md:h-[500px] w-full bg-black border border-white/10 rounded-3xl transition-all duration-700 ease-out overflow-hidden group-hover:bg-[#0a1f1c] group-hover:border-emerald-900/30">

                    {/* Big Number Background - Always visible but subtle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] md:text-[20rem] font-bold text-white/[0.03] pointer-events-none select-none transition-opacity duration-500 group-hover:text-white/[0.05]">
                      {index + 1}
                    </div>

                    {/* Content Container - Hidden by default, revealed on hover */}
                    <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75 group-hover:translate-y-0 translate-y-4">

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
