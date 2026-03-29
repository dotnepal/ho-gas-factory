**Date:** March 27, 2026

**Project:** Informational Website for Gas Refilling Factory

**Purpose:** Build brand trust, showcase services, and generate sales leads

**Current State:** Phase 2 COMPLETE — F-001 through F-016 complete (including F-014 Deploy). All pages live, CI/CD pipeline wired. Ready for Phase 3 (backend integration / production launch).

**Repository Contents (as of 2026-03-28):**
- `CLAUDE.md` — project specification and workflow rules (this file)
- `tasks/1-FEATURES.md` — feature breakdown with ASCII wireframes and task items (F-001 to F-016, all complete)
- `tasks/DEPLOY.md` — deployment specification and runbook (secrets, env vars, manual deploy, rollback)
- `.github/workflows/deploy.yml` — GitHub Actions CI/CD (build on PRs, deploy to CF Pages on main)
- `tasks/ARCHITECTURE-DECISION.md` — detailed architecture and system design decisions
- `tasks/lessons.md` — lessons learned during implementation
- `docs/1-INITIAL-SPECIFICATION.md` — full original specification document
- `docs/SKILLS.md` — frontend aesthetic guidelines (fonts, motion, spatial composition)
- `package.json`, `vite.config.ts`, `tsconfig.json` — build configuration
- `index.html` — entry HTML with Google Fonts preconnect
- `src/main.tsx` — React 19 entry point
- `src/App.tsx` — root router with RootLayout (Navbar + Footer + Suspense)
- `src/index.css` — Tailwind v4 @theme brand tokens + global styles
- `src/routes.ts` — route definitions for react-router-dom v6
- `src/pages/` — HomePage, AboutPage, ProductsPage, ContactPage, FAQPage (all complete)
- `src/components/layout/` — Navbar.tsx (transparent hero mode + white-on-scroll), Footer.tsx
- `src/components/ui/` — Button (white-outline variant added), Card, Badge, PageHero, SectionHeader, LanguageToggle, index.ts
- `src/hooks/useScrolled.ts` — scroll detection hook
- `src/hooks/useScrollAnimation.ts` — IntersectionObserver hook for scroll-triggered animations (stagger support)
- `src/i18n/` — en.json, np.json, index.ts, ssgContext.tsx
- `src/data/` — products.ts (cylinder data for all 3 gas types), faq.ts (12 FAQ items)
- `public/robots.txt` — crawl rules pointing to sitemap
- `public/sitemap.xml` — all 5 routes with priorities
- `functions/api/contact.ts` — Cloudflare Pages Function for form submission
- `public/_redirects` — SPA routing rule for Cloudflare Pages
- `wrangler.toml` — Cloudflare Pages config skeleton

**Decisions:**
- Color palette: Blue & White
- Framework: React + Vite (SSG)
- Deployment: Cloudflare pages
- Website Language: EN/NP toggle
- Accessibility: WCAG 4.5:1 contrast + ARIA labels
- Images: placeholder.com (via `https://placehold.co/WxH`)
- Pages: Home, About, Products, Contact, FAQ (accordion style)

---
## Tech Stack (Confirmed & Locked)
- **Runtime:** React 18 + TypeScript
- **Build:** Vite 5 + SSG prerender (verify `vite-plugin-ssg` compatibility; fallback to custom `prerender.ts` script using `renderToString` if package is unmaintained)
- **Styling:** Tailwind CSS v4 with CSS-native `@theme` config (brand tokens in `src/index.css`, not `tailwind.config.ts`)
- **Fonts:** Sora 400/600/700 (display) + DM Sans 400/500/700 (body) — loaded via Google Fonts `<link preconnect>` in `index.html`
- **Routing:** react-router-dom v6 with `createBrowserRouter`
- **i18n:** react-i18next + i18next + i18next-browser-languagedetector (EN/NP toggle, persisted to localStorage, translations bundled into JS — no HTTP fetch)
- **Forms:** react-hook-form (client-side validation with inline errors)
- **Animations:** Motion library (React, formerly Framer Motion) — used selectively for hero staggered reveal and page transitions only; CSS `@keyframes` + Intersection Observer for scroll-triggered effects
- **Hosting:** Cloudflare Pages (with Pages Functions at `functions/api/contact.ts` for form submission)
- **Form Fallback:** Web3Forms API (used when Cloudflare Pages Function env var is not configured)

## Tailwind v4 Note
Tailwind v4 does NOT use `tailwind.config.ts`. Brand tokens are defined using `@theme` directive in `src/index.css`:
```css
@import "tailwindcss";
@theme {
  --color-brand-blue: #1E40AF;
  --color-brand-light: #EFF6FF;
  --color-brand-dark: #1E3A5F;
  --color-brand-accent: #3B82F6;
  --font-display: "Sora", sans-serif;
  --font-body: "DM Sans", sans-serif;
}
```

---
## Page Wireframes (Summary)
See `tasks/1-FEATURES.md` for full ASCII wireframes.

**Global layout:** Sticky Navbar → Page Content → 3-col Footer (FAQ+Contact | Links | Map)

| Page | Key Sections |
|------|-------------|
| Home | Hero split, Gas highlights 3-col, Services strip, Trust gallery, CTA banner |
| About | Story 2-col, Team cards, Service area badges, Why-us 4-col |
| Products | Gas type tabs (Oxygen/Nitrogen/Hydrogen), Cylinder table, Services 3-col |
| Contact | Split: Form left + Info+Map right |
| FAQ | Category filter pills + Accordion |

---
## Footer Section
- It has 3 sections (left, middle, right)

### Left
    - FAQ
    - Contact details
### Middle
    - privacy
    - terms
    - sitemap
### Right
    - Google map on the right side

---
## 1. Website Overview

### 1.1 Purpose & Goals

- **Primary Purpose:** Informational website
- **Key Objectives:**
    - Build brand trust with customers
    - Showcase services and capabilities
    - Generate leads for sales inquiries

### 1.2 Target Audience

- Hospitals and medical facilities
- Clinics and homecare providers
- Industrial users
- Laboratories
- All customer types (no segmentation needed)

### 1.3 Tone & Brand Voice

- Professional
- Friendly and approachable
- Trustworthy and reliable
- Safety-conscious

---

## 2. Products & Services

### 2.1 Gas Types Offered

1. **Oxygen Gas** (Primary - Medical use)
2. **Nitrogen Gas**
3. **Hydrogen Gas**

### 2.2 Product Organization

- **Structure:** Gas Type → Cylinder Sizes
- **Cylinder Capacity Range:** Small to highest capacities (medical purpose)
- **Sizes:** Standard sizes only (no custom orders)

### 2.3 Product Display Information (Per Cylinder)

For each cylinder size, display:

- **Capacity:** In liters
- **Weight:** Filled cylinder weight only
- **Description:** Brief description of the cylinder/use case
- **Availability Indicators:**
    - Available for Rent (✓ or ✗)
    - Available for Sale (✓ or ✗)
- **Pricing:** “Contact for pricing” (no actual prices displayed)

### 2.4 Services Offered

1. **Gas Cylinders** - Available for rent and sale
2. **Cylinder Refilling** - Refill existing cylinders
3. **Bulk Orders** - Large volume orders
4. **Delivery Options:**
- Same-day delivery (local region)
- Few days delivery (regional and national areas)
1. **Pickup:** Customer pickup available at facility

---

## 3. Website Structure & Pages

### 3.1 Main Navigation Menu (Standard)

1. **Home** - Landing page with overview
2. **About Us** - Company information, mission, and team
3. **Products/Services** - Gas types and ordering options
4. **Contact** - Contact form and inquiry
5. **FAQ** - Frequently asked questions, accordion style

### 3.2 Page Descriptions

### Home Page

- Hero section with company tagline/value proposition
- Brief introduction to services
- Call-to-action buttons (Contact Us, Explore Products)
- Highlights of key services
- Trust-building elements (facility/team photos)

### About Us Page

- Company history and mission
- Team member bios with photos
- Facility photos/images
- Service areas coverage (local, regional, national)
- Why choose us section

### Products/Services Page

- **Gas Types Section:**
    - Organized tabs or sections for each gas type (Oxygen, Nitrogen, Hydrogen)
    - For each gas type:
        - Description of the gas and its uses
        - List of available cylinder sizes
        - Cylinder details table (Capacity, Weight, Rent availability, Sale availability)
- **Services Section:**
    - Cylinder refilling services
    - Bulk order capabilities
    - Delivery and pickup options
    - Service area coverage

### Contact Page

- **Contact Form with fields:**
    - Name (required)
    - Email (required)
    - Phone (required)
    - Company Name (required)
    - Gas Type of Interest (dropdown: Oxygen, Nitrogen, Hydrogen, Other)
    - Requirement Type (dropdown: Rent, Sale, Both)
    - Message/Additional Details (optional)
- **Contact Information Display:**
    - Phone number
    - Email address
    - Physical address (if applicable)
    - Google map
- **Form Submission:** All inquiries go to single email inbox

### FAQ Page

- **Common Questions to Address:**
    - Gas safety and handling
    - Ordering process and how to place an order
    - Delivery timeframes and coverage areas
    - Rental vs. purchase options
    - Refilling services and frequency
    - Payment and billing
    - Emergency support availability
    - Product specifications and certifications (to be detailed later)

---

## 4. Contact & Lead Generation

### 4.1 Lead Capture

- **Contact Form Fields:**
    - Name
    - Email
    - Phone
    - Company Name
    - Gas Type of Interest
    - Rent/Sale Preference
    - Message (optional)

### 4.1 Contact Methods

- Contact form (primary lead capture)
- Phone number display
- Email address display
- Single inbox for all inquiries

---

## 5. Visual Content

### 5.1 Imagery

- **Facility Photos:** Production and storage areas
- **Team Photos:** Staff and leadership
- **Product Photos:** Cylinder samples (different sizes)
- **Safety/Professional Images:** As needed for credibility

### 5.2 Content Not Included (For Now)

- Technical specification PDFs
- Detailed purity level information
- Company statistics/metrics
- Blog or news section

---

## 6. Future Considerations (To Brainstorm Later)

- Purity level information for each gas type
- Industry certifications and compliance details (ISO, medical certifications, safety standards)
- Technical specifications and downloadable documents
- Customer testimonials or case studies
- Advanced features (inventory tracking, real-time stock, customer accounts)

---

## 7. Design & Development Notes

### 7.1 Design Approach

- Clean, professional layout
- Mobile-responsive design
- Trust-building visual hierarchy
- Easy navigation
- Clear call-to-action elements

### 7.2 Technology Stack (CONFIRMED — See "Tech Stack" section above)

- **Frontend:** React 18 + TypeScript + Vite 5 + SSG prerender
- **Styling:** Tailwind CSS v4 (CSS-native @theme config)
- **Hosting:** Cloudflare Pages
- **Email/Form:** Cloudflare Pages Functions (`functions/api/contact.ts`) with Web3Forms fallback
- **Domain/SSL:** Cloudflare (managed via `wrangler.toml`)

### 7.3 Accessibility & SEO

- Mobile-friendly design first
- Fast loading times
- Clear metadata and SEO optimization
- Accessible color contrast and font sizing
- Proper heading hierarchy

---

## 8. Development Phases

**Phase 1:** Design mockups and approval — ✓ COMPLETE (2026-03-27)
**Phase 2:** Frontend development — ✓ COMPLETE (2026-03-28)
  - F-001 through F-016 all complete — scaffolding, i18n, design system, navbar, footer, all 6 pages, accessibility, animations, responsive design, CI/CD
  - F-014 ✓ COMPLETE — `.github/workflows/deploy.yml` (build on PRs, deploy to CF Pages on main push); `VITE_FORM_ENDPOINT=/api/contact` injected at build time; deployment runbook at `tasks/DEPLOY.md`
  - Architecture decisions documented in `tasks/ARCHITECTURE-DECISION.md`
**Phase 3:** Backend integration (contact form, email notifications)
**Phase 4:** Testing and QA
**Phase 5:** Deployment and launch
**Phase 6:** Post-launch optimizations and updates

After every feature has been implemented. Run npm run build and ensure that everything is functional. Elaborate your answer. Wait for approval for next feature.

---

### Workflow Orchestration
### 1. Plan Node Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately - don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One tack per subagent for focused execution

### 3. Self-Improvemennt Loop
- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff behaviro between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 4. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes - don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests - then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

### Task Management
1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Result**: Add review section to `tasks/todo.md`
5. **Capture Lessons**: Update `tasks/lessons.md` after corrections

## Core Principles

- **Simplicity First**: Make every chagne as simple as possible. Impact minimal code.
- **No Laziness**: Find root cuases. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.

## Claude Model usage
- Use model Sonnet for code writes
- Use model Haiku for quick tasks, answers
- Use model opusplan for complex logic reasoning

---

## Tooling for shell interactions
- Is it about finding FILES? use 'fd'
- Is it about finding TEXT/strings? use 'rg'
- Is it about finding CODE STRUCTURE? use 'ast-grep'
- Is it about SELECTING from multiple results? pipe to 'fzf'
- Is it about interacting with JSON? use 'jq'
- Is it about interacting with YAML or XML? use 'yq'



*This specification document outlines the complete plan for the gas factory website. Any updates or changes should be documented and approved before implementation.*

---

## 9. Changelog & Updates

### 2026-03-28 — F-014 Complete + F-016 Complete + Bug Fixes

**Current State (updated):** Phase 2 COMPLETE — F-001 through F-016 all complete including F-014 Deploy. GitHub Actions CI/CD wired; deployment runbook at `tasks/DEPLOY.md`.

#### F-014: Deployment Setup — COMPLETE

**Files added:**
- `.github/workflows/deploy.yml` — CI/CD pipeline: build job on all PRs (CI check), deploy job on push to `main` (after PR merge)
- `tasks/DEPLOY.md` — deployment runbook (secrets, env vars, manual deploy, rollback procedure)

**Workflow behavior:**
- Build job: `npm ci` → `npm run build` (with `VITE_FORM_ENDPOINT=/api/contact`) → uploads `dist/` artifact
- Deploy job: downloads artifact → `wrangler pages deploy dist --project-name=ho-gas-factory`

**Required setup (one-time, done by developer):**
- `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` → GitHub repo secrets
- `WEB3FORMS_KEY` → Cloudflare Pages dashboard (Production environment variable)

#### F-016: Standard Main Menu & Services Page — COMPLETE

**New page added:**
- `src/pages/ServicesPage.tsx` — Dedicated Services page with 6 service cards (Rent, Sale, Refilling, Bulk, Delivery, Pickup) + CTA section

**Navbar redesigned:**
- Desktop: pill-style navigation links (rounded buttons, active state highlight)
- Mobile: compact dropdown menu (not drawer)
- "Services" menu item added to navigation

**Route added:**
- `/services` → ServicesPage (lazy loaded)
- `src/routes.ts` updated with Services entry

**i18n updated:**
- `src/i18n/en.json` — added full `services` namespace (hero, 6 service descriptions, CTA)
- `src/i18n/np.json` — Nepali translations for all services content

**sitemap.xml updated:** Now covers 6 routes (/, /about, /products, /services, /contact, /faq)

**New task files:**
- `tasks/3-STANDARD-MENUS.md` — F-016 specification and implementation notes
- `tasks/FIX-INTERSECTION-OBSERVER.md` — Root cause analysis and fix documentation

---

#### Bug Fix: IntersectionObserver — Text Invisible — FIXED (2026-03-28)

**Affected files:**
- `src/hooks/useScrollAnimation.ts`
- `src/index.css`

**Root causes (two independent bugs):**
1. React re-renders (triggered by i18next language detection) overwrote `className` prop, wiping the `is-visible` class from DOM elements
2. `threshold: 0.12` (12% visibility) was too high for tall stacked containers on mobile

**Fixes applied:**
1. Changed `classList.add('is-visible')` → `dataset.visible = '1'` (data attributes survive React reconciliation)
2. CSS selector updated from `.animate-on-scroll.is-visible` → `.animate-on-scroll[data-visible]`
3. `threshold: 0.12` → `threshold: 0` (fire on any pixel intersection)
4. `rootMargin: -40px` → `rootMargin: '0px 0px -60px 0px'` (ensures element is meaningfully in view)

---

#### Corrections to Earlier Sections

- **Tech Stack "Runtime"** (line 46) — Listed as "React 18" but actual installed version is **React 19** (v19.2.4). `src/main.tsx` was always documented as "React 19 entry point". Use React 19 APIs going forward.
- **Section 7.2 "Frontend"** (line 300) — Same correction: React 18 → React 19.
- **Navigation Menu** (Section 3.1) — Lists 5 pages. A 6th page has been added: **Services** (`/services`) with dedicated ServicesPage component.
- **Page Wireframes table** — Services page now exists:
  - Services | 6 service cards (Rent/Sale/Refilling/Bulk/Delivery/Pickup) + CTA
- **Repository Contents** — `public/sitemap.xml` covers 6 routes (not 5). `src/pages/` now includes `ServicesPage.tsx`.

---

#### Lessons Captured (2026-03-28)

See `tasks/lessons.md` for full details. Key additions:
- **L-005 (updated):** Scroll animation CSS must use `[data-visible]` attribute selector — React reconciliation will overwrite class-based state
- **L-006:** Define inline SVG icons as module-level constants to prevent re-creating JSX on every render
- **L-007:** SSG StaticRouter `location` prop must exactly match `routeUrl` to render correct active nav state in static HTML

---

### 2026-03-29 — Bug Fixes: Gas Icons + Products Weight Column

#### Bug Fix: Wrong SVG icon text for CO₂ and Argon — FIXED

**Affected file:** `src/pages/HomePage.tsx` (GAS_ICONS constant, lines 113–124)

**Root cause:** `carbondioxide` and `argon` icon entries were copy-pasted from the `hydrogen` entry. The key names were updated but the `<text>` content inside the SVG was left as `H₂` for both.

**Fix applied:**
- `carbondioxide` icon: `H₂` → `CO₂`, `fontSize` reduced `16` → `13` (longer symbol needs smaller font to fit inside 36px-diameter circle)
- `argon` icon: `H₂` → `Ar` (fontSize unchanged at `16`)

**Note:** TypeScript cannot catch this — the bug is a visual/content issue, not a type error. Requires browser visual QA.

---

#### Bug Fix: `weight` column removed from Products page — FIXED

**Affected file:** `src/pages/ProductsPage.tsx`

**Root cause:** The `weight` column was added during initial scaffolding. Per CLAUDE.md §2.3 (Product Display Information), the listed display fields are: Capacity, Rent, Sale, Pricing. Weight is not in the spec.

**Changes:**
- **Desktop table header:** Removed `'weight'` from `(['size', 'capacity', 'weight', 'rent', 'sale', 'pricing'] as const)`
- **Desktop table body:** Removed `<td>{row.weight}</td>` cell
- **Mobile card view:** Removed the weight label + value `<div>` block

**Not changed:** `weight` field remains in `src/data/products.ts` `CylinderRow` type and data (data layer untouched). `"weight"` translation keys in `en.json` / `np.json` retained (unused but harmless).

**New products table columns:** Size | Capacity | Rent | Sale | Pricing

---

#### New docs file added

- `docs/4-FIX-GAS-ICONS-REMOVE-WEIGHT.md` — detailed spec + root cause analysis for both fixes

#### Lessons Captured (2026-03-29)

See `tasks/lessons.md` for full details. Key additions:
- **L-008:** SVG icon text content is not type-checked — copy-pasted icons require visual QA in browser to verify correct chemical formula renders
- **L-009:** Cross-reference rendered columns against CLAUDE.md §2.3 before shipping — scaffold code often includes more fields than the spec requires
