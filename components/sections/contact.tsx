"use client";

import { motion } from "framer-motion";

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 px-6 border-t border-white/5">
      <div className="container mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-medium mb-6 tracking-tight">
            Vamos criar algo único.
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Disponível para novos projetos e colaborações. Transforme sua visão em realidade digital.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <a
              href="mailto:contato@ricktavares.com"
              className="px-8 py-3 bg-white text-black rounded-full font-medium text-sm hover:bg-gray-200 transition-colors min-w-[160px]"
            >
              Enviar Email
            </a>
            <a
              href="https://wa.me/5511999999999"
              className="px-8 py-3 border border-white/10 bg-transparent text-white rounded-full font-medium text-sm hover:bg-white/5 transition-colors min-w-[160px]"
            >
              WhatsApp
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-left"
        >
          <div className="space-y-4">
            <h4 className="text-xs text-zinc-500 uppercase tracking-[0.2em]">Contato</h4>
            <p className="text-lg text-zinc-300 font-light">contato@rick.design</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs text-zinc-500 uppercase tracking-[0.2em]">Social</h4>
            <ul className="space-y-2 text-zinc-400 text-lg font-light">
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs text-zinc-500 uppercase tracking-[0.2em]">Serviços</h4>
            <ul className="space-y-2 text-zinc-400 text-lg font-light">
              <li>Web Design</li>
              <li>Front-End</li>
            </ul>
          </div>
           <div className="space-y-4">
            <h4 className="text-xs text-zinc-500 uppercase tracking-[0.2em]">Local</h4>
            <p className="text-lg text-zinc-300 font-light">Brasil (Remote)</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
