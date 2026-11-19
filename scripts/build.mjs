// Builds public/*.html from src/pages/*.html + shared header/footer.
// Each page starts with a small front-matter block:
//   ---
//   title: Page title
//   description: Meta description
//   ---
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const header = readFileSync(join(root, "src/partials/header.html"), "utf8");
const footer = readFileSync(join(root, "src/partials/footer.html"), "utf8");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

for (const file of readdirSync(join(root, "src/pages")).filter((f) => f.endsWith(".html"))) {
  const src = readFileSync(join(root, "src/pages", file), "utf8");
  const m = src.match(/^---\n([\s\S]*?)\n---\n/);
  const meta = {};
  if (m) for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  const body = m ? src.slice(m[0].length) : src;
  const head = header
    .replaceAll("{{title}}", esc(meta.title ?? "Relay"))
    .replaceAll("{{description}}", esc(meta.description ?? ""));
  writeFileSync(join(root, "public", file), head + body + footer);
  console.log("built public/" + file);
}
