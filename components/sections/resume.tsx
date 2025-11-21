"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

const experiences = [
  {
    id: 1,
    role: "Senior Front-End Developer",
    company: "Tech Solutions Inc.",
    period: "2022 - Presente",
    description: "Liderando a equipe de desenvolvimento front-end, implementando arquitetura moderna com Next.js e melhorando a performance do core product em 40%.",
  },
  {
    id: 2,
    role: "UI/UX Designer & Developer",
    company: "Creative Agency",
    period: "2019 - 2022",
    description: "Responsável pelo design e implementação de sites para clientes internacionais, focando em micro-interações e design systems.",
  },
  {
    id: 3,
    role: "Freelance Full-Stack",
    company: "Autônomo",
    period: "2017 - 2019",
    description: "Desenvolvimento de soluções web completas para startups e pequenas empresas, do backend ao frontend.",
  },
];

export function Resume() {
  return (
    <section id="resume" className="py-24 md:py-32 px-6 bg-zinc-950/30 relative overflow-hidden">
      {/* Decorative BG */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Currículo <span className="text-primary">Profissional</span>
            </h2>
            <p className="text-muted-foreground">
              Uma breve jornada pela minha carreira e formação.
            </p>
          </motion.div>
          
          {/* Botão de Download removido conforme solicitado */}
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Center Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/10 to-transparent -translate-x-1/2" />
          
          {/* Left Line (Mobile) */}
          <div className="md:hidden absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/10 to-transparent" />

          <div className="space-y-12 md:space-y-0">
            {experiences.map((exp, index) => (
              <TimelineItem key={exp.id} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ exp, index }: { exp: any; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div className={cn(
      "relative flex flex-col md:flex-row items-start md:items-center",
      isEven ? "md:flex-row-reverse" : ""
    )}>
      
      {/* Mobile Dot */}
      <div className="md:hidden absolute left-5 -translate-x-1/2 w-10 h-10 flex items-center justify-center z-10">
         <div className="w-3 h-3 bg-primary rounded-full ring-4 ring-black" />
      </div>

      {/* Spacer for other side (Desktop) */}
      <div className="hidden md:block flex-1" />

      {/* Center Icon (Desktop) */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 items-center justify-center z-10">
        <div className="w-10 h-10 rounded-full bg-zinc-900 border border-primary/30 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)]">
          <Briefcase size={16} className="text-primary" />
        </div>
      </div>

      {/* Content Card */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.2 }}
        className={cn(
          "flex-1 ml-12 md:ml-0", // Mobile left margin
          isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
        )}
      >
        <div className={cn(
          "p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all group relative",
          "before:absolute before:top-6 before:w-4 before:h-4 before:rotate-45 before:bg-white/5 before:border-l before:border-t before:border-white/5",
          isEven 
            ? "md:before:-right-2 md:before:left-auto md:before:border-r md:before:border-t-0 md:before:border-l-0 md:before:border-b before:-left-2" // Desktop Even: Arrow Right
            : "before:-left-2" // Desktop Odd & Mobile: Arrow Left
        )}>
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{exp.role}</h3>
          <div className={cn(
            "flex flex-wrap gap-2 items-center mb-4 text-sm text-muted-foreground",
            isEven ? "md:justify-end" : "justify-start"
          )}>
            <span className="font-semibold text-zinc-300">{exp.company}</span>
            <span>•</span>
            <span>{exp.period}</span>
          </div>
          <p className="text-muted-foreground leading-relaxed text-sm">
            {exp.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
