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
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const SHOPIER_PAYMENT_URL = "https://www.shopier.com";

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
    description:
      "Yoğun saatlerde servis desteği verecek, güler yüzlü ekip arkadaşı aranıyor.",
    status: "active",
    package_type: "premium",
    featured: true,
    price: "399 TL",
    employer_email: "demo@ekis.com",
    payment_status: "paid",
    payment_note: "Demo ödeme tamamlandı",
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
  },
];

const PACKAGE_OPTIONS = {
  standard: {
    label: "Standart",
    price: "Ücretsiz",
    featured: false,
    note: "Normal listede yayınlanır.",
    payment_status: "none",
  },
  premium: {
    label: "Premium",
    price: "399 TL",
    featured: true,
    note: "İlan öne çıkar, premium rozeti alır ve üst sıralarda görünür.",
    payment_status: "waiting_payment",
  },
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

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
              {job.status === "pending" ? (
                <Badge className="pending">Onay bekliyor</Badge>
              ) : null}
            </div>

            <div className="company">{job.company}</div>

            <div className="meta-row">
              <span>
                <MapPin size={15} /> {job.city} / {job.district}
              </span>
              <span>
                <Clock3 size={15} /> {job.hours}
              </span>
              <span>
                <Wallet size={15} /> {job.pay}
              </span>
            </div>

            <p className="description">{job.description}</p>

            <div className="tags">
              {(job.tags || []).map((tag) => (
                <Badge key={tag} className="soft">
                  {tag}
                </Badge>
              ))}
              {job.featured ? (
                <Badge className="featured-tag">Öne Çıkan</Badge>
              ) : null}
              <Badge className="soft">
                {job.package_type === "premium"
                  ? "399 TL"
                  : job.price || "Ücretsiz"}
              </Badge>
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

export default function App() {
  const [jobs, setJobs] = useState(initialJobs);
  const [applications, setApplications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("all");
  const [type, setType] = useState("all");
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

  const [currentEmployer, setCurrentEmployer] = useState(() => {
    const stored = localStorage.getItem("ekis_employer_session");
    return stored ? JSON.parse(stored) : null;
  });

  const [authMode, setAuthMode] = useState("login");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState("");
  const [authForm, setAuthForm] = useState({
    full_name: "",
    company_name: "",
    email: "",
    password: "",
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
  });

  const jobsSectionRef = useRef(null);
  const postSectionRef = useRef(null);

  useEffect(() => {
    loadJobs();
    loadApplications();
  }, []);

  useEffect(() => {
    if (currentEmployer) {
      localStorage.setItem("ekis_employer_session", JSON.stringify(currentEmployer));
      setJobForm((prev) => ({
        ...prev,
        company: prev.company || currentEmployer.company_name || "",
      }));
    } else {
      localStorage.removeItem("ekis_employer_session");
    }
  }, [currentEmployer]);

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
      tags: Array.isArray(job.tags) ? job.tags : job.tags ? [job.tags] : [],
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
    if (!authForm.email || !authForm.password || !authForm.company_name) {
      setAuthMessage("Firma adı, e-posta ve şifre zorunlu.");
      return;
    }

    if (!supabase) {
      const demoEmployer = {
        email: authForm.email,
        full_name: authForm.full_name,
        company_name: authForm.company_name,
      };
      setCurrentEmployer(demoEmployer);
      setShowAuthModal(false);
      setAuthMessage("");
      return;
    }

    setAuthLoading(true);

    const { data, error } = await supabase
      .from("employers")
      .insert({
        email: authForm.email,
        password: authForm.password,
        company_name: authForm.company_name,
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

    setCurrentEmployer({
      email: data.email,
      full_name: data.full_name,
      company_name: data.company_name,
    });
    setShowAuthModal(false);
    setAuthMessage("");
    setAuthForm({ full_name: "", company_name: "", email: "", password: "" });
  }

  async function handleLogin() {
    if (!authForm.email || !authForm.password) {
      setAuthMessage("E-posta ve şifre zorunlu.");
      return;
    }

    if (!supabase) {
      setCurrentEmployer({
        email: authForm.email,
        full_name: "Demo Kullanıcı",
        company_name: "Demo Firma",
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

    setCurrentEmployer({
      email: data.email,
      full_name: data.full_name,
      company_name: data.company_name,
    });
    setShowAuthModal(false);
    setAuthMessage("");
    setAuthForm({ full_name: "", company_name: "", email: "", password: "" });
  }

  function handleLogout() {
    setCurrentEmployer(null);
    setTab("jobs");
  }

  const filteredJobs = useMemo(() => {
    return jobs
      .filter((job) => {
        if (job.status !== "active" && job.status !== undefined) return false;

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
      })
      .sort((a, b) => {
        if (a.featured === b.featured) return 0;
        return a.featured ? -1 : 1;
      });
  }, [jobs, search, city, type]);

  const myJobs = useMemo(() => {
    if (!currentEmployer?.email) return [];
    return jobs.filter((job) => job.employer_email === currentEmployer.email);
  }, [jobs, currentEmployer]);

  const myJobIds = useMemo(() => myJobs.map((job) => String(job.id)), [myJobs]);

  const premiumJobsCount = useMemo(
    () => jobs.filter((job) => job.package_type === "premium").length,
    [jobs]
  );

  const waitingPaymentJobs = useMemo(() => {
    if (!currentEmployer?.email) return [];
    return jobs.filter(
      (job) =>
        job.employer_email === currentEmployer.email &&
        job.package_type === "premium" &&
        job.payment_status === "waiting_payment"
    );
  }, [jobs, currentEmployer]);

  const enrichedApplications = useMemo(() => {
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

  function resetJobForm() {
    setJobForm({
      title: "",
      company: currentEmployer?.company_name || "",
      city: "",
      district: "",
      type: "Part-time",
      pay: "",
      hours: "",
      description: "",
      package_type: "standard",
      payment_note: "",
    });
  }

  async function handlePublish() {
    if (!currentEmployer) {
      setShowAuthModal(true);
      setAuthMode("login");
      setAuthMessage("İlan vermek için önce giriş yap.");
      return;
    }

    if (!jobForm.title || !jobForm.company || !jobForm.city) return;

    const selectedPackage = PACKAGE_OPTIONS[jobForm.package_type];
    const paymentStatus = selectedPackage.payment_status;

    const newJob = {
      id: Date.now(),
      ...jobForm,
      tags: ["Yeni ilan", "İnceleme bekliyor"],
      status: "pending",
      featured: selectedPackage.featured,
      price: selectedPackage.price,
      employer_email: currentEmployer.email,
      payment_status: paymentStatus,
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
        tags: ["Yeni ilan", "İnceleme bekliyor"],
        status: "pending",
        package_type: jobForm.package_type,
        featured: selectedPackage.featured,
        price: selectedPackage.price,
        employer_email: currentEmployer.email,
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

    setJobs((prev) => [{ ...data, tags: data.tags || [] }, ...prev]);
    resetJobForm();
    setTab("dashboard");
  }

  async function handleMarkPaid(jobId) {
    if (!supabase) {
      setJobs((prev) =>
        prev.map((job) =>
          job.id === jobId
            ? { ...job, payment_status: "paid" }
            : job
        )
      );
      return;
    }

    setActionLoadingId(jobId);

    const { error } = await supabase
      .from("jobs")
      .update({
        payment_status: "paid",
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
          ? { ...job, payment_status: "paid" }
          : job
      )
    );
  }

  async function handleApplicationSubmit() {
    if (!appliedJob || !applicationForm.full_name || !applicationForm.phone) return;

    if (!supabase) {
      const existing = JSON.parse(
        localStorage.getItem("ekis_demo_applications") || "[]"
      );
      const next = [
        {
          id: Date.now(),
          ...applicationForm,
          job_id: appliedJob.id,
          created_at: new Date().toISOString(),
        },
        ...existing,
      ];
      localStorage.setItem("ekis_demo_applications", JSON.stringify(next));
      setApplications(next);
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

    if (!supabase) {
      const next = jobs.map((job) =>
        job.id === jobId
          ? {
              ...job,
              status: "active",
              tags:
                job.package_type === "premium"
                  ? ["Premium", "Yayınlandı", "Öne Çıkan"]
                  : ["Yayınlandı"],
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
        tags:
          selected.package_type === "premium"
            ? ["Premium", "Yayınlandı", "Öne Çıkan"]
            : ["Yayınlandı"],
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
              tags:
                job.package_type === "premium"
                  ? ["Premium", "Yayınlandı", "Öne Çıkan"]
                  : ["Yayınlandı"],
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

  const cities = [...new Set(jobs.map((j) => j.city).filter(Boolean))];
  const types = [...new Set(jobs.map((j) => j.type).filter(Boolean))];
  const selectedPackage = PACKAGE_OPTIONS[jobForm.package_type];

  return (
    <div className="page">
      <div className="container">
        <header className="header">
          <div>
            <div className="logo">ekis</div>
            <div className="muted">
              Ek iş arayanlarla işverenleri buluşturan canlı MVP
            </div>
          </div>

          <div className="header-actions">
            <Badge className="live-badge">{dbStatus}</Badge>

            {currentEmployer ? (
              <>
                <Badge className="soft">
                  {currentEmployer.company_name || currentEmployer.email}
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
                    setShowAuthModal(true);
                    setAuthMessage("");
                  }}
                >
                  <LogIn size={16} /> Giriş
                </Button>
                <Button
                  onClick={() => {
                    setAuthMode("register");
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
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="hero-card">
              <Badge className="hero-badge">MVP + Veritabanı</Badge>
              <h1>
                1 dakikada <span>ilan ver</span>, başvuru al, premiumla öne çık.
              </h1>
              <p>
                Premium ilan ücreti 399 TL'dir. Ödeme bildirimi sonrası kontrol edilir
                ve admin onayıyla yayına geçer.
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
                  options={[
                    { value: "all", label: "Tüm şehirler" },
                    ...cities.map((c) => ({ value: c, label: c })),
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
                  <Filter size={16} /> Filtrele
                </Button>
              </div>
            </Card>
          </motion.div>

          <div className="stats">
            <Stat
              label="Aktif ilan"
              value={String(filteredJobs.length)}
              icon={Briefcase}
            />
            <Stat
              label="Premium ilan"
              value={String(premiumJobsCount)}
              icon={Sparkles}
            />
            <Stat
              label="Ödeme bekleyen"
              value={String(waitingPaymentJobs.length)}
              icon={CreditCard}
            />
          </div>
        </section>

        <section className="feature-grid">
          <Card>
            <Briefcase className="feature-icon" />
            <div className="feature-title">İşveren hesabı</div>
            <p className="muted">
              Her işveren kendi hesabıyla giriş yapar ve kendi ilanlarını görür.
            </p>
          </Card>
          <Card>
            <CreditCard className="feature-icon" />
            <div className="feature-title">Ödeme akışı hazır</div>
            <p className="muted">
              Premium ilanlar ödeme bekleyen duruma düşer, ödeme sonrası yayına alınır.
            </p>
          </Card>
          <Card>
            <MessageCircle className="feature-icon" />
            <div className="feature-title">Mesajlaşma sistemi</div>
            <p className="muted">
              Başvuranlarla platform içinde iletişim kurabilir, numara paylaşmadan
              ilerleyebilirsin.
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
          <button
            className={tab === "dashboard" ? "tab active" : "tab"}
            onClick={() => setTab("dashboard")}
          >
            Panel
          </button>
        </div>

        {tab === "jobs" && (
          <div ref={jobsSectionRef}>
            <section className="section-stack">
              <div className="section-head">
                <div>
                  <h2>İlan listesi</h2>
                  <p className="muted">
                    Premium ilanlar üstte görünür, sadece onaylanmış ilanlar listelenir
                  </p>
                </div>
                <div className="result-wrap">
                  {loadingJobs ? <Loader2 size={16} className="spin" /> : null}
                  <Badge className="soft">{filteredJobs.length} sonuç</Badge>
                </div>
              </div>

              <div className="job-list">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={(selected) => {
                      setAppliedJob(selected);
                      setApplicationSent(false);
                    }}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {tab === "post" && (
          <div ref={postSectionRef}>
            <Card>
              <h2>İşveren ilan oluşturma ekranı</h2>

              {!currentEmployer ? (
                <div className="premium-plan-box">
                  <div className="premium-plan-title">
                    <Lock size={18} /> Giriş gerekli
                  </div>
                  <div className="muted">
                    İlan vermek için önce işveren hesabınla giriş yapman gerekiyor.
                  </div>
                  <div
                    style={{
                      marginTop: "12px",
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <Button
                      onClick={() => {
                        setAuthMode("login");
                        setShowAuthModal(true);
                        setAuthMessage("");
                      }}
                    >
                      <LogIn size={16} /> Giriş Yap
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setAuthMode("register");
                        setShowAuthModal(true);
                        setAuthMessage("");
                      }}
                    >
                      <UserPlus size={16} /> Kayıt Ol
                    </Button>
                  </div>
                </div>
              ) : (
                <>
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
                    <div className="muted">{selectedPackage.note}</div>
                  </div>

                  {jobForm.package_type === "premium" ? (
                    <div
                      className="premium-plan-box"
                      style={{ marginBottom: "16px" }}
                    >
                      <div className="premium-plan-title">
                        <CreditCard size={18} />
                        Ödeme bilgisi
                      </div>

                      <div className="muted" style={{ marginBottom: "8px" }}>
                        Premium ilan ücreti 399 TL'dir. Ödemeyi yaptıktan sonra
                        referans numarasını aşağıya yazabilirsin.
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          flexWrap: "wrap",
                          marginBottom: "12px",
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

                      <div className="muted" style={{ marginBottom: "12px" }}>
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

                    <Input
                      placeholder="İş başlığı"
                      value={jobForm.title}
                      onChange={(e) =>
                        setJobForm({ ...jobForm, title: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Firma adı"
                      value={jobForm.company}
                      onChange={(e) =>
                        setJobForm({ ...jobForm, company: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Şehir"
                      value={jobForm.city}
                      onChange={(e) =>
                        setJobForm({ ...jobForm, city: e.target.value })
                      }
                    />
                    <Input
                      placeholder="İlçe"
                      value={jobForm.district}
                      onChange={(e) =>
                        setJobForm({ ...jobForm, district: e.target.value })
                      }
                    />
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
                    <Input
                      placeholder="Ücret bilgisi"
                      value={jobForm.pay}
                      onChange={(e) =>
                        setJobForm({ ...jobForm, pay: e.target.value })
                      }
                    />
                    <div className="full">
                      <Input
                        placeholder="Çalışma saatleri"
                        value={jobForm.hours}
                        onChange={(e) =>
                          setJobForm({ ...jobForm, hours: e.target.value })
                        }
                      />
                    </div>
                    <div className="full">
                      <Textarea
                        placeholder="İş açıklaması"
                        value={jobForm.description}
                        onChange={(e) =>
                          setJobForm({
                            ...jobForm,
                            description: e.target.value,
                          })
                        }
                      />
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
                          : `${selectedPackage.label} ilanı kaydet`}
                      </Button>
                      <Button variant="outline">Taslak kaydet</Button>
                    </div>
                  </div>
                </>
              )}
            </Card>
          </div>
        )}

        {tab === "dashboard" && (
          <section className="dashboard-grid">
            <Card>
              <h2>Benim ilanlarım</h2>
              {!currentEmployer ? (
                <div className="panel-row">
                  <span className="muted">Paneli kullanmak için giriş yap.</span>
                  <Button
                    onClick={() => {
                      setAuthMode("login");
                      setShowAuthModal(true);
                      setAuthMessage("");
                    }}
                  >
                    <LogIn size={16} /> Giriş
                  </Button>
                </div>
              ) : (
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
                            gap: "12px",
                            alignItems: "center",
                            flexWrap: "wrap",
                          }}
                        >
                          <strong>{job.title}</strong>
                          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
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
                          </div>
                        </div>

                        <div className="muted">
                          {job.company} • {job.city} / {job.district}
                        </div>
                        <div className="muted">
                          {job.pay} • {job.hours}
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
                            gap: "10px",
                            marginTop: "12px",
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
              )}
            </Card>

            <Card>
              <h2>Benim başvurularım</h2>
              {!currentEmployer ? (
                <div className="panel-row">
                  <span className="muted">Başvuruları görmek için giriş yap.</span>
                  <Button
                    onClick={() => {
                      setAuthMode("login");
                      setShowAuthModal(true);
                      setAuthMessage("");
                    }}
                  >
                    <LogIn size={16} /> Giriş
                  </Button>
                </div>
              ) : (
                <div className="panel-list">
                  {loadingApplications ? (
                    <div className="panel-row">
                      <span className="muted">Başvurular yükleniyor</span>
                      <Loader2 size={16} className="spin" />
                    </div>
                  ) : enrichedApplications.length === 0 ? (
                    <div className="panel-row">
                      <span className="muted">Henüz başvuru yok</span>
                      <strong>0</strong>
                    </div>
                  ) : (
                    enrichedApplications.slice(0, 10).map((app) => (
                      <div
                        key={app.id}
                        className="panel-row"
                        style={{
                          alignItems: "flex-start",
                          flexDirection: "column",
                          gap: "8px",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "12px",
                            alignItems: "center",
                            flexWrap: "wrap",
                          }}
                        >
                          <strong>{app.full_name}</strong>
                          <Badge className="soft">{app.jobTitle}</Badge>
                        </div>

                        <div
                          className="muted"
                          style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}
                        >
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            <Phone size={14} /> {app.phone}
                          </span>
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            <Building2 size={14} /> {app.company}
                          </span>
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            <MapPin size={14} /> {app.city}
                          </span>
                        </div>

                        <div
                          className="muted"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
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
              )}
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
                    Supabase aktifse başvuru applications tablosuna kaydedilir.
                  </p>
                  <Button onClick={() => setAppliedJob(null)}>Kapat</Button>
                </div>
              )}
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
            <div className="modal">
              <h2>{authMode === "login" ? "İşveren Girişi" : "İşveren Kaydı"}</h2>

              {authMode === "register" ? (
                <>
                  <Input
                    placeholder="Ad soyad"
                    value={authForm.full_name}
                    onChange={(e) =>
                      setAuthForm({ ...authForm, full_name: e.target.value })
                    }
                  />
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

              <Input
                placeholder="E-posta"
                value={authForm.email}
                onChange={(e) =>
                  setAuthForm({ ...authForm, email: e.target.value })
                }
              />

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
                  }}
                >
                  {authMessage}
                </div>
              ) : null}

              <div className="action-row">
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

              <div className="muted" style={{ marginTop: "10px" }}>
                {authMode === "login" ? (
                  <>
                    Hesabın yok mu?{" "}
                    <button
                      type="button"
                      style={{
                        background: "none",
                        border: "none",
                        color: "#0f172a",
                        fontWeight: 700,
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
                        color: "#0f172a",
                        fontWeight: 700,
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
          Ödeme akışı aktif. Premium ilanlar ödeme bekleyen duruma düşer, ödeme
          bildirimi sonrası yayına alınır.
        </footer>
      </div>
    </div>
  );
}
