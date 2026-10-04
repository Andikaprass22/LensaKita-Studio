# LensaKita Studio Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready, responsive, single-page photography business landing page (LensaKita Studio) as a sellable template, frontend-only with all content centralized in `src/lib/data.ts`.

**Architecture:** Vite + React + TypeScript SPA composed of one content-driven section component per page part. `src/lib/data.ts` is the single source of truth for all content; components never hardcode copy. Tailwind CSS for styling, Framer Motion for scroll reveal and portfolio filtering animations. No backend, no DB, no CRUD.

**Tech Stack:** Vite (react-ts), React 18, TypeScript (strict), Tailwind CSS, Framer Motion, Vitest + @testing-library/react + jsdom, ESLint.

**Spec:** `docs/superpowers/specs/2026-10-03-lensakita-studio-landing-page-design.md`

## Global Constraints

- Frontend-only. No backend, database, auth, CRUD, or contact form. (spec §3)
- All user-facing content lives in `src/lib/data.ts`; components read from it. (spec §5)
- Language: Bahasa Indonesia copy. No placeholder strings ("lorem", "TODO", "xxx", "placeholder").
- Every outbound contact path uses WhatsApp via `buildWhatsAppUrl()` from `siteConfig`. (spec §9)
- No empty links (`href="#"`); external links use `target="_blank"` + `rel="noopener noreferrer"`.
- All images render inside fixed aspect-ratio containers with `object-cover` and a working `onError` fallback. (spec §10)
- Respect `prefers-reduced-motion`. (spec §11)
- **Do NOT create git commits** (explicit user instruction). Verification = lint + tests + build.
- Verification commands: `npm run lint`, `npm run test`, `npm run build`.

## Review Focus

- **Image load failure:** any `<img>` whose `src` 404s or times out must show the fallback tile and must NOT collapse or shift the surrounding grid/hero layout. (pinned in Task 4)
- **Empty portfolio filter:** selecting a category with no items must not render an empty broken grid or crash; "Semua" restores all items. (pinned in Task 7)
- **WhatsApp number edge cases:** number with spaces, `+`, leading `0`, or dashes must normalize to a valid `wa.me` path; message must be URL-encoded. (pinned in Task 2)
- **Mobile menu state:** opening the mobile nav must lock body scroll and lateral clicks/route links must close it; leaving it open must not strand focus. (pinned in Task 5)
- **Duplicate/missing content ids:** duplicate keys or an empty required array must fail the data integrity test rather than render silently broken. (pinned in Task 3)

---

### Task 1: Project scaffold & tooling

**Files:**
- Create: `package.json`, `index.html`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `tailwind.config.js`, `postcss.config.js`, `eslint.config.js`, `vitest.config.ts`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/vite-env.d.ts`, `public/favicon.svg`
- Test: `src/App.test.tsx` (placeholder smoke test replaced in Task 10)

**Interfaces:**
- Consumes: nothing.
- Produces: a runnable Vite + React + TS app with Tailwind directives and Vitest wired; `npm run dev|build|test|lint` all defined.

- [ ] **Step 1: Consult context7 for current setup docs** for Vite + React + TS, Tailwind (detect whether the installed major is v3 or v4 and follow that version's official setup), and Vitest + React Testing Library.
- [ ] **Step 2: Scaffold with Vite** using `npm create vite@latest . -- --template react-ts`, then install deps: `tailwindcss @tailwindcss/postcss postcss autoprefixer framer-motion` and dev deps `vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom`.
- [ ] **Step 3: Configure Tailwind** per the installed major version found in Step 1 (v4: `@import "tailwindcss"` in `index.css` + `@tailwindcss/postcss`; v3: `tailwind.config.js` content globs + `@tailwind base/components/utilities`).
- [ ] **Step 4: Configure Vitest** with `environment: 'jsdom'`, `globals: true`, setup file `src/test/setup.ts` importing `@testing-library/jest-dom`; add `test`, `test:watch`, `lint` scripts.
- [ ] **Step 5: Add Tailwind theme tokens** in `index.css` (fonts, an accent color palette, container padding) and base styles (smooth scroll, `prefers-reduced-motion` guard).
- [ ] **Step 6: Verify**
  Run: `npm run build`
  Expected: build succeeds, no TypeScript errors.

### Task 2: WhatsApp utility

**Files:**
- Create: `src/lib/whatsapp.ts`
- Test: `src/lib/whatsapp.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `normalizeWhatsAppNumber(input: string): string` — strips `+`, spaces, dashes, parentheses; converts a leading `0` to `62`.
  - `buildWhatsAppUrl(number: string, message?: string): string` — returns `https://wa.me/<normalized>` plus `?text=<encodeURIComponent(message)>` only when a non-empty message is given.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from 'vitest';
import { normalizeWhatsAppNumber, buildWhatsAppUrl } from './whatsapp';

describe('normalizeWhatsAppNumber', () => {
  it('strips +, spaces, dashes and parentheses', () => {
    expect(normalizeWhatsAppNumber('+62 812-3456-7890')).toBe('6281234567890');
  });
  it('converts a leading 0 to 62', () => {
    expect(normalizeWhatsAppNumber('081234567890')).toBe('6281234567890');
  });
});

describe('buildWhatsAppUrl', () => {
  it('returns bare wa.me url when no message', () => {
    expect(buildWhatsAppUrl('6281234567890')).toBe('https://wa.me/6281234567890');
  });
  it('appends an encoded text query when message given', () => {
    expect(buildWhatsAppUrl('+62 812-3456-7890', 'Halo LensaKita!')).toBe(
      'https://wa.me/6281234567890?text=Halo%20LensaKita!'
    );
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
  Run: `npm run test -- whatsapp`
  Expected: FAIL — module/function not defined.

- [ ] **Step 3: Implement `src/lib/whatsapp.ts`** with the two functions above.
- [ ] **Step 4: Run test to verify it passes**
  Run: `npm run test -- whatsapp`
  Expected: PASS.

### Task 3: Content types & data

**Files:**
- Create: `src/lib/types.ts`, `src/lib/images.ts`, `src/lib/data.ts`
- Test: `src/lib/data.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: all types from spec §6 and exported consts `siteConfig`, `hero`, `about`, `services`, `portfolioCategories`, `portfolioItems`, `pricingPackages`, `testimonials`, `processSteps`, `faqItems`, `closingCta`. `images.ts` exports `img(id: string): ImageAsset` registry keyed by name.

- [ ] **Step 1: Write `src/lib/types.ts`** — copy the interfaces verbatim from spec §6 (`SectionId`, `NavLink`, `SocialIcon`, `SocialLink`, `SiteConfig`, `ImageAsset`, `IconName`, `HeroContent`, `AboutContent`, `Service`, `PortfolioCategory`, `PortfolioItem`, `PricingPackage`, `Testimonial`, `ProcessStep`, `FaqItem`, `ClosingCta`).
- [ ] **Step 2: Write `src/lib/images.ts`** exporting an `ImageAsset` for each sample photo (Unsplash URLs, `auto=format&fit=crop` with width params) with meaningful `fallbackLabel` values, e.g. `heroMain`, `aboutStudio`, `portfolio.*`, `avatars.*`.
- [ ] **Step 3: Write the failing data-integrity test**

```ts
import { describe, it, expect } from 'vitest';
import * as data from './data';

const collections = {
  services: data.services,
  portfolioCategories: data.portfolioCategories,
  portfolioItems: data.portfolioItems,
  pricingPackages: data.pricingPackages,
  testimonials: data.testimonials,
  processSteps: data.processSteps,
  faqItems: data.faqItems,
};

describe('content integrity', () => {
  it('every collection is non-empty', () => {
    for (const [name, list] of Object.entries(collections)) {
      expect(list.length, `${name} must not be empty`).toBeGreaterThan(0);
    }
  });
  it('ids are unique within each collection', () => {
    for (const [name, list] of Object.entries(collections)) {
      const ids = list.map((x) => x.id);
      expect(new Set(ids).size, `${name} has duplicate ids`).toBe(ids.length);
    }
  });
  it('whatsapp number is a valid international number', () => {
    expect(data.siteConfig.whatsappNumber).toMatch(/^62\d{8,13}$/);
  });
  it('portfolio item categories all exist', () => {
    const known = new Set(data.portfolioCategories.map((c) => c.id));
    for (const item of data.portfolioItems) expect(known.has(item.categoryId)).toBe(true);
  });
  it('contains no placeholder or empty link text', () => {
    const dump = JSON.stringify(data).toLowerCase();
    for (const bad of ['lorem', 'todo', 'placeholder', 'xxx', 'tbd']) {
      expect(dump.includes(bad), `found placeholder: ${bad}`).toBe(false);
    }
    expect(dump.includes('href="#"')).toBe(false);
  });
});
```

- [ ] **Step 4: Run test to verify it fails**
  Run: `npm run test -- data`
  Expected: FAIL — `data.ts` not defined / collections empty.
- [ ] **Step 5: Write `src/lib/data.ts`** with the full LensaKita Studio sample content per spec §7 (5 services, 6 categories incl. "Semua", 9–12 portfolio items, 3 packages, 4–6 testimonials, 5 process steps, 6 FAQs, nav links, socials, contact).
- [ ] **Step 6: Run test to verify it passes**
  Run: `npm run test -- data`
  Expected: PASS.

### Task 4: UI primitives

**Files:**
- Create: `src/components/ui/Button.tsx`, `src/components/ui/SectionHeading.tsx`, `src/components/ui/Icon.tsx`, `src/components/ui/SmartImage.tsx`, `src/components/ui/Reveal.tsx`
- Test: `src/components/ui/SmartImage.test.tsx`

**Interfaces:**
- Consumes: `ImageAsset`, `IconName`.
- Produces:
  - `Button` props `{ variant?: 'primary'|'secondary'|'ghost'; size?: 'md'|'lg'; icon?: IconName; href?: string; external?: boolean; onClick?: () => void; children: ReactNode }`.
  - `SectionHeading` props `{ eyebrow?: string; title: string; description?: string; align?: 'left'|'center' }`.
  - `Icon` props `{ name: IconName; className?: string }` — inline SVG only.
  - `SmartImage` props `{ asset: ImageAsset; alt: string; className?: string; imgClassName?: string; priority?: boolean }` — fixed-aspect container, skeleton while loading, fallback on error.
  - `Reveal` props `{ children: ReactNode; delay?: number; className?: string }` — Framer Motion in-view fade/slide, no-op under reduced motion.

- [ ] **Step 1: Write the failing SmartImage test** (the Review Focus pinned behavior): render with an `asset.src`, fire `error` on the image, assert the fallback text (`asset.fallbackLabel`) is shown and the image is removed; also assert the container has an aspect-ratio class.

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { SmartImage } from './SmartImage';

const asset = { src: 'https://example.invalid/x.jpg', fallbackLabel: 'Foto Studio' };

it('shows fallback label when the image fails to load', () => {
  render(<SmartImage asset={asset} alt="contoh" />);
  fireEvent.error(screen.getByRole('img'));
  expect(screen.getByText('Foto Studio')).toBeInTheDocument();
  expect(screen.queryByRole('img')).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**
  Run: `npm run test -- SmartImage`
  Expected: FAIL — module not found.
- [ ] **Step 3: Implement the five primitives.** `SmartImage` uses `useState('loading'|'loaded'|'error')`; on error render a gradient tile with `Icon name="camera"` and `fallbackLabel`. Container always has an `aspect-*` class; `<img>` uses `object-cover`, `loading={priority ? 'eager' : 'lazy'}`, `decoding="async"`.
- [ ] **Step 4: Run test to verify it passes**
  Run: `npm run test -- SmartImage`
  Expected: PASS.

### Task 5: Layout — hooks, Navbar, Footer

**Files:**
- Create: `src/hooks/useSmoothScroll.ts`, `src/hooks/useActiveSection.ts`, `src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx`

**Interfaces:**
- Consumes: `siteConfig`, `Button`, `Icon`, `buildWhatsAppUrl`.
- Produces:
  - `useSmoothScroll(): (sectionId: SectionId) => void` — `scrollIntoView({ behavior: 'smooth' })`, no-op under reduced motion.
  - `useActiveSection(ids: SectionId[]): SectionId` — IntersectionObserver-based active id.
  - `Navbar` (no props; reads `siteConfig`), `Footer` (no props).

- [ ] **Step 1: Implement `useSmoothScroll`** — returns a click handler that prevents default, finds `#<id>`, smooth-scrolls; respects reduced motion.
- [ ] **Step 2: Implement `useActiveSection`** — observes each section element, returns the id most in view; cleans up observers on unmount.
- [ ] **Step 3: Implement `Navbar`** — sticky, translucent → solid on scroll (`useActiveSection` highlights the active link), logo from `siteConfig.shortName`, nav links from `siteConfig.navLinks`, "Konsultasi" button → `buildWhatsAppUrl(siteConfig.whatsappNumber, siteConfig.whatsappDefaultMessage)`. Mobile: hamburger toggles a slide-in menu; opening sets `document.body.style.overflow = 'hidden'`, closing restores it; clicking any link closes the menu; `aria-expanded`/`aria-controls`/`aria-label` present; Escape closes it.
- [ ] **Step 4: Implement `Footer`** — contact block (address → `mapsUrl`, phone, email as `mailto:`), social links (`target="_blank" rel="noopener noreferrer"`), business hours, and a dynamic year copyright. No `href="#"`.
- [ ] **Step 5: Verify**
  Run: `npm run build`
  Expected: no TypeScript errors.

### Task 6: Hero, About, Services sections

**Files:**
- Create: `src/components/sections/Hero.tsx`, `src/components/sections/About.tsx`, `src/components/sections/Services.tsx`

**Interfaces:**
- Consumes: `hero`, `about`, `services`, `SectionHeading`, `Button`, `SmartImage`, `Reveal`, `useSmoothScroll`, `buildWhatsAppUrl`.
- Produces: three section components taking no props, each rendering `<section id={...}>`.

- [ ] **Step 1: Implement `Hero`** — `id="home"`, single `<h1>` = `hero.headline`, eyebrow, description, primary button scrolls to `hero.primaryCta.targetSectionId`, secondary button → WhatsApp, `SmartImage` for `hero.image`, and a stats row from `hero.stats`.
- [ ] **Step 2: Implement `About`** — `id="about"`, heading + paragraphs, `experienceYears` highlighted, advantage cards from `about.advantages` with `Icon`, `SmartImage` for `about.image`.
- [ ] **Step 3: Implement `Services`** — `id="services"`, grid of service cards (icon, title, description, `startingPrice` when present), each with a "Tanya Layanan Ini" WhatsApp link naming the service.
- [ ] **Step 4: Verify**
  Run: `npm run build`
  Expected: no TypeScript errors.

### Task 7: Portfolio section (filterable)

**Files:**
- Create: `src/components/sections/Portfolio.tsx`
- Test: `src/components/sections/Portfolio.test.tsx`

**Interfaces:**
- Consumes: `portfolioCategories`, `portfolioItems`, `SectionHeading`, `SmartImage`, Framer Motion.
- Produces: `Portfolio` (no props) with `<section id="portfolio">`; filter buttons derived from `portfolioCategories`, `aria-pressed` on the active filter.

- [ ] **Step 1: Write the failing filter test** (pinned Review Focus behavior)

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Portfolio } from './Portfolio';
import { portfolioItems } from '../../lib/data';

it('filters items by category and restores all on "Semua"', () => {
  render(<Portfolio />);
  expect(screen.getAllByRole('img').length + screen.queryAllByTestId('portfolio-fallback').length)
    .toBe(portfolioItems.length);
  const firstCat = portfolioItems[0].categoryId;
  fireEvent.click(screen.getByRole('button', { name: new RegExp(firstCat, 'i') }));
  // only items of that category visible
});
```

*(Implementer: give each card `data-testid="portfolio-item"` with `data-category` so the assertion can count precisely; adjust the test to assert filtered counts — the intent is "filtered subset correct, Semua restores all".)*

- [ ] **Step 2: Run test to verify it fails**
  Run: `npm run test -- Portfolio`
  Expected: FAIL — module not found.
- [ ] **Step 3: Implement `Portfolio`** — `useState<string>('all')` filter; filter bar ("Semua" = `all`); grid of cards wrapped in `AnimatePresence` with `layout`; each card = `SmartImage` (fixed aspect) + title overlay; categories with zero items are not rendered as buttons.
- [ ] **Step 4: Run test to verify it passes**
  Run: `npm run test -- Portfolio`
  Expected: PASS.

### Task 8: Pricing, Testimonials, Process sections

**Files:**
- Create: `src/components/sections/Pricing.tsx`, `src/components/sections/Testimonials.tsx`, `src/components/sections/Process.tsx`

**Interfaces:**
- Consumes: `pricingPackages`, `testimonials`, `processSteps`, `SectionHeading`, `Button`, `Icon`, `SmartImage`, `buildWhatsAppUrl`.
- Produces: three no-prop section components.

- [ ] **Step 1: Implement `Pricing`** — `id="pricing"`, three cards; `highlighted` package visually emphasized; feature list with check icons; per-package CTA "Tanya Paket Ini" → WhatsApp message naming the package.
- [ ] **Step 2: Implement `Testimonials`** — `id="testimonials"`, cards with quote, star rating (from `rating`), name/role, and `SmartImage` avatar (with fallback).
- [ ] **Step 3: Implement `Process`** — `id="process"`, numbered vertical/stepped timeline of `processSteps`.
- [ ] **Step 4: Verify**
  Run: `npm run build`
  Expected: no TypeScript errors.

### Task 9: FAQ, CTA closing, WhatsApp FAB

**Files:**
- Create: `src/components/sections/Faq.tsx`, `src/components/sections/CtaClosing.tsx`, `src/components/WhatsAppFab.tsx`
- Test: `src/components/sections/Faq.test.tsx`

**Interfaces:**
- Consumes: `faqItems`, `closingCta`, `siteConfig`, `buildWhatsAppUrl`, `Button`, `Icon`.
- Produces: `Faq` (`id="faq"`), `CtaClosing` (`id="contact"`), `WhatsAppFab`.

- [ ] **Step 1: Write the failing FAQ test**

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Faq } from './Faq';
import { faqItems } from '../../lib/data';

it('toggles an answer open and closed with aria-expanded', () => {
  render(<Faq />);
  const btn = screen.getByRole('button', { name: faqItems[0].question });
  expect(btn).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(btn);
  expect(btn).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByText(faqItems[0].answer)).toBeVisible();
  fireEvent.click(btn);
  expect(btn).toHaveAttribute('aria-expanded', 'false');
});
```

- [ ] **Step 2: Run test to verify it fails**
  Run: `npm run test -- Faq`
  Expected: FAIL — module not found.
- [ ] **Step 3: Implement `Faq`** — single-open accordion with `useState<string|null>`, Framer Motion height animation, `aria-expanded`/`aria-controls`, keyboard operable.
- [ ] **Step 4: Implement `CtaClosing`** — `id="contact"`, headline + description + primary button → WhatsApp.
- [ ] **Step 5: Implement `WhatsAppFab`** — fixed floating button rendered only when `siteConfig.showWhatsAppFab`; links to WhatsApp with default message; `aria-label`.
- [ ] **Step 6: Run test to verify it passes**
  Run: `npm run test -- Faq`
  Expected: PASS.

### Task 10: App composition, smoke test, README, final verification

**Files:**
- Modify: `src/App.tsx`
- Create: `src/App.test.tsx` (replaces Task 1 placeholder), `README.md`
- Test: `src/App.test.tsx`

**Interfaces:**
- Consumes: all section components, `Navbar`, `Footer`, `WhatsAppFab`, `siteConfig`.
- Produces: the assembled page and buyer documentation.

- [ ] **Step 1: Write the failing smoke test**

```tsx
import { render, screen } from '@testing-library/react';
import App from './App';
import { siteConfig } from './lib/data';

it('renders the main landmarks and business name', () => {
  render(<App />);
  expect(screen.getByRole('banner')).toBeInTheDocument();
  expect(screen.getByRole('main')).toBeInTheDocument();
  expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  expect(screen.getAllByText(new RegExp(siteConfig.businessName, 'i')).length).toBeGreaterThan(0);
});
```

- [ ] **Step 2: Run test to verify it fails**
  Run: `npm run test -- App`
  Expected: FAIL — App still renders the placeholder.
- [ ] **Step 3: Implement `App.tsx`** — compose `Navbar`, `<main>` with Hero/About/Services/Portfolio/Pricing/Testimonials/Process/Faq/CtaClosing, `Footer`, `WhatsAppFab`.
- [ ] **Step 4: Write `README.md`** — install/dev/build/test instructions plus a "Cara Mengganti Konten" table listing every `data.ts` field a buyer edits (business name, WhatsApp number, socials, services, packages, testimonials, photos, FAQ) and how to swap images.
- [ ] **Step 5: Run the full test suite**
  Run: `npm run test`
  Expected: all tests PASS.
- [ ] **Step 6: Run lint**
  Run: `npm run lint`
  Expected: no errors (fix any).
- [ ] **Step 7: Run production build**
  Run: `npm run build`
  Expected: build succeeds with no TypeScript errors.
- [ ] **Step 8: Manual browser smoke check**
  Run: `npm run preview` (or `npm run dev`), open the page, and confirm: no console errors, nav scrolls, portfolio filter works, FAQ toggles, all CTAs open WhatsApp, images fall back gracefully when a URL is broken, layout holds on mobile width. Stop the server when done.
