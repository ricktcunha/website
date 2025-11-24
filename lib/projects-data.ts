export interface Project {
  id: string;
  title: string;
  category:
    | "Desenvolvedor Front-End"
    | "Design de Marcas"
    | "Campanhas - Postagens"
    | "Campanhas - KV's";
  slug: string;
  thumbnail: string;
  featured: boolean;
  featuredInHome?: boolean; // Novo campo para trabalhos exibidos na home
  description: string;
  year: string;
  tags: string[];

  // Para Design de Marcas e Campanhas
  images?: string[];

  // Para Desenvolvedor Front-End
  siteUrl?: string;
  siteImage?: string;
}

import { getProjectImages } from "./project-images";

// Função para enriquecer projeto com imagens automaticamente
function enrichProjectWithImages(project: Project): Project {
  const images = getProjectImages(project.slug, project.category);
  
  // Se a categoria precisa de images e não foi preenchido, tentar construir os caminhos
  if (
    (project.category === "Design de Marcas" || 
     project.category === "Campanhas - Postagens" || 
     project.category === "Campanhas - KV's") &&
    (!project.images || project.images.length === 0)
  ) {
    // As imagens serão carregadas dinamicamente ou preenchidas no build
    return { ...project, images };
  }
  
  return project;
}

export const projects: Project[] = [
  // Design de Marcas
  {
    id: "1",
    title: "Rick",
    category: "Design de Marcas",
    slug: "rick-brand",
    thumbnail: "/images/trabalhos/branding/rick-brand/thumbnail.svg",
    featured: true,
    featuredInHome: true,
    description: "Identidade visual completa para marca pessoal, incluindo logo, paleta de cores e aplicações.",
    year: "2024",
    tags: ["Branding", "Logo Design", "Identidade Visual"],
    images: [],
  },
  {
    id: "2",
    title: "NetExperts",
    category: "Design de Marcas",
    slug: "netexperts",
    thumbnail: "/images/trabalhos/branding/netexperts/thumbnail.svg",
    featured: true,
    featuredInHome: true,
    description: "Desenvolvimento de identidade visual para empresa de tecnologia, com foco em modernidade e confiabilidade.",
    year: "2024",
    tags: ["Branding", "Tech", "Corporate"],
    images: [],
  },
  {
    id: "3",
    title: "Fernanda S.",
    category: "Design de Marcas",
    slug: "fernanda-s",
    thumbnail: "/images/trabalhos/branding/fernanda-s/thumbnail.svg",
    featured: true,
    description: "Marca pessoal elegante e sofisticada para profissional da área de saúde.",
    year: "2024",
    tags: ["Branding", "Personal Brand", "Elegante"],
    images: [],
  },
  {
    id: "4",
    title: "MedCenter",
    category: "Design de Marcas",
    slug: "medcenter",
    thumbnail: "/images/trabalhos/branding/medcenter/thumbnail.svg",
    featured: false,
    description: "Identidade visual para centro médico, transmitindo confiança e profissionalismo.",
    year: "2023",
    tags: ["Branding", "Saúde", "Profissional"],
    images: [],
  },
  {
    id: "5",
    title: "Vinca",
    category: "Design de Marcas",
    slug: "vinca",
    thumbnail: "/images/trabalhos/branding/vinca/thumbnail.svg",
    featured: false,
    description: "Marca moderna e vibrante para startup de tecnologia.",
    year: "2023",
    tags: ["Branding", "Startup", "Moderno"],
    images: [],
  },
  {
    id: "6",
    title: "Lotus",
    category: "Design de Marcas",
    slug: "lotus",
    thumbnail: "/images/trabalhos/branding/lotus/thumbnail.svg",
    featured: false,
    description: "Identidade visual minimalista e zen para centro de bem-estar.",
    year: "2023",
    tags: ["Branding", "Wellness", "Minimalista"],
    images: [],
  },
  {
    id: "7",
    title: "Campotech",
    category: "Design de Marcas",
    slug: "campotech",
    thumbnail: "/images/trabalhos/branding/campotech/thumbnail.svg",
    featured: false,
    description: "Marca para empresa de tecnologia agrícola, unindo inovação e tradição.",
    year: "2023",
    tags: ["Branding", "Agro", "Tech"],
    images: [],
  },
  {
    id: "8",
    title: "Ouro Western Country",
    category: "Design de Marcas",
    slug: "ouro-western",
    thumbnail: "/images/trabalhos/branding/ouro-western/thumbnail.svg",
    featured: true,
    description: "Identidade visual autêntica para marca country, com elementos tradicionais e modernos.",
    year: "2024",
    tags: ["Branding", "Country", "Tradicional"],
    images: [],
  },
  {
    id: "9",
    title: "MovBee",
    category: "Design de Marcas",
    slug: "movbee-brand",
    thumbnail: "/images/trabalhos/branding/movbee-brand/thumbnail.svg",
    featured: false,
    description: "Marca jovem e dinâmica para aplicativo de mobilidade urbana.",
    year: "2024",
    tags: ["Branding", "App", "Mobilidade"],
    images: [],
  },

  // Desenvolvedor Front-End
  {
    id: "10",
    title: "Rick - WebSite",
    category: "Desenvolvedor Front-End",
    slug: "rick-website",
    thumbnail: "/images/trabalhos/websites/rick-website/thumbnail.webp",
    featured: true,
    featuredInHome: true,
    description: "Portfolio pessoal desenvolvido com Next.js, TypeScript e Tailwind CSS. Design moderno com animações suaves e performance otimizada.",
    year: "2024",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    siteUrl: "https://rick-portfolio.vercel.app",
    siteImage: "/images/assets/placeholders/placeholder.jpg",
  },
  {
    id: "11",
    title: "Adubos Real - WebSite",
    category: "Desenvolvedor Front-End",
    slug: "adubos-real",
    thumbnail: "/images/trabalhos/websites/adubos-real/thumbnail.webp",
    featured: true,
    featuredInHome: true,
    description: "Website institucional para empresa de adubos, com catálogo de produtos e sistema de contato.",
    year: "2024",
    tags: ["React", "Next.js", "E-commerce"],
    siteUrl: "https://adubosreal.com.br",
    siteImage: "/images/assets/placeholders/placeholder.jpg",
  },
  {
    id: "12",
    title: "Mandu Cultural - WebSite",
    category: "Desenvolvedor Front-End",
    slug: "mandu-cultural",
    thumbnail: "/images/trabalhos/websites/mandu-cultural/thumbnail.webp",
    featured: false,
    description: "Plataforma cultural com agenda de eventos, galeria e sistema de inscrições.",
    year: "2023",
    tags: ["Next.js", "CMS", "Eventos"],
    siteUrl: "https://manducultural.com.br",
    siteImage: "/images/assets/placeholders/placeholder.jpg",
  },
  {
    id: "13",
    title: "MovBee - WebSite",
    category: "Desenvolvedor Front-End",
    slug: "movbee-website",
    thumbnail: "/images/trabalhos/websites/movbee-website/thumbnail.webp",
    featured: false,
    description: "Landing page para aplicativo de mobilidade urbana, com animações e design responsivo.",
    year: "2024",
    tags: ["React", "Landing Page", "Animações"],
    siteUrl: "https://movbee.app",
    siteImage: "/images/assets/placeholders/placeholder.jpg",
  },

  // Campanhas - Postagens
  {
    id: "14",
    title: "Postagens",
    category: "Campanhas - Postagens",
    slug: "postagens",
    thumbnail: "/images/trabalhos/campanhas/postagens/thumbnail.webp",
    featured: true,
    featuredInHome: true,
    description: "Coleção de postagens para redes sociais, com identidade visual consistente e engajamento.",
    year: "2024",
    tags: ["Social Media", "Design Gráfico", "Conteúdo"],
    images: [], // Será preenchido automaticamente pela função getProjectImages
  },

  // Campanhas - KV's
  {
    id: "15",
    title: "Key Visuals",
    category: "Campanhas - KV's",
    slug: "kvs",
    thumbnail: "/images/trabalhos/campanhas/kvs/thumbnail.webp",
    featured: true,
    featuredInHome: true,
    description: "Coleção de key visuals para campanhas de marketing digital e impressos.",
    year: "2024",
    tags: ["Design Gráfico", "Marketing", "Campanha"],
    images: [], // Será preenchido automaticamente pela função getProjectImages
  },
].map((project) => enrichProjectWithImages(project as Project)) as Project[];

// Helper functions
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured).slice(0, 6);
}

export function getProjectsByCategory(category: Project["category"]): Project[] {
  return projects.filter((p) => p.category === category);
}

export function getHomePageProjects(): Project[] {
  const branding = projects
    .filter((p) => p.category === "Design de Marcas" && p.featuredInHome)
    .slice(0, 2);

  const websites = projects
    .filter((p) => p.category === "Desenvolvedor Front-End" && p.featuredInHome)
    .slice(0, 2);

  const postagens = projects
    .filter((p) => p.category === "Campanhas - Postagens" && p.featuredInHome)
    .slice(0, 1);

  const kvs = projects
    .filter((p) => p.category === "Campanhas - KV's" && p.featuredInHome)
    .slice(0, 1);

  return [...branding, ...websites, ...postagens, ...kvs].slice(0, 6);
}
