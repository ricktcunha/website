"use client";

import { ds } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { useEffect } from "react";

export function Footer() {
  // Handle smooth scroll to section when navigating from other pages
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.substring(1);
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, []);

  return (
    <footer className="py-16 px-6 bg-black border-t border-white/5">
      <div className={cn("container mx-auto", ds.spacing.containerMaxWidth)}>

        <div className="flex flex-col md:flex-row justify-between gap-12">

          {/* Left: Logo */}
          <div>
            <div className="w-20 h-5 relative mb-4">
              <Image
                src="/rick-logo.svg"
                alt="Rick Logo"
                fill
                className="object-contain object-left"
              />
            </div>
          </div>

          {/* Center: Links */}
          <nav className="flex flex-col md:flex-row gap-6 md:gap-12">
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
                  }
                }}
                className="text-sm font-light text-zinc-400 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right: Social */}
          <nav className="flex gap-6">
            {[
              { 
                name: "LinkedIn", 
                href: "https://www.linkedin.com/in/ricktcunha/", 
                icon: FaLinkedin 
              },
              { 
                name: "Instagram", 
                href: "https://www.instagram.com/rick.design.web/?hl=pt-br", 
                icon: FaInstagram 
              },
              { 
                name: "GitHub", 
                href: "https://github.com/ricktcunha", 
                icon: FaGithub 
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors group"
                  aria-label={item.name}
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              );
            })}
          </nav>
        </div>

      </div>
    </footer>
  );
}
