# CITAMAT design language

## Principles

1. **Material first** — real product and project imagery carries the visual story.
2. **Clarity over choice** — each section explains, proves, deepens or converts.
3. **Technical, not clinical** — precise information with product-led blues and cool neutrals.
4. **One dominant action** — project recommendation is the primary conversion.
5. **Bilingual by design** — English and Chinese use the same hierarchy and spacing system.

## Brand primitives

- Ink 950 `#0a1020` — primary text and deepest neutral
- Navy 900 `#0b2a5b` — primary dark brand field
- Blue 700 `#174c9b` — strong brand emphasis
- Blue 600 `#1557b0` — action and interactive emphasis
- Steel 400 `#96a6bd` — supporting neutral
- Grey 200 `#dce2ea` — muted surface
- Cloud 100 `#f3f6f9` — page background
- White 50 `#ffffff` — elevated surface
- Signal red `#c62b35` and yellow `#f3c928` — packaging-derived accents used sparingly

## Semantic themes

Components consume semantic tokens such as `--color-background`, `--color-text`,
`--color-text-muted`, `--color-accent` and `--color-border`.

- Light is the default editorial and catalogue surface.
- `data-theme="dark"` is used for hero, brand and footer surfaces.
- The page automatically follows `prefers-color-scheme`; no application toggle is required.
- Explicit dark brand surfaces remain dark in either system mode.

Do not use primitive colours directly inside new components unless introducing a documented
brand-specific treatment.

## Scales

`src/styles/tokens.scss` defines:

- spacing from 4px to 96px
- shared page gutters, section insets, card insets and control height
- small, medium, large and pill radii
- card and hero elevation
- fast, standard and slow motion durations
- standard easing
- desktop and mobile header heights
- content width

The spacing system follows the same disciplined 4px-grid approach used by mature systems such
as Construct Kit. Components consume shared inset and gap tokens instead of introducing one-off
spacing.

## Typography

DM Sans is the primary Latin family. Noto Sans SC is the Chinese fallback. Display headings use
medium weight, tight tracking and compact line height. Interface labels use semibold or bold
weight with restrained tracking.

## Product imagery

Packaging uses a white studio theme, consistent padding and `object-fit: contain`; labels must
never be cropped. Project and application imagery uses full-bleed `cover` treatment. Product
benefits remain selectable page text rather than being repeated from small packaging copy.

## Motion and access

- Motion is limited to transform and opacity.
- `prefers-reduced-motion` removes non-essential transitions.
- Focus indicators use the semantic focus token.
- Filters preserve state in the URL.
- Controls use semantic HTML and accessible names.
