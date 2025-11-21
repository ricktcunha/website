"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    id: "01",
    title: "Discovery",
    description: "Understanding the core problems and defining clear objectives.",
  },
  {
    id: "02",
    title: "Strategy",
    description: "Planning the user experience and technical architecture.",
  },
  {
    id: "03",
    title: "Design",
    description: "Crafting visual systems and interactive prototypes.",
  },
  {
    id: "04",
    title: "Development",
    description: "Writing clean, performant code with modern technologies.",
  },
  {
    id: "05",
    title: "Launch",
    description: "Testing, optimization, and deployment to production.",
  },
];

export function Process() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-20 pl-20">
           <div className="flex-shrink-0 w-[400px] flex flex-col justify-center">
             <h2 className="text-5xl font-bold mb-6">
               My <br/> <span className="text-primary">Process</span>
             </h2>
             <p className="text-muted-foreground text-lg">
               A systematic approach to solving complex problems and delivering exceptional results.
             </p>
           </div>
          {steps.map((step) => (
            <div
              key={step.id}
              className="group relative h-[400px] w-[400px] flex-shrink-0 flex flex-col justify-between p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <span className="text-8xl font-bold text-white/5 group-hover:text-primary/20 transition-colors">
                {step.id}
              </span>
              <div>
                <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground text-lg">{step.description}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

