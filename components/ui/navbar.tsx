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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-24 py-6 transition-all duration-500", // Added lg:px-24 to match grid
        scrolled ? "bg-black/50 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent"
      )}
    >
      <div className="hover:opacity-80 transition-opacity cursor-pointer w-24 h-6 relative"> {/* Smaller Logo */}
        <Image 
          src="/rick-logo.svg" 
          alt="RICK Logo" 
          fill 
          className="object-contain object-left" 
          priority
        />
      </div>
      
      <nav className="hidden md:flex gap-8 items-center">
        {[
          { name: "Work", href: "#portfolio" },
          { name: "About", href: "#about" },
          { name: "Solutions", href: "#solutions" },
          { name: "Contact", href: "#contact" },
        ].map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors tracking-wide"
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <button className="md:hidden text-white p-2">
        <span className="sr-only">Menu</span>
        <div className="space-y-1.5">
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
        </div>
      </button>
    </motion.header>
  );
}
