
import React, { useEffect, useMemo, useState } from "react";

const SHOPIFY_FEATURED_LINK = "https://your-shopify-link.com/one-cikan-ilan";

const COLORS = {
  coral: "#E35D52",
  sage: "#98C58F",
  aqua: "#73BCBA",
  teal: "#54ABA8",
  navy: "#39475C",
  bg: "#f5f7fb",
  text: "#0f172a",
  muted: "#5b6677",
};

const featuredSeed = [
  {
    id: 1,
    title: "Garson AranÄ±yor",
    company: "OdunpazarÄ± Kafe",
    location: "EskiÅŸehir / OdunpazarÄ±",
    salary: "GÃ¼nlÃ¼k 1.200 TL + yemek",
    type: "GÃ¼nlÃ¼k",
  },
  {
    id: 2,
    title: "Etkinlik KarÅŸÄ±lama ElemanÄ±",
    company: "Fuar Organizasyon",
    location: "EskiÅŸehir / Merkez",
    salary: "GÃ¼nlÃ¼k 1.500 TL",
    type: "Part Time",
  },
  {
    id: 3,
    title: "Kurye AranÄ±yor",
    company: "HÄ±zlÄ± Paket",
    location: "EskiÅŸehir / TepebaÅŸÄ±",
    salary: "Saatlik 200 TL + prim",
    type: "Saatlik",
  },
];

const jobsSeed = [
  {
    id: 11,
    title: "Depo DÃ¼zenleme Personeli",
    company: "TepebaÅŸÄ± Lojistik",
    location: "EskiÅŸehir / TepebaÅŸÄ±",
    salary: "Saatlik 180 TL",
    type: "Saatlik",
    category: "Depo & Lojistik",
  },
  {
    id: 12,
    title: "Kasiyer AranÄ±yor",
    company: "Ã‡arÅŸÄ± Market",
    location: "EskiÅŸehir / Merkez",
    salary: "GÃ¼nlÃ¼k 1.000 TL",
    type: "GÃ¼nlÃ¼k",
    category: "SatÄ±ÅŸ & MaÄŸaza",
  },
  {
    id: 13,
    title: "Ofis Destek ElemanÄ±",
    company: "Anadolu DanÄ±ÅŸmanlÄ±k",
    location: "TÃ¼rkiye / Uzaktan",
    salary: "Part Time 12.000 TL / ay",
    type: "Part Time",
    category: "Ofis & YardÄ±mcÄ± Ä°ÅŸler",
  },
  {
    id: 14,
    title: "Temizlik Personeli",
    company: "Temiz Nokta",
    location: "EskiÅŸehir / OdunpazarÄ±",
    salary: "GÃ¼nlÃ¼k 1.100 TL",
    type: "GÃ¼nlÃ¼k",
    category: "Temizlik",
  },
  {
    id: 15,
    title: "Barista YardÄ±mcÄ±sÄ±",
    company: "KÃ¶pÃ¼k Kahve",
    location: "EskiÅŸehir / TepebaÅŸÄ±",
    salary: "Part Time 11.500 TL / ay",
    type: "Part Time",
    category: "Kafe & Restoran",
  },
  {
    id: 16,
    title: "Paketleme Personeli",
    company: "HÄ±zlÄ± Koli",
    location: "EskiÅŸehir / Organize",
    salary: "Saatlik 175 TL",
    type: "Saatlik",
    category: "Depo & Lojistik",
  },
  {
    id: 17,
    title: "MaÄŸaza Destek Personeli",
    company: "Neo AVM Stand",
    location: "EskiÅŸehir / TepebaÅŸÄ±",
    salary: "GÃ¼nlÃ¼k 1.250 TL",
    type: "GÃ¼nlÃ¼k",
    category: "SatÄ±ÅŸ & MaÄŸaza",
  },
  {
    id: 18,
    title: "Sosyal Medya Ä°Ã§erik YardÄ±mcÄ±sÄ±",
    company: "Studio Mini",
    location: "TÃ¼rkiye / Uzaktan",
    salary: "Part Time 13.000 TL / ay",
    type: "Part Time",
    category: "Freelance / Dijital",
  },
];

const categories = [
  "TÃ¼mÃ¼",
  "Kafe & Restoran",
  "Kurye & DaÄŸÄ±tÄ±m",
  "Depo & Lojistik",
  "Temizlik",
  "Etkinlik & Organizasyon",
  "SatÄ±ÅŸ & MaÄŸaza",
  "Ofis & YardÄ±mcÄ± Ä°ÅŸler",
  "Ä°nÅŸaat & Fiziksel Ä°ÅŸ",
  "Freelance / Dijital",
];

const types = ["TÃ¼mÃ¼", "GÃ¼nlÃ¼k", "Saatlik", "Part Time"];

export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("TÃ¼mÃ¼");
  const [jobType, setJobType] = useState("TÃ¼mÃ¼");
  const [showPostModal, setShowPostModal] = useState(false);
  const [featuredChecked, setFeaturedChecked] = useState(false);
  const [logoSrc, setLogoSrc] = useState("/publiclogo-ekis.png");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setFeaturedChecked(false);
  }, [showPostModal]);

  const filteredJobs = useMemo(() => {
    return jobsSeed.filter((job) => {
      const text = `${job.title} ${job.company} ${job.location} ${job.category}`.toLowerCase();
      const matchesSearch = text.includes(search.toLowerCase());
      const matchesCategory = category === "TÃ¼mÃ¼" ? true : job.category === category;
      const matchesType = jobType === "TÃ¼mÃ¼" ? true : job.type === jobType;
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
          background: ${COLORS.bg};
          color: ${COLORS.text};
        }
        .app-shell {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(115,188,186,0.12), transparent 28%),
            linear-gradient(180deg, #f8fafc 0%, #f3f6fb 100%);
        }
        .container {
          width: min(1240px, calc(100% - 32px));
          margin: 0 auto;
        }
        .topbar {
          position: sticky;
          top: 0;
          z-index: 30;
          backdrop-filter: blur(12px);
          background: rgba(248,250,252,0.86);
          border-bottom: 1px solid rgba(57,71,92,0.08);
          transition: background .22s ease, border-color .22s ease, box-shadow .22s ease;
        }
        .topbar.scrolled {
          background: rgba(248,250,252,0.94);
          box-shadow: 0 10px 24px rgba(57,71,92,0.08);
        }
        .topbar-inner {
          min-height: 88px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          transition: min-height .22s ease;
        }
        .topbar.scrolled .topbar-inner {
          min-height: 66px;
        }
        .brand-wrap {
          display: flex;
          align-items: center;
          gap: 16px;
          min-width: 0;
        }
        .brand-card {
          background: #ffffff;
          border: 1px solid rgba(57,71,92,0.06);
          box-shadow: 0 10px 30px rgba(57,71,92,0.06);
          border-radius: 22px;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 70px;
          transition: min-height .22s ease, padding .22s ease, border-radius .22s ease, box-shadow .22s ease;
        }
        .topbar.scrolled .brand-card {
          min-height: 54px;
          padding: 9px 14px;
          border-radius: 16px;
          box-shadow: 0 8px 18px rgba(57,71,92,0.05);
        }
        .brand-logo {
          height: 54px;
          width: auto;
          display: block;
          object-fit: contain;
          transition: height .22s ease;
        }
        .topbar.scrolled .brand-logo {
          height: 38px;
        }
        .brand-texts {
          display: flex;
          flex-direction: column;
          gap: 4px;
          transition: transform .22s ease, opacity .22s ease;
        }
        .topbar.scrolled .brand-texts {
          transform: translateY(-1px);
        }
        .brand-title {
          font-size: 18px;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .brand-sub {
          font-size: 13px;
          color: ${COLORS.muted};
          transition: font-size .22s ease;
        }
        .topbar.scrolled .brand-sub {
          font-size: 12px;
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
          border-radius: 14px;
          padding: 13px 18px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, background 0.18s ease, padding .22s ease;
        }
        .topbar.scrolled .btn {
          padding: 11px 15px;
        }
        .btn:hover { transform: translateY(-1px); }
        .btn-primary {
          color: white;
          background: linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.teal} 100%);
          box-shadow: 0 12px 24px rgba(57,71,92,0.18);
        }
        .btn-secondary {
          color: ${COLORS.navy};
          background: #fff;
          border: 1px solid rgba(57,71,92,0.1);
          box-shadow: 0 8px 18px rgba(57,71,92,0.05);
        }

        .hero {
          padding: 24px 0 20px;
        }
        .filter-wrap {
          background: #fff;
          border: 1px solid rgba(57,71,92,0.06);
          border-radius: 24px;
          padding: 16px;
          box-shadow: 0 14px 30px rgba(57,71,92,0.05);
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
          color: ${COLORS.navy};
          padding-left: 2px;
        }
        .field input, .field select {
          height: 54px;
          width: 100%;
          border-radius: 16px;
          border: 1px solid rgba(57,71,92,0.1);
          background: #fff;
          padding: 0 16px;
          font-size: 15px;
          color: ${COLORS.text};
          outline: none;
          transition: border-color 0.18s ease, box-shadow 0.18s ease;
        }
        .field input:focus, .field select:focus {
          border-color: ${COLORS.aqua};
          box-shadow: 0 0 0 4px rgba(115,188,186,0.14);
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.02fr 0.98fr;
          gap: 18px;
          align-items: stretch;
        }
        .hero-left {
          background: linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.84) 100%);
          border: 1px solid rgba(57,71,92,0.06);
          border-radius: 26px;
          padding: 26px;
          box-shadow: 0 16px 34px rgba(57,71,92,0.06);
          min-height: 320px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(115,188,186,0.18);
          color: ${COLORS.navy};
          font-size: 12px;
          font-weight: 800;
          padding: 8px 12px;
          border-radius: 999px;
          width: fit-content;
        }
        .hero-title {
          margin: 14px 0 12px;
          font-size: clamp(34px, 4.2vw, 56px);
          line-height: 1.01;
          letter-spacing: -0.04em;
          font-weight: 900;
          color: ${COLORS.navy};
          max-width: 620px;
        }
        .hero-desc {
          margin: 0;
          max-width: 680px;
          color: ${COLORS.muted};
          font-size: 17px;
          line-height: 1.65;
        }
        .hero-points {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 20px;
        }
        .hero-point {
          padding: 11px 13px;
          border-radius: 14px;
          background: #fff;
          border: 1px solid rgba(57,71,92,0.06);
          color: ${COLORS.navy};
          font-size: 14px;
          font-weight: 700;
        }

        .hero-right {
          border-radius: 26px;
          overflow: hidden;
          position: relative;
          min-height: 320px;
          border: 1px solid rgba(57,71,92,0.06);
          box-shadow: 0 16px 34px rgba(57,71,92,0.08);
          background:
            linear-gradient(180deg, rgba(57,71,92,0.10), rgba(57,71,92,0.34)),
            url("https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80") center/cover no-repeat;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .hero-glass {
          width: 100%;
          max-width: 400px;
          background: rgba(255,255,255,0.16);
          border: 1px solid rgba(255,255,255,0.18);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          padding: 16px;
          color: #fff;
        }
        .hero-glass-title {
          font-size: 15px;
          font-weight: 800;
          margin-bottom: 8px;
        }
        .hero-glass-text {
          margin: 0;
          color: rgba(255,255,255,0.92);
          line-height: 1.6;
          font-size: 14px;
        }

        .section {
          padding: 28px 0 0;
        }
        .section-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .section-title {
          margin: 0;
          font-size: 22px;
          font-weight: 900;
          letter-spacing: -0.03em;
          color: ${COLORS.navy};
        }
        .section-sub {
          color: ${COLORS.muted};
          font-size: 14px;
          font-weight: 700;
        }

        .featured-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }
        .featured-card {
          position: relative;
          background: linear-gradient(180deg, rgba(227,93,82,0.09) 0%, #ffffff 100%);
          border: 1px solid rgba(227,93,82,0.28);
          border-radius: 24px;
          padding: 22px;
          box-shadow: 0 16px 30px rgba(227,93,82,0.11);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          overflow: hidden;
        }
        .featured-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 22px 36px rgba(227,93,82,0.18);
        }
        .featured-card::after {
          content: "";
          position: absolute;
          inset: auto -30px -30px auto;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(227,93,82,0.14), transparent 65%);
        }
        .pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(227,93,82,0.12);
          color: ${COLORS.coral};
          border-radius: 999px;
          padding: 7px 10px;
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
          color: ${COLORS.navy};
        }
        .job-company {
          color: ${COLORS.navy};
          font-weight: 800;
          margin-bottom: 10px;
        }
        .job-location {
          color: ${COLORS.muted};
          margin-bottom: 12px;
          font-size: 15px;
        }
        .job-salary {
          color: ${COLORS.text};
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
          border: 1px solid rgba(57,71,92,0.06);
          border-radius: 22px;
          padding: 20px;
          box-shadow: 0 12px 24px rgba(57,71,92,0.04);
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
          cursor: pointer;
        }
        .job-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 34px rgba(57,71,92,0.08);
          border-color: rgba(84,171,168,0.28);
        }
        .type-tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 7px 10px;
          border-radius: 999px;
          background: rgba(152,197,143,0.18);
          color: ${COLORS.navy};
          font-size: 12px;
          font-weight: 900;
          margin-bottom: 14px;
        }
        .mini-salary {
          margin-top: 14px;
          color: ${COLORS.text};
          font-size: 16px;
          font-weight: 900;
        }
        .empty-box {
          background: #fff;
          border: 1px dashed rgba(57,71,92,0.14);
          border-radius: 22px;
          padding: 28px;
          color: ${COLORS.muted};
          text-align: center;
          box-shadow: 0 10px 20px rgba(57,71,92,0.03);
        }
        .footer-space { height: 40px; }

        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15,23,42,0.46);
          backdrop-filter: blur(6px);
          display: grid;
          place-items: center;
          padding: 16px;
          z-index: 60;
        }
        .modal-card {
          width: min(100%, 620px);
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
          border: 1px solid rgba(57,71,92,0.08);
          border-radius: 26px;
          box-shadow: 0 30px 70px rgba(15,23,42,0.22);
          overflow: hidden;
        }
        .modal-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          padding: 24px 24px 12px;
        }
        .modal-title {
          margin: 0 0 8px;
          font-size: 26px;
          line-height: 1.05;
          font-weight: 900;
          letter-spacing: -0.03em;
          color: ${COLORS.navy};
        }
        .modal-desc {
          margin: 0;
          color: ${COLORS.muted};
          line-height: 1.65;
          font-size: 15px;
        }
        .modal-close {
          width: 42px;
          height: 42px;
          border-radius: 14px;
          border: 1px solid rgba(57,71,92,0.1);
          background: #fff;
          color: ${COLORS.navy};
          font-size: 18px;
          font-weight: 800;
          cursor: pointer;
          flex-shrink: 0;
        }
        .modal-body {
          padding: 0 24px 24px;
        }
        .check-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          color: ${COLORS.text};
          margin: 8px 0 18px;
        }
        .check-row input {
          width: 18px;
          height: 18px;
          accent-color: ${COLORS.teal};
        }
        .feature-box {
          background: linear-gradient(180deg, rgba(84,171,168,0.10) 0%, #ffffff 100%);
          border: 1px solid rgba(84,171,168,0.24);
          border-radius: 18px;
          padding: 16px;
        }
        .feature-box-title {
          margin: 0 0 6px;
          font-size: 15px;
          font-weight: 800;
          color: ${COLORS.navy};
        }
        .feature-box-text {
          margin: 0 0 12px;
          color: ${COLORS.muted};
          font-size: 14px;
          line-height: 1.6;
        }
        .feature-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          background: linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.teal} 100%);
          color: #fff;
          border-radius: 12px;
          padding: 11px 14px;
          font-size: 14px;
          font-weight: 800;
        }

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
          .topbar.scrolled .topbar-inner { min-height: auto; }
          .brand-wrap { width: 100%; }
          .brand-card {
            padding: 10px 12px;
            border-radius: 18px;
            min-height: 58px;
          }
          .topbar.scrolled .brand-card {
            min-height: 52px;
            padding: 9px 11px;
          }
          .brand-logo {
            height: 44px;
          }
          .topbar.scrolled .brand-logo {
            height: 36px;
          }
          .top-actions {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
          .btn {
            width: 100%;
            padding: 12px 14px;
          }
          .hero { padding-top: 18px; }
          .hero-left {
            padding: 22px;
            border-radius: 24px;
            min-height: auto;
          }
          .hero-title { font-size: 34px; }
          .hero-desc { font-size: 16px; }
          .hero-right { min-height: 250px; }
          .jobs-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <header className={`topbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="container topbar-inner">
          <div className="brand-wrap">
            <div className="brand-card">
              <img
                className="brand-logo"
                src={logoSrc}
                alt="EkiÅŸ logo"
                onError={() => {
                  if (logoSrc !== "/logo-ekis.png") setLogoSrc("/logo-ekis.png");
                }}
              />
            </div>

            <div className="brand-texts">
              <div className="brand-title">ekiÅŸ</div>
              <div className="brand-sub">TÃ¼rkiye geneli ek iÅŸ ilan platformu</div>
            </div>
          </div>

          <div className="top-actions">
            <button className="btn btn-primary" onClick={() => setShowPostModal(true)}>
              Ãœcretsiz Ä°lan Ver
            </button>
            <button className="btn btn-secondary">Admin</button>
          </div>
        </div>
      </header>

      {showPostModal && (
        <div className="modal-backdrop" onClick={() => setShowPostModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <h3 className="modal-title">Ãœcretsiz ilan ver</h3>
                <p className="modal-desc">
                  Ä°lanÄ±nÄ± Ã¼cretsiz yayÄ±nlayabilirsin. Daha fazla gÃ¶rÃ¼nÃ¼rlÃ¼k istersen ilanÄ±nÄ± Ã¶ne Ã§Ä±karabilirsin.
                </p>
              </div>
              <button className="modal-close" onClick={() => setShowPostModal(false)}>
                âœ•
              </button>
            </div>

            <div className="modal-body">
              <label className="check-row">
                <input
                  type="checkbox"
                  checked={featuredChecked}
                  onChange={(e) => setFeaturedChecked(e.target.checked)}
                />
                Ä°lanÄ± Ã¶ne Ã§Ä±kar
              </label>

              {featuredChecked && (
                <div className="feature-box">
                  <div className="feature-box-title">Ã–ne Ã§Ä±karma baÄŸlantÄ±sÄ±</div>
                  <p className="feature-box-text">
                    Ä°lanÄ±nÄ± ana vitrinde gÃ¶stermek iÃ§in aÅŸaÄŸÄ±daki baÄŸlantÄ±dan Ã¶deme adÄ±mÄ±na geÃ§ebilirsin.
                  </p>
                  <a
                    className="feature-link"
                    href={SHOPIFY_FEATURED_LINK}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Shopify Ã¶deme baÄŸlantÄ±sÄ±na git
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
                <label>Ä°lanlarda ara</label>
                <input
                  type="text"
                  placeholder="Ä°ÅŸ ara, firma ara, konum ara..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="field">
                <label>Meslek seÃ§</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label>Ã‡alÄ±ÅŸma tipi seÃ§</label>
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
              <div className="badge">TÃ¼rkiye geneli</div>
              <h1 className="hero-title">Ek iÅŸ ilanlarÄ±nÄ± kolayca keÅŸfet.</h1>
              <p className="hero-desc">
                GÃ¼nlÃ¼k, saatlik ve part time iÅŸler iÃ§in sade, hÄ±zlÄ± ve gÃ¼ven veren bir alan.
                Ä°lanlarÄ± incele, iÅŸverenle direkt iletiÅŸime geÃ§.
              </p>

              <div className="hero-points">
                <div className="hero-point">GÃ¼nlÃ¼k iÅŸler</div>
                <div className="hero-point">Saatlik Ã§alÄ±ÅŸmalar</div>
                <div className="hero-point">Part time fÄ±rsatlar</div>
                <div className="hero-point">TÃ¼rkiye geneli</div>
              </div>
            </div>

            <div className="hero-right">
              <div className="hero-overlay">
                <div className="hero-glass">
                  <div className="hero-glass-title">HÄ±zlÄ±, temiz ve net akÄ±ÅŸ</div>
                  <p className="hero-glass-text">
                    KarmaÅŸÄ±k deÄŸil. Ä°ÅŸ ilanlarÄ±nÄ± gÃ¶r, filtrele ve hÄ±zlÄ±ca iletiÅŸime geÃ§.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <h2 className="section-title">Ã–ne Ã§Ä±kan ilanlar</h2>
            <div className="section-sub">3 ilan vitrinde gÃ¶steriliyor</div>
          </div>

          <div className="featured-grid">
            {featuredSeed.map((job) => (
              <article key={job.id} className="featured-card">
                <div className="pill">Ã–ne Ã‡Ä±kan</div>
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
            <h2 className="section-title">TÃ¼m ilanlar</h2>
            <div className="section-sub">{filteredJobs.length} ilan bulundu</div>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="empty-box">Aramana uygun ilan bulunamadÄ±.</div>
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

