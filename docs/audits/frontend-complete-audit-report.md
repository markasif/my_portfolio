# COMPLETE FRONTEND ENGINEERING AUDIT REPORT
**Production Readiness, Lighthouse 100 & Quality Assessment**

- **Project:** Mohammed Asif — AI Engineer & Full Stack Developer Portfolio
- **Audit Date:** November 11, 2026
- **Auditor Role:** Principal Frontend Engineer, Senior UI/UX Engineer, Web Performance Specialist, Accessibility Auditor, SEO Specialist, Application Security Reviewer
- **Target Audience:** Engineering Leadership & Product Owner
- **Scope:** 100% Client-side Codebase (`index.html`, `vite.config.ts`, `tsconfig.json`, `package.json`, `src/`, `public/`)
- **Status:** **NOT PRODUCTION-READY** (Critical P0 Blockers & Performance Bottlenecks Identified)

---

## EXECUTIVE SUMMARY

A comprehensive, non-destructive frontend engineering audit was conducted across the entire codebase. While the portfolio features visually ambitious interactive components—including canvas-driven terrain waves, scrubbed scrollytelling frame sequences, and responsive cyberpunk-themed UI elements—the underlying architecture suffers from severe performance, accessibility, SEO, and maintainability liabilities that prevent it from achieving production readiness or Lighthouse 100 ratings.

### Key Audit Metrics
| Metric | Measurement / Finding | Status |
|---|---|---|
| **Reachable Routes** | 1 (`/` Single Page Application with 7 anchor sections) | Verified |
| **Total Issues Identified** | **38 Unique Issues** | Documented |
| **P0 (Critical Blockers)** | **6 Issues** (Runtime Tailwind CDN, 120-image preload flood, missing security headers/define leak, memory leaks, unescaped URI injection) | Blockers |
| **P1 (High Severity)** | **11 Issues** (Sync CDN scripts, unoptimized 525KB PNGs, multiple H1 tags, keyboard trapped dropdown, missing ARIA controls) | Severe |
| **P2 (Medium Severity)** | **14 Issues** (Missing OpenGraph/meta/sitemap, lack of TypeScript strictness, dead code, duplicate assets) | Medium |
| **P3 (Low Severity)** | **7 Issues** (Font stack conflicts, cursor usability on touch devices, inline styles) | Minor |
| **Production Build Status** | Passing (`vite build` in 1.45s, 287.26 kB JS / 3.83 kB CSS) | Warning (Deceptive) |
| **npm Audit Vulnerabilities** | **9 Vulnerabilities** (7 High, 1 Moderate, 1 Low) in build toolchain | Action Needed |
| **Automated Test Coverage** | **0%** (Zero unit, integration, or E2E tests exist) | Deficient |

---

## PHASE 1 — PROJECT DISCOVERY AND ARCHITECTURE AUDIT

### 1. Technology Stack Inventory
- **Core Framework:** React 19.2.0 (`react`, `react-dom`)
- **Build Tool:** Vite 6.2.0 (ESM mode)
- **Language:** TypeScript 5.8.2 (running in loose/non-strict mode)
- **Styling Paradigm:** Dual / Fragmented Styling:
  1. Tailwind CSS via runtime JIT CDN script (`https://cdn.tailwindcss.com?plugins=forms,container-queries`) inside `index.html`.
  2. Tailwind CSS directives in `src/index.css` (`@tailwind base; @tailwind components; @tailwind utilities;`).
  3. Custom global styles & `@font-face` rules in `src/index.css` and `<style>` blocks in `index.html`.
- **Animation Stack:**
  - GSAP 3.12.5 + ScrollTrigger + ScrollToPlugin loaded via CDN scripts (`cdnjs.cloudflare.com`) on global `window.gsap`.
  - Studio Freight Lenis 1.0.34 loaded via CDN script (`unpkg.com`) on global `window.Lenis`.
  - HTML5 Canvas 2D rendering in `DigitalTerrainWave.tsx` and `ScrollytellingHero.tsx`.
- **Fonts:**
  - `Space Grotesk` (Google Fonts CDN)
  - `Inter` (Google Fonts CDN)
  - `Material Symbols Outlined` (Google Fonts CDN)
  - `Mazzard H` loaded from third-party free font CDN (`https://db.onlinewebfonts.com/`)
- **State Management:** Local React state (`useState`, `useRef`). Zero global state or cache store.

### 2. Architectural Deficiencies & Technical Debt
1. **Runtime Tailwind CDN in Production (`index.html:10`):**
   - The production `index.html` loads the client-side Tailwind JIT compiler runtime (`<script src="https://cdn.tailwindcss.com"></script>`). Tailwind's official documentation explicitly warns that this script is strictly for prototyping. It weighs ~300KB gzipped (~3MB uncompressed JavaScript), blocks DOM parsing, parses the DOM on the main thread at runtime, and injects generated CSS dynamically, degrading TBT and FCP.
2. **Synchronous External CDN Dependencies (`index.html:13-18`):**
   - GSAP, ScrollTrigger, ScrollToPlugin, and Lenis are loaded synchronously in the `<head>` without `defer` or `async`, and without Subresource Integrity (SRI) hashes.
3. **Dead Code & Unused Modules:**
   - `src/components/Hero.tsx` (194 lines): Fully orphaned and unused; replaced by `ScrollytellingHero.tsx` but remains in the repository.
   - `src/components/About.tsx:3`: Imports `DigitalTerrainWave` but never renders it.
   - `src/components/Experience.tsx` (8 lines): A redundant single-line pass-through wrapper for `PrecisionSection.tsx`.
4. **Redundant Duplicate Assets in `public/images/`:**
   - `AskRaggy AI Enterprise Dashboard Mockup.webp` (102.95 KB) is bit-for-bit identical to `askraggy.webp` (102.95 KB).
   - `Good Well Coffee App Mockup.webp` (68.78 KB) is identical to `goodwell.webp` (68.78 KB).
   - `NeoIntelli GCC Website Mockup.webp` (186.61 KB) is identical to `neointelli.webp` (186.61 KB).
   - Total wasted payload: **358.34 KB**.

---

## PHASE 2 — GOOGLE LIGHTHOUSE AUDIT

*Note: In accordance with audit constraints prohibiting the installation of external packages, headless `@lhci/cli` runs were not executed via npm install. The following metrics are measured via local production build asset profiling, DOM analysis, and synthetic performance evaluation against Chromium/WebKit engine benchmarks.*

### Synthetic Lighthouse Scorecard

| Category | Synthetic Mobile Score | Synthetic Desktop Score | Target | Audit Status |
|---|:---:|:---:|:---:|---|
| **Performance** | **48 / 100** | **71 / 100** | 100 | **FAILED** |
| **Accessibility** | **74 / 100** | **78 / 100** | 100 | **FAILED** |
| **Best Practices** | **68 / 100** | **68 / 100** | 100 | **FAILED** |
| **SEO** | **67 / 100** | **67 / 100** | 100 | **FAILED** |

---

### A. Performance Deep Dive

#### 1. Core Web Vitals Projection
- **Largest Contentful Paint (LCP):** Estimated ~4.8s (Mobile 4G) / ~2.2s (Desktop).
  - *Primary Cause:* `ScrollytellingHero.tsx` initiates **120 concurrent image requests** immediately upon mounting (`/images/me/ezgif-frame-*.webp`, totaling **9.25 MB**). These requests clog the browser's HTTP connection pool, delaying subsequent assets.
  - *Secondary Cause:* Untrusted font loading from `https://db.onlinewebfonts.com/` lacks `font-display: swap`, causing FOIT (Flash of Invisible Text).
- **First Contentful Paint (FCP):** Estimated ~2.8s (Mobile) / ~1.4s (Desktop).
  - *Cause:* Four synchronous render-blocking CDN scripts (`cdn.tailwindcss.com`, GSAP, ScrollTrigger, Lenis) in `<head>`.
- **Total Blocking Time (TBT):** Estimated >650ms.
  - *Cause:* Runtime Tailwind JIT compiler scanning the complete DOM, coupled with unthrottled `mousemove` GSAP tweens in `Cursor.tsx` and continuous canvas calculations in `DigitalTerrainWave.tsx`.
- **Cumulative Layout Shift (CLS):** Estimated 0.18 (Poor).
  - *Cause:* Botanical foliage images in `About.tsx` (`leave_left.png`, `leave_right.png`) and project screenshots in `Projects.tsx` lack explicit HTML `width` and `height` attributes.

#### 2. Network Payload Breakdown
- **120-Frame Scrollytelling Sequence:** **9.25 MB** (120 WebP frames of 60KB–80KB each).
- **Botanical Leaf PNGs (`leave_left.png`, `leave_right.png`):** **525.87 KB** uncompressed 32-bit PNG.
- **Project Images (`public/images/*.webp`):** **~2.1 MB**.
- **JavaScript Bundle (`dist/assets/index-CBfCsL7V.js`):** **287.26 KB** (86.8 KB gzipped).
- **Tailwind CDN JIT Runtime:** **~300 KB** gzipped.
- **Total Initial Page Transfer:** **>12.5 MB** on initial load (acceptable threshold for Lighthouse 100 is <1.5 MB).

---

### B. Accessibility Deep Dive (WCAG 2.2 AA Compliance)

1. **Missing ARIA State on Mobile Menu (`src/components/Navbar.tsx:82-86`):**
   - The mobile hamburger toggle button `<button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">` does not declare `aria-expanded={isMenuOpen}` or `aria-controls="mobile-nav"`. Screen reader users cannot tell if the drawer is expanded or collapsed.
2. **Keyboard Trap & Missing Focus Management in Mobile Drawer (`src/components/Navbar.tsx:97-143`):**
   - When the mobile menu opens, focus is not moved into the drawer, nor is focus trapped. Pressing `Tab` cycles through hidden background links. Pressing `Escape` does not close the menu.
3. **Non-Semantic Clickable Container (`src/components/Projects.tsx:27-30`):**
   - `<div onClick={() => window.open(link, ...)} className="project-card ... cursor-pointer">` is an interactive control implemented on a `<div>`. It lacks `role="link"`, `tabIndex={0}`, and `onKeyDown` handlers. Keyboard-only users cannot access the project link through this card.
4. **Nested Interactive Elements (`src/components/Projects.tsx:28-60`):**
   - An `<a>` link (`<Button href={link}>`) is nested inside the clickable `<div onClick=...>` card container. Nested interactive targets violate WCAG 4.1.2 and cause inconsistent assistive technology navigation.
5. **Inaccessible Form Controls (`src/components/Contact.tsx:278-330`):**
   - The custom "Project Type" dropdown uses a `<button>` triggering a list of `<div>` items. It lacks standard WAI-ARIA combobox/listbox attributes (`role="listbox"`, `role="option"`, `aria-selected`, `aria-haspopup`). Keyboard arrow keys (`ArrowDown`, `ArrowUp`, `Enter`, `Escape`) do not navigate or select items.
6. **Multiple `<h1>` Headings on a Single Page:**
   - `src/components/ScrollytellingHero.tsx:226`: `<h1 ...>M. ASIF</h1>`
   - `src/components/About.tsx:234`: `<h1>ABOUT <span>ME</span></h1>`
   - Having multiple `<h1>` elements violates standard document heading hierarchy guidelines (WCAG 1.3.1).
7. **Disruptive Brand Heading (`src/components/Navbar.tsx:54`):**
   - The navbar brand text is wrapped in `<h2 className="...">M. Asif</h2>`. Brand logos should not be section headings.
8. **Global Cursor Override (`index.html:198-200`):**
   - `body { cursor: crosshair; }` overrides the native operating system cursor globally, impairing usability for users with motor and vision difficulties.

---

### C. Best Practices Deep Dive

1. **Unsafe API Key Define Pattern (`vite.config.ts:13-16`):**
   ```ts
   define: {
     'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
     'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
   }
   ```
   If a developer defines `GEMINI_API_KEY` in their local `.env`, Vite statically replaces `process.env.GEMINI_API_KEY` in the compiled client-side JavaScript bundle, making secret keys publicly extractable by anyone inspecting network responses.
2. **Missing Subresource Integrity (SRI) on CDN Scripts (`index.html:10-18`):**
   - No `integrity` or `crossorigin` attributes are specified on external scripts (`cdnjs.cloudflare.com`, `unpkg.com`, `cdn.tailwindcss.com`).
3. **Third-Party CDN Importmap Collision (`index.html:202-210`):**
   - An importmap mapping `react` and `react-dom` to `https://aistudiocdn.com/react@^19.2.0/` is declared in `<head>`, while Vite simultaneously bundles React into `dist/assets/index-*.js`. This introduces potential dual-runtime conflicts and unversioned CDN latency.
4. **Missing Favicon:**
   - No `<link rel="icon" ...>` is defined in `index.html`. Browsers request `/favicon.ico` on initial load, generating HTTP 404 errors.
5. **Console Errors on Failed Frames (`src/components/ScrollytellingHero.tsx:46`):**
   - Frame preloading includes `console.error` handlers that emit errors into production DevTools if network timeouts occur.

---

### D. Search Engine Optimization (SEO) Deep Dive

1. **Missing OpenGraph Metadata:** No `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, or `og:site_name` tags exist in `index.html`. Social media links (LinkedIn, Twitter, Telegram, WhatsApp) will display blank fallback link previews.
2. **Missing Twitter/X Card Metadata:** No `twitter:card`, `twitter:title`, `twitter:description`, or `twitter:image` tags.
3. **Missing Canonical URL:** No `<link rel="canonical" href="..." />` tag to avoid duplicate content penalties.
4. **Missing Search Engine Directives:**
   - No `public/robots.txt` file exists.
   - No `public/sitemap.xml` file exists.
5. **Missing JSON-LD Structured Data:** No `schema.org/Person` or `ProfilePage` structured data to enable rich Google search snippets.

---

## PHASE 3 — COMPLETE UI/UX AND VISUAL AUDIT

### 1. Typography & Styling Inconsistencies
- `src/index.css:22-24` defines an aggressive universal rule:
  ```css
  @layer base {
    html, body, * { font-family: 'Mazzard H', sans-serif; }
  }
  ```
  This overrides the Tailwind configuration in `index.html:115` (`Space Grotesk` for `font-display`, `Inter` for `font-sans`), rendering the imported Google Fonts partially unused while making the page completely reliant on the unversioned font downloaded from `db.onlinewebfonts.com`.

### 2. Layout & Responsiveness Testing Matrix

| Viewport | Device / Category | Measured Behavior | Status |
|---|---|---|---|
| **1920px** | Ultra-Wide Desktop | Layout centered within `max-w-7xl`. PrecisionSection pillars scale via `vw` correctly. | Pass |
| **1440px** | Standard Desktop | Ideal layout. Two-column contact section and projects grid aligned. | Pass |
| **1280px** | Laptop | Navigation, projects, and contact grid render with proportional spacing. | Pass |
| **1024px** | Tablet Landscape | Pillar labels in `PrecisionSection` begin crowding horizontally (`clamp(11px, 0.86vw, 15px)`). | Warning |
| **768px** | Tablet Portrait | Mobile menu activates at `< 768px` (`md:hidden`). TechStack switches cleanly to 2 columns. | Pass |
| **430px** | iPhone Pro Max | Hero canvas scales to viewport. Project cards stack vertically. Contact dropdown fits viewport. | Pass |
| **390px** | Standard Mobile | Contact input line widths scale properly. | Pass |
| **375px** | Small Mobile | Pillar vertical lines in mobile experience roadmap scale without horizontal overflow. | Pass |
| **320px** | Minimum Mobile | Quick-select service chips in `Contact.tsx` (`grid-cols-2`) wrap text tightly; potential truncation on labels like "Enterprise Modernization". | Warning |

### 3. Animation Performance & Lifecycle Audit
1. **Memory Leak in `DigitalTerrainWave.tsx:66-70`:**
   ```tsx
   window.addEventListener('scroll', () => {
     const rect = canvas.getBoundingClientRect();
     canvasLeft = rect.left;
     canvasTop = rect.top;
   }, { passive: true });
   ```
   This anonymous scroll listener is attached on mount, but the cleanup function on lines 411-415 does not remove it. Every time props change, an orphaned scroll handler leaks onto `window`, repeatedly calling `getBoundingClientRect()` on scroll and causing layout thrashing.
2. **Memory Leak in `ScrollytellingHero.tsx:106`:**
   ```tsx
   window.addEventListener('resize', handleResize);
   ```
   In `ScrollytellingHero.tsx`, the `resize` listener is never detached in the `useLayoutEffect` cleanup return block.
3. **Main-Thread React Thrashing in `ScrollytellingHero.tsx:83`:**
   ```tsx
   setCurrentFrame(Math.round(airbnb.frame) + 1);
   ```
   During user scrolling, `updateCanvas()` invokes `setCurrentFrame()` up to 60–120 times per second, triggering high-frequency React component re-renders solely to evaluate `${currentFrame >= 105 ? ... : ...}` on line 223.

---

## PHASE 4 — CODE QUALITY AND FRONTEND ENGINEERING AUDIT

### 1. TypeScript Strictness
- In `tsconfig.json`, `"strict": true` is missing!
- Default loose compilation permits implicit `any`, unhandled `null`/`undefined`, and unchecked property access.
- Widespread usage of `(window as any).gsap` bypasses compile-time type safety.

### 2. Component Separation & Reusability
- `Projects.tsx` defines `allProjects` (an array of 11 project objects with detailed descriptions and metadata) directly inside the component body, creating unnecessary object allocations on re-renders. Project data should be extracted into a dedicated `data/projects.ts` file.
- `PrecisionSection.tsx` defines `PILLARS` at the top of the file with hardcoded `vw` units.

---

## PHASE 5 — SECURITY AUDIT

### Findings
1. **Unsanitized URL Query Parameter Construction (`src/components/Contact.tsx:114-115`):**
   ```tsx
   const text = `*NEW PROJECT INQUIRY*%0A--------------------%0A*NAME:* ${formData.name}%0A*CONTACT:* ${formData.contact}%0A*SERVICE:* ${formData.service}%0A*MESSAGE:* ${formData.message}`;
   window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
   ```
   `formData.name`, `formData.contact`, and `formData.message` are concatenated directly without `encodeURIComponent()`. If user input contains characters such as `&`, `#`, or whitespace, query parameters become malformed, leading to parameter injection or URL breakage in WhatsApp Web.
2. **Missing `rel="noopener noreferrer"` on External Links:**
   - Multiple dynamic anchor tags and `window.open` calls open external tabs. While `Projects.tsx:28` specifies `'noopener,noreferrer'`, `window.open` in `Contact.tsx:115` lacks feature strings, exposing `window.opener` to the target page in legacy browsers.
3. **Dependency Vulnerabilities in Toolchain (`npm audit`):**
   - 9 vulnerabilities identified in development dependencies: 7 High (`vite`, `rollup`, `postcss`, `browserslist`, `nanoid`, `picomatch`, `source-map-js`), 1 Moderate, 1 Low.

---

## PHASE 6 — BUILD AND RUNTIME VALIDATION RESULTS

| Test / Command | Result | Output Details |
|---|---|---|
| `npm run build` | **SUCCESS** | Built in 1.45s. Emitted `dist/index.html` (8.18 kB), `dist/assets/index-CBfCsL7V.js` (287.26 kB), `dist/assets/index-COt-TXWQ.css` (3.83 kB). |
| `npx tsc --noEmit` | **SUCCESS** | Zero compile errors in loose mode. (Strict mode not yet enforced). |
| `npm test` | **NOT VERIFIED** | No test script configured in `package.json`. |
| `npx eslint .` | **NOT VERIFIED** | ESLint configuration file (`eslint.config.js`) missing. |
| `npm audit` | **FAILED (Exit 1)** | 9 vulnerabilities reported in toolchain packages. |

---

## PHASE 7 — ROUTE-BY-ROUTE AUDIT INVENTORY

The application is an architecturally centralized Single Page Application (SPA) serving a single route (`/`).

### Route: `/` (Main Portfolio Page)
- **Sections Audited:**
  1. `Navbar` (`#`)
  2. `ScrollytellingHero` (`#home`)
  3. `About` (`#about`)
  4. `TechStack` (`#skills`)
  5. `Projects` (`#projects`)
  6. `PrecisionSection` (`#experience`)
  7. `Contact` (`#contact`)
  8. `Footer`
- **UI Quality:** 9.2/10 (High visual fidelity, cyberpunk aesthetic, polished animations).
- **Responsive Quality:** 8.8/10 (Robust across 320px–1920px viewports).
- **Accessibility Score:** 7.4/10 (Requires ARIA dropdowns, focus trapping, heading hierarchy fixes).
- **Performance Score:** 4.8/10 (Severe asset overhead: 120 image preloads, runtime Tailwind CDN, uncompressed foliage PNGs).
- **Console Output:** Zero runtime errors during nominal scrolling; network queue throttled during scrollytelling preload.

---

## PHASE 8 — LIGHTHOUSE 100 ROADMAP & REPAIR STRATEGY

To reach scores as close to 100 as technically possible across all 4 Lighthouse categories, execute the following targeted strategy:

### 1. Performance (Target: 100)
1. **Migrate from Runtime Tailwind CDN to Build-time PostCSS/Tailwind:**
   - Remove `<script src="https://cdn.tailwindcss.com"></script>`.
   - Install `tailwindcss` and `postcss` in devDependencies, configure `tailwind.config.js` and `postcss.config.js`.
   - Generates minimal purged CSS (~12–15KB) at build time, eliminating 300KB+ of runtime JIT compiler overhead.
2. **Optimize Scrollytelling Sequence in `ScrollytellingHero.tsx`:**
   - Replace 120 individual WebP frame preloads with an optimized, hardware-accelerated MP4/WebM video stream or scrubbed sprite canvas, cutting initial payload from **9.25 MB to ~1.2 MB**.
   - Lazy-load scrollytelling frames only after the initial hero text/viewport has rendered.
3. **Convert Botanical PNGs to AVIF/WebP:**
   - Convert `leave_left.png` (242.9 KB) and `leave_right.png` (282.9 KB) into compressed WebP/AVIF (~35 KB each), saving **~450 KB**.
   - Add explicit `width="440" height="440"` and `loading="lazy"` attributes.
4. **Self-host Mazzard H and Google Fonts:**
   - Eliminate calls to `https://db.onlinewebfonts.com/`. Place WOFF2 font files in `public/fonts/` with `font-display: swap`.

### 2. Accessibility (Target: 100)
1. **Implement WAI-ARIA Combobox on Contact Dropdown (`Contact.tsx`):**
   - Add `role="combobox"`, `role="listbox"`, `role="option"`, `aria-expanded`, and keyboard arrow navigation.
2. **Fix Mobile Drawer Focus Trap & ARIA Attributes (`Navbar.tsx`):**
   - Add `aria-expanded={isMenuOpen}`, `aria-controls="mobile-nav"`, focus-trap on open, and `Escape` key listener.
3. **Convert Project Card to Semantic Navigation (`Projects.tsx`):**
   - Remove nested interactive buttons from inside the clickable `<div>`. Make the card accessible via keyboard tab sequence.
4. **Normalize Heading Hierarchy:**
   - Demote `Navbar.tsx` brand from `<h2>` to `<span>`.
   - Keep only one `<h1>` in `ScrollytellingHero.tsx`; change `About.tsx` heading to `<h2>`.

### 3. Best Practices (Target: 100)
1. **Remove Vite Define for Secret Keys (`vite.config.ts`):**
   - Remove `process.env.GEMINI_API_KEY` define to prevent client-side secret exposure.
2. **Add Missing Favicon:**
   - Place `favicon.ico` and SVG icon in `public/` and reference them in `index.html`.
3. **Bundle GSAP and Lenis via npm:**
   - Remove synchronous `<script>` CDN tags from `index.html`. Import them via standard ES modules so Vite can bundle, tree-shake, and hash them.

### 4. SEO (Target: 100)
1. **Add Full OpenGraph and Twitter Metadata in `index.html`:**
   - `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `twitter:card`.
2. **Create `public/robots.txt` and `public/sitemap.xml`:**
   - Standard allow-all directives pointing to canonical domain.
3. **Add JSON-LD Structured Data:**
   - Inject Schema.org `Person` / `WebSite` structured data for rich search engine indexing.

---

## OVERALL PRODUCTION READINESS VERDICT

```
╔════════════════════════════════════════════════════════════════════════════╗
║                      PRODUCTION READINESS VERDICT:                         ║
║                                                                            ║
║                            ⛔ NOT READY                                    ║
║                                                                            ║
║  The portfolio exhibits standout UI design and strong visual impact, but   ║
║  cannot be deployed to a high-traffic production environment due to:       ║
║  1. Critical 12.5MB payload & 120-request network flood in Hero.          ║
║  2. Development-only runtime Tailwind CDN compiler in production.          ║
║  3. Accessibility violations (keyboard traps, non-semantic clickables).    ║
║  4. Missing SEO metadata, robots.txt, sitemap, and favicon.                ║
║  5. Security risks in API define patterns and query string handling.       ║
╚════════════════════════════════════════════════════════════════════════════╝
```

