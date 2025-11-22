"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface SitePreviewProps {
  siteUrl: string;
  siteImage: string;
  title: string;
  description: string;
}

export function SitePreview({ siteUrl, siteImage, title, description }: SitePreviewProps) {
  const handleClick = () => {
    window.open(siteUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-8">
      {/* Site Preview Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative group cursor-pointer overflow-hidden rounded-xl aspect-[16/10]"
        onClick={handleClick}
      >
        <Image
          src={siteImage}
          alt={`${title} - Preview`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto">
              <ExternalLink className="w-8 h-8 text-white" />
            </div>
            <p className="text-white text-lg font-light">Visitar Site</p>
          </div>
        </div>

        {/* Corner Badge */}
        <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-purple-500/90 backdrop-blur-sm">
          <p className="text-white text-xs font-medium uppercase tracking-wider">Live Site</p>
        </div>
      </motion.div>

      {/* Visit Button */}
      <motion.a
        href={siteUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors group"
      >
        <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        Visitar Site
      </motion.a>
    </div>
  );
}
