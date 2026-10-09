# Khobzeh w Zaitoneh

Static site for Khobzeh w Zaitoneh (خبزة و زيتونة), Abu Dhabi. Client site.

- Static HTML/CSS/JS, no build step. Preview: `python3 -m http.server 4173` then open http://127.0.0.1:4173/.
- `index.html` = main site, `menu.html` = standalone QR menu. `data/reviews.json` = static review fallback.
- Full scope, decisions and checklist: `PROJECT_SUMMARY.md` (long; read only the section you need).
- Style: "Levantine heritage" preset (pine/olive, warm paper, wine; Cormorant Garamond + Manrope). Tokens in `styles.css` `:root`.
- Menu photos are stored locally. Never hotlink FineDine or other sources. Keep `.nojekyll`.
