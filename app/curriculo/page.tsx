"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-tokens";
import { ExternalLink } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { useEffect } from "react";

export default function CurriculoPage() {
  // Garantir que a página sempre comece no topo ao carregar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Se não há hash, rolar para o topo
      if (!window.location.hash) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-visible pt-8 md:pt-32 pb-20">
          <div className={cn("container mx-auto px-6", ds.spacing.containerMaxWidth)}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left - Text Content */}
              <div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                  <p className="text-xs text-purple-500/80 mb-4 uppercase tracking-[0.2em] font-light">Currículo Profissional</p>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white tracking-tighter leading-tight mb-6">
                    Web Developer, UX/UI, Motion, Graphic &amp; <span className="text-transparent bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text italic font-serif font-light">Brand Designer</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-zinc-400 font-extralight leading-relaxed">Construindo Pontes Digitais, Pixel a Pixel.</p>
                </motion.div>
              </div>
              {/* Right - Profile Photo */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.8, delay: 0.2 }} 
                className="flex justify-center lg:justify-end"
              >
                <div className="relative h-full w-full max-w-full sm:max-w-[320px] md:max-w-[420px] max-h-[320px] sm:max-h-[420px] aspect-square mx-auto lg:mx-0">
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
                          src="/images/assets/avatar/rick-avatar.png"
                          alt="Rick - Profile Photo"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 420px"
                          priority
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-purple-900/10 to-transparent opacity-60 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-32 bg-black relative">
          <div className={cn("container mx-auto px-6", ds.spacing.containerMaxWidth)}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-4xl">
              <p className="text-xs text-purple-500/80 mb-4 uppercase tracking-[0.2em] font-light">Sobre</p>
              <h2 className="text-4xl md:text-5xl font-extralight text-white tracking-tighter leading-tight mb-8">
                Olá! Sou o <span className="text-transparent bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text italic font-serif font-light">Rick</span>
              </h2>
              <div className="space-y-6 text-base md:text-lg text-zinc-400 font-light leading-relaxed">
                <p>Graduado em Publicidade e formando em Análise e Desenvolvimento de Sistemas. Sou extremamente dedicado e, ao longo da minha trajetória, adquiri experiência significativa em agências importantes do Sul de Minas, o que me proporcionou uma visão prática e aprofundada do mercado.</p>
                <p>Atualmente, estudo HTML, CSS, JavaScript e outras tecnologias para aprimorar minhas habilidades em desenvolvimento front-end. Além disso, tenho experiência com design gráfico, desenvolvendo materiais online e offline, e também com design de marcas, criando identidades visuais estratégicas. Possuo habilidades em motion design e edição de vídeo, sempre buscando equilibrar funcionalidade e estética em cada projeto.</p>
                <p>Meu processo de aprendizado contínuo é guiado pelo desejo de evoluir constantemente, buscando novos desafios e oportunidades para crescer profissionalmente.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Education Section */}
        <section className="py-32 bg-zinc-950/50 relative">
          <div className={cn("container mx-auto px-6", ds.spacing.containerMaxWidth)}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <p className="text-xs text-purple-500/80 mb-4 uppercase tracking-[0.2em] font-light">Formação</p>
              <h2 className="text-4xl md:text-5xl font-extralight text-white tracking-tighter leading-tight mb-12">
                Educação <span className="text-transparent bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text italic font-serif font-light">Acadêmica</span>
              </h2>
              <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed mb-16 max-w-3xl">
                Formado em Publicidade, atualmente estou imerso na graduação de Análise e Desenvolvimento de Sistemas, onde venho aprimorando minhas habilidades e minha compreensão dos fundamentos do desenvolvimento front-end.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Publicidade */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                  <h3 className="text-2xl font-medium text-white mb-2">Publicidade &amp; Propaganda</h3>
                  <p className="text-purple-400 mb-4">Bacharel - UNIVÁS</p>
                </motion.div>
                {/* ADS */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                  <h3 className="text-2xl font-medium text-white mb-2">Análise e Desenvolvimento de Sistemas</h3>
                  <p className="text-purple-400 mb-4">Tecnólogo - Descomplica</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Certificates Section */}
        <section className="py-32 bg-black relative">
          <div className={cn("container mx-auto px-6", ds.spacing.containerMaxWidth)}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <p className="text-xs text-purple-500/80 mb-4 uppercase tracking-[0.2em] font-light">Certificados</p>
              <h2 className="text-4xl md:text-5xl font-extralight text-white tracking-tighter leading-tight mb-12">
                Aprendizado <span className="text-transparent bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text italic font-serif font-light">Contínuo</span>
              </h2>
              <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed mb-16 max-w-3xl">
                Comprometido com aprendizado contínuo, busco aprimorar minhas habilidades constantemente. Meu objetivo é manter-me atualizado e contribuir significativamente em projetos desafiadores.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[{ title: "UI Design", description: "UI Design para iniciantes com carga horário de 17h, pela plataforma Origamid." }, { title: "HTML e CSS", description: "HTML e CSS para iniciantes com carga horário de 23h, pela plataforma Origamid." }, { title: "CSS Flexbox", description: "CSS Flexbox com carga horário de 3 horas, pela plataforma Origamid." }, { title: "CSS Grid Layout", description: "CSS Grid Layout com carga horário de 5 horas, pela plataforma Origamid." }].map((cert, index) => (
                  <motion.div key={cert.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                    <h3 className="text-xl font-medium text-white mb-3">{cert.title}</h3>
                    <p className="text-sm text-zinc-400 font-light">{cert.description}</p>
                  </motion.div>
                ))}
              </div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }} className="mt-12 flex justify-center">
                <Link href="#" className="group inline-flex items-center gap-3 px-8 py-4 border border-white/20 rounded-full text-sm font-medium tracking-widest uppercase text-white hover:bg-white hover:text-black transition-all duration-500 hover:border-white">
                  Ver certificados
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-32 bg-zinc-950/50 relative">
          <div className={cn("container mx-auto px-6", ds.spacing.containerMaxWidth)}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <p className="text-xs text-purple-500/80 mb-4 uppercase tracking-[0.2em] font-light">Experiência Profissional</p>
              <h2 className="text-4xl md:text-5xl font-extralight text-white tracking-tighter leading-tight mb-16">
                Trajetória <span className="text-transparent bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text italic font-serif font-light">Profissional</span>
              </h2>
              <div className="space-y-12">
                {/* Zero 35 */}
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative pl-8 border-l-2 border-purple-500/30">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500"></div>
                  <p className="text-sm text-purple-400 mb-2">Maio de 2021 - Abril de 2024</p>
                  <h3 className="text-2xl md:text-3xl font-medium text-white mb-4">Zero 35 Marketing &amp; Negócios</h3>
                  <p className="text-base text-zinc-400 font-light leading-relaxed">
                    Uma sólida experiência de três anos em uma agência de publicidade, onde desempenhei o papel crucial na criação de identidades visuais, produção gráfica e campanhas publicitárias.
                  </p>
                </motion.div>
                {/* Adubos Real */}
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="relative pl-8 border-l-2 border-purple-500/30">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500"></div>
                  <p className="text-sm text-purple-400 mb-2">Abril de 2024 - Até o momento</p>
                  <h3 className="text-2xl md:text-3xl font-medium text-white mb-4">Adubos Real</h3>
                  <p className="text-base text-zinc-400 font-light leading-relaxed">
                    Como analista de marketing, desempenho funções relacionadas a estratégias, criação de campanhas publicitárias, planejamento de eventos e cotação de materiais. Principalmente, sou responsável pela comunicação do grupo Adubos Real, incluindo postagens em redes sociais, vídeos, criação de materiais gráficos e todos os outros materiais visuais necessários.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
