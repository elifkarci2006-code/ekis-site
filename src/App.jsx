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
  green: "#16a34a",
  yellow: "#f59e0b",
  red: "#dc2626",
  blue: "#2563eb",
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
    plan: "featured",
    status: "active",
    paymentStatus: "paid",
    featuredStatus: "live",
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
    plan: "featured",
    status: "active",
    paymentStatus: "paid",
    featuredStatus: "live",
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
    plan: "featured",
    status: "active",
    paymentStatus: "paid",
    featuredStatus: "live",
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
    plan: "free",
    status: "active",
    paymentStatus: "none",
    featuredStatus: "none",
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
    plan: "free",
    status: "active",
    paymentStatus: "none",
    featuredStatus: "none",
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
    plan: "free",
    status: "active",
    paymentStatus: "none",
    featuredStatus: "none",
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
    plan: "free",
    status: "active",
    paymentStatus: "none",
    featuredStatus: "none",
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
    plan: "free",
    status: "active",
    paymentStatus: "none",
    featuredStatus: "none",
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
    plan: "free",
    status: "active",
    paymentStatus: "none",
    featuredStatus: "none",
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
    plan: "free",
    status: "active",
    paymentStatus: "none",
    featuredStatus: "none",
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
    plan: "free",
    status: "active",
    paymentStatus: "none",
    featuredStatus: "none",
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

function getStatusText(status) {
  if (status === "pending") return "Onay bekliyor";
  if (status === "rejected") return "Reddedildi";
  if (status === "expired") return "Süresi doldu";
  return "Yayında";
}

function getPlanText(plan) {
  return plan === "featured" ? "Vitrin" : "Standart";
}

function getPaymentText(paymentStatus) {
  if (paymentStatus === "paid") return "Ödendi";
  if (paymentStatus === "pending") return "Ödeme bekleniyor";
  if (paymentStatus === "failed") return "Başarısız";
  return "Yok";
}

function StatusBadge({ label, tone = "default" }) {
  const toneMap = {
    default: { bg: "rgba(60,74,95,0.08)", color: PALETTE.slate },
    success: { bg: "rgba(22,163,74,0.12)", color: PALETTE.green },
    warning: { bg: "rgba(245,158,11,0.16)", color: "#b45309" },
    danger: { bg: "rgba(220,38,38,0.12)", color: PALETTE.red },
    info: { bg: "rgba(37,99,235,0.12)", color: PALETTE.blue },
    coral: { bg: "rgba(228,93,80,0.14)", color: PALETTE.coral },
  };

  const selected = toneMap[tone] || toneMap.default;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "7px 10px",
        borderRadius: "999px",
        background: selected.bg,
        color: selected.color,
        fontSize: 12,
        fontWeight: 800,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

function AdminTable({ columns, rows, emptyText }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: 0,
          minWidth: 860,
          background: "#fff",
          border: `1px solid ${PALETTE.border}`,
          borderRadius: 18,
          overflow: "hidden",
        }}
      >
        <thead>
          <tr style={{ background: "#f8fafc" }}>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{
                  textAlign: "left",
                  padding: "14px 16px",
                  fontSize: 13,
                  fontWeight: 900,
                  color: PALETTE.slate,
                  borderBottom: `1px solid ${PALETTE.border}`,
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                style={{
                  padding: "22px 16px",
                  color: PALETTE.softText,
                  fontWeight: 700,
                }}
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={row.id || index}>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    style={{
                      padding: "14px 16px",
                      borderBottom:
                        index === rows.length - 1 ? "none" : `1px solid ${PALETTE.border}`,
                      verticalAlign: "top",
                      fontSize: 14,
                      color: PALETTE.text,
                    }}
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
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

  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [logoSrc, setLogoSrc] = useState("/logo-ekis.png");
  const [headerSmall, setHeaderSmall] = useState(false);
  const [headerOpacity, setHeaderOpacity] = useState(1);
  const [jobs, setJobs] = useState(jobsSeed);
  const [featuredJobs, setFeaturedJobs] = useState(featuredSeed);
  const [selectedJob, setSelectedJob] = useState(null);
  const [errors, setErrors] = useState({});

  const [showPlanModal, setShowPlanModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [pendingJob, setPendingJob] = useState(null);

  const [adminOpen, setAdminOpen] = useState(false);
  const [adminTab, setAdminTab] = useState("dashboard");

  const [formData, setFormData] = useState({
    company: "",
    title: "",
    city: "",
    workType: "Günlük",
    salary: "",
    description: "",
    contactName: "",
    contactPhone: "",
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
      setShowPreview(false);
      setErrors({});
      setSelectedPlan("free");
      setPendingJob(null);
      setShowPlanModal(false);
      setFormData({
        company: "",
        title: "",
        city: "",
        workType: "Günlük",
        salary: "",
        description: "",
        contactName: "",
        contactPhone: "",
      });
    }
  }, [showForm]);

  useEffect(() => {
    const pendingFeatured = localStorage.getItem("ekis_pending_featured_job");
    if (pendingFeatured) {
      try {
        const parsed = JSON.parse(pendingFeatured);
        if (parsed && parsed.id) {
          const existsInJobs = jobs.some((item) => item.id === parsed.id);
          const existsInFeatured = featuredJobs.some((item) => item.id === parsed.id);

          if (!existsInJobs && !existsInFeatured) {
            setJobs((prev) => [
              {
                ...parsed,
                plan: "featured",
                status: "pending",
                paymentStatus: "pending",
                featuredStatus: "waiting_approval",
              },
              ...prev,
            ]);
          }

          localStorage.removeItem("ekis_pending_featured_job");
        }
      } catch (error) {
        localStorage.removeItem("ekis_pending_featured_job");
      }
    }
  }, []);

  const validateForm = () => {
    const nextErrors = {};
    if (!formData.company.trim()) nextErrors.company = "Firma adı zorunludur.";
    if (!formData.title.trim()) nextErrors.title = "İlan başlığı zorunludur.";
    if (!formData.city.trim()) nextErrors.city = "Şehir / konum zorunludur.";
    if (!formData.salary.trim()) nextErrors.salary = "Ücret bilgisi zorunludur.";
    if (!formData.description.trim()) nextErrors.description = "İş açıklaması zorunludur.";
    if (!formData.contactName.trim()) nextErrors.contactName = "Yetkili adı zorunludur.";
    if (!formData.contactPhone.trim()) nextErrors.contactPhone = "Telefon zorunludur.";
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

    if (name === "contactPhone") {
      const cleaned = value.replace(/[^\d+\s()-]/g, "");
      setFormData((prev) => ({ ...prev, [name]: cleaned }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
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

  const buildJobFromForm = () => {
    return {
      id: Date.now(),
      title: formData.title.trim(),
      company: formData.company.trim(),
      location: formData.city.trim(),
      salary: formatSalaryPreview(formData.workType, formData.salary),
      type: formData.workType,
      category: inferCategory(formData.title),
      description: formData.description.trim(),
      createdAt: new Date().toISOString(),
      contactName: formData.contactName.trim(),
      contactPhone: formData.contactPhone.trim(),
      plan: selectedPlan,
      status: "pending",
      paymentStatus: selectedPlan === "featured" ? "pending" : "none",
      featuredStatus: selectedPlan === "featured" ? "waiting_approval" : "none",
    };
  };

  const handlePublishClick = () => {
    if (!validateForm()) return;
    const newJob = buildJobFromForm();
    setPendingJob(newJob);
    setShowPlanModal(true);
  };

  const handlePlanContinue = () => {
    if (!pendingJob) return;

    if (selectedPlan === "free") {
      setJobs((prev) => [
        {
          ...pendingJob,
          plan: "free",
          status: "pending",
          paymentStatus: "none",
          featuredStatus: "none",
        },
        ...prev,
      ]);
      setShowPlanModal(false);
      setShowForm(false);
      setPendingJob(null);
      return;
    }

    if (selectedPlan === "featured") {
      const featuredPending = {
        ...pendingJob,
        plan: "featured",
        status: "pending",
        paymentStatus: "pending",
        featuredStatus: "waiting_approval",
      };

      localStorage.setItem("ekis_pending_featured_job", JSON.stringify(featuredPending));

      setJobs((prev) => [featuredPending, ...prev]);
      setShowPlanModal(false);
      setShowForm(false);
      setPendingJob(null);
      window.open(SHOPIER_FEATURED_LINK, "_blank", "noopener,noreferrer");
    }
  };

  const updateJobStatus = (jobId, updates) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === jobId ? { ...job, ...updates } : job))
    );

    setFeaturedJobs((prev) =>
      prev.map((job) => (job.id === jobId ? { ...job, ...updates } : job))
    );
  };

  const approveJob = (job) => {
    if (job.plan === "featured") {
      updateJobStatus(job.id, {
        status: "active",
        paymentStatus: job.paymentStatus === "pending" ? "paid" : job.paymentStatus,
        featuredStatus: "live",
      });

      const alreadyFeatured = featuredJobs.some((item) => item.id === job.id);
      if (!alreadyFeatured) {
        const upgradedJob = {
          ...job,
          status: "active",
          paymentStatus: job.paymentStatus === "pending" ? "paid" : job.paymentStatus,
          featuredStatus: "live",
          plan: "featured",
        };
        setFeaturedJobs((prev) => [upgradedJob, ...prev]);
      }
    } else {
      updateJobStatus(job.id, { status: "active" });
    }
  };

  const rejectJob = (jobId) => {
    updateJobStatus(jobId, {
      status: "rejected",
      featuredStatus: "none",
    });

    setFeaturedJobs((prev) => prev.filter((item) => item.id !== jobId));
  };

  const expireJob = (jobId) => {
    updateJobStatus(jobId, { status: "expired" });
    setFeaturedJobs((prev) => prev.filter((item) => item.id !== jobId));
  };

  const removeJob = (jobId) => {
    setJobs((prev) => prev.filter((job) => job.id !== jobId));
    setFeaturedJobs((prev) => prev.filter((job) => job.id !== jobId));
    if (selectedJob?.id === jobId) setSelectedJob(null);
  };

  const moveToFeatured = (job) => {
    const upgradedJob = {
      ...job,
      plan: "featured",
      paymentStatus: "paid",
      featuredStatus: "live",
      status: "active",
    };

    updateJobStatus(job.id, upgradedJob);

    const alreadyFeatured = featuredJobs.some((item) => item.id === job.id);
    if (!alreadyFeatured) {
      setFeaturedJobs((prev) => [upgradedJob, ...prev]);
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (job.status !== "active") return false;
      if (job.plan === "featured" && job.featuredStatus === "live") return false;

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
      if (job.status !== "active") return false;
      if (job.featuredStatus !== "live") return false;

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

  const allAdminJobs = useMemo(() => {
    const featuredIds = new Set(featuredJobs.map((item) => item.id));
    const baseJobs = jobs.map((job) => {
      if (featuredIds.has(job.id)) {
        const sameFeatured = featuredJobs.find((f) => f.id === job.id);
        return sameFeatured || job;
      }
      return job;
    });

    const extraFeatured = featuredJobs.filter(
      (featured) => !baseJobs.some((job) => job.id === featured.id)
    );

    return [...extraFeatured, ...baseJobs].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [jobs, featuredJobs]);

  const adminStats = useMemo(() => {
    const all = allAdminJobs.length;
    const active = allAdminJobs.filter((job) => job.status === "active").length;
    const pending = allAdminJobs.filter((job) => job.status === "pending").length;
    const featuredLive = allAdminJobs.filter(
      (job) => job.plan === "featured" && job.featuredStatus === "live"
    ).length;
    const paymentPending = allAdminJobs.filter(
      (job) => job.plan === "featured" && job.paymentStatus === "pending"
    ).length;

    const today = new Date().toDateString();
    const todayCount = allAdminJobs.filter(
      (job) => new Date(job.createdAt).toDateString() === today
    ).length;

    return { all, active, pending, featuredLive, paymentPending, todayCount };
  }, [allAdminJobs]);

  const paymentRequests = useMemo(() => {
    return allAdminJobs.filter((job) => job.plan === "featured");
  }, [allAdminJobs]);

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
        button { font-family: inherit; }
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
        .btn-dark {
          color: #fff;
          background: ${PALETTE.slate};
          box-shadow: 0 12px 24px rgba(60,74,95,0.22);
        }
        .btn-danger {
          color: #fff;
          background: ${PALETTE.red};
          box-shadow: 0 10px 22px rgba(220,38,38,0.22);
        }
        .btn-success {
          color: #fff;
          background: ${PALETTE.green};
          box-shadow: 0 10px 22px rgba(22,163,74,0.22);
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
          border: none;
          border-radius: 18px;
          background: ${PALETTE.slate};
          color: #fff;
          font-size: 15px;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 0 12px 24px rgba(60,74,95,0.22);
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
        .soft-job-card {
          position: relative;
          background: linear-gradient(180deg, #ffffff 0%, #fbfcfd 100%);
          border: 1px solid rgba(60,74,95,0.08);
          border-radius: 28px;
          padding: 22px 22px 20px;
          box-shadow:
            0 16px 34px rgba(60,74,95,0.06),
            inset 0 1px 0 rgba(255,255,255,0.95);
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
        }
        .soft-job-card:hover {
          transform: translateY(-4px);
          box-shadow:
            0 22px 40px rgba(60,74,95,0.10),
            inset 0 1px 0 rgba(255,255,255,0.95);
          border-color: rgba(228,93,80,0.16);
        }
        .soft-job-card::after {
          content: "";
          position: absolute;
          left: 22px;
          right: 22px;
          bottom: 60px;
          height: 1px;
          background: rgba(60,74,95,0.08);
        }
        .soft-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 10px;
        }
        .soft-company {
          color: #6D7A8F;
          font-size: 15px;
          font-weight: 800;
          line-height: 1.2;
        }
        .soft-days {
          color: ${PALETTE.softText};
          font-size: 12px;
          font-weight: 700;
          letter-spacing: -0.01em;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .soft-days::before {
          content: "•";
          font-size: 16px;
          line-height: 1;
        }
        .soft-title {
          margin: 0 0 10px;
          font-size: 19px;
          line-height: 1.22;
          font-weight: 900;
          letter-spacing: -0.03em;
          color: ${PALETTE.slate};
        }
        .soft-salary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: ${PALETTE.teal};
          font-size: 17px;
          font-weight: 900;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
        }
        .soft-salary svg,
        .soft-detail svg {
          width: 15px;
          height: 15px;
          flex-shrink: 0;
        }
        .soft-details {
          display: grid;
          gap: 8px;
          margin-top: 18px;
          margin-bottom: 10px;
        }
        .soft-detail {
          display: flex;
          align-items: center;
          gap: 8px;
          color: ${PALETTE.softText};
          font-size: 15px;
          line-height: 1.4;
          font-weight: 500;
          letter-spacing: -0.01em;
        }
        .soft-badge-wrap {
          display: flex;
          justify-content: flex-end;
          margin-top: 10px;
        }
        .soft-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 86px;
          padding: 8px 14px;
          border-radius: 999px;
          background: ${PALETTE.warm};
          color: ${PALETTE.coral};
          border: 1px solid rgba(228,93,80,0.22);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: -0.01em;
          box-shadow: 0 4px 10px rgba(228,93,80,0.08);
        }
        .jobs-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
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
          width: min(760px, calc(100vw - 28px));
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
        .modal-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 8px;
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

        .plan-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          margin-top: 8px;
        }
        .plan-card {
          border: 2px solid rgba(60,74,95,0.10);
          border-radius: 22px;
          padding: 18px;
          background: #fff;
          cursor: pointer;
          transition: 0.18s ease;
        }
        .plan-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(60,74,95,0.08);
        }
        .plan-card.active {
          border-color: ${PALETTE.coral};
          box-shadow: 0 12px 28px rgba(228,93,80,0.12);
          background: linear-gradient(180deg, #fff 0%, #fff8f5 100%);
        }
        .plan-title {
          margin: 0 0 6px;
          font-size: 17px;
          font-weight: 900;
          color: ${PALETTE.slate};
        }
        .plan-price {
          font-size: 22px;
          font-weight: 900;
          color: ${PALETTE.coral};
          margin-bottom: 10px;
        }
        .plan-text {
          color: ${PALETTE.softText};
          font-size: 14px;
          line-height: 1.6;
          margin: 0;
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

        .admin-shell {
          margin-top: 28px;
          background: #fff;
          border-radius: 28px;
          border: 1px solid rgba(60,74,95,0.08);
          box-shadow: 0 18px 38px rgba(60,74,95,0.08);
          overflow: hidden;
        }
        .admin-top {
          padding: 22px;
          border-bottom: 1px solid ${PALETTE.border};
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 16px;
          align-items: center;
        }
        .admin-title {
          margin: 0;
          font-size: 28px;
          font-weight: 900;
          letter-spacing: -0.03em;
          color: ${PALETTE.slate};
        }
        .admin-sub {
          margin: 6px 0 0;
          font-size: 14px;
          color: ${PALETTE.softText};
          font-weight: 700;
        }
        .admin-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          padding: 18px 22px 0;
        }
        .admin-tab {
          border: 1px solid rgba(60,74,95,0.12);
          background: #fff;
          color: ${PALETTE.slate};
          border-radius: 999px;
          padding: 10px 14px;
          font-size: 13px;
          font-weight: 900;
          cursor: pointer;
        }
        .admin-tab.active {
          background: ${PALETTE.coral};
          color: #fff;
          border-color: ${PALETTE.coral};
        }
        .admin-body {
          padding: 22px;
        }
        .admin-cards {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 22px;
        }
        .admin-card {
          background: linear-gradient(180deg, #fff 0%, #fbfcfd 100%);
          border: 1px solid ${PALETTE.border};
          border-radius: 20px;
          padding: 18px;
          box-shadow: 0 10px 24px rgba(60,74,95,0.04);
        }
        .admin-card-label {
          font-size: 13px;
          font-weight: 800;
          color: ${PALETTE.softText};
          margin-bottom: 8px;
        }
        .admin-card-value {
          font-size: 28px;
          font-weight: 900;
          color: ${PALETTE.slate};
          line-height: 1;
        }
        .admin-section-title {
          margin: 0 0 14px;
          font-size: 20px;
          font-weight: 900;
          color: ${PALETTE.slate};
        }
        .admin-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .mini-btn {
          border: 1px solid rgba(60,74,95,0.12);
          background: #fff;
          border-radius: 12px;
          padding: 8px 10px;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
        }
        .mini-btn.success {
          background: rgba(22,163,74,0.10);
          color: ${PALETTE.green};
          border-color: rgba(22,163,74,0.18);
        }
        .mini-btn.warning {
          background: rgba(245,158,11,0.12);
          color: #b45309;
          border-color: rgba(245,158,11,0.20);
        }
        .mini-btn.danger {
          background: rgba(220,38,38,0.10);
          color: ${PALETTE.red};
          border-color: rgba(220,38,38,0.18);
        }
        .mini-btn.coral {
          background: rgba(228,93,80,0.10);
          color: ${PALETTE.coral};
          border-color: rgba(228,93,80,0.18);
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

        @media (max-width: 1180px) {
          .filter-grid { grid-template-columns: 1fr; }
          .featured-grid { grid-template-columns: 1fr; }
          .jobs-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .admin-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); }
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
          .jobs-grid { grid-template-columns: 1fr; }
          .post-form-grid { grid-template-columns: 1fr; }
          .plan-grid { grid-template-columns: 1fr; }
          .admin-cards { grid-template-columns: 1fr; }
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
            <button className="btn btn-dark" onClick={() => setAdminOpen((prev) => !prev)}>
              {adminOpen ? "Admini Kapat" : "Admin Paneli"}
            </button>
          </div>
        </div>
      </header>

      {showForm && (
        <div className="post-modal-backdrop" onClick={() => setShowForm(false)}>
          <div className="post-modal" onClick={(e) => e.stopPropagation()}>
            <div className="post-panel-inner">
              <h3 className="post-title">İlan ver</h3>
              <p className="post-desc">
                Formu doldur, ön izlemeni gör ve yayın planını seç.
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
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div className="post-field">
                  <label>Yetkili adı<span className="required-star">*</span></label>
                  <input
                    className={errors.contactName ? "field-error" : ""}
                    name="contactName"
                    type="text"
                    placeholder="Örn. Ahmet Yılmaz"
                    value={formData.contactName}
                    onChange={handleFormChange}
                  />
                  {errors.contactName && <div className="error-text">{errors.contactName}</div>}
                </div>

                <div className="post-field">
                  <label>Telefon<span className="required-star">*</span></label>
                  <input
                    className={errors.contactPhone ? "field-error" : ""}
                    name="contactPhone"
                    type="text"
                    placeholder="Örn. 0555 555 55 55"
                    value={formData.contactPhone}
                    onChange={handleFormChange}
                  />
                  {errors.contactPhone && <div className="error-text">{errors.contactPhone}</div>}
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

              {showPreview && (
                <div className="preview-card">
                  <div className="preview-top">
                    <div className="preview-badge">İlan ön izlemesi</div>
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
                <button className="btn btn-secondary" type="button" onClick={handlePublishClick}>
                  Devam Et
                </button>
                <button className="btn btn-secondary" type="button" onClick={() => setShowForm(false)}>
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPlanModal && (
        <div className="post-modal-backdrop" onClick={() => setShowPlanModal(false)}>
          <div className="post-modal" onClick={(e) => e.stopPropagation()}>
            <div className="post-panel-inner">
              <h3 className="post-title">İlanını nasıl yayınlamak istersin?</h3>
              <p className="post-desc">
                Standart ilanı ücretsiz yayınlayabilir ya da vitrinde öne çıkarabilirsin.
              </p>

              <div className="plan-grid">
                <div
                  className={`plan-card ${selectedPlan === "free" ? "active" : ""}`}
                  onClick={() => setSelectedPlan("free")}
                >
                  <h4 className="plan-title">Standart İlan</h4>
                  <div className="plan-price">Ücretsiz</div>
                  <p className="plan-text">
                    İlanın admin onayından sonra standart listede yayına alınır.
                  </p>
                </div>

                <div
                  className={`plan-card ${selectedPlan === "featured" ? "active" : ""}`}
                  onClick={() => setSelectedPlan("featured")}
                >
                  <h4 className="plan-title">Vitrin İlanı</h4>
                  <div className="plan-price">Ücretli</div>
                  <p className="plan-text">
                    İlanın daha görünür olur. Ödeme adımından sonra admin onayı ile vitrinde yayınlanır.
                  </p>
                </div>
              </div>

              <div className="modal-actions" style={{ marginTop: 18 }}>
                <button className="btn btn-primary" type="button" onClick={handlePlanContinue}>
                  {selectedPlan === "free" ? "Ücretsiz Yayınla" : "Ödeme Adımına Geç"}
                </button>
                <button className="btn btn-secondary" type="button" onClick={() => setShowPlanModal(false)}>
                  Geri
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
                <div className="detail-line"><strong>Plan:</strong> {getPlanText(selectedJob.plan)}</div>
                <div className="detail-line"><strong>Durum:</strong> {getStatusText(selectedJob.status)}</div>
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
                <button className="search-btn" type="button" onClick={handleSearchSubmit}>Ara</button>
              </div>

              <div className="search-action">
                <button className="search-btn" type="button" onClick={clearFilters}>Temizle</button>
              </div>
            </div>
          </div>
        </section>

        <section className="hero">
          <div className="hero-card">
            <h1 className="hero-title">Günlük, saatlik ve part time işleri kolayca keşfet.</h1>
            <div className="hero-stats-inline">
              <div className="hero-stat-bubble">{totalCount}+ aktif ilan</div>
              <div className="hero-stat-bubble">{filteredFeaturedJobs.length}+ vitrin ilanı</div>
              <div className="hero-stat-bubble">{filteredJobs.length}+ standart ilan</div>
              <div className="hero-stat-bubble">Türkiye geneli kapsama</div>
            </div>
          </div>
        </section>

        <section className="section featured-section" id="one-cikanlar">
          <div className="section-head">
            <h2 className="section-title section-title-vitrin">Vitrin ilanlar</h2>
            <div className="section-sub">{filteredFeaturedJobs.length} ilan</div>
          </div>

          <div className="featured-grid">
            {filteredFeaturedJobs.map((job) => (
              <article key={job.id} className="featured-card" onClick={() => setSelectedJob(job)}>
                <div className="card-top">
                  <div className="pill">Öne Çıkan</div>
                  <div className="card-top-right">
                    <div className="job-days">{getDaysAgoLabel(job.createdAt)}</div>
                    <div className="type-tag">{job.type}</div>
                  </div>
                </div>
                <div className="job-company">{job.company}</div>
                <h3 className="job-title">{job.title}</h3>
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
                <article key={job.id} className="soft-job-card" onClick={() => setSelectedJob(job)}>
                  <div className="soft-top">
                    <div className="soft-company">{job.company}</div>
                    <div className="soft-days">{getDaysAgoLabel(job.createdAt)}</div>
                  </div>

                  <h3 className="soft-title">{job.title}</h3>

                  <div className="soft-salary">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.18"></circle>
                      <path d="M13.5 7.5c-1.9 0-3.2.95-3.2 2.3 0 1.24.95 1.8 2.67 2.15 1.49.3 1.93.6 1.93 1.22 0 .71-.73 1.18-1.84 1.18-1.13 0-2.09-.44-2.95-1.12l-1.06 1.34c.97.84 2.16 1.35 3.55 1.48V18h1.57v-1.95c1.92-.24 3.16-1.3 3.16-2.82 0-1.47-.86-2.16-2.94-2.64-1.43-.33-1.67-.58-1.67-1.08 0-.46.45-.96 1.51-.96.91 0 1.72.31 2.51.88l.95-1.42c-.89-.71-1.95-1.08-3.08-1.19V6h-1.57v1.55Z" fill="currentColor"></path>
                    </svg>
                    <span>{job.salary}</span>
                  </div>

                  <div className="soft-details">
                    <div className="soft-detail">
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 21s6-5.33 6-11a6 6 0 1 0-12 0c0 5.67 6 11 6 11Z" fill="currentColor" opacity="0.22"></path>
                        <circle cx="12" cy="10" r="2.6" fill="currentColor"></circle>
                      </svg>
                      <span>{job.location}</span>
                    </div>
                    <div className="soft-detail">
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 3 4 8l8 5 8-5-8-5Z" fill="currentColor" opacity="0.22"></path>
                        <path d="m4 12 8 5 8-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                      <span>{job.category}</span>
                    </div>
                  </div>

                  <div className="soft-badge-wrap">
                    <div className="soft-badge">{job.type}</div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {adminOpen && (
          <section className="admin-shell">
            <div className="admin-top">
              <div>
                <h2 className="admin-title">Admin Paneli</h2>
                <p className="admin-sub">İlanları, vitrin taleplerini ve durumları buradan yönetebilirsin.</p>
              </div>
              <div className="modal-actions" style={{ marginTop: 0 }}>
                <button className="btn btn-secondary" onClick={() => setAdminOpen(false)}>
                  Paneli Kapat
                </button>
              </div>
            </div>

            <div className="admin-tabs">
              <button className={`admin-tab ${adminTab === "dashboard" ? "active" : ""}`} onClick={() => setAdminTab("dashboard")}>
                Dashboard
              </button>
              <button className={`admin-tab ${adminTab === "jobs" ? "active" : ""}`} onClick={() => setAdminTab("jobs")}>
                İlan Yönetimi
              </button>
              <button className={`admin-tab ${adminTab === "payments" ? "active" : ""}`} onClick={() => setAdminTab("payments")}>
                Vitrin Talepleri
              </button>
              <button className={`admin-tab ${adminTab === "settings" ? "active" : ""}`} onClick={() => setAdminTab("settings")}>
                Ayarlar
              </button>
            </div>

            <div className="admin-body">
              {adminTab === "dashboard" && (
                <>
                  <div className="admin-cards">
                    <div className="admin-card">
                      <div className="admin-card-label">Toplam ilan</div>
                      <div className="admin-card-value">{adminStats.all}</div>
                    </div>
                    <div className="admin-card">
                      <div className="admin-card-label">Aktif ilan</div>
                      <div className="admin-card-value">{adminStats.active}</div>
                    </div>
                    <div className="admin-card">
                      <div className="admin-card-label">Onay bekleyen</div>
                      <div className="admin-card-value">{adminStats.pending}</div>
                    </div>
                    <div className="admin-card">
                      <div className="admin-card-label">Vitrin ilan</div>
                      <div className="admin-card-value">{adminStats.featuredLive}</div>
                    </div>
                    <div className="admin-card">
                      <div className="admin-card-label">Ödeme bekleyen</div>
                      <div className="admin-card-value">{adminStats.paymentPending}</div>
                    </div>
                  </div>

                  <h3 className="admin-section-title">Son ilanlar</h3>

                  <AdminTable
                    emptyText="Henüz ilan yok."
                    columns={[
                      {
                        key: "title",
                        label: "İlan",
                        render: (row) => (
                          <div>
                            <div style={{ fontWeight: 900, marginBottom: 4 }}>{row.title}</div>
                            <div style={{ color: PALETTE.softText, fontWeight: 700 }}>{row.company}</div>
                          </div>
                        ),
                      },
                      { key: "location", label: "Konum" },
                      {
                        key: "plan",
                        label: "Plan",
                        render: (row) => (
                          <StatusBadge
                            label={getPlanText(row.plan)}
                            tone={row.plan === "featured" ? "coral" : "default"}
                          />
                        ),
                      },
                      {
                        key: "status",
                        label: "Durum",
                        render: (row) => (
                          <StatusBadge
                            label={getStatusText(row.status)}
                            tone={
                              row.status === "active"
                                ? "success"
                                : row.status === "pending"
                                ? "warning"
                                : row.status === "rejected"
                                ? "danger"
                                : "default"
                            }
                          />
                        ),
                      },
                      {
                        key: "createdAt",
                        label: "Tarih",
                        render: (row) => getDaysAgoLabel(row.createdAt),
                      },
                    ]}
                    rows={allAdminJobs.slice(0, 8)}
                  />
                </>
              )}

              {adminTab === "jobs" && (
                <>
                  <h3 className="admin-section-title">İlan Yönetimi</h3>

                  <AdminTable
                    emptyText="İlan bulunamadı."
                    columns={[
                      {
                        key: "job",
                        label: "İlan",
                        render: (row) => (
                          <div>
                            <div style={{ fontWeight: 900, marginBottom: 4 }}>{row.title}</div>
                            <div style={{ color: PALETTE.softText, fontWeight: 700 }}>{row.company}</div>
                          </div>
                        ),
                      },
                      { key: "location", label: "Konum" },
                      { key: "type", label: "Çalışma Tipi" },
                      {
                        key: "plan",
                        label: "Plan",
                        render: (row) => (
                          <StatusBadge
                            label={getPlanText(row.plan)}
                            tone={row.plan === "featured" ? "coral" : "default"}
                          />
                        ),
                      },
                      {
                        key: "status",
                        label: "Durum",
                        render: (row) => (
                          <StatusBadge
                            label={getStatusText(row.status)}
                            tone={
                              row.status === "active"
                                ? "success"
                                : row.status === "pending"
                                ? "warning"
                                : row.status === "rejected"
                                ? "danger"
                                : "default"
                            }
                          />
                        ),
                      },
                      {
                        key: "actions",
                        label: "İşlemler",
                        render: (row) => (
                          <div className="admin-actions">
                            <button className="mini-btn success" onClick={() => approveJob(row)}>
                              Onayla
                            </button>
                            <button className="mini-btn coral" onClick={() => moveToFeatured(row)}>
                              Vitrine Taşı
                            </button>
                            <button className="mini-btn warning" onClick={() => expireJob(row.id)}>
                              Pasife Al
                            </button>
                            <button className="mini-btn danger" onClick={() => rejectJob(row.id)}>
                              Reddet
                            </button>
                            <button className="mini-btn danger" onClick={() => removeJob(row.id)}>
                              Sil
                            </button>
                          </div>
                        ),
                      },
                    ]}
                    rows={allAdminJobs}
                  />
                </>
              )}

              {adminTab === "payments" && (
                <>
                  <h3 className="admin-section-title">Vitrin Talepleri</h3>

                  <AdminTable
                    emptyText="Vitrin talebi bulunamadı."
                    columns={[
                      {
                        key: "job",
                        label: "İlan",
                        render: (row) => (
                          <div>
                            <div style={{ fontWeight: 900, marginBottom: 4 }}>{row.title}</div>
                            <div style={{ color: PALETTE.softText, fontWeight: 700 }}>{row.company}</div>
                          </div>
                        ),
                      },
                      {
                        key: "contact",
                        label: "İletişim",
                        render: (row) => (
                          <div>
                            <div style={{ fontWeight: 800 }}>{row.contactName || "-"}</div>
                            <div style={{ color: PALETTE.softText }}>{row.contactPhone || "-"}</div>
                          </div>
                        ),
                      },
                      {
                        key: "paymentStatus",
                        label: "Ödeme",
                        render: (row) => (
                          <StatusBadge
                            label={getPaymentText(row.paymentStatus)}
                            tone={
                              row.paymentStatus === "paid"
                                ? "success"
                                : row.paymentStatus === "pending"
                                ? "warning"
                                : row.paymentStatus === "failed"
                                ? "danger"
                                : "default"
                            }
                          />
                        ),
                      },
                      {
                        key: "featuredStatus",
                        label: "Vitrin Durumu",
                        render: (row) => (
                          <StatusBadge
                            label={
                              row.featuredStatus === "live"
                                ? "Vitrinde"
                                : row.featuredStatus === "waiting_approval"
                                ? "Onay bekliyor"
                                : "Yok"
                            }
                            tone={
                              row.featuredStatus === "live"
                                ? "coral"
                                : row.featuredStatus === "waiting_approval"
                                ? "warning"
                                : "default"
                            }
                          />
                        ),
                      },
                      {
                        key: "actions",
                        label: "İşlemler",
                        render: (row) => (
                          <div className="admin-actions">
                            <button
                              className="mini-btn success"
                              onClick={() => {
                                updateJobStatus(row.id, { paymentStatus: "paid" });
                                approveJob({ ...row, paymentStatus: "paid" });
                              }}
                            >
                              Ödendi + Yayına Al
                            </button>
                            <button
                              className="mini-btn warning"
                              onClick={() => updateJobStatus(row.id, { paymentStatus: "pending" })}
                            >
                              Beklemeye Al
                            </button>
                            <button
                              className="mini-btn danger"
                              onClick={() =>
                                updateJobStatus(row.id, {
                                  paymentStatus: "failed",
                                  featuredStatus: "none",
                                  status: "rejected",
                                })
                              }
                            >
                              Başarısız İşaretle
                            </button>
                          </div>
                        ),
                      },
                    ]}
                    rows={paymentRequests}
                  />
                </>
              )}

              {adminTab === "settings" && (
                <>
                  <h3 className="admin-section-title">Ayarlar</h3>
                  <div className="admin-cards" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
                    <div className="admin-card">
                      <div className="admin-card-label">Vitrin İlan Fiyatı</div>
                      <div className="admin-card-value" style={{ fontSize: 22 }}>Shopier</div>
                      <div style={{ marginTop: 10, color: PALETTE.softText, fontWeight: 700 }}>
                        Link: {SHOPIER_FEATURED_LINK}
                      </div>
                    </div>

                    <div className="admin-card">
                      <div className="admin-card-label">Moderasyon Mantığı</div>
                      <div style={{ color: PALETTE.text, fontWeight: 800, lineHeight: 1.7 }}>
                        Ücretsiz ilanlar admin onayıyla,
                        <br />
                        vitrin ilanları ödeme + admin onayıyla yayına alınır.
                      </div>
                    </div>

                    <div className="admin-card">
                      <div className="admin-card-label">Geliştirilecek Sonraki Adım</div>
                      <div style={{ color: PALETTE.text, fontWeight: 800, lineHeight: 1.7 }}>
                        Supabase bağlayıp bu admin panelini gerçek veritabanına geçirmek.
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>
        )}

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
                  <a className="footer-link" href="#" onClick={(e) => { e.preventDefault(); setShowForm(true); }}>
                    İlan ver
                  </a>
                  <a className="footer-link" href="#" onClick={(e) => { e.preventDefault(); setAdminOpen(true); setAdminTab("payments"); }}>
                    Vitrine çıkar
                  </a>
                  <a className="footer-link" href="#" onClick={(e) => e.preventDefault()}>
                    Fiyatlandırma
                  </a>
                  <a className="footer-link" href="#" onClick={(e) => e.preventDefault()}>
                    Destek al
                  </a>
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
