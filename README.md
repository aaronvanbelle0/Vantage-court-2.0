# nwsportcourts.com

Static HTML site for North West Sport Courts, served by GitHub Pages from `main` (custom domain in `CNAME`).

## Editing pages

Each page is a standalone `.html` file in the repo root. Styling uses Tailwind utility classes compiled into one stylesheet, `assets/site.css`.

**After adding or changing Tailwind classes on any page, rebuild the CSS:**

```bash
npm install          # first time only
npm run build:css    # writes assets/site.css
```

Commit `assets/site.css` along with your page changes. If you skip the rebuild, any new class you used will have no styling on the live site.

## Pages

| Type | Files |
| --- | --- |
| Home | `index.html` |
| Services hub | `services.html` |
| By service | `new-construction.html`, `resurfacing.html`, `conversions.html`, `sand-volleyball.html` |
| By sport | `pickleball-courts.html`, `tennis-courts.html`, `basketball-courts.html` |
| Pricing | `sport-court-cost.html` (guide), `calculator.html` (interactive) |
| Service areas | `locations.html` + one `<city>-wa.html` per city |
| Other | `process.html`, `privacy-policy.html`, `404.html` |

Header and footer are identical on every page (except the active-link highlight). If you add a page, add it to the nav, the footer, and `sitemap.xml`.

## SEO checklist for new pages

- Unique `<title>` (≤ 60 characters) and meta description (≤ 155)
- `<link rel="canonical">` with the full `https://nwsportcourts.com/...` URL
- One `<h1>` containing the service and location
- `og:image` → `https://nwsportcourts.com/og-image.jpg`
- JSON-LD: `Service` + `BreadcrumbList`, and `FAQPage` if the page has FAQs (FAQ text must match what is on the page)
- `width` and `height` on every `<img>`
- Add the URL to `sitemap.xml`

## Pricing

Price ranges in page copy match the calculator's `BASE_PRICES` in `calculator.html` (easy site, before add-ons). If you recalibrate the calculator, update `sport-court-cost.html` and the price cards on `new-construction.html`, `resurfacing.html`, the sport pages, and the city-page FAQs.

Keep customer names and bid details out of page source: this repo and every page's source are public.
