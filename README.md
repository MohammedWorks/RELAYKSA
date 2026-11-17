# Relay KSA

Landing site for **Relay** — parcel delivery across Saudi Arabia. Bilingual (English / العربية with RTL).

## Structure

```
public/          static site (deployed as-is)
  index.html
  styles.css
  app.js         language switcher + Arabic strings
  favicon.svg
wrangler.toml    Cloudflare Pages config
```

## Run locally

```bash
npx wrangler pages dev public
```

## Deploy to Cloudflare Pages

```bash
npx wrangler pages deploy public --project-name relayksa
```

Then add `relayksa.com` as a custom domain in Cloudflare → Workers & Pages → relayksa → Custom domains.
