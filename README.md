# Khobzeh w Zaitoneh

Static restaurant website for Khobzeh w Zaitoneh / خبزة و زيتونة in Abu Dhabi.

## What this repo contains

- `index.html` for the main website
- `menu.html` for the standalone QR/menu experience
- `styles.css` for the site-wide presentation
- `script.js` for navigation, carousel, menu filtering, and image fallbacks
- `assets/` for local images, video frames, and menu media
- `data/reviews.json` for the static review fallback

## Local preview

Serve the repo root with any static file server, for example:

```bash
python3 -m http.server 4173
```

Then open:

- `http://localhost:4173/`
- `http://localhost:4173/menu.html`

## Deployment note

GitHub Pages is intended to publish this repo as a static site from the repository root. The `.nojekyll` file is included so Pages does not try to run the site through Jekyll.

## Rollback

If a release needs to be reverted, use the previous Git commit or the local restore helper under `/private/tmp/khobzeh-ui-preview/` when available in this workspace.

