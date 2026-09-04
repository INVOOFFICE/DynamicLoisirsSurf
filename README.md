# Dynamic Loisirs — Surf Camp Morocco (Static Template)

A clean, fully self-contained static website for **Dynamic Loisirs**, an all-inclusive
surf camp in Tamraght (Taghazout Bay), Morocco.

This template has **no build step** and **no external dependencies**: no npm, no webpack,
no frameworks, no CDN. Open `index.html` directly in any browser and it just works —
fully offline (file:// or any static host).

---

## Project structure

```
.
├── index.html                  Home page
├── about.html                  About the camp & team
├── accommodation.html          The Dynamic Villa (rooms, amenities, slideshow)
├── packages.html               All-inclusive surf packages overview
├── surf-lessons.html           Surf lessons (levels, typical day, safety)
├── gallery.html                Filterable gallery + lightbox
├── location.html               Tamraght, getting here, surf seasons
├── food-lifestyle.html         Food, diet options, communal life
├── blog.html                   Blog listing
├── contact.html                Contact, form, map card
├── faq.html                    FAQ accordion
├── privacy-policy.html         Privacy policy
├── packages/
│   ├── surf-coaching.html      Package detail — Surf Coaching (€440)
│   ├── surf-guiding.html       Package detail — Surf Guiding (€390)
│   └── group-surf.html         Package detail — Group Surf (on request)
├── blog/
│   ├── day-trip-to-paradise-valley.html
│   ├── 5-rules-of-surf-etiquette.html
│   └── taste-of-taghazout.html
├── assets/
│   ├── css/style.css           Single stylesheet (all pages)
│   ├── js/main.js              Vanilla JavaScript (no frameworks)
│   ├── img/                    Placeholder images + category folders + favicon/logo
│   └── data/gallery.js         Gallery manifest (generated — do not edit)
├── tools/
│   └── update-gallery.py       Scans img category folders → regenerates the gallery
├── robots.txt
└── sitemap.xml
```

## Quick start

1. Download/unzip the template.
2. Double-click `index.html` — that's it.

To serve it (recommended for production), upload the whole folder to any static host or
many shared hosting control panels. No configuration or build required.

## Customisation

### Branding & contact info
- `email` / `phone` / `WhatsApp` links are used in the header, footer, contact page and
  package pages: search for `dynamicloisirs@gmail.com`, `+212 661-259838` and
  `wa.me/212661259838` and replace with your own.
- The example site URL `https://dynamicloisirs.com` is used for Open Graph meta tags
  (`<meta property="og:url">`) and `sitemap.xml` — update it to your real domain.

### Visual identity
All colors, fonts and spacing live as CSS variables at the top of `assets/css/style.css`
(in the `:root` block). Change the palette there once and it applies site-wide.

### Images — IMPORTANT
Every image is a **themed placeholder (SVG)** that clearly says "PHOTO PLACEHOLDER".
Replace them with your real photos before going live. Just drop your images in
`assets/img/` and keep the same file names (or update the references). The placesholders
are sized for a 16:10 hero crop and 4:3 / 16:10 thumbnails — the CSS crops them with
`object-fit: cover`, so almost any photo aspect ratio will work.

| Current file | Recommended real photo |
| --- | --- |
| `hero.svg`, `ocean-view.svg` | Surfers / ocean at Tamraght |
| `villa-*.svg`, `room-*.svg` | The villa exterior, terrace, rooms |
| `pkg-*.svg` | Coaching / guiding / group session photos |
| `food-*.svg` | Tagine, grilled fish, breakfast |
| `location-*.svg`, `blog-*.svg` | Location and blog shots |

> The Gallery page is different: its media is **not hardcoded**. See "Gallery —
> automatic media" below.

### Gallery — automatic media
The Gallery page (`gallery.html`) is built automatically from **category folders** under
`assets/img/` — add photos there, run one command, and they appear in the matching tab.
No image path is hardcoded in HTML/JS.

1. Drop your files into the matching folder (jpg, jpeg, png, webp, gif, avif, svg — or
   mp4/webm/mov for Videos):

   | Folder | Gallery tab |
   | --- | --- |
   | `assets/img/Surfing` | Surfing |
   | `assets/img/Camp` | Camp Life |
   | `assets/img/Life` | Life & Fun |
   | `assets/img/Rooms` | Rooms |
   | `assets/img/Events` | Events |
   | `assets/img/Videos` | Videos |

2. Regenerate the manifest:

   ```
   python tools/update-gallery.py
   ```

3. Refresh `gallery.html` in the browser. New files appear in "All" and their tab; tabs
   with no files are hidden automatically. Captions are generated from file names.

### Favicon
The site ships with `assets/img/favicon.svg`. Replace it with your own if you prefer a
raster favicon (e.g. `favicon.ico`) and update the `<link rel="icon">` tag in every page.

## Features (all vanilla, no libraries)

- Responsive layout: mobile, tablet, desktop (used as-is, no media-query hunting)
- Sticky header that becomes solid on scroll
- Mobile slide-in menu + dropdown submenus (Packages / The Camp)
- Image slideshows (accommodation page) and auto-playing testimonials slider
- Filterable gallery with lightbox, keyboard navigation (built automatically from
  `assets/img/<category>` folders via `tools/update-gallery.py` — add files, re-run,
  refresh)
- FAQ accordion
- Reveal-on-scroll animations
- SEO-ready: semantic markup, unique `<title>` + `<meta description>` + Open Graph tags
- `robots.txt` + `sitemap.xml` included

## Browser support

All evergreen browsers (Chrome, Edge, Firefox, Safari). Uses CSS grid, `backdrop-filter`
(graceful fallback) and `IntersectionObserver` (graceful fallback if missing).

## License

You can use, modify and resell this template. Real photos, brand assets and content
belong to their respective owners.