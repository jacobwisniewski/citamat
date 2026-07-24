# CITAMAT

A bilingual, client-rendered rebuild of the CITAMAT Australia website, focused on clearer
material selection and faster project enquiries.

## Stack

- Vite 8
- React 19
- strict TypeScript
- CSS Modules and SCSS
- oxlint and oxfmt
- Vitest
- Cloudflare Workers static assets
- GitHub Actions deployment

## Local development

```sh
npm install
npm run dev
```

## Checks

```sh
npm run check
```

## Deployment

Pushes to `main` run the full check suite and deploy with Wrangler. The repository needs:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Production: [citamat.jacobwisniewski.dev](https://citamat.jacobwisniewski.dev)

## Content model

Products, brands, projects and translations are typed static data in `src/data/site.ts`.
Images are stored locally in `public/images`. No runtime CMS or server-side rendering is used.

The enquiry form prepares a message in the visitor's email application so the visitor reviews
and sends it directly to `info@citamat.com`.

## Product and UX scope

- English and Chinese routes with language switching
- Responsive navigation
- Product catalogue and URL-backed category filters
- Product and brand detail pages
- Residential and commercial solution pages
- Project case studies
- Validated enquiry form
- Sitemap, robots rules, cache and security headers

See [docs/ui-skills-research.md](docs/ui-skills-research.md) for the current Codex UI-skill
recommendations used in the design review.
