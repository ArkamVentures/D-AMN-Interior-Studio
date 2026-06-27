# Celine Interior (v3 — Vite + React Router build)

This is the third version generated: a Vite + React + TypeScript + React
Router app (as opposed to the two Next.js versions). The source document
for this one explicitly said the model **hit a tool-call limit** partway
through building the project, then wrote out only the "remaining" files —
meaning a large number of files that this code depends on were **never
shown** at all, not even partially.

## ⚠️ This is a partial project — it will not build as-is

Running `npm install` works, but `npm run dev` will immediately fail on
missing-module errors, because the source text never included these files.
Nothing below was invented — these are exactly the gaps in the document.

### Config files — referenced, never shown
- `package.json`
- `vite.config.ts`
- `tailwind.config.ts` (this version uses custom colors `primary`,
  `warm-gray`, `accent`, `dark-bg`, `dark-card` and a `font-serif` family —
  none of that config was given)
- `tsconfig.json`
- `index.html`
- `postcss.config.js`

### Components imported by files in this package, but never defined in the source
- `components/layout/Layout.tsx` — wraps every page (imported in `App.tsx`)
- `components/ui/LoadingScreen.tsx` — the branded intro animation
  (imported in `App.tsx`)
- `components/ui/SectionHeading.tsx` — used in nearly every section/page
- `components/ui/AnimatedCounter.tsx` — used in `Stats.tsx`
- `components/sections/Hero.tsx`
- `components/sections/About.tsx` *(section version — different from
  `pages/About.tsx`, which does exist)*
- `components/sections/Services.tsx` *(section version)*
- `components/sections/Portfolio.tsx` *(section version)*
- `components/sections/Process.tsx`
- `components/sections/Testimonials.tsx`
- `components/sections/Pricing.tsx` *(section version)*

All of the above are imported directly by `pages/Home.tsx`. That page
will not render until these exist.

### Data files — imported throughout, never shown
- `data/faq.ts`
- `data/blog.ts`
- `data/team.ts`
- `data/services.ts`
- `data/gallery.ts`
- `data/projects.ts`
- `data/pricing.ts`

Each of these needs to export an array shaped to match how it's
consumed — e.g. `services.ts` needs objects with `id`, `title`,
`description`, `image`, `icon` (a string key into the `iconMap` in
`pages/Services.tsx`), `benefits: string[]`, and `process: string[]`.
I didn't fabricate sample data here since invented placeholder content
risks being mistaken for what you actually asked for.

## What IS complete and included
- `src/App.tsx`, `src/main.tsx`
- `src/styles/index.css`
- `src/pages/Home.tsx`, `About.tsx`, `Services.tsx`, `Portfolio.tsx`,
  `Pricing.tsx`, `Blog.tsx`, `Contact.tsx`, `NotFound.tsx`
- `src/components/sections/FAQ.tsx`, `Stats.tsx`, `Inspiration.tsx`,
  `Contact.tsx`, `Awards.tsx`, `Partners.tsx`

## Next step

If you have the earlier part of this generation (the parts created before
the assistant said it had "reached the tool call limit" — likely including
the Vite project setup, Tailwind config, and the first batch of
section/UI components), paste that in and I'll merge it into this same
folder structure so it actually builds.
