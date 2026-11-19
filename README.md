# Relay KSA

**Relay** is a B2B / G2B marketplace in Saudi Arabia that connects **companies and government entities** with verified suppliers for:

- **Event management** — agencies that plan, produce and run events
- **Event staffing** — ushers, hosts, registration, crowd management, technical and hospitality crew
- **General staffing** — long-term manpower for offices, operations and projects
- **Equipment & logistics** — stages, AV, tents, furniture, transport

on **short-term** (per event) or **long-term** (framework) contracts. The site is bilingual (English / العربية, with RTL).

## Structure

```
src/partials/      shared header + footer
src/pages/         page bodies (front-matter: title, description)
scripts/build.mjs  builds src → public/*.html
public/            the deployed static site (built pages, styles.css, app.js)
functions/api/     Cloudflare Pages Functions
  request.js       POST /api/request  — client posts a request
  join.js          POST /api/join     — supplier applies
migrations/        D1 (SQLite) schema: requests, suppliers
wrangler.toml      Cloudflare Pages + D1 config
```

Arabic text lives in `public/app.js` (the `AR` object), keyed by each element's `data-i18n` attribute.

## Run locally

```bash
npm run db:migrate:local   # first time only
npm run dev                # builds pages, serves on http://localhost:8788
```

See what came in:

```bash
npm run requests:local
npm run suppliers:local
```

## Deploy to Cloudflare Pages (first time)

```bash
npm run db:create          # copy the database_id it prints into wrangler.toml
npm run db:migrate:remote
npm run deploy             # creates the "relayksa" Pages project → relayksa.pages.dev
```

Then connect `relayksa.com` in Cloudflare → Workers & Pages → relayksa → Custom domains.
