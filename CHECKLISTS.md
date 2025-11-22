# Official Checklists

## 📝 5. Mandatory Checklists

### ✅ Visual Checklist
- [ ] Does the component use the official **Color Palette**?
- [ ] Is the typography consistent with the **Syne/Inter** scale?
- [ ] Are spacing values derived from the **8px/4px** grid (Tailwind)?
- [ ] Do hover states use the standard **Glass/Glow** effects?
- [ ] Is the design responsive (Mobile, Tablet, Desktop)?
- [ ] Does it look "Premium" (Whitespace, subtle animations)?

### ✅ Technical Checklist
- [ ] Is the file named correctly (`kebab-case.tsx`)?
- [ ] Is it a **Server Component** if possible?
- [ ] Are imports clean (no unused imports)?
- [ ] Is `className` used with `cn()` for merging?
- [ ] Are hardcoded strings moved to `lib/data.ts` if they are content?
- [ ] Is the code formatted (Prettier)?

### ✅ Performance Checklist
- [ ] Are images optimized (`next/image`)?
- [ ] Are heavy animations paused when out of view?
- [ ] Is `layout shift` (CLS) minimized?
- [ ] Does it respect `prefers-reduced-motion`?
- [ ] Are unused event listeners removed?

### ✅ Accessibility Checklist
- [ ] Do images have `alt` text?
- [ ] Do buttons have `aria-label` if text is hidden?
- [ ] Is color contrast sufficient?
- [ ] Can it be navigated via Keyboard?
