"use client";

import React from "react";
import { motion } from "framer-motion";
import { ds } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

// Componente para renderizar ícones customizados
const CustomIcon = ({ name, className }: { name: string; className?: string }) => {
  const icons: Record<string, React.ReactElement> = {
    "Photoshop": (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M12.5 0C5.596 0 0 5.596 0 12.5S5.596 25 12.5 25 25 19.404 25 12.5 19.404 0 12.5 0zm0 23C6.71 23 2 18.29 2 12.5S6.71 2 12.5 2 23 6.71 23 12.5 18.29 23 12.5 23z" fill="#31A8FF"/>
        <path d="M8.5 7.5h4c2.5 0 4 1.5 4 4s-1.5 4-4 4h-2v3h-2v-11zm2 2v6h2c1.5 0 2-1 2-3s-.5-3-2-3h-2z" fill="#31A8FF"/>
      </svg>
    ),
    "Illustrator": (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M12.5 0C5.596 0 0 5.596 0 12.5S5.596 25 12.5 25 25 19.404 25 12.5 19.404 0 12.5 0zm0 23C6.71 23 2 18.29 2 12.5S6.71 2 12.5 2 23 6.71 23 12.5 18.29 23 12.5 23z" fill="#FF9A00"/>
        <path d="M8 7.5h2v11H8v-11zm3 0h2l2.5 5.5L18.5 7.5h2v11h-2v-6.5l-2.5 5h-1.5l-2.5-5v6.5h-2v-11z" fill="#FF9A00"/>
      </svg>
    ),
    "After Effects": (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M12.5 0C5.596 0 0 5.596 0 12.5S5.596 25 12.5 25 25 19.404 25 12.5 19.404 0 12.5 0zm0 23C6.71 23 2 18.29 2 12.5S6.71 2 12.5 2 23 6.71 23 12.5 18.29 23 12.5 23z" fill="#9999FF"/>
        <path d="M7.5 7.5h2v11h-2v-11zm4 0h2l3 5.5-3 5.5h-2v-11zm2 2v6l1.5-3-1.5-3z" fill="#9999FF"/>
      </svg>
    ),
    "Premiere Pro": (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M12.5 0C5.596 0 0 5.596 0 12.5S5.596 25 12.5 25 25 19.404 25 12.5 19.404 0 12.5 0zm0 23C6.71 23 2 18.29 2 12.5S6.71 2 12.5 2 23 6.71 23 12.5 18.29 23 12.5 23z" fill="#9999FF"/>
        <path d="M8 7.5h2v11H8v-11zm4 0h3.5c2 0 3.5 1.5 3.5 3.5s-1.5 3.5-3.5 3.5h-1.5v4h-2v-11zm2 2v3h1.5c.5 0 1-.5 1-1.5s-.5-1.5-1-1.5h-1.5z" fill="#9999FF"/>
      </svg>
    ),
    "Adobe XD": (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M12.5 0C5.596 0 0 5.596 0 12.5S5.596 25 12.5 25 25 19.404 25 12.5 19.404 0 12.5 0zm0 23C6.71 23 2 18.29 2 12.5S6.71 2 12.5 2 23 6.71 23 12.5 18.29 23 12.5 23z" fill="#FF61F6"/>
        <path d="M8 7.5h2l2 3.5 2-3.5h2v11h-2v-5.5l-2 3.5h-1l-2-3.5v5.5H8v-11z" fill="#FF61F6"/>
      </svg>
    ),
  };

  return icons[name] || null;
};

// Tech Stack Icons Data
const techStack = [
  // Frontend
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB", category: "frontend", useCustom: false },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/FFFFFF", category: "frontend", useCustom: false },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6", category: "frontend", useCustom: false },
  { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4", category: "frontend", useCustom: false },
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E", category: "frontend", useCustom: false },
  { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/E34F26", category: "frontend", useCustom: false },
  { name: "CSS3", icon: "https://cdn.simpleicons.org/css3/1572B6", category: "frontend", useCustom: false },
  
  // Animation & 3D
  { name: "Framer", icon: "https://cdn.simpleicons.org/framer/0055FF", category: "animation", useCustom: false },
  { name: "Three.js", icon: "https://cdn.simpleicons.org/threedotjs/FFFFFF", category: "animation", useCustom: false },
  { name: "GSAP", icon: "https://cdn.simpleicons.org/greensock/88CE02", category: "animation", useCustom: false },
  
  // Design Tools - Usando custom icons para Adobe
  { name: "Figma", icon: "https://cdn.simpleicons.org/figma/F24E1E", category: "design", useCustom: false },
  { name: "Adobe XD", icon: "", category: "design", useCustom: true },
  { name: "Photoshop", icon: "", category: "design", useCustom: true },
  { name: "Illustrator", icon: "", category: "design", useCustom: true },
  { name: "After Effects", icon: "", category: "design", useCustom: true },
  { name: "Premiere Pro", icon: "", category: "design", useCustom: true },
  
  // Tools & Platform
  { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032", category: "tools", useCustom: false },
  { name: "GitHub", icon: "https://cdn.simpleicons.org/github/FFFFFF", category: "tools", useCustom: false },
  { name: "VS Code", icon: "https://cdn.simpleicons.org/visualstudiocode/007ACC", category: "tools", useCustom: false },
  { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/FFFFFF", category: "tools", useCustom: false },
  { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase/FFCA28", category: "tools", useCustom: false },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933", category: "tools", useCustom: false },
];

// Duplicate array for infinite scroll
const infiniteScroll = [...techStack, ...techStack];

export function Skills() {
  return (
    <section id="skills" className="py-32 md:py-40 relative overflow-hidden bg-black/50">
      
      <div className={cn("container mx-auto px-6 mb-20", ds.spacing.containerMaxWidth)}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <p className="text-xs text-purple-500/80 mb-4 uppercase tracking-[0.2em] font-light">Tecnologias</p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white tracking-tighter leading-tight mb-6">
            Tech <span className="text-transparent bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text italic font-serif font-light">Stack</span>
          </h2>
          <p className="text-base md:text-lg text-zinc-500 font-light leading-relaxed">
            Ferramentas e tecnologias que uso para criar experiências digitais modernas, performáticas e visualmente impactantes.
          </p>
        </motion.div>
      </div>

      {/* Infinite Scrolling Tech Icons */}
      <div className="relative w-full overflow-hidden py-12">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

        {/* Scrolling Row 1 - Left to Right */}
        <motion.div
          animate={{
            x: [0, -50 * techStack.length],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
          className="flex gap-12 mb-12"
        >
          {infiniteScroll.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex-shrink-0 group"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:border-purple-500/50 group-hover:bg-zinc-800/50 group-hover:scale-110">
                <div className="relative w-8 h-8 md:w-10 md:h-10 grayscale group-hover:grayscale-0 transition-all duration-300">
                  {tech.useCustom ? (
                    <CustomIcon name={tech.name} className="w-full h-full" />
                  ) : (
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  )}
                </div>
              </div>
              <p className="text-[10px] text-zinc-600 text-center mt-3 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                {tech.name}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Scrolling Row 2 - Right to Left */}
        <motion.div
          animate={{
            x: [-50 * techStack.length, 0],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 45,
              ease: "linear",
            },
          }}
          className="flex gap-12"
        >
          {infiniteScroll.map((tech, index) => (
            <div
              key={`${tech.name}-reverse-${index}`}
              className="flex-shrink-0 group"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:border-purple-500/50 group-hover:bg-zinc-800/50 group-hover:scale-110">
                <div className="relative w-8 h-8 md:w-10 md:h-10 grayscale group-hover:grayscale-0 transition-all duration-300">
                  {tech.useCustom ? (
                    <CustomIcon name={tech.name} className="w-full h-full" />
                  ) : (
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  )}
                </div>
              </div>
              <p className="text-[10px] text-zinc-600 text-center mt-3 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                {tech.name}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
