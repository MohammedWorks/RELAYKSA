import {
  SERVICES, CITIES, json, fail, readBody, isEmail, normPhone, clean, oneOf, listOf, int,
} from "../_utils.js";

const NITAQAT = ["platinum", "high_green", "mid_green", "low_green", "red"];

export async function onRequestPost({ request, env }) {
  const b = await readBody(request);
  if (!b) return json({ ok: false, error: "bad_request" }, 400);
  if (b.website) return json({ ok: true }); // honeypot

  const s = {
    supplier_type: oneOf(b.supplier_type, ["company", "freelancer"]),
    company: clean(b.company, 160),
    cr_number: clean(b.cr_number, 20),
    name: clean(b.name, 120),
    email: clean(b.email, 254)?.toLowerCase() ?? null,
    phone: normPhone(b.phone),
    services: listOf(b.services, SERVICES),
    contract_types: oneOf(b.contract_types, ["short", "long", "both"]),
    cities: listOf(b.cities, CITIES),
    capacity: int(b.capacity),
    nitaqat: oneOf(b.nitaqat, NITAQAT),
    message: clean(b.message, 4000),
    lang: b.lang === "ar" ? "ar" : "en",
  };

  const bad = [];
  for (const k of ["supplier_type", "company", "name", "phone", "contract_types"]) if (!s[k]) bad.push(k);
  if (!isEmail(s.email)) bad.push("email");
  if (!s.services.length) bad.push("services");
  if (!s.cities.length) bad.push("cities");
  if (bad.length) return fail(bad);

  await env.DB.prepare(
    `INSERT INTO suppliers (supplier_type, company, cr_number, name, email, phone, services,
       contract_types, cities, capacity, nitaqat, message, lang)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      s.supplier_type, s.company, s.cr_number, s.name, s.email, s.phone, JSON.stringify(s.services),
      s.contract_types, JSON.stringify(s.cities), s.capacity, s.nitaqat, s.message, s.lang
    )
    .run();

  return json({ ok: true });
}
