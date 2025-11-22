"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-24 py-8 transition-all duration-500",
        scrolled ? "bg-black/80 backdrop-blur-xl py-6" : "bg-transparent"
      )}
    >
      {/* Logo */}
      <Link 
        href="/"
        className="hover:opacity-80 transition-opacity cursor-pointer w-20 h-5 relative"
      >
        <Image 
          src="/rick-logo.svg" 
          alt="Rick Logo" 
          fill 
          className="object-contain object-left" 
          priority
        />
      </Link>
      
      {/* Navigation - Horizontal Clean */}
      <nav className="flex gap-8 md:gap-12 items-center">
        {[
          { name: "Trabalhos", href: "#portfolio" },
          { name: "Sobre", href: "#about" },
          { name: "Contato", href: "#contact" },
        ].map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-sm font-extralight text-zinc-500 hover:text-purple-400 transition-colors tracking-wide relative group"
          >
            {item.name}
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-purple-500 to-purple-600 group-hover:w-full transition-all duration-300" />
          </Link>
        ))}
      </nav>
    </motion.header>
  );
}
