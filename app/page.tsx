import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Portfolio } from "@/components/sections/portfolio";
import { Solutions } from "@/components/sections/solutions";
import { Skills } from "@/components/sections/skills";
import { Resume } from "@/components/sections/resume";
import { Contact } from "@/components/sections/contact";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col justify-between overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <Solutions />
      <Resume />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
