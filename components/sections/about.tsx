"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ds } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-black/20">
      <div className={cn("container mx-auto px-6", ds.spacing.containerMaxWidth)}>
        <div className="grid md:grid-cols-[400px_1fr] gap-12 md:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[400px] md:h-full w-full"
          >
            <div className="h-full w-full relative rounded-xl group animated-stroke-border">
              <div className="w-full h-full relative rounded-[calc(0.75rem-2px)] overflow-hidden bg-black">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  className="w-full h-full relative"
                >
                  <Image
                    src="/rick-avatar.png"
                    alt="Rick Cunha"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-purple-900/10 to-transparent opacity-60 pointer-events-none" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-xs text-purple-500/80 mb-4 uppercase tracking-[0.2em] font-light">Sobre Mim</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white tracking-tighter leading-tight mb-6">
              Híbrido entre <br />
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text italic font-serif font-light">Design & Code</span>
            </h2>
            <div className="space-y-6 text-xl text-zinc-400 font-light leading-relaxed max-w-2xl">
              <p>
                Meu trabalho reside na interseção onde a estética visual encontra a precisão técnica. Não apenas desenho interfaces; construo sistemas que funcionam.
              </p>
              <p>
                Com background em desenvolvimento Front-End e paixão por UI Design, garanto que cada pixel planejado seja executado com performance e fidelidade.
              </p>
            </div>

            <div className="flex gap-8 md:gap-16 mt-12 md:mt-16 border-t border-purple-500/10 pt-8 md:pt-10">
              <div>
                <h3 className="text-4xl md:text-5xl font-extralight text-white mb-2">05+</h3>
                <p className="text-xs text-purple-500/80 uppercase tracking-[0.2em] font-medium">Anos</p>
              </div>
              <div>
                <h3 className="text-4xl md:text-5xl font-extralight text-white mb-2">50+</h3>
                <p className="text-xs text-purple-500/80 uppercase tracking-[0.2em] font-medium">Projetos</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
