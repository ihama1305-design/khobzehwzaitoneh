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

Instagram, Google Maps, and the existing menu are the preferred sources for:

- Restaurant identity
- Photos
- Menu items
- Prices
- Opening hours
- Reviews
- Address
- Contact information

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
- Subtle gold or terracotta accents only when needed

Suggested palette:

```css
:root {
  --white: #ffffff;
  --warm-white: #f8f6f0;
  --soft-cream: #eee7da;

  --deep-green: #1f3a24;
  --olive-green: #4e6b3c;
  --sage-green: #8a9b73;
  --mint-grey: #d8dfd0;

  --charcoal: #242625;
  --soft-charcoal: #383c39;
  --stone-grey: #6f746e;
  --light-grey: #ecefec;

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
6. Reviews / testimonials section
7. Visit us / location section
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
  - Reviews
  - Visit Us
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

The reviews section should use real Google reviews where possible.

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
- Sticky category bar
- Search works by item name, category, and description
- Arabic-style framed menu cards
- Dish photos where available
- Prices only when verified
- No fake menu data
- Optimized for QR-code use inside the restaurant

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

# 8. JavaScript Functionality

`script.js` should handle:

- Mobile navigation / hamburger menu if present
- Smooth scrolling
- Featured dish carousel arrows
- Horizontal scroll behavior
- Menu search/filtering
- Sticky category interactions
- Review rendering from `data/reviews.json` if used
- Hover/focus accessibility behavior if needed

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

# 14. Developer Rules

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

# 15. Final QA Checklist

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
- [ ] No fake prices are added.
- [ ] No fake reviews are added.
- [ ] No broken images.
- [ ] No broken internal links.
- [ ] Images are optimized.
- [ ] Accessibility focus states are visible.
- [ ] Reduced motion support exists.
