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
};

const featuredSeed = [
  {
    id: 1,
    title: "Garson Aranıyor",
    company: "Odunpazarı Kafe",
    location: "Eskişehir / Odunpazarı",
    salary: "Günlük 1.200 TL + yemek",
    type: "Günlük",
  },
  {
    id: 2,
    title: "Etkinlik Karşılama Elemanı",
    company: "Fuar Organizasyon",
    location: "Eskişehir / Merkez",
    salary: "Günlük 1.500 TL",
    type: "Part Time",
  },
  {
    id: 3,
    title: "Kurye Aranıyor",
    company: "Hızlı Paket",
    location: "Eskişehir / Tepebaşı",
    salary: "Saatlik 200 TL + prim",
    type: "Saatlik",
  },
];

const jobsSeed = [
  {
    id: 11,
    title: "Depo Düzenleme Personeli",
    company: "Tepebaşı Lojistik",
    location: "Eskişehir / Tepebaşı",
    salary: "Saatlik 180 TL",
    type: "Saatlik",
    category: "Depo & Lojistik",
  },
  {
    id: 12,
    title: "Kasiyer Aranıyor",
    company: "Çarşı Market",
    location: "Eskişehir / Merkez",
    salary: "Günlük 1.000 TL",
    type: "Günlük",
    category: "Satış & Mağaza",
  },
  {
    id: 13,
    title: "Ofis Destek Elemanı",
    company: "Anadolu Danışmanlık",
    location: "Eskişehir / Merkez",
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
    location: "Eskişehir / Tepebaşı",
    salary: "Part Time 11.500 TL / ay",
    type: "Part Time",
    category: "Kafe & Restoran",
  },
  {
    id: 16,
    title: "Paketleme Personeli",
    company: "Hızlı Koli",
    location: "Eskişehir / Organize",
    salary: "Saatlik 175 TL",
    type: "Saatlik",
    category: "Depo & Lojistik",
  },
  {
    id: 17,
    title: "Mağaza Destek Personeli",
    company: "Neo AVM Stand",
    location: "Eskişehir / Tepebaşı",
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

export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tümü");
  const [jobType, setJobType] = useState("Tümü");
  const [showForm, setShowForm] = useState(false);
  const [featuredChecked, setFeaturedChecked] = useState(false);
  const [logoSrc, setLogoSrc] = useState("/publiclogo-ekis.png");
  const [headerSmall, setHeaderSmall] = useState(false);

  useEffect(() => {
    const onScroll = () => setHeaderSmall(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!showForm) setFeaturedChecked(false);
  }, [showForm]);

  const filteredJobs = useMemo(() => {
    return jobsSeed.filter((job) => {
      const text = `${job.title} ${job.company} ${job.location} ${job.category}`.toLowerCase();
      const matchesSearch = text.includes(search.toLowerCase());
      const matchesCategory = category === "Tümü" ? true : job.category === category;
      const matchesType = jobType === "Tümü" ? true : job.type === jobType;
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [search, category, jobType]);

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
        .app-shell {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(118,191,190,0.12), transparent 28%),
            linear-gradient(180deg, #f8fbfb 0%, ${PALETTE.bg} 100%);
        }
        .container {
          width: min(1240px, calc(100% - 32px));
          margin: 0 auto;
        }
        .topbar {
          position: sticky;
          top: 0;
          z-index: 50;
          backdrop-filter: blur(14px);
          background: rgba(255,255,255,0.9);
          border-bottom: 1px solid rgba(60,74,95,0.08);
          transition: background 0.2s ease, box-shadow 0.2s ease;
        }
        .topbar.small {
          box-shadow: 0 10px 26px rgba(60,74,95,0.07);
        }
        .topbar-inner {
          min-height: 96px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          transition: min-height 0.22s ease;
        }
        .topbar.small .topbar-inner { min-height: 72px; }
        .brand-wrap {
          display: flex;
          align-items: center;
          gap: 16px;
          min-width: 0;
        }
        .brand-card {
          background: ${PALETTE.white};
          border: 1px solid rgba(60,74,95,0.08);
          box-shadow: 0 12px 28px rgba(60,74,95,0.08);
          border-radius: 22px;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 72px;
          transition: all 0.22s ease;
        }
        .topbar.small .brand-card {
          padding: 10px 14px;
          min-height: 56px;
          border-radius: 18px;
        }
        .brand-logo {
          height: 54px;
          width: auto;
          display: block;
          object-fit: contain;
          transition: height 0.22s ease;
        }
        .topbar.small .brand-logo { height: 42px; }
        .brand-texts {
          display: flex;
          flex-direction: column;
          gap: 4px;
          transition: transform 0.22s ease, opacity 0.22s ease;
        }
        .brand-title {
          font-size: 20px;
          font-weight: 900;
          letter-spacing: -0.03em;
          color: ${PALETTE.slate};
        }
        .brand-sub {
          font-size: 13px;
          color: ${PALETTE.softText};
        }
        .topbar.small .brand-texts {
          transform: translateY(-1px);
        }
        .top-actions {
          display: flex;
          align-items: center;
          gap: 10px;
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
        }
        .btn:hover { transform: translateY(-1px); }
        .btn-primary {
          color: #fff;
          background: ${PALETTE.teal};
          box-shadow: 0 12px 24px rgba(88,173,173,0.28);
        }
        .btn-secondary {
          color: ${PALETTE.slate};
          background: #fff;
          border: 1px solid rgba(60,74,95,0.12);
          box-shadow: 0 8px 18px rgba(60,74,95,0.05);
        }
        .hero { padding: 20px 0 14px; }
        .filter-wrap {
          background: ${PALETTE.white};
          border: 1px solid rgba(60,74,95,0.08);
          border-radius: 26px;
          padding: 16px;
          box-shadow: 0 16px 34px rgba(60,74,95,0.06);
          margin-bottom: 18px;
        }
        .filter-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
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
          color: ${PALETTE.slate};
          padding-left: 2px;
        }
        .field input, .field select {
          height: 56px;
          width: 100%;
          border-radius: 16px;
          border: 1px solid rgba(60,74,95,0.14);
          background: #fff;
          padding: 0 16px;
          font-size: 15px;
          color: ${PALETTE.text};
          outline: none;
          transition: border-color 0.18s ease, box-shadow 0.18s ease;
        }
        .field input:focus, .field select:focus {
          border-color: ${PALETTE.aqua};
          box-shadow: 0 0 0 4px rgba(118,191,190,0.14);
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1.02fr 0.98fr;
          gap: 20px;
          align-items: stretch;
        }
        .hero-left {
          background: ${PALETTE.white};
          border: 1px solid rgba(60,74,95,0.08);
          border-radius: 28px;
          padding: 28px;
          box-shadow: 0 18px 40px rgba(60,74,95,0.06);
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: ${PALETTE.sage};
          color: ${PALETTE.slate};
          font-size: 12px;
          font-weight: 900;
          padding: 8px 12px;
          border-radius: 999px;
        }
        .hero-title {
          margin: 14px 0 12px;
          font-size: clamp(34px, 4.6vw, 56px);
          line-height: 0.98;
          letter-spacing: -0.04em;
          font-weight: 900;
          color: ${PALETTE.slate};
          max-width: 680px;
        }
        .hero-desc {
          margin: 0;
          max-width: 720px;
          color: ${PALETTE.softText};
          font-size: 18px;
          line-height: 1.7;
        }
        .hero-points {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 20px;
        }
        .hero-point {
          padding: 12px 14px;
          border-radius: 14px;
          background: #fff;
          border: 1px solid rgba(60,74,95,0.08);
          color: ${PALETTE.slate};
          font-size: 14px;
          font-weight: 800;
        }
        .hero-right {
          border-radius: 28px;
          overflow: hidden;
          position: relative;
          min-height: 300px;
          border: 1px solid rgba(60,74,95,0.08);
          box-shadow: 0 18px 40px rgba(60,74,95,0.08);
          background:
            linear-gradient(180deg, rgba(60,74,95,0.10), rgba(60,74,95,0.28)),
            url("https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80") center/cover no-repeat;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          padding: 26px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .hero-glass {
          width: 100%;
          max-width: 430px;
          background: rgba(60,74,95,0.52);
          border: 1px solid rgba(255,255,255,0.18);
          backdrop-filter: blur(12px);
          border-radius: 22px;
          padding: 18px;
          color: #fff;
        }
        .hero-glass-title {
          font-size: 15px;
          font-weight: 900;
          margin-bottom: 8px;
        }
        .hero-glass-text {
          margin: 0;
          color: rgba(255,255,255,0.92);
          line-height: 1.6;
          font-size: 14px;
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
          width: min(560px, 100%);
          background: #fff;
          border-radius: 28px;
          border: 1px solid rgba(60,74,95,0.08);
          box-shadow: 0 30px 70px rgba(35,48,68,0.24);
          overflow: hidden;
        }
        .post-panel-inner { padding: 24px; }
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
          font-size: 15px;
          line-height: 1.6;
        }
        .check-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 800;
          color: ${PALETTE.text};
          margin-bottom: 16px;
        }
        .check-row input { width: 18px; height: 18px; }
        .feature-box {
          background: ${PALETTE.sage};
          border: 1px solid rgba(60,74,95,0.10);
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
        .section { padding: 26px 0 0; }
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
        .featured-card {
          position: relative;
          background: #fff;
          border: 2px solid ${PALETTE.coral};
          border-radius: 24px;
          padding: 22px;
          box-shadow: 0 18px 32px rgba(228,93,80,0.14);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          overflow: hidden;
        }
        .featured-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 40px rgba(228,93,80,0.22);
        }
        .featured-card::after {
          content: "";
          position: absolute;
          right: -26px;
          bottom: -26px;
          width: 110px;
          height: 110px;
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
          border-radius: 22px;
          padding: 20px;
          box-shadow: 0 12px 24px rgba(60,74,95,0.04);
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
          cursor: pointer;
        }
        .job-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 34px rgba(60,74,95,0.08);
          border-color: ${PALETTE.aqua};
        }
        .type-tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 7px 10px;
          border-radius: 999px;
          background: ${PALETTE.aqua};
          color: ${PALETTE.slate};
          font-size: 12px;
          font-weight: 900;
          margin-bottom: 14px;
        }
        .mini-salary {
          margin-top: 14px;
          color: ${PALETTE.teal};
          font-size: 16px;
          font-weight: 900;
        }
        .empty-box {
          background: #fff;
          border: 1px dashed rgba(60,74,95,0.14);
          border-radius: 22px;
          padding: 28px;
          color: ${PALETTE.softText};
          text-align: center;
          box-shadow: 0 10px 20px rgba(60,74,95,0.03);
        }
        .footer-space { height: 40px; }
        @media (max-width: 1100px) {
          .hero-grid { grid-template-columns: 1fr; }
          .featured-grid { grid-template-columns: 1fr; }
          .jobs-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .filter-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 760px) {
          .container { width: min(100% - 20px, 1240px); }
          .topbar-inner {
            min-height: auto;
            padding: 12px 0;
            align-items: flex-start;
            flex-direction: column;
          }
          .topbar.small .topbar-inner { min-height: auto; }
          .brand-wrap { width: 100%; }
          .brand-card {
            padding: 10px 12px;
            border-radius: 18px;
            min-height: 58px;
          }
          .brand-logo { height: 42px; }
          .topbar.small .brand-logo { height: 36px; }
          .top-actions {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
          .btn { width: 100%; padding: 12px 14px; }
          .hero { padding-top: 14px; }
          .hero-left { padding: 22px; border-radius: 24px; }
          .hero-title { font-size: 34px; }
          .hero-desc { font-size: 16px; }
          .hero-right { min-height: 240px; }
          .jobs-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <header className={`topbar ${headerSmall ? "small" : ""}`}>
        <div className="container topbar-inner">
          <div className="brand-wrap">
            <div className="brand-card">
              <img
                className="brand-logo"
                src={logoSrc}
                alt="Ekiş logo"
                onError={() => {
                  if (logoSrc !== "/logo-ekis.png") setLogoSrc("/logo-ekis.png");
                }}
              />
            </div>

            <div className="brand-texts">
              <div className="brand-title">ekiş</div>
              <div className="brand-sub">Türkiye geneli ek iş ilan platformu</div>
            </div>
          </div>

          <div className="top-actions">
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              Ücretsiz İlan Ver
            </button>
            <button className="btn btn-secondary">Admin</button>
          </div>
        </div>
      </header>

      {showForm && (
        <div className="post-modal-backdrop" onClick={() => setShowForm(false)}>
          <div className="post-modal" onClick={(e) => e.stopPropagation()}>
            <div className="post-panel-inner">
              <h3 className="post-title">Ücretsiz ilan ver</h3>
              <p className="post-desc">
                İlanını ücretsiz yayınlayabilirsin. Daha fazla görünürlük istiyorsan ilanını öne çıkarabilirsin.
              </p>

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
            </div>
          </div>
        </div>
      )}

      <main className="container">
        <section className="hero">
          <div className="filter-wrap">
            <div className="filter-grid">
              <div className="field">
                <label>İlanlarda ara</label>
                <input
                  type="text"
                  placeholder="İş ara, firma ara, konum ara..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
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
            </div>
          </div>

          <div className="hero-grid">
            <div className="hero-left">
              <div className="badge">Türkiye geneli</div>
              <h1 className="hero-title">Ek iş ilanlarını kolayca keşfet.</h1>
              <p className="hero-desc">
                Günlük, saatlik ve part time işler için sade, hızlı ve güven veren bir alan.
                İlanları incele, işverenle direkt iletişime geç.
              </p>

              <div className="hero-points">
                <div className="hero-point">Günlük işler</div>
                <div className="hero-point">Saatlik çalışmalar</div>
                <div className="hero-point">Part time fırsatlar</div>
                <div className="hero-point">Türkiye geneli</div>
              </div>
            </div>

            <div className="hero-right">
              <div className="hero-overlay">
                <div className="hero-glass">
                  <div className="hero-glass-title">Hızlı, temiz ve net akış</div>
                  <p className="hero-glass-text">
                    Karmaşık değil. İş ilanlarını gör, filtrele ve hızlıca iletişime geç.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <h2 className="section-title">Öne çıkan ilanlar</h2>
            <div className="section-sub">3 ilan vitrinde gösteriliyor</div>
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
                  <div className="job-company">{job.company}</div>
                  <div className="job-location">{job.location}</div>
                  <div className="job-location">{job.category}</div>
                  <div className="mini-salary">{job.salary}</div>
                </article>
              ))}
            </div>
          )}
        </section>

        <div className="footer-space" />
      </main>
    </div>
  );
}

