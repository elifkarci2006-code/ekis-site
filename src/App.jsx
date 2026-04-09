import React, { useEffect, useMemo, useState } from "react";

const SHOPIFY_FEATURED_LINK = "https://your-shopify-link.com/one-cikan-ilan";

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
  },
  {
    id: 2,
    title: "Etkinlik Karşılama Elemanı",
    company: "Nova Organizasyon",
    location: "Ankara / Çankaya",
    salary: "Günlük 1.500 TL",
    type: "Part Time",
  },
  {
    id: 3,
    title: "Kurye Aranıyor",
    company: "Hızlı Paket",
    location: "İzmir / Bornova",
    salary: "Saatlik 200 TL + prim",
    type: "Saatlik",
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
  },
  {
    id: 12,
    title: "Kasiyer Aranıyor",
    company: "Çarşı Market",
    location: "Antalya / Muratpaşa",
    salary: "Günlük 1.000 TL",
    type: "Günlük",
    category: "Satış & Mağaza",
  },
  {
    id: 13,
    title: "Ofis Destek Elemanı",
    company: "Vera Danışmanlık",
    location: "İstanbul / Şişli",
    salary: "Part Time 12.000 TL / ay",
    type: "Part Time",
    category: "Ofis & Yardımcı İşler",
  },
  {
    id: 14,
    title: "Temizlik Personeli",
    company: "Temiz Nokta",
    location: "Eskişehir / Odunpazarı",
    salary: "Günlük 1.100 TL",
    type: "Günlük",
    category: "Temizlik",
  },
  {
    id: 15,
    title: "Barista Yardımcısı",
    company: "Köpük Kahve",
    location: "İzmir / Karşıyaka",
    salary: "Part Time 11.500 TL / ay",
    type: "Part Time",
    category: "Kafe & Restoran",
  },
  {
    id: 16,
    title: "Paketleme Personeli",
    company: "Hızlı Koli",
    location: "Kocaeli / Gebze",
    salary: "Saatlik 175 TL",
    type: "Saatlik",
    category: "Depo & Lojistik",
  },
  {
    id: 17,
    title: "Mağaza Destek Personeli",
    company: "Merkez AVM Stand",
    location: "Adana / Seyhan",
    salary: "Günlük 1.250 TL",
    type: "Günlük",
    category: "Satış & Mağaza",
  },
  {
    id: 18,
    title: "Sosyal Medya İçerik Yardımcısı",
    company: "Studio Mini",
    location: "Uzaktan / Türkiye",
    salary: "Part Time 13.000 TL / ay",
    type: "Part Time",
    category: "Freelance / Dijital",
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

const stats = [
  { value: "1.200+", label: "aktif aday" },
  { value: "320+", label: "yayındaki ilan" },
  { value: "81", label: "bugün yeni başvuru" },
  { value: "Türkiye", label: "geneli kapsama" },
];


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
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    city: "",
    workType: "Günlük",
    salary: "",
    description: "",
  });
  const [logoSrc, setLogoSrc] = useState("/publiclogo-ekis.png");
  const [headerSmall, setHeaderSmall] = useState(false);
  const [headerOpacity, setHeaderOpacity] = useState(1);

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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchSubmit = () => {
    setSubmittedSearch(search);
    setSubmittedCategory(category);
    setSubmittedJobType(jobType);
    setSubmittedCity(city);
  };

  const filteredJobs = useMemo(() => {
    return jobsSeed.filter((job) => {
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
  }, [submittedSearch, submittedCategory, submittedJobType, submittedCity]);

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
          width: min(1240px, calc(100% - 32px));
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
          min-height: 92px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          transition: min-height 0.22s ease;
        }
        .topbar.small .topbar-inner { min-height: 68px; }
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
          height: 92px;
          width: auto;
          display: block;
          object-fit: contain;
          transition: height 0.22s ease, opacity 0.18s ease;
        }
        .topbar.small .brand-logo { height: 78px; }
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
          padding: 14px 0 12px;
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
          grid-template-columns: 1.45fr 1fr 1fr 1fr 0.9fr;
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
          padding: 0;
        }
        .hero-card {
          padding: 10px 14px;
          border-radius: 18px;
          margin-bottom: 8px;
          box-shadow: 0 6px 12px rgba(60,74,95,0.04);
        };
          border: 1px solid rgba(60,74,95,0.08);
          border-radius: 24px;
          box-shadow: 0 12px 24px rgba(60,74,95,0.06);
          padding: 14px 18px;
          margin-bottom: 12px;
        }
        .hero-grid {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: ${PALETTE.warm};
          color: ${PALETTE.coral};
          font-size: 11px;
          font-weight: 900;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(228,93,80,0.16);
        }
        .hero-title {
          margin: 0;
          font-size: 20px;
          line-height: 1.1;
        };
          max-width: 760px;
        }
        .hero-title strong { color: ${PALETTE.coral}; }
        .hero-desc {
          display: none;
        };
          font-size: 13px;
          line-height: 1.45;
        }
        .hero-cta {
          margin-top: 6px;
        }
        .hero-micro {
          margin: 4px 0 0;
          font-size: 12px;
          color: ${PALETTE.softText};
          font-weight: 700;
        }
        .job-urgency {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin: 0 0 10px;
          padding: 5px 8px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 800;
          color: ${PALETTE.coral};
          background: rgba(228,93,80,0.08);
          border: 1px solid rgba(228,93,80,0.14);
        }
        .hero-points {
          display: none;
        }
        .hero-point {
          padding: 7px 10px;
          border-radius: 14px;
          background: ${PALETTE.bg};
          border: 1px solid rgba(60,74,95,0.08);
          color: ${PALETTE.slate};
          font-size: 14px;
          font-weight: 800;
        }
        .hero-side { display:none; }
        .stat-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 6px;
        }
        .stat-card {
          background: linear-gradient(180deg, #fff 0%, ${PALETTE.bg} 100%);
          border: 1px solid rgba(60,74,95,0.08);
          border-radius: 16px;
          padding: 9px 10px;
          box-shadow: 0 8px 16px rgba(60,74,95,0.04);
        }
        .stat-value {
          font-size: 16px;
          font-weight: 900;
          letter-spacing: -0.04em;
          color: ${PALETTE.slate};
          margin-bottom: 4px;
        }
        .stat-label {
          color: ${PALETTE.softText};
          font-size: 12px;
          font-weight: 700;
        }
        .trust-card {
          display: none;
        }
        .trust-title {
          font-size: 16px;
          font-weight: 900;
          margin-bottom: 8px;
        }
        .trust-text {
          margin: 0;
          color: rgba(255,255,255,0.9);
          line-height: 1.6;
          font-size: 14px;
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
          border-radius: 36px;
          padding: 34px 26px 30px;
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
        .post-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(35,48,68,0.38);
          backdrop-filter: blur(6px);
          z-index: 90;
          display: grid;
          place-items: center;
          padding: 18px;
        }
        .post-modal {
          width: min(580px, 100%);
          background: linear-gradient(180deg, #fff 0%, #fcfcfd 100%);
          border-radius: 30px;
          border: 1px solid rgba(60,74,95,0.08);
          box-shadow: 0 34px 80px rgba(35,48,68,0.24);
          overflow: hidden;
        }
        .post-panel-inner { padding: 24px; }
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
          padding: 16px;
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
        .footer-space { height: 42px; }
        @media (max-width: 1100px) {
          .filter-grid { grid-template-columns: 1fr; }
          .hero-grid {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }
          .steps-stack { grid-template-columns: 1fr; }
          .featured-grid { grid-template-columns: 1fr; }
          .jobs-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 760px) {
          .container { width: min(100% - 20px, 1240px); }

          .featured-section {
            border-radius: 28px;
            padding: 22px 16px 18px;
          }
          .topbar-inner {
            min-height: auto;
            padding: 12px 0;
            align-items: flex-start;
            flex-direction: column;
          }
          .brand-wrap { width: 100%; }
          .brand-logo { height: 92px; }
          .topbar.small .brand-logo { height: 78px; }
          .top-actions {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
          .btn { width: 100%; padding: 12px 14px; }
          .hero-card {
          padding: 10px 14px;
          border-radius: 18px;
          margin-bottom: 8px;
          box-shadow: 0 6px 12px rgba(60,74,95,0.04);
        }
          .hero-title {
          margin: 0;
          font-size: 20px;
          line-height: 1.1;
        }
          .hero-desc {
          display: none;
        }
          .jobs-grid { grid-template-columns: 1fr; }
          .stat-grid { grid-template-columns: 1fr 1fr; }
          .post-form-grid { grid-template-columns: 1fr; }
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
                Evet, burada ilan bilgilerini doldurabileceğin alanlar da olmalıydı. Bu yüzden form yapısını ekledim.
                Yayın akışını daha gerçekçi göstermek için temel ilan alanları artık modal içinde yer alıyor.
              </p>

              <div className="post-form-grid">
                <div className="post-field">
                  <label>Firma adı</label>
                  <input
                    name="company"
                    type="text"
                    placeholder="Örn. Nova Organizasyon"
                    value={formData.company}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="post-field">
                  <label>İlan başlığı</label>
                  <input
                    name="title"
                    type="text"
                    placeholder="Örn. Etkinlik Karşılama Elemanı"
                    value={formData.title}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="post-field">
                  <label>Şehir / Konum</label>
                  <input
                    name="city"
                    type="text"
                    placeholder="Örn. İstanbul / Kadıköy"
                    value={formData.city}
                    onChange={handleFormChange}
                  />
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
                  <label>Ücret bilgisi</label>
                  <input
                    name="salary"
                    type="text"
                    placeholder="Örn. Günlük 1.500 TL + yemek"
                    value={formData.salary}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="post-field full">
                  <label>İş açıklaması</label>
                  <textarea
                    name="description"
                    placeholder="İşin detaylarını, saat bilgisini ve adaydan beklentilerini yaz..."
                    value={formData.description}
                    onChange={handleFormChange}
                  />
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
                    href={SHOPIFY_FEATURED_LINK}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Shopify ödeme bağlantısına git
                  </a>
                </div>
              )}

              <div className="modal-actions">
                <button className="btn btn-primary" type="button">
                  İlanı Önizle
                </button>
                <button className="btn btn-secondary" type="button" onClick={() => setShowForm(false)}>
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
                  placeholder="Ne iş arıyorsun? (garson, kurye…)"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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
            </div>
          </div>
        </section>

        <section className="hero">
          <div className="hero-card">
            <div className="hero-grid">
              <div>
                <div className="badge">Hızlı başvuru • net filtreleme • Türkiye geneli</div>
                <h1 className="hero-title">
                  <strong>Günlük, saatlik ve part time işleri kolayca keşfet.</strong> Türkiye genelindeki ilanlar tek yerde.
                </h1>
                <p className="hero-micro">Türkiye genelinde günlük ve saatlik işler</p>
                <p className="hero-desc">
                  Şehrine uygun ek işi hızlıca keşfet. Sade arama alanıyla ilanları filtrele,
                  öne çıkan fırsatları incele ve sana uyan işi daha hızlı bul.
                </p>

                <div className="hero-cta">
                  <a className="btn btn-primary" href="#one-cikanlar">Öne Çıkanlara Git</a>
                  <button className="btn btn-secondary" onClick={() => setShowForm(true)}>
                    İşveren Olarak İlan Ver
                  </button>
                </div>

                <div className="hero-points">
                  <div className="hero-point">Günlük işler</div>
                  <div className="hero-point">Saatlik çalışmalar</div>
                  <div className="hero-point">Part time fırsatlar</div>
                  <div className="hero-point">Türkiye geneli ilanlar</div>
                </div>
              </div>

              <div className="hero-side">
                <div className="stat-grid">
                  {stats.map((item) => (
                    <div key={item.label} className="stat-card">
                      <div className="stat-value">{item.value}</div>
                      <div className="stat-label">{item.label}</div>
                    </div>
                  ))}
                </div>

                <div className="trust-card">
                  <div className="trust-title">İlk bakışta daha net</div>
                  <p className="trust-text">
                    Hero alanı daha kompakt hale geldi. Kullanıcı sayfaya girer girmez önce arama alanını, ardından öne çıkan ilanları daha hızlı görüyor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


        <div className="content-shell">
          <div>
            <section className="section featured-section" id="one-cikanlar">
              <div className="section-head">
                <h2 className="section-title">🔥 Vitrin ilanlar</h2>
                <div className="section-sub">Vitrinde daha görünür ilanlar</div>
              </div>

              <div className="featured-grid">
                {featuredSeed.map((job) => (
                  <article key={job.id} className="featured-card">
                    <div className="pill">Öne Çıkan</div>
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
                    <article key={job.id} className="job-card">
                      <div className="type-tag">{job.type}</div>
                      <h3 className="job-title">{job.title}</h3>
                      <div className="job-urgency">⚡ Hızlı doluyor</div>
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

        <div className="footer-space" />
      </main>
    </div>
  );
}

