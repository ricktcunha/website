export function Footer() {
  return (
    <footer className="py-12 px-6 bg-black border-t border-white/5">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-zinc-600 uppercase tracking-widest">
        <p>&copy; {new Date().getFullYear()} Rick Cunha. Portfolio.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="mailto:contato@rick.design" className="hover:text-white transition-colors">Get in touch</a>
        </div>
      </div>
    </footer>
  );
}
