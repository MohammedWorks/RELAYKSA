import {
  SERVICES, CITIES, json, fail, readBody, isEmail, normPhone, clean, oneOf, listOf, int, isDate,
} from "../_utils.js";

const CLIENT_TYPES = ["government", "semi_government", "private"];
const BUDGETS = ["lt50k", "50k-250k", "250k-1m", "gt1m"];

export async function onRequestPost({ request, env }) {
  const b = await readBody(request);
  if (!b) return json({ ok: false, error: "bad_request" }, 400);
  if (b.website) return json({ ok: true }); // honeypot

  const r = {
    client_type: oneOf(b.client_type, CLIENT_TYPES),
    organization: clean(b.organization, 160),
    name: clean(b.name, 120),
    email: clean(b.email, 254)?.toLowerCase() ?? null,
    phone: normPhone(b.phone),
    services: listOf(b.services, SERVICES),
    description: clean(b.description, 4000),
    contract_type: oneOf(b.contract_type, ["short", "long"]),
    city: oneOf(b.city, CITIES),
    start_date: isDate(b.start_date) ? b.start_date : null,
    end_date: isDate(b.end_date) ? b.end_date : null,
    headcount: int(b.headcount),
    budget: oneOf(b.budget, BUDGETS),
    lang: b.lang === "ar" ? "ar" : "en",
  };

  const bad = [];
  for (const k of ["client_type", "organization", "name", "phone", "description", "contract_type", "city", "start_date"])
    if (!r[k]) bad.push(k);
  if (!isEmail(r.email)) bad.push("email");
  if (!r.services.length) bad.push("services");
  if (r.end_date && r.start_date && r.end_date < r.start_date) bad.push("end_date");
  if (bad.length) return fail(bad);

  const res = await env.DB.prepare(
    `INSERT INTO requests (client_type, organization, name, email, phone, services, description,
       contract_type, city, start_date, end_date, headcount, budget, lang)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      r.client_type, r.organization, r.name, r.email, r.phone, JSON.stringify(r.services),
      r.description, r.contract_type, r.city, r.start_date, r.end_date, r.headcount, r.budget, r.lang
    )
    .run();

  const id = res.meta?.last_row_id;
  return json({ ok: true, ref: id ? `RL-${1000 + id}` : null });
}
