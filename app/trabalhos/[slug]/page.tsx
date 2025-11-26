import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/lib/projects-data";
import { BrandGallery } from "@/components/project/brand-gallery";
import { SitePreview } from "@/components/project/site-preview";
import { ds } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { ScrollToTop } from "@/components/scroll-to-top";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjetoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const isDesignProject =
    project.category === "Design de Marcas" ||
    project.category === "Campanhas - Postagens" ||
    project.category === "Campanhas - KV's";

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen bg-black pt-8 md:pt-32 pb-24 px-6">
      <div className={cn("container mx-auto px-6", ds.spacing.containerMaxWidth)}>
        {/* Breadcrumb */}
        <Link
          href="/trabalhos"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Voltar para Trabalhos
        </Link>

        {/* Project Header */}
        <div className="mb-16 max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-medium uppercase tracking-wider">
              {project.category}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white tracking-tighter leading-tight mb-6">
            {project.title}
          </h1>

          <p className="text-xl text-zinc-400 font-light leading-relaxed mb-8">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-sm font-light"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Conditional Content */}
        <div className="mt-16">
          {isDesignProject && project.images ? (
            <BrandGallery 
              images={project.images} 
              title={project.title}
              category={project.category as "Design de Marcas" | "Campanhas - Postagens" | "Campanhas - KV's"}
            />
          ) : project.siteUrl && project.siteImage ? (
            <SitePreview
              siteUrl={project.siteUrl}
              siteImage={project.siteImage}
              title={project.title}
              description={project.description}
            />
          ) : (
            <div className="text-center py-20">
              <p className="text-zinc-500">Conteúdo em breve...</p>
            </div>
          )}
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}
