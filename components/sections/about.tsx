"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ds } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-black/20">
      <div className={cn("container mx-auto", ds.spacing.containerMaxWidth)}>
        <div className="grid md:grid-cols-[400px_1fr] gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div 
              className="aspect-[3/4] w-full relative rounded-xl group photo-animated-stroke"
              style={{
                padding: '3px',
                background: 'linear-gradient(#000000, #000000) padding-box, linear-gradient(45deg, #ff6f61, #ff7f71, #9f6fff, #7f5fff, #6f61ff, #6f8fff, #61cfff, #61ff9f, #61ff7f, #61ff6f, #6fff8f, #7fff9f, #6f8fff, #6f61ff, #7f5fff, #9f6fff, #ff6f61) border-box',
                WebkitBackgroundClip: 'padding-box, border-box',
                backgroundClip: 'padding-box, border-box',
                backgroundSize: '500% 500%',
                border: '1px solid transparent',
                animation: 'photo-stroke-animate 10s cubic-bezier(0.4, 0, 0.2, 1) infinite',
              } as React.CSSProperties}
            >
              <div className="w-full h-full relative rounded-[calc(0.75rem-3px)] overflow-hidden bg-black">
                <Image
                  src="/rick-avatar.png"
                  alt="Rick Cunha"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-purple-900/10 to-transparent opacity-60" />
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

            <div className="flex gap-16 mt-16 border-t border-purple-500/10 pt-10">
              <div>
                <h3 className="text-5xl font-extralight text-white mb-2">05+</h3>
                <p className="text-xs text-purple-500/80 uppercase tracking-[0.2em] font-medium">Anos</p>
              </div>
              <div>
                <h3 className="text-5xl font-extralight text-white mb-2">50+</h3>
                <p className="text-xs text-purple-500/80 uppercase tracking-[0.2em] font-medium">Projetos</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
