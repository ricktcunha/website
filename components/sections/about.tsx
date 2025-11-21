"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-black/20">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-[400px_1fr] gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[3/4] w-full relative rounded-xl overflow-hidden border border-white/5 group">
              <Image
                src="/rick-avatar.png"
                alt="Rick Cunha"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-medium mb-8 tracking-tight leading-tight">
              Híbrido entre <br />
              <span className="text-zinc-500">Design & Code.</span>
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground font-light leading-relaxed max-w-2xl">
              <p>
                Meu trabalho reside na interseção onde a estética visual encontra a precisão técnica. Não apenas desenho interfaces; construo sistemas que funcionam.
              </p>
              <p>
                Com background em desenvolvimento Front-End e paixão por UI Design, garanto que cada pixel planejado seja executado com performance e fidelidade.
              </p>
            </div>

            <div className="flex gap-12 mt-12 border-t border-white/5 pt-8">
              <div>
                <h3 className="text-3xl font-light text-white mb-1">05+</h3>
                <p className="text-xs text-zinc-500 uppercase tracking-[0.2em]">Anos</p>
              </div>
              <div>
                <h3 className="text-3xl font-light text-white mb-1">50+</h3>
                <p className="text-xs text-zinc-500 uppercase tracking-[0.2em]">Projetos</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
