"use client";

import { motion } from "framer-motion";
import { Globe, PenTool, Image as ImageIcon } from "lucide-react";
import { ds } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

const solutions = [
  {
    id: 1,
    title: "Produtos Digitais",
    description: "Sites e apps focados em conversão.",
    icon: Globe,
  },
  {
    id: 2,
    title: "Identidade Visual",
    description: "Marcas com propósito e presença.",
    icon: PenTool,
  },
  {
    id: 3,
    title: "Direção de Arte",
    description: "Conceitos visuais para campanhas.",
    icon: ImageIcon,
  },
];

export function Solutions() {
  return (
    <section id="solutions" className="py-24 md:py-32 bg-black/20">
      <div className={cn("container mx-auto px-6", ds.spacing.containerMaxWidth)}>
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <p className="text-xs text-purple-500/80 mb-4 uppercase tracking-[0.2em] font-light">O Que Ofereço</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white tracking-tighter leading-tight mb-6">
              Minhas <span className="text-transparent bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text italic font-serif font-light">Soluções</span>
            </h2>
            <p className="text-base md:text-lg text-zinc-500 font-light leading-relaxed">
              Abordagem estratégica para resolver problemas de negócios.
            </p>
          </motion.div>
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
      className="group relative p-8 rounded-xl border border-purple-500/10 bg-white/5 hover:bg-purple-500/5 hover:border-purple-500/30 transition-all duration-500 flex flex-col"
    >
      <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:text-purple-300 group-hover:bg-purple-500/20 group-hover:scale-110 transition-all duration-300 mb-8">
        <solution.icon size={24} />
      </div>

      <h3 className="text-2xl font-light mb-4 text-white transition-colors">{solution.title}</h3>
      <p className="text-lg text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors font-light">
        {solution.description}
      </p>
    </motion.div>
  );
}
