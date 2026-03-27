# HO Gas Factory — Feature Breakdown

**Status:** Phase 1 (Design/Mockup) ✓ Complete → Phase 2 (Implementation) pending approval

---

## Wireframe Mockups

### Global Layout
```
┌─────────────────────────────────────────────────────────────┐
│ NAVBAR: Logo | Home | About | Products | Contact | FAQ | EN/NP │
├─────────────────────────────────────────────────────────────┤
│                        <PAGE CONTENT>                        │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                       │
│ ┌──────────────────┬──────────────────┬───────────────────┐ │
│ │ LEFT             │ MIDDLE           │ RIGHT             │ │
│ │ FAQ              │ Privacy Policy   │ [Google Map]      │ │
│ │ Contact details  │ Terms of Service │                   │ │
│ │                  │ Sitemap          │                   │ │
│ └──────────────────┴──────────────────┴───────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Home Page
```
┌───────────────────────────────────────────────────────────┐
│ HERO (split: text left, image right)                       │
│  "Reliable Gas Supply for Medical & Industrial Use"        │
│  [Contact Us]  [Explore Products]                          │
├───────────────────────────────────────────────────────────┤
│ GAS HIGHLIGHTS — 3-col cards                               │
│  [Oxygen / Medical]  [Nitrogen / Industrial]  [Hydrogen]   │
├───────────────────────────────────────────────────────────┤
│ SERVICES STRIP — icon row                                  │
│  Rent | Sale | Refilling | Bulk Orders | Delivery          │
├───────────────────────────────────────────────────────────┤
│ TRUST GALLERY — 3 placeholder images                       │
│  "Certified. Safe. Trusted by Hospitals across Nepal."     │
├───────────────────────────────────────────────────────────┤
│ CTA BANNER — "Ready to place an order?" [Contact Us Now]   │
└───────────────────────────────────────────────────────────┘
```

### About Us Page
```
┌───────────────────────────────────────────────────────────┐
│ PAGE HERO: "About HO Gas Factory"                          │
├───────────────────────────────────────────────────────────┤
│ STORY — text left, facility image right                    │
├───────────────────────────────────────────────────────────┤
│ TEAM — card grid (photo, name, role)                       │
├───────────────────────────────────────────────────────────┤
│ SERVICE AREAS — badge strip (Local | Regional | National)  │
├───────────────────────────────────────────────────────────┤
│ WHY CHOOSE US — 4-col icon grid                            │
│  Safety | Certified | Fast Delivery | 24/7 Support         │
└───────────────────────────────────────────────────────────┘
```

### Products/Services Page
```
┌───────────────────────────────────────────────────────────┐
│ PAGE HERO: "Our Products & Services"                       │
├───────────────────────────────────────────────────────────┤
│ GAS TABS: [Oxygen] [Nitrogen] [Hydrogen]                   │
│ Active tab shows:                                          │
│  - Description + use cases paragraph                       │
│  ┌──────┬──────────┬────────┬──────┬──────┬──────────┐    │
│  │ SIZE │ CAPACITY │ WEIGHT │ RENT │ SALE │ PRICING  │    │
│  │ S    │ 1.5 L    │ 3 kg   │  ✓   │  ✓   │ Contact  │    │
│  │ M    │ 5 L      │ 8 kg   │  ✓   │  ✓   │ Contact  │    │
│  │ L    │ 10 L     │ 15 kg  │  ✓   │  ✓   │ Contact  │    │
│  └──────┴──────────┴────────┴──────┴──────┴──────────┘    │
├───────────────────────────────────────────────────────────┤
│ SERVICES — 3-col cards                                     │
│  Refilling | Bulk Orders | Delivery (same-day / regional)  │
└───────────────────────────────────────────────────────────┘
```

### Contact Page
```
┌───────────────────────────────────────────────────────────┐
│ PAGE HERO: "Get In Touch"                                  │
├───────────────────────────────────────────────────────────┤
│ ┌──────────────────────────┬───────────────────────────┐  │
│ │ CONTACT FORM             │ CONTACT INFO + MAP        │  │
│ │ Name*                    │ 📞 Phone                  │  │
│ │ Email*                   │ 📧 Email                  │  │
│ │ Phone*                   │ 📍 Address                │  │
│ │ Company*                 │                           │  │
│ │ Gas Type (dropdown)      │ [Google Map Embed]        │  │
│ │ Requirement (drop)       │                           │  │
│ │ Message (optional)       │                           │  │
│ │ [Submit Inquiry]         │                           │  │
│ └──────────────────────────┴───────────────────────────┘  │
└───────────────────────────────────────────────────────────┘
```

### FAQ Page
```
┌───────────────────────────────────────────────────────────┐
│ PAGE HERO: "Frequently Asked Questions"                    │
├───────────────────────────────────────────────────────────┤
│ CATEGORY FILTER: [All] [Safety] [Ordering] [Delivery]      │
│                  [Rental] [Payment] [Emergency]            │
├───────────────────────────────────────────────────────────┤
│ ACCORDION                                                  │
│ ▶ What gases are available?                                │
│ ───────────────────────────────────────────────────────   │
│ ▼ How do I place an order?                                 │
│   Expanded answer text...                                  │
│ ───────────────────────────────────────────────────────   │
│ ▶ What are delivery timeframes?                            │
└───────────────────────────────────────────────────────────┘
```

---

## Feature Tasks

### F-001: Project Scaffolding
- [ ] Init React 18 + Vite + TypeScript (`npm create vite@latest`)
- [ ] Install & configure Tailwind CSS with brand color tokens
- [ ] Set up folder structure: `src/components/`, `src/pages/`, `src/i18n/`, `src/data/`, `src/hooks/`
- [ ] Configure `vite.config.ts` with `vite-plugin-ssg`
- [ ] Add Cloudflare Pages config (`public/_redirects`, `wrangler.toml` skeleton)
- [ ] Set up ESLint + Prettier

### F-002: i18n (EN/NP Language Toggle)
- [ ] Install `react-i18next` + `i18next` + `i18next-browser-languagedetector`
- [ ] Create `src/i18n/en.json` with all English strings
- [ ] Create `src/i18n/np.json` with all Nepali strings
- [ ] Language toggle button in Navbar (persists to localStorage)
- [ ] All page text wrapped in `t()` / `<Trans>` calls

### F-003: Design System / Theme
- [ ] Tailwind config: `brand-blue: #1E40AF`, `brand-light: #EFF6FF`, accent colors
- [ ] Font pair: Sora (display) + DM Sans (body) via Google Fonts
- [ ] CSS variables in `src/index.css`
- [ ] Reusable components: `Button.tsx`, `Card.tsx`, `Badge.tsx`, `SectionHeader.tsx`, `PageHero.tsx`

### F-004: Navbar & Header
- [ ] Sticky transparent-on-scroll navbar (shadow appears on scroll)
- [ ] Logo + nav links (Home, About, Products, Contact, FAQ)
- [ ] Mobile hamburger menu with slide-in drawer
- [ ] EN/NP toggle button
- [ ] Active route highlight using `NavLink`

### F-005: Footer
- [ ] 3-column grid layout
  - Left: FAQ link, phone, email
  - Middle: Privacy Policy, Terms of Service, Sitemap links
  - Right: Google Map embed (small static map)
- [ ] Mobile: 3-col → stacked single column
- [ ] Copyright line

### F-006: Home Page
- [ ] Hero section: tagline, sub-copy, two CTAs (`/contact`, `/products`), hero image
- [ ] Gas highlights: 3 cards (Oxygen, Nitrogen, Hydrogen) with icon + desc + "Learn More"
- [ ] Services strip: icon row (Rent, Sale, Refilling, Bulk Orders, Delivery)
- [ ] Trust gallery: 3 placeholder images + credibility tagline
- [ ] Bottom CTA banner

### F-007: About Us Page
- [ ] Page hero banner
- [ ] Company story section (2-col: text + facility image)
- [ ] Team cards grid (photo, name, role) — 3–4 placeholder members
- [ ] Service area badges (Local / Regional / National)
- [ ] "Why Choose Us" 4-col icon grid

### F-008: Products/Services Page
- [ ] Tab bar (Oxygen | Nitrogen | Hydrogen) with animated underline
- [ ] Per-tab: description + use cases list
- [ ] Cylinder table from `src/data/products.ts`: Size, Capacity, Weight, Rent ✓/✗, Sale ✓/✗, Pricing
- [ ] `src/data/products.ts` typed data for all 3 gas types
- [ ] Services section: 3 cards (Refilling, Bulk Orders, Delivery)

### F-009: Contact Page
- [ ] Contact form (`react-hook-form`): Name*, Email*, Phone*, Company*, Gas Type, Requirement, Message
- [ ] Client-side validation with inline error messages
- [ ] Form submission via Cloudflare Pages Function (Web3Forms as fallback)
- [ ] Success / error toast notification
- [ ] Contact info sidebar (phone, email, address)
- [ ] Google Map embed iframe

### F-010: FAQ Page
- [ ] FAQ data in `src/data/faq.ts`: `{ question, answer, category }[]`
- [ ] Category filter pills (All | Safety | Ordering | Delivery | Rental | Payment | Emergency)
- [ ] Accordion with smooth height animation
- [ ] Reactive filter on category click

### F-011: Accessibility & SEO
- [ ] ARIA labels on all interactive elements
- [ ] WCAG 4.5:1 contrast verified
- [ ] `<meta>` tags per page (title, description, OG)
- [ ] Semantic HTML throughout
- [ ] `alt` text on all images
- [ ] `lang` attribute switches with i18n (`en` / `ne`)
- [ ] `robots.txt` + `sitemap.xml`

### F-012: Animations & Polish
- [ ] Scroll-triggered fade-in + slide-up (Intersection Observer)
- [ ] Staggered card entrance (CSS delay per index)
- [ ] Hover lift on cards (`translateY(-4px)`)
- [ ] Smooth page transition (fade)
- [ ] Accordion height transition (no `display:none`)
- [ ] Navbar shadow on scroll

### F-013: Responsive Design
- [ ] Mobile-first breakpoints (sm:640, md:768, lg:1024, xl:1280)
- [ ] Cylinder table → card stack on mobile
- [ ] Footer 3-col → stacked on mobile
- [ ] Hero 2-col → stacked on mobile
- [ ] Touch targets min 44×44px

### F-014: Deployment Setup
- [ ] `public/_redirects`: `/* /index.html 200`
- [ ] `wrangler.toml` skeleton
- [ ] GitHub Actions: build → Cloudflare Pages on push to `main`
- [ ] `VITE_FORM_ENDPOINT` env var
- [ ] Verify clean `dist/` build output

---

## Implementation Order
1. F-001 → F-002 → F-003 (foundation)
2. F-004 → F-005 (shell)
3. F-006 → F-007 → F-008 → F-009 → F-010 (pages)
4. F-011 → F-012 → F-013 (polish)
5. F-014 (deploy)
