import React, { useEffect, useMemo, useState } from "react";

const SHOPIER_FEATURED_LINK = "https://shopier.com/46018405";

const PALETTE = {
  coral: "#E45D50",
  sage: "#9BC78F",
  aqua: "#76BFBE",
  teal: "#58ADAD",
  slate: "#3C4A5F",
  bg: "#F5F7F8",
  white: "#FFFFFF",
  text: "#233044",
  softText: "#5D6B7F",
  border: "#DDE5EA",
  warm: "#FFF2EC",
};

const featuredSeed = [
  {
    id: 1,
    title: "Garson Aranıyor",
    company: "Mavi Masa Kafe",
    location: "İstanbul / Kadıköy",
    salary: "Günlük 1.200 TL + yemek",
    type: "Günlük",
    description:
      "Servis ve karşılama süreçlerinde destek olacak, güler yüzlü ekip arkadaşı aranıyor.",
    createdAt: "2026-04-14T10:00:00",
    featured: true,
  },
  {
    id: 2,
    title: "Etkinlik Karşılama Elemanı",
    company: "Nova Organizasyon",
    location: "Ankara / Çankaya",
    salary: "Günlük 1.500 TL",
    type: "Part Time",
    description:
      "Etkinlik giriş alanında misafir karşılama ve yönlendirme görevlerinde çalışacak personel aranıyor.",
    createdAt: "2026-04-14T10:00:00",
    featured: true,
  },
  {
    id: 3,
    title: "Kurye Aranıyor",
    company: "Hızlı Paket",
    location: "İzmir / Bornova",
    salary: "Saatlik 200 TL + prim",
    type: "Saatlik",
    description:
      "Yoğun saatlerde teslimat süreçlerinde görev alacak, hızlı ve dikkatli kurye aranıyor.",
    createdAt: "2026-04-14T10:00:00",
    featured: true,
  },
];

const jobsSeed = [
  {
    id: 11,
    title: "Depo Düzenleme Personeli",
    company: "Anka Lojistik",
    location: "Bursa / Nilüfer",
    salary: "Saatlik 180 TL",
    type: "Saatlik",
    category: "Depo & Lojistik",
    description:
      "Ürün yerleştirme, raf düzenleme ve temel depo operasyonlarında görev alacak personel aranıyor.",
    createdAt: "2026-04-14T10:00:00",
    featured: false,
  },
  {
    id: 12,
    title: "Kasiyer Aranıyor",
    company: "Çarşı Market",
    location: "Antalya / Muratpaşa",
    salary: "Günlük 1.000 TL",
    type: "Günlük",
    category: "Satış & Mağaza",
    description:
      "Yoğun mağaza temposuna uyum sağlayabilecek, kasa deneyimi olan ya da öğrenmeye açık ekip arkadaşı.",
    createdAt: "2026-04-14T10:00:00",
    featured: false,
  },
  {
    id: 13,
    title: "Ofis Destek Elemanı",
    company: "Vera Danışmanlık",
    location: "İstanbul / Şişli",
    salary: "Part Time 12.000 TL / ay",
    type: "Part Time",
    category: "Ofis & Yardımcı İşler",
    description:
      "Dosyalama, evrak takibi ve günlük ofis işlerine destek verecek ekip arkadaşı aranıyor.",
    createdAt: "2026-04-14T10:00:00",
    featured: false,
  },
  {
    id: 14,
    title: "Temizlik Personeli",
    company: "Temiz Nokta",
    location: "Eskişehir / Odunpazarı",
    salary: "Günlük 1.100 TL",
    type: "Günlük",
    category: "Temizlik",
    description:
      "Ofis ve ortak kullanım alanlarının günlük temizliğinden sorumlu olacak personel aranıyor.",
    createdAt: "2026-04-14T10:00:00",
    featured: false,
  },
  {
    id: 15,
    title: "Barista Yardımcısı",
    company: "Köpük Kahve",
    location: "İzmir / Karşıyaka",
    salary: "Part Time 11.500 TL / ay",
    type: "Part Time",
    category: "Kafe & Restoran",
    description:
      "Kahve hazırlık süreçlerinde destek verecek, müşteri ilişkileri güçlü ekip arkadaşı aranıyor.",
    createdAt: "2026-04-14T10:00:00",
    featured: false,
  },
  {
    id: 16,
    title: "Paketleme Personeli",
    company: "Hızlı Koli",
    location: "Kocaeli / Gebze",
    salary: "Saatlik 175 TL",
    type: "Saatlik",
    category: "Depo & Lojistik",
    description:
      "Sipariş paketleme, etiketleme ve sevkiyat hazırlığında görev alacak personel aranıyor.",
    createdAt: "2026-04-14T10:00:00",
    featured: false,
  },
  {
    id: 17,
    title: "Mağaza Destek Personeli",
    company: "Merkez AVM Stand",
    location: "Adana / Seyhan",
    salary: "Günlük 1.250 TL",
    type: "Günlük",
    category: "Satış & Mağaza",
    description:
      "Stand düzeni, ürün tanıtımı ve müşteri yönlendirme alanlarında görev alacak personel aranıyor.",
    createdAt: "2026-04-14T10:00:00",
    featured: false,
  },
  {
    id: 18,
    title: "Sosyal Medya İçerik Yardımcısı",
    company: "Studio Mini",
    location: "Uzaktan / Türkiye",
    salary: "Part Time 13.000 TL / ay",
    type: "Part Time",
    category: "Freelance / Dijital",
    description:
      "Temel içerik hazırlama, paylaşım planlama ve dijital destek süreçlerinde çalışacak ekip arkadaşı aranıyor.",
    createdAt: "2026-04-14T10:00:00",
    featured: false,
  },
];

const categories = [
  "Tümü",
  "Kafe & Restoran",
  "Kurye & Dağıtım",
  "Depo & Lojistik",
  "Temizlik",
  "Etkinlik & Organizasyon",
  "Satış & Mağaza",
  "Ofis & Yardımcı İşler",
  "İnşaat & Fiziksel İş",
  "Freelance / Dijital",
];

const types = ["Tümü", "Günlük", "Saatlik", "Part Time"];

const cities = [
  "Tümü",
  "Adana",
  "Adıyaman",
  "Afyonkarahisar",
  "Ağrı",
  "Aksaray",
  "Amasya",
  "Ankara",
  "Antalya",
  "Ardahan",
  "Artvin",
  "Aydın",
  "Balıkesir",
  "Bartın",
  "Batman",
  "Bayburt",
  "Bilecik",
  "Bingöl",
  "Bitlis",
  "Bolu",
  "Burdur",
  "Bursa",
  "Çanakkale",
  "Çankırı",
  "Çorum",
  "Denizli",
  "Diyarbakır",
  "Düzce",
  "Edirne",
  "Elazığ",
  "Erzincan",
  "Erzurum",
  "Eskişehir",
  "Gaziantep",
  "Giresun",
  "Gümüşhane",
  "Hakkari",
  "Hatay",
  "Iğdır",
  "Isparta",
  "İstanbul",
  "İzmir",
  "Kahramanmaraş",
  "Karabük",
  "Karaman",
  "Kars",
  "Kastamonu",
  "Kayseri",
  "Kilis",
  "Kırıkkale",
  "Kırklareli",
  "Kırşehir",
  "Kocaeli",
  "Konya",
  "Kütahya",
  "Malatya",
  "Manisa",
  "Mardin",
  "Mersin",
  "Muğla",
  "Muş",
  "Nevşehir",
  "Niğde",
  "Ordu",
  "Osmaniye",
  "Rize",
  "Sakarya",
  "Samsun",
  "Siirt",
  "Sinop",
  "Sivas",
  "Şanlıurfa",
  "Şırnak",
  "Tekirdağ",
  "Tokat",
  "Trabzon",
  "Tunceli",
  "Uşak",
  "Van",
  "Yalova",
  "Yozgat",
  "Zonguldak",
];

function getDaysAgoLabel(createdAt) {
  const created = new Date(createdAt);
  const now = new Date();
  const diffMs = now - created;
  const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  if (diffDays === 0) return "Bugün yayında";
  if (diffDays === 1) return "1 gündür yayında";
  return `${diffDays} gündür yayında`;
}

function inferCategory(title) {
  const lower = title.toLocaleLowerCase("tr-TR");
  if (
    lower.includes("garson") ||
    lower.includes("barista") ||
    lower.includes("komi") ||
    lower.includes("restoran") ||
    lower.includes("kafe")
  ) {
    return "Kafe & Restoran";
  }
  if (
    lower.includes("kurye") ||
    lower.includes("dağıtım") ||
    lower.includes("moto")
  ) {
    return "Kurye & Dağıtım";
  }
  if (
    lower.includes("depo") ||
    lower.includes("paketleme") ||
    lower.includes("lojistik")
  ) {
    return "Depo & Lojistik";
  }
  if (lower.includes("temizlik")) {
    return "Temizlik";
  }
  if (
    lower.includes("etkinlik") ||
    lower.includes("organizasyon") ||
    lower.includes("karşılama")
  ) {
    return "Etkinlik & Organizasyon";
  }
  if (
    lower.includes("mağaza") ||
    lower.includes("kasiyer") ||
    lower.includes("satış") ||
    lower.includes("stand")
  ) {
    return "Satış & Mağaza";
  }
  if (lower.includes("ofis") || lower.includes("destek")) {
    return "Ofis & Yardımcı İşler";
  }
  if (lower.includes("içerik") || lower.includes("sosyal medya") || lower.includes("dijital")) {
    return "Freelance / Dijital";
  }
  return "Ofis & Yardımcı İşler";
}

function formatSalaryPreview(workType, salary) {
  if (!salary) return "";
  const formatted = new Intl.NumberFormat("tr-TR").format(Number(salary));
  if (workType === "Saatlik") return `Saatlik ${formatted} TL`;
  if (workType === "Part Time") return `Part Time ${formatted} TL / ay`;
  return `Günlük ${formatted} TL`;
}

export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tümü");
  const [jobType, setJobType] = useState("Tümü");
  const [city, setCity] = useState("Tümü");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [submittedCategory, setSubmittedCategory] = useState("Tümü");
  const [submittedJobType, setSubmittedJobType] = useState("Tümü");
  const [submittedCity, setSubmittedCity] = useState("Tümü");
  const [showForm, setShowForm] = useState(false);
  const [featuredChecked, setFeaturedChecked] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [logoSrc, setLogoSrc] = useState("/logo-ekis.png");
  const [headerSmall, setHeaderSmall] = useState(false);
  const [headerOpacity, setHeaderOpacity] = useState(1);
  const [jobs, setJobs] = useState(jobsSeed);
  const [featuredJobs, setFeaturedJobs] = useState(featuredSeed);
  const [selectedJob, setSelectedJob] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    city: "",
    workType: "Günlük",
    salary: "",
    description: "",
  });

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHeaderSmall(y > 60);
      const fadeDistance = 120;
      const nextOpacity = Math.max(0, 1 - y / fadeDistance);
      setHeaderOpacity(nextOpacity);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!showForm) {
      setFeaturedChecked(false);
      setShowPreview(false);
      setErrors({});
      setFormData({
        company: "",
        title: "",
        city: "",
        workType: "Günlük",
        salary: "",
        description: "",
      });
    }
  }, [showForm]);

  const validateForm = () => {
    const nextErrors = {};
    if (!formData.company.trim()) nextErrors.company = "Firma adı zorunludur.";
    if (!formData.title.trim()) nextErrors.title = "İlan başlığı zorunludur.";
    if (!formData.city.trim()) nextErrors.city = "Şehir / konum zorunludur.";
    if (!formData.salary.trim()) nextErrors.salary = "Ücret bilgisi zorunludur.";
    if (!formData.description.trim()) nextErrors.description = "İş açıklaması zorunludur.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (name === "salary") {
      const onlyNumbers = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({ ...prev, salary: onlyNumbers }));
      setErrors((prev) => ({ ...prev, salary: "" }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSearchSubmit = () => {
    setSubmittedSearch(search);
    setSubmittedCategory(category);
    setSubmittedJobType(jobType);
    setSubmittedCity(city);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("Tümü");
    setJobType("Tümü");
    setCity("Tümü");
    setSubmittedSearch("");
    setSubmittedCategory("Tümü");
    setSubmittedJobType("Tümü");
    setSubmittedCity("Tümü");
  };

  const handlePublish = () => {
    if (!validateForm()) return;

    const newJob = {
      id: Date.now(),
      title: formData.title.trim(),
      company: formData.company.trim(),
      location: formData.city.trim(),
      salary: formatSalaryPreview(formData.workType, formData.salary),
      type: formData.workType,
      category: inferCategory(formData.title),
      description: formData.description.trim(),
      createdAt: new Date().toISOString(),
      featured: featuredChecked,
    };

    if (featuredChecked) {
      setFeaturedJobs((prev) => [newJob, ...prev]);
    } else {
      setJobs((prev) => [newJob, ...prev]);
    }

    setShowForm(false);
  };

  const allJobsForCount = [...featuredJobs, ...jobs];

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const text = `${job.title} ${job.company} ${job.location} ${job.category}`.toLowerCase();
      const matchesSearch = text.includes(submittedSearch.toLowerCase());
      const matchesCategory = submittedCategory === "Tümü" ? true : job.category === submittedCategory;
      const matchesType = submittedJobType === "Tümü" ? true : job.type === submittedJobType;
      const matchesCity =
        submittedCity === "Tümü"
          ? true
          : job.location.toLocaleLowerCase("tr-TR").includes(submittedCity.toLocaleLowerCase("tr-TR"));
      return matchesSearch && matchesCategory && matchesType && matchesCity;
    });
  }, [jobs, submittedSearch, submittedCategory, submittedJobType, submittedCity]);

  const filteredFeaturedJobs = useMemo(() => {
    return featuredJobs.filter((job) => {
      const text = `${job.title} ${job.company} ${job.location} ${job.category || ""}`.toLowerCase();
      const matchesSearch = text.includes(submittedSearch.toLowerCase());
      const matchesCategory = submittedCategory === "Tümü" ? true : (job.category || inferCategory(job.title)) === submittedCategory;
      const matchesType = submittedJobType === "Tümü" ? true : job.type === submittedJobType;
      const matchesCity =
        submittedCity === "Tümü"
          ? true
          : job.location.toLocaleLowerCase("tr-TR").includes(submittedCity.toLocaleLowerCase("tr-TR"));
      return matchesSearch && matchesCategory && matchesType && matchesCity;
    });
  }, [featuredJobs, submittedSearch, submittedCategory, submittedJobType, submittedCity]);

  const previewSalary = formatSalaryPreview(formData.workType, formData.salary);

  return (
    <div className="app-shell">
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background: ${PALETTE.bg};
          color: ${PALETTE.text};
        }
        a { color: inherit; }
        .app-shell {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(228,93,80,0.10), transparent 26%),
            radial-gradient(circle at top right, rgba(118,191,190,0.10), transparent 24%),
            linear-gradient(180deg, #fff 0%, ${PALETTE.bg} 100%);
        }
        .container {
          width: calc(100% - 24px);
          max-width: none;
          margin: 0 auto;
        }
        .topbar {
          position: relative;
          top: 0;
          z-index: 50;
          background: transparent;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          border-bottom: none;
          box-shadow: none;
          transition: opacity 0.18s ease;
        }
        .topbar.small {
          box-shadow: none;
        }
        .topbar-inner {
          min-height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          transition: min-height 0.22s ease;
        }
        .topbar.small .topbar-inner { min-height: 60px; }
        .brand-wrap {
          display: flex;
          align-items: center;
          min-width: 0;
        }
        .brand-logo-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          padding: 0;
          margin: 0;
        }
        .brand-logo {
          height: 108px;
          width: auto;
          display: block;
          object-fit: contain;
          transition: height 0.22s ease, opacity 0.18s ease;
        }
        .topbar.small .brand-logo { height: 102px; }
        .top-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .btn {
          border: none;
          outline: none;
          border-radius: 15px;
          padding: 13px 18px;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, background 0.18s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
        }
        .btn:hover { transform: translateY(-1px); }
        .btn-primary {
          color: #fff;
          background: ${PALETTE.coral};
          box-shadow: 0 12px 24px rgba(228,93,80,0.28);
        }
        .btn-secondary {
          color: ${PALETTE.slate};
          background: #fff;
          border: 1px solid rgba(60,74,95,0.12);
          box-shadow: 0 8px 18px rgba(60,74,95,0.05);
        }
        .top-search {
          padding: 2px 0 10px;
        }
        .filter-wrap {
          background: ${PALETTE.teal};
          border: 1px solid rgba(60,74,95,0.08);
          border-radius: 24px;
          padding: 16px;
          box-shadow: 0 14px 30px rgba(60,74,95,0.05);
        }
        .filter-grid {
          display: grid;
          grid-template-columns: 1.45fr 1fr 1fr 1fr 0.9fr 0.9fr;
          gap: 12px;
          align-items: end;
        }
        .field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .field label {
          font-size: 13px;
          font-weight: 800;
          color: #fff;
          padding-left: 2px;
        }
        .field input, .field select {
          height: 56px;
          width: 100%;
          border-radius: 18px;
          border: 1px solid rgba(60,74,95,0.12);
          background: #fff;
          padding: 0 16px;
          font-size: 15px;
          color: ${PALETTE.text};
          outline: none;
          transition: border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
        }
        .field input:focus, .field select:focus {
          border-color: ${PALETTE.coral};
          box-shadow: 0 0 0 5px rgba(228,93,80,0.10);
          transform: translateY(-1px);
        }
        .search-action {
          display: flex;
          align-items: end;
        }
        .search-btn {
          width: 100%;
          height: 56px;
          border: none;
          border-radius: 18px;
          background: ${PALETTE.slate};
          color: #fff;
          font-size: 15px;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 0 12px 24px rgba(60,74,95,0.22);
          transition: transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease;
        }
        .search-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 30px rgba(60,74,95,0.26);
          filter: saturate(1.04);
        }
        .hero {
          padding: 4px 0 6px;
        }
        .hero-card {
          background: ${PALETTE.white};
          border: 1px solid rgba(60,74,95,0.08);
          border-radius: 24px;
          box-shadow: 0 12px 24px rgba(60,74,95,0.06);
          padding: 14px 18px;
          margin-bottom: 10px;
        }
        .hero-grid {
          display: block;
        }
        .hero-title {
          margin: 0;
          font-size: clamp(20px, 2.5vw, 30px);
          line-height: 1.08;
          letter-spacing: -0.04em;
          font-weight: 900;
          color: ${PALETTE.slate};
          max-width: 760px;
        }
        .hero-stats-inline {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 10px;
        }
        .hero-stat-bubble {
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(60,74,95,0.06);
          border: 1px solid rgba(60,74,95,0.08);
          font-size: 12px;
          font-weight: 800;
          color: ${PALETTE.slate};
        }
        .content-shell {
          display: block;
        }
        .section { padding: 0 0 16px; }
        .section-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .section-title {
          margin: 0;
          font-size: 24px;
          font-weight: 900;
          letter-spacing: -0.03em;
          color: ${PALETTE.slate};
        }
        .section-title-vitrin {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #fff;
        }
        .section-title-vitrin::before {
          content: "";
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: rgba(255,255,255,0.92);
          box-shadow:
            0 0 0 4px rgba(255,255,255,0.18),
            0 0 18px rgba(255,255,255,0.22);
          flex-shrink: 0;
        }
        .featured-section .section-sub:empty {
          display: none;
        }
        .section-sub {
          color: ${PALETTE.softText};
          font-size: 14px;
          font-weight: 800;
        }
        .featured-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }
        .featured-section {
          background: ${PALETTE.coral};
          border-radius: 28px;
          padding: 30px 22px 26px;
          margin-bottom: 28px;
        }
        .featured-section .section-head {
          margin-bottom: 20px;
        }
        .featured-section .section-title {
          color: #fff;
        }
        .featured-section .section-sub {
          color: rgba(255,255,255,0.88);
        }
        .featured-section .featured-grid {
          gap: 16px;
        }
        .featured-card {
          position: relative;
          background: #fff;
          border: 2px solid rgba(255,255,255,0.72);
          border-radius: 26px;
          padding: 22px;
          box-shadow: 0 16px 30px rgba(35,48,68,0.14);
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
          overflow: hidden;
          cursor: pointer;
        }
        .featured-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 22px 36px rgba(35,48,68,0.18);
          border-color: rgba(255,255,255,0.95);
        }
        .featured-card::after {
          content: "";
          position: absolute;
          right: -20px;
          bottom: -24px;
          width: 130px;
          height: 130px;
          border-radius: 50%;
          background: rgba(228,93,80,0.12);
        }
        .pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: ${PALETTE.coral};
          color: #fff;
          border-radius: 999px;
          padding: 7px 11px;
          font-size: 12px;
          font-weight: 900;
          margin-bottom: 14px;
        }
        .job-title {
          margin: 0 0 8px;
          font-size: 19px;
          line-height: 1.25;
          font-weight: 900;
          letter-spacing: -0.03em;
          color: ${PALETTE.slate};
        }
        .job-company {
          color: ${PALETTE.text};
          font-weight: 800;
          margin-bottom: 10px;
        }
        .job-days {
          font-size: 12px;
          color: ${PALETTE.softText};
          font-weight: 700;
          white-space: nowrap;
        }
        .job-meta-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 10px;
        }
        .job-meta-top .pill,
        .job-meta-top .type-tag {
          margin-bottom: 0;
        }
        .job-location {
          color: ${PALETTE.softText};
          margin-bottom: 10px;
          font-size: 15px;
        }
        .job-salary {
          color: ${PALETTE.coral};
          font-size: 20px;
          font-weight: 900;
          letter-spacing: -0.03em;
        }
        .jobs-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }
        .job-card {
          background: #fff;
          border: 1px solid rgba(60,74,95,0.08);
          border-radius: 24px;
          padding: 20px;
          box-shadow: 0 14px 28px rgba(60,74,95,0.05);
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
          cursor: pointer;
        }
        .job-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 22px 38px rgba(60,74,95,0.10);
          border-color: rgba(228,93,80,0.28);
        }
        .type-tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 7px 10px;
          border-radius: 999px;
          background: ${PALETTE.warm};
          color: ${PALETTE.coral};
          font-size: 12px;
          font-weight: 900;
          margin-bottom: 14px;
          border: 1px solid rgba(228,93,80,0.16);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.6);
        }
        .mini-salary {
          margin-top: 14px;
          color: ${PALETTE.teal};
          font-size: 17px;
          font-weight: 900;
        }
        .empty-box {
          background: linear-gradient(180deg, #fff 0%, #fbfcfd 100%);
          border: 1px dashed rgba(60,74,95,0.14);
          border-radius: 24px;
          padding: 34px;
          color: ${PALETTE.softText};
          text-align: center;
          box-shadow: 0 14px 24px rgba(60,74,95,0.04);
        }
        .post-modal-backdrop,
        .detail-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(35,48,68,0.38);
          backdrop-filter: blur(6px);
          z-index: 90;
          display: grid;
          place-items: center;
          padding: 18px;
        }
        .post-modal,
        .detail-modal {
          width: min(680px, calc(100vw - 28px));
          max-height: min(88vh, 920px);
          background: linear-gradient(180deg, #fff 0%, #fcfcfd 100%);
          border-radius: 30px;
          border: 1px solid rgba(60,74,95,0.08);
          box-shadow: 0 34px 80px rgba(35,48,68,0.24);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .post-panel-inner,
        .detail-panel-inner {
          padding: 24px;
          overflow-y: auto;
          overscroll-behavior: contain;
        }
        .post-form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          margin-bottom: 14px;
        }
        .post-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .post-field.full { grid-column: 1 / -1; }
        .post-field label {
          font-size: 13px;
          font-weight: 800;
          color: ${PALETTE.slate};
        }
        .required-star {
          color: ${PALETTE.coral};
          margin-left: 4px;
        }
        .post-field input, .post-field select, .post-field textarea {
          width: 100%;
          border-radius: 14px;
          border: 1px solid rgba(60,74,95,0.14);
          background: #fff;
          padding: 14px 14px;
          font-size: 14px;
          color: ${PALETTE.text};
          outline: none;
          resize: vertical;
          font-family: inherit;
        }
        .post-field textarea { min-height: 110px; }
        .post-field input:focus, .post-field select:focus, .post-field textarea:focus {
          border-color: ${PALETTE.coral};
          box-shadow: 0 0 0 4px rgba(228,93,80,0.10);
        }
        .field-error {
          border-color: #dc2626 !important;
          box-shadow: 0 0 0 4px rgba(220,38,38,0.08) !important;
        }
        .error-text {
          font-size: 12px;
          font-weight: 700;
          color: #dc2626;
          margin-top: -2px;
        }
        .post-title {
          margin: 0 0 8px;
          font-size: 24px;
          font-weight: 900;
          letter-spacing: -0.03em;
          color: ${PALETTE.slate};
        }
        .post-desc {
          margin: 0 0 18px;
          color: ${PALETTE.softText};
          font-size: 14px;
          line-height: 1.55;
        }
        .check-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 800;
          color: ${PALETTE.text};
          margin-bottom: 16px;
        }
        .check-row input { width: 18px; height: 18px; }
        .modal-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 8px;
        }
        .feature-box {
          background: ${PALETTE.warm};
          border: 1px solid rgba(228,93,80,0.14);
          border-radius: 18px;
          padding: 14px;
        }
        .feature-box-title {
          margin: 0 0 6px;
          font-size: 15px;
          font-weight: 900;
          color: ${PALETTE.slate};
        }
        .feature-box-text {
          margin: 0 0 12px;
          color: ${PALETTE.slate};
          font-size: 14px;
          line-height: 1.6;
        }
        .preview-card {
          position: relative;
          margin-top: 14px;
          background: #fff;
          border: 1px solid rgba(60,74,95,0.10);
          border-radius: 20px;
          padding: 16px;
          box-shadow: 0 10px 20px rgba(60,74,95,0.05);
          overflow: hidden;
        }
        .preview-card::after {
          content: "";
          position: absolute;
          right: -24px;
          bottom: -24px;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background: rgba(228,93,80,0.10);
        }
        .preview-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 12px;
        }
        .preview-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 7px 11px;
          border-radius: 999px;
          background: ${PALETTE.warm};
          color: ${PALETTE.coral};
          font-size: 12px;
          font-weight: 900;
          border: 1px solid rgba(228,93,80,0.16);
        }
        .preview-meta {
          color: ${PALETTE.softText};
          font-size: 13px;
          font-weight: 700;
        }
        .preview-title {
          margin: 0 0 6px;
          font-size: 19px;
          line-height: 1.2;
          font-weight: 900;
          letter-spacing: -0.03em;
          color: ${PALETTE.slate};
        }
        .preview-company {
          color: ${PALETTE.text};
          font-weight: 800;
          margin-bottom: 8px;
        }
        .preview-location {
          color: ${PALETTE.softText};
          margin-bottom: 10px;
          font-size: 14px;
        }
        .preview-salary {
          color: ${PALETTE.coral};
          font-size: 18px;
          font-weight: 900;
          margin-bottom: 10px;
        }
        .preview-desc {
          margin: 0;
          color: ${PALETTE.softText};
          line-height: 1.5;
          font-size: 13px;
          white-space: pre-wrap;
        }
        .preview-helper {
          margin-top: 14px;
          font-size: 13px;
          color: ${PALETTE.softText};
          font-weight: 700;
        }
        .feature-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          background: ${PALETTE.coral};
          color: #fff;
          border-radius: 12px;
          padding: 11px 14px;
          font-size: 14px;
          font-weight: 900;
        }
        .detail-title {
          margin: 0 0 10px;
          font-size: 28px;
          font-weight: 900;
          letter-spacing: -0.03em;
          color: ${PALETTE.slate};
        }
        .detail-meta {
          display: grid;
          gap: 10px;
          margin-bottom: 18px;
        }
        .detail-line {
          color: ${PALETTE.softText};
          font-size: 15px;
          font-weight: 700;
        }
        .detail-salary {
          color: ${PALETTE.coral};
          font-size: 22px;
          font-weight: 900;
        }
        .detail-description {
          color: ${PALETTE.text};
          font-size: 15px;
          line-height: 1.7;
          white-space: pre-wrap;
        }
        .site-footer {
          margin-top: 34px;
          border-radius: 34px 34px 0 0;
          overflow: hidden;
          background: #2F3949;
          color: rgba(255,255,255,0.92);
          box-shadow: 0 -10px 30px rgba(35,48,68,0.08);
        }
        .site-footer-topline {
          height: 12px;
          background: linear-gradient(90deg, ${PALETTE.coral} 0%, #f25b7a 100%);
        }
        .site-footer-inner {
          padding: 34px 28px 20px;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr 1fr 1.2fr;
          gap: 28px;
          align-items: start;
        }
        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .footer-logo {
          width: 126px;
          height: auto;
          display: block;
          object-fit: contain;
          filter: brightness(0) invert(1);
          opacity: 0.98;
        }
        .footer-brand-text {
          max-width: 290px;
          color: rgba(255,255,255,0.76);
          font-size: 14px;
          line-height: 1.7;
          margin: 0;
        }
        .footer-subheading {
          font-size: 16px;
          font-weight: 900;
          color: #fff;
          margin: 0 0 12px;
        }
        .footer-links {
          display: grid;
          gap: 10px;
        }
        .footer-link {
          color: rgba(255,255,255,0.82);
          text-decoration: none;
          font-size: 15px;
          font-weight: 700;
          transition: opacity 0.18s ease, transform 0.18s ease;
        }
        .footer-link:hover {
          opacity: 1;
          transform: translateX(2px);
        }
        .footer-socials {
          display: flex;
          gap: 10px;
          margin-bottom: 18px;
        }
        .footer-social {
          width: 42px;
          height: 42px;
          border-radius: 999px;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.12);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-decoration: none;
          font-size: 16px;
          font-weight: 900;
        }
        .footer-boxes {
          display: grid;
          gap: 12px;
          margin-top: 8px;
        }
        .footer-app-box {
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 16px;
          padding: 12px 14px;
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.04);
        }
        .footer-app-icon {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: rgba(255,255,255,0.12);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          font-weight: 900;
          flex-shrink: 0;
        }
        .footer-app-text {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }
        .footer-app-text strong {
          font-size: 15px;
        }
        .footer-app-text span {
          font-size: 12px;
          color: rgba(255,255,255,0.72);
        }
        .footer-bottom {
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.10);
          display: flex;
          justify-content: space-between;
          gap: 18px;
          flex-wrap: wrap;
          align-items: center;
        }
        .footer-bottom-links {
          display: flex;
          gap: 18px;
          flex-wrap: wrap;
        }
        .footer-bottom-link,
        .footer-copy {
          color: rgba(255,255,255,0.62);
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
        }
        .footer-space { height: 0; }

        @media (max-width: 1100px) {
          .filter-grid { grid-template-columns: 1fr; }
          .featured-grid { grid-template-columns: 1fr; }
          .jobs-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 760px) {
          .container { width: calc(100% - 16px); max-width: none; }
          .site-footer { border-radius: 24px 24px 0 0; }
          .site-footer-inner { padding: 24px 16px 18px; }
          .footer-grid { grid-template-columns: 1fr; gap: 22px; }
          .footer-bottom { gap: 12px; }
          .featured-section { border-radius: 28px; padding: 22px 16px 18px; }
          .topbar-inner {
            min-height: auto;
            padding: 4px 0 8px;
            align-items: flex-start;
            flex-direction: column;
          }
          .brand-wrap { width: 100%; }
          .brand-logo { height: 92px; }
          .topbar.small .brand-logo { height: 92px; }
          .top-actions {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
          .btn { width: 100%; padding: 12px 14px; }
          .hero-card { padding: 14px 16px; border-radius: 20px; }
          .hero-title { font-size: 24px; }
          .jobs-grid { grid-template-columns: 1fr; }
          .post-form-grid { grid-template-columns: 1fr; }
          .post-modal,
          .detail-modal {
            width: min(100vw - 16px, 680px);
            max-height: 90vh;
            border-radius: 22px;
          }
          .post-panel-inner,
          .detail-panel-inner {
            padding: 16px;
          }
          .post-title { font-size: 21px; }
          .post-desc { font-size: 13px; margin-bottom: 14px; }
          .preview-card { padding: 14px; border-radius: 18px; }
          .preview-title { font-size: 17px; }
          .preview-salary { font-size: 16px; }
          .modal-actions {
            position: sticky;
            bottom: 0;
            background: linear-gradient(180deg, rgba(252,252,253,0.85), #fcfcfd 35%);
            padding-top: 10px;
          }
        }
      `}</style>

      <header className={`topbar ${headerSmall ? "small" : ""}`} style={{ opacity: headerOpacity }}>
        <div className="container topbar-inner">
          <div className="brand-wrap">
            <a className="brand-logo-link" href="#">
              <img
                className="brand-logo"
                src={logoSrc}
                alt="Ekiş logo"
                onError={() => {
                  if (logoSrc !== "/logo-ekis.png") setLogoSrc("/logo-ekis.png");
                }}
              />
            </a>
          </div>

          <div className="top-actions">
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              Ücretsiz İlan Ver
            </button>
            <a className="btn btn-secondary" href="#ilanlar">
              Hemen İş Bul
            </a>
          </div>
        </div>
      </header>

      {showForm && (
        <div className="post-modal-backdrop" onClick={() => setShowForm(false)}>
          <div className="post-modal" onClick={(e) => e.stopPropagation()}>
            <div className="post-panel-inner">
              <h3 className="post-title">Ücretsiz ilan ver</h3>
              <p className="post-desc">
                Formu doldur, istersen ilanını vitrine çıkar ve ön izlemesini gör.
              </p>

              <div className="post-form-grid">
                <div className="post-field">
                  <label>Firma adı<span className="required-star">*</span></label>
                  <input
                    className={errors.company ? "field-error" : ""}
                    name="company"
                    type="text"
                    placeholder="Örn. Nova Organizasyon"
                    value={formData.company}
                    onChange={handleFormChange}
                  />
                  {errors.company && <div className="error-text">{errors.company}</div>}
                </div>

                <div className="post-field">
                  <label>İlan başlığı<span className="required-star">*</span></label>
                  <input
                    className={errors.title ? "field-error" : ""}
                    name="title"
                    type="text"
                    placeholder="Örn. Etkinlik Karşılama Elemanı"
                    value={formData.title}
                    onChange={handleFormChange}
                  />
                  {errors.title && <div className="error-text">{errors.title}</div>}
                </div>

                <div className="post-field">
                  <label>Şehir / Konum<span className="required-star">*</span></label>
                  <input
                    className={errors.city ? "field-error" : ""}
                    name="city"
                    type="text"
                    placeholder="Örn. İstanbul / Kadıköy"
                    value={formData.city}
                    onChange={handleFormChange}
                  />
                  {errors.city && <div className="error-text">{errors.city}</div>}
                </div>

                <div className="post-field">
                  <label>Çalışma tipi</label>
                  <select name="workType" value={formData.workType} onChange={handleFormChange}>
                    {types.filter((item) => item !== "Tümü").map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="post-field full">
                  <label>Ücret bilgisi<span className="required-star">*</span></label>
                  <input
                    className={errors.salary ? "field-error" : ""}
                    name="salary"
                    type="text"
                    inputMode="numeric"
                    placeholder="Örn. 1500"
                    value={formData.salary}
                    onChange={handleFormChange}
                  />
                  {errors.salary && <div className="error-text">{errors.salary}</div>}
                </div>

                <div className="post-field full">
                  <label>İş açıklaması<span className="required-star">*</span></label>
                  <textarea
                    className={errors.description ? "field-error" : ""}
                    name="description"
                    placeholder="İşin detaylarını, saat bilgisini ve adaydan beklentilerini yaz..."
                    value={formData.description}
                    onChange={handleFormChange}
                  />
                  {errors.description && <div className="error-text">{errors.description}</div>}
                </div>
              </div>

              <label className="check-row">
                <input
                  type="checkbox"
                  checked={featuredChecked}
                  onChange={(e) => setFeaturedChecked(e.target.checked)}
                />
                İlanı öne çıkar
              </label>

              {featuredChecked && (
                <div className="feature-box">
                  <div className="feature-box-title">Öne çıkarma bağlantısı</div>
                  <p className="feature-box-text">
                    İlanını ana vitrinde göstermek için aşağıdaki bağlantıdan ödeme adımına geçebilirsin.
                  </p>
                  <a
                    className="feature-link"
                    href={SHOPIER_FEATURED_LINK}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Shopier ödeme sayfasına git
                  </a>
                </div>
              )}

              {showPreview && (
                <div className="preview-card">
                  <div className="preview-top">
                    <div className="preview-badge">
                      {featuredChecked ? "Vitrin adayı" : "Standart ilan"}
                    </div>
                    <div className="preview-meta">{formData.workType || "Günlük"}</div>
                  </div>

                  <h4 className="preview-title">
                    {formData.title || "İlan başlığı burada görünecek"}
                  </h4>
                  <div className="preview-company">
                    {formData.company || "Firma adı burada görünecek"}
                  </div>
                  <div className="preview-location">
                    {formData.city || "Şehir / Konum burada görünecek"}
                  </div>
                  <div className="preview-salary">
                    {previewSalary || "Ücret bilgisi burada görünecek"}
                  </div>
                  <p className="preview-desc">
                    {formData.description || "İş açıklaması burada görünecek. Kullanıcılar ilanı açtığında bu alanı okuyacak."}
                  </p>
                  <div className="preview-helper">
                    {featuredChecked
                      ? "Vitrine çıkarmak için ödeme adımını tamamladığında bu ilan öne çıkarılabilir."
                      : "Bu görünüm standart ilan kartı ve ilan detayı için ön izleme amaçlıdır."}
                  </div>
                </div>
              )}

              <div className="modal-actions">
                <button className="btn btn-primary" type="button" onClick={() => setShowPreview((prev) => !prev)}>
                  {showPreview ? "Önizlemeyi Gizle" : "İlanı Önizle"}
                </button>
                <button className="btn btn-secondary" type="button" onClick={handlePublish}>
                  İlanı Yayınla
                </button>
                <button className="btn btn-secondary" type="button" onClick={() => setShowForm(false)}>
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedJob && (
        <div className="detail-modal-backdrop" onClick={() => setSelectedJob(null)}>
          <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="detail-panel-inner">
              <h3 className="detail-title">{selectedJob.title}</h3>
              <div className="detail-meta">
                <div className="detail-line"><strong>Firma:</strong> {selectedJob.company}</div>
                <div className="detail-line"><strong>Konum:</strong> {selectedJob.location}</div>
                <div className="detail-line"><strong>Çalışma tipi:</strong> {selectedJob.type}</div>
                <div className="detail-line"><strong>Kategori:</strong> {selectedJob.category || "Vitrin ilan"}</div>
                <div className="detail-line"><strong>Yayın:</strong> {getDaysAgoLabel(selectedJob.createdAt)}</div>
                <div className="detail-salary">{selectedJob.salary}</div>
              </div>
              <div className="detail-description">
                {selectedJob.description || "Bu ilan için açıklama bilgisi bulunmuyor."}
              </div>

              <div className="modal-actions">
                <button className="btn btn-secondary" type="button" onClick={() => setSelectedJob(null)}>
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="container">
        <section className="top-search" id="ilanlar">
          <div className="filter-wrap">
            <div className="filter-grid">
              <div className="field">
                <label>İlanlarda ara</label>
                <input
                  type="text"
                  placeholder="Ne iş arıyorsun? (garson, kurye...)"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                />
              </div>

              <div className="field">
                <label>Şehir seç</label>
                <select value={city} onChange={(e) => setCity(e.target.value)}>
                  {cities.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label>Meslek seç</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label>Çalışma tipi seç</label>
                <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
                  {types.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="search-action">
                <button className="search-btn" type="button" onClick={handleSearchSubmit}>
                  Ara
                </button>
              </div>

              <div className="search-action">
                <button className="search-btn" type="button" onClick={clearFilters}>
                  Temizle
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="hero">
          <div className="hero-card">
            <div className="hero-grid">
              <div>
                <h1 className="hero-title">
                  Günlük, saatlik ve part time işleri kolayca keşfet.
                </h1>
                <div className="hero-stats-inline">
                  <div className="hero-stat-bubble">{allJobsForCount.length}+ aktif ilan</div>
                  <div className="hero-stat-bubble">{featuredJobs.length}+ vitrin ilanı</div>
                  <div className="hero-stat-bubble">{jobs.length}+ standart ilan</div>
                  <div className="hero-stat-bubble">Türkiye geneli kapsama</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="content-shell">
          <div>
            <section className="section featured-section" id="one-cikanlar">
              <div className="section-head">
                <h2 className="section-title section-title-vitrin">Vitrin ilanlar</h2>
                <div className="section-sub">{filteredFeaturedJobs.length} ilan</div>
              </div>

              <div className="featured-grid">
                {filteredFeaturedJobs.map((job) => (
                  <article key={job.id} className="featured-card" onClick={() => setSelectedJob(job)}>
                    <div className="job-meta-top">
                      <div className="pill">Öne Çıkan</div>
                      <div className="job-days">{getDaysAgoLabel(job.createdAt)}</div>
                    </div>
                    <h3 className="job-title">{job.title}</h3>
                    <div className="job-company">{job.company}</div>
                    <div className="job-location">{job.location}</div>
                    <div className="job-salary">{job.salary}</div>
                  </article>
                ))}
              </div>
            </section>

            <section className="section">
              <div className="section-head">
                <h2 className="section-title">Tüm ilanlar</h2>
                <div className="section-sub">{filteredJobs.length} ilan bulundu</div>
              </div>

              {filteredJobs.length === 0 ? (
                <div className="empty-box">Aramana uygun ilan bulunamadı.</div>
              ) : (
                <div className="jobs-grid">
                  {filteredJobs.map((job) => (
                    <article key={job.id} className="job-card" onClick={() => setSelectedJob(job)}>
                      <div className="job-meta-top">
                        <div className="type-tag">{job.type}</div>
                        <div className="job-days">{getDaysAgoLabel(job.createdAt)}</div>
                      </div>
                      <h3 className="job-title">{job.title}</h3>
                      <div className="job-company">{job.company}</div>
                      <div className="job-location">{job.location}</div>
                      <div className="job-location">{job.category}</div>
                      <div className="mini-salary">{job.salary}</div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>

        <footer className="site-footer">
          <div className="site-footer-topline" />
          <div className="site-footer-inner">
            <div className="footer-grid">
              <div className="footer-brand">
                <img
                  className="footer-logo"
                  src={logoSrc}
                  alt="Ekiş logo"
                  onError={() => {
                    if (logoSrc !== "/logo-ekis.png") setLogoSrc("/logo-ekis.png");
                  }}
                />
                <p className="footer-brand-text">
                  Günlük, saatlik ve part time iş fırsatlarını tek yerde buluşturan sade ve hızlı iş ilan platformu.
                </p>
              </div>

              <div>
                <h3 className="footer-subheading">İş Arayan</h3>
                <div className="footer-links">
                  <a className="footer-link" href="#ilanlar">İlanları keşfet</a>
                  <a className="footer-link" href="#one-cikanlar">Vitrin ilanlar</a>
                  <a className="footer-link" href="#">Şehre göre işler</a>
                  <a className="footer-link" href="#">Sık sorulanlar</a>
                </div>
              </div>

              <div>
                <h3 className="footer-subheading">İşveren</h3>
                <div className="footer-links">
                  <a className="footer-link" href="#" onClick={(e) => { e.preventDefault(); setShowForm(true); }}>Ücretsiz ilan ver</a>
                  <a className="footer-link" href="#">Vitrine çıkar</a>
                  <a className="footer-link" href="#">Fiyatlandırma</a>
                  <a className="footer-link" href="#">Destek al</a>
                </div>
              </div>

              <div>
                <h3 className="footer-subheading">Bizi takip et</h3>
                <div className="footer-socials">
                  <a className="footer-social" href="#" aria-label="Instagram">ig</a>
                  <a className="footer-social" href="#" aria-label="X">x</a>
                  <a className="footer-social" href="#" aria-label="TikTok">tt</a>
                </div>

                <div className="footer-boxes">
                  <a className="footer-app-box" href="#">
                    <span className="footer-app-icon">▶</span>
                    <span className="footer-app-text">
                      <strong>Mobil uygulama</strong>
                      <span>Yakında yayında</span>
                    </span>
                  </a>
                  <a className="footer-app-box" href="#">
                    <span className="footer-app-icon">★</span>
                    <span className="footer-app-text">
                      <strong>İşveren paketi</strong>
                      <span>Daha fazla görünürlük</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div className="footer-bottom">
              <div className="footer-bottom-links">
                <a className="footer-bottom-link" href="#">Hakkımızda</a>
                <a className="footer-bottom-link" href="#">Kullanım şartları</a>
                <a className="footer-bottom-link" href="#">Gizlilik</a>
                <a className="footer-bottom-link" href="#">İletişim</a>
              </div>
              <div className="footer-copy">Ekiş © 2026</div>
            </div>
          </div>
        </footer>

        <div className="footer-space" />
      </main>
    </div>
  );
}
