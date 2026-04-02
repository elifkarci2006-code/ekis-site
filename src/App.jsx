import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Clock3,
  Wallet,
  Briefcase,
  User,
  Building2,
  Filter,
  PlusCircle,
  Send,
  CheckCircle2,
  Database,
  Loader2,
  Check,
  Trash2,
  FileText,
  Phone,
  CalendarDays,
  Sparkles,
  BadgeCent,
  MessageCircle,
  LogIn,
  LogOut,
  UserPlus,
  Lock,
  CreditCard,
  Share2,
  Copy,
  Crown,
  Pencil,
  Mail,
  Users,
  ShieldCheck,
  Eye,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";

/* =========================
   THEME
========================= */
const BRAND = {
  primary: "#58d3c7",
  primaryDeep: "#2fbbae",
  primarySoft: "#e9fbf8",
  ink: "#0f172a",
  muted: "#64748b",
  line: "#dbe7e5",
  card: "#ffffff",
  premium: "#f59e0b",
  success: "#16a34a",
  danger: "#ef4444",
  bg: "#f7fbfa",
};

const SHOPIER_PAYMENT_URL = "https://www.shopier.com";
const SUPER_ADMIN_EMAILS = [
  "demo@ekis.com",
  "admin@ekis.com",
  "elifkarci2006@gmail.com",
];

const FREE_JOB_DURATION_DAYS = 15;
const PREMIUM_JOB_DURATION_DAYS = 30;

const TURKEY_CITIES = [
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
  "Kırıkkale",
  "Kırklareli",
  "Kırşehir",
  "Kilis",
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

const PACKAGE_OPTIONS = {
  standard: {
    label: "Standart",
    price: "Ücretsiz",
    featured: false,
    note: "Normal listede yayınlanır.",
    payment_status: "none",
    durationDays: FREE_JOB_DURATION_DAYS,
  },
  premium: {
    label: "Premium",
    price: "399 TL",
    featured: true,
    note: "Ana listede üstte görünür ve daha dikkat çeker.",
    payment_status: "waiting_payment",
    durationDays: PREMIUM_JOB_DURATION_DAYS,
  },
};

const initialJobs = [
  {
    id: 1,
    title: "Kafe Servis Elemanı",
    company: "Mavi Fincan Cafe",
    city: "Eskişehir",
    district: "Tepebaşı",
    type: "Part-time",
    pay: "Saatlik 170 TL",
    hours: "18:00 - 23:00",
    tags: ["Öğrenciye uygun", "Akşam", "Hızlı başlangıç", "ACİL"],
    description:
      "Yoğun saatlerde servis desteği verecek, güler yüzlü ekip arkadaşı aranıyor.",
    status: "active",
    package_type: "premium",
    featured: true,
    price: "399 TL",
    employer_email: "demo@ekis.com",
    payment_status: "paid",
    payment_note: "Demo ödeme tamamlandı",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Hafta Sonu Mağaza Destek Personeli",
    company: "Nova Outlet",
    city: "Ankara",
    district: "Çankaya",
    type: "Ek iş",
    pay: "Günlük 1200 TL",
    hours: "10:00 - 19:00",
    tags: ["Hafta sonu", "Deneyim şart değil"],
    description:
      "Kasa ve reyon düzenine destek olacak ekip arkadaşı aranıyor.",
    status: "active",
    package_type: "standard",
    featured: false,
    price: "Ücretsiz",
    employer_email: "demo@ekis.com",
    payment_status: "none",
    payment_note: "",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

/* =========================
   HELPERS
========================= */
function normalizeTags(tags) {
  if (Array.isArray(tags)) return tags;
  if (!tags) return [];
  return [tags];
}

function getDurationDays(job) {
  return job.package_type === "premium"
    ? PREMIUM_JOB_DURATION_DAYS
    : FREE_JOB_DURATION_DAYS;
}

function getRemainingDays(job) {
  if (!job.created_at) return getDurationDays(job);
  const created = new Date(job.created_at).getTime();
  const now = Date.now();
  const durationMs = getDurationDays(job) * 24 * 60 * 60 * 1000;
  const diff = created + durationMs - now;
  return Math.ceil(diff / (24 * 60 * 60 * 1000));
}

function isExpired(job) {
  return getRemainingDays(job) <= 0;
}

function isNewJob(job) {
  if (!job.created_at) return false;
  const created = new Date(job.created_at).getTime();
  return Date.now() - created <= 24 * 60 * 60 * 1000;
}

function formatDate(dateString) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function buildTags(existingTags, urgent, packageType, status) {
  const base = normalizeTags(existingTags).filter(
    (tag) =>
      ![
        "ACİL",
        "Premium",
        "Yayınlandı",
        "Öne Çıkan",
        "Yeni ilan",
        "İnceleme bekliyor",
      ].includes(tag)
  );

  if (urgent) base.unshift("ACİL");
  if (status === "pending") base.unshift("İnceleme bekliyor");
  if (status === "active") base.unshift("Yayınlandı");
  if (packageType === "premium") {
    base.unshift("Premium");
    if (status === "active") base.unshift("Öne Çıkan");
  }

  return [...new Set(base)];
}

function getStoredCandidateApplications(email) {
  if (!email) return [];
  try {
    const all = JSON.parse(localStorage.getItem("ekis_candidate_applications") || "{}");
    return all[email] || [];
  } catch {
    return [];
  }
}

function saveStoredCandidateApplications(email, applications) {
  if (!email) return;
  try {
    const all = JSON.parse(localStorage.getItem("ekis_candidate_applications") || "{}");
    all[email] = applications;
    localStorage.setItem("ekis_candidate_applications", JSON.stringify(all));
  } catch {}
}

/* =========================
   STYLES
========================= */
function GlobalStyles() {
  return (
    <style>{`
      :root{
        --bg:${BRAND.bg};
        --card:${BRAND.card};
        --ink:${BRAND.ink};
        --muted:${BRAND.muted};
        --line:${BRAND.line};
        --primary:${BRAND.primary};
        --primary-deep:${BRAND.primaryDeep};
        --primary-soft:${BRAND.primarySoft};
        --premium:${BRAND.premium};
        --success:${BRAND.success};
        --danger:${BRAND.danger};
      }

      *{box-sizing:border-box}
      body{
        margin:0;
        background:linear-gradient(180deg,#f8fcfb 0%, #f4fbfa 100%);
        color:var(--ink);
        font-family:Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
      }

      .page{
        min-height:100vh;
        background:
          radial-gradient(circle at top left, rgba(88,211,199,.16), transparent 30%),
          radial-gradient(circle at top right, rgba(47,187,174,.10), transparent 25%);
      }

      .container{
        width:min(1200px, calc(100% - 24px));
        margin:0 auto;
        padding:16px 0 96px;
      }

      .header{
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:16px;
        flex-wrap:wrap;
        margin-bottom:18px;
      }

      .logo{
        font-size:32px;
        font-weight:900;
        letter-spacing:-0.04em;
      }

      .muted{ color:var(--muted); }

      .header-actions{
        display:flex;
        gap:10px;
        flex-wrap:wrap;
        align-items:center;
      }

      .card{
        background:rgba(255,255,255,.97);
        border:1px solid rgba(88,211,199,.18);
        border-radius:24px;
        padding:18px;
        box-shadow:0 12px 36px rgba(15,23,42,.06);
      }

      .hero-card{
        padding:28px;
        overflow:hidden;
        position:relative;
      }

      .hero-card h1{
        margin:10px 0 10px;
        font-size:clamp(30px, 4vw, 52px);
        line-height:1.02;
        letter-spacing:-0.04em;
      }

      .hero-card h1 span{ color:var(--primary-deep); }

      .hero-grid{
        display:grid;
        grid-template-columns:1.6fr .9fr;
        gap:16px;
        align-items:start;
        margin-bottom:16px;
      }

      .trust-strip{
        display:flex;
        flex-wrap:wrap;
        gap:10px;
        margin:12px 0 18px;
      }

      .trust-chip{
        display:inline-flex;
        align-items:center;
        gap:8px;
        padding:10px 12px;
        border-radius:999px;
        background:var(--primary-soft);
        border:1px solid rgba(88,211,199,.35);
        font-size:13px;
        font-weight:800;
      }

      .hero-cta{
        display:flex;
        gap:10px;
        flex-wrap:wrap;
        margin:16px 0 18px;
      }

      .hero-secondary-note{
        display:flex;
        flex-wrap:wrap;
        gap:12px;
        font-size:13px;
      }

      .stats{
        display:grid;
        gap:12px;
      }

      .stat-head{
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:10px;
      }

      .stat-value{
        font-size:28px;
        font-weight:900;
        letter-spacing:-0.03em;
      }

      .feature-grid{
        display:grid;
        grid-template-columns:repeat(3,1fr);
        gap:16px;
        margin-bottom:16px;
      }

      .feature-icon{
        color:var(--primary-deep);
        margin-bottom:10px;
      }

      .feature-title{
        font-weight:900;
        margin-bottom:8px;
      }

      .filters-grid{
        display:grid;
        grid-template-columns:310px 1fr;
        gap:16px;
        align-items:start;
      }

      .filter-panel{
        position:sticky;
        top:14px;
      }

      .filter-stack{
        display:grid;
        gap:12px;
      }

      .filters{
        display:grid;
        grid-template-columns:2fr 1fr 1fr auto;
        gap:10px;
        margin-top:12px;
      }

      .search-wrap{
        position:relative;
      }

      .search-icon{
        position:absolute;
        left:12px;
        top:50%;
        transform:translateY(-50%);
        color:var(--muted);
      }

      .input, .textarea, select{
        width:100%;
        border:1px solid var(--line);
        background:#fff;
        color:var(--ink);
        border-radius:16px;
        padding:13px 14px;
        font-size:14px;
        outline:none;
        transition:.18s ease;
      }

      .input{ min-height:48px; }
      .search-wrap .input{ padding-left:38px; }
      .textarea{ min-height:120px; resize:vertical; }

      .input:focus, .textarea:focus, select:focus{
        border-color:var(--primary);
        box-shadow:0 0 0 4px rgba(88,211,199,.14);
      }

      .btn{
        border:none;
        min-height:48px;
        border-radius:16px;
        padding:12px 16px;
        font-weight:900;
        font-size:14px;
        display:inline-flex;
        align-items:center;
        justify-content:center;
        gap:8px;
        cursor:pointer;
        transition:.18s ease;
      }

      .btn:disabled{ opacity:.6; cursor:not-allowed; }

      .btn-solid{
        background:linear-gradient(180deg,var(--primary) 0%, var(--primary-deep) 100%);
        color:#062321;
        box-shadow:0 10px 24px rgba(47,187,174,.25);
      }

      .btn-outline{
        background:#fff;
        color:var(--ink);
        border:1px solid rgba(15,23,42,.10);
      }

      .badge{
        display:inline-flex;
        align-items:center;
        gap:6px;
        padding:7px 10px;
        border-radius:999px;
        font-size:12px;
        font-weight:900;
        line-height:1;
      }

      .badge.default,
      .badge.soft{
        background:#f4fbfa;
        color:#114846;
        border:1px solid rgba(88,211,199,.25);
      }

      .badge.secondary{
        background:#eef2ff;
        color:#3730a3;
        border:1px solid #c7d2fe;
      }

      .premium-badge{
        background:rgba(245,158,11,.12);
        color:#b45309;
        border:1px solid rgba(245,158,11,.28);
      }

      .pending{
        background:rgba(239,68,68,.10);
        color:#b91c1c;
        border:1px solid rgba(239,68,68,.18);
      }

      .featured-tag{
        background:rgba(88,211,199,.16);
        color:#0f766e;
        border:1px solid rgba(88,211,199,.35);
      }

      .live-badge{
        background:#effcf8;
        color:#0f766e;
        border:1px solid rgba(34,197,94,.25);
      }

      .hero-badge{
        background:linear-gradient(180deg,#edfffb 0%, #dff8f5 100%);
        color:#0f766e;
        border:1px solid rgba(88,211,199,.32);
      }

      .tabs{
        display:flex;
        gap:10px;
        flex-wrap:wrap;
        margin:18px 0 16px;
      }

      .tab{
        border:none;
        background:#fff;
        border:1px solid rgba(15,23,42,.08);
        border-radius:14px;
        padding:11px 14px;
        font-weight:800;
        color:var(--ink);
        cursor:pointer;
      }

      .tab.active{
        background:var(--ink);
        color:#fff;
        border-color:var(--ink);
      }

      .section-stack{ display:grid; gap:14px; }

      .section-head{
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:12px;
        flex-wrap:wrap;
      }

      .section-head h2{
        margin:0 0 4px;
        font-size:24px;
        letter-spacing:-0.03em;
      }

      .result-wrap{
        display:flex;
        align-items:center;
        gap:8px;
        flex-wrap:wrap;
      }

      .job-list{ display:grid; gap:14px; }
      .job-card{ overflow:hidden; }

      .featured-card{
        border-color:rgba(245,158,11,.28);
        box-shadow:0 16px 36px rgba(245,158,11,.08);
      }

      .job-layout{
        display:grid;
        grid-template-columns:1fr auto;
        gap:14px;
        align-items:start;
      }

      .job-top{
        display:flex;
        align-items:center;
        gap:10px;
        flex-wrap:wrap;
        margin-bottom:8px;
      }

      .job-top h3{
        margin:0;
        font-size:22px;
        letter-spacing:-0.03em;
      }

      .company{
        color:var(--ink);
        font-weight:800;
        margin-bottom:8px;
      }

      .meta-row{
        display:flex;
        gap:12px;
        flex-wrap:wrap;
        color:var(--muted);
        font-size:13px;
        margin-bottom:10px;
      }

      .meta-row span{
        display:inline-flex;
        align-items:center;
        gap:6px;
      }

      .description{
        margin:0 0 10px;
        color:#334155;
        line-height:1.6;
      }

      .tags{
        display:flex;
        gap:8px;
        flex-wrap:wrap;
      }

      .job-actions{
        display:grid;
        gap:10px;
        min-width:190px;
      }

      .form-grid{
        display:grid;
        grid-template-columns:repeat(2,1fr);
        gap:14px;
      }

      .full{ grid-column:1 / -1; }

      .action-row{
        display:flex;
        gap:10px;
        flex-wrap:wrap;
        margin-top:6px;
      }

      .dashboard-grid{
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:16px;
      }

      .panel-list{ display:grid; gap:12px; }

      .panel-row{
        padding:14px;
        border-radius:18px;
        border:1px solid rgba(15,23,42,.08);
        background:#fbfdfd;
      }

      .premium-plan-box{
        padding:16px;
        border-radius:20px;
        background:linear-gradient(180deg,#fbfffe 0%, #f1fffd 100%);
        border:1px solid rgba(88,211,199,.28);
        margin-bottom:16px;
      }

      .premium-plan-head{
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:10px;
        flex-wrap:wrap;
        margin-bottom:10px;
      }

      .premium-plan-title{
        display:flex;
        align-items:center;
        gap:8px;
        font-weight:900;
      }

      .premium-plan-price{
        font-size:28px;
        font-weight:900;
        letter-spacing:-0.03em;
        color:var(--primary-deep);
        margin-bottom:6px;
      }

      .salary-highlight{
        font-size:18px;
        font-weight:900;
        color:var(--success);
      }

      .role-switch{
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:8px;
        margin-bottom:14px;
      }

      .role-pill{
        border:1px solid rgba(15,23,42,.08);
        background:#fff;
        border-radius:14px;
        padding:10px 12px;
        font-weight:900;
        cursor:pointer;
        text-align:center;
      }

      .role-pill.active{
        background:var(--primary-soft);
        border-color:rgba(88,211,199,.45);
        color:#0f766e;
      }

      .modal-backdrop{
        position:fixed;
        inset:0;
        background:rgba(2,8,23,.48);
        backdrop-filter: blur(6px);
        display:grid;
        place-items:center;
        z-index:50;
        padding:18px;
      }

      .modal{
        width:min(720px, 100%);
        max-height:88vh;
        overflow:auto;
        background:#fff;
        border-radius:26px;
        padding:22px;
        box-shadow:0 30px 60px rgba(15,23,42,.25);
      }

      .modal.compact{
        width:min(480px, 100%);
        padding:18px;
      }

      .modal h2{
        margin:0 0 14px;
        font-size:28px;
        letter-spacing:-0.03em;
      }

      .job-preview{
        padding:14px;
        border-radius:18px;
        background:#f8fffe;
        border:1px solid rgba(88,211,199,.18);
        margin-bottom:14px;
      }

      .preview-title{
        font-weight:900;
        margin-bottom:4px;
      }

      .success-box{
        padding:16px;
        border-radius:18px;
        background:#effcf6;
        border:1px solid rgba(34,197,94,.20);
      }

      .success-title{
        display:flex;
        align-items:center;
        gap:8px;
        font-weight:900;
        color:#166534;
        margin-bottom:8px;
      }

      .footer{
        margin-top:18px;
        padding:18px;
        border-radius:22px;
        background:#f9fdfd;
        border:1px solid rgba(15,23,42,.06);
        color:#475569;
      }

      .footer-grid{
        display:grid;
        grid-template-columns:1.2fr .9fr .9fr .9fr;
        gap:16px;
        margin-top:8px;
      }

      .footer-title{
        font-weight:900;
        margin-bottom:8px;
      }

      .footer-link{
        display:block;
        color:#334155;
        text-decoration:none;
        margin:6px 0;
      }

      .footer-link:hover{
        color:var(--primary-deep);
      }

      .sticky-mobile-cta{ display:none; }

      .spin{ animation:spin 1s linear infinite; }
      @keyframes spin { to{transform:rotate(360deg)} }

      @media (max-width: 1100px){
        .hero-grid,
        .filters-grid,
        .dashboard-grid,
        .footer-grid{
          grid-template-columns:1fr;
        }
        .filter-panel{ position:static; }
      }

      @media (max-width: 760px){
        .container{ width:min(100% - 16px, 100%); }
        .hero-card{ padding:20px; }
        .feature-grid,
        .form-grid{ grid-template-columns:1fr; }
        .filters{ grid-template-columns:1fr; }
        .job-layout{ grid-template-columns:1fr; }
        .job-actions{
          min-width:0;
          grid-template-columns:1fr 1fr;
        }
        .action-row .btn,
        .job-actions .btn{
          width:100%;
        }
        .sticky-mobile-cta{
          display:flex;
          gap:10px;
          position:fixed;
          left:12px;
          right:12px;
          bottom:12px;
          z-index:30;
        }
        .sticky-mobile-cta .btn{
          flex:1;
          min-height:54px;
          border-radius:18px;
        }
      }
    `}</style>
  );
}

/* =========================
   COMPONENTS
========================= */
function Card({ children, className = "" }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function Badge({ children, variant = "default", className = "" }) {
  return <span className={`badge ${variant} ${className}`}>{children}</span>;
}

function Button({ children, variant = "solid", className = "", ...props }) {
  return (
    <button
      className={`btn ${
        variant === "outline" ? "btn-outline" : "btn-solid"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Input(props) {
  return <input className="input" {...props} />;
}

function Textarea(props) {
  return <textarea className="textarea" {...props} />;
}

function SelectField({ value, onChange, options }) {
  return (
    <select
      className="input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

function Label({ children, required = false }) {
  return (
    <div style={{ fontWeight: 800, marginBottom: "6px" }}>
      {children} {required ? <span style={{ color: BRAND.danger }}>*</span> : null}
    </div>
  );
}

function Stat({ label, value, icon: Icon }) {
  return (
    <Card>
      <div className="stat-head">
        <div className="muted">{label}</div>
        {Icon ? <Icon size={16} /> : null}
      </div>
      <div className="stat-value">{value}</div>
    </Card>
  );
}

function JobCard({ job, onApply, onView, applicationsCount = 0 }) {
  const remainingDays = getRemainingDays(job);
  const urgent = normalizeTags(job.tags).includes("ACİL");

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <Card className={`job-card ${job.featured ? "featured-card" : ""}`}>
        <div className="job-layout">
          <div className="job-main">
            <div className="job-top">
              <h3>{job.title}</h3>
              <Badge variant="secondary">{job.type}</Badge>
              {job.package_type === "premium" ? (
                <Badge className="premium-badge">
                  <Sparkles size={13} /> Premium
                </Badge>
              ) : null}
              {urgent ? <Badge className="pending">ACİL</Badge> : null}
              {isNewJob(job) ? <Badge className="soft">Bugün eklendi</Badge> : null}
            </div>

            <div className="company">{job.company}</div>

            <div className="meta-row">
              <span>
                <MapPin size={15} /> {job.city} / {job.district || "-"}
              </span>
              <span>
                <Clock3 size={15} /> {job.hours || "-"}
              </span>
              <span className="salary-highlight">
                <Wallet size={15} /> {job.pay || "-"}
              </span>
              <span>
                <CalendarDays size={15} /> {formatDate(job.created_at)}
              </span>
              <span>
                <Users size={15} /> {applicationsCount} başvuru
              </span>
            </div>

            <p className="description">{job.description}</p>

            <div className="tags">
              {normalizeTags(job.tags).map((tag) => (
                <Badge key={tag} className="soft">
                  {tag}
                </Badge>
              ))}
              {job.featured ? <Badge className="featured-tag">Öne Çıkan</Badge> : null}
              <Badge className="soft">
                {job.package_type === "premium" ? "399 TL" : job.price || "Ücretsiz"}
              </Badge>
              <Badge className="soft">
                {remainingDays > 0 ? `${remainingDays} gün kaldı` : "Süresi doldu"}
              </Badge>
            </div>
          </div>

          <div className="job-actions">
            <Button onClick={() => onApply(job)}>Hemen Başvur</Button>
            <Button variant="outline" onClick={() => onView(job)}>
              Detayı Gör
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

/* =========================
   APP
========================= */
export default function App() {
  const [jobs, setJobs] = useState(initialJobs);
  const [applications, setApplications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [shareMessage, setShareMessage] = useState("");
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("all");
  const [type, setType] = useState("all");
  const [urgentOnly, setUrgentOnly] = useState(false);
  const [tab, setTab] = useState("jobs");
  const [appliedJob, setAppliedJob] = useState(null);
  const [applicationSent, setApplicationSent] = useState(false);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [loadingApplications, setLoadingApplications] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [savingJob, setSavingJob] = useState(false);
  const [sendingApplication, setSendingApplication] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [dbStatus, setDbStatus] = useState(
    supabase ? "Supabase bağlı" : "Demo modunda çalışıyor"
  );

  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem("ekis_user_session");
    return stored ? JSON.parse(stored) : null;
  });

  const [candidateApplications, setCandidateApplications] = useState([]);

  const [authMode, setAuthMode] = useState("login");
  const [authRole, setAuthRole] = useState("candidate"); // candidate | employer
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState("");
  const [authForm, setAuthForm] = useState({
    full_name: "",
    company_name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [applicationForm, setApplicationForm] = useState({
    full_name: "",
    phone: "",
    note: "",
  });

  const [jobForm, setJobForm] = useState({
    title: "",
    company: "",
    city: "",
    district: "",
    type: "Part-time",
    pay: "",
    hours: "",
    description: "",
    package_type: "standard",
    payment_note: "",
    urgent: false,
  });

  const [editingJob, setEditingJob] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    company: "",
    city: "",
    district: "",
    type: "Part-time",
    pay: "",
    hours: "",
    description: "",
    package_type: "standard",
    payment_note: "",
    payment_status: "none",
    status: "pending",
    urgent: false,
  });

  const [profileForm, setProfileForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    company_name: "",
  });

  const jobsSectionRef = useRef(null);
  const postSectionRef = useRef(null);

  const isSuperAdmin = useMemo(() => {
    return currentUser?.email
      ? SUPER_ADMIN_EMAILS.includes(currentUser.email)
      : false;
  }, [currentUser]);

  const isEmployer = currentUser?.role === "employer" || isSuperAdmin;
  const isCandidate = currentUser?.role === "candidate";

  useEffect(() => {
    loadJobs();
    loadApplications();
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("ekis_user_session", JSON.stringify(currentUser));
      setProfileForm({
        full_name: currentUser.full_name || "",
        phone: currentUser.phone || "",
        email: currentUser.email || "",
        company_name: currentUser.company_name || "",
      });

      if (currentUser.role === "candidate") {
        const stored = getStoredCandidateApplications(currentUser.email);
        setCandidateApplications(stored);
      } else {
        setCandidateApplications([]);
      }

      setJobForm((prev) => ({
        ...prev,
        company: prev.company || currentUser.company_name || "",
      }));
    } else {
      localStorage.removeItem("ekis_user_session");
      setCandidateApplications([]);
    }
  }, [currentUser]);

  useEffect(() => {
    if (typeof window === "undefined" || jobs.length === 0) return;
    const params = new URLSearchParams(window.location.search);
    const ilanId = params.get("ilan");
    if (!ilanId) return;
    const found = jobs.find((job) => String(job.id) === String(ilanId));
    if (found) setSelectedJob(found);
  }, [jobs]);

  async function loadJobs() {
    if (!supabase) {
      const stored = localStorage.getItem("ekis_demo_jobs");
      if (stored) {
        setJobs(JSON.parse(stored));
      }
      return;
    }

    setLoadingJobs(true);

    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setDbStatus("Bağlantı var ama jobs tablosu eksik");
      setLoadingJobs(false);
      return;
    }

    const mapped = (data || []).map((job) => ({
      id: job.id,
      title: job.title,
      company: job.company,
      city: job.city,
      district: job.district,
      type: job.type,
      pay: job.pay,
      hours: job.hours,
      description: job.description,
      tags: normalizeTags(job.tags),
      status: job.status || "active",
      package_type: job.package_type || "standard",
      featured: Boolean(job.featured),
      price: job.price || "Ücretsiz",
      created_at: job.created_at,
      employer_email: job.employer_email || "",
      payment_status: job.payment_status || "none",
      payment_note: job.payment_note || "",
    }));

    setJobs(mapped.length ? mapped : initialJobs);
    setLoadingJobs(false);
    setDbStatus("Supabase bağlı");
  }

  async function loadApplications() {
    if (!supabase) {
      const stored = localStorage.getItem("ekis_demo_applications");
      if (stored) setApplications(JSON.parse(stored));
      return;
    }

    setLoadingApplications(true);

    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    setLoadingApplications(false);

    if (error) {
      console.error(error);
      return;
    }

    setApplications(data || []);
  }

  async function loadMessages(applicationId) {
    if (!supabase || !applicationId) {
      setMessages([]);
      return;
    }

    setLoadingMessages(true);

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("application_id", applicationId)
      .order("created_at", { ascending: true });

    setLoadingMessages(false);

    if (error) {
      console.error(error);
      setMessages([]);
      return;
    }

    setMessages(data || []);
  }

  async function handleRegister() {
    if (!authForm.email || !authForm.password || !authForm.full_name) {
      setAuthMessage("Ad soyad, e-posta ve şifre zorunlu.");
      return;
    }

    if (authRole === "employer" && !authForm.company_name) {
      setAuthMessage("İşveren kaydı için firma adı zorunlu.");
      return;
    }

    const newUser = {
      email: authForm.email,
      full_name: authForm.full_name,
      company_name: authRole === "employer" ? authForm.company_name : "",
      role: authRole,
      phone: authForm.phone || "",
    };

    if (!supabase) {
      setCurrentUser(newUser);
      setShowAuthModal(false);
      setAuthMessage("");
      setAuthForm({
        full_name: "",
        company_name: "",
        email: "",
        password: "",
        phone: "",
      });
      return;
    }

    setAuthLoading(true);

    const { data, error } = await supabase
      .from("employers")
      .insert({
        email: authForm.email,
        password: authForm.password,
        company_name: authRole === "employer" ? authForm.company_name : "",
        full_name: authForm.full_name,
      })
      .select()
      .single();

    setAuthLoading(false);

    if (error) {
      console.error(error);
      setAuthMessage("Kayıt başarısız. E-posta kullanımda olabilir.");
      return;
    }

    setCurrentUser({
      email: data.email,
      full_name: data.full_name,
      company_name: data.company_name || "",
      role: data.company_name ? "employer" : authRole,
      phone: authForm.phone || "",
    });

    setShowAuthModal(false);
    setAuthMessage("");
    setAuthForm({
      full_name: "",
      company_name: "",
      email: "",
      password: "",
      phone: "",
    });
  }

  async function handleLogin() {
    if (!authForm.email || !authForm.password) {
      setAuthMessage("E-posta ve şifre zorunlu.");
      return;
    }

    if (!supabase) {
      setCurrentUser({
        email: authForm.email,
        full_name: authRole === "employer" ? "Demo İşveren" : "Demo Aday",
        company_name: authRole === "employer" ? "Demo Firma" : "",
        role: authRole,
        phone: authForm.phone || "",
      });
      setShowAuthModal(false);
      setAuthMessage("");
      return;
    }

    setAuthLoading(true);

    const { data, error } = await supabase
      .from("employers")
      .select("*")
      .eq("email", authForm.email)
      .eq("password", authForm.password)
      .maybeSingle();

    setAuthLoading(false);

    if (error || !data) {
      console.error(error);
      setAuthMessage("Giriş başarısız. Bilgileri kontrol et.");
      return;
    }

    const inferredRole = data.company_name ? "employer" : "candidate";

    setCurrentUser({
      email: data.email,
      full_name: data.full_name,
      company_name: data.company_name || "",
      role: inferredRole,
      phone: authForm.phone || "",
    });

    setShowAuthModal(false);
    setAuthMessage("");
    setAuthForm({
      full_name: "",
      company_name: "",
      email: "",
      password: "",
      phone: "",
    });
  }

  function handleLogout() {
    setCurrentUser(null);
    setTab("jobs");
  }

  function getJobShareUrl(job) {
    if (typeof window === "undefined") return `?ilan=${job.id}`;
    return `${window.location.origin}${window.location.pathname}?ilan=${job.id}`;
  }

  async function handleShareJob(job) {
    const shareUrl = getJobShareUrl(job);
    const shareText = `${job.title} - ${job.company}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: shareText,
          text: `${job.title} ilanına göz at`,
          url: shareUrl,
        });
        setShareMessage("İlan paylaşıldı");
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setShareMessage("İlan linki kopyalandı");
      } else {
        setShareMessage(shareUrl);
      }
    } catch (error) {
      console.error(error);
      setShareMessage("Paylaşım yapılamadı");
    }

    setTimeout(() => setShareMessage(""), 2500);
  }

  const applicationsByJobId = useMemo(() => {
    const map = {};
    for (const app of applications) {
      const key = String(app.job_id);
      map[key] = (map[key] || 0) + 1;
    }
    return map;
  }, [applications]);

  const filteredJobs = useMemo(() => {
    return jobs
      .filter((job) => {
        if (job.status !== "active" && job.status !== undefined) return false;
        if (isExpired(job)) return false;

        const q = search.toLowerCase();
        const searchMatch =
          !q ||
          [job.title, job.company, job.city, job.district, ...normalizeTags(job.tags)]
            .join(" ")
            .toLowerCase()
            .includes(q);

        const cityMatch = city === "all" ? true : job.city === city;
        const typeMatch = type === "all" ? true : job.type === type;
        const urgentMatch = urgentOnly
          ? normalizeTags(job.tags).includes("ACİL")
          : true;

        return searchMatch && cityMatch && typeMatch && urgentMatch;
      })
      .sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        if (normalizeTags(a.tags).includes("ACİL") !== normalizeTags(b.tags).includes("ACİL")) {
          return normalizeTags(a.tags).includes("ACİL") ? -1 : 1;
        }
        return getRemainingDays(b) - getRemainingDays(a);
      });
  }, [jobs, search, city, type, urgentOnly]);

  const myJobs = useMemo(() => {
    if (!currentUser?.email) return [];
    return jobs.filter((job) => job.employer_email === currentUser.email);
  }, [jobs, currentUser]);

  const myJobIds = useMemo(() => myJobs.map((job) => String(job.id)), [myJobs]);

  const employerApplications = useMemo(() => {
    return applications
      .filter((app) => myJobIds.includes(String(app.job_id)))
      .map((app) => {
        const matchedJob = jobs.find((job) => String(job.id) === String(app.job_id));
        return {
          ...app,
          jobTitle: matchedJob?.title || `İlan #${app.job_id}`,
          company: matchedJob?.company || "-",
          city: matchedJob?.city || "-",
        };
      });
  }, [applications, jobs, myJobIds]);

  const premiumJobsCount = useMemo(
    () => jobs.filter((job) => job.package_type === "premium").length,
    [jobs]
  );

  const superAdminStats = useMemo(() => {
    const totalJobs = jobs.length;
    const totalApplications = applications.length;
    const totalEmployers = [
      ...new Set(jobs.map((job) => job.employer_email).filter(Boolean)),
    ].length;
    const paymentWaiting = jobs.filter(
      (job) => job.package_type === "premium" && job.payment_status === "waiting_payment"
    ).length;

    return { totalJobs, totalApplications, totalEmployers, paymentWaiting };
  }, [jobs, applications]);

  function resetJobForm() {
    setJobForm({
      title: "",
      company: currentUser?.company_name || "",
      city: "",
      district: "",
      type: "Part-time",
      pay: "",
      hours: "",
      description: "",
      package_type: "standard",
      payment_note: "",
      urgent: false,
    });
  }

  async function handlePublish() {
    if (!currentUser) {
      setShowAuthModal(true);
      setAuthMode("login");
      setAuthRole("employer");
      setAuthMessage("İlan vermek için önce işveren hesabıyla giriş yap.");
      return;
    }

    if (!isEmployer) {
      alert("İlan vermek için işveren hesabı kullanmalısın.");
      return;
    }

    if (!jobForm.title || !jobForm.company || !jobForm.city) {
      alert("Lütfen zorunlu alanları doldur.");
      return;
    }

    const selectedPackage = PACKAGE_OPTIONS[jobForm.package_type];
    const paymentStatus = selectedPackage.payment_status;
    const tags = buildTags(
      ["Yeni ilan"],
      jobForm.urgent,
      jobForm.package_type,
      "pending"
    );

    const newJob = {
      id: Date.now(),
      ...jobForm,
      tags,
      status: "pending",
      featured: selectedPackage.featured,
      price: selectedPackage.price,
      employer_email: currentUser.email,
      payment_status: paymentStatus,
      created_at: new Date().toISOString(),
    };

    if (!supabase) {
      const next = [newJob, ...jobs];
      setJobs(next);
      localStorage.setItem("ekis_demo_jobs", JSON.stringify(next));
      resetJobForm();
      setTab("dashboard");
      return;
    }

    setSavingJob(true);

    const { data, error } = await supabase
      .from("jobs")
      .insert({
        title: jobForm.title,
        company: jobForm.company,
        city: jobForm.city,
        district: jobForm.district,
        type: jobForm.type,
        pay: jobForm.pay,
        hours: jobForm.hours,
        description: jobForm.description,
        tags,
        status: "pending",
        package_type: jobForm.package_type,
        featured: selectedPackage.featured,
        price: selectedPackage.price,
        employer_email: currentUser.email,
        payment_status: paymentStatus,
        payment_note: jobForm.payment_note || "",
      })
      .select()
      .single();

    setSavingJob(false);

    if (error) {
      console.error(error);
      setDbStatus("İlan kaydı başarısız");
      return;
    }

    setJobs((prev) => [{ ...data, tags: normalizeTags(data.tags) }, ...prev]);
    resetJobForm();
    setTab("dashboard");
  }

  async function handleMarkPaid(jobId) {
    if (!supabase) {
      setJobs((prev) =>
        prev.map((job) =>
          job.id === jobId ? { ...job, payment_status: "paid" } : job
        )
      );
      return;
    }

    setActionLoadingId(jobId);

    const { error } = await supabase
      .from("jobs")
      .update({ payment_status: "paid" })
      .eq("id", jobId);

    setActionLoadingId(null);

    if (error) {
      console.error(error);
      return;
    }

    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId ? { ...job, payment_status: "paid" } : job
      )
    );
  }

  async function handleApplicationSubmit() {
    if (!appliedJob || !applicationForm.full_name || !applicationForm.phone) return;

    if (currentUser?.role === "employer") {
      alert("İşveren hesabı ile başvuru yapılamaz.");
      return;
    }

    const payload = {
      full_name: applicationForm.full_name,
      phone: applicationForm.phone,
      note: applicationForm.note,
      job_id: appliedJob.id,
      created_at: new Date().toISOString(),
      email: currentUser?.email || "",
    };

    if (!supabase) {
      const existing = JSON.parse(
        localStorage.getItem("ekis_demo_applications") || "[]"
      );
      const next = [{ id: Date.now(), ...payload }, ...existing];
      localStorage.setItem("ekis_demo_applications", JSON.stringify(next));
      setApplications(next);

      if (currentUser?.email && currentUser.role === "candidate") {
        const existingMine = getStoredCandidateApplications(currentUser.email);
        const nextMine = [
          {
            id: Date.now(),
            ...payload,
            jobTitle: appliedJob.title,
            company: appliedJob.company,
            city: appliedJob.city,
          },
          ...existingMine,
        ];
        saveStoredCandidateApplications(currentUser.email, nextMine);
        setCandidateApplications(nextMine);
      }

      setApplicationSent(true);
      setApplicationForm({ full_name: "", phone: "", note: "" });
      return;
    }

    setSendingApplication(true);

    const { data, error } = await supabase
      .from("applications")
      .insert({
        job_id: appliedJob.id,
        full_name: applicationForm.full_name,
        phone: applicationForm.phone,
        note: applicationForm.note,
      })
      .select()
      .single();

    setSendingApplication(false);

    if (error) {
      console.error(error);
      setDbStatus("Başvuru kaydı başarısız");
      return;
    }

    setApplications((prev) => [data, ...prev]);

    if (currentUser?.email && currentUser.role === "candidate") {
      const existingMine = getStoredCandidateApplications(currentUser.email);
      const nextMine = [
        {
          ...data,
          email: currentUser.email,
          jobTitle: appliedJob.title,
          company: appliedJob.company,
          city: appliedJob.city,
        },
        ...existingMine,
      ];
      saveStoredCandidateApplications(currentUser.email, nextMine);
      setCandidateApplications(nextMine);
    }

    setApplicationSent(true);
    setApplicationForm({ full_name: "", phone: "", note: "" });
  }

  async function handleApproveJob(jobId) {
    const selected = jobs.find((job) => job.id === jobId);
    if (!selected) return;

    if (
      selected.package_type === "premium" &&
      selected.payment_status !== "paid"
    ) {
      alert("Premium ilanı yayına almadan önce ödeme durumu paid olmalı.");
      return;
    }

    const updatedTags = buildTags(
      selected.tags,
      normalizeTags(selected.tags).includes("ACİL"),
      selected.package_type,
      "active"
    );

    if (!supabase) {
      const next = jobs.map((job) =>
        job.id === jobId
          ? {
              ...job,
              status: "active",
              tags: updatedTags,
            }
          : job
      );
      setJobs(next);
      localStorage.setItem("ekis_demo_jobs", JSON.stringify(next));
      return;
    }

    setActionLoadingId(jobId);

    const { error } = await supabase
      .from("jobs")
      .update({
        status: "active",
        tags: updatedTags,
      })
      .eq("id", jobId);

    setActionLoadingId(null);

    if (error) {
      console.error(error);
      return;
    }

    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId
          ? {
              ...job,
              status: "active",
              tags: updatedTags,
            }
          : job
      )
    );
  }

  async function handleDeleteJob(jobId) {
    if (!window.confirm("Bu ilan silinsin mi?")) return;

    if (!supabase) {
      const next = jobs.filter((job) => job.id !== jobId);
      setJobs(next);
      localStorage.setItem("ekis_demo_jobs", JSON.stringify(next));
      return;
    }

    setActionLoadingId(jobId);

    const { error } = await supabase.from("jobs").delete().eq("id", jobId);

    setActionLoadingId(null);

    if (error) {
      console.error(error);
      return;
    }

    setJobs((prev) => prev.filter((job) => job.id !== jobId));
  }

  function openEditJob(job) {
    setEditingJob(job);
    setEditForm({
      title: job.title || "",
      company: job.company || "",
      city: job.city || "",
      district: job.district || "",
      type: job.type || "Part-time",
      pay: job.pay || "",
      hours: job.hours || "",
      description: job.description || "",
      package_type: job.package_type || "standard",
      payment_note: job.payment_note || "",
      payment_status: job.payment_status || "none",
      status: job.status || "pending",
      urgent: normalizeTags(job.tags).includes("ACİL"),
    });
  }

  async function handleSaveEditJob() {
    if (!editingJob) return;
    if (!editForm.title || !editForm.company || !editForm.city) {
      alert("Lütfen zorunlu alanları doldur.");
      return;
    }

    const selectedPackage = PACKAGE_OPTIONS[editForm.package_type];
    const updatedTags = buildTags(
      editingJob.tags,
      editForm.urgent,
      editForm.package_type,
      editForm.status
    );

    const payload = {
      title: editForm.title,
      company: editForm.company,
      city: editForm.city,
      district: editForm.district,
      type: editForm.type,
      pay: editForm.pay,
      hours: editForm.hours,
      description: editForm.description,
      package_type: editForm.package_type,
      featured: selectedPackage.featured,
      price: selectedPackage.price,
      payment_note: editForm.payment_note,
      payment_status: editForm.payment_status,
      status: editForm.status,
      tags: updatedTags,
    };

    if (!supabase) {
      const next = jobs.map((job) =>
        job.id === editingJob.id
          ? {
              ...job,
              ...payload,
            }
          : job
      );
      setJobs(next);
      localStorage.setItem("ekis_demo_jobs", JSON.stringify(next));
      setEditingJob(null);
      return;
    }

    setActionLoadingId(editingJob.id);

    const { error } = await supabase
      .from("jobs")
      .update(payload)
      .eq("id", editingJob.id);

    setActionLoadingId(null);

    if (error) {
      console.error(error);
      return;
    }

    setJobs((prev) =>
      prev.map((job) =>
        job.id === editingJob.id
          ? {
              ...job,
              ...payload,
            }
          : job
      )
    );
    setEditingJob(null);
  }

  async function handleOpenChat(app) {
    setActiveChat(app);
    await loadMessages(app.id);
  }

  async function sendMessage() {
    if (!newMessage.trim() || !activeChat) return;

    if (!supabase) {
      const fakeMessage = {
        id: Date.now(),
        application_id: activeChat.id,
        job_id: activeChat.job_id,
        sender: "employer",
        message: newMessage,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, fakeMessage]);
      setNewMessage("");
      return;
    }

    setSendingMessage(true);

    const { error } = await supabase.from("messages").insert({
      application_id: activeChat.id,
      job_id: activeChat.job_id,
      sender: "employer",
      message: newMessage,
    });

    setSendingMessage(false);

    if (error) {
      console.error(error);
      return;
    }

    setNewMessage("");
    await loadMessages(activeChat.id);
  }

  function handleOpenApply(job) {
    if (currentUser?.role === "employer") {
      alert("İşveren hesabı ile ilana başvuru yapılamaz.");
      return;
    }

    setAppliedJob(job);
    setApplicationSent(false);
    setApplicationForm((prev) => ({
      ...prev,
      full_name: currentUser?.full_name || prev.full_name || "",
      phone: currentUser?.phone || prev.phone || "",
    }));
  }

  function handleSaveProfile() {
    if (!currentUser) return;

    const updated = {
      ...currentUser,
      full_name: profileForm.full_name,
      phone: profileForm.phone,
      company_name: isEmployer ? profileForm.company_name : "",
    };

    setCurrentUser(updated);
    localStorage.setItem("ekis_user_session", JSON.stringify(updated));
    alert("Profil güncellendi.");
  }

  const types = [...new Set(jobs.map((j) => j.type).filter(Boolean))];
  const selectedPackage = PACKAGE_OPTIONS[jobForm.package_type];

  return (
    <div className="page">
      <GlobalStyles />

      <div className="container">
        <header className="header">
          <div>
            <div className="logo">ekis</div>
            <div className="muted">
              Günlük, hızlı ve ek iş ilanları için modern buluşma noktası
            </div>
          </div>

          <div className="header-actions">
            <Badge className="live-badge">{dbStatus}</Badge>

            {currentUser ? (
              <>
                {isSuperAdmin ? (
                  <Badge className="premium-badge">
                    <Crown size={13} /> Süper Admin
                  </Badge>
                ) : null}

                <Badge className="soft">
                  {isEmployer
                    ? currentUser.company_name || currentUser.email
                    : currentUser.full_name || currentUser.email}
                </Badge>

                <Button
                  variant="outline"
                  onClick={() => {
                    setTab("jobs");
                    setTimeout(() => {
                      jobsSectionRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }, 50);
                  }}
                >
                  <User size={16} /> İş Ara
                </Button>

                {isEmployer ? (
                  <Button
                    onClick={() => {
                      setTab("post");
                      setTimeout(() => {
                        postSectionRef.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }, 50);
                    }}
                  >
                    <Building2 size={16} /> İlan Ver
                  </Button>
                ) : null}

                <Button variant="outline" onClick={() => setTab("profile")}>
                  <User size={16} /> Profilim
                </Button>

                {(isEmployer || isSuperAdmin) ? (
                  <Button variant="outline" onClick={() => setTab("dashboard")}>
                    <FileText size={16} /> Panel
                  </Button>
                ) : null}

                <Button variant="outline" onClick={handleLogout}>
                  <LogOut size={16} /> Çıkış
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setAuthMode("login");
                    setAuthRole("candidate");
                    setShowAuthModal(true);
                    setAuthMessage("");
                  }}
                >
                  <LogIn size={16} /> Giriş
                </Button>
                <Button
                  onClick={() => {
                    setAuthMode("register");
                    setAuthRole("candidate");
                    setShowAuthModal(true);
                    setAuthMessage("");
                  }}
                >
                  <UserPlus size={16} /> Kayıt Ol
                </Button>
              </>
            )}
          </div>
        </header>

        <section className="hero-grid">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="hero-card">
              <Badge className="hero-badge">Türkiye’nin hızlı iş platformu</Badge>
              <h1>
                5 dakikada <span>iş bul</span> veya <span>iş ver</span>
              </h1>
              <p>
                Günlük iş, part-time iş, ek gelir ve hızlı başvuru için tasarlandı.
                İş arayan ve işveren doğrudan buluşur.
              </p>

              <div className="trust-strip">
                <span className="trust-chip">
                  <Users size={14} /> 1.200+ kullanıcı
                </span>
                <span className="trust-chip">
                  <Briefcase size={14} /> 350 aktif ilan
                </span>
                <span className="trust-chip">
                  <ShieldCheck size={14} /> Gerçek işverenler
                </span>
              </div>

              <div className="hero-cta">
                <Button
                  onClick={() => {
                    setTab("jobs");
                    setTimeout(() => {
                      jobsSectionRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }, 50);
                  }}
                >
                  <Search size={16} />
                  Hemen İş Bul
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    if (!currentUser) {
                      setAuthMode("register");
                      setAuthRole("employer");
                      setShowAuthModal(true);
                      setAuthMessage("");
                      return;
                    }
                    if (!isEmployer) {
                      alert("İlan vermek için işveren hesabı kullanmalısın.");
                      return;
                    }
                    setTab("post");
                    setTimeout(() => {
                      postSectionRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }, 50);
                  }}
                >
                  <PlusCircle size={16} />
                  Ücretsiz İlan Ver
                </Button>
              </div>

              <div className="hero-secondary-note muted">
                <span>✔ Aracı yok</span>
                <span>✔ Hızlı başvuru</span>
                <span>✔ Aynı gün dönüş ihtimali</span>
              </div>

              <div className="filters" style={{ marginTop: 18 }}>
                <div className="search-wrap">
                  <Search size={16} className="search-icon" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="İş ara: kafe, kurye, mağaza, organizasyon..."
                  />
                </div>

                <SelectField
                  value={city}
                  onChange={setCity}
                  options={[
                    { value: "all", label: "Tüm şehirler" },
                    ...TURKEY_CITIES.map((c) => ({ value: c, label: c })),
                  ]}
                />

                <SelectField
                  value={type}
                  onChange={setType}
                  options={[
                    { value: "all", label: "Tüm türler" },
                    ...types.map((t) => ({ value: t, label: t })),
                  ]}
                />

                <Button>
                  <Filter size={16} />
                  Filtrele
                </Button>
              </div>
            </Card>
          </motion.div>

          <div className="stats">
            <Stat label="Aktif ilan" value={String(filteredJobs.length)} icon={Briefcase} />
            <Stat label="Premium ilan" value={String(premiumJobsCount)} icon={Sparkles} />
            <Stat
              label="Bugün eklenen"
              value={String(jobs.filter((j) => isNewJob(j)).length)}
              icon={Eye}
            />
          </div>
        </section>

        <section className="feature-grid">
          <Card>
            <Briefcase className="feature-icon" />
            <div className="feature-title">Hızlı işe alım</div>
            <p className="muted">
              Ağır başvuru süreçleri yerine hızlı ve doğrudan akış.
            </p>
          </Card>
          <Card>
            <Sparkles className="feature-icon" />
            <div className="feature-title">Premium görünürlük</div>
            <p className="muted">
              Premium ilanlar üstte çıkar, daha dikkat çekici görünür.
            </p>
          </Card>
          <Card>
            <MessageCircle className="feature-icon" />
            <div className="feature-title">Site içi iletişim</div>
            <p className="muted">
              Başvuranlarla platform içinde konuş, iletişimi kontrol et.
            </p>
          </Card>
        </section>

        <div className="tabs">
          <button
            className={tab === "jobs" ? "tab active" : "tab"}
            onClick={() => {
              setTab("jobs");
              setTimeout(() => {
                jobsSectionRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }, 50);
            }}
          >
            İlanlar
          </button>

          {isEmployer ? (
            <button
              className={tab === "post" ? "tab active" : "tab"}
              onClick={() => {
                setTab("post");
                setTimeout(() => {
                  postSectionRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }, 50);
              }}
            >
              İlan Ver
            </button>
          ) : null}

          {currentUser ? (
            <button
              className={tab === "profile" ? "tab active" : "tab"}
              onClick={() => setTab("profile")}
            >
              Profilim
            </button>
          ) : null}

          {(currentUser && isEmployer) || isSuperAdmin ? (
            <button
              className={tab === "dashboard" ? "tab active" : "tab"}
              onClick={() => setTab("dashboard")}
            >
              Panel
            </button>
          ) : null}

          {isSuperAdmin ? (
            <button
              className={tab === "superadmin" ? "tab active" : "tab"}
              onClick={() => setTab("superadmin")}
            >
              Süper Admin
            </button>
          ) : null}
        </div>

        {tab === "jobs" && (
          <div ref={jobsSectionRef} className="filters-grid">
            <div className="filter-panel">
              <Card>
                <div className="feature-title" style={{ marginBottom: 10 }}>
                  Filtreler
                </div>

                <div className="filter-stack">
                  <div>
                    <Label>Şehir</Label>
                    <SelectField
                      value={city}
                      onChange={setCity}
                      options={[
                        { value: "all", label: "Tüm şehirler" },
                        ...TURKEY_CITIES.map((c) => ({ value: c, label: c })),
                      ]}
                    />
                  </div>

                  <div>
                    <Label>Çalışma türü</Label>
                    <SelectField
                      value={type}
                      onChange={setType}
                      options={[
                        { value: "all", label: "Tüm türler" },
                        ...types.map((t) => ({ value: t, label: t })),
                      ]}
                    />
                  </div>

                  <label
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      fontWeight: 700,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={urgentOnly}
                      onChange={(e) => setUrgentOnly(e.target.checked)}
                    />
                    Sadece ACİL ilanlar
                  </label>

                  <Card>
                    <div className="feature-title">
                      {currentUser?.role === "candidate"
                        ? "İş Bakan Avantajları"
                        : "Avantajlar"}
                    </div>
                    <div className="muted" style={{ lineHeight: 1.7 }}>
                      1 tıkla başvuru yap<br />
                      Hızlı iletişim kur<br />
                      Yeni ilanları kaçırma
                    </div>
                  </Card>

                  <Button
                    onClick={() => {
                      setSearch("");
                      setCity("all");
                      setType("all");
                      setUrgentOnly(false);
                    }}
                    variant="outline"
                  >
                    Filtreleri Temizle
                  </Button>
                </div>
              </Card>
            </div>

            <section className="section-stack">
              <div className="section-head">
                <div>
                  <h2>İlan listesi</h2>
                  <p className="muted">
                    ACİL ve premium ilanlar öne çıkar. Süresi dolan ilanlar gösterilmez.
                  </p>
                </div>
                <div className="result-wrap">
                  {loadingJobs ? <Loader2 size={16} className="spin" /> : null}
                  <Badge className="soft">{filteredJobs.length} sonuç</Badge>
                </div>
              </div>

              <div className="job-list">
                {filteredJobs.length === 0 ? (
                  <Card>
                    <div className="feature-title">Henüz ilan yok 😕</div>
                    <div className="muted" style={{ marginBottom: 12 }}>
                      İlk ilanı sen ver veya birazdan tekrar kontrol et.
                    </div>
                    <Button
                      onClick={() => {
                        if (!currentUser) {
                          setAuthMode("register");
                          setAuthRole("employer");
                          setShowAuthModal(true);
                          return;
                        }
                        if (!isEmployer) {
                          alert("İlan vermek için işveren hesabı kullanmalısın.");
                          return;
                        }
                        setTab("post");
                      }}
                    >
                      <PlusCircle size={16} />
                      İlk İlanı Ver
                    </Button>
                  </Card>
                ) : (
                  filteredJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      applicationsCount={applicationsByJobId[String(job.id)] || 0}
                      onApply={handleOpenApply}
                      onView={(jobToView) => setSelectedJob(jobToView)}
                    />
                  ))
                )}
              </div>
            </section>
          </div>
        )}

        {tab === "post" && isEmployer && (
          <div ref={postSectionRef}>
            <Card>
              <h2>İşveren ilan oluşturma ekranı</h2>

              <div className="premium-plan-box">
                <div className="premium-plan-head">
                  <div className="premium-plan-title">
                    <BadgeCent size={18} />
                    Paket seçimi
                  </div>
                  <Badge
                    className={
                      jobForm.package_type === "premium"
                        ? "premium-badge"
                        : "soft"
                    }
                  >
                    {selectedPackage.label}
                  </Badge>
                </div>
                <div className="premium-plan-price">{selectedPackage.price}</div>
                <div className="muted">
                  Standart ilan {FREE_JOB_DURATION_DAYS} gün, premium ilan{" "}
                  {PREMIUM_JOB_DURATION_DAYS} gün yayında kalır.
                </div>
                <div className="muted" style={{ marginTop: 8 }}>
                  🔥 Premium ilan → daha fazla görünürlük ve daha yüksek tıklanma
                </div>
              </div>

              {jobForm.package_type === "premium" ? (
                <div className="premium-plan-box" style={{ marginBottom: 16 }}>
                  <div className="premium-plan-title">
                    <CreditCard size={18} />
                    Ödeme bilgisi
                  </div>

                  <div className="muted" style={{ marginBottom: 8 }}>
                    Premium ilan ücreti 399 TL'dir. Ödemeyi yaptıktan sonra referans
                    numarasını aşağıya yazabilirsin.
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      flexWrap: "wrap",
                      marginBottom: 12,
                    }}
                  >
                    <a
                      href={SHOPIER_PAYMENT_URL}
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <button type="button" className="btn btn-solid">
                        <CreditCard size={16} />
                        Shopier ile 399 TL Öde
                      </button>
                    </a>
                  </div>

                  <div className="muted" style={{ marginBottom: 12 }}>
                    Ödeme sonrası referans numarasını buraya yazabilirsin:
                  </div>

                  <Textarea
                    placeholder="Örnek: Shopier sipariş no / ödeme referansı"
                    value={jobForm.payment_note}
                    onChange={(e) =>
                      setJobForm({
                        ...jobForm,
                        payment_note: e.target.value,
                      })
                    }
                  />
                </div>
              ) : null}

              <div className="form-grid">
                <div>
                  <Label required>Paket</Label>
                  <SelectField
                    value={jobForm.package_type}
                    onChange={(val) =>
                      setJobForm({ ...jobForm, package_type: val })
                    }
                    options={[
                      { value: "standard", label: "Standart - Ücretsiz" },
                      { value: "premium", label: "Premium - 399 TL" },
                    ]}
                  />
                </div>

                <div>
                  <Label required>İş başlığı</Label>
                  <Input
                    placeholder="Örn: Kafe Servis Elemanı"
                    value={jobForm.title}
                    onChange={(e) =>
                      setJobForm({ ...jobForm, title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label required>Firma adı</Label>
                  <Input
                    placeholder="Firma adı"
                    value={jobForm.company}
                    onChange={(e) =>
                      setJobForm({ ...jobForm, company: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label required>Şehir</Label>
                  <SelectField
                    value={jobForm.city}
                    onChange={(val) =>
                      setJobForm({ ...jobForm, city: val })
                    }
                    options={[
                      { value: "", label: "Şehir seç" },
                      ...TURKEY_CITIES.map((c) => ({ value: c, label: c })),
                    ]}
                  />
                </div>

                <div>
                  <Label>İlçe</Label>
                  <Input
                    placeholder="İlçe"
                    value={jobForm.district}
                    onChange={(e) =>
                      setJobForm({ ...jobForm, district: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label>Çalışma türü</Label>
                  <SelectField
                    value={jobForm.type}
                    onChange={(val) =>
                      setJobForm({ ...jobForm, type: val })
                    }
                    options={[
                      { value: "Part-time", label: "Part-time" },
                      { value: "Ek iş", label: "Ek iş" },
                      { value: "Günlük iş", label: "Günlük iş" },
                      { value: "Yarı zamanlı", label: "Yarı zamanlı" },
                    ]}
                  />
                </div>

                <div>
                  <Label>Ücret bilgisi</Label>
                  <Input
                    placeholder="Örn: Günlük 1500 TL"
                    value={jobForm.pay}
                    onChange={(e) =>
                      setJobForm({ ...jobForm, pay: e.target.value })
                    }
                  />
                </div>

                <div className="full">
                  <Label>Çalışma saatleri</Label>
                  <Input
                    placeholder="Örn: 10:00 - 18:00"
                    value={jobForm.hours}
                    onChange={(e) =>
                      setJobForm({ ...jobForm, hours: e.target.value })
                    }
                  />
                </div>

                <div className="full">
                  <Label>İş açıklaması</Label>
                  <Textarea
                    placeholder="İşin detaylarını yaz..."
                    value={jobForm.description}
                    onChange={(e) =>
                      setJobForm({
                        ...jobForm,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="full">
                  <label
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      fontWeight: 800,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={jobForm.urgent}
                      onChange={(e) =>
                        setJobForm({
                          ...jobForm,
                          urgent: e.target.checked,
                        })
                      }
                    />
                    ACİL ilan olarak işaretle
                  </label>
                </div>

                <div className="full action-row">
                  <Button onClick={handlePublish} disabled={savingJob}>
                    {savingJob ? (
                      <Loader2 size={16} className="spin" />
                    ) : (
                      <PlusCircle size={16} />
                    )}
                    {savingJob
                      ? "Kaydediliyor"
                      : jobForm.package_type === "premium"
                      ? "İlanı Yayına Al (399 TL)"
                      : "Ücretsiz İlan Ver"}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {tab === "profile" && currentUser && (
          <section className="dashboard-grid">
            <Card>
              <h2>Profil Bilgilerim</h2>
              <div className="form-grid">
                <div>
                  <Label required>Ad soyad</Label>
                  <Input
                    value={profileForm.full_name}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, full_name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label required>E-posta</Label>
                  <Input value={profileForm.email} disabled />
                </div>

                <div>
                  <Label>Telefon</Label>
                  <Input
                    value={profileForm.phone}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, phone: e.target.value })
                    }
                  />
                </div>

                {isEmployer ? (
                  <div>
                    <Label required>Firma adı</Label>
                    <Input
                      value={profileForm.company_name}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          company_name: e.target.value,
                        })
                      }
                    />
                  </div>
                ) : (
                  <div>
                    <Label>Hesap tipi</Label>
                    <Input value="İş Bakan" disabled />
                  </div>
                )}

                <div className="full action-row">
                  <Button onClick={handleSaveProfile}>
                    <Check size={16} />
                    Profili Kaydet
                  </Button>
                </div>
              </div>
            </Card>

            <Card>
              <h2>{isEmployer ? "Hesap Özeti" : "Başvuru Geçmişim"}</h2>

              {isEmployer ? (
                <div className="panel-list">
                  <div className="panel-row">
                    <span className="muted">Hesap tipi</span>
                    <strong>İşveren</strong>
                  </div>
                  <div className="panel-row">
                    <span className="muted">Yayındaki ilanlarım</span>
                    <strong>{myJobs.filter((j) => j.status === "active").length}</strong>
                  </div>
                  <div className="panel-row">
                    <span className="muted">Bekleyen ilanlarım</span>
                    <strong>{myJobs.filter((j) => j.status === "pending").length}</strong>
                  </div>
                </div>
              ) : candidateApplications.length === 0 ? (
                <div className="panel-row">
                  <span className="muted">Henüz başvuru geçmişin yok</span>
                </div>
              ) : (
                <div className="panel-list">
                  {candidateApplications.slice(0, 10).map((app, i) => (
                    <div key={app.id || i} className="panel-row">
                      <strong>{app.jobTitle || `İlan #${app.job_id}`}</strong>
                      <div className="muted">{app.company || "-"}</div>
                      <div className="muted">{app.city || "-"}</div>
                      <div className="muted">{formatDate(app.created_at)}</div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </section>
        )}

        {tab === "dashboard" && isEmployer && (
          <section className="dashboard-grid">
            <Card>
              <h2>Benim İlanlarım</h2>
              <div className="panel-list">
                {myJobs.length === 0 ? (
                  <div className="panel-row">
                    <span className="muted">Henüz ilan yok</span>
                    <strong>0</strong>
                  </div>
                ) : (
                  myJobs.map((job) => (
                    <div
                      key={job.id}
                      className="panel-row"
                      style={{ alignItems: "flex-start", flexDirection: "column" }}
                    >
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 12,
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        <strong>{job.title}</strong>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          <Badge className={job.status === "active" ? "soft" : "pending"}>
                            {job.status === "active" ? "yayında" : "pending"}
                          </Badge>

                          {job.package_type === "premium" ? (
                            <Badge className="premium-badge">
                              <Sparkles size={13} /> Premium
                            </Badge>
                          ) : (
                            <Badge className="soft">Standart</Badge>
                          )}

                          {job.payment_status === "waiting_payment" ? (
                            <Badge className="pending">ödeme bekleniyor</Badge>
                          ) : job.payment_status === "paid" ? (
                            <Badge className="soft">ödeme tamam</Badge>
                          ) : null}

                          {isExpired(job) ? (
                            <Badge className="pending">süresi doldu</Badge>
                          ) : (
                            <Badge className="soft">
                              {getRemainingDays(job)} gün kaldı
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="muted">
                        {job.company} • {job.city} / {job.district || "-"}
                      </div>
                      <div className="muted">
                        {job.pay || "-"} • {job.hours || "-"}
                      </div>
                      <div className="muted">
                        Paket fiyatı:{" "}
                        {job.package_type === "premium"
                          ? "399 TL"
                          : job.price || "Ücretsiz"}
                      </div>
                      {job.payment_note ? (
                        <div className="muted">Ödeme notu: {job.payment_note}</div>
                      ) : null}

                      <div
                        style={{
                          display: "flex",
                          gap: 10,
                          marginTop: 12,
                          flexWrap: "wrap",
                          alignItems: "center",
                        }}
                      >
                        {job.package_type === "premium" &&
                        job.payment_status === "waiting_payment" ? (
                          <>
                            <Button
                              onClick={() => handleMarkPaid(job.id)}
                              disabled={actionLoadingId === job.id}
                            >
                              <CreditCard size={16} />
                              Ödeme Bildirdim
                            </Button>
                            <div className="muted">
                              Ödeme yapılmadan ilan yayına alınamaz
                            </div>
                          </>
                        ) : null}

                        {job.status !== "active" &&
                        (job.package_type !== "premium" ||
                          job.payment_status === "paid") ? (
                          <Button
                            onClick={() => handleApproveJob(job.id)}
                            disabled={actionLoadingId === job.id}
                          >
                            {actionLoadingId === job.id ? (
                              <Loader2 size={16} className="spin" />
                            ) : (
                              <Check size={16} />
                            )}
                            Onayla
                          </Button>
                        ) : null}

                        <Button
                          variant="outline"
                          onClick={() => handleDeleteJob(job.id)}
                          disabled={actionLoadingId === job.id}
                        >
                          <Trash2 size={16} />
                          Sil
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>

            <Card>
              <h2>İlanlarıma Gelen Başvurular</h2>
              <div className="panel-list">
                {loadingApplications ? (
                  <div className="panel-row">
                    <span className="muted">Başvurular yükleniyor</span>
                    <Loader2 size={16} className="spin" />
                  </div>
                ) : employerApplications.length === 0 ? (
                  <div className="panel-row">
                    <span className="muted">Henüz başvuru yok</span>
                    <strong>0</strong>
                  </div>
                ) : (
                  employerApplications.slice(0, 10).map((app) => (
                    <div
                      key={app.id}
                      className="panel-row"
                      style={{
                        alignItems: "flex-start",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 12,
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        <strong>{app.full_name}</strong>
                        <Badge className="soft">{app.jobTitle}</Badge>
                      </div>

                      <div
                        className="muted"
                        style={{ display: "flex", gap: 14, flexWrap: "wrap" }}
                      >
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                          <Phone size={14} /> {app.phone}
                        </span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                          <Building2 size={14} /> {app.company}
                        </span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                          <MapPin size={14} /> {app.city}
                        </span>
                      </div>

                      <div
                        className="muted"
                        style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                      >
                        <CalendarDays size={14} /> {formatDate(app.created_at)}
                      </div>

                      {app.note ? (
                        <div
                          style={{
                            width: "100%",
                            padding: "10px 12px",
                            borderRadius: "14px",
                            background: "#f8fafc",
                            border: "1px solid #e2e8f0",
                          }}
                        >
                          <div
                            className="muted"
                            style={{ fontSize: "13px", marginBottom: "4px" }}
                          >
                            Başvuru notu
                          </div>
                          <div>{app.note}</div>
                        </div>
                      ) : null}

                      <div style={{ marginTop: "6px" }}>
                        <Button variant="outline" onClick={() => handleOpenChat(app)}>
                          <MessageCircle size={16} />
                          Mesaj Gönder
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </section>
        )}

        {tab === "superadmin" && isSuperAdmin && (
          <section className="dashboard-grid">
            <Card>
              <h2>Süper Admin Özeti</h2>
              <div className="panel-list">
                <div className="panel-row">
                  <span className="muted">Toplam ilan</span>
                  <strong>{superAdminStats.totalJobs}</strong>
                </div>
                <div className="panel-row">
                  <span className="muted">Toplam başvuru</span>
                  <strong>{superAdminStats.totalApplications}</strong>
                </div>
                <div className="panel-row">
                  <span className="muted">İşveren sayısı</span>
                  <strong>{superAdminStats.totalEmployers}</strong>
                </div>
                <div className="panel-row">
                  <span className="muted">Ödeme bekleyen premium</span>
                  <strong>{superAdminStats.paymentWaiting}</strong>
                </div>
              </div>
            </Card>

            <Card>
              <h2>Tüm İlanlar</h2>
              <div className="panel-list">
                {jobs.length === 0 ? (
                  <div className="panel-row">
                    <span className="muted">İlan yok</span>
                    <strong>0</strong>
                  </div>
                ) : (
                  jobs.slice(0, 30).map((job) => (
                    <div
                      key={job.id}
                      className="panel-row"
                      style={{ alignItems: "flex-start", flexDirection: "column", gap: 8 }}
                    >
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 12,
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        <strong>{job.title}</strong>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          <Badge className={job.status === "active" ? "soft" : "pending"}>
                            {job.status}
                          </Badge>
                          {job.package_type === "premium" ? (
                            <Badge className="premium-badge">
                              <Sparkles size={13} /> Premium
                            </Badge>
                          ) : (
                            <Badge className="soft">Standart</Badge>
                          )}
                          {job.payment_status === "waiting_payment" ? (
                            <Badge className="pending">ödeme bekleniyor</Badge>
                          ) : job.payment_status === "paid" ? (
                            <Badge className="soft">ödeme tamam</Badge>
                          ) : null}
                          {isExpired(job) ? (
                            <Badge className="pending">süresi doldu</Badge>
                          ) : (
                            <Badge className="soft">
                              {getRemainingDays(job)} gün kaldı
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="muted">{job.company}</div>
                      <div className="muted">İşveren: {job.employer_email || "-"}</div>
                      <div className="muted">
                        Şehir: {job.city} / {job.district || "-"}
                      </div>
                      <div className="muted">Paket: {job.package_type}</div>
                      {job.payment_note ? (
                        <div className="muted">Ödeme notu: {job.payment_note}</div>
                      ) : null}

                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        <Button variant="outline" onClick={() => openEditJob(job)}>
                          <Pencil size={16} />
                          Düzenle
                        </Button>

                        {job.package_type === "premium" &&
                        job.payment_status === "waiting_payment" ? (
                          <Button
                            onClick={() => handleMarkPaid(job.id)}
                            disabled={actionLoadingId === job.id}
                          >
                            <CreditCard size={16} />
                            Ödeme Bildirildi Yap
                          </Button>
                        ) : null}

                        {job.status !== "active" &&
                        (job.package_type !== "premium" ||
                          job.payment_status === "paid") ? (
                          <Button
                            onClick={() => handleApproveJob(job.id)}
                            disabled={actionLoadingId === job.id}
                          >
                            <Check size={16} />
                            Yayına Al
                          </Button>
                        ) : null}

                        <Button
                          variant="outline"
                          onClick={() => handleDeleteJob(job.id)}
                          disabled={actionLoadingId === job.id}
                        >
                          <Trash2 size={16} />
                          Sil
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </section>
        )}

        {appliedJob && (
          <div className="modal-backdrop">
            <div className="modal">
              <h2>Başvuru gönder</h2>
              <div className="job-preview">
                <div className="preview-title">{appliedJob.title}</div>
                <div className="muted">
                  {appliedJob.company} • {appliedJob.city}
                </div>
              </div>

              {!applicationSent ? (
                <>
                  <Label required>Ad soyad</Label>
                  <Input
                    placeholder="Ad soyad"
                    value={applicationForm.full_name}
                    onChange={(e) =>
                      setApplicationForm({
                        ...applicationForm,
                        full_name: e.target.value,
                      })
                    }
                  />

                  <Label required>Telefon</Label>
                  <Input
                    placeholder="Telefon"
                    value={applicationForm.phone}
                    onChange={(e) =>
                      setApplicationForm({
                        ...applicationForm,
                        phone: e.target.value,
                      })
                    }
                  />

                  <div className="muted" style={{ marginBottom: 8 }}>
                    Başvuru 1 dakikadan kısa sürer.
                  </div>

                  <Label>Not</Label>
                  <Textarea
                    placeholder="Kısa bir not yaz"
                    value={applicationForm.note}
                    onChange={(e) =>
                      setApplicationForm({
                        ...applicationForm,
                        note: e.target.value,
                      })
                    }
                  />

                  <div className="action-row">
                    <Button
                      onClick={handleApplicationSubmit}
                      disabled={sendingApplication}
                    >
                      {sendingApplication ? (
                        <Loader2 size={16} className="spin" />
                      ) : (
                        <Send size={16} />
                      )}
                      {sendingApplication
                        ? "Gönderiliyor"
                        : "Başvuruyu gönder"}
                    </Button>
                    <Button variant="outline" onClick={() => setAppliedJob(null)}>
                      Vazgeç
                    </Button>
                  </div>
                </>
              ) : (
                <div className="success-box">
                  <div className="success-title">
                    <CheckCircle2 size={18} /> Başvuru başarıyla gönderildi
                  </div>
                  <p className="muted">
                    🎉 Başvurun iletildi! İşveren sana kısa sürede dönüş yapacak.
                  </p>
                  <Button onClick={() => setAppliedJob(null)}>Kapat</Button>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedJob && (
          <div className="modal-backdrop">
            <div className="modal" style={{ maxWidth: "700px" }}>
              <h2>{selectedJob.title}</h2>

              <div className="job-preview">
                <div className="preview-title">{selectedJob.company}</div>
                <div className="muted">
                  {selectedJob.city} / {selectedJob.district || "-"}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginBottom: "12px",
                }}
              >
                <Badge variant="secondary">{selectedJob.type}</Badge>
                {selectedJob.package_type === "premium" ? (
                  <Badge className="premium-badge">
                    <Sparkles size={13} /> Premium
                  </Badge>
                ) : null}
                {normalizeTags(selectedJob.tags).includes("ACİL") ? (
                  <Badge className="pending">ACİL</Badge>
                ) : null}
                {isNewJob(selectedJob) ? <Badge className="soft">Bugün eklendi</Badge> : null}
                <Badge className="soft">
                  <Clock3 size={13} /> {selectedJob.hours || "-"}
                </Badge>
                <Badge className="soft">
                  <Wallet size={13} /> {selectedJob.pay || "-"}
                </Badge>
                <Badge className="soft">
                  <Users size={13} /> {applicationsByJobId[String(selectedJob.id)] || 0} başvuru
                </Badge>
                <Badge className="soft">
                  {getRemainingDays(selectedJob) > 0
                    ? `${getRemainingDays(selectedJob)} gün kaldı`
                    : "Süresi doldu"}
                </Badge>
              </div>

              <p style={{ marginBottom: "14px", lineHeight: 1.7 }}>
                {selectedJob.description}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                  marginBottom: "14px",
                }}
              >
                {normalizeTags(selectedJob.tags).map((tag) => (
                  <Badge key={tag} className="soft">
                    {tag}
                  </Badge>
                ))}
              </div>

              {shareMessage ? (
                <div
                  style={{
                    padding: "10px 12px",
                    borderRadius: "12px",
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    marginBottom: "12px",
                  }}
                >
                  {shareMessage}
                </div>
              ) : null}

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <Button
                  onClick={() => {
                    if (currentUser?.role === "employer") {
                      alert("İşveren hesabı ile ilana başvuru yapılamaz.");
                      return;
                    }
                    setAppliedJob(selectedJob);
                    setApplicationSent(false);
                    setSelectedJob(null);
                    setApplicationForm((prev) => ({
                      ...prev,
                      full_name: currentUser?.full_name || prev.full_name || "",
                      phone: currentUser?.phone || prev.phone || "",
                    }));
                  }}
                >
                  Hemen Başvur
                </Button>

                <Button variant="outline" onClick={() => handleShareJob(selectedJob)}>
                  <Share2 size={16} />
                  Paylaş
                </Button>

                <Button
                  variant="outline"
                  onClick={async () => {
                    const shareUrl = getJobShareUrl(selectedJob);
                    try {
                      if (navigator.clipboard) {
                        await navigator.clipboard.writeText(shareUrl);
                        setShareMessage("İlan linki kopyalandı");
                        setTimeout(() => setShareMessage(""), 2500);
                      }
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                >
                  <Copy size={16} />
                  Linki Kopyala
                </Button>

                <Button variant="outline" onClick={() => setSelectedJob(null)}>
                  Kapat
                </Button>
              </div>
            </div>
          </div>
        )}

        {editingJob && (
          <div className="modal-backdrop">
            <div className="modal" style={{ maxWidth: "760px" }}>
              <h2>İlan Düzenle</h2>

              <div className="form-grid">
                <div>
                  <Label required>İş başlığı</Label>
                  <Input
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm({ ...editForm, title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label required>Firma adı</Label>
                  <Input
                    value={editForm.company}
                    onChange={(e) =>
                      setEditForm({ ...editForm, company: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label required>Şehir</Label>
                  <SelectField
                    value={editForm.city}
                    onChange={(val) => setEditForm({ ...editForm, city: val })}
                    options={[
                      { value: "", label: "Şehir seç" },
                      ...TURKEY_CITIES.map((c) => ({ value: c, label: c })),
                    ]}
                  />
                </div>

                <div>
                  <Label>İlçe</Label>
                  <Input
                    value={editForm.district}
                    onChange={(e) =>
                      setEditForm({ ...editForm, district: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label>Çalışma türü</Label>
                  <SelectField
                    value={editForm.type}
                    onChange={(val) => setEditForm({ ...editForm, type: val })}
                    options={[
                      { value: "Part-time", label: "Part-time" },
                      { value: "Ek iş", label: "Ek iş" },
                      { value: "Günlük iş", label: "Günlük iş" },
                      { value: "Yarı zamanlı", label: "Yarı zamanlı" },
                    ]}
                  />
                </div>

                <div>
                  <Label>Ücret bilgisi</Label>
                  <Input
                    value={editForm.pay}
                    onChange={(e) =>
                      setEditForm({ ...editForm, pay: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label>Paket</Label>
                  <SelectField
                    value={editForm.package_type}
                    onChange={(val) =>
                      setEditForm({ ...editForm, package_type: val })
                    }
                    options={[
                      { value: "standard", label: "Standart - Ücretsiz" },
                      { value: "premium", label: "Premium - 399 TL" },
                    ]}
                  />
                </div>

                <div>
                  <Label>Ödeme durumu</Label>
                  <SelectField
                    value={editForm.payment_status}
                    onChange={(val) =>
                      setEditForm({ ...editForm, payment_status: val })
                    }
                    options={[
                      { value: "none", label: "Ödeme yok" },
                      { value: "waiting_payment", label: "Ödeme bekleniyor" },
                      { value: "paid", label: "Ödeme tamam" },
                    ]}
                  />
                </div>

                <div>
                  <Label>İlan durumu</Label>
                  <SelectField
                    value={editForm.status}
                    onChange={(val) =>
                      setEditForm({ ...editForm, status: val })
                    }
                    options={[
                      { value: "pending", label: "Pending" },
                      { value: "active", label: "Active" },
                    ]}
                  />
                </div>

                <div className="full">
                  <Label>Çalışma saatleri</Label>
                  <Input
                    value={editForm.hours}
                    onChange={(e) =>
                      setEditForm({ ...editForm, hours: e.target.value })
                    }
                  />
                </div>

                <div className="full">
                  <Label>Ödeme notu</Label>
                  <Textarea
                    value={editForm.payment_note}
                    onChange={(e) =>
                      setEditForm({ ...editForm, payment_note: e.target.value })
                    }
                  />
                </div>

                <div className="full">
                  <Label>İş açıklaması</Label>
                  <Textarea
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm({ ...editForm, description: e.target.value })
                    }
                  />
                </div>

                <div className="full">
                  <label
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      fontWeight: 800,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={editForm.urgent}
                      onChange={(e) =>
                        setEditForm({ ...editForm, urgent: e.target.checked })
                      }
                    />
                    ACİL ilan olarak işaretle
                  </label>
                </div>

                <div className="full action-row">
                  <Button onClick={handleSaveEditJob}>
                    <Check size={16} />
                    Kaydet
                  </Button>
                  <Button variant="outline" onClick={() => setEditingJob(null)}>
                    Kapat
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeChat && (
          <div className="modal-backdrop">
            <div className="modal">
              <h2>Mesajlaşma</h2>

              <div className="job-preview">
                <div className="preview-title">{activeChat.full_name}</div>
                <div className="muted">
                  {activeChat.jobTitle || `İlan #${activeChat.job_id}`}
                </div>
              </div>

              <div
                style={{
                  maxHeight: "280px",
                  overflowY: "auto",
                  display: "grid",
                  gap: "10px",
                  marginBottom: "14px",
                }}
              >
                {loadingMessages ? (
                  <div className="muted">Mesajlar yükleniyor...</div>
                ) : messages.length === 0 ? (
                  <div className="muted">Henüz mesaj yok. İlk mesajı sen gönder.</div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      style={{
                        padding: "10px 12px",
                        borderRadius: "14px",
                        background:
                          msg.sender === "employer" ? "#0f172a" : "#f8fafc",
                        color: msg.sender === "employer" ? "#fff" : "#0f172a",
                        border:
                          msg.sender === "employer"
                            ? "none"
                            : "1px solid #e2e8f0",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "13px",
                          opacity: 0.8,
                          marginBottom: "4px",
                        }}
                      >
                        {msg.sender === "employer" ? "Sen" : "Aday"} •{" "}
                        {formatDate(msg.created_at)}
                      </div>
                      <div>{msg.message}</div>
                    </div>
                  ))
                )}
              </div>

              <Textarea
                placeholder="Mesaj yaz..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />

              <div className="action-row">
                <Button onClick={sendMessage} disabled={sendingMessage}>
                  {sendingMessage ? (
                    <Loader2 size={16} className="spin" />
                  ) : (
                    <Send size={16} />
                  )}
                  {sendingMessage ? "Gönderiliyor" : "Gönder"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setActiveChat(null);
                    setMessages([]);
                    setNewMessage("");
                  }}
                >
                  Kapat
                </Button>
              </div>
            </div>
          </div>
        )}

        {showAuthModal && (
          <div className="modal-backdrop">
            <div className="modal compact">
              <h2>{authMode === "login" ? "Giriş Yap" : "Kayıt Ol"}</h2>

              <div className="role-switch">
                <button
                  type="button"
                  className={`role-pill ${authRole === "candidate" ? "active" : ""}`}
                  onClick={() => setAuthRole("candidate")}
                >
                  İş Bakan
                </button>
                <button
                  type="button"
                  className={`role-pill ${authRole === "employer" ? "active" : ""}`}
                  onClick={() => setAuthRole("employer")}
                >
                  İşveren
                </button>
              </div>

              {authMode === "register" ? (
                <>
                  <Label required>Ad soyad</Label>
                  <Input
                    placeholder={authRole === "candidate" ? "Ad soyad" : "Yetkili adı soyadı"}
                    value={authForm.full_name}
                    onChange={(e) =>
                      setAuthForm({ ...authForm, full_name: e.target.value })
                    }
                  />

                  {authRole === "employer" ? (
                    <>
                      <Label required>Firma adı</Label>
                      <Input
                        placeholder="Firma adı"
                        value={authForm.company_name}
                        onChange={(e) =>
                          setAuthForm({
                            ...authForm,
                            company_name: e.target.value,
                          })
                        }
                      />
                    </>
                  ) : null}

                  <Label>Telefon</Label>
                  <Input
                    placeholder="Telefon"
                    value={authForm.phone}
                    onChange={(e) =>
                      setAuthForm({ ...authForm, phone: e.target.value })
                    }
                  />
                </>
              ) : null}

              <Label required>E-posta</Label>
              <Input
                placeholder="E-posta"
                value={authForm.email}
                onChange={(e) =>
                  setAuthForm({ ...authForm, email: e.target.value })
                }
              />

              <Label required>Şifre</Label>
              <Input
                type="password"
                placeholder="Şifre"
                value={authForm.password}
                onChange={(e) =>
                  setAuthForm({ ...authForm, password: e.target.value })
                }
              />

              {authMessage ? (
                <div
                  style={{
                    padding: "10px 12px",
                    borderRadius: "12px",
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    marginTop: 10,
                  }}
                >
                  {authMessage}
                </div>
              ) : null}

              <div className="action-row" style={{ marginTop: 14 }}>
                {authMode === "login" ? (
                  <Button onClick={handleLogin} disabled={authLoading}>
                    {authLoading ? (
                      <Loader2 size={16} className="spin" />
                    ) : (
                      <LogIn size={16} />
                    )}
                    {authLoading ? "Giriş yapılıyor" : "Giriş Yap"}
                  </Button>
                ) : (
                  <Button onClick={handleRegister} disabled={authLoading}>
                    {authLoading ? (
                      <Loader2 size={16} className="spin" />
                    ) : (
                      <UserPlus size={16} />
                    )}
                    {authLoading ? "Kayıt oluşturuluyor" : "Kayıt Ol"}
                  </Button>
                )}

                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAuthModal(false);
                    setAuthMessage("");
                  }}
                >
                  Kapat
                </Button>
              </div>

              <div className="muted" style={{ marginTop: 10 }}>
                {authMode === "login" ? (
                  <>
                    Hesabın yok mu?{" "}
                    <button
                      type="button"
                      style={{
                        background: "none",
                        border: "none",
                        color: BRAND.primaryDeep,
                        fontWeight: 800,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setAuthMode("register");
                        setAuthMessage("");
                      }}
                    >
                      Kayıt ol
                    </button>
                  </>
                ) : (
                  <>
                    Zaten hesabın var mı?{" "}
                    <button
                      type="button"
                      style={{
                        background: "none",
                        border: "none",
                        color: BRAND.primaryDeep,
                        fontWeight: 800,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setAuthMode("login");
                        setAuthMessage("");
                      }}
                    >
                      Giriş yap
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <footer className="footer">
          <div className="footer-grid">
            <div>
              <div className="footer-title">ekis</div>
              <div className="muted" style={{ lineHeight: 1.7 }}>
                İş arayanlarla işverenleri hızlı, sade ve güvenli biçimde
                buluşturan yeni nesil iş platformu.
              </div>
            </div>

            <div>
              <div className="footer-title">Hakkımızda</div>
              <a className="footer-link" href="#0">Platform Hakkında</a>
              <a className="footer-link" href="#0">Nasıl Çalışır?</a>
              <a className="footer-link" href="#0">Sık Sorulan Sorular</a>
            </div>

            <div>
              <div className="footer-title">Güven & Yasal</div>
              <a className="footer-link" href="#0">KVKK</a>
              <a className="footer-link" href="#0">Gizlilik Politikası</a>
              <a className="footer-link" href="#0">Kullanım Şartları</a>
            </div>

            <div>
              <div className="footer-title">İletişim</div>
              <a className="footer-link" href="mailto:info@ekis.com">
                <Mail size={14} style={{ verticalAlign: "middle", marginRight: 6 }} />
                info@ekis.com
              </a>
              <div className="footer-link">
                <Phone size={14} style={{ verticalAlign: "middle", marginRight: 6 }} />
                09:00 - 18:00
              </div>
            </div>
          </div>
        </footer>
      </div>

      <div className="sticky-mobile-cta">
        <Button
          variant="outline"
          onClick={() => {
            setTab("jobs");
            setTimeout(() => {
              jobsSectionRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }, 50);
          }}
        >
          <Search size={16} />
          İş Ara
        </Button>

        <Button
          onClick={() => {
            if (!currentUser) {
              setAuthMode("register");
              setAuthRole("employer");
              setShowAuthModal(true);
              return;
            }
            if (!isEmployer) {
              alert("İlan vermek için işveren hesabı kullanmalısın.");
              return;
            }
            setTab("post");
            setTimeout(() => {
              postSectionRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }, 50);
          }}
        >
          <PlusCircle size={16} />
          İlan Ver
        </Button>
      </div>
    </div>
  );
}
