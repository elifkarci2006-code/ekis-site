import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Clock3,
  Wallet,
  Briefcase,
  Building2,
  Filter,
  Sparkles,
  Users,
  ShieldCheck,
  Zap,
  Star,
  BadgeDollarSign,
} from "lucide-react";

const BRAND = {
  primary: "#22C55E",
  primaryDeep: "#16A34A",
  primarySoft: "#DCFCE7",
  primarySofter: "#F0FDF4",
  ink: "#0F172A",
  muted: "#64748B",
  line: "#E2E8F0",
  card: "#FFFFFF",
  premium: "#F59E0B",
  success: "#16A34A",
  danger: "#EF4444",
  bg: "#F8FAFC",
};

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

const initialJobs = [
  {
    id: 1,
    title: "Garson lazım",
    company: "Mavi Fincan Cafe",
    city: "Eskişehir",
    district: "Tepebaşı",
    type: "Günlük iş",
    pay: "900 TL / gün",
    hours: "17:00 - 23:00",
    duration_label: "6 saat",
    tags: ["ACİL", "Bugün başla"],
    description: "Akşam yoğunluğunda servis desteği verecek, hızlı adapte olabilen ekip arkadaşı aranıyor.",
    featured: true,
    package_type: "premium",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Etkinlik personeli",
    company: "Delta Organizasyon",
    city: "İstanbul",
    district: "Şişli",
    type: "Saatlik iş",
    pay: "250 TL / saat",
    hours: "14:00 - 20:00",
    duration_label: "6 saat",
    tags: ["Hafta sonu"],
    description: "Karşılama ve yönlendirme yapacak, iletişimi güçlü ekip arkadaşları aranıyor.",
    featured: false,
    package_type: "free",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    title: "Depo paketleme desteği",
    company: "HızlıSepet",
    city: "Ankara",
    district: "Yenimahalle",
    type: "Günlük iş",
    pay: "1400 TL / gün",
    hours: "09:00 - 18:00",
    duration_label: "1 gün",
    tags: ["Ertesi gün ödeme"],
    description: "Sipariş yoğunluğu için ürün ayırma ve paketleme desteği verilecek.",
    featured: true,
    package_type: "boost",
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    title: "Kurye desteği",
    company: "Hızlı Paket",
    city: "İzmir",
    district: "Bornova",
    type: "Saatlik iş",
    pay: "300 TL / saat",
    hours: "18:00 - 22:00",
    duration_label: "4 saat",
    tags: ["Akşam işi"],
    description: "Yoğun saatlerde teslimat desteği verecek ekip arkadaşı aranıyor.",
    featured: false,
    package_type: "free",
    created_at: new Date().toISOString(),
  },
];

function normalizeTags(tags) {
  if (Array.isArray(tags)) return tags;
  if (!tags) return [];
  return [tags];
}

function isUrgentJob(job) {
  return normalizeTags(job.tags).includes("ACİL");
}

function isNewJob(job) {
  if (!job.created_at) return false;
  return Date.now() - new Date(job.created_at).getTime() <= 24 * 60 * 60 * 1000;
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
        --primary-softer:${BRAND.primarySofter};
        --premium:${BRAND.premium};
        --success:${BRAND.success};
        --danger:${BRAND.danger};
      }
      *{box-sizing:border-box}
      body{
        margin:0;
        font-family:Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color:var(--ink);
        background:
          radial-gradient(circle at top left, rgba(34,197,94,.08), transparent 28%),
          radial-gradient(circle at top right, rgba(22,163,74,.06), transparent 20%),
          linear-gradient(180deg, #f8fafc 0%, #f0fdf4 100%);
      }
      .page{min-height:100vh}
      .container{width:min(1180px, calc(100% - 24px));margin:0 auto;padding:20px 0 64px}
      .card{
        background:rgba(255,255,255,.96);
        border:1px solid rgba(15,23,42,.07);
        border-radius:24px;
        box-shadow:0 10px 30px rgba(15,23,42,.05);
      }
      .header{
        display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;
        padding:18px 20px;margin-bottom:16px
      }
      .logo{font-size:34px;font-weight:900;letter-spacing:-0.05em}
      .tagline{color:var(--muted);margin-top:4px}
      .header-actions{display:flex;gap:10px;flex-wrap:wrap}
      .hero-shell{display:grid;grid-template-columns:1.45fr .75fr;gap:16px;margin-bottom:16px}
      .action-hero{padding:22px}
      .mini-badge{
        display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border-radius:999px;
        border:1px solid rgba(34,197,94,.18);background:var(--primary-softer);color:#166534;font-size:12px;font-weight:800
      }
      .hero-top{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:16px}
      .hero-title{margin:0;font-size:clamp(24px, 3vw, 40px);line-height:1.04;letter-spacing:-0.04em;max-width:720px}
      .hero-title span{color:var(--primary-deep)}
      .hero-sub{margin:10px 0 0;color:var(--muted);font-size:15px;line-height:1.65;max-width:720px}
      .hero-actions{display:flex;gap:10px;flex-wrap:wrap}
      .quick-search{
        display:grid;grid-template-columns:minmax(300px, 1.9fr) 1fr 1fr auto;gap:10px;align-items:center;
        padding:14px;border-radius:22px;background:#f8fafc;border:1px solid #e2e8f0
      }
      .search-wrap{position:relative}
      .search-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--muted)}
      .input, .select{
        width:100%;min-height:52px;border:1px solid var(--line);border-radius:16px;background:#fff;
        padding:0 14px;font-size:14px;outline:none;transition:.18s ease;color:var(--ink)
      }
      .search-wrap .input{padding-left:42px}
      .input:focus, .select:focus{border-color:var(--primary);box-shadow:0 0 0 4px rgba(34,197,94,.12)}
      .btn{
        min-height:52px;border:none;border-radius:16px;padding:0 16px;display:inline-flex;align-items:center;justify-content:center;
        gap:8px;font-weight:900;font-size:14px;cursor:pointer;transition:.18s ease
      }
      .btn-solid{background:linear-gradient(180deg, var(--primary) 0%, var(--primary-deep) 100%);color:#052e16;box-shadow:0 10px 24px rgba(34,197,94,.22)}
      .btn-outline{background:#fff;color:var(--ink);border:1px solid rgba(15,23,42,.10)}
      .hero-notes{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px}
      .hero-note{
        display:inline-flex;align-items:center;gap:8px;padding:10px 12px;border-radius:999px;background:#fff;border:1px solid #e2e8f0;
        color:#334155;font-size:13px;font-weight:700
      }
      .stats-stack{display:grid;gap:12px}
      .stat-card{padding:18px}
      .stat-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;color:var(--muted)}
      .stat-value{font-size:30px;font-weight:900;letter-spacing:-0.04em}
      .stat-label{font-size:14px;color:var(--muted)}
      .feature-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:16px}
      .feature-card{padding:18px}
      .feature-icon{color:var(--primary-deep);margin-bottom:12px}
      .feature-title{font-size:20px;font-weight:900;letter-spacing:-0.03em;margin-bottom:8px}
      .feature-text{color:var(--muted);line-height:1.6;font-size:14px}
      .tabs{display:flex;gap:10px;flex-wrap:wrap;margin:18px 0 14px}
      .tab{padding:11px 16px;border-radius:14px;background:#fff;border:1px solid rgba(15,23,42,.08);font-weight:800;cursor:pointer}
      .tab.active{background:var(--ink);border-color:var(--ink);color:#fff}
      .section-head{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:14px}
      .section-title{margin:0;font-size:24px;letter-spacing:-0.03em}
      .section-sub{margin:4px 0 0;color:var(--muted)}
      .job-list{display:grid;gap:14px}
      .job-card{padding:18px}
      .featured-card{border:1px solid rgba(245,158,11,.22);box-shadow:0 14px 32px rgba(245,158,11,.08)}
      .job-layout{display:grid;grid-template-columns:1fr auto;gap:16px;align-items:start}
      .job-top{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:8px}
      .job-title{margin:0;font-size:24px;letter-spacing:-0.03em}
      .job-company{font-weight:800;margin-bottom:10px}
      .meta-row{display:flex;gap:12px;flex-wrap:wrap;color:var(--muted);font-size:13px;margin-bottom:12px}
      .meta-row span{display:inline-flex;align-items:center;gap:6px}
      .salary{font-weight:900;color:var(--success)}
      .job-desc{margin:0 0 12px;color:#334155;line-height:1.65}
      .tags{display:flex;gap:8px;flex-wrap:wrap}
      .badge{display:inline-flex;align-items:center;gap:6px;padding:8px 10px;border-radius:999px;font-size:12px;font-weight:900;line-height:1}
      .badge-soft{background:#f8fafc;border:1px solid #e2e8f0;color:#334155}
      .badge-green{background:var(--primary-softer);border:1px solid rgba(34,197,94,.20);color:#166534}
      .badge-premium{background:rgba(245,158,11,.12);border:1px solid rgba(245,158,11,.26);color:#b45309}
      .badge-urgent{background:rgba(239,68,68,.10);border:1px solid rgba(239,68,68,.16);color:#b91c1c}
      .job-actions{display:grid;gap:10px;min-width:190px}
      @media (max-width: 1080px){
        .hero-shell,.feature-grid{grid-template-columns:1fr}
      }
      @media (max-width: 840px){
        .quick-search{grid-template-columns:1fr}
        .job-layout{grid-template-columns:1fr}
        .job-actions{min-width:0;grid-template-columns:1fr 1fr}
      }
      @media (max-width: 640px){
        .container{width:min(100% - 16px, 100%)}
        .feature-grid,.job-actions{grid-template-columns:1fr}
        .header{padding:16px}
        .action-hero{padding:18px}
        .job-card{padding:16px}
      }
    `}</style>
  );
}

function Button({ children, variant = "solid", ...props }) {
  return <button className={`btn ${variant === "outline" ? "btn-outline" : "btn-solid"}`} {...props}>{children}</button>;
}

function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="card stat-card">
      <div className="stat-head">
        <span>{label}</span>
        <Icon size={16} />
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">Anında görünen özet</div>
    </div>
  );
}

function JobCard({ job }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className={`card job-card ${job.featured ? "featured-card" : ""}`}>
        <div className="job-layout">
          <div>
            <div className="job-top">
              <h3 className="job-title">{job.title}</h3>
              <span className="badge badge-soft">{job.type}</span>
              {job.package_type === "premium" && <span className="badge badge-premium"><Sparkles size={12} /> Premium</span>}
              {job.package_type === "boost" && <span className="badge badge-green"><Star size={12} /> Öne Çıkan</span>}
              {isUrgentJob(job) && <span className="badge badge-urgent">ACİL</span>}
              {isNewJob(job) && <span className="badge badge-green">Bugün eklendi</span>}
            </div>

            <div className="job-company">{job.company}</div>

            <div className="meta-row">
              <span><MapPin size={15} /> {job.city} / {job.district || "-"}</span>
              <span><Clock3 size={15} /> {job.hours || "-"}</span>
              <span className="salary"><Wallet size={15} /> {job.pay || "-"}</span>
              <span><Zap size={15} /> {job.duration_label || "-"}</span>
            </div>

            <p className="job-desc">{job.description}</p>

            <div className="tags">
              {normalizeTags(job.tags).map((tag) => (
                <span key={tag} className="badge badge-soft">{tag}</span>
              ))}
            </div>
          </div>

          <div className="job-actions">
            <Button><Zap size={16} /> İş Bul</Button>
            <Button variant="outline"><Building2 size={16} /> Detayı Gör</Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [jobs] = useState(initialJobs);
  const [tab, setTab] = useState("jobs");
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("all");
  const [type, setType] = useState("all");

  const types = useMemo(() => [...new Set(jobs.map((job) => job.type))], [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const q = search.trim().toLowerCase();
      const matchesSearch = !q || [job.title, job.company, job.city, job.district, ...normalizeTags(job.tags)].join(" ").toLowerCase().includes(q);
      const matchesCity = city === "all" ? true : job.city === city;
      const matchesType = type === "all" ? true : job.type === type;
      return matchesSearch && matchesCity && matchesType;
    });
  }, [jobs, search, city, type]);

  const premiumJobsCount = filteredJobs.filter((job) => job.package_type === "premium").length;
  const todayJobsCount = filteredJobs.filter((job) => isNewJob(job)).length;

  return (
    <div className="page">
      <GlobalStyles />

      <div className="container">
        <header className="card header">
          <div>
            <div className="logo">ekis</div>
            <div className="tagline">Saatlik, günlük ve kısa süreli işler için hızlı eşleşme</div>
          </div>

          <div className="header-actions">
            <Button variant="outline"><Search size={16} /> İş Ara</Button>
            <Button><Building2 size={16} /> İş Ver</Button>
          </div>
        </header>

        <section className="hero-shell">
          <div className="card action-hero">
            <div className="hero-top">
              <div>
                <span className="mini-badge"><Zap size={13} /> Hızlı başvuru • CV gerektirmez</span>
                <h1 className="hero-title">İşi <span>arama</span>, <span>filtreleme</span> ve <span>başvurma</span> alanına taşıdım.</h1>
                <p className="hero-sub">
                  Büyük slogan yerine kullanıcının ilk saniyede aksiyon alacağı sade bir giriş ekranı. İş Bul, İş Ver ve filtreleme alanı artık ana odak.
                </p>
              </div>

              <div className="hero-actions">
                <Button onClick={() => setTab("jobs")}><Search size={16} /> İş Bul</Button>
                <Button variant="outline"><Building2 size={16} /> İş Ver</Button>
              </div>
            </div>

            <div className="quick-search">
              <div className="search-wrap">
                <Search size={16} className="search-icon" />
                <input
                  className="input"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="İş ara: garson, etkinlik, depo, kurye"
                />
              </div>

              <select className="select" value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="all">Konum seç</option>
                {TURKEY_CITIES.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>

              <select className="select" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="all">İş türü</option>
                {types.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>

              <Button><Filter size={16} /> Filtrele</Button>
            </div>

            <div className="hero-notes">
              <span className="hero-note"><ShieldCheck size={14} /> Gerçek işverenler</span>
              <span className="hero-note"><Users size={14} /> Hızlı başvuru akışı</span>
              <span className="hero-note"><BadgeDollarSign size={14} /> Aynı gün kazanç odaklı</span>
            </div>
          </div>

          <div className="stats-stack">
            <StatCard label="Aktif ilan" value={String(filteredJobs.length)} icon={Briefcase} />
            <StatCard label="Premium ilan" value={String(premiumJobsCount)} icon={Sparkles} />
            <StatCard label="Bugünün işleri" value={String(todayJobsCount)} icon={Zap} />
          </div>
        </section>

        <section className="feature-grid">
          <div className="card feature-card">
            <Zap className="feature-icon" />
            <div className="feature-title">Bugün çalış</div>
            <div className="feature-text">Kısa süreli işleri hızlıca gör, aynı gün harekete geç.</div>
          </div>
          <div className="card feature-card">
            <Users className="feature-icon" />
            <div className="feature-title">CV gerekmez</div>
            <div className="feature-text">Adayın odağı evrak değil, anında başvuru ve eşleşme olsun.</div>
          </div>
          <div className="card feature-card">
            <Building2 className="feature-icon" />
            <div className="feature-title">İşveren için hızlı eleman</div>
            <div className="feature-text">İşveren tarafında ilan verme akışı görünür ve net kaldı.</div>
          </div>
          <div className="card feature-card">
            <BadgeDollarSign className="feature-icon" />
            <div className="feature-title">Katmanlı gelir modeli</div>
            <div className="feature-text">Premium ve öne çıkan alanlar korunurken ekran kalabalığı azaltıldı.</div>
          </div>
        </section>

        <div className="tabs">
          <button className={`tab ${tab === "jobs" ? "active" : ""}`} onClick={() => setTab("jobs")}>İşler</button>
          <button className={`tab ${tab === "profile" ? "active" : ""}`} onClick={() => setTab("profile")}>Profilim</button>
        </div>

        <section>
          <div className="section-head">
            <div>
              <h2 className="section-title">Öne çıkan işler</h2>
              <p className="section-sub">Arama ve filtre odaklı yeni giriş ekranına göre sadeleştirilmiş liste.</p>
            </div>
            <div className="section-sub">{filteredJobs.length} sonuç</div>
          </div>

          <div className="job-list">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

