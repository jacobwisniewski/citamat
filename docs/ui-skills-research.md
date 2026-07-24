# Codex UI skill research

Reviewed 24 July 2026.

## Recommended set

### 1. OpenAI `frontend-skill`

Best starting point for landing pages and visually strong frontend work. It pushes image-led
hierarchy, restrained composition, focused copy, purposeful motion and a clear responsibility
for every section.

Source: [OpenAI skills catalogue](https://github.com/openai/skills)

### 2. Vercel `web-design-guidelines`

Best final audit. It covers accessibility, focus states, forms, reduced motion, typography,
image handling, navigation state, touch interaction and localisation.

Source:
[Vercel agent skills](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines)

### 3. Vercel `react-best-practices`

Best implementation review for React. It prioritises waterfall removal, bundle size, client data
patterns, re-render control and rendering performance.

Source:
[Vercel agent skills](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices)

### 4. Browser visual verification

A skill does not replace looking at the result. Pair the three skills above with desktop and
mobile browser checks, keyboard navigation, real route testing and production verification.

## Suggested workflow

1. Use `frontend-skill` for art direction and first implementation.
2. Use `web-design-guidelines` for accessibility and UX review.
3. Use `react-best-practices` for bundle and rendering review.
4. Verify the built site in a browser at desktop and mobile widths.

Avoid installing large overlapping packs. Three focused skills plus browser verification give
better signal and less instruction conflict.

## CITAMAT application

This rebuild uses a single strong hero, short outcome-led copy, restrained colour and motion,
semantic controls, visible focus, URL-backed filters, reduced-motion support, responsive checks
and local optimised assets.
