import { Project } from "./projects-data";

/**
 * Função que retorna as imagens de um projeto baseado no slug e categoria
 * Constrói os caminhos esperados baseados na estrutura de pastas padronizada
 */
export function getProjectImages(
  slug: string,
  category: Project["category"]
): string[] {
  // Se for Website: retornar array vazio (não tem galeria)
  if (category === "Desenvolvedor Front-End") {
    return [];
  }

  // Branding: até 8 imagens (01.webp a 08.webp)
  if (category === "Design de Marcas") {
    const images: string[] = [];
    for (let i = 1; i <= 8; i++) {
      const num = i.toString().padStart(2, "0");
      images.push(`/images/trabalhos/branding/${slug}/${num}.webp`);
    }
    return images;
  }

  // Postagens: até 39 imagens (01.webp a 39.webp)
  if (category === "Campanhas - Postagens") {
    const images: string[] = [];
    for (let i = 1; i <= 39; i++) {
      const num = i.toString().padStart(2, "0");
      images.push(`/images/trabalhos/campanhas/postagens/${num}.webp`);
    }
    return images;
  }

  // KV's: até 20 imagens (01.webp a 20.webp)
  if (category === "Campanhas - KV's") {
    const images: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const num = i.toString().padStart(2, "0");
      images.push(`/images/trabalhos/campanhas/kvs/${num}.webp`);
    }
    return images;
  }

  return [];
}

/**
 * Função específica para campanhas (retorna todas as imagens da pasta)
 * Por enquanto, retorna array vazio
 */
export function getCampanhaImages(type: "postagens" | "kvs"): string[] {
  // Retornar array vazio por enquanto
  // As imagens serão definidas manualmente nos projetos
  return [];
}

/**
 * Função auxiliar para construir caminhos de imagens dinamicamente
 * Útil para gerar caminhos esperados baseados na estrutura de pastas
 */
export function buildImagePaths(
  slug: string,
  category: Project["category"],
  maxImages: number = 8
): string[] {
  // Websites não têm galeria
  if (category === "Desenvolvedor Front-End") {
    return [];
  }

  const paths: string[] = [];

  // Branding: até 8 imagens
  if (category === "Design de Marcas") {
    for (let i = 1; i <= maxImages; i++) {
      const num = i.toString().padStart(2, "0");
      paths.push(`/images/trabalhos/branding/${slug}/${num}.webp`);
    }
  }

  // Postagens: até 39 imagens
  if (category === "Campanhas - Postagens") {
    for (let i = 1; i <= 39; i++) {
      const num = i.toString().padStart(2, "0");
      paths.push(`/images/trabalhos/campanhas/postagens/${num}.webp`);
    }
  }

  // KV's: até 20 imagens
  if (category === "Campanhas - KV's") {
    for (let i = 1; i <= 20; i++) {
      const num = i.toString().padStart(2, "0");
      paths.push(`/images/trabalhos/campanhas/kvs/${num}.webp`);
    }
  }

  return paths;
}

