# Development Guidelines

## ⚙️ 3. Technical Foundations

### Folder Structure (App Router)
```
app/
  layout.tsx       # Root layout (Providers, HTML/Body)
  page.tsx         # Home page
  globals.css      # Global styles & Tailwind directives
  (routes)/        # Grouped routes (optional)
    about/
      page.tsx
components/
  ui/              # Atomic, reusable components (Buttons, Inputs)
  sections/        # Page sections (Hero, About, Contact)
  layout/          # Layout components (Navbar, Footer)
lib/
  utils.ts         # Helper functions (cn, etc.)
  design-tokens.ts # Design system constants
  data.ts          # Static data
```

### Naming Conventions
- **Files**: `kebab-case.tsx` (e.g., `interactive-button.tsx`)
- **Components**: `PascalCase` (e.g., `InteractiveButton`)
- **Functions**: `camelCase` (e.g., `handleScroll`)

### Server vs Client Components
- **Default to Server Components** for:
  - Data fetching
  - Static content
  - SEO metadata
- **Use "use client"** ONLY when:
  - Using hooks (`useState`, `useEffect`, `useRef`)
  - Using event listeners (`onClick`, `onChange`)
  - Using browser-only APIs (`window`, `document`)
  - Using Framer Motion or GSAP (usually)

### Performance Rules
1.  **Images**: Always use `next/image`. Define `width` and `height` or `fill`.
2.  **Fonts**: Use `next/font` (configured in `layout.tsx`).
3.  **Lazy Loading**: Use `dynamic()` for heavy components below the fold.
4.  **Animations**:
    - Prefer CSS transitions for simple hover states.
    - Use `will-change` sparingly.
    - Clean up all event listeners and GSAP instances.

---

## 📈 4. Expansion Guidelines

### Adding New Sections
1.  Create a new file in `components/sections/`.
2.  Export it as a named export.
3.  Import it in `app/page.tsx`.
4.  Ensure it follows the `container` and `padding` tokens.

### Adding New Pages
1.  Create a folder in `app/` (e.g., `app/projects/`).
2.  Add a `page.tsx`.
3.  Add `export const metadata` for SEO.

### Adding New Animations
1.  Check `DESIGN_SYSTEM.md` for standard eases.
2.  If using Framer Motion, use the `initial`, `whileInView`, `viewport` pattern.
3.  If using GSAP, ensure it's wrapped in `useGSAP` or a `useEffect` with cleanup.

### Integration with Lenis
- Lenis is configured in `components/smooth-scroll.tsx`.
- It wraps the entire application in `layout.tsx`.
- No extra configuration needed for standard scrolling.
