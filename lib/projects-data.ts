export interface Project {
  id: string;
  title: string;
  category: "Design de Marcas" | "Desenvolvedor Front-End" | "Designer Gráfico";
  slug: string;
  thumbnail: string;
  featured: boolean;
  description: string;
  year: string;
  tags: string[];

  // Para Design de Marcas e Designer Gráfico
  images?: string[];

  // Para Desenvolvedor Front-End
  siteUrl?: string;
  siteImage?: string;
}

export const projects: Project[] = [
  // Design de Marcas
  {
    id: "1",
    title: "Rick",
    category: "Design de Marcas",
    slug: "rick-brand",
    thumbnail: "/placeholder.jpg",
    featured: true,
    description: "Identidade visual completa para marca pessoal, incluindo logo, paleta de cores e aplicações.",
    year: "2024",
    tags: ["Branding", "Logo Design", "Identidade Visual"],
    images: ["/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg"],
  },
  {
    id: "2",
    title: "NetExperts",
    category: "Design de Marcas",
    slug: "netexperts",
    thumbnail: "/placeholder.jpg",
    featured: true,
    description: "Desenvolvimento de identidade visual para empresa de tecnologia, com foco em modernidade e confiabilidade.",
    year: "2024",
    tags: ["Branding", "Tech", "Corporate"],
    images: ["/placeholder.jpg", "/placeholder.jpg"],
  },
  {
    id: "3",
    title: "Fernanda S.",
    category: "Design de Marcas",
    slug: "fernanda-s",
    thumbnail: "/placeholder.jpg",
    featured: true,
    description: "Marca pessoal elegante e sofisticada para profissional da área de saúde.",
    year: "2024",
    tags: ["Branding", "Personal Brand", "Elegante"],
    images: ["/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg"],
  },
  {
    id: "4",
    title: "MedCenter",
    category: "Design de Marcas",
    slug: "medcenter",
    thumbnail: "/placeholder.jpg",
    featured: false,
    description: "Identidade visual para centro médico, transmitindo confiança e profissionalismo.",
    year: "2023",
    tags: ["Branding", "Saúde", "Profissional"],
    images: ["/placeholder.jpg", "/placeholder.jpg"],
  },
  {
    id: "5",
    title: "Vinca",
    category: "Design de Marcas",
    slug: "vinca",
    thumbnail: "/placeholder.jpg",
    featured: false,
    description: "Marca moderna e vibrante para startup de tecnologia.",
    year: "2023",
    tags: ["Branding", "Startup", "Moderno"],
    images: ["/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg"],
  },
  {
    id: "6",
    title: "Lotus",
    category: "Design de Marcas",
    slug: "lotus",
    thumbnail: "/placeholder.jpg",
    featured: false,
    description: "Identidade visual minimalista e zen para centro de bem-estar.",
    year: "2023",
    tags: ["Branding", "Wellness", "Minimalista"],
    images: ["/placeholder.jpg", "/placeholder.jpg"],
  },
  {
    id: "7",
    title: "Campotech",
    category: "Design de Marcas",
    slug: "campotech",
    thumbnail: "/placeholder.jpg",
    featured: false,
    description: "Marca para empresa de tecnologia agrícola, unindo inovação e tradição.",
    year: "2023",
    tags: ["Branding", "Agro", "Tech"],
    images: ["/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg"],
  },
  {
    id: "8",
    title: "Ouro Western Country",
    category: "Design de Marcas",
    slug: "ouro-western",
    thumbnail: "/placeholder.jpg",
    featured: true,
    description: "Identidade visual autêntica para marca country, com elementos tradicionais e modernos.",
    year: "2024",
    tags: ["Branding", "Country", "Tradicional"],
    images: ["/placeholder.jpg", "/placeholder.jpg"],
  },
  {
    id: "9",
    title: "MovBee",
    category: "Design de Marcas",
    slug: "movbee-brand",
    thumbnail: "/placeholder.jpg",
    featured: false,
    description: "Marca jovem e dinâmica para aplicativo de mobilidade urbana.",
    year: "2024",
    tags: ["Branding", "App", "Mobilidade"],
    images: ["/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg"],
  },

  // Desenvolvedor Front-End
  {
    id: "10",
    title: "Rick - WebSite",
    category: "Desenvolvedor Front-End",
    slug: "rick-website",
    thumbnail: "/placeholder.jpg",
    featured: true,
    description: "Portfolio pessoal desenvolvido com Next.js, TypeScript e Tailwind CSS. Design moderno com animações suaves e performance otimizada.",
    year: "2024",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    siteUrl: "https://rick-portfolio.vercel.app",
    siteImage: "/placeholder.jpg",
  },
  {
    id: "11",
    title: "Adubos Real - WebSite",
    category: "Desenvolvedor Front-End",
    slug: "adubos-real",
    thumbnail: "/placeholder.jpg",
    featured: true,
    description: "Website institucional para empresa de adubos, com catálogo de produtos e sistema de contato.",
    year: "2024",
    tags: ["React", "Next.js", "E-commerce"],
    siteUrl: "https://adubosreal.com.br",
    siteImage: "/placeholder.jpg",
  },
  {
    id: "12",
    title: "Mandu Cultural - WebSite",
    category: "Desenvolvedor Front-End",
    slug: "mandu-cultural",
    thumbnail: "/placeholder.jpg",
    featured: false,
    description: "Plataforma cultural com agenda de eventos, galeria e sistema de inscrições.",
    year: "2023",
    tags: ["Next.js", "CMS", "Eventos"],
    siteUrl: "https://manducultural.com.br",
    siteImage: "/placeholder.jpg",
  },
  {
    id: "13",
    title: "MovBee - WebSite",
    category: "Desenvolvedor Front-End",
    slug: "movbee-website",
    thumbnail: "/placeholder.jpg",
    featured: false,
    description: "Landing page para aplicativo de mobilidade urbana, com animações e design responsivo.",
    year: "2024",
    tags: ["React", "Landing Page", "Animações"],
    siteUrl: "https://movbee.app",
    siteImage: "/placeholder.jpg",
  },

  // Designer Gráfico
  {
    id: "14",
    title: "Key Visuals",
    category: "Designer Gráfico",
    slug: "key-visuals",
    thumbnail: "/placeholder.jpg",
    featured: false,
    description: "Coleção de key visuals para campanhas de marketing digital e impressos.",
    year: "2023",
    tags: ["Design Gráfico", "Marketing", "Campanha"],
    images: ["/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg"],
  },
  {
    id: "15",
    title: "Postagens",
    category: "Designer Gráfico",
    slug: "postagens",
    thumbnail: "/placeholder.jpg",
    featured: false,
    description: "Design de postagens para redes sociais, com identidade visual consistente e engajamento.",
    year: "2024",
    tags: ["Social Media", "Design Gráfico", "Conteúdo"],
    images: ["/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg"],
  },
];

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
