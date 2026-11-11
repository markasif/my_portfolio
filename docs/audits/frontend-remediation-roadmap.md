# FRONTEND REMEDIATION ROADMAP
**Actionable Engineering Plan for Production Readiness & Lighthouse 100**

- **Project:** Mohammed Asif Portfolio
- **Audit Date:** November 11, 2026
- **Classification Schema:**
  - **P0 — Critical:** Security risks, severe performance blockers (>5MB payloads), memory leaks, production-breaking issues.
  - **P1 — High:** Major performance penalties, WCAG AA compliance failures, broken interactive flows.
  - **P2 — Medium:** SEO, code architecture, technical debt, and visual refinements.
  - **P3 — Low:** Optional micro-optimizations, visual polish, and non-blocking cleanup.

---

## ISSUE REGISTER OVERVIEW

```
┌──────────┬──────────┬────────────────────────────────────────────────────────┐
│ Priority │ Count    │ Scope Summary                                          │
├──────────┼──────────┼────────────────────────────────────────────────────────┤
│ P0       │ 6 Issues │ Scrollytelling payload, Tailwind CDN, leaks, injection │
│ P1       │ 11 Issues│ External sync CDNs, image formats, a11y focus/combobox │
│ P2       │ 14 Issues│ SEO tags, robots/sitemap, dead code, strict TypeScript  │
│ P3       │ 7 Issues │ Font stack deduplication, inline styles, asset cleanup │
├──────────┼──────────┼────────────────────────────────────────────────────────┤
│ Total    │ 38 Issues│ Full project coverage                                  │
└──────────┴──────────┴────────────────────────────────────────────────────────┘
```

---

## STAGE 1 — CRITICAL FIXES (P0)
*Must be resolved prior to any public release or domain launch.*

### [ISSUE-P0-01] Eliminate Runtime Tailwind CDN in Production
- **Category:** Performance & Build Architecture
- **Evidence:** `index.html:10`: `<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>`
- **Affected File:** `index.html`, `package.json`, `vite.config.ts`
- **Recommended Solution:** Remove the script tag from `index.html`. Add `tailwindcss` and `postcss` to `devDependencies`. Configure `postcss.config.js` and `tailwind.config.js` so Vite compiles purged, minimal CSS at build time.
- **Expected Impact:** Eliminates ~300KB gzipped runtime JIT compiler; decreases Total Blocking Time (TBT) by 250–400ms; eliminates FCP delay.
- **Complexity:** Medium (1–2 hours).
- **Validation:** Inspect network tab of `dist/index.html`; verify zero requests to `cdn.tailwindcss.com`.

---

### [ISSUE-P0-02] Replace 120-Image Scrollytelling Network Flood with Optimized Video or Lazy Canvas
- **Category:** Performance & Core Web Vitals
- **Evidence:** `src/components/ScrollytellingHero.tsx:34-52`: Spawns 120 concurrent image requests (`/images/me/ezgif-frame-*.webp`) totaling **9.25 MB**.
- **Affected File:** `src/components/ScrollytellingHero.tsx`
- **Recommended Solution:** Convert the frame sequence to an H.265/AV1 or WebM scrubbed video element synchronized with GSAP ScrollTrigger, or chunk the frame downloads dynamically based on scroll proximity instead of downloading all 120 frames on mount.
- **Expected Impact:** Decreases initial page weight from >12.5 MB to <2.0 MB; prevents mobile browser tab out-of-memory crashes; accelerates LCP by ~2.5s.
- **Complexity:** High (3–4 hours).
- **Validation:** Verify initial network transfer is < 2.0 MB; zero concurrent image download spikes on page load.

---

### [ISSUE-P0-03] Fix Memory Leak & Layout Thrashing in `DigitalTerrainWave.tsx`
- **Category:** Performance & Runtime Stability
- **Evidence:** `src/components/DigitalTerrainWave.tsx:66-70`: `window.addEventListener('scroll', () => { ... })` uses an anonymous function and is never removed in the cleanup return function (`lines 411-415`).
- **Affected File:** `src/components/DigitalTerrainWave.tsx`
- **Recommended Solution:** Extract the scroll listener into a named callback (`handleScroll`) and add `window.removeEventListener('scroll', handleScroll)` inside the cleanup function.
- **Expected Impact:** Prevents orphaned event handlers on `window` and eliminates redundant `getBoundingClientRect()` calculations during scrolling.
- **Complexity:** Low (15 minutes).
- **Validation:** Verify in Chrome DevTools Memory Profiler that event listener count does not increase on component re-mount.

---

### [ISSUE-P0-04] Sanitize URL Query String in WhatsApp Inquiry Handler
- **Category:** Security & Input Validation
- **Evidence:** `src/components/Contact.tsx:114-115`: Form fields are concatenated directly into the WhatsApp URL without `encodeURIComponent()`.
- **Affected File:** `src/components/Contact.tsx`
- **Recommended Solution:** Wrap the formatted message string in `encodeURIComponent()` prior to appending to `https://wa.me/`.
- **Expected Impact:** Prevents parameter injection and ensures URLs with special characters (`&`, `#`, quotes) open correctly.
- **Complexity:** Low (10 minutes).
- **Validation:** Submit the form with special characters (e.g. `M&A & Co. #1`); verify the WhatsApp URL opens with correctly encoded parameters.

---

### [ISSUE-P0-05] Remove Client-Side Secret Define from `vite.config.ts`
- **Category:** Security & Architecture
- **Evidence:** `vite.config.ts:13-16`:
  ```ts
  define: {
    'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
  }
  ```
- **Affected File:** `vite.config.ts`
- **Recommended Solution:** Remove the `define` block for `API_KEY` and `GEMINI_API_KEY`. If client-side AI calls are required in the future, route them through a secure backend proxy or serverless function.
- **Expected Impact:** Eliminates risk of compiling private API keys into client bundles.
- **Complexity:** Low (10 minutes).
- **Validation:** Run `npm run build` and search `dist/` bundle for API key strings.

---

### [ISSUE-P0-06] Fix Unthrottled React Re-Renders During Hero Scroll Scrubbing
- **Category:** Performance & Main Thread
- **Evidence:** `src/components/ScrollytellingHero.tsx:83`: `setCurrentFrame(Math.round(airbnb.frame) + 1)` triggers React re-renders on every scroll tick.
- **Affected File:** `src/components/ScrollytellingHero.tsx`
- **Recommended Solution:** Eliminate `currentFrame` React state. Manage the reveal of the hero heading container (`line 223`) directly via GSAP ScrollTrigger timeline animation.
- **Expected Impact:** Reduces CPU frame drops during scrolling; ensures consistent 60fps animations on mobile.
- **Complexity:** Medium (30 minutes).
- **Validation:** Profile with Chrome DevTools Performance panel; verify zero React render commits during hero scroll scrub.

---

## STAGE 2 — PERFORMANCE OPTIMIZATIONS (P1)

### [ISSUE-P1-01] Bundle GSAP and Lenis via npm (Eliminate Synchronous CDN Scripts)
- **Category:** Performance
- **Evidence:** `index.html:13-18`: External CDN scripts loaded synchronously in `<head>`.
- **Affected File:** `index.html`, `package.json`, `src/App.tsx`
- **Recommended Solution:** Install `gsap` and `@studio-freight/lenis` as npm dependencies. Import them directly into `src/App.tsx` and components.
- **Expected Impact:** Removes 4 blocking network roundtrips to `cdnjs.cloudflare.com` and `unpkg.com`; enables Vite code-splitting and asset hashing.
- **Complexity:** Medium (45 minutes).

---

### [ISSUE-P1-02] Convert Botanical PNG Assets to WebP/AVIF
- **Category:** Performance
- **Evidence:** `public/images/leave_left.png` (242.9 KB) and `public/images/leave_right.png` (282.9 KB) = **525.8 KB total**.
- **Affected File:** `public/images/`, `src/components/About.tsx`
- **Recommended Solution:** Convert both images to AVIF and WebP at 80% quality. Add explicit `width="440" height="440"` and `loading="lazy"` attributes.
- **Expected Impact:** Reduces foliage assets to ~70 KB total (~86% payload reduction); eliminates layout shift (CLS).
- **Complexity:** Low (20 minutes).

---

### [ISSUE-P1-03] Eliminate Third-Party Font Host & Add `font-display: swap`
- **Category:** Performance & Core Web Vitals
- **Evidence:** `src/index.css:1-16`: Loads `Mazzard H` from `https://db.onlinewebfonts.com/` without `font-display: swap`.
- **Affected File:** `src/index.css`, `public/fonts/`
- **Recommended Solution:** Self-host the WOFF2 font files in `public/fonts/` and add `font-display: swap` to all `@font-face` definitions.
- **Expected Impact:** Eliminates third-party DNS/TLS lookup; eliminates Flash of Invisible Text (FOIT); improves FCP.
- **Complexity:** Low (20 minutes).

---

## STAGE 3 — ACCESSIBILITY AND SEO (P1 / P2)

### [ISSUE-P1-04] Implement WAI-ARIA Combobox on Contact Dropdown
- **Category:** Accessibility (WCAG 4.1.2, 2.1.1)
- **Evidence:** `src/components/Contact.tsx:278-330`: Custom dropdown lacks ARIA roles and keyboard arrow navigation.
- **Affected File:** `src/components/Contact.tsx`
- **Recommended Solution:** Add `role="combobox"`, `aria-expanded`, `role="listbox"`, and `role="option"`. Add `onKeyDown` handlers for `ArrowDown`, `ArrowUp`, `Enter`, and `Escape`.
- **Expected Impact:** Full keyboard and screen-reader accessibility for project type selection.
- **Complexity:** Medium (45 minutes).

---

### [ISSUE-P1-05] Implement Mobile Drawer Focus Trap & ARIA Attributes
- **Category:** Accessibility (WCAG 2.4.3, 4.1.2)
- **Evidence:** `src/components/Navbar.tsx:82-143`: Mobile drawer does not trap focus or declare `aria-expanded`.
- **Affected File:** `src/components/Navbar.tsx`
- **Recommended Solution:** Add `aria-expanded={isMenuOpen}` and `aria-controls="mobile-navigation"`. Implement a focus trap while drawer is active and handle `Escape` key close.
- **Expected Impact:** Compliant mobile navigation experience for assistive technology users.
- **Complexity:** Medium (30 minutes).

---

### [ISSUE-P1-06] Separate Nested Interactive Controls on Project Cards
- **Category:** Accessibility (WCAG 4.1.2)
- **Evidence:** `src/components/Projects.tsx:28-60`: `<Button href=...>` (an `<a>` tag) is nested inside a clickable `<div onClick=...>`.
- **Affected File:** `src/components/Projects.tsx`
- **Recommended Solution:** Make the card container a standard non-clickable layout container, or use a pseudo-element stretch pattern (`after:absolute after:inset-0`) on the primary link without nesting interactive elements.
- **Expected Impact:** Eliminates nested interactive target warnings; restores predictable keyboard tab order.
- **Complexity:** Low (25 minutes).

---

### [ISSUE-P2-01] Correct Heading Hierarchy (Single `<h1>` Constraint)
- **Category:** Accessibility & SEO
- **Evidence:** `Navbar.tsx:54` uses `<h2>` for brand logo; `ScrollytellingHero.tsx:226` and `About.tsx:234` both use `<h1>`.
- **Affected File:** `Navbar.tsx`, `About.tsx`
- **Recommended Solution:** Change Navbar brand from `<h2>` to `<span>`. Demote `About.tsx` heading from `<h1>` to `<h2>`. Retain single `<h1>` in Hero.
- **Expected Impact:** Clean document outline; resolves Lighthouse Heading Order audit.
- **Complexity:** Low (10 minutes).

---

### [ISSUE-P2-02] Add Complete OpenGraph, Twitter, and Structured Metadata
- **Category:** SEO & Social Sharing
- **Evidence:** `index.html`: Completely lacks `og:*`, `twitter:*`, canonical tags, and JSON-LD structured data.
- **Affected File:** `index.html`
- **Recommended Solution:** Add OpenGraph tags, Twitter Card tags, canonical `<link>`, and Schema.org `Person` JSON-LD script.
- **Expected Impact:** Elevates Lighthouse SEO score to 100; enables rich search snippets and social media card previews.
- **Complexity:** Low (20 minutes).

---

### [ISSUE-P2-03] Create `robots.txt` and `sitemap.xml`
- **Category:** SEO
- **Evidence:** Neither file exists in `public/`.
- **Affected File:** `public/robots.txt`, `public/sitemap.xml`
- **Recommended Solution:** Create standard `robots.txt` and `sitemap.xml` referencing canonical domain.
- **Expected Impact:** Enables search engine indexing and resolves Lighthouse crawler audits.
- **Complexity:** Low (10 minutes).

---

### [ISSUE-P2-04] Add Favicon & App Icons
- **Category:** Best Practices & Branding
- **Evidence:** `index.html` lacks `<link rel="icon">`; causes HTTP 404 on `/favicon.ico`.
- **Affected File:** `index.html`, `public/favicon.svg`
- **Recommended Solution:** Generate SVG/ICO favicon and reference in `index.html`.
- **Expected Impact:** Eliminates 404 errors; restores tab icon branding.
- **Complexity:** Low (10 minutes).

---

## STAGE 4 — UI/UX REFINEMENT (P2 / P3)

### [ISSUE-P2-05] Remove Custom Cursor Override on Touch / Assistive Devices
- **Category:** UI/UX & Accessibility
- **Evidence:** `index.html:198-200`: `body { cursor: crosshair; }` is applied globally.
- **Affected File:** `index.html`, `src/components/Cursor.tsx`
- **Recommended Solution:** Scope `cursor: crosshair` to `@media (pointer: fine)` so touch devices and screen readers retain native OS indicators.
- **Expected Impact:** Better usability across hybrid laptops, tablets, and mobile devices.
- **Complexity:** Low (10 minutes).

---

### [ISSUE-P3-01] Delete Orphaned Dead Code (`Hero.tsx`)
- **Category:** Maintainability & Clean Code
- **Evidence:** `src/components/Hero.tsx` (194 lines) is unreferenced in `App.tsx`.
- **Affected File:** `src/components/Hero.tsx`
- **Recommended Solution:** Delete `src/components/Hero.tsx` from the repository.
- **Expected Impact:** Eliminates developer confusion; decreases repo bloat.
- **Complexity:** Low (5 minutes).

---

### [ISSUE-P3-02] Remove Duplicate Project Images in `public/images/`
- **Category:** Asset Optimization
- **Evidence:** 3 duplicate pairs exist in `public/images/` (e.g. `AskRaggy...webp` vs `askraggy.webp`), wasting 358 KB.
- **Affected File:** `public/images/`
- **Recommended Solution:** Consolidate references to standard lowercase naming and delete duplicate files.
- **Expected Impact:** Reduces repository and build asset footprint.
- **Complexity:** Low (10 minutes).

---

## STAGE 5 — CODE QUALITY & ENGINEERING (P2 / P3)

### [ISSUE-P2-06] Enable TypeScript Strict Mode (`"strict": true`)
- **Category:** Code Quality & Type Safety
- **Evidence:** `tsconfig.json`: `"strict": true` is missing.
- **Affected File:** `tsconfig.json`
- **Recommended Solution:** Add `"strict": true` to `compilerOptions`. Resolve implicit `any` types and null assertions across components.
- **Expected Impact:** Catches runtime null/undefined bugs at compile time.
- **Complexity:** Medium (1–2 hours).

---

### [ISSUE-P2-07] Install & Configure ESLint
- **Category:** Code Quality & Engineering
- **Evidence:** `npx eslint .` fails because `eslint.config.js` does not exist.
- **Affected File:** `package.json`, `eslint.config.js`
- **Recommended Solution:** Initialize ESLint with React and TypeScript recommended rules.
- **Expected Impact:** Enforces consistent linting, hook dependency checking, and syntax safety across CI/CD.
- **Complexity:** Medium (30 minutes).

---

### [ISSUE-P2-08] Extract Hardcoded Project Data from Component Body
- **Category:** Architecture & Maintainability
- **Evidence:** `src/components/Projects.tsx:95-316`: 220 lines of static project data declared inside component render scope.
- **Affected File:** `src/components/Projects.tsx`, `src/data/projects.ts`
- **Recommended Solution:** Move `allProjects` into a separate `src/data/projects.ts` module and import it.
- **Expected Impact:** Improves readability, isolates content from presentation, and avoids unnecessary re-allocations.
- **Complexity:** Low (15 minutes).

---

## IMPLEMENTATION TIMELINE & MILESTONES

```
┌───────────────────────────────────────────────┬────────────┬─────────────┐
│ Milestone                                     │ Estimated  │ Priority    │
├───────────────────────────────────────────────┼────────────┼─────────────┤
│ Milestone 1: P0 Critical Blockers & Security  │ 4–6 Hours  │ Immediate   │
│ Milestone 2: P1 Performance & Asset Reduction │ 3–5 Hours  │ Sprint 1    │
│ Milestone 3: P1/P2 Accessibility & SEO Fixes  │ 2–3 Hours  │ Sprint 1    │
│ Milestone 4: P2/P3 Code Quality & Cleanup     │ 2–3 Hours  │ Sprint 2    │
├───────────────────────────────────────────────┼────────────┼─────────────┤
│ Total Remediation Estimate                    │ 11–17 Hours│ Full Health │
└───────────────────────────────────────────────┴────────────┴─────────────┘
```

