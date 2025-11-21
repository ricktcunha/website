"use client";

import { motion } from "framer-motion";
import { Skills3D } from "@/components/ui/skills-3d";

const skills = [
  { name: "Front-End", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
  { name: "Creative", items: ["Framer Motion", "GSAP", "Three.js", "WebGL"] },
  { name: "Design", items: ["Figma", "UI Systems", "Prototyping"] },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 px-6 relative overflow-hidden">
      <Skills3D />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-medium mb-6 tracking-tight">
              Tech <span className="text-zinc-500">Stack</span>
            </h2>
            <p className="text-lg text-zinc-400 font-light leading-relaxed max-w-sm">
              Um conjunto de ferramentas selecionado para garantir performance, escalabilidade e impacto visual.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-8 md:gap-12">
            {skills.map((category, i) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-6 border-b border-white/10 pb-2">
                  {category.name}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item) => (
                    <li key={item} className="text-lg text-zinc-200 font-light">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
