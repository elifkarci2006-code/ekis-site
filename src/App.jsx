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
  CheckCircle2,
  Loader2,
  Check,
  Trash2,
  FileText,
  Phone,
  CalendarDays,
  Sparkles,
  LogIn,
  LogOut,
  UserPlus,
  Lock,
  CreditCard,
  Share2,
  Crown,
  Pencil,
  Mail,
  Users,
  ShieldCheck,
  Eye,
  Zap,
  BadgeCheck,
  Star,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const BRAND = {
  primary: "#22C55E",
  primaryDeep: "#16A34A",
  primarySoft: "#DCFCE7",
  ink: "#0f172a",
  muted: "#64748b",
  line: "#dbe7e5",
  card: "#ffffff",
  premium: "#f59e0b",
  success: "#16a34a",
  danger: "#ef4444",
  bg: "#f8fcf8",
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
  "Adana","Adıyaman","Afyonkarahisar","Ağrı","Aksaray","Amasya","Ankara","Antalya","Ardahan","Artvin","Aydın",
  "Balıkesir","Bartın","Batman","Bayburt","Bilecik","Bingöl","Bitlis","Bolu","Burdur","Bursa","Çanakkale",
  "Çankırı","Çorum","Denizli","Diyarbakır","Düzce","Edirne","Elazığ","Erzincan","Erzurum","Eskişehir",
  "Gaziantep","Giresun","Gümüşhane","Hakkari","Hatay","Iğdır","Isparta","İstanbul","İzmir","Kahramanmaraş",
  "Karabük","Karaman","Kars","Kastamonu","Kayseri","Kırıkkale","Kırklareli","Kırşehir","Kilis","Kocaeli",
  "Konya","Kütahya","Malatya","Manisa","Mardin","Mersin","Muğla","Muş","Nevşehir","Niğde","Ordu","Osmaniye",
  "Rize","Sakarya","Samsun","Siirt","Sinop","Sivas","Şanlıurfa","Şırnak","Tekirdağ","Tokat","Trabzon",
  "Tunceli","Uşak","Van","Yalova","Yozgat","Zonguldak"
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

const LEGAL_CONTENT = {
  about: {
    title: "Biz Kimiz",
    body: `ekis; günlük, saatlik, part-time ve ek iş fırsatlarını daha hızlı görünür kılmak için tasarlanmış yeni nesil bir iş platformudur. Amacımız, kısa süreli personel ihtiyacı olan işletmeler ile hızlı başvuru yapmak isteyen adayları sade ve güven veren bir deneyimde buluşturmaktır.`,
  },
  kvkk: {
    title: "KVKK Aydınlatma Metni",
    body: `ekis üzerinde paylaşılan ad, soyad, telefon, e-posta ve başvuru bilgileri; başvuru süreçlerinin yürütülmesi, kullanıcı hesaplarının yönetimi ve platform güvenliğinin sağlanması amacıyla işlenir. Kullanıcılar, platformu kullanarak gerekli kişisel verilerin ilgili süreçler kapsamında işlenmesini kabul eder.`,
  },
  privacy: {
    title: "Gizlilik Politikası",
    body: `Kullanıcı verileri yetkisiz erişime karşı korunur ve yalnızca platformun hizmet sunumu için gerekli kapsamda kullanılır. ekis, kullanıcı verilerini açık rıza veya hukuki zorunluluk bulunmadıkça üçüncü taraflara satmaz. Ödeme ve form akışları gibi bazı süreçlerde güvenilir üçüncü taraf servisler kullanılabilir.`,
  },
  terms: {
    title: "Kullanım Şartları",
    body: `Platformdaki ilanların doğruluğundan ilanı oluşturan işveren sorumludur. Adaylar, başvuru sırasında doğru bilgi paylaşmakla yükümlüdür. ekis; uygunsuz, yanıltıcı veya hukuka aykırı içerikleri kaldırma hakkını saklı tutar. Platformun kötüye kullanımı halinde hesaplar askıya alınabilir.`,
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

function isUrgentJob(job) {
  return normalizeTags(job.tags).includes("ACİL");
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
        background:linear-gradient(180deg,#fbfefb 0%, #f3fbf4 100%);
        color:var(--ink);
        font-family:Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
      }
      .page{
        min-height:100vh;
        background:
          radial-gradient(circle at top left, rgba(34,197,94,.10), transparent 26%),
          radial-gradient(circle at top right, rgba(22,163,74,.08), transparent 22%);
      }
      .container{
        width:min(1180px, calc(100% - 24px));
        margin:0 auto;
        padding:16px 0 92px;
      }
      .header{
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:16px;
        flex-wrap:wrap;
        margin-bottom:16px;
      }
      .logo{font-size:32px;font-weight:900;letter-spacing:-0.04em}
      .muted{ color:var(--muted); }
      .header-actions{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
      .card{
        background:rgba(255,255,255,.98);
        border:1px solid rgba(22,163,74,.10);
        border-radius:24px;
        padding:18px;
        box-shadow:0 14px 36px rgba(15,23,42,.05);
      }
      .hero-shell{display:grid;gap:16px;margin-bottom:16px}
      .hero-compact{
        padding:22px;
        display:grid;
        gap:16px;
      }
      .eyebrow{
        display:inline-flex;align-items:center;gap:8px;
        padding:8px 12px;border-radius:999px;
        background:var(--primary-soft);border:1px solid rgba(34,197,94,.20);
        font-size:12px;font-weight:900;color:#166534;width:max-content;
      }
      .hero-title{
        margin:0;
        font-size:clamp(28px, 4vw, 46px);
        line-height:1.02;
        letter-spacing:-0.04em;
        max-width:740px;
      }
      .hero-title span{color:var(--primary-deep)}
      .hero-sub{max-width:760px;color:#334155;line-height:1.65;margin:0}
      .quick-actions{display:flex;gap:10px;flex-wrap:wrap}
      .quick-note{display:flex;gap:14px;flex-wrap:wrap;color:#475569;font-size:13px;font-weight:700}
      .search-panel{
        display:grid;
        gap:12px;
        padding:16px;
        border-radius:22px;
        background:linear-gradient(180deg,#ffffff 0%, #f7fcf7 100%);
        border:1px solid rgba(22,163,74,.12);
      }
      .search-grid{
        display:grid;
        grid-template-columns:2.2fr 1fr 1fr auto;
        gap:10px;
      }
      .mini-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
      .stat-card{padding:16px;border-radius:20px;border:1px solid rgba(15,23,42,.06);background:#fff}
      .stat-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
      .stat-value{font-size:28px;font-weight:900;letter-spacing:-0.03em}
      .tabs{display:flex;gap:10px;flex-wrap:wrap;margin:16px 0}
      .tab{border:none;background:#fff;border:1px solid rgba(15,23,42,.08);border-radius:14px;padding:11px 14px;font-weight:800;color:var(--ink);cursor:pointer}
      .tab.active{background:var(--ink);color:#fff;border-color:var(--ink)}
      .filters-grid{display:grid;grid-template-columns:300px 1fr;gap:16px;align-items:start}
      .filter-panel{position:sticky;top:14px}
      .filter-stack,.section-stack,.panel-list{display:grid;gap:12px}
      .search-wrap{position:relative}
      .search-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--muted)}
      .input, .textarea, select{
        width:100%;border:1px solid var(--line);background:#fff;color:var(--ink);border-radius:16px;
        padding:13px 14px;font-size:14px;outline:none;transition:.18s ease;
      }
      .input{min-height:48px}
      .search-wrap .input{padding-left:38px}
      .textarea{min-height:120px;resize:vertical}
      .input:focus, .textarea:focus, select:focus{border-color:var(--primary);box-shadow:0 0 0 4px rgba(34,197,94,.12)}
      .btn{
        border:none;min-height:48px;border-radius:16px;padding:12px 16px;font-weight:900;font-size:14px;
        display:inline-flex;align-items:center;justify-content:center;gap:8px;cursor:pointer;transition:.18s ease;
      }
      .btn:disabled{opacity:.6;cursor:not-allowed}
      .btn-solid{background:linear-gradient(180deg,var(--primary) 0%, var(--primary-deep) 100%);color:#052e16;box-shadow:0 10px 24px rgba(22,163,74,.20)}
      .btn-outline{background:#fff;color:var(--ink);border:1px solid rgba(15,23,42,.10)}
      .badge{display:inline-flex;align-items:center;gap:6px;padding:7px 10px;border-radius:999px;font-size:12px;font-weight:900;line-height:1}
      .badge.default,.badge.soft{background:#f6fcf6;color:#166534;border:1px solid rgba(34,197,94,.16)}
      .badge.secondary{background:#eef2ff;color:#3730a3;border:1px solid #c7d2fe}
      .premium-badge{background:rgba(245,158,11,.12);color:#b45309;border:1px solid rgba(245,158,11,.28)}
      .pending{background:rgba(239,68,68,.10);color:#b91c1c;border:1px solid rgba(239,68,68,.18)}
      .featured-tag{background:rgba(34,197,94,.12);color:#166534;border:1px solid rgba(34,197,94,.24)}
      .live-badge{background:#effcf3;color:#166534;border:1px solid rgba(34,197,94,.20)}
      .section-head{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}
      .section-head h2{margin:0 0 4px;font-size:24px;letter-spacing:-0.03em}
      .result-wrap{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
      .job-list{display:grid;gap:14px}
      .job-card{overflow:hidden}
      .featured-card{border-color:rgba(245,158,11,.28);box-shadow:0 16px 36px rgba(245,158,11,.08)}
      .job-layout{display:grid;grid-template-columns:1fr auto;gap:14px;align-items:start}
      .job-top{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:8px}
      .job-top h3{margin:0;font-size:22px;letter-spacing:-0.03em}
      .company{color:var(--ink);font-weight:800;margin-bottom:8px}
      .meta-row{display:flex;gap:12px;flex-wrap:wrap;color:var(--muted);font-size:13px;margin-bottom:10px}
      .meta-row span{display:inline-flex;align-items:center;gap:6px}
      .description{margin:0 0 10px;color:#334155;line-height:1.6}
      .tags{display:flex;gap:8px;flex-wrap:wrap}
      .job-actions{display:grid;gap:10px;min-width:190px}
      .salary-highlight{font-size:18px;font-weight:900;color:var(--success)}
      .form-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
      .full{grid-column:1 / -1}
      .action-row{display:flex;gap:10px;flex-wrap:wrap;margin-top:6px}
      .dashboard-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
      .panel-row{padding:14px;border-radius:18px;border:1px solid rgba(15,23,42,.08);background:#fbfdfd}
      .premium-plan-box{padding:16px;border-radius:20px;background:linear-gradient(180deg,#fbfffe 0%, #f3fcf4 100%);border:1px solid rgba(34,197,94,.18);margin-bottom:16px}
      .premium-plan-head{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:10px}
      .premium-plan-title{display:flex;align-items:center;gap:8px;font-weight:900}
      .premium-plan-price{font-size:28px;font-weight:900;letter-spacing:-0.03em;color:var(--primary-deep);margin-bottom:6px}
      .role-switch{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px}
      .role-pill{border:1px solid rgba(15,23,42,.08);background:#fff;border-radius:14px;padding:10px 12px;font-weight:900;cursor:pointer;text-align:center}
      .role-pill.active{background:var(--primary-soft);border-color:rgba(34,197,94,.26);color:#166534}
      .modal-backdrop{position:fixed;inset:0;background:rgba(2,8,23,.48);backdrop-filter: blur(6px);display:grid;place-items:center;z-index:50;padding:18px}
      .modal{width:min(760px, 100%);max-height:88vh;overflow:auto;background:#fff;border-radius:26px;padding:22px;box-shadow:0 30px 60px rgba(15,23,42,.25)}
      .modal.compact{width:min(560px, 100%);padding:18px}
      .modal h2{margin:0 0 14px;font-size:28px;letter-spacing:-0.03em}
      .job-preview{padding:14px;border-radius:18px;background:#f8fff8;border:1px solid rgba(34,197,94,.15);margin-bottom:14px}
      .preview-title{font-weight:900;margin-bottom:4px}
      .success-box{padding:16px;border-radius:18px;background:#effcf3;border:1px solid rgba(34,197,94,.20)}
      .success-title{display:flex;align-items:center;gap:8px;font-weight:900;color:#166534;margin-bottom:8px}
      .footer{margin-top:18px;padding:22px;border-radius:22px;background:#f9fdf9;border:1px solid rgba(15,23,42,.06);color:#475569}
      .footer-grid{display:grid;grid-template-columns:1.2fr .9fr .9fr .9fr;gap:16px;margin-top:8px}
      .footer-title{font-weight:900;margin-bottom:8px}
      .footer-link{display:block;color:#334155;text-decoration:none;margin:6px 0;background:none;border:none;padding:0;cursor:pointer;font:inherit;text-align:left}
      .footer-link:hover{color:var(--primary-deep)}
      .sticky-mobile-cta{display:none}
      .spin{animation:spin 1s linear infinite}
      @keyframes spin { to{transform:rotate(360deg)} }
      @media (max-width: 1100px){
        .filters-grid,.dashboard-grid,.footer-grid,.mini-stats{grid-template-columns:1fr}
        .filter-panel{position:static}
      }
      @media (max-width: 760px){
        .container{ width:min(100% - 16px, 100%); }
        .search-grid,.form-grid,.job-layout{ grid-template-columns:1fr; }
        .job-actions{min-width:0;grid-template-columns:1fr 1fr}
        .action-row .btn,.job-actions .btn{width:100%}
        .sticky-mobile-cta{display:flex;gap:10px;position:fixed;left:12px;right:12px;bottom:12px;z-index:30}
        .sticky-mobile-cta .btn{flex:1;min-height:54px;border-radius:18px}
      }
    `}</style>
  );
}

function Card({ children, className = "" }) {
  return <div className={`card ${className}`}>{children}</div>;
}
function Badge({ children, variant = "default", className = "" }) {
  return <span className={`badge ${variant} ${className}`}>{children}</span>;
}
function Button({ children, variant = "solid", className = "", ...props }) {
  return (
    <button
      className={`btn ${variant === "outline" ? "btn-outline" : "btn-solid"} ${className}`}
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
    <select className="input" value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
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
    <div className="stat-card">
      <div className="stat-head">
        <div className="muted">{label}</div>
        {Icon ? <Icon size={16} /> : null}
      </div>
      <div className="stat-value">{value}</div>
    </div>
  );
}

function JobCard({ job, onApply, onView, applicationsCount = 0, onShare }) {
  const remainingDays = getRemainingDays(job);
  const urgent = isUrgentJob(job);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <Card className={`job-card ${job.featured ? "featured-card" : ""}`}>
        <div className="job-layout">
          <div>
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
              <span><MapPin size={15} /> {job.city} / {job.district || "-"}</span>
              <span><Clock3 size={15} /> {job.hours || "-"}</span>
              <span className="salary-highlight"><Wallet size={15} /> {job.pay || "-"}</span>
              <span><CalendarDays size={15} /> {formatDate(job.created_at)}</span>
              <span><Users size={15} /> {applicationsCount} başvuru</span>
            </div>

            <p className="description">{job.description}</p>

            <div className="tags">
              {normalizeTags(job.tags).map((tag) => (
                <Badge key={tag} className="soft">{tag}</Badge>
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
            <Button onClick={() => onApply(job)}>
              <Zap size={16} /> Hızlı Başvur
            </Button>
            <Button variant="outline" onClick={() => onView(job)}>
              <Eye size={16} /> Detayı Gör
            </Button>
            <Button variant="outline" onClick={() => onShare(job)}>
              <Share2 size={16} /> Paylaş
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function App() {
  const [jobs, setJobs] = useState(initialJobs);
  const [applications, setApplications] = useState([]);
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
  const [savingJob, setSavingJob] = useState(false);
  const [sendingApplication, setSendingApplication] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [dbStatus, setDbStatus] = useState(
    supabase ? "Supabase bağlı" : "Demo modunda çalışıyor"
  );
  const [legalModal, setLegalModal] = useState(null);

  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem("ekis_user_session");
    return stored ? JSON.parse(stored) : null;
  });

  const [candidateApplications, setCandidateApplications] = useState([]);
  const [authMode, setAuthMode] = useState("login");
  const [authRole, setAuthRole] = useState("candidate");
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

  const isSuperAdmin = useMemo(
    () => (currentUser?.email ? SUPER_ADMIN_EMAILS.includes(currentUser.email) : false),
    [currentUser]
  );
  const isEmployer = currentUser?.role === "employer" || isSuperAdmin;

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
        setCandidateApplications(getStoredCandidateApplications(currentUser.email));
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
      if (stored) setJobs(JSON.parse(stored));
      return;
    }

    setLoadingJobs(true);
    const { data, error } = await supabase.from("jobs").select("*").order("created_at", { ascending: false });
    setLoadingJobs(false);

    if (error) {
      console.error(error);
      setDbStatus("Bağlantı var ama jobs tablosu eksik");
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
    setDbStatus("Supabase bağlı");
  }

  async function loadApplications() {
    if (!supabase) {
      const stored = localStorage.getItem("ekis_demo_applications");
      if (stored) setApplications(JSON.parse(stored));
      return;
    }

    setLoadingApplications(true);
    const { data, error } = await supabase.from("applications").select("*").order("created_at", { ascending: false });
    setLoadingApplications(false);
    if (error) {
      console.error(error);
      return;
    }
    setApplications(data || []);
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
      setAuthForm({ full_name: "", company_name: "", email: "", password: "", phone: "" });
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
    setAuthForm({ full_name: "", company_name: "", email: "", password: "", phone: "" });
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
    setAuthForm({ full_name: "", company_name: "", email: "", password: "", phone: "" });
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
    try {
      if (navigator.share) {
        await navigator.share({ title: `${job.title} - ${job.company}`, text: `${job.title} ilanına göz at`, url: shareUrl });
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
        const urgentMatch = urgentOnly ? isUrgentJob(job) : true;
        return searchMatch && cityMatch && typeMatch && urgentMatch;
      })
      .sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        if (isUrgentJob(a) !== isUrgentJob(b)) return isUrgentJob(a) ? -1 : 1;
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

  const superAdminStats = useMemo(() => {
    const totalJobs = jobs.length;
    const totalApplications = applications.length;
    const totalEmployers = [...new Set(jobs.map((job) => job.employer_email).filter(Boolean))].length;
    const paymentWaiting = jobs.filter((job) => job.package_type === "premium" && job.payment_status === "waiting_payment").length;
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
    const tags = buildTags(["Yeni ilan"], jobForm.urgent, jobForm.package_type, "pending");

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
      setJobs((prev) => prev.map((job) => (job.id === jobId ? { ...job, payment_status: "paid" } : job)));
      return;
    }

    setActionLoadingId(jobId);
    const { error } = await supabase.from("jobs").update({ payment_status: "paid" }).eq("id", jobId);
    setActionLoadingId(null);
    if (error) {
      console.error(error);
      return;
    }
    setJobs((prev) => prev.map((job) => (job.id === jobId ? { ...job, payment_status: "paid" } : job)));
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
      const existing = JSON.parse(localStorage.getItem("ekis_demo_applications") || "[]");
      const next = [{ id: Date.now(), ...payload }, ...existing];
      localStorage.setItem("ekis_demo_applications", JSON.stringify(next));
      setApplications(next);

      if (currentUser?.email && currentUser.role === "candidate") {
        const existingMine = getStoredCandidateApplications(currentUser.email);
        const nextMine = [{ id: Date.now(), ...payload, jobTitle: appliedJob.title, company: appliedJob.company, city: appliedJob.city }, ...existingMine];
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
      .insert({ job_id: appliedJob.id, full_name: applicationForm.full_name, phone: applicationForm.phone, note: applicationForm.note })
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
      const nextMine = [{ ...data, email: currentUser.email, jobTitle: appliedJob.title, company: appliedJob.company, city: appliedJob.city }, ...existingMine];
      saveStoredCandidateApplications(currentUser.email, nextMine);
      setCandidateApplications(nextMine);
    }

    setApplicationSent(true);
    setApplicationForm({ full_name: "", phone: "", note: "" });
  }

  async function handleApproveJob(jobId) {
    const selected = jobs.find((job) => job.id === jobId);
    if (!selected) return;
    if (selected.package_type === "premium" && selected.payment_status !== "paid") {
      alert("Premium ilanı yayına almadan önce ödeme durumu paid olmalı.");
      return;
    }

    const updatedTags = buildTags(selected.tags, isUrgentJob(selected), selected.package_type, "active");

    if (!supabase) {
      const next = jobs.map((job) => (job.id === jobId ? { ...job, status: "active", tags: updatedTags } : job));
      setJobs(next);
      localStorage.setItem("ekis_demo_jobs", JSON.stringify(next));
      return;
    }

    setActionLoadingId(jobId);
    const { error } = await supabase.from("jobs").update({ status: "active", tags: updatedTags }).eq("id", jobId);
    setActionLoadingId(null);
    if (error) {
      console.error(error);
      return;
    }
    setJobs((prev) => prev.map((job) => (job.id === jobId ? { ...job, status: "active", tags: updatedTags } : job)));
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
      urgent: isUrgentJob(job),
    });
  }

  async function handleSaveEditJob() {
    if (!editingJob) return;
    if (!editForm.title || !editForm.company || !editForm.city) {
      alert("Lütfen zorunlu alanları doldur.");
      return;
    }

    const selectedPackage = PACKAGE_OPTIONS[editForm.package_type];
    const updatedTags = buildTags(editingJob.tags, editForm.urgent, editForm.package_type, editForm.status);

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
      const next = jobs.map((job) => (job.id === editingJob.id ? { ...job, ...payload } : job));
      setJobs(next);
      localStorage.setItem("ekis_demo_jobs", JSON.stringify(next));
      setEditingJob(null);
      return;
    }

    setActionLoadingId(editingJob.id);
    const { error } = await supabase.from("jobs").update(payload).eq("id", editingJob.id);
    setActionLoadingId(null);
    if (error) {
      console.error(error);
      return;
    }
    setJobs((prev) => prev.map((job) => (job.id === editingJob.id ? { ...job, ...payload } : job)));
    setEditingJob(null);
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
            <div className="muted">Günlük, saatlik ve ek iş ilanları için sade ve hızlı platform</div>
          </div>

          <div className="header-actions">
            <Badge className="live-badge">{dbStatus}</Badge>
            {currentUser ? (
              <>
                {isSuperAdmin ? (
                  <Badge className="premium-badge"><Crown size={13} /> Süper Admin</Badge>
                ) : null}
                <Badge className="soft">
                  {isEmployer ? currentUser.company_name || currentUser.email : currentUser.full_name || currentUser.email}
                </Badge>
                <Button variant="outline" onClick={() => setTab("jobs")}><Search size={16} /> İş Ara</Button>
                {isEmployer ? (
                  <Button onClick={() => setTab("post")}><PlusCircle size={16} /> İlan Ver</Button>
                ) : null}
                <Button variant="outline" onClick={() => setTab("profile")}><User size={16} /> Profil</Button>
                {(isEmployer || isSuperAdmin) ? (
                  <Button variant="outline" onClick={() => setTab("dashboard")}><FileText size={16} /> Panel</Button>
                ) : null}
                {isSuperAdmin ? (
                  <Button variant="outline" onClick={() => setTab("superadmin")}><ShieldCheck size={16} /> Admin</Button>
                ) : null}
                <Button variant="outline" onClick={handleLogout}><LogOut size={16} /> Çıkış</Button>
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
                ><LogIn size={16} /> Giriş</Button>
                <Button
                  onClick={() => {
                    setAuthMode("register");
                    setAuthRole("candidate");
                    setShowAuthModal(true);
                    setAuthMessage("");
                  }}
                ><UserPlus size={16} /> Üye Ol</Button>
              </>
            )}
          </div>
        </header>

        <section className="hero-shell">
          <Card className="hero-compact">
            <div className="eyebrow"><BadgeCheck size={14} /> CV’siz hızlı başvuru deneyimi</div>
            <h1 className="hero-title">İçeri girer girmez <span>iş bul, filtrele, başvur.</span></h1>
            <p className="hero-sub">
              Uzun açıklamalara boğulmadan günlük, saatlik, part-time ve ek iş ilanlarını tek ekranda gör.
              İşverenler için hızlı ilan verme, adaylar için sade başvuru akışı.
            </p>

            <div className="search-panel">
              <div className="search-grid">
                <div className="search-wrap">
                  <Search size={18} className="search-icon" />
                  <Input
                    placeholder="Pozisyon, firma, şehir veya etiket ara"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <SelectField
                  value={city}
                  onChange={setCity}
                  options={[{ value: "all", label: "Tüm şehirler" }, ...TURKEY_CITIES.map((item) => ({ value: item, label: item }))]}
                />
                <SelectField
                  value={type}
                  onChange={setType}
                  options={[{ value: "all", label: "Tüm iş tipleri" }, ...types.map((item) => ({ value: item, label: item }))]}
                />
                <Button onClick={() => jobsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}>
                  <Filter size={16} /> Filtrele
                </Button>
              </div>

              <div className="quick-actions">
                <Button
                  onClick={() => {
                    setTab("jobs");
                    jobsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  <Search size={16} /> İş Bul
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (!isEmployer) {
                      setAuthMode(currentUser ? "login" : "register");
                      setAuthRole("employer");
                      setShowAuthModal(true);
                    } else {
                      setTab("post");
                      postSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                >
                  <Building2 size={16} /> İş Ver
                </Button>
              </div>

              <div className="quick-note">
                <span>• Günlük işler</span>
                <span>• Saatlik işler</span>
                <span>• Ek iş fırsatları</span>
                <span>• Premium ilan seçeneği</span>
              </div>
            </div>
          </Card>

          <div className="mini-stats">
            <Stat label="Aktif ilan" value={filteredJobs.length} icon={Briefcase} />
            <Stat label="Toplam başvuru" value={applications.length} icon={Users} />
            <Stat label="Premium ilan" value={jobs.filter((job) => job.package_type === "premium").length} icon={Star} />
            <Stat label="Bugün eklenen" value={jobs.filter((job) => isNewJob(job)).length} icon={CalendarDays} />
          </div>
        </section>

        <div className="tabs">
          <button className={`tab ${tab === "jobs" ? "active" : ""}`} onClick={() => setTab("jobs")}>İlanlar</button>
          {isEmployer ? (
            <button className={`tab ${tab === "post" ? "active" : ""}`} onClick={() => setTab("post")}>İlan Ver</button>
          ) : null}
          {(isEmployer || isSuperAdmin) ? (
            <button className={`tab ${tab === "dashboard" ? "active" : ""}`} onClick={() => setTab("dashboard")}>İşveren Paneli</button>
          ) : null}
          {currentUser ? (
            <button className={`tab ${tab === "profile" ? "active" : ""}`} onClick={() => setTab("profile")}>Profil</button>
          ) : null}
          {isSuperAdmin ? (
            <button className={`tab ${tab === "superadmin" ? "active" : ""}`} onClick={() => setTab("superadmin")}>Admin</button>
          ) : null}
        </div>

        {tab === "jobs" && (
          <section ref={jobsSectionRef} className="filters-grid">
            <aside className="filter-panel">
              <Card>
                <div className="section-head">
                  <div>
                    <h2>Filtreler</h2>
                    <div className="muted">İstediğin işe daha hızlı ulaş.</div>
                  </div>
                </div>
                <div className="filter-stack" style={{ marginTop: 12 }}>
                  <div className="search-wrap">
                    <Search size={18} className="search-icon" />
                    <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Ara" />
                  </div>
                  <SelectField
                    value={city}
                    onChange={setCity}
                    options={[{ value: "all", label: "Tüm şehirler" }, ...TURKEY_CITIES.map((item) => ({ value: item, label: item }))]}
                  />
                  <SelectField
                    value={type}
                    onChange={setType}
                    options={[{ value: "all", label: "Tüm iş tipleri" }, ...types.map((item) => ({ value: item, label: item }))]}
                  />
                  <label style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 800 }}>
                    <input type="checkbox" checked={urgentOnly} onChange={(e) => setUrgentOnly(e.target.checked)} />
                    Sadece acil ilanlar
                  </label>
                  <Button variant="outline" onClick={() => { setSearch(""); setCity("all"); setType("all"); setUrgentOnly(false); }}>
                    Filtreleri Temizle
                  </Button>
                </div>
              </Card>
            </aside>

            <div className="section-stack">
              <Card>
                <div className="section-head">
                  <div>
                    <h2>İş ilanları</h2>
                    <div className="muted">Siteye girer girmez odak burada olsun diye ana alan sadeleştirildi.</div>
                  </div>
                  <div className="result-wrap">
                    <Badge className="soft">{filteredJobs.length} sonuç</Badge>
                    {shareMessage ? <Badge className="featured-tag">{shareMessage}</Badge> : null}
                    {loadingJobs ? <Badge className="soft"><Loader2 size={13} className="spin" /> Yükleniyor</Badge> : null}
                  </div>
                </div>
              </Card>

              <div className="job-list">
                {filteredJobs.length === 0 ? (
                  <Card>
                    <div style={{ fontWeight: 900, marginBottom: 8 }}>Sonuç bulunamadı</div>
                    <div className="muted">Arama veya filtreleri değiştirip tekrar dene.</div>
                  </Card>
                ) : (
                  filteredJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onApply={handleOpenApply}
                      onView={setSelectedJob}
                      onShare={handleShareJob}
                      applicationsCount={applicationsByJobId[String(job.id)] || 0}
                    />
                  ))
                )}
              </div>
            </div>
          </section>
        )}

        {tab === "post" && isEmployer && (
          <section ref={postSectionRef} className="dashboard-grid">
            <Card>
              <h2 style={{ marginTop: 0 }}>Yeni ilan oluştur</h2>
              <div className="muted" style={{ marginBottom: 16 }}>Kısa süreli işini hızlıca yayınla.</div>
              <div className="form-grid">
                <div><Label required>Pozisyon</Label><Input value={jobForm.title} onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })} /></div>
                <div><Label required>Firma</Label><Input value={jobForm.company} onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })} /></div>
                <div><Label required>Şehir</Label><SelectField value={jobForm.city} onChange={(value) => setJobForm({ ...jobForm, city: value })} options={[{ value: "", label: "Şehir seç" }, ...TURKEY_CITIES.map((item) => ({ value: item, label: item }))]} /></div>
                <div><Label>İlçe</Label><Input value={jobForm.district} onChange={(e) => setJobForm({ ...jobForm, district: e.target.value })} /></div>
                <div><Label required>İş tipi</Label><SelectField value={jobForm.type} onChange={(value) => setJobForm({ ...jobForm, type: value })} options={[{ value: "Part-time", label: "Part-time" }, { value: "Günlük iş", label: "Günlük iş" }, { value: "Saatlik iş", label: "Saatlik iş" }, { value: "Ek iş", label: "Ek iş" }]} /></div>
                <div><Label required>Ücret</Label><Input value={jobForm.pay} onChange={(e) => setJobForm({ ...jobForm, pay: e.target.value })} placeholder="Örn: Saatlik 200 TL" /></div>
                <div><Label>Saat aralığı</Label><Input value={jobForm.hours} onChange={(e) => setJobForm({ ...jobForm, hours: e.target.value })} placeholder="Örn: 10:00 - 18:00" /></div>
                <div><Label>Paket</Label><SelectField value={jobForm.package_type} onChange={(value) => setJobForm({ ...jobForm, package_type: value })} options={[{ value: "standard", label: "Standart" }, { value: "premium", label: "Premium" }]} /></div>
                <div className="full"><Label required>Açıklama</Label><Textarea value={jobForm.description} onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })} /></div>
                <div className="full">
                  <label style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 800 }}>
                    <input type="checkbox" checked={jobForm.urgent} onChange={(e) => setJobForm({ ...jobForm, urgent: e.target.checked })} />
                    Acil ilan olarak işaretle
                  </label>
                </div>
              </div>
              <div className="action-row" style={{ marginTop: 14 }}>
                <Button onClick={handlePublish} disabled={savingJob}>
                  {savingJob ? <Loader2 size={16} className="spin" /> : <PlusCircle size={16} />}
                  {savingJob ? "Kaydediliyor" : "İlanı Oluştur"}
                </Button>
                {jobForm.package_type === "premium" ? (
                  <Button variant="outline" onClick={() => window.open(SHOPIER_PAYMENT_URL, "_blank") }>
                    <CreditCard size={16} /> Ödeme Linki
                  </Button>
                ) : null}
              </div>
            </Card>

            <Card>
              <div className="premium-plan-box">
                <div className="premium-plan-head">
                  <div className="premium-plan-title"><Sparkles size={18} /> Seçili paket</div>
                  <Badge className={jobForm.package_type === "premium" ? "premium-badge" : "soft"}>{selectedPackage.label}</Badge>
                </div>
                <div className="premium-plan-price">{selectedPackage.price}</div>
                <div className="muted" style={{ lineHeight: 1.7 }}>{selectedPackage.note}</div>
              </div>
              <h2 style={{ marginTop: 0 }}>Yayın akışı</h2>
              <div className="panel-list">
                <div className="panel-row"><strong>1.</strong> İlan oluşturulur.</div>
                <div className="panel-row"><strong>2.</strong> Premium ise ödeme beklenir.</div>
                <div className="panel-row"><strong>3.</strong> Onay sonrası ilan yayına alınır.</div>
                <div className="panel-row"><strong>4.</strong> Aday başvuruları panelden görüntülenir.</div>
              </div>
            </Card>
          </section>
        )}

        {tab === "dashboard" && (isEmployer || isSuperAdmin) && (
          <section className="dashboard-grid">
            <Card>
              <div className="section-head">
                <div>
                  <h2>İlanların</h2>
                  <div className="muted">Oluşturduğun ilanları buradan yönet.</div>
                </div>
                <Badge className="soft">{myJobs.length} ilan</Badge>
              </div>

              <div className="panel-list" style={{ marginTop: 12 }}>
                {myJobs.length === 0 ? (
                  <div className="panel-row muted">Henüz ilan yok.</div>
                ) : (
                  myJobs.map((job) => (
                    <div key={job.id} className="panel-row" style={{ alignItems: "flex-start", flexDirection: "column", gap: 8 }}>
                      <div style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                        <strong>{job.title}</strong>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          <Badge className={job.status === "active" ? "soft" : "pending"}>{job.status}</Badge>
                          {job.package_type === "premium" ? <Badge className="premium-badge">Premium</Badge> : <Badge className="soft">Standart</Badge>}
                          {job.payment_status === "waiting_payment" ? <Badge className="pending">ödeme bekleniyor</Badge> : job.payment_status === "paid" ? <Badge className="soft">ödeme tamam</Badge> : null}
                        </div>
                      </div>

                      <div className="muted">{job.company}</div>
                      <div className="muted">{job.city} / {job.district || "-"}</div>

                      <div className="action-row">
                        <Button variant="outline" onClick={() => openEditJob(job)}><Pencil size={16} /> Düzenle</Button>
                        {job.package_type === "premium" && job.payment_status === "waiting_payment" ? (
                          <Button onClick={() => handleMarkPaid(job.id)} disabled={actionLoadingId === job.id}><CreditCard size={16} /> Ödemeyi Onayla</Button>
                        ) : null}
                        {job.status !== "active" && (job.package_type === "standard" || job.payment_status === "paid") ? (
                          <Button onClick={() => handleApproveJob(job.id)} disabled={actionLoadingId === job.id}><Check size={16} /> Yayına Al</Button>
                        ) : null}
                        <Button variant="outline" onClick={() => handleDeleteJob(job.id)} disabled={actionLoadingId === job.id}><Trash2 size={16} /> Sil</Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>

            <Card>
              <div className="section-head">
                <div>
                  <h2>Başvurular</h2>
                  <div className="muted">Mesajlaşma kaldırıldı; sadece başvuru bilgileri gösterilir.</div>
                </div>
                {loadingApplications ? <Badge className="soft"><Loader2 size={13} className="spin" /> Yükleniyor</Badge> : null}
              </div>

              <div className="panel-list" style={{ marginTop: 12 }}>
                {employerApplications.length === 0 ? (
                  <div className="panel-row muted">Henüz başvuru yok.</div>
                ) : (
                  employerApplications.map((app) => (
                    <div key={app.id} className="panel-row">
                      <div style={{ fontWeight: 900, marginBottom: 6 }}>{app.jobTitle}</div>
                      <div className="muted" style={{ marginBottom: 8 }}>{app.full_name} • {app.phone}</div>
                      <div className="muted" style={{ marginBottom: 8 }}>{app.company} / {app.city}</div>
                      {app.note ? <div style={{ color: "#334155", lineHeight: 1.6 }}>{app.note}</div> : null}
                    </div>
                  ))
                )}
              </div>
            </Card>
          </section>
        )}

        {tab === "profile" && currentUser && (
          <section className="dashboard-grid">
            <Card>
              <h2 style={{ marginTop: 0 }}>Profilim</h2>
              <div className="form-grid">
                <div><Label required>Ad soyad</Label><Input value={profileForm.full_name} onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })} /></div>
                <div><Label required>E-posta</Label><Input value={profileForm.email} disabled /></div>
                <div><Label>Telefon</Label><Input value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} /></div>
                {isEmployer ? (
                  <div><Label>Firma adı</Label><Input value={profileForm.company_name} onChange={(e) => setProfileForm({ ...profileForm, company_name: e.target.value })} /></div>
                ) : null}
              </div>
              <div className="action-row" style={{ marginTop: 14 }}>
                <Button onClick={handleSaveProfile}><CheckCircle2 size={16} /> Kaydet</Button>
              </div>
            </Card>

            <Card>
              <h2 style={{ marginTop: 0 }}>Başvurularım</h2>
              <div className="panel-list">
                {candidateApplications.length === 0 ? (
                  <div className="panel-row muted">Henüz başvuru yok.</div>
                ) : (
                  candidateApplications.map((app) => (
                    <div key={app.id} className="panel-row">
                      <div style={{ fontWeight: 900 }}>{app.jobTitle || `İlan #${app.job_id}`}</div>
                      <div className="muted">{app.company || "-"} / {app.city || "-"}</div>
                      <div className="muted">{formatDate(app.created_at)}</div>
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
              <h2 style={{ marginTop: 0 }}>Genel özet</h2>
              <div className="mini-stats">
                <Stat label="Toplam ilan" value={superAdminStats.totalJobs} icon={Briefcase} />
                <Stat label="Toplam başvuru" value={superAdminStats.totalApplications} icon={Users} />
                <Stat label="İşveren" value={superAdminStats.totalEmployers} icon={Building2} />
                <Stat label="Ödeme bekleyen" value={superAdminStats.paymentWaiting} icon={CreditCard} />
              </div>
            </Card>
            <Card>
              <h2 style={{ marginTop: 0 }}>Yönetim notu</h2>
              <div className="muted" style={{ lineHeight: 1.7 }}>
                Bu sürümde kullanıcılar arası mesajlaşma bilinçli olarak kaldırıldı. Platform odağı; ilan görüntüleme,
                başvuru toplama, ödeme akışı ve temel işveren yönetimi olarak bırakıldı.
              </div>
            </Card>
          </section>
        )}

        <footer className="footer">
          <div className="footer-grid">
            <div>
              <div className="footer-title">ekis</div>
              <div className="muted" style={{ lineHeight: 1.7 }}>
                CV’siz, hızlı ve sade başvuru deneyimi sunan kısa süreli iş platformu.
              </div>
            </div>

            <div>
              <div className="footer-title">Platform</div>
              <button className="footer-link" onClick={() => setTab("jobs")}>İş Bul</button>
              <button className="footer-link" onClick={() => setTab("post")}>İş Ver</button>
              <button className="footer-link" onClick={() => setLegalModal("about")}>Biz Kimiz</button>
            </div>

            <div>
              <div className="footer-title">Güven & Yasal</div>
              <button className="footer-link" onClick={() => setLegalModal("kvkk")}>KVKK</button>
              <button className="footer-link" onClick={() => setLegalModal("privacy")}>Gizlilik Politikası</button>
              <button className="footer-link" onClick={() => setLegalModal("terms")}>Kullanım Şartları</button>
            </div>

            <div>
              <div className="footer-title">İletişim</div>
              <a className="footer-link" href="mailto:info@ekis.com"><Mail size={14} style={{ verticalAlign: "middle", marginRight: 6 }} /> info@ekis.com</a>
              <div className="footer-link"><Phone size={14} style={{ verticalAlign: "middle", marginRight: 6 }} /> 09:00 - 18:00</div>
            </div>
          </div>
        </footer>
      </div>

      <div className="sticky-mobile-cta">
        <Button variant="outline" onClick={() => setTab("jobs")}><Search size={16} /> İş Bul</Button>
        <Button onClick={() => setTab(isEmployer ? "post" : "jobs")}><PlusCircle size={16} /> {isEmployer ? "İlan Ver" : "Başvur"}</Button>
      </div>

      {selectedJob ? (
        <div className="modal-backdrop" onClick={() => setSelectedJob(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedJob.title}</h2>
            <div className="job-preview">
              <div className="preview-title">{selectedJob.company}</div>
              <div className="meta-row">
                <span><MapPin size={15} /> {selectedJob.city} / {selectedJob.district || "-"}</span>
                <span><Clock3 size={15} /> {selectedJob.hours || "-"}</span>
                <span><Wallet size={15} /> {selectedJob.pay || "-"}</span>
              </div>
              <p className="description" style={{ marginBottom: 0 }}>{selectedJob.description}</p>
            </div>
            <div className="action-row">
              <Button onClick={() => { setSelectedJob(null); handleOpenApply(selectedJob); }}><Zap size={16} /> Başvur</Button>
              <Button variant="outline" onClick={() => handleShareJob(selectedJob)}><Share2 size={16} /> Paylaş</Button>
              <Button variant="outline" onClick={() => setSelectedJob(null)}>Kapat</Button>
            </div>
          </div>
        </div>
      ) : null}

      {appliedJob ? (
        <div className="modal-backdrop" onClick={() => setAppliedJob(null)}>
          <div className="modal compact" onClick={(e) => e.stopPropagation()}>
            <h2>Başvuru yap</h2>
            <div className="job-preview">
              <div className="preview-title">{appliedJob.title}</div>
              <div className="muted">{appliedJob.company}</div>
            </div>

            {applicationSent ? (
              <div className="success-box">
                <div className="success-title"><CheckCircle2 size={18} /> Başvurun alındı</div>
                <div className="muted">İşveren, panel üzerinden başvurunu görüntüleyebilir.</div>
              </div>
            ) : (
              <>
                <div className="form-grid">
                  <div className="full"><Label required>Ad soyad</Label><Input value={applicationForm.full_name} onChange={(e) => setApplicationForm({ ...applicationForm, full_name: e.target.value })} /></div>
                  <div className="full"><Label required>Telefon</Label><Input value={applicationForm.phone} onChange={(e) => setApplicationForm({ ...applicationForm, phone: e.target.value })} /></div>
                  <div className="full"><Label>Not</Label><Textarea value={applicationForm.note} onChange={(e) => setApplicationForm({ ...applicationForm, note: e.target.value })} placeholder="Kısa bir not bırakabilirsin" /></div>
                </div>
                <div className="action-row" style={{ marginTop: 14 }}>
                  <Button onClick={handleApplicationSubmit} disabled={sendingApplication}>
                    {sendingApplication ? <Loader2 size={16} className="spin" /> : <CheckCircle2 size={16} />}
                    {sendingApplication ? "Gönderiliyor" : "Başvuruyu Gönder"}
                  </Button>
                  <Button variant="outline" onClick={() => setAppliedJob(null)}>Kapat</Button>
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}

      {showAuthModal ? (
        <div className="modal-backdrop" onClick={() => setShowAuthModal(false)}>
          <div className="modal compact" onClick={(e) => e.stopPropagation()}>
            <h2>{authMode === "login" ? "Giriş Yap" : "Kayıt Ol"}</h2>

            <div className="role-switch">
              <button className={`role-pill ${authRole === "candidate" ? "active" : ""}`} onClick={() => setAuthRole("candidate")}>Aday</button>
              <button className={`role-pill ${authRole === "employer" ? "active" : ""}`} onClick={() => setAuthRole("employer")}>İşveren</button>
            </div>

            <div className="form-grid">
              {authMode === "register" ? (
                <>
                  <div className="full"><Label required>Ad soyad</Label><Input value={authForm.full_name} onChange={(e) => setAuthForm({ ...authForm, full_name: e.target.value })} /></div>
                  {authRole === "employer" ? <div className="full"><Label required>Firma adı</Label><Input value={authForm.company_name} onChange={(e) => setAuthForm({ ...authForm, company_name: e.target.value })} /></div> : null}
                  <div className="full"><Label>Telefon</Label><Input value={authForm.phone} onChange={(e) => setAuthForm({ ...authForm, phone: e.target.value })} /></div>
                </>
              ) : null}

              <div className="full"><Label required>E-posta</Label><Input value={authForm.email} onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })} /></div>
              <div className="full"><Label required>Şifre</Label><Input type="password" value={authForm.password} onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })} /></div>
            </div>

            {authMessage ? (
              <div style={{ padding: "10px 12px", borderRadius: "12px", background: "#f8fafc", border: "1px solid #e2e8f0", marginTop: 10 }}>
                {authMessage}
              </div>
            ) : null}

            <div className="action-row" style={{ marginTop: 14 }}>
              {authMode === "login" ? (
                <Button onClick={handleLogin} disabled={authLoading}>
                  {authLoading ? <Loader2 size={16} className="spin" /> : <LogIn size={16} />}
                  {authLoading ? "Giriş yapılıyor" : "Giriş Yap"}
                </Button>
              ) : (
                <Button onClick={handleRegister} disabled={authLoading}>
                  {authLoading ? <Loader2 size={16} className="spin" /> : <UserPlus size={16} />}
                  {authLoading ? "Kayıt oluşturuluyor" : "Kayıt Ol"}
                </Button>
              )}
              <Button variant="outline" onClick={() => { setShowAuthModal(false); setAuthMessage(""); }}>Kapat</Button>
            </div>

            <div className="muted" style={{ marginTop: 10 }}>
              {authMode === "login" ? (
                <>
                  Hesabın yok mu? <button type="button" style={{ background: "none", border: "none", color: BRAND.primaryDeep, fontWeight: 800, cursor: "pointer" }} onClick={() => { setAuthMode("register"); setAuthMessage(""); }}>Kayıt ol</button>
                </>
              ) : (
                <>
                  Zaten hesabın var mı? <button type="button" style={{ background: "none", border: "none", color: BRAND.primaryDeep, fontWeight: 800, cursor: "pointer" }} onClick={() => { setAuthMode("login"); setAuthMessage(""); }}>Giriş yap</button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {editingJob ? (
        <div className="modal-backdrop" onClick={() => setEditingJob(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>İlanı düzenle</h2>
            <div className="form-grid">
              <div><Label required>Pozisyon</Label><Input value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} /></div>
              <div><Label required>Firma</Label><Input value={editForm.company} onChange={(e) => setEditForm({ ...editForm, company: e.target.value })} /></div>
              <div><Label required>Şehir</Label><SelectField value={editForm.city} onChange={(value) => setEditForm({ ...editForm, city: value })} options={[{ value: "", label: "Şehir seç" }, ...TURKEY_CITIES.map((item) => ({ value: item, label: item }))]} /></div>
              <div><Label>İlçe</Label><Input value={editForm.district} onChange={(e) => setEditForm({ ...editForm, district: e.target.value })} /></div>
              <div><Label>İş tipi</Label><SelectField value={editForm.type} onChange={(value) => setEditForm({ ...editForm, type: value })} options={[{ value: "Part-time", label: "Part-time" }, { value: "Günlük iş", label: "Günlük iş" }, { value: "Saatlik iş", label: "Saatlik iş" }, { value: "Ek iş", label: "Ek iş" }]} /></div>
              <div><Label>Ücret</Label><Input value={editForm.pay} onChange={(e) => setEditForm({ ...editForm, pay: e.target.value })} /></div>
              <div><Label>Saat</Label><Input value={editForm.hours} onChange={(e) => setEditForm({ ...editForm, hours: e.target.value })} /></div>
              <div><Label>Paket</Label><SelectField value={editForm.package_type} onChange={(value) => setEditForm({ ...editForm, package_type: value })} options={[{ value: "standard", label: "Standart" }, { value: "premium", label: "Premium" }]} /></div>
              <div><Label>Ödeme durumu</Label><SelectField value={editForm.payment_status} onChange={(value) => setEditForm({ ...editForm, payment_status: value })} options={[{ value: "none", label: "Yok" }, { value: "waiting_payment", label: "Ödeme bekleniyor" }, { value: "paid", label: "Ödendi" }]} /></div>
              <div><Label>Durum</Label><SelectField value={editForm.status} onChange={(value) => setEditForm({ ...editForm, status: value })} options={[{ value: "pending", label: "İncelemede" }, { value: "active", label: "Yayında" }]} /></div>
              <div className="full"><Label>Açıklama</Label><Textarea value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} /></div>
            </div>
            <div className="action-row" style={{ marginTop: 14 }}>
              <Button onClick={handleSaveEditJob} disabled={actionLoadingId === editingJob.id}><Check size={16} /> Kaydet</Button>
              <Button variant="outline" onClick={() => setEditingJob(null)}>Kapat</Button>
            </div>
          </div>
        </div>
      ) : null}

      {legalModal ? (
        <div className="modal-backdrop" onClick={() => setLegalModal(null)}>
          <div className="modal compact" onClick={(e) => e.stopPropagation()}>
            <h2>{LEGAL_CONTENT[legalModal].title}</h2>
            <div className="muted" style={{ lineHeight: 1.8 }}>{LEGAL_CONTENT[legalModal].body}</div>
            <div className="action-row" style={{ marginTop: 16 }}>
              <Button variant="outline" onClick={() => setLegalModal(null)}>Kapat</Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
