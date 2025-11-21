"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Layers, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

// Simulated data
const projects = [
  {
    id: 1,
    title: "Netexperts",
    category: "marcas",
    image: "/placeholder-brand-1.jpg",
    description: "Identidade visual completa.",
    tags: ["Branding", "Identity"],
    size: "large" 
  },
  {
    id: 2,
    title: "Med Center",
    category: "marcas",
    image: "/placeholder-brand-2.jpg",
    description: "Rebranding e sinalização.",
    tags: ["Design", "Print"],
    size: "normal"
  },
  {
    id: 3,
    title: "Neon Finance",
    category: "sites",
    image: "/placeholder-site-1.jpg",
    description: "Dashboard fintech.",
    tags: ["Next.js", "Framer"],
    size: "normal"
  },
  {
    id: 4,
    title: "Aero Space",
    category: "sites",
    image: "/placeholder-site-2.jpg",
    description: "Landing page imersiva.",
    tags: ["WebGL", "Three.js"],
    size: "wide"
  },
  {
    id: 5,
    title: "Luxe Estate",
    category: "sites",
    image: "/placeholder-site-3.jpg",
    description: "Plataforma imobiliária.",
    tags: ["React", "UI/UX"],
    size: "normal"
  },
  {
    id: 6,
    title: "Eco Future",
    category: "marcas",
    image: "/placeholder-brand-3.jpg",
    description: "Conceito visual sustentável.",
    tags: ["Branding", "Eco"],
    size: "large"
  },
];

const tabs = [
  { id: "all", label: "All Work" },
  { id: "sites", label: "Websites" },
  { id: "marcas", label: "Branding" },
];

export function Portfolio() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "all") return true;
    return project.category === activeTab;
  });

  return (
    <section id="portfolio" className="py-32 bg-black relative">
      {/* Header */}
      <div className="container mx-auto max-w-6xl mb-20 flex flex-col md:flex-row justify-between items-end gap-8 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl md:text-6xl font-medium mb-4 tracking-tight">
              Selected <span className="font-serif italic text-zinc-500">Works</span>
            </h2>
            <p className="text-lg text-zinc-400 font-light tracking-wide">
              Visual storytelling through code and design.
            </p>
          </motion.div>

          {/* Minimal Tabs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex gap-6"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "text-sm uppercase tracking-[0.2em] transition-all pb-1 border-b border-transparent hover:text-white",
                  activeTab === tab.id
                    ? "text-white border-white"
                    : "text-zinc-600"
                )}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto max-w-6xl px-6">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                className={cn(
                  "group relative rounded-none cursor-pointer aspect-[16/10]",
                  index % 3 === 0 ? "md:col-span-2 aspect-[21/9]" : "" // Feature layout
                )}
              >
                {/* Liquid Glass Container */}
                <div className="absolute inset-0 rounded-xl overflow-hidden border border-white/5">
                    {/* Image Placeholder */}
                    <div className="absolute inset-0 bg-zinc-900 group-hover:scale-105 transition-transform duration-1000 ease-out">
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800 to-black">
                            <span className="text-[8rem] md:text-[10rem] font-serif italic text-white/5 select-none">
                                {project.id}
                            </span>
                        </div>
                    </div>

                    {/* Liquid Glass Overlay */}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 backdrop-blur-[0px] group-hover:backdrop-blur-[2px] transition-all duration-700" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="flex justify-between items-start">
                            <div className="bg-black/20 backdrop-blur-md border border-white/10 px-4 py-1 rounded-full">
                                <span className="text-xs uppercase tracking-widest text-white/80">{project.category}</span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                                <ExternalLink size={16} />
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-3xl md:text-5xl font-light text-white mb-2">{project.title}</h3>
                            <div className="flex gap-3">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-xs text-zinc-400 font-light tracking-wide">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
