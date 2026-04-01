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
  ShieldCheck,
  Filter,
  PlusCircle,
  Send,
  CheckCircle2,
  Database,
  Loader2,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";

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
    tags: ["Öğrenciye uygun", "Akşam", "Hızlı başlangıç"],
    description: "Yoğun saatlerde servis desteği verecek, güler yüzlü ekip arkadaşı aranıyor.",
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
    description: "Kasa ve reyon düzenine destek olacak ekip arkadaşı aranıyor.",
  },
  {
    id: 3,
    title: "Etkinlik Karşılama Hostesi",
    company: "Delta Organizasyon",
    city: "İstanbul",
    district: "Şişli",
    type: "Günlük iş",
    pay: "Günlük 1500 TL",
    hours: "14:00 - 22:00",
    tags: ["Etkinlik", "1 gün", "Prim olabilir"],
    description: "Kurumsal etkinlikte misafir yönlendirme ve karşılama yapacak kişiler aranıyor.",
  },
  {
    id: 4,
    title: "Kurye Yardımcısı",
    company: "PaketJet",
    city: "İzmir",
    district: "Bornova",
    type: "Yarı zamanlı",
    pay: "Saatlik 190 TL",
    hours: "12:00 - 17:00",
    tags: ["Ehliyet avantaj", "Hızlı ödeme"],
    description: "Yoğun teslimat saatlerinde paket ayrıştırma ve saha desteği verilecek.",
  },
  {
    id: 5,
    title: "Stand Tanıtım Personeli",
    company: "PromoX",
    city: "Bursa",
    district: "Nilüfer",
    type: "Ek iş",
    pay: "Günlük 1400 TL",
    hours: "11:00 - 20:00",
    tags: ["İletişim becerisi", "2 gün"],
    description: "AVM içindeki standda ürün tanıtımı ve yönlendirme yapılacak.",
  },
  {
    id: 6,
    title: "Akşam Depo Destek Elemanı",
    company: "HızlıSepet",
    city: "Kocaeli",
    district: "İzmit",
    type: "Part-time",
    pay: "Saatlik 180 TL",
    hours: "19:00 - 00:00",
    tags: ["Akşam", "Fiziksel iş", "Ertesi gün ödeme"],
    description: "Sipariş toplama ve paketleme süreçlerinde akşam vardiyası desteği aranıyor.",
  },
];

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

function Card({ children, className = "" }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function Badge({ children, variant = "default", className = "" }) {
  return <span className={`badge ${variant} ${className}`}>{children}</span>;
}

function Button({ children, variant = "solid", className = "", ...props }) {
  return (
    <button className={`btn ${variant === "outline" ? "btn-outline" : "btn-solid"} ${className}`} {...props}>
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

function Stat({ label, value, icon: Icon }) {
  return (
    <Card>
      <div className="stat-head">
        <div className="muted">{label}</div>
        {Icon ? <Icon size={16} className="icon-muted" /> : null}
      </div>
      <div className="stat-value">{value}</div>
    </Card>
  );
}

function JobCard({ job, onApply }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="job-card">
        <div className="job-layout">
          <div className="job-main">
            <div className="job-top">
              <h3>{job.title}</h3>
              <Badge variant="secondary">{job.type}</Badge>
              {job.status === "pending" ? <Badge className="pending">Onay bekliyor</Badge> : null}
            </div>
            <div className="company">{job.company}</div>
            <div className="meta-row">
              <span><MapPin size={15} /> {job.city} / {job.district}</span>
              <span><Clock3 size={15} /> {job.hours}</span>
              <span><Wallet size={15} /> {job.pay}</span>
            </div>
            <p className="description">{job.description}</p>
            <div className="tags">
              {(job.tags || []).map((tag) => (
                <Badge key={tag} className="soft">{tag}</Badge>
              ))}
            </div>
          </div>
          <div className="job-actions">
            <Button onClick={() => onApply(job)}>Başvur</Button>
            <Button variant="outline">Detayı Gör</Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function App() {
  const [jobs, setJobs] = useState(initialJobs);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("all");
  const [type, setType] = useState("all");
  const [tab, setTab] = useState("jobs");
  const [appliedJob, setAppliedJob] = useState(null);
  const [applicationSent, setApplicationSent] = useState(false);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [savingJob, setSavingJob] = useState(false);
  const [sendingApplication, setSendingApplication] = useState(false);
  const [dbStatus, setDbStatus] = useState(supabase ? "Supabase bağlı" : "Demo modunda çalışıyor");
  const [applicationForm, setApplicationForm] = useState({ full_name: "", phone: "", note: "" });
  const [jobForm, setJobForm] = useState({
    title: "",
    company: "",
    city: "",
    district: "",
    type: "Part-time",
    pay: "",
    hours: "",
    description: "",
  });

  const jobsSectionRef = useRef(null);
  const postSectionRef = useRef(null);

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    if (!supabase) {
      const stored = localStorage.getItem("ekis_demo_jobs");
      if (stored) setJobs(JSON.parse(stored));
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
      tags: job.tags || [],
      status: job.status || "active",
    }));

    setJobs(mapped.length ? mapped : initialJobs);
    setLoadingJobs(false);
    setDbStatus("Supabase bağlı");
  }

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const q = search.toLowerCase();
      const searchMatch =
        !q ||
        [job.title, job.company, job.city, job.district, ...(job.tags || [])]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const cityMatch = city === "all" ? true : job.city === city;
      const typeMatch = type === "all" ? true : job.type === type;
      return searchMatch && cityMatch && typeMatch;
    });
  }, [jobs, search, city, type]);

  function resetJobForm() {
    setJobForm({
      title: "",
      company: "",
      city: "",
      district: "",
      type: "Part-time",
      pay: "",
      hours: "",
      description: "",
    });
  }

  async function handlePublish() {
    if (!jobForm.title || !jobForm.company || !jobForm.city) return;

    const newJob = {
      id: Date.now(),
      ...jobForm,
      tags: ["Yeni ilan", "İnceleme bekliyor"],
      status: "pending",
    };

    if (!supabase) {
      const next = [newJob, ...jobs];
      setJobs(next);
      localStorage.setItem("ekis_demo_jobs", JSON.stringify(next));
      resetJobForm();
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
        tags: ["Yeni ilan", "İnceleme bekliyor"],
        status: "pending",
      })
      .select()
      .single();

    setSavingJob(false);

    if (error) {
      console.error(error);
      setDbStatus("İlan kaydı başarısız");
      return;
    }

    setJobs((prev) => [{ ...data, tags: data.tags || [] }, ...prev]);
    resetJobForm();
  }

  async function handleApplicationSubmit() {
    if (!appliedJob || !applicationForm.full_name || !applicationForm.phone) return;

    if (!supabase) {
      const existing = JSON.parse(localStorage.getItem("ekis_demo_applications") || "[]");
      const next = [...existing, { ...applicationForm, job_id: appliedJob.id, created_at: new Date().toISOString() }];
      localStorage.setItem("ekis_demo_applications", JSON.stringify(next));
      setApplicationSent(true);
      setApplicationForm({ full_name: "", phone: "", note: "" });
      return;
    }

    setSendingApplication(true);
    const { error } = await supabase.from("applications").insert({
      job_id: appliedJob.id,
      full_name: applicationForm.full_name,
      phone: applicationForm.phone,
      note: applicationForm.note,
    });
    setSendingApplication(false);

    if (error) {
      console.error(error);
      setDbStatus("Başvuru kaydı başarısız");
      return;
    }

    setApplicationSent(true);
    setApplicationForm({ full_name: "", phone: "", note: "" });
  }

  const cities = [...new Set(jobs.map((j) => j.city))];
  const types = [...new Set(jobs.map((j) => j.type))];

  return (
    <div className="page">
      <div className="container">
        <header className="header">
          <div>
            <div className="logo">ekis</div>
            <div className="muted">Ek iş arayanlarla işverenleri buluşturan canlı MVP</div>
          </div>
          <div className="header-actions">
            <Badge className="live-badge">{dbStatus}</Badge>
            <Button
              variant="outline"
              onClick={() => {
                setTab("jobs");
                setTimeout(() => {
                  jobsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 50);
              }}
            >
              <User size={16} /> İş Ara
            </Button>
            <Button
              onClick={() => {
                setTab("post");
                setTimeout(() => {
                  postSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 50);
              }}
            >
              <Building2 size={16} /> İlan Ver
            </Button>
          </div>
        </header>

        <section className="hero-grid">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="hero-card">
              <Badge className="hero-badge">MVP + Veritabanı</Badge>
              <h1>
                Türkiye genelinde <span>ek iş</span>, part-time ve günlük işleri tek yerde bul.
              </h1>
              <p>
                Bu sürümde ilanlar ve başvurular artık gerçek veritabanına bağlanabilecek şekilde hazırlandı.
                Supabase anahtarlarını girince demo modundan canlı moda geçer.
              </p>

              <div className="filters">
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
                  options={[{ value: "all", label: "Tüm şehirler" }, ...cities.map((c) => ({ value: c, label: c }))]}
                />

                <SelectField
                  value={type}
                  onChange={setType}
                  options={[{ value: "all", label: "Tüm türler" }, ...types.map((t) => ({ value: t, label: t }))]}
                />

                <Button><Filter size={16} /> Filtrele</Button>
              </div>
            </Card>
          </motion.div>

          <div className="stats">
            <Stat label="Aktif ilan" value={String(jobs.length)} icon={Briefcase} />
            <Stat label="Bugün başvuru" value="184" icon={Send} />
            <Stat label="Veri durumu" value={supabase ? "Canlı" : "Demo"} icon={Database} />
          </div>
        </section>

        <section className="feature-grid">
          <Card>
            <Briefcase className="feature-icon" />
            <div className="feature-title">Kalıcı ilanlar</div>
            <p className="muted">İşverenin girdiği ilan Supabase’e kaydolur, sayfa yenilense de kaybolmaz.</p>
          </Card>
          <Card>
            <ShieldCheck className="feature-icon" />
            <div className="feature-title">Onay akışına hazır</div>
            <p className="muted">Yeni ilanlar pending durumuyla kaydedilir, sonra admin tarafından onaylanabilir.</p>
          </Card>
          <Card>
            <Wallet className="feature-icon" />
            <div className="feature-title">Ödeme eklemeye uygun</div>
            <p className="muted">Bir sonraki aşamada ücretli ilan ve paket sistemini rahatça bağlarız.</p>
          </Card>
        </section>

        <div className="tabs">
          <button
            className={tab === "jobs" ? "tab active" : "tab"}
            onClick={() => {
              setTab("jobs");
              setTimeout(() => {
                jobsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 50);
            }}
          >
            İlanlar
          </button>
          <button
            className={tab === "post" ? "tab active" : "tab"}
            onClick={() => {
              setTab("post");
              setTimeout(() => {
                postSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 50);
            }}
          >
            İlan Ver
          </button>
          <button className={tab === "dashboard" ? "tab active" : "tab"} onClick={() => setTab("dashboard")}>
            Panel
          </button>
        </div>

        {tab === "jobs" && (
          <div ref={jobsSectionRef}>
            <section className="section-stack">
              <div className="section-head">
                <div>
                  <h2>İlan listesi</h2>
                  <p className="muted">Arama ve filtrelere göre güncellenen canlı liste</p>
                </div>
                <div className="result-wrap">
                  {loadingJobs ? <Loader2 size={16} className="spin" /> : null}
                  <Badge className="soft">{filteredJobs.length} sonuç</Badge>
                </div>
              </div>

              <div className="job-list">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} onApply={(selected) => { setAppliedJob(selected); setApplicationSent(false); }} />
                ))}
              </div>
            </section>
          </div>
        )}

        {tab === "post" && (
          <div ref={postSectionRef}>
            <Card>
              <h2>İşveren ilan oluşturma ekranı</h2>
              <div className="form-grid">
                <Input placeholder="İş başlığı" value={jobForm.title} onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })} />
                <Input placeholder="Firma adı" value={jobForm.company} onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })} />
                <Input placeholder="Şehir" value={jobForm.city} onChange={(e) => setJobForm({ ...jobForm, city: e.target.value })} />
                <Input placeholder="İlçe" value={jobForm.district} onChange={(e) => setJobForm({ ...jobForm, district: e.target.value })} />
                <SelectField
                  value={jobForm.type}
                  onChange={(val) => setJobForm({ ...jobForm, type: val })}
                  options={[
                    { value: "Part-time", label: "Part-time" },
                    { value: "Ek iş", label: "Ek iş" },
                    { value: "Günlük iş", label: "Günlük iş" },
                    { value: "Yarı zamanlı", label: "Yarı zamanlı" },
                  ]}
                />
                <Input placeholder="Ücret bilgisi" value={jobForm.pay} onChange={(e) => setJobForm({ ...jobForm, pay: e.target.value })} />
                <div className="full">
                  <Input placeholder="Çalışma saatleri" value={jobForm.hours} onChange={(e) => setJobForm({ ...jobForm, hours: e.target.value })} />
                </div>
                <div className="full">
                  <Textarea placeholder="İş açıklaması" value={jobForm.description} onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })} />
                </div>
                <div className="full action-row">
                  <Button onClick={handlePublish} disabled={savingJob}>
                    {savingJob ? <Loader2 size={16} className="spin" /> : <PlusCircle size={16} />}
                    {savingJob ? "Kaydediliyor" : "İlanı kaydet"}
                  </Button>
                  <Button variant="outline">Taslak kaydet</Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {tab === "dashboard" && (
          <section className="dashboard-grid">
            <Card>
              <h2>Admin / işveren panel önizleme</h2>
              <div className="panel-list">
                {[
                  ["Bekleyen ilan onayı", jobs.filter((j) => j.status === "pending").length],
                  ["Yeni başvurular", "Veritabanından okunacak"],
                  ["Premium ilanlar", "Sonraki aşama"],
                  ["Bağlantı durumu", dbStatus],
                ].map(([k, v]) => (
                  <div key={k} className="panel-row">
                    <span className="muted">{k}</span>
                    <strong>{String(v)}</strong>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h2>Supabase kurulum özeti</h2>
              <div className="summary-list">
                <div>1. Supabase proje aç</div>
                <div>2. jobs ve applications tablosu oluştur</div>
                <div>3. VITE_SUPABASE_URL ve VITE_SUPABASE_ANON_KEY ekle</div>
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
                <div className="muted">{appliedJob.company} • {appliedJob.city}</div>
              </div>

              {!applicationSent ? (
                <>
                  <Input
                    placeholder="Ad soyad"
                    value={applicationForm.full_name}
                    onChange={(e) => setApplicationForm({ ...applicationForm, full_name: e.target.value })}
                  />
                  <Input
                    placeholder="Telefon"
                    value={applicationForm.phone}
                    onChange={(e) => setApplicationForm({ ...applicationForm, phone: e.target.value })}
                  />
                  <Textarea
                    placeholder="Kısa bir not yaz"
                    value={applicationForm.note}
                    onChange={(e) => setApplicationForm({ ...applicationForm, note: e.target.value })}
                  />
                  <div className="action-row">
                    <Button onClick={handleApplicationSubmit} disabled={sendingApplication}>
                      {sendingApplication ? <Loader2 size={16} className="spin" /> : <Send size={16} />}
                      {sendingApplication ? "Gönderiliyor" : "Başvuruyu gönder"}
                    </Button>
                    <Button variant="outline" onClick={() => setAppliedJob(null)}>Vazgeç</Button>
                  </div>
                </>
              ) : (
                <div className="success-box">
                  <div className="success-title"><CheckCircle2 size={18} /> Başvuru başarıyla gönderildi</div>
                  <p className="muted">Supabase aktifse başvuru applications tablosuna kaydedilir.</p>
                  <Button onClick={() => setAppliedJob(null)}>Kapat</Button>
                </div>
              )}
            </div>
          </div>
        )}

        <footer className="footer">
          Sonraki adımda üyelik sistemi, admin login, ücretli ilan, gerçek panel ve ilan onay ekranını ekleyeceğiz.
          Bu sürüm artık demodan canlı ürüne geçiş için hazır temeldir.
        </footer>
      </div>
    </div>
  );
}
