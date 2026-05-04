# Vantage Sport & Surface — Landing Page

Next.js 14 static export, deployed to GitHub Pages, with full SEO infrastructure baked in for local search rankings in Northwest Washington.

## Deploy to GitHub Pages

### One-time setup

1. **Create a new GitHub repo** and push this code to `main`.

2. **Enable GitHub Pages**:
   - Repo → Settings → Pages
   - Source: **GitHub Actions**

3. **Add your custom domain** (recommended for SEO):
   - Buy domain (e.g., `vantagesurface.com`) if you haven't
   - In Settings → Pages → Custom domain: enter `www.vantagesurface.com`
   - At your DNS provider, add a CNAME record: `www` → `<your-username>.github.io`
   - At your DNS provider, add A records for the apex (`@`):
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Wait for DNS propagation (1–24 hours)
   - Enable "Enforce HTTPS" once available

4. **Update `public/CNAME`** with your real domain.

5. **Update `lib/business.ts`** — change `url` to match your real domain.

### Every deployment after that

```bash
git push origin main
```

The GitHub Actions workflow at `.github/workflows/deploy.yml` builds and deploys automatically. Watch progress in the **Actions** tab.

### If NOT using a custom domain

If deploying to `username.github.io/vantage-sport-surface/`:

1. Open `next.config.js` and uncomment the `basePath` line, setting it to your repo name
2. Delete `public/CNAME`
3. Update `BUSINESS.url` in `lib/business.ts` to the full GitHub Pages URL

A custom domain is strongly recommended for any business site — it's a baseline trust and ranking signal.

## What's SEO'd

### Server-rendered at build time (crawler-visible)
- Page-specific `<title>`, meta description, canonical URL
- Open Graph + Twitter cards
- Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<article>`, `<address>`, `<footer>`)
- Single H1, hierarchical H2/H3
- Inline JSON-LD structured data graph:
  - **LocalBusiness + GeneralContractor** (NAP, geo, hours, service area, offer catalog)
  - **WebSite**
  - **BreadcrumbList**
  - **FAQPage** (eligible for FAQ rich results)
  - **Service** entries for each offering
- Microdata fallback on service cards

### Crawler infrastructure
- Static `sitemap.xml` (auto-generated at build)
- Static `robots.txt` (auto-generated at build)
- `manifest.webmanifest` for PWA / mobile signals
- `.nojekyll` flag (added by workflow) so GitHub Pages serves `_next/` correctly

### On-page SEO
- Geographic keywords woven naturally: Bellingham, Lynden, Mount Vernon, Whatcom, Skagit, Pacific Northwest
- Service-specific terminology: tennis court construction, pickleball court resurfacing, basketball court installation
- FAQ section targeting long-tail informational queries
- Descriptive alt text on every image (content + location)
- Service area enumeration with all cities and counties
- All NAP data from a single source: `lib/business.ts`

### Performance / Core Web Vitals
- `next/font` for self-hosted Inter (no FOIT, no font-swap CLS)
- Explicit `width`/`height` on all images (no layout shift)
- `loading="eager"` + `fetchpriority="high"` on first 3 gallery images
- DNS prefetch + preconnect for image CDN
- Tailwind purges unused CSS at build

## Trade-off with static export

Static export means we lose `next/image` server-side optimization. To compensate:
- All images use explicit dimensions to prevent CLS
- For best Core Web Vitals after launch, replace Unsplash hotlinks with locally-hosted optimized JPGs/WebPs in `public/projects/`
- Or use a third-party image CDN like Cloudinary or imgix

## Must-edit before launch

**`lib/business.ts`** — Update:
- `phone` and `phoneDisplay` (must match Google Business Profile *exactly*)
- `email`
- `address` (real street address)
- `geo` (latitude/longitude of studio — find at latlong.net)
- `sameAs` (links to GBP, Facebook, Instagram once active)
- `founded` (real year)
- `url` (production domain)

**Add to `/public`:**
- `og-image.jpg` (1200×630 social share preview)
- `favicon.ico`
- `apple-touch-icon.png` (180×180)
- `icon-192.png`, `icon-512.png`
- Project photos in `/public/projects/` and update `PROJECTS` array in `components/LandingPage.tsx`

**Connect Google Search Console** after first deploy:
- Add the verification token to `app/layout.tsx` → `metadata.verification.google`
- Submit `https://www.vantagesurface.com/sitemap.xml`

## Project structure

```
vantage/
├── .github/workflows/deploy.yml  # Auto-deploy on push to main
├── app/
│   ├── layout.tsx                # Root metadata + font + viewport
│   ├── page.tsx                  # Homepage + JSON-LD payload
│   ├── globals.css               # Tailwind + custom vars
│   ├── sitemap.ts                # Static sitemap generator
│   ├── robots.ts                 # Static robots.txt generator
│   └── manifest.ts               # PWA manifest
├── components/
│   └── LandingPage.tsx           # Main UI (client component)
├── lib/
│   ├── business.ts               # Source of truth: NAP, services, cities
│   └── schema.ts                 # JSON-LD generators
├── public/
│   ├── CNAME                     # Custom domain for GitHub Pages
│   └── (add favicons + photos here)
├── next.config.js                # output: 'export' for static build
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To preview the actual static build that gets deployed:
```bash
npm run build
npx serve out
```

## Next phase for ranking

This homepage alone won't beat established competitors for queries like "pickleball court installation Bellingham." That requires location and service pages. The infrastructure already supports them — `business.ts` has all the cities, the sitemap has commented-out scaffolding, and the schema generators are reusable. When ready, add:

1. `app/services/[slug]/page.tsx` for each service
2. `app/locations/[city]-wa/page.tsx` for each city
3. `app/services/[service]/[city]/page.tsx` for highest-intent combos

Each needs ~800–1500 words of unique content, but the technical pattern is identical to the homepage.
