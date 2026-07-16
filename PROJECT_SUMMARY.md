# 1. Project Overview

This project is a static website for **Khobzeh w Zaitoneh / خبزة و زيتونة**, a Palestinian / Middle Eastern restaurant in Abu Dhabi.

The site has two main customer-facing pages:

- `index.html`: the main restaurant website / landing page.
- `menu.html`: a standalone digital menu page that customers can access directly, such as through a QR code.

Both pages are built with:

- HTML
- CSS
- Vanilla JavaScript

This project does not use React, Next.js, Tailwind, Bootstrap, or other heavy frameworks. Keep the site compatible with static hosting and GitHub Pages.
GitHub Pages should publish the repository root directly as a static site. A `.nojekyll` file is included so the Pages pipeline does not try to process the site as a Jekyll project.

# 2. Source Links

Main source links used for restaurant information:

```text
Instagram:
https://www.instagram.com/khobzehwzaitoneh/

Current menu:
https://qr.finedinemenu.com/khobzeh-w-zaitoneh-restaurant/menu/68cc32fca36e04fe2b649b3c

Google Maps:
https://maps.app.goo.gl/xRNT1w5RNDVHsaGbA

Live GitHub Pages site:
https://ihama1305-design.github.io/khobzehwzaitoneh/
```

Design reference links:

```text
Sla Cafe:
https://slacafe.com/

OLA Brasil UAE menu:
https://olabrasiluae.com/menu/

Otantik UAE:
https://otantik.ae/

Arabica UAE:
https://arabica.ae/
```

Instagram, Google Maps, and the existing menu are the preferred sources for:

- Restaurant identity
- Photos
- Menu items
- Prices
- Opening hours
- Reviews
- Address
- Contact information

The design reference links are inspiration only. Do not copy branding, layout, images, text, icons, or proprietary content from those websites. Use them to understand the expected quality level, spacing, dark textured sections, strong typography, organized location/contact sections, and polished menu navigation patterns.

Do not invent missing details. If a price, review, photo, opening time, address detail, or contact detail cannot be verified, leave a `TODO` comment or placeholder instead.

# 3. Brand and Theme

The intended brand direction should feel:

- Premium
- Palestinian / Levantine
- Warm but modern
- Elegant
- Family-oriented
- Food-focused
- Culturally authentic
- Clean and easy to navigate

Main visual symbols:

- Bread
- Olive oil
- Olive tree / olive branches
- Palestinian table
- Oven-baked pastries
- Home-style hospitality
- Traditional Arabic / Levantine patterns

Current requested palette direction:

- Deep green
- Olive green
- White / warm white
- Dark grey / charcoal
- Subtle gold, terracotta, clay, muted burgundy, copper, or stone accents only when needed

Important latest theme direction:

- Do not overuse the muted gold/yellow accent.
- Use stronger contrast and more color variation while staying classy and restaurant-appropriate.
- Keep the look royal, warm, and premium rather than dull, flat, orange-heavy, or beige-heavy.
- Dark green, charcoal, warm white, olive, muted clay, stone, copper, and deep burgundy accents are preferred over repeated gold.
- Menu and category controls should feel refined and visual, not generic form controls.

Suggested palette:

```css
:root {
  --white: #ffffff;
  --warm-white: #f8f6f0;
  --soft-cream: #eee7da;

  --deep-green: #1f3a24;
  --forest-green: #16351f;
  --olive-green: #4e6b3c;
  --sage-green: #8a9b73;
  --mint-grey: #d8dfd0;

  --charcoal: #242625;
  --soft-charcoal: #383c39;
  --stone-grey: #6f746e;
  --light-grey: #ecefec;

  --burgundy: #6f1d1b;
  --maroon: #4a1413;
  --dark-red: #8a2e24;
  --rose-clay: #b66a5c;

  --arabic-frame: #263b29;
  --gold-muted: #b89b5e;
  --terracotta-muted: #9f5d3f;

  --shadow-soft: 0 18px 45px rgba(31, 58, 36, 0.12);
  --shadow-hover: 0 24px 60px rgba(31, 58, 36, 0.22);
}
```

# 4. Current Main Pages

This section documents the expected structure of `index.html`.

## Homepage Sections

The homepage should contain:

1. Header / navigation
2. Hero section with restaurant identity and/or video
3. Story section
4. Featured dishes carousel
5. Gallery section
6. Visit us / location section
7. Reviews / testimonials section
8. Footer

## Header

The header includes:

- Restaurant logo
- English name: Khobzeh w Zaitoneh
- Arabic name: خبزة و زيتونة
- Navigation links:
  - Home
  - Story
  - Menu
  - Gallery
  - Visit Us
  - Reviews
- Directions button
- View Menu button linking to `menu.html`

Important current fix:

The logo must **not** appear inside a white border/card. It should blend naturally into the header with no heavy background, border, or shadow.

## Hero

The hero should be visually rich and should include:

- Restaurant name
- Arabic name
- Warm brand tagline
- View Menu CTA
- Directions CTA
- Optional Instagram CTA
- Top hero/presentation video if available

## Story

The story section should explain the meaning of "Khobzeh w Zaitoneh" as bread and olive oil.

It should include:

- Olive tree or olive branch background depiction
- Food/lifestyle images
- Less empty space
- Three story/value cards:
  - From the Oven
  - Olive Oil
  - Home Table

## Featured Dishes

The featured dishes should be a horizontal sliding carousel, not static cards.

Dish cards should include:

- Real dish photo where possible
- Dish name
- Arabic name if available
- Category
- Price if verified
- Short description
- Hover/focus enlargement
- Description overlay on hover/focus

Known/visible dishes may include:

- Palestinian Breakfast Trays
- Falafel Fattah
- Mashrouha Cheese and Oman Chips
- Truffle Pizza
- Mansaf
- Chicken Musakhan
- Hummus
- Palestinian Olive Oil
- Zaatar items
- Pastries
- Mezze
- Drinks
- Daily dishes

Do not invent prices.

## Gallery

The gallery should use unique images.

Important:

- Remove the "Menu identity" gallery image.
- Avoid reusing the same images repeatedly across the homepage.
- Use food, tea, bread, interior, plated dishes, and restaurant atmosphere photos.
- Use photos extracted from provided videos if available.

## Reviews

The reviews section should use real Google reviews where possible and should come **after** the Visit Us / location section near the end of the homepage.

Each review card should include:

- Reviewer name
- Star rating
- Review snippet
- Reviewer photo/avatar if legally usable
- Link to Google Maps

If reviews cannot be imported, use `data/reviews.json` as a static fallback and clearly mark `TODO`s.

Do not fabricate reviews.

## Visit Us

The visit/location section should include:

- Address
- Opening hours if verified
- Phone number if verified
- Google Maps directions link
- Apple Maps directions link
- Waze directions link
- Instagram link
- Map embed if available

# 5. Standalone Menu Page

This section documents the expected structure of `menu.html`.

The menu page must be independently usable. Customers should be able to open it directly without visiting the homepage.

It should include:

1. Menu header
2. Back to website button
3. Instagram link
4. Directions link
5. Sticky category navigation
6. Search/filter input
7. Signature dishes section
8. Full menu sections
9. Footer

Menu page requirements:

- Mobile-first
- Fast-loading
- Easy to scan
- Sticky category access, but **not** a bulky horizontal top scroller that dominates the page
- Search works by item name, category, and description
- Arabic-style framed menu cards
- Dish photos where available
- Prices only when verified
- No fake menu data
- Optimized for QR-code use inside the restaurant

Latest menu UX direction:

- Replace the wide horizontal category slider with a more compact, elegant control.
- Acceptable patterns include a refined dropdown, side drawer, compact floating category button, or visually grouped category panel.
- Category navigation should not take excessive vertical space at the top of the menu.
- The menu should be subdivided professionally into clear groups, such as:
  - Morning Table
  - Oven & Bakery
  - Mains & Pottery
  - Kids Menu
  - Sweets
  - Drinks
  - Shisha
  - Retail / Pantry
- Text, Arabic names, descriptions, and prices must align cleanly inside cards.
- Prices must never spill outside boxes.
- Cards should be compact enough that the menu does not feel unnecessarily long.
- Fonts should feel bold, polished, and restaurant-grade, not basic or scrambled.

# 6. Arabic-Style Frame Requirement

All major cards and boxes should have a darker Arabic-style frame.

Apply this to:

- Dish cards
- Story cards
- Gallery cards
- Review cards
- Location box
- Menu cards
- Important CTA boxes

Use a tasteful dark green or charcoal frame with optional gold corner accents.

Example CSS:

```css
.arabic-frame {
  border: 2px solid var(--arabic-frame);
  border-radius: 18px;
  position: relative;
  box-shadow: var(--shadow-soft);
}

.arabic-frame::before,
.arabic-frame::after {
  content: "";
  position: absolute;
  width: 34px;
  height: 34px;
  border-color: var(--gold-muted);
  border-style: solid;
  pointer-events: none;
}

.arabic-frame::before {
  top: 10px;
  left: 10px;
  border-width: 2px 0 0 2px;
}

.arabic-frame::after {
  bottom: 10px;
  right: 10px;
  border-width: 0 2px 2px 0;
}
```

# 7. Video and Image Asset Plan

Recommended folder structure:

```text
assets/video/
assets/video-frames/
assets/dishes/
assets/menu-items/
assets/gallery/
assets/story/
assets/reviews/
data/
```

Videos:

```text
assets/video/hero-video.mp4
assets/video/source-gallery-video.mp4
```

Use the first video as:

- Homepage hero video, or
- Presentation video near the top of the homepage

Hero video requirements:

- Autoplay should be attempted on all devices using muted, looped, `playsinline` video.
- Mobile Safari and Instagram in-app browser may still block autoplay in Low Power Mode or data-saver conditions; keep a poster fallback.
- Do not hide the video on mobile unless absolutely necessary.
- Desktop framing should show the person/subject clearly and should not feel overly zoomed out.
- Mobile framing may be slightly zoomed out to show more detail, but desktop should preserve the focal subject.
- Use responsive `object-position` and `object-fit` rules for desktop, tablet, and mobile.
- The video should feel smooth and immersive, similar in quality to premium cafe/restaurant sites such as Arabica or Sla Cafe, without copying their assets.

Use the second video to extract still frames for:

- Story section
- Dish carousel
- Gallery
- Menu page
- Empty visual spaces

Generated assets may include:

```text
assets/video/hero-poster.jpg
assets/video-frames/story-olive-table.jpg
assets/video-frames/gallery-interior-01.jpg
assets/video-frames/gallery-food-01.jpg
assets/video-frames/menu-dish-01.jpg
assets/story/olive-tree-bg.svg
```

Important image rules:

- Do not reuse the same photo repeatedly.
- Remove the "Menu identity" image from gallery.
- Use dish-specific images where possible.
- Optimize images for web.
- Prefer `.webp` for compressed assets.
- Use descriptive file names.
- Add alt text.
- Every visible dish, signature, carousel, and menu card should show a real image whenever a verified image exists.
- No card should render as an empty white box or show only broken-image alt text.
- Do not rely on remote hotlinked menu images at runtime if they fail to load in the browser.
- FineDine media URLs may return `413 TooLargeImageException` or fail when hotlinked. Prefer downloading verified source images, resizing/compressing them, and serving them locally from `assets/menu-items/` or `assets/dishes/`.
- If a specific dish image cannot be obtained, use a clearly related verified restaurant image as a temporary fallback and leave a `TODO` to replace it with the exact dish photo.
- Use `loading="lazy"` for non-critical images.
- Keep image aspect ratios stable so cards do not jump or collapse while loading.

Current image status:

- Resolved locally on July 16, 2026: FineDine item and category photos are downloaded, optimized, and served from the repository rather than hotlinked at runtime.
- 218 of 220 local menu items now have local photos; `Mix Sambousek` and `Tea pot Small` have no image in the current FineDine source and intentionally use no-photo cards.
- 26 of 27 categories now have local photos; the `Soft Drinks` category has no FineDine category image and uses an item image as its visual-category fallback.
- Broken image alt text remains a launch blocker if it reappears; all missing or failed media must continue to render intentional no-photo fallbacks.

# 8. JavaScript Functionality

`script.js` should handle:

- Mobile navigation / hamburger menu if present
- Smooth scrolling
- Featured dish carousel arrows
- Horizontal scroll behavior
- Menu search/filtering
- Compact menu category interactions, such as dropdown, side drawer, or grouped category selector
- Review rendering from `data/reviews.json` if used
- Hover/focus accessibility behavior if needed
- Hero video autoplay retry for muted `playsinline` video where browser policy allows

The site should remain functional without external libraries.

# 9. Google Reviews Handling

Google reviews usually cannot be imported directly into a static GitHub Pages site without using the Google Places API or a manual/static fallback.

Preferred options:

1. Use verified static review data in:

```text
data/reviews.json
```

2. Use Google Places API only if an API key is safely configured and not exposed publicly.

3. If real reviews are unavailable, keep `TODO` placeholders instead of fake reviews.

Never fabricate customer testimonials.

Suggested `reviews.json` structure:

```json
[
  {
    "name": "Reviewer name",
    "rating": 5,
    "text": "Actual Google review text here.",
    "avatar": "assets/reviews/reviewer-01.jpg",
    "url": "https://maps.app.goo.gl/xRNT1w5RNDVHsaGbA"
  }
]
```

# 10. Responsiveness Requirements

The website must be optimized for:

- Small phones
- Large phones
- iPad portrait
- iPad landscape
- Laptops
- Desktops
- Large desktop monitors

Use breakpoints similar to:

```css
@media (max-width: 480px) {}
@media (max-width: 768px) {}
@media (max-width: 1024px) {}
@media (min-width: 1280px) {}
@media (min-width: 1536px) {}
```

## Mobile

- One-column layouts
- Compact header
- Swipeable dish carousel
- Readable text
- No text smaller than 15px
- Menu search easy to tap
- Sticky category menu works

## Tablet

- Two-column layouts where possible
- Carousel shows 2-3 cards
- Gallery uses 2-3 columns

## Desktop

- Use wider layouts
- Avoid empty whitespace
- Carousel shows 3-4 cards
- Story section uses image/text split
- Reviews show 3 cards in a row
- Visit section uses map and info side by side

# 11. Spacing and Layout Philosophy

The website should be more "greedy" with space.

Meaning:

- Use the full page width better.
- Reduce huge empty vertical gaps.
- Add useful imagery in blank areas.
- Make sections feel full and intentional.
- Keep text readable but avoid tiny centered content floating in large empty sections.
- Use collages, background illustrations, framed cards, and full-width image areas.

Target max widths:

```css
.container {
  max-width: 1280px;
}
```

For large screens, some sections may go up to:

```css
max-width: 1440px;
```

# 12. Accessibility and Performance

Accessibility requirements:

- Semantic HTML
- Correct heading hierarchy
- Alt text for images
- Keyboard-accessible buttons/links
- Visible focus states
- Good color contrast
- Hover effects should also work with focus
- Reduced motion support

Performance requirements:

- Optimize images
- Avoid huge uncompressed videos on mobile
- Use poster image for video
- Lazy-load gallery images
- Keep JavaScript lightweight
- No heavy libraries

Reduced motion CSS:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
```

# 13. Current Specific Fixes Requested

1. Remove the white border/card behind the logo.
2. Fill empty story-section space with an olive tree depiction and related photos.
3. Add a top presentation video.
4. Extract photos from a second video to fill gallery/story/dish/menu visuals.
5. Convert featured dishes into a horizontal sliding carousel.
6. Add more dishes to the carousel.
7. Use dish-correlated photos.
8. Add hover enlargement with description overlay on dish cards.
9. Remove the "Menu identity" gallery image.
10. Stop reusing the same images across multiple sections.
11. Replace review placeholders with real Google reviews if available.
12. Hyperlink review cards to Google Maps.
13. Include testimonials and reviewer photos if legally usable.
14. Add Arabic-style darker frames to every major box/card.
15. Update theme to dark grey, green, and white.
16. Improve spacing and use more of the page.
17. Optimize for phone, iPad, laptop, desktop, and large desktop.
18. Keep the menu page standalone and QR-friendly.
19. Fix broken dish/menu images across all pages.
20. Localize reliable dish images instead of depending on failing remote hotlinks.
21. Replace the bulky horizontal menu category scroller with a compact refined category control.
22. Improve menu contrast, spacing, typography, and card alignment.
23. Reduce repeated gold/yellow usage and add more refined color variation.
24. Adjust desktop hero video crop so the person/subject is clearly visible.

# 14. Latest Active Priorities

These are the newest collaborator notes and should be treated as active priorities:

1. Fix all broken menu, signature, carousel, and dish images.
2. Do not rely on remote image hotlinks if they fail; localize, compress, and serve images from the repo.
3. Ensure images appear clearly on every device and do not render as empty boxes or visible alt text.
4. Improve menu page contrast, hierarchy, and visual richness.
5. Reduce overuse of gold/yellow accents; add more refined variation using deep green, charcoal, warm white, olive, muted clay, stone, copper, or burgundy.
6. Replace the large top category scroller with a compact refined category control, such as a dropdown, side drawer, or elegant grouped selector.
7. Keep menu sections professional and compact, with clear subdivisions such as Kids Menu, Drinks, Sweets, Mains, Oven & Bakery, and Retail.
8. Fix text alignment in menu cards so English, Arabic, descriptions, and prices stay inside their boxes.
9. Hero video desktop framing should show the person/subject clearly; the earlier zoomed-out desktop crop is not acceptable.
10. Hero video mobile framing can remain slightly wider if it helps show more detail.
11. Use Sla Cafe as a quality reference for dark textured hero/contact sections, strong bold typography, clean white navigation, and organized contact/footer presentation.
12. Keep the site culturally Palestinian / Levantine and not generic cafe branding.

## Latest Menu and Mobile Layout Update

- The FineDine menu is the reference source for menu structure, dish names, prices, categories, and photos.
- The GitHub Pages `menu.html` is the static customer-facing menu and must be compared against FineDine for completeness.
- All dish photos should be correctly mapped to the matching dish.
- Missing photos should be filled from FineDine, provided videos, existing restaurant assets, or left as no-photo cards without broken image icons.
- The menu design now uses the Sla Cafe-style screenshot as UX inspiration: top search, visual category strip, image-led browsing, and large photo-first cards.
- Category headings in the full menu should be collapsible dropdown/accordion sections.
- Quick category buttons should be compact, wrapping or grid-based instead of one long horizontal strip.
- Mobile Visit Us section should be more spacious and not cramped.
- The palette now includes burgundy/maroon accents in addition to green, charcoal, and white.
- Yellow/gold should be used sparingly.
- The site should remain fully responsive for mobile, iPad, laptop, desktop, and large desktop.
- Do not fabricate prices, reviews, photos, or restaurant facts.
- If the local dataset says there are 220 items across 27 categories, verify that all 220 items and 27 categories actually render.
- The July 16, 2026 local media pass covers 247 local menu entities: 244 have localized images (218 items and 26 categories), while two items and one category without FineDine source images render intentional no-photo fallbacks.

## Latest Mobile Menu Fix

- `menu.html` had mobile usability issues and must be tested at 375px, 390px, 430px, and 768px widths.
- The search bar should be more rectangular/box-like, not a large rounded pill.
- Quick category/search buttons should live inside a collapsible "Quick filters" panel.
- On mobile, quick filters should be collapsed by default.
- Category pills should be lighter, mostly white with green text and burgundy active state.
- Dark green should be used less heavily; use white, charcoal, sage, burgundy, and subtle green shades for balance.
- Menu accordions must work properly on mobile.
- Search should automatically open categories containing matching items.
- Menu cards must not create horizontal overflow on mobile.
- No broken images should appear.

# 15. Developer Rules

Collaborators should follow these rules:

- Do not invent fake restaurant facts.
- Do not invent fake Google reviews.
- Do not invent fake prices.
- Do not expose API keys in public code.
- Do not use heavy frameworks.
- Do not reuse the same photo everywhere.
- Do not break the standalone menu page.
- Do not remove accessibility features.
- Do not make the site beige-heavy again.
- Keep the identity Palestinian / Levantine, not generic Mediterranean.
- Keep all external links functional.
- Keep GitHub Pages compatibility.

# 16. Final QA Checklist

## Final QA Checklist

- [ ] `index.html` loads correctly.
- [ ] `menu.html` loads correctly as a standalone page.
- [ ] Header logo has no white card/border behind it.
- [ ] Navigation links work.
- [ ] View Menu links to `menu.html`.
- [ ] Directions links open Google Maps.
- [ ] Instagram links open the restaurant Instagram.
- [ ] Hero video or poster loads correctly.
- [ ] Story section includes olive tree/olive branch visual.
- [ ] Story section no longer has excessive empty space.
- [ ] Featured dishes appear in a horizontal carousel.
- [ ] Carousel arrows work.
- [ ] Carousel works by swipe/trackpad.
- [ ] Carousel dish images all render correctly.
- [ ] Dish cards enlarge on hover/focus.
- [ ] Dish descriptions appear on hover/focus.
- [ ] Gallery does not include the "Menu identity" image.
- [ ] Gallery images are not repeated unnecessarily.
- [ ] Reviews are real or clearly marked as TODO placeholders.
- [ ] Review cards link to Google Maps.
- [ ] Arabic-style frames appear on major cards/boxes.
- [ ] Theme uses dark grey, green, and white.
- [ ] Website looks good on phone.
- [ ] Website looks good on iPad.
- [ ] Website looks good on laptop.
- [ ] Website looks good on large desktop.
- [ ] Menu search works.
- [ ] Menu category navigation works.
- [ ] Menu category control is compact and not a bulky horizontal top scroller.
- [ ] Menu sections are professionally grouped.
- [ ] FineDine menu was compared against local `menu.html`.
- [ ] Dish photos are correctly matched to dishes.
- [ ] No broken menu images appear.
- [ ] No unrelated dish photos are used.
- [ ] Menu image thumbnails are viewable and not badly cropped.
- [ ] Visual category strip exists on `menu.html`.
- [ ] Category pills are compact and responsive.
- [ ] Full menu categories are collapsible accordions.
- [ ] Search opens matching categories automatically.
- [ ] Mobile Visit Us section has enough spacing.
- [ ] Burgundy/maroon accents are added tastefully.
- [ ] Yellow/gold is not overused.
- [ ] Item and category counts are accurate.
- [ ] Menu card images all render correctly.
- [ ] Menu card text and prices stay inside card boundaries.
- [ ] No fake prices are added.
- [ ] No fake reviews are added.
- [ ] No broken images.
- [ ] No broken internal links.
- [ ] Images are optimized.
- [ ] Accessibility focus states are visible.
- [ ] Reduced motion support exists.
- [ ] `menu.html` works at 375px mobile width.
- [ ] `menu.html` works at 390px mobile width.
- [ ] `menu.html` works at 430px mobile width.
- [ ] `menu.html` works at 768px tablet width.
- [ ] No horizontal overflow appears on mobile.
- [ ] Search bar is box-like, not overly pill-shaped.
- [ ] Quick filters are collapsed by default on mobile.
- [ ] Quick filter toggle opens and closes correctly.
- [ ] Category pills are lighter and not all dark green.
- [ ] Active category uses burgundy or another accent, not only dark green.
- [ ] Accordions open/close correctly on mobile.
- [ ] Search opens matching categories automatically.
- [ ] Menu cards remain readable on mobile.
- [ ] Prices remain visible on mobile.
- [ ] Arabic text wraps correctly.

# 17. Deployment Notes

- GitHub Pages publishes the root as a plain static site.
- Local preview should use a simple static server such as `python3 -m http.server 4173`.
- Rollback should be done by reverting the release commit or restoring the previous saved version before republishing.
- Keep `README.md` and this summary aligned whenever the site structure, preview steps, or deployment behavior changes.
