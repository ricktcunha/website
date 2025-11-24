"use client";

import { useState } from "react";
import { Project } from "@/lib/projects-data";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectFiltersProps {
  projects: Project[];
  onFilterChange: (category: string) => void;
  activeFilter: string;
}

export function ProjectFilters({ projects, onFilterChange, activeFilter }: ProjectFiltersProps) {
  const categories = ["Todos", "Design de Marcas", "Desenvolvedor Front-End", "Campanhas - Postagens", "Campanhas - KV's"];

  const getCount = (category: string) => {
    if (category === "Todos") return projects.length;
    if (category === "Campanhas") {
      // Contar todas as campanhas (Postagens + KV's)
      return projects.filter(
        (p) => p.category === "Campanhas - Postagens" || p.category === "Campanhas - KV's"
      ).length;
    }
    return projects.filter((p) => p.category === category).length;
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-16">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onFilterChange(category)}
          className={`
            px-6 py-3 rounded-full text-sm font-light transition-all duration-300
            ${activeFilter === category
              ? "bg-purple-500 text-white"
              : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/10"
            }
          `}
        >
          {category}
          <span className="ml-2 opacity-60">({getCount(category)})</span>
        </button>
      ))}
    </div>
  );
}
