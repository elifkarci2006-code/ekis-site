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
    category: "Kafe & Restoran",
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
    category: "Etkinlik & Organizasyon",
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
    category: "Kurye & Dağıtım",
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

const cities = ["Tümü", "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Ankara", "Antalya", "Ardahan", "Artvin", "Aydın", "Balıkesir", "Bartın", "Batman", "Bayburt", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Düzce", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Iğdır", "Isparta", "İstanbul", "İzmir", "Kahramanmaraş", "Karabük", "Karaman", "Kars", "Kastamonu", "Kayseri", "Kilis", "Kırıkkale", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Mardin", "Mersin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Şanlıurfa", "Şırnak", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Uşak", "Van", "Yalova", "Yozgat", "Zonguldak"];

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
  if (lower.includes("garson") || lower.includes("barista") || lower.includes("kafe")) return "Kafe & Restoran";
  if (lower.includes("kurye") || lower.includes("dağıtım")) return "Kurye & Dağıtım";
  if (lower.includes("depo") || lower.includes("paketleme") || lower.includes("lojistik")) return "Depo & Lojistik";
  if (lower.includes("temizlik")) return "Temizlik";
  if (lower.includes("etkinlik") || lower.includes("organizasyon") || lower.includes("karşılama")) return "Etkinlik & Organizasyon";
  if (lower.includes("mağaza") || lower.includes("kasiyer") || lower.includes("satış") || lower.includes("stand")) return "Satış & Mağaza";
  if (lower.includes("ofis") || lower.includes("destek")) return "Ofis & Yardımcı İşler";
  if (lower.includes("içerik") || lower.includes("dijital")) return "Freelance / Dijital";
  return "Ofis & Yardımcı İşler";
}

function formatSalaryPreview(workType, salary) {
  if (!salary) return "";
  const formatted = new Intl.NumberFormat("tr-TR").format(Number(salary));
  if (workType === "Saatlik") return `Saatlik ${formatted} TL`;
  if (workType === "Part Time") return `Part Time ${formatted} TL / ay`;
  return `Günlük ${formatted} TL`;
}

function getJobVisualKey(job) {
  const text = `${job.title || ""} ${job.category || ""}`.toLocaleLowerCase("tr-TR");
  if (text.includes("kurye") || text.includes("dağıtım")) return "delivery";
  if (text.includes("etkinlik") || text.includes("organizasyon") || text.includes("karşılama")) return "people";
  if (text.includes("garson") || text.includes("barista") || text.includes("kafe") || text.includes("restoran")) return "service";
  if (text.includes("depo") || text.includes("paketleme") || text.includes("lojistik")) return "box";
  if (text.includes("mağaza") || text.includes("satış") || text.includes("kasiyer")) return "store";
  return "briefcase";
}

function CategoryIcon({ job }) {
  const key = getJobVisualKey(job);

  if (key === "delivery") {
    return (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M18 39h24l5-12h7l4 12h-6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 39h5l4-18h23" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="22" cy="45" r="5" stroke="currentColor" strokeWidth="4" />
        <circle cx="48" cy="45" r="5" stroke="currentColor" strokeWidth="4" />
      </svg>
    );
  }

  if (key === "people") {
    return (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle cx="32" cy="22" r="8" stroke="currentColor" strokeWidth="4" />
        <circle cx="18" cy="28" r="6" stroke="currentColor" strokeWidth="4" />
        <circle cx="46" cy="28" r="6" stroke="currentColor" strokeWidth="4" />
        <path d="M18 48c2-8 8-12 14-12s12 4 14 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M7 49c1.5-6 6-9 11-9" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M57 49c-1.5-6-6-9-11-9" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  if (key === "service") {
    return (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M14 39c1-12 8-21 18-21s17 9 18 21" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M10 43h44" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M32 14v-4" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M18 51h28" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  if (key === "box") {
    return (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M14 22l18-9 18 9v21l-18 9-18-9V22Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
        <path d="M14 22l18 9 18-9" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
        <path d="M32 31v21" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  if (key === "store") {
    return (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M14 26h36l-4-11H18l-4 11Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
        <path d="M18 30v20h28V30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M25 50V38h14v12" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M20 24v-5c0-3 2-5 5-5h14c3 0 5 2 5 5v5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M12 24h40v26H12V24Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M26 34h12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
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
  const [sortOption, setSortOption] = useState("newest");
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
    if (e.key === "Enter") handleSearchSubmit();
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
    };

    if (featuredChecked) {
      setFeaturedJobs((prev) => [newJob, ...prev]);
    } else {
      setJobs((prev) => [newJob, ...prev]);
    }

    setShowForm(false);
  };

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

  const sortedJobs = useMemo(() => {
    const list = [...filteredJobs];
    if (sortOption === "salaryHigh") {
      return list.sort((a, b) => {
        const aSalary = Number(String(a.salary).replace(/[^0-9]/g, "")) || 0;
        const bSalary = Number(String(b.salary).replace(/[^0-9]/g, "")) || 0;
        return bSalary - aSalary;
      });
    }
    if (sortOption === "salaryLow") {
      return list.sort((a, b) => {
        const aSalary = Number(String(a.salary).replace(/[^0-9]/g, "")) || 0;
        const bSalary = Number(String(b.salary).replace(/[^0-9]/g, "")) || 0;
        return aSalary - bSalary;
      });
    }
    return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [filteredJobs, sortOption]);

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
  const totalCount = filteredFeaturedJobs.length + filteredJobs.length;

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
          transition: opacity 0.18s ease;
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
        }
        .search-action {
          display: flex;
          align-items: end;
        }
        .search-btn {
          width: 100%;
          height: 56px;
          border-radius: 18px;
          font-size: 15px;
          font-weight: 900;
          cursor: pointer;
          transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
        }
        .search-btn:hover { transform: translateY(-1px); }
        .search-btn-primary {
          border: 1px solid rgba(255,255,255,0.35);
          background: linear-gradient(180deg, #ff6846 0%, #ff4f26 100%);
          color: #fff;
          box-shadow: 0 14px 28px rgba(255,79,38,0.24);
        }
        .search-btn-clear {
          border: 1px solid rgba(255,255,255,0.62);
          background: rgba(255,255,255,0.08);
          color: #fff;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.18);
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
        .section-sub {
          color: ${PALETTE.softText};
          font-size: 14px;
          font-weight: 800;
        }
        .featured-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }
        .featured-section {
          background: ${PALETTE.coral};
          border-radius: 28px;
          padding: 30px 22px 26px;
          margin-bottom: 28px;
        }
        .featured-section .section-title { color: #fff; }
        .featured-section .section-sub { color: rgba(255,255,255,0.88); }

        .featured-card,
        .job-card {
          position: relative;
          background: #fff;
          border: 1px solid rgba(60,74,95,0.08);
          border-radius: 26px;
          padding: 22px;
          box-shadow: 0 14px 28px rgba(60,74,95,0.05);
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
        }
        .featured-card:hover,
        .job-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 36px rgba(60,74,95,0.10);
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

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 18px;
          min-height: 42px;
        }
        .card-top-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
          flex-shrink: 0;
          padding-top: 2px;
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
          font-weight: 800;
          letter-spacing: -0.01em;
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
          font-weight: 800;
          letter-spacing: -0.01em;
          border: 1px solid rgba(228,93,80,0.16);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.6);
        }
        .job-days {
          font-size: 12px;
          color: ${PALETTE.softText};
          font-weight: 700;
          letter-spacing: -0.01em;
          white-space: nowrap;
        }
        .job-company {
          color: ${PALETTE.slate};
          font-weight: 800;
          margin-bottom: 8px;
          font-size: 15px;
          line-height: 1.3;
          letter-spacing: -0.01em;
        }
        .job-title {
          margin: 0 0 8px;
          font-size: 19px;
          line-height: 1.22;
          font-weight: 900;
          letter-spacing: -0.03em;
          color: ${PALETTE.slate};
        }
        .job-location {
          color: ${PALETTE.softText};
          margin-bottom: 10px;
          font-size: 15px;
          line-height: 1.4;
          font-weight: 500;
          letter-spacing: -0.01em;
        }
        .job-salary {
          color: ${PALETTE.coral};
          font-size: 20px;
          font-weight: 900;
          line-height: 1.2;
          letter-spacing: -0.03em;
          margin-top: 8px;
        }
        .mini-salary {
          margin-top: 14px;
          color: ${PALETTE.teal};
          font-size: 17px;
          font-weight: 900;
        }
        .all-jobs-panel {
          background: rgba(255,255,255,0.92);
          border: 1px solid rgba(60,74,95,0.08);
          border-radius: 28px;
          padding: 22px;
          box-shadow: 0 18px 42px rgba(60,74,95,0.07);
          margin-top: 4px;
        }
        .all-jobs-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 18px;
        }
        .all-jobs-title-block {
          display: grid;
          gap: 6px;
        }
        .all-jobs-title {
          margin: 0;
          font-size: 28px;
          line-height: 1;
          font-weight: 950;
          letter-spacing: -0.04em;
          color: ${PALETTE.slate};
        }
        .all-jobs-sub {
          color: ${PALETTE.softText};
          font-size: 13px;
          font-weight: 800;
        }
        .sort-control {
          display: flex;
          align-items: center;
          gap: 10px;
          color: ${PALETTE.slate};
          font-size: 13px;
          font-weight: 900;
          white-space: nowrap;
        }
        .sort-control select {
          height: 44px;
          min-width: 168px;
          border: 1px solid rgba(60,74,95,0.12);
          background: #fff;
          color: ${PALETTE.slate};
          border-radius: 14px;
          padding: 0 14px;
          font-size: 13px;
          font-weight: 850;
          outline: none;
          box-shadow: 0 8px 18px rgba(60,74,95,0.04);
        }
        .quick-type-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }
        .quick-type-tab {
          border: none;
          min-width: 84px;
          height: 40px;
          border-radius: 999px;
          padding: 0 18px;
          background: linear-gradient(180deg, #f5f7f9 0%, #edf1f5 100%);
          color: ${PALETTE.slate};
          font-size: 13px;
          font-weight: 900;
          cursor: pointer;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.9), 0 8px 14px rgba(60,74,95,0.04);
          transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
        }
        .quick-type-tab:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 20px rgba(60,74,95,0.08);
        }
        .quick-type-tab.active {
          background: ${PALETTE.teal};
          color: #fff;
          box-shadow: 0 12px 24px rgba(88,173,173,0.24);
        }
        .soft-job-card {
          position: relative;
          background: linear-gradient(180deg, #ffffff 0%, #fbfcfd 100%);
          border: 1px solid rgba(60,74,95,0.08);
          border-radius: 24px;
          padding: 20px;
          box-shadow: 0 14px 30px rgba(60,74,95,0.055), inset 0 1px 0 rgba(255,255,255,0.95);
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
          min-height: 230px;
          display: flex;
          flex-direction: column;
        }
        .soft-job-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 22px 42px rgba(60,74,95,0.10), inset 0 1px 0 rgba(255,255,255,0.95);
          border-color: rgba(228,93,80,0.16);
        }
        .soft-job-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top right, rgba(118,191,190,0.12), transparent 34%);
          opacity: 0;
          transition: opacity 0.18s ease;
          pointer-events: none;
        }
        .soft-job-card:hover::before { opacity: 1; }
        .soft-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 14px;
          position: relative;
          z-index: 1;
        }
        .soft-company {
          color: ${PALETTE.teal};
          font-size: 15px;
          font-weight: 950;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }
        .soft-days {
          color: ${PALETTE.softText};
          font-size: 12px;
          font-weight: 800;
          letter-spacing: -0.01em;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .soft-days::before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: rgba(88,173,173,0.42);
        }
        .soft-title {
          position: relative;
          z-index: 1;
          margin: 0 0 12px;
          font-size: 20px;
          line-height: 1.18;
          font-weight: 950;
          letter-spacing: -0.035em;
          color: ${PALETTE.slate};
        }
        .soft-details {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 9px;
          margin-top: 4px;
          margin-bottom: 16px;
        }
        .soft-detail {
          display: flex;
          align-items: center;
          gap: 8px;
          color: ${PALETTE.softText};
          font-size: 14px;
          line-height: 1.35;
          font-weight: 750;
          letter-spacing: -0.01em;
        }
        .soft-detail svg {
          width: 15px;
          height: 15px;
          flex-shrink: 0;
          color: ${PALETTE.slate};
        }
        .soft-divider {
          height: 1px;
          background: rgba(228,93,80,0.14);
          margin: auto 0 14px;
          position: relative;
          z-index: 1;
        }
        .soft-footer {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .soft-salary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #ff4b2b;
          font-size: 17px;
          font-weight: 950;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }
        .soft-salary svg {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          color: #ff4b2b;
        }
        .soft-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 76px;
          height: 34px;
          padding: 0 13px;
          border-radius: 999px;
          background: #fff0eb;
          color: #ff4b2b;
          border: 1px solid rgba(255,75,43,0.18);
          font-size: 12px;
          font-weight: 900;
          letter-spacing: -0.01em;
          box-shadow: 0 6px 14px rgba(255,75,43,0.07);
        }
        .jobs-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
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
        .detail-modal {
          width: min(760px, calc(100vw - 28px));
        }
        .detail-panel-inner {
          padding: 0;
        }
        .detail-hero {
          position: relative;
          padding: 24px 26px 22px;
          background:
            radial-gradient(circle at top right, rgba(255,75,43,0.14), transparent 34%),
            linear-gradient(180deg, #fff 0%, #fff7f4 100%);
          border-bottom: 1px solid rgba(255,75,43,0.12);
        }
        .detail-close {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 38px;
          height: 38px;
          border-radius: 999px;
          border: 1px solid rgba(60,74,95,0.10);
          background: #fff;
          color: ${PALETTE.slate};
          font-size: 22px;
          font-weight: 900;
          line-height: 1;
          cursor: pointer;
          box-shadow: 0 10px 24px rgba(60,74,95,0.08);
        }
        .detail-badge-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 14px;
          padding-right: 48px;
        }
        .detail-featured-badge,
        .detail-type-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 32px;
          padding: 0 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: -0.01em;
        }
        .detail-featured-badge {
          color: #fff;
          background: linear-gradient(180deg, #ff6548 0%, #ff4424 100%);
          box-shadow: 0 10px 20px rgba(255,75,43,0.18);
        }
        .detail-type-badge {
          color: #ff4b2b;
          background: #fff0eb;
          border: 1px solid rgba(255,75,43,0.16);
        }
        .detail-company {
          margin: 0 0 8px;
          color: ${PALETTE.teal};
          font-size: 16px;
          font-weight: 900;
          letter-spacing: -0.02em;
        }
        .detail-title {
          margin: 0;
          max-width: 560px;
          font-size: clamp(26px, 3vw, 38px);
          line-height: 1.08;
          font-weight: 950;
          letter-spacing: -0.045em;
          color: ${PALETTE.slate};
        }
        .detail-body {
          padding: 22px 26px 26px;
        }
        .detail-salary-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 18px;
          padding: 18px 20px;
          border-radius: 22px;
          background: linear-gradient(180deg, #fff6f2 0%, #fff 100%);
          border: 1px solid rgba(255,75,43,0.14);
          box-shadow: 0 14px 28px rgba(255,75,43,0.08);
        }
        .detail-salary-label {
          color: ${PALETTE.softText};
          font-size: 13px;
          font-weight: 900;
          margin-bottom: 4px;
        }
        .detail-salary {
          color: #ff4b2b;
          font-size: 26px;
          font-weight: 950;
          letter-spacing: -0.035em;
        }
        .detail-salary-icon {
          width: 48px;
          height: 48px;
          border-radius: 18px;
          background: #ff4b2b;
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 14px 28px rgba(255,75,43,0.20);
          flex-shrink: 0;
        }
        .detail-meta {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          margin-bottom: 18px;
        }
        .detail-line {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          min-height: 58px;
          padding: 13px 14px;
          border-radius: 18px;
          background: #fbfcfd;
          border: 1px solid rgba(60,74,95,0.08);
          color: ${PALETTE.softText};
          font-size: 14px;
          font-weight: 800;
        }
        .detail-line-icon {
          width: 30px;
          height: 30px;
          border-radius: 12px;
          background: #fff0eb;
          color: #ff4b2b;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .detail-line strong {
          display: block;
          margin-bottom: 2px;
          color: ${PALETTE.slate};
          font-size: 13px;
          font-weight: 950;
        }
        .detail-description-box {
          padding: 18px 20px;
          border-radius: 22px;
          background: #fff;
          border: 1px solid rgba(60,74,95,0.08);
          box-shadow: 0 12px 26px rgba(60,74,95,0.04);
        }
        .detail-description-title {
          margin: 0 0 10px;
          color: ${PALETTE.slate};
          font-size: 17px;
          font-weight: 950;
          letter-spacing: -0.02em;
        }
        .detail-description {
          color: ${PALETTE.text};
          font-size: 15px;
          line-height: 1.75;
          white-space: pre-wrap;
        }
        .detail-actions {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 12px;
          margin-top: 18px;
        }
        .detail-apply-note {
          color: ${PALETTE.softText};
          font-size: 13px;
          font-weight: 800;
          line-height: 1.45;
          padding: 12px 14px;
          border-radius: 16px;
          background: rgba(88,173,173,0.10);
          border: 1px solid rgba(88,173,173,0.12);
        }
        .site-footer {
          margin-top: 34px;
          border-radius: 34px 34px 0 0;
          overflow: hidden;
          background: #2F3949;
          color: rgba(255,255,255,0.92);
        }
        .site-footer-topline {
          height: 12px;
          background: linear-gradient(90deg, ${PALETTE.coral} 0%, #f25b7a 100%);
        }
        .site-footer-inner { padding: 34px 28px 20px; }
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
        .footer-app-text strong { font-size: 15px; }
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


        /* --- Hero trust area + premium featured card revizyonu --- */
        .hero-card {
          padding: 24px 26px;
          box-shadow: 0 18px 38px rgba(60,74,95,0.08);
        }
        .hero-content {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          align-items: center;
          gap: 30px;
        }
        .hero-title {
          font-size: clamp(28px, 3vw, 46px);
          line-height: 1.12;
          letter-spacing: -0.055em;
        }
        .hero-trust-row {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 16px;
          flex-wrap: nowrap;
        }
        .hero-trust-pill {
          height: 72px;
          min-width: 230px;
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 13px 18px;
          border-radius: 20px;
          background: linear-gradient(180deg, #fff8f6 0%, #fff0ec 100%);
          border: 1px solid rgba(255,91,55,0.14);
          box-shadow: 0 16px 34px rgba(255,91,55,0.10);
          color: ${PALETTE.slate};
        }
        .hero-trust-icon {
          width: 48px;
          height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #ff4f26;
          flex-shrink: 0;
          filter: drop-shadow(0 10px 16px rgba(255,82,49,0.16));
        }
        .hero-trust-icon svg {
          display: block;
          width: 48px;
          height: 48px;
          overflow: visible;
        }
        .hero-trust-pill strong {
          display: block;
          color: #ff4f26;
          font-size: 16px;
          line-height: 1.08;
          font-weight: 950;
          letter-spacing: -0.035em;
          white-space: nowrap;
        }
        .hero-trust-pill small {
          display: block;
          margin-top: 6px;
          color: ${PALETTE.slate};
          font-size: 13.5px;
          line-height: 1.05;
          font-weight: 800;
          letter-spacing: -0.025em;
          white-space: nowrap;
        }
        .hero-stats-inline,
        .hero-stat-bubble {
          display: none;
        }
        .featured-section {
          background: linear-gradient(135deg, #f35b4d 0%, #ff552b 100%);
          box-shadow: 0 22px 44px rgba(228,93,80,0.20);
          padding: 30px 22px 24px;
        }
        .featured-head {
          margin-bottom: 18px;
        }
        .featured-head-actions {
          display: inline-flex;
          align-items: center;
          gap: 20px;
          color: rgba(255,255,255,0.96);
          font-size: 14px;
          font-weight: 900;
        }
        .featured-head-actions a {
          color: rgba(255,255,255,0.96);
          text-decoration: none;
        }
        .section-title-vitrin::before {
          content: "★";
          width: auto;
          height: auto;
          background: transparent;
          box-shadow: none;
          font-size: 17px;
          color: #fff;
        }
        .featured-card {
          min-height: 218px;
          padding: 24px 26px 26px;
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.76);
          box-shadow: 0 18px 38px rgba(35,48,68,0.10);
        }
        .featured-card::after {
          display: none;
        }
        .featured-card .card-top {
          margin-bottom: 26px;
          min-height: 34px;
        }
        .featured-card .pill {
          gap: 6px;
          padding: 9px 13px;
          background: ${PALETTE.coral};
          box-shadow: 0 10px 18px rgba(228,93,80,0.22);
        }
        .featured-card .type-tag {
          padding: 8px 12px;
          background: ${PALETTE.warm};
          color: ${PALETTE.coral};
          border-color: rgba(228,93,80,0.20);
        }
        .featured-company {
          color: ${PALETTE.teal};
          font-size: 16px;
          margin-bottom: 6px;
        }
        .featured-title {
          font-size: 21px;
          margin-bottom: 10px;
        }
        .featured-location {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: ${PALETTE.softText};
          font-size: 15px;
          font-weight: 600;
        }
        .featured-location svg {
          width: 17px;
          height: 17px;
          color: ${PALETTE.slate};
          flex-shrink: 0;
        }
        .featured-divider {
          width: min(76%, 360px);
          height: 1px;
          background: rgba(228,93,80,0.18);
          margin: 20px 0 16px;
        }
        .featured-salary-row {
          display: flex;
          align-items: center;
          gap: 9px;
          position: relative;
          z-index: 2;
        }
        .salary-wallet {
          width: 24px;
          height: 24px;
          color: #ff4f26;
          flex-shrink: 0;
        }
        .salary-wallet svg {
          width: 100%;
          height: 100%;
        }
        .featured-salary {
          margin: 0;
          color: #ff4f26;
          font-size: 20px;
        }
        .featured-icon-circle {
          position: absolute;
          right: 26px;
          bottom: 26px;
          width: 82px;
          height: 82px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(228,93,80,0.11);
          color: ${PALETTE.slate};
          z-index: 1;
        }
        .featured-icon-circle svg {
          width: 48px;
          height: 48px;
          opacity: 0.94;
        }

        @media (max-width: 1100px) {
          .filter-grid { grid-template-columns: 1fr; }
          .featured-grid { grid-template-columns: 1fr; }
          .jobs-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 760px) {
          .container { width: calc(100% - 16px); max-width: none; }
          .footer-grid { grid-template-columns: 1fr; gap: 22px; }
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
          .hero-content { grid-template-columns: 1fr; gap: 14px; }
          .hero-trust-row { justify-content: flex-start; flex-wrap: wrap; }
          .hero-trust-pill { width: 100%; min-width: 0; }
          .featured-head-actions { gap: 12px; font-size: 12px; }
          .featured-card { min-height: 220px; }
          .featured-icon-circle { width: 64px; height: 64px; right: 18px; bottom: 22px; }
          .featured-icon-circle svg { width: 38px; height: 38px; }
          .all-jobs-panel { padding: 16px; border-radius: 22px; }
          .all-jobs-top { align-items: flex-start; flex-direction: column; }
          .sort-control { width: 100%; justify-content: space-between; }
          .sort-control select { flex: 1; min-width: 0; }
          .quick-type-tabs { gap: 8px; }
          .quick-type-tab { min-width: auto; padding: 0 14px; }
          .jobs-grid { grid-template-columns: 1fr; }
          .post-form-grid { grid-template-columns: 1fr; }
          .detail-meta { grid-template-columns: 1fr; }
          .detail-actions { grid-template-columns: 1fr; }
          .detail-hero { padding: 22px 18px 20px; }
          .detail-body { padding: 18px; }
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
              <p className="post-desc">Formu doldur, istersen ilanını vitrine çıkar ve ön izlemesini gör.</p>

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
                      <option key={item} value={item}>{item}</option>
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
                  <a className="feature-link" href={SHOPIER_FEATURED_LINK} target="_blank" rel="noreferrer">
                    Shopier ödeme sayfasına git
                  </a>
                </div>
              )}

              {showPreview && (
                <div className="preview-card">
                  <div className="preview-top">
                    <div className="preview-badge">{featuredChecked ? "Vitrin adayı" : "Standart ilan"}</div>
                    <div className="preview-meta">{formData.workType || "Günlük"}</div>
                  </div>

                  <h4 className="preview-title">{formData.title || "İlan başlığı burada görünecek"}</h4>
                  <div className="preview-company">{formData.company || "Firma adı burada görünecek"}</div>
                  <div className="preview-location">{formData.city || "Şehir / Konum burada görünecek"}</div>
                  <div className="preview-salary">{previewSalary || "Ücret bilgisi burada görünecek"}</div>
                  <p className="preview-desc">
                    {formData.description || "İş açıklaması burada görünecek. Kullanıcılar ilanı açtığında bu alanı okuyacak."}
                  </p>
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
              <div className="detail-hero">
                <button className="detail-close" type="button" onClick={() => setSelectedJob(null)}>
                  ×
                </button>

                <div className="detail-badge-row">
                  {selectedJob.plan === "featured" || selectedJob.featuredStatus === "live" ? (
                    <span className="detail-featured-badge">★ Öne Çıkan</span>
                  ) : (
                    <span className="detail-featured-badge">Yeni İlan</span>
                  )}
                  <span className="detail-type-badge">{selectedJob.type}</span>
                  <span className="detail-type-badge">{getDaysAgoLabel(selectedJob.createdAt)}</span>
                </div>

                <p className="detail-company">{selectedJob.company}</p>
                <h3 className="detail-title">{selectedJob.title}</h3>
              </div>

              <div className="detail-body">
                <div className="detail-salary-card">
                  <div>
                    <div className="detail-salary-label">Ücret bilgisi</div>
                    <div className="detail-salary">{selectedJob.salary}</div>
                  </div>
                  <div className="detail-salary-icon" aria-hidden="true">
                    <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
                      <path d="M4 7.5h16v10H4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                      <path d="M7 10.5h.01M17 14.5h.01M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>

                <div className="detail-meta">
                  <div className="detail-line">
                    <span className="detail-line-icon" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11Z" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </span>
                    <span><strong>Konum</strong>{selectedJob.location}</span>
                  </div>

                  <div className="detail-line">
                    <span className="detail-line-icon" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2"/>
                        <path d="M4 7h16v12H4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span><strong>Çalışma tipi</strong>{selectedJob.type}</span>
                  </div>

                  <div className="detail-line">
                    <span className="detail-line-icon" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 3 4 8l8 5 8-5-8-5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                        <path d="M4 13l8 5 8-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </span>
                    <span><strong>Kategori</strong>{selectedJob.category || "Vitrin ilan"}</span>
                  </div>

                  <div className="detail-line">
                    <span className="detail-line-icon" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M7 3v3M17 3v3M4 8h16M6 5h12a2 2 0 0 1 2 2v12H4V7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </span>
                    <span><strong>Yayın durumu</strong>{getDaysAgoLabel(selectedJob.createdAt)}</span>
                  </div>
                </div>

                <div className="detail-description-box">
                  <h4 className="detail-description-title">İş açıklaması</h4>
                  <div className="detail-description">
                    {selectedJob.description || "Bu ilan için açıklama bilgisi bulunmuyor."}
                  </div>
                </div>

                <div className="detail-actions">
                  <div className="detail-apply-note">
                    Başvuru/iletişim bilgileri yayına alma aşamasında kuzenin tarafından gerçek sisteme bağlanabilir.
                  </div>
                  <button className="btn btn-primary" type="button">
                    Başvuru Bilgilerini Gör
                  </button>
                </div>
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
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label>Meslek seç</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  {categories.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label>Çalışma tipi seç</label>
                <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
                  {types.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="search-action">
                <button className="search-btn search-btn-primary" type="button" onClick={handleSearchSubmit}>Ara</button>
              </div>

              <div className="search-action">
                <button className="search-btn search-btn-clear" type="button" onClick={clearFilters}>Temizle</button>
              </div>
            </div>
          </div>
        </section>

        <section className="hero">
          <div className="hero-card">
            <div className="hero-content">
              <div>
                <h1 className="hero-title">Günlük, saatlik ve part time işleri kolayca keşfet.</h1>
              </div>

              <div className="hero-trust-row">
                <div className="hero-trust-pill">
                  <span className="hero-trust-icon" aria-hidden="true">
                    <svg viewBox="0 0 48 48" fill="none">
                      <path d="M24 5.5 37 10.6v10.1c0 8.3-5.4 15.9-13 18.8-7.6-2.9-13-10.5-13-18.8V10.6L24 5.5Z" fill="#ff4f26"/>
                      <path d="M18.2 23.8 22.2 27.8 30.8 18.7" stroke="white" strokeWidth="3.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span>
                    <strong>Onaylı ilanlar</strong>
                    <small>Güvenle başvur</small>
                  </span>
                </div>
                <div className="hero-trust-pill">
                  <span className="hero-trust-icon" aria-hidden="true">
                    <svg viewBox="0 0 48 48" fill="none">
                      <path d="M24 5.5c2.1 0 3.7 2.2 5.5 2.8 1.9.6 4.4-.4 6 .8 1.6 1.2 1.7 3.9 2.9 5.5 1.2 1.6 3.8 2.4 4.4 4.3.6 1.8-.9 4.1-.9 6.1s1.5 4.3.9 6.1c-.6 1.9-3.2 2.7-4.4 4.3-1.2 1.6-1.3 4.3-2.9 5.5-1.6 1.2-4.1.2-6 .8-1.8.6-3.4 2.8-5.5 2.8s-3.7-2.2-5.5-2.8c-1.9-.6-4.4.4-6-.8-1.6-1.2-1.7-3.9-2.9-5.5-1.2-1.6-3.8-2.4-4.4-4.3-.6-1.8.9-4.1.9-6.1s-1.5-4.3-.9-6.1c.6-1.9 3.2-2.7 4.4-4.3 1.2-1.6 1.3-4.3 2.9-5.5 1.6-1.2 4.1-.2 6-.8 1.8-.6 3.4-2.8 5.5-2.8Z" fill="#ff4f26"/>
                      <path d="M18.5 30.2 29.5 17.8" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                      <circle cx="18.5" cy="18.8" r="2.8" stroke="white" strokeWidth="2.6"/>
                      <circle cx="29.6" cy="29.3" r="2.8" stroke="white" strokeWidth="2.6"/>
                    </svg>
                  </span>
                  <span>
                    <strong>Türkiye geneli fırsatlar</strong>
                    <small>Tüm şehirlerde ilanlar</small>
                  </span>
                </div>
                <div className="hero-trust-pill">
                  <span className="hero-trust-icon" aria-hidden="true">
                    <svg viewBox="0 0 48 48" fill="none">
                      <path d="M27.4 4.8 12.5 27.2h10.2l-2.2 16 15-22.5H25.2l2.2-15.9Z" fill="#ff4f26"/>
                    </svg>
                  </span>
                  <span>
                    <strong>Hızlı başvuru süreci</strong>
                    <small>İlanlara kolayca başvur</small>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section featured-section" id="one-cikanlar">
          <div className="section-head featured-head">
            <h2 className="section-title section-title-vitrin">Vitrin ilanlar</h2>
            <div className="featured-head-actions">
              <span>{filteredFeaturedJobs.length} ilan</span>
              <a href="#ilanlar" onClick={(e) => e.preventDefault()}>Tümünü Gör →</a>
            </div>
          </div>

          <div className="featured-grid">
            {filteredFeaturedJobs.map((job) => (
              <article key={job.id} className="featured-card" onClick={() => setSelectedJob(job)}>
                <div className="card-top">
                  <div className="pill"><span>★</span> Öne Çıkan</div>
                  <div className="card-top-right">
                    <div className="job-days">{getDaysAgoLabel(job.createdAt)}</div>
                    <div className="type-tag">{job.type}</div>
                  </div>
                </div>

                <div className="job-company featured-company">{job.company}</div>
                <h3 className="job-title featured-title">{job.title}</h3>
                <div className="featured-location">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 21s6-5.33 6-11a6 6 0 1 0-12 0c0 5.67 6 11 6 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span>{job.location}</span>
                </div>

                <div className="featured-divider" />

                <div className="featured-salary-row">
                  <div className="salary-wallet" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M4 8.5h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                      <path d="M4 8.5 17 5v3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M17 13h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="job-salary featured-salary">{job.salary}</div>
                </div>

                <div className="featured-icon-circle">
                  <CategoryIcon job={job} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="all-jobs-panel">
            <div className="all-jobs-top">
              <div className="all-jobs-title-block">
                <h2 className="all-jobs-title">Tüm ilanlar</h2>
                <div className="all-jobs-sub">{filteredJobs.length} ilan bulundu</div>
              </div>

              <label className="sort-control">
                <span>Sırala:</span>
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                  <option value="newest">En yeni ilanlar</option>
                  <option value="salaryHigh">Ücret yüksekten düşüğe</option>
                  <option value="salaryLow">Ücret düşükten yükseğe</option>
                </select>
              </label>
            </div>

            <div className="quick-type-tabs" aria-label="Hızlı çalışma tipi filtreleri">
              {types.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`quick-type-tab ${submittedJobType === item ? "active" : ""}`}
                  onClick={() => {
                    setJobType(item);
                    setSubmittedJobType(item);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            {filteredJobs.length === 0 ? (
              <div className="empty-box">Aramana uygun ilan bulunamadı.</div>
            ) : (
              <div className="jobs-grid">
                {sortedJobs.map((job) => (
                  <article key={job.id} className="soft-job-card" onClick={() => setSelectedJob(job)}>
                    <div className="soft-top">
                      <div className="soft-company">{job.company}</div>
                      <div className="soft-days">{getDaysAgoLabel(job.createdAt)}</div>
                    </div>

                    <h3 className="soft-title">{job.title}</h3>

                    <div className="soft-details">
                      <div className="soft-detail">
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M12 21s6-5.33 6-11a6 6 0 1 0-12 0c0 5.67 6 11 6 11Z" fill="currentColor" opacity="0.20"></path>
                          <circle cx="12" cy="10" r="2.6" fill="currentColor"></circle>
                        </svg>
                        <span>{job.location}</span>
                      </div>
                      <div className="soft-detail">
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M12 3 4 8l8 5 8-5-8-5Z" fill="currentColor" opacity="0.18"></path>
                          <path d="m4 12 8 5 8-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        <span>{job.category}</span>
                      </div>
                    </div>

                    <div className="soft-divider" />

                    <div className="soft-footer">
                      <div className="soft-salary">
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M4 8.5h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                          <path d="M4 8.5 17 5v3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M17 13h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span>{job.salary}</span>
                      </div>
                      <div className="soft-badge">{job.type}</div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

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
      </main>
    </div>
  );
}
