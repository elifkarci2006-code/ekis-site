export function getDaysAgoLabel(createdAt) {
  const created = new Date(createdAt);
  const now = new Date();
  const diffMs = now - created;
  const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  if (diffDays === 0) return "Bugün yayında";
  if (diffDays === 1) return "1 gündür yayında";

  return `${diffDays} gündür yayında`;
}

export function getJobDurationDays(job) {
  return job.plan === "featured" || job.featuredStatus === "live" ? 15 : 30;
}

export function getJobExpireDate(job) {
  const created = new Date(job.createdAt);
  const duration = Number(job.durationDays || getJobDurationDays(job));

  return new Date(created.getTime() + duration * 24 * 60 * 60 * 1000);
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
