"use client";

import { motion } from "framer-motion";
import { Globe, PenTool, Image as ImageIcon } from "lucide-react";

const solutions = [
  {
    id: 1,
    title: "Digital Products",
    description: "Sites e apps focados em conversão.",
    icon: Globe,
  },
  {
    id: 2,
    title: "Visual Identity",
    description: "Marcas com propósito e presença.",
    icon: PenTool,
  },
  {
    id: 3,
    title: "Art Direction",
    description: "Conceitos visuais para campanhas.",
    icon: ImageIcon,
  },
];

export function Solutions() {
  return (
    <section id="solutions" className="py-24 md:py-32 px-6 relative overflow-hidden">
      {/* Subtler Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
           <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-medium tracking-tight"
          >
            Minhas Soluções
          </motion.h2>
          <p className="text-lg text-muted-foreground font-light max-w-xs text-right hidden md:block">
            Abordagem estratégica para resolver problemas de negócios.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <SolutionCard key={solution.id} solution={solution} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionCard({ solution, index }: { solution: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative p-8 rounded-xl border border-white/5 bg-zinc-900/20 hover:bg-zinc-900/40 transition-all duration-500 flex flex-col"
    >
      <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-primary group-hover:scale-110 transition-all duration-300 mb-8">
        <solution.icon size={24} />
      </div>
      
      <h3 className="text-xl font-medium mb-4 group-hover:text-white transition-colors">{solution.title}</h3>
      <p className="text-lg text-muted-foreground leading-relaxed group-hover:text-zinc-400 transition-colors font-light">
        {solution.description}
      </p>
    </motion.div>
  );
}
