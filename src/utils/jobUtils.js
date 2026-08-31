export function getDaysAgoLabel(createdAt) {
  const created = new Date(createdAt);
  const now = new Date();
  const diffMs = now - created;
  const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  if (diffDays === 0) return "Bugün yayında";
  if (diffDays === 1) return "1 gündür yayında";

  return `${diffDays} gündür yayında`;
}

// Base listing lifetime (30 days from creation, or the stored expires_at if
// present) is independent of the "featured/Ekiş Acil" badge -- a listing
// whose featured badge expires stays live as a normal listing, it doesn't
// get taken down. Kept in sync with the mobile app's getJobExpiryTime.
export function getJobExpireDate(job) {
  if (job.expiresAt) return new Date(job.expiresAt);

  const created = new Date(job.createdAt);
  return new Date(created.getTime() + 30 * 24 * 60 * 60 * 1000);
}

export function getDaysLeftLabel(job) {
  const diffMs = getJobExpireDate(job) - new Date();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Süresi doldu";
  if (diffDays === 1) return "1 gün kaldı";

  return `${diffDays} gün kaldı`;
}

export function isJobActive(job) {
  return getJobExpireDate(job) > new Date() && job.status !== "passive";
}

// Whether the "Ekiş Acil" (featured) badge should still show -- governed by
// featured_expires_at (set per the paid package's duration at purchase time).
// Featured jobs with no featured_expires_at (e.g. manually toggled by an
// admin, or predating the payment system) stay featured indefinitely, same
// as the mobile app's isFeaturedActive.
export function isFeaturedActive(job) {
  const isFeatured = job.plan === "featured" || job.featuredStatus === "live";
  if (!isFeatured) return false;
  if (!job.featuredExpiresAt) return true;
  return new Date(job.featuredExpiresAt) > new Date();
}

export function generateCaptchaQuestion() {
  const a = Math.floor(Math.random() * 7) + 3;
  const b = Math.floor(Math.random() * 6) + 2;

  return {
    question: `${a} + ${b}`,
    answer: String(a + b),
  };
}

export function inferCategory(title) {
  const lower = title.toLocaleLowerCase("tr-TR");

  if (lower.includes("garson") || lower.includes("servis eleman")) {
    return "Garson / Servis";
  }

  if (lower.includes("barista") || lower.includes("kafe")) {
    return "Kafe & Restoran";
  }

  if (lower.includes("inşaat") || lower.includes("tadilat") || lower.includes("boyacı") || lower.includes("usta")) {
    return "İnşaat & Fiziksel İş";
  }

  if (lower.includes("kurye") || lower.includes("dağıtım")) {
    return "Kurye & Dağıtım";
  }

  if (lower.includes("depo") || lower.includes("paketleme") || lower.includes("lojistik")) {
    return "Depo & Lojistik";
  }

  if (lower.includes("temizlik")) {
    return "Temizlik";
  }

  if (lower.includes("etkinlik") || lower.includes("organizasyon") || lower.includes("karşılama")) {
    return "Etkinlik & Organizasyon";
  }

  if (lower.includes("mağaza") || lower.includes("kasiyer") || lower.includes("satış") || lower.includes("stand")) {
    return "Satış & Mağaza";
  }

  if (lower.includes("ofis") || lower.includes("destek")) {
    return "Ofis & Yardımcı İşler";
  }

  if (lower.includes("içerik") || lower.includes("dijital")) {
    return "Freelance / Dijital";
  }

  return "Diğer";
}

export function formatSalaryPreview(workType, salary) {
  if (!salary) return "";

  const formatted = new Intl.NumberFormat("tr-TR").format(Number(salary));

  if (workType === "Saatlik") return `Saatlik ${formatted} TL`;
  if (workType === "Part Time") return `Part Time ${formatted} TL / ay`;

  return `Günlük ${formatted} TL`;
}

export function getTimeAgo(value) {
  if (!value) return "Bugün";

  const date = new Date(value);
  const diff = Date.now() - date.getTime();

  if (Number.isNaN(diff) || diff < 0) return "Bugün";

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Az önce";
  if (minutes < 60) return `${minutes} dk önce`;
  if (hours < 24) return `${hours} saat önce`;
  if (days === 1) return "Dün";
  if (days < 7) return `${days} gün önce`;

  return date.toLocaleDateString("tr-TR");
}

export function getSalaryDisplay(job) {
  const salary = (job.salary || "").trim();
  const type = (job.type || "").trim();

  if (!salary && !type) return "Ücret belirtilmedi";
  if (!type) return salary || "Ücret belirtilmedi";

  const cleanSalary = (salary || "Ücret belirtilmedi")
    .replace(/^(günlük|saatlik|part\s*time)\s*[:\-•/]*\s*/i, "")
    .trim();

  return `${type} ${cleanSalary}`;
}

export function toTitleCase(value) {
  return String(value || "")
    .trim()
    .toLocaleLowerCase("tr-TR")
    .replace(/(^|[\s/.,()-])([a-zçğıöşü])/g, (match, separator, char) =>
      `${separator}${char.toLocaleUpperCase("tr-TR")}`
    )
    .replace(/\s+/g, " ");
}

export function normalizeLocation(city, district) {
  const normalizedCity = toTitleCase(city);
  const normalizedDistrict = toTitleCase(district);

  if (normalizedCity && normalizedDistrict) {
    return `${normalizedCity} / ${normalizedDistrict}`;
  }

  return normalizedCity || normalizedDistrict;
}

export function getJobVisualKey(job) {
  const text = `${job.title || ""} ${job.category || ""}`.toLocaleLowerCase("tr-TR");

  if (text.includes("kurye") || text.includes("dağıtım")) {
    return "delivery";
  }

  if (text.includes("etkinlik") || text.includes("organizasyon") || text.includes("karşılama")) {
    return "people";
  }

  if (text.includes("garson") || text.includes("barista") || text.includes("kafe") || text.includes("restoran")) {
    return "service";
  }

  if (text.includes("depo") || text.includes("paketleme") || text.includes("lojistik")) {
    return "box";
  }

  if (text.includes("mağaza") || text.includes("satış") || text.includes("kasiyer")) {
    return "store";
  }

  return "briefcase";
}
