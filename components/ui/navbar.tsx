"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./mobile-menu";
import { Menu } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle smooth scroll to section when navigating from other pages
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Se há hash, rolar para o elemento
      if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const element = document.getElementById(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      } else {
        // Se não há hash, garantir que a página comece no topo
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-[2px] left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 lg:px-24 py-8 transition-all duration-500",
        scrolled ? "bg-black/80 backdrop-blur-xl py-6" : "bg-transparent"
      )}
    >
      {/* Logo */}
      <Link
        href="/"
        className="hover:opacity-80 transition-opacity cursor-pointer w-20 h-5 relative"
      >
        <Image
          src="/images/assets/logos/rick-logo.svg"
          alt="Rick Logo"
          fill
          className="object-contain object-left"
          priority
        />
      </Link>

      {/* Navigation - Desktop */}
      <nav className="hidden md:flex gap-4 md:gap-8 lg:gap-12 items-center">
        {[
          { name: "Trabalhos", href: "/trabalhos" },
          { name: "Sobre", href: "/#about" },
          { name: "Currículo", href: "/curriculo" },
          { name: "Contato", href: "/#contact" },
        ].map((item) => (
          <Link
            key={item.name}
            href={item.href}
            scroll={false}
            onClick={(e) => {
              // Handle anchor links with smooth scroll
              if (typeof window !== 'undefined' && item.href.includes('#')) {
                const hash = item.href.split('#')[1];
                
                // If we're on the home page, scroll smoothly
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  const element = document.getElementById(hash);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }
                // If we're on another page, navigate first (Next.js will handle it)
                // The scroll will happen after navigation via useEffect
              }
            }}
            className="text-xs md:text-sm font-extralight text-zinc-500 hover:text-purple-400 transition-colors tracking-wide relative group"
          >
            {item.name}
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-purple-500 to-purple-600 group-hover:w-full transition-all duration-300" />
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="md:hidden p-2 rounded-full hover:bg-white/5 transition-colors duration-300 text-zinc-400 hover:text-white"
        aria-label="Abrir menu"
      >
        <Menu size={24} strokeWidth={1.5} />
      </button>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </motion.header>
  );
}
