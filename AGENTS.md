# AGENTS.md

Static, dependency-free website for **Dynamic Loisirs** (surf camp, Tamraght). No build step, no npm, no frameworks, no tests/lint tooling, no CDN. "Verifying" work means opening the page in a browser and/or grepping for stale references.

## Layout & path conventions
- Each page is a standalone hand-maintained HTML file. The header (logo, nav), footer, OG meta tags, favicon, and contact details are **duplicated per page** — a change to shared chrome (e.g. replacing the logo, editing `og:url`, nav links, contact info) must be applied to **every** page, not just the page you're looking at.
- Two path depths:
  - Root pages (`index.html`, `about.html`, `packages.html`, etc., and `blog.html`) reference `assets/...` and `../...` is NOT used.
  - Subpages under `packages/` and `blog/` reference `../assets/...` and `../*.html`.
- Relative link targets vary: root pages link directly to pages (e.g. `packages.html`); subpages link via `../packages.html`.

## Gallery: generated, never hand-edited
- `assets/data/gallery.js` is **generated** by `python tools/update-gallery.py`. Never edit it by hand.
- Gallery media is not hardcoded in HTML/JS. Add/remove media only by dropping files into the category folders under `assets/img/` (`Surfing`, `Camp`, `Life`, `Rooms`, `Events`, `Videos`), then re-run the script and refresh the page.
- New category **folders** are only picked up if added to `CATEGORIES` in `tools/update-gallery.py`.
- Accepted extensions: images `.jpg/jpeg/png/webp/gif/avif/svg`, videos `.mp4/webm/mov/m4v`.

## Quirks to watch for
- Asset filenames that contain **spaces** must be URL-encoded in `src`/`href` attributes, e.g. the hero video is referenced as `assets/img/Videos/Dynamic%20Loisirs%20Surf%20Camp.mp4`.
- Branding/contact are placeholders to be replaced live: email `dynamicloisirs@gmail.com`, phone `+212 661-259838`, WhatsApp `wa.me/212661259838`, example domain `https://dynamicloisirs.com` (used in OG meta tags, `og:image`, and `sitemap.xml`).
- Visual identity (colors, fonts, spacing) lives in CSS variables in the `:root` block at the top of `assets/css/style.css`.
- CSS/JS are vanilla and shared site-wide: `assets/css/style.css`, `assets/js/main.js`. The hero media CSS rule `.hero-media img, .hero-media svg, .hero-media video` covers both images and video.
- The logo is referenced as `logo.png` across every page.

## Encoding — IMPORTANT
- All repository text files are **UTF-8 without BOM** (HTML pages include only ASCII-sized em-dashes as proper UTF-8 `—`/`·`/`é` etc.). Keep it that way.
- **Never** round-trip HTML through PowerShell `Get-Content`/`Set-Content` — a prior session did that and silently double-encoded every accented character (em-dashes rendered as `â€”`, French accents as `Ã©`/`Â·`). Use the `edit`/`write` tools, or read/write bytes explicitly.
- `og:image`/`og:url` meta tags must stay **absolute canonical URLs** (`https://dynamicloisirs.com/assets/...`) — never `https://dynamicloisirs.com/../...` (previously present on the 6 subpages under `packages/` and `blog/`).

## Entry points
- `index.html` — home (hero = looping muted autoplay `<video>`).
- `tools/update-gallery.py` — the only generator script; run with `python tools/update-gallery.py` (paths are computed from the script location, so it works from any cwd).