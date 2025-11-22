import { ds } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

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
            <p className="text-sm text-zinc-600">©{currentYear}</p>
          </div>

          {/* Center: Links */}
          <nav className="flex flex-col md:flex-row gap-6 md:gap-12">
            {[
              { name: "Trabalhos", href: "#portfolio" },
              { name: "Sobre", href: "#about" },
              { name: "Contato", href: "#contact" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-light text-zinc-400 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right: Social */}
          <nav className="flex gap-6">
            {[
              { name: "Twitter", href: "#" },
              { name: "LinkedIn", href: "#" },
              { name: "Instagram", href: "#" },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-light text-zinc-400 hover:text-white transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>

      </div>
    </footer>
  );
}
