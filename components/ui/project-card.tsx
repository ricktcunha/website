"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/lib/projects-data";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
  // Mobile interação de dois toques
  expanded?: boolean;
  onExpand?: (projectId: string) => void;
  onNavigate?: (slug: string) => void;
  // Variante para diferentes comportamentos (home vs trabalhos)
  variant?: "default" | "compact";
}

export function ProjectCard({
  project,
  index,
  expanded = false,
  onExpand,
  onNavigate,
  variant = "default",
}: ProjectCardProps) {
  const router = useRouter();

  const categoryLabel =
    project.category === "Desenvolvedor Front-End"
      ? "WEBSITES"
      : project.category === "Design de Marcas"
      ? "BRANDING"
      : project.category === "Campanhas - Postagens"
      ? "POSTAGENS"
      : project.category === "Campanhas - KV's"
      ? "KV'S"
      : "BRANDING";

  const handleMobileExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onExpand && !expanded) {
      onExpand(project.id);
    }
  };

  const handleMobileNavigate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (expanded) {
      if (onNavigate) {
        onNavigate(project.slug);
      } else {
        router.push(`/trabalhos/${project.slug}`);
      }
    }
  };

  return (
    <>
      {/* Desktop: Link direto */}
      <Link
        href={`/trabalhos/${project.slug}`}
        className="hidden md:block group relative"
      >
        <div className="relative h-[500px] w-full bg-black border border-white/10 rounded-3xl transition-all duration-700 ease-out overflow-hidden group-hover:border-purple-500/30">
          {/* Thumbnail Image Background - Sem filtro por padrão */}
          <div className="absolute inset-0">
            {project.thumbnail.endsWith('.svg') ? (
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-contain p-16 transition-all duration-700"
              />
            ) : (
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover transition-all duration-700"
                sizes="(max-width: 1200px) 100vw, 50vw"
                priority={index < 2}
              />
            )}
            {/* Filtro escuro só aparece no hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>

          {/* Content Container - Desktop hover */}
          <div className="absolute inset-0 p-16 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75 group-hover:translate-y-0 translate-y-4">
            {/* Top Info */}
            <div className="flex justify-between items-start z-10">
              <span className="text-xs font-medium tracking-widest text-zinc-400 uppercase">
                {categoryLabel}
              </span>
              <span className="text-xs font-medium text-zinc-500">
                {project.year}
              </span>
            </div>

            {/* Bottom Info */}
            <div className="z-10">
              <h3 className="text-5xl md:text-7xl font-medium text-white mb-6">
                {project.title}
              </h3>
              <p className="text-zinc-400 text-lg mb-8 line-clamp-2 max-w-2xl font-light">
                {project.description}
              </p>

              <div className="flex items-center justify-between border-t border-white/10 pt-8">
                <div className="flex gap-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium uppercase tracking-wider text-zinc-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Mobile: Card com interação de dois toques */}
      <div
          className={cn(
          "md:hidden group relative w-full bg-black border border-white/10 rounded-3xl transition-all duration-700 ease-out overflow-hidden",
          expanded ? "border-purple-500/30" : "h-[280px]"
        )}
        style={{
          height: expanded ? "auto" : "280px",
        }}
      >
        {/* Thumbnail Image Background - Mobile - Sem filtro por padrão */}
        <div className="absolute inset-0 z-0">
          {project.thumbnail.endsWith('.svg') ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-contain p-8 transition-all duration-700"
            />
          ) : (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover transition-all duration-700"
              sizes="100vw"
            />
          )}
          {/* Filtro escuro só aparece quando expandido */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50 transition-opacity duration-700",
            expanded ? "opacity-100" : "opacity-0"
          )} />
        </div>

        {/* Clickable overlay - Primeiro toque: expande, Segundo toque: navega */}
        {!expanded ? (
          // Primeiro toque: expande o card
          <div
            className="absolute inset-0 z-20 cursor-pointer"
            onClick={handleMobileExpand}
          />
        ) : (
          // Segundo toque: navega para o projeto (qualquer lugar do card)
          <div
            className="absolute inset-0 z-20 cursor-pointer"
            onClick={handleMobileNavigate}
          />
        )}

        {/* Content Container - Mobile: visible quando expandido */}
        <div
          className={cn(
            "p-6 flex flex-col justify-between transition-all duration-500 relative z-10",
            expanded
              ? "opacity-100 translate-y-0"
              : "absolute inset-0 opacity-0 translate-y-4"
          )}
        >
          {/* Top Info */}
          <div className="flex justify-between items-start mb-4">
            <span className="text-[11px] font-medium tracking-widest text-zinc-400 uppercase">
              {categoryLabel}
            </span>
            <span className="text-[11px] font-medium text-zinc-500">
              {project.year}
            </span>
          </div>

          {/* Bottom Info */}
          <div className="flex-1 flex flex-col justify-end">
            <h3 className="text-3xl font-medium text-white mb-3 leading-tight">
              {project.title}
            </h3>
            <p className="text-sm text-zinc-400 mb-4 line-clamp-2 max-w-2xl font-light leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-4">
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium uppercase tracking-wider text-zinc-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Ícone visual (não clicável, apenas decorativo) */}
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center shrink-0 bg-white/5 pointer-events-none">
                <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

