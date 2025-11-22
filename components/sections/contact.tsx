"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-tokens";
import { RainbowButton } from "@/components/ui/rainbow-button";

export function Contact() {
  return (
    <section id="contact" className="py-32 md:py-40 bg-black relative">
      <div className={cn("container mx-auto px-6", ds.spacing.containerMaxWidth)}>

        <div className="max-w-3xl">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <p className="text-xs text-purple-500/80 mb-4 uppercase tracking-[0.2em] font-light">Vamos conversar</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white tracking-tighter leading-tight mb-6">
              Entre em <span className="text-transparent bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text italic font-serif font-light">Contato</span>
            </h2>
            <p className="text-base md:text-lg text-zinc-500 font-light leading-relaxed">
              Procurando um designer e desenvolvedor para dar vida ao seu projeto? Adoraria conversar sobre sua ideia. Atualmente aceitando novos projetos para 2025.
            </p>
          </motion.div>

          {/* Contact Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <RainbowButton
              className="rounded-full px-8 py-4 h-auto text-sm font-medium"
              onClick={() => window.location.href = "mailto:ricktcunha@gmail.com"}
            >
              Enviar mensagem
            </RainbowButton>
            <button
              onClick={() => navigator.clipboard.writeText('ricktcunha@gmail.com')}
              className="inline-flex items-center justify-center px-8 py-4 border border-white/10 text-white rounded-full text-sm font-light hover:bg-white/5 transition-colors"
            >
              Copiar e-mail
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
