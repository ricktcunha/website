"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    id: 1,
    title: "Neon Finance",
    category: "Fintech / UI Design",
    description: "A futuristic dashboard for a next-gen crypto exchange.",
    color: "from-purple-500 to-blue-500",
  },
  {
    id: 2,
    title: "Aero Space",
    category: "3D / Development",
    description: "Immersive 3D experience for an aerospace startup.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    title: "Luxe Estate",
    category: "Real Estate / Branding",
    description: "Premium property showcase with fluid animations.",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: 4,
    title: "Cyber Punk",
    category: "Gaming / WebGL",
    description: "WebGL-powered landing page for a sci-fi game.",
    color: "from-pink-500 to-rose-500",
  },
];

export function Projects() {
  return (
    <section id="work" className="py-24 md:py-32 px-6">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-16 text-center"
        >
          Selected <span className="text-primary">Works</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const parallaxY = index % 2 === 0 ? y : useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <motion.div
      ref={ref}
      style={{ y: index % 2 !== 0 ? parallaxY : 0 }} // Apply parallax mainly to staggered column or adjust logic
      className="group relative"
    >
      <div className="aspect-[4/3] bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 relative mb-6">
         <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
         <div className="absolute inset-0 flex items-center justify-center text-white/20 text-4xl font-bold uppercase tracking-widest group-hover:scale-110 transition-transform duration-700">
           {project.title}
         </div>
      </div>
      
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
          <p className="text-muted-foreground">{project.description}</p>
        </div>
        <span className="text-xs border border-white/10 px-3 py-1 rounded-full bg-white/5">
          {project.category}
        </span>
      </div>
    </motion.div>
  );
}

