"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-tokens";

const projects = [
  {
    id: 1,
    title: "Air Provision",
    category: "websites",
    year: "2024",
    description: "E-commerce platform for sustainable products",
    tags: ["Next.js", "E-commerce"],
  },
  {
    id: 2,
    title: "Sleep",
    category: "branding",
    year: "2024",
    description: "Brand identity for wellness startup",
    tags: ["Brand Identity", "Design System"],
  },
  {
    id: 3,
    title: "Parameter",
    category: "websites",
    year: "2023",
    description: "SaaS dashboard for data analytics",
    tags: ["React", "Dashboard"],
  },
  {
    id: 4,
    title: "Facade",
    category: "branding",
    year: "2023",
    description: "Architecture studio rebranding",
    tags: ["Visual Identity", "Print"],
  },
  {
    id: 5,
    title: "Neon Finance",
    category: "websites",
    year: "2024",
    description: "Fintech web application",
    tags: ["Fintech", "UI/UX"],
  },
  {
    id: 6,
    title: "Eco Future",
    category: "branding",
    year: "2023",
    description: "Sustainable brand concept",
    tags: ["Branding", "Sustainability"],
  },
];

const tabs = [
  { id: "all", label: "All Work" },
  { id: "websites", label: "Websites" },
  { id: "branding", label: "Branding" },
];

export function Portfolio() {
  const [activeTab, setActiveTab] = useState("all");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "all") return true;
    return project.category === activeTab;
  });

  return (
    <section id="portfolio" className="py-32 md:py-40 bg-black relative">
      <div className={cn("container mx-auto px-6", ds.spacing.containerMaxWidth)}>
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <p className="text-xs text-purple-500/80 mb-4 uppercase tracking-[0.2em] font-light">Projetos Selecionados</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white tracking-tighter leading-tight mb-6">
              Selected <span className="text-transparent bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text italic font-serif font-light">Works</span>
            </h2>
            <p className="text-base md:text-lg text-zinc-500 font-light leading-relaxed">
              Visual storytelling through code and design.
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex gap-8"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "text-sm uppercase tracking-widest transition-all pb-1 border-b-2",
                  activeTab === tab.id
                    ? "text-white border-white"
                    : "text-zinc-600 border-transparent hover:text-zinc-400"
                )}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative cursor-pointer"
              >
                {/* Card Container */}
                <div className="relative overflow-hidden rounded-2xl bg-zinc-900/50 aspect-[16/9] md:aspect-[21/9] border border-white/5">
                  
                  {/* Background Number */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[20vw] md:text-[15vw] font-light text-white/5 select-none">
                      {project.id}
                    </span>
                  </div>

                  {/* Hover Gradient */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br transition-opacity duration-700",
                    hoveredId === project.id ? "opacity-20" : "opacity-0",
                    project.id % 3 === 0 ? "from-purple-600 to-pink-600" :
                    project.id % 2 === 0 ? "from-blue-600 to-cyan-600" :
                    "from-green-600 to-emerald-600"
                  )} />

                  {/* Content Overlay */}
                  <div className={cn(
                    "absolute inset-0 p-8 md:p-12 flex flex-col justify-between transition-opacity duration-500",
                    hoveredId === project.id ? "opacity-100" : "opacity-0"
                  )}>
                    
                    {/* Top: Category & Year */}
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-zinc-400 uppercase tracking-widest">{project.category}</span>
                      <span className="text-sm text-zinc-600">{project.year}</span>
                    </div>

                    {/* Bottom: Title & Arrow */}
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-extralight text-white mb-3 tracking-tight">
                          {project.title}
                        </h3>
                        <p className="text-sm md:text-base text-zinc-500 mb-4 font-light">{project.description}</p>
                        <div className="flex gap-3">
                          {project.tags.map(tag => (
                            <span key={tag} className="text-[10px] md:text-xs text-zinc-600 uppercase tracking-widest font-light">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Arrow */}
                      <motion.div
                        animate={{
                          x: hoveredId === project.id ? 4 : 0,
                          y: hoveredId === project.id ? -4 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white flex-shrink-0"
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Hover Border Effect */}
                  <div className={cn(
                    "absolute inset-0 border-2 rounded-2xl transition-colors duration-300 pointer-events-none",
                    hoveredId === project.id ? "border-white/20" : "border-transparent"
                  )} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
