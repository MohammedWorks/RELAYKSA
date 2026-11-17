// Arabic translations. English lives in the HTML itself.
const AR = {
  brand: "ريلاي",
  nav_how: "كيف نعمل",
  nav_services: "الخدمات",
  nav_cities: "المدن",
  cta_short: "احصل على وصول مبكر",
  eyebrow: "الإطلاق في الرياض · 2027",
  hero_title: "شحناتك، تصل عبر المملكة.",
  hero_lead: "توصيل في نفس اليوم داخل المدينة، وفي اليوم التالي بين المدن. تتبّع مباشر، الدفع نقداً أو بالبطاقة عند الاستلام، وتقييم للمندوبين.",
  cta: "انضم لقائمة الانتظار",
  cta_secondary: "شاهد كيف نعمل",
  stat1_n: "ساعتان",
  stat1_l: "متوسط التوصيل داخل المدينة",
  stat2_n: "13",
  stat2_l: "منطقة مغطاة",
  stat3_n: "24/7",
  stat3_l: "تتبّع مباشر",
  track_title: "شحنة RLY-20417",
  t1: "تم الاستلام", t1s: "العليا، الرياض · 10:12",
  t2: "في مركز ريلاي", t2s: "مركز شمال الرياض · 11:40",
  t3: "خرجت للتوصيل", t3s: "المندوب: فيصل · ★ 4.9",
  t4: "تم التسليم", t4s: "الوصول المتوقع 13:05",
  how_title: "كيف تعمل ريلاي",
  s1_t: "احجز خلال ثوانٍ", s1_d: "أدخل موقع الاستلام والتسليم، اختر الحجم، واحصل على السعر فوراً.",
  s2_t: "نستلمها منك", s2_d: "أقرب مندوب يستلم شحنتك — غالباً خلال 30 دقيقة.",
  s3_t: "تتبّعها حتى الباب", s3_d: "تابعها مباشرة على الخريطة واستلم صورة عند التسليم.",
  svc_title: "مصممة للأفراد والشركات",
  c1_t: "نفس اليوم داخل المدينة", c1_d: "مستندات وهدايا وطرود صغيرة عبر المدينة خلال ساعات.",
  c2_t: "بين المدن", c2_d: "توصيل في اليوم التالي بين الرياض وجدة والدمام وغيرها.",
  c3_t: "ريلاي للأعمال", c3_d: "واجهة برمجية ولوحة تحكم للمتاجر الإلكترونية، مع الدفع عند الاستلام والاستلام بالجملة.",
  cities_title: "من أين نبدأ",
  city1: "الرياض", city2: "جدة", city3: "الدمام", city4: "مكة المكرمة", city5: "المدينة المنورة", city6: "الخبر",
  wl_title: "كن أول من يجرّب ريلاي",
  wl_lead: "اترك بريدك الإلكتروني وسنخبرك فور إطلاقنا في مدينتك.",
  wl_btn: "أبلغني",
  wl_done: "شكراً! تمت إضافتك إلى القائمة.",
  footer: "صُنع في المملكة العربية السعودية",
};

const nodes = document.querySelectorAll("[data-i18n]");
const EN = {};
nodes.forEach((el) => (EN[el.dataset.i18n] = el.textContent));

function setLang(lang) {
  const dict = lang === "ar" ? AR : EN;
  nodes.forEach((el) => {
    const v = dict[el.dataset.i18n];
    if (v) el.textContent = v;
  });
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.getElementById("lang").textContent = lang === "ar" ? "English" : "العربية";
  try { localStorage.setItem("relay-lang", lang); } catch {}
}

document.getElementById("lang").addEventListener("click", () => {
  setLang(document.documentElement.lang === "ar" ? "en" : "ar");
});

let saved = null;
try { saved = localStorage.getItem("relay-lang"); } catch {}
if (saved === "ar" || (!saved && navigator.language?.startsWith("ar"))) setLang("ar");

document.getElementById("year").textContent = new Date().getFullYear();

// Waitlist: front-end only for now (no backend yet).
document.getElementById("wl-form").addEventListener("submit", (e) => {
  e.preventDefault();
  e.target.hidden = true;
  document.getElementById("wl-done").hidden = false;
});
