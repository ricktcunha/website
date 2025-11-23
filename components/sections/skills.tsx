"use client";

import React from "react";
import { motion } from "framer-motion";
import { ds } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiJavascript, SiHtml5, SiCss3,
  SiFramer, SiThreedotjs, SiGreensock,
  SiFigma, SiAdobexd, SiAdobephotoshop, SiAdobeillustrator, SiAdobeaftereffects, SiAdobepremierepro,
  SiGit, SiGithub, SiVercel, SiFirebase, SiNodedotjs
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";

// Tech Stack Icons Data
const techStack = [
  // Frontend
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", Icon: SiCss3, color: "#1572B6" },

  // Animation & 3D
  { name: "Framer", Icon: SiFramer, color: "#0055FF" },
  { name: "Three.js", Icon: SiThreedotjs, color: "#FFFFFF" },
  { name: "GSAP", Icon: SiGreensock, color: "#88CE02" },

  // Design Tools
  { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
  { name: "Adobe XD", Icon: SiAdobexd, color: "#FF61F6" },
  { name: "Photoshop", Icon: SiAdobephotoshop, color: "#31A8FF" },
  { name: "Illustrator", Icon: SiAdobeillustrator, color: "#FF9A00" },
  { name: "After Effects", Icon: SiAdobeaftereffects, color: "#9999FF" },
  { name: "Premiere Pro", Icon: SiAdobepremierepro, color: "#9999FF" },

  // Tools & Platform
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "GitHub", Icon: SiGithub, color: "#FFFFFF" },
  { name: "VS Code", Icon: VscCode, color: "#007ACC" },
  { name: "Vercel", Icon: SiVercel, color: "#FFFFFF" },
  { name: "Firebase", Icon: SiFirebase, color: "#FFCA28" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
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
            Stack <span className="text-transparent bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text italic font-serif font-light">Tecnológico</span>
          </h2>
          <p className="text-base md:text-lg text-zinc-500 font-light leading-relaxed">
            Ferramentas e tecnologias que uso para criar experiências digitais modernas, performáticas e visualmente impactantes.
          </p>
        </motion.div>
      </div>

      {/* Infinite Scrolling Tech Icons */}
      <div className="relative w-full overflow-hidden py-12">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 lg:w-64 xl:w-80 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 lg:w-64 xl:w-80 bg-gradient-to-l from-black to-transparent z-10" />

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
                <div className="relative w-8 h-8 md:w-10 md:h-10 transition-all duration-300">
                  <tech.Icon
                    className="w-full h-full text-zinc-500 group-hover:text-[var(--tech-color)] transition-colors duration-300"
                    style={{ '--tech-color': tech.color } as React.CSSProperties}
                  />
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
                <div className="relative w-8 h-8 md:w-10 md:h-10 transition-all duration-300">
                  <tech.Icon
                    className="w-full h-full text-zinc-500 group-hover:text-[var(--tech-color)] transition-colors duration-300"
                    style={{ '--tech-color': tech.color } as React.CSSProperties}
                  />
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
