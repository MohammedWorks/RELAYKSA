export const SERVICES = ["event_management", "event_staffing", "general_staffing", "equipment"];
export const CITIES = [
  "riyadh", "jeddah", "makkah", "madinah", "dammam", "khobar", "dhahran",
  "taif", "abha", "tabuk", "alula", "hail", "jazan", "najran", "buraidah", "other",
];

export const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

export const isEmail = (s) =>
  typeof s === "string" && s.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);

// Saudi mobile: 05XXXXXXXX, 5XXXXXXXX, +9665XXXXXXXX or 009665XXXXXXXX
export const normPhone = (s) => {
  if (typeof s !== "string") return null;
  const d = s.replace(/[\s\-()]/g, "").replace(/^(\+|00)966/, "0").replace(/^5/, "05");
  return /^05\d{8}$/.test(d) ? d : null;
};

export const clean = (s, max = 200) => {
  if (typeof s !== "string") return null;
  const t = s.trim().slice(0, max);
  return t || null;
};

export const oneOf = (v, list) => (list.includes(v) ? v : null);

export const listOf = (v, list) =>
  [...new Set((Array.isArray(v) ? v : [v]).filter((x) => list.includes(x)))];

export const int = (v, max = 100000) => {
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) && n >= 0 && n <= max ? n : null;
};

export const isDate = (s) => typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);

export async function readBody(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export const fail = (fields) => json({ ok: false, error: "invalid", fields }, 400);
