import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "./supabaseClient";
import { PALETTE, categories, cities, types } from "./data/constants";
import { featuredSeed, jobsSeed } from "./data/seeds";
import { cityDistricts } from "./data/cityDistricts";
import {
  formatSalaryPreview,
  generateCaptchaQuestion,
  getDaysAgoLabel,
  getDaysLeftLabel,
  getJobExpireDate,
  inferCategory,
  isJobActive,
  normalizeLocation,
  toTitleCase,
} from "./utils/jobUtils";
import { AdPlaceholder, InlineAdCard } from "./components/AdSlots";
import FeaturedJobCard from "./components/FeaturedJobCard";
import JobCard from "./components/JobCard";
import InfoModal from "./components/InfoModal";
import FeaturedListModal from "./components/FeaturedListModal";
import PostJobModal from "./components/PostJobModal";
const SHOPIER_FEATURED_LINK = "https://shopier.com/46018405";


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
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showFeaturedList, setShowFeaturedList] = useState(false);
  const [adminFilter, setAdminFilter] = useState("all");
  const [adminSearch, setAdminSearch] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [pendingJob, setPendingJob] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [logoSrc, setLogoSrc] = useState("/logo-ekis.png");
  const [headerSmall, setHeaderSmall] = useState(false);
  const [headerOpacity, setHeaderOpacity] = useState(1);
  const [jobs, setJobs] = useState(jobsSeed);
  const [featuredJobs, setFeaturedJobs] = useState(featuredSeed);
  const [pendingJobs, setPendingJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [adminNotifications, setAdminNotifications] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem("ekisAdminNotifications") || "[]");
    } catch {
      return [];
    }
  });
  const [errors, setErrors] = useState({});
  const [infoModal, setInfoModal] = useState(null);
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminLoginError, setAdminLoginError] = useState("");
  const [adminAuthenticated, setAdminAuthenticated] = useState(
    () => window.localStorage.getItem("ekisAdminAuth") === "true"
  );
  const [captcha, setCaptcha] = useState(() => generateCaptchaQuestion());
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    city: "",
    district: "",
    category: "",
    workType: "Günlük",
    salary: "",
    description: "",
    workAddress: "",
    contactName: "",
    contactPhone: "",
    captchaAnswer: "",
  });
useEffect(() => {
  const fetchJobs = async () => {
    const { data, error } = await supabase
      .from("job_posts")
      .select("*")
      .neq("status", "rejected")
      .neq("status", "passive")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase hata:", error);
      return;
    }

    if (!data || data.length === 0) {
      console.log("Henüz gerçek ilan yok, demo ilanlar gösteriliyor.");
      return;
    }

    const formatted = data.map((job) => ({
      id: job.id,
      dbId: job.id,
      title: toTitleCase(job.job_title),
      company: toTitleCase(job.company_name),
      location: normalizeLocation(job.city, job.district),
      salary: job.salary,
      type: job.work_type || "Günlük",
      description: job.description,
      contactPhone: job.phone,
      createdAt: job.created_at,
      category: inferCategory(job.job_title),
      status: job.status || "pending",
      plan: job.plan_type === "featured" ? "featured" : "free",
      featuredStatus:
        job.plan_type === "featured" ? "live" : null,
    }));

    const pendingFromDb = formatted.filter(
      (j) => j.status === "pending"
    );

    const normalJobs = formatted.filter(
      (j) => j.status !== "pending" && j.featuredStatus !== "live"
    );

    const featuredJobsFromDb = formatted.filter(
      (j) => j.status !== "pending" && j.featuredStatus === "live"
    );

    setPendingJobs(pendingFromDb);
    setJobs([...normalJobs, ...jobsSeed]);
    setFeaturedJobs([...featuredJobsFromDb, ...featuredSeed]);
  };

  fetchJobs();
}, []);
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
    const syncAdminRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      const searchParams = new URLSearchParams(window.location.search);
      setIsAdminRoute(hash === "#admin" || path.endsWith("/admin") || searchParams.get("admin") === "1");
    };

    syncAdminRoute();
    window.addEventListener("hashchange", syncAdminRoute);
    return () => window.removeEventListener("hashchange", syncAdminRoute);
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        "ekisAdminNotifications",
        JSON.stringify(adminNotifications.slice(0, 20))
      );
    } catch {
      // localStorage yazılamazsa sessiz geç
    }
  }, [adminNotifications]);

  useEffect(() => {
    const expireJobs = async () => {
      const now = new Date();

      const expireList = (list) =>
        list
          .map((job) => {
            const expireDate = getJobExpireDate(job);
            const shouldExpire =
              expireDate <= now &&
              job.status !== "passive" &&
              job.adminStatus !== "Süresi Doldu";

            if (!shouldExpire) return job;

            return {
              ...job,
              status: "passive",
              adminStatus: "Süresi Doldu",
            };
          })
          // Süresi biten / pasif ilanlar admin panelden ve listelerden kaldırılır
          .filter((job) => isJobActive(job));

      let expiredDbJobs = [];

      setJobs((prev) => {
        const next = expireList(prev);
        expiredDbJobs.push(
          ...prev.filter(
            (job) => job.dbId && getJobExpireDate(job) <= now && job.status !== "passive"
          )
        );
        return next;
      });
      setFeaturedJobs((prev) => {
        const next = expireList(prev);
        expiredDbJobs.push(
          ...prev.filter(
            (job) => job.dbId && getJobExpireDate(job) <= now && job.status !== "passive"
          )
        );
        return next;
      });

      expiredDbJobs = expiredDbJobs.filter(
        (job, idx, arr) => arr.findIndex((j) => j.dbId === job.dbId) === idx
      );

      if (expiredDbJobs.length > 0) {
        await Promise.all(
          expiredDbJobs.map((job) =>
            supabase
              .from("job_posts")
              .update({ status: "passive" })
              .eq("id", job.dbId)
          )
        );

        setAdminNotifications((prev) => [
          {
            id: Date.now(),
            text: `${expiredDbJobs.length} ilanın süresi doldu ve pasife alındı.`,
          },
          ...prev,
        ]);
      }
    };

    expireJobs();
    const interval = setInterval(expireJobs, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const goHome = () => {
    setIsAdminRoute(false);
    if (window.location.hash) {
      window.history.pushState("", document.title, window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAdminLogin = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: adminEmail,
    password: adminPassword,
  });

  if (error) {
    setAdminLoginError("E-posta veya şifre hatalı.");
    return;
  }

  window.localStorage.setItem("ekisAdminAuth", "true");
  setAdminAuthenticated(true);
  setAdminLoginError("");
  setAdminEmail("");
  setAdminPassword("");
};

  const handleAdminLogout = async () => {
  await supabase.auth.signOut();
  window.localStorage.removeItem("ekisAdminAuth");
  setAdminAuthenticated(false);
  setAdminEmail("");
  setAdminPassword("");
};

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
district: "",
        workType: "Günlük",
        salary: "",
        description: "",
        workAddress: "",
        contactName: "",
        contactPhone: "",
        captchaAnswer: "",
      });
      setCaptcha(generateCaptchaQuestion());
    }
  }, [showForm]);

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.company.trim()) nextErrors.company = "Firma adı zorunludur.";
    if (!formData.title.trim()) {
      nextErrors.title = "İlan başlığı zorunludur.";
    } else if (formData.title.trim().length < 5) {
      nextErrors.title = "İlan başlığı en az 5 karakter olmalıdır.";
    }
    if (!formData.city.trim()) nextErrors.city = "Şehir seçimi zorunludur.";
    if (!formData.district.trim()) nextErrors.district = "İlçe / konum zorunludur.";
    if (!formData.category.trim()) nextErrors.category = "Kategori seçimi zorunludur.";
    if (!formData.workAddress.trim()) nextErrors.workAddress = "İş adresi / buluşma noktası zorunludur.";

    const phoneDigits = formData.contactPhone.replace(/\D/g, "");
    const invalidRepeatingPhone = /^(\d)\1+$/.test(phoneDigits);
    const allJobsForSpamCheck = [...jobs, ...featuredJobs, ...pendingJobs];
    const duplicatePhoneCount = allJobsForSpamCheck.filter(
      (job) => String(job.contactPhone || "").replace(/\D/g, "") === phoneDigits
    ).length;

    if (!formData.contactPhone.trim()) {
      nextErrors.contactPhone = "Telefon numarası zorunludur.";
    } else if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      nextErrors.contactPhone = "Geçerli bir telefon numarası giriniz.";
    } else if (invalidRepeatingPhone || phoneDigits === "1234567890" || phoneDigits === "12345678901") {
      nextErrors.contactPhone = "Lütfen gerçek bir telefon numarası giriniz.";
    } else if (duplicatePhoneCount >= 3) {
      nextErrors.contactPhone = "Bu numara ile çok fazla ilan girilmiş. Lütfen farklı bir numara kullanın.";
    }

    if (!formData.salary.trim()) {
      nextErrors.salary = "Ücret bilgisi zorunludur.";
    } else {
      const salaryValue = Number(formData.salary);

      if (salaryValue < 10) {
        nextErrors.salary = "Minimum ücret 10 TL olabilir.";
      } else if (salaryValue > 50000) {
        nextErrors.salary = "Maximum ücret 50.000 TL olabilir.";
      }
    }

    if (!formData.description.trim()) {
      nextErrors.description = "İş açıklaması zorunludur.";
    } else if (formData.description.trim().length < 30) {
      nextErrors.description = "İş açıklaması en az 30 karakter olmalıdır.";
    }

    if (!formData.captchaAnswer.trim()) {
      nextErrors.captchaAnswer = "Güvenlik sorusunu cevaplayınız.";
    } else if (formData.captchaAnswer.trim() !== captcha.answer) {
      nextErrors.captchaAnswer = "Güvenlik sorusu hatalı cevaplandı.";
    }


    const bannedWords = [
      "bahis",
      "telegram",
      "kripto",
      "yatırım fırsatı",
      "evden milyon",
      "forex",
      "casino",
      "iddaa"
    ];

    const spamText = `
      ${formData.title}
      ${formData.description}
      ${formData.company}
    `.toLocaleLowerCase("tr-TR");

    if (bannedWords.some((word) => spamText.includes(word))) {
      nextErrors.description = "İlan içeriği platform kurallarına uygun değil.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (name === "city") {
      setFormData((prev) => ({ ...prev, city: value, district: "" }));
      setErrors((prev) => ({ ...prev, city: "", district: "" }));
      return;
    }

    if (name === "salary") {
      const onlyNumbers = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({ ...prev, salary: onlyNumbers }));
      setErrors((prev) => ({ ...prev, salary: "" }));
      return;
    }

    if (name === "contactPhone") {
      const cleaned = value.replace(/[^0-9+\s()-]/g, "");
      setFormData((prev) => ({ ...prev, contactPhone: cleaned }));
      setErrors((prev) => ({ ...prev, contactPhone: "" }));
      return;
    }

    if (name === "captchaAnswer") {
      const onlyNumbers = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({ ...prev, captchaAnswer: onlyNumbers }));
      setErrors((prev) => ({ ...prev, captchaAnswer: "" }));
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

  const buildJobFromForm = () => ({
    id: Date.now(),
    title: toTitleCase(formData.title),
    company: toTitleCase(formData.company),
    location: normalizeLocation(formData.city, formData.district),
    salary: formatSalaryPreview(formData.workType, formData.salary),
    type: formData.workType,
    category: formData.category || inferCategory(formData.title),
    description: formData.description.trim(),
    workAddress: toTitleCase(formData.workAddress),
    contactName: toTitleCase(formData.contactName),
    contactPhone: formData.contactPhone.trim(),
    status: "active",
    durationDays: selectedPlan === "featured" ? 15 : 30,
    createdAt: new Date().toISOString(),
  });

  const handlePublishClick = () => {
    const lastAttempts = JSON.parse(
      window.localStorage.getItem("ekisPostAttempts") || "[]"
    );

    const now = Date.now();

    const recentAttempts = lastAttempts.filter(
      (time) => now - time < 5 * 60 * 1000
    );

    if (recentAttempts.length >= 2) {
      alert("Çok sık ilan gönderiyorsun 😄 Lütfen birkaç dakika bekle.");
      return;
    }

    if (!validateForm()) return;

    recentAttempts.push(now);

    window.localStorage.setItem(
      "ekisPostAttempts",
      JSON.stringify(recentAttempts)
    );

    setPendingJob(buildJobFromForm());
    setSelectedPlan("free");
    setShowPlanModal(true);
  };

  const handlePlanContinue = async () => {
    if (!pendingJob) return;

    const payload = {
      company_name: pendingJob.company,
      job_title: pendingJob.title,
      city: toTitleCase(formData.city),
      district: toTitleCase(formData.district),
      salary: pendingJob.salary,
      description: pendingJob.description,
      phone: pendingJob.contactPhone,
      plan_type: selectedPlan === "featured" ? "featured" : "normal",
      work_type: pendingJob.type,
      status: "pending",
      expires_at: new Date(
        Date.now() +
          (selectedPlan === "featured" ? 15 : 30) *
            24 *
            60 *
            60 *
            1000
      ).toISOString(),
    };

    const { data, error } = await supabase
      .from("job_posts")
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error("İlan kaydedilemedi:", error);
      alert("İlan kaydedilemedi 😥");
      return;
    }

    const reviewJob = {
      ...pendingJob,
      id: data?.id || pendingJob.id,
      dbId: data?.id,
      plan: selectedPlan === "featured" ? "featured" : "free",
      durationDays: selectedPlan === "featured" ? 15 : 30,
      status: "pending",
      paymentStatus: selectedPlan === "featured" ? "pending" : "not_required",
      submittedAt: new Date().toISOString(),
    };

    setPendingJobs((prev) => [reviewJob, ...prev]);

    if (selectedPlan === "featured") {
      window.open(SHOPIER_FEATURED_LINK, "_blank", "noopener,noreferrer");
    }

    alert("İlan admin onayına gönderildi 🚀");

    setShowPlanModal(false);
    setShowForm(false);
    setShowPreview(false);
    setPendingJob(null);
    setSelectedPlan("free");

    setFormData({
      company: "",
      title: "",
      city: "",
      district: "",
      category: "",
      workType: "Günlük",
      salary: "",
      description: "",
      workAddress: "",
      contactName: "",
      contactPhone: "",
      captchaAnswer: "",
    });

    setCaptcha(generateCaptchaQuestion());
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (!isJobActive(job)) return false;
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
    const normalizedSearch = submittedSearch.toLowerCase();

    const baseFiltered = featuredJobs.filter((job) => {
      if (!isJobActive(job)) return false;
      const searchable = `${job.title} ${job.company} ${job.location} ${job.category || ""}`.toLowerCase();
      const matchesSearch = searchable.includes(normalizedSearch);
      const matchesCategory =
        submittedCategory === "Tümü"
          ? true
          : (job.category || inferCategory(job.title)) === submittedCategory;
      const matchesType =
        submittedJobType === "Tümü"
          ? true
          : job.type === submittedJobType;

      return matchesSearch && matchesCategory && matchesType;
    });

    if (submittedCity === "Tümü") {
      return baseFiltered;
    }

    const selectedCity = submittedCity.toLocaleLowerCase("tr-TR");

    const cityMatched = baseFiltered.filter((job) =>
      job.location.toLocaleLowerCase("tr-TR").includes(selectedCity)
    );

    const fallbackTurkey = baseFiltered.filter(
      (job) =>
        !job.location.toLocaleLowerCase("tr-TR").includes(selectedCity) &&
        job.location.toLocaleLowerCase("tr-TR").includes("türkiye")
    );

    const remainingPool = baseFiltered.filter(
      (job) =>
        !cityMatched.includes(job) &&
        !fallbackTurkey.includes(job)
    );

    return [...cityMatched, ...fallbackTurkey, ...remainingPool];
  }, [featuredJobs, submittedSearch, submittedCategory, submittedJobType, submittedCity]);

  const visibleFeaturedJobs = filteredFeaturedJobs;
  const approvePendingJob = async (job) => {
    const approvedJob = {
      ...job,
      status: "active",
      approvedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      featuredStatus: job.plan === "featured" ? "live" : undefined,
    };

    if (job.dbId) {
      const { error } = await supabase
        .from("job_posts")
        .update({ status: "active" })
        .eq("id", job.dbId);

      if (error) {
        console.error("İlan onaylanamadı:", error);
        alert("İlan onaylanamadı 😥");
        return;
      }
    }

    setPendingJobs((prev) => prev.filter((item) => item.id !== job.id));

    
    setAdminNotifications((prev) => [
      {
        id: Date.now(),
        text: `${job.title} yayına alındı.`,
      },
      ...prev,
    ]);
if (job.plan === "featured") {
      setFeaturedJobs((prev) => [approvedJob, ...prev]);
    } else {
      setJobs((prev) => [approvedJob, ...prev]);
    }

  };

  const rejectPendingJob = async (jobId) => {
    const job = pendingJobs.find((item) => item.id === jobId);

    if (job?.dbId) {
      const { error } = await supabase
        .from("job_posts")
        .update({ status: "rejected" })
        .eq("id", job.dbId);

      if (error) {
        console.error("İlan reddedilemedi:", error);
        alert("İlan reddedilemedi 😥");
        return;
      }
    }

    setPendingJobs((prev) => prev.filter((item) => item.id !== jobId));
  };

  const updateDbJob = async (job, changes, errorMessage) => {
    if (!job.dbId) return true;

    const { error } = await supabase
      .from("job_posts")
      .update(changes)
      .eq("id", job.dbId);

    if (error) {
      console.error(errorMessage, error);
      alert(errorMessage);
      return false;
    }

    return true;
  };

  const toggleJobActive = async (job) => {
    const nextStatus = job.status === "passive" ? "active" : "passive";
    const ok = await updateDbJob(job, { status: nextStatus }, "İlan durumu güncellenemedi 😥");
    if (!ok) return;

    const toggle = (item) =>
      item.id === job.id ? { ...item, status: nextStatus } : item;

    if (job.adminStatus === "Ekiş Acil") {
      setFeaturedJobs((prev) => prev.map(toggle));
    } else {
      setJobs((prev) => prev.map(toggle));
    }
  };

  const makeJobFeatured = async (job) => {
    const ok = await updateDbJob(job, { plan_type: "featured", status: "active" }, "İlan Ekiş Acil yapılamadı 😥");
    if (!ok) return;

    setJobs((prev) => prev.filter((item) => item.id !== job.id));
    setFeaturedJobs((prev) => [
      {
        ...job,
        plan: "featured",
        status: "active",
        durationDays: 15,
        featuredStatus: "live",
      },
      ...prev,
    ]);
  };

  const makeJobStandard = async (job) => {
    const ok = await updateDbJob(job, { plan_type: "normal", status: "active" }, "İlan standarda alınamadı 😥");
    if (!ok) return;

    setFeaturedJobs((prev) => prev.filter((item) => item.id !== job.id));
    setJobs((prev) => [
      {
        ...job,
        plan: "free",
        status: "active",
        durationDays: 30,
        featuredStatus: null,
      },
      ...prev,
    ]);
  };

  const deleteJob = async (job) => {
    const ok = await updateDbJob(job, { status: "rejected" }, "İlan silinemedi 😥");
    if (!ok) return;

    if (job.adminStatus === "Ekiş Acil") {
      setFeaturedJobs((prev) => prev.filter((item) => item.id !== job.id));
    } else if (job.adminStatus === "Onay Bekliyor") {
      setPendingJobs((prev) => prev.filter((item) => item.id !== job.id));
    } else {
      setJobs((prev) => prev.filter((item) => item.id !== job.id));
    }
  };

  const adminJobs = useMemo(() => {
    const all = [
      ...pendingJobs.map((job) => ({ ...job, adminStatus: "Onay Bekliyor" })),
      ...featuredJobs.map((job) => ({ ...job, adminStatus: "Ekiş Acil" })),
      ...jobs.map((job) => ({ ...job, adminStatus: "Standart" })),
    ];

    return all.filter((job) => {
      const searchText = `${job.title} ${job.company} ${job.location} ${job.contactPhone || ""}`.toLocaleLowerCase("tr-TR");
      const matchesSearch = searchText.includes(adminSearch.toLocaleLowerCase("tr-TR"));
      const active = isJobActive(job);

      // Admin panelde süresi bitmiş / pasif ilan gösterme
      if (!active) return false;

      if (adminFilter === "active") return matchesSearch;
      if (adminFilter === "pending") return matchesSearch && job.adminStatus === "Onay Bekliyor";
      if (adminFilter === "featured") return matchesSearch && job.adminStatus === "Ekiş Acil";
      if (adminFilter === "standard") return matchesSearch && job.adminStatus === "Standart";

      return matchesSearch;
    });
  }, [jobs, featuredJobs, pendingJobs, adminFilter, adminSearch]);

  const previewSalary = formatSalaryPreview(formData.workType, formData.salary);
  const totalCount = filteredFeaturedJobs.length + filteredJobs.length;

  const footerInfoContent = {
    about: {
      title: "Hakkımızda",
      blocks: [
        {
          type: "p",
          text: "Ekiş; günlük, saatlik, part time ve ek gelir odaklı iş fırsatlarını iş arayanlarla buluşturan ilan platformudur.",
        },
        {
          type: "p",
          text: "Platformun amacı, kısa süreli personel ihtiyacı olan işverenlerle ek gelir veya esnek çalışma fırsatı arayan kişileri daha hızlı ve sade bir ilan akışı içinde buluşturmaktır.",
        },
        {
          type: "note",
          text: "Ekiş, işveren ile aday arasında doğrudan iş ilişkisi kurmaz; ilan ve iletişim altyapısı sağlar. İşe alım, görüşme, ücret, çalışma koşulları ve taraflar arasındaki anlaşmalar işveren ile adayın sorumluluğundadır.",
        },
      ],
    },

    kvkk: {
      title: "KVKK Aydınlatma Metni",
      blocks: [
        {
          type: "p",
          text: "Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında Ekiş platformu üzerinden işlenen kişisel verilere ilişkin bilgilendirme amacıyla hazırlanmıştır.",
        },
        {
          type: "p",
          text: "Ekiş üzerinden ilan veren kullanıcıların firma adı, yetkili kişi adı, telefon numarası, şehir/ilçe bilgisi, iş adresi veya buluşma noktası, ilan başlığı, ilan açıklaması ve ücret bilgisi gibi verileri işlenebilir.",
        },
        {
          type: "p",
          text: "Bu veriler; ilan oluşturma, ilanı admin kontrolünden geçirme, yayına alma, platform güvenliğini sağlama, sahte veya yanıltıcı ilanları önleme ve gerektiğinde kullanıcıyla iletişim kurma amaçlarıyla işlenir.",
        },
        {
          type: "p",
          text: "Kişisel veriler, yalnızca ilgili hizmetin sunulması için gerekli olduğu ölçüde işlenir. Hukuki zorunluluklar dışında üçüncü kişilerle paylaşılmaz.",
        },
        {
          type: "list",
          items: [
            "Kişisel verilerinizin işlenip işlenmediğini öğrenme",
            "İşlenmişse buna ilişkin bilgi talep etme",
            "Eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme",
            "İlgili mevzuat kapsamında silinmesini veya yok edilmesini talep etme",
            "İşleme faaliyetlerine ilişkin itiraz ve başvuru haklarını kullanma",
          ],
        },
        {
          type: "note",
          text: "KVKK kapsamındaki talepleriniz için platform iletişim kanallarından bize ulaşabilirsiniz. Resmi şirketleşme ve nihai yayın öncesinde bu metin hukuki danışmanla tekrar gözden geçirilmelidir.",
        },
      ],
    },

    privacy: {
      title: "Gizlilik Politikası",
      blocks: [
        {
          type: "p",
          text: "Ekiş, kullanıcıların gizliliğine önem verir. Platform üzerinden paylaşılan bilgiler yalnızca ilan yayınlama, ilan kontrolü, kullanıcı deneyimini iyileştirme ve güvenliği sağlama amaçlarıyla kullanılır.",
        },
        {
          type: "list",
          items: [
            "İlan veren kişinin veya firmanın iletişim bilgileri",
            "İlan başlığı, açıklaması, kategori, şehir ve ücret bilgileri",
            "Platform güvenliği için temel kullanım ve işlem kayıtları",
            "Spam, sahte ilan veya kötüye kullanım tespiti için gerekli teknik bilgiler",
          ],
        },
        {
          type: "p",
          text: "Ekiş, kullanıcıların kart bilgilerini saklamaz. Ödeme süreçleri üçüncü taraf güvenli ödeme sağlayıcıları üzerinden yürütülür.",
        },
        {
          type: "p",
          text: "İlanlarda yer alan telefon ve iletişim bilgileri, ilanın doğası gereği kullanıcılar tarafından görüntülenebilir. İlan veren kişi bu bilgileri paylaşmadan önce doğru ve paylaşılabilir olduğunu kabul eder.",
        },
        {
          type: "note",
          text: "Güvenlik, dolandırıcılık şüphesi veya yasal zorunluluk hâllerinde ilgili kayıtlar yetkili kurumlarla paylaşılabilir.",
        },
      ],
    },

    terms: {
      title: "Kullanım Şartları",
      blocks: [
        {
          type: "p",
          text: "Ekiş’i kullanan tüm kullanıcılar aşağıdaki kullanım şartlarını kabul etmiş sayılır.",
        },
        {
          type: "list",
          items: [
            "İlan bilgilerinin doğruluğu ilan sahibi kullanıcıya veya işverene aittir.",
            "Yanıltıcı, sahte, eksik, hukuka aykırı veya üçüncü kişileri zarara uğratabilecek ilanlar yayınlanamaz.",
            "Bahis, kripto/forex yatırım vaadi, dolandırıcılık, yasa dışı iş, müstehcen içerik veya benzeri riskli alanlara ilişkin ilanlar kabul edilmez.",
            "Ekiş, gerekli gördüğü ilanları reddetme, düzenleme talep etme, yayından kaldırma veya pasife alma hakkını saklı tutar.",
            "İlanlara başvuru, görüşme ve işe alım süreçleri işveren ile aday arasında yürütülür.",
            "Çalışma koşulları, ücret, sigorta, vardiya, görev tanımı ve benzeri konulardan ilan sahibi işveren sorumludur.",
            "Kullanıcılar yalnızca kendilerine ait veya paylaşma yetkisine sahip oldukları iletişim bilgilerini kullanmalıdır.",
            "Platformu spam, sahte ilan, otomatik işlem veya kötüye kullanım amacıyla kullanmak yasaktır.",
          ],
        },
        {
          type: "note",
          text: "Ekiş, ilan ve iletişim altyapısı sağlayan bir platformdur. Taraflar arasında doğabilecek iş ilişkisi, ödeme, anlaşmazlık veya hukuki uyuşmazlıklardan doğrudan sorumlu değildir.",
        },
      ],
    },

    contact: {
      title: "İletişim",
      blocks: [
        {
          type: "p",
          text: "Ekiş ile ilan, destek, iş birliği veya hukuki talepler için iletişime geçebilirsiniz.",
        },
        {
          type: "list",
          items: [
            "Destek: destek@ekis.com",
            "İş birliği: iletisim@ekis.com",
            "Destek saatleri: Hafta içi 09:00 – 18:00",
          ],
        },
        {
          type: "note",
          text: "Daha hızlı dönüş için mesajınızda ilan başlığını, firma adını ve yaşadığınız sorunu kısaca belirtmeniz önerilir.",
        },
      ],
    },

    cityJobs: {
      title: "Şehre Göre İşler",
      blocks: [
        {
          type: "p",
          text: "Ekiş’te ilanları şehir filtresiyle daraltabilir, bulunduğunuz yere yakın günlük, saatlik ve part time iş fırsatlarını inceleyebilirsiniz.",
        },
        {
          type: "list",
          items: [
            "Şehir seçimiyle ilanları konuma göre filtreleyebilirsiniz.",
            "İstanbul, Ankara, İzmir, Eskişehir, Bursa, Antalya ve diğer şehirlerdeki ilanları tek ekranda görebilirsiniz.",
            "Uzaktan / Türkiye seçeneğiyle dijital ve freelance iş fırsatlarını da takip edebilirsiniz.",
          ],
        },
      ],
    },

    faq: {
      title: "Sık Sorulanlar",
      blocks: [
        {
          type: "list",
          items: [
            "İlanlara başvurmak için üyelik zorunlu değildir.",
            "İlan detayındaki iletişim bilgileri üzerinden işverenle doğrudan görüşebilirsiniz.",
            "Tüm ilanlar yayına alınmadan önce admin kontrolünden geçer.",
            "Ekiş Acil ilanlar daha görünür alanda listelenir.",
            "Sahte veya yanıltıcı ilanlar tespit edildiğinde yayından kaldırılabilir.",
          ],
        },
      ],
    },

    pricing: {
      title: "Fiyatlandırma",
      blocks: [
        {
          type: "p",
          text: "Ekiş’te standart ilan yayınlama modeli ve Ekiş Acil görünürlük modeli platformun gelir yapısını oluşturur.",
        },
        {
          type: "list",
          items: [
            "Standart ilan: Normal ilan listesinde görünür.",
            "Ekiş Acil: Ana sayfada daha görünür özel alanda listelenir.",
            "Ücretli ilanlarda ödeme tamamlandıktan sonra admin onay süreci başlatılır.",
          ],
        },
        {
          type: "note",
          text: "Fiyatlandırma ve paket detayları ödeme altyapısı tamamen aktif olduğunda güncellenebilir.",
        },
      ],
    },

    support: {
      title: "Destek Al",
      blocks: [
        {
          type: "p",
          text: "İlan verme, ilan düzenleme, ödeme, Ekiş Acil kullanımı veya teknik sorunlar için destek alabilirsiniz.",
        },
        {
          type: "list",
          items: [
            "İlan başlığınızı belirtin.",
            "Firma adınızı yazın.",
            "Yaşadığınız sorunu kısa ve net anlatın.",
          ],
        },
      ],
    },
  };

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

        .ad-slot {
          width: 100%;
          border-radius: 24px;
          border: 1px dashed rgba(60,74,95,0.14);
          background: linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(245,247,248,0.96) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #7A8798;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.02em;
        }
        .ad-slot-banner {
          height: 92px;
          margin: 10px 0 18px;
        }
        .ad-slot-footer {
          height: 110px;
          margin-top: 24px;
        }
        .inline-ad-card {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          border: 1px solid rgba(60,74,95,0.08);
          background:
            radial-gradient(circle at top left, rgba(246,90,69,0.08), transparent 36%),
            linear-gradient(180deg,#fff 0%,#f9fafb 100%);
          min-height: 138px;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .inline-ad-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          height: 28px;
          padding: 0 12px;
          border-radius: 999px;
          background: rgba(246,90,69,0.10);
          color: #f65a45;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 900;
        }
        .inline-ad-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: center;
          text-align: center;
        }
        .inline-ad-content strong {
          color: #233044;
          font-size: 20px;
          font-weight: 950;
        }
        .inline-ad-content span {
          color: #5D6B7F;
          font-size: 13px;
          font-weight: 700;
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
        .form-section-label {
          grid-column: 1 / -1;
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 4px 0 2px;
          color: ${PALETTE.slate};
          font-size: 13px;
          font-weight: 900;
          letter-spacing: -0.01em;
        }
        .form-section-label::before {
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: ${PALETTE.coral};
          box-shadow: 0 0 0 4px rgba(246,90,69,0.10);
        }
        .input-hint {
          font-size: 11px;
          font-weight: 700;
          color: ${PALETTE.softText};
          margin-top: -3px;
        }
        .post-field select {
          cursor: pointer;
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
          background: linear-gradient(180deg, #f65a45 0%, #f65a45 100%);
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
        .detail-action-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}
.detail-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
}
.detail-action-call { background: #f65a45; color: white; }
.detail-action-whatsapp { background: #25D366; color: white; }
.detail-action-map { background: #3C4A5F; color: white; }
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
        .footer-link-button {
          border: none;
          background: transparent;
          padding: 0;
          text-align: left;
          cursor: pointer;
          font-family: inherit;
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

        .footer-bottom-link {
          border: none;
          background: transparent;
          padding: 0;
          cursor: pointer;
          font-family: inherit;
        }
        .info-modal {
          width: min(760px, calc(100vw - 28px));
          max-height: min(86vh, 820px);
          background: linear-gradient(180deg, #fff 0%, #fcfcfd 100%);
          border-radius: 28px;
          border: 1px solid rgba(60,74,95,0.10);
          box-shadow: 0 34px 80px rgba(35,48,68,0.26);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .info-modal-head {
          position: relative;
          padding: 24px 28px 18px;
          background:
            radial-gradient(circle at top right, rgba(228,93,80,0.13), transparent 32%),
            linear-gradient(180deg, #fff 0%, #fff7f4 100%);
          border-bottom: 1px solid rgba(228,93,80,0.12);
        }
        .info-modal-title {
          margin: 0;
          color: ${PALETTE.slate};
          font-size: clamp(24px, 3vw, 34px);
          line-height: 1.1;
          font-weight: 950;
          letter-spacing: -0.045em;
          padding-right: 52px;
        }
        .info-modal-close {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 40px;
          height: 40px;
          border-radius: 999px;
          border: 1px solid rgba(60,74,95,0.10);
          background: #fff;
          color: ${PALETTE.slate};
          font-size: 24px;
          font-weight: 900;
          line-height: 1;
          cursor: pointer;
          box-shadow: 0 10px 24px rgba(60,74,95,0.08);
        }
        .info-modal-body {
          padding: 24px 28px 28px;
          overflow-y: auto;
          color: ${PALETTE.text};
          font-size: 15px;
          line-height: 1.75;
        }
        .info-modal-body p {
          margin: 0 0 14px;
          color: ${PALETTE.text};
        }
        .info-modal-body ul {
          margin: 8px 0 18px;
          padding-left: 20px;
          color: ${PALETTE.text};
        }
        .info-modal-body li {
          margin-bottom: 8px;
        }
        .info-modal-note {
          margin-top: 18px;
          padding: 14px 16px;
          border-radius: 18px;
          background: rgba(88,173,173,0.10);
          border: 1px solid rgba(88,173,173,0.14);
          color: ${PALETTE.slate};
          font-weight: 800;
        }
        .admin-page {
          position: fixed;
          inset: 0;
          z-index: 120;
          background:
            radial-gradient(circle at top left, rgba(228,93,80,0.10), transparent 28%),
            radial-gradient(circle at top right, rgba(88,173,173,0.13), transparent 24%),
            ${PALETTE.bg};
          overflow-y: auto;
          padding: 24px;
        }
        .admin-shell {
          max-width: 1280px;
          margin: 0 auto;
        }
        .admin-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 18px;
        }
        .admin-title-block h1 {
          margin: 0;
          color: ${PALETTE.slate};
          font-size: clamp(28px, 3vw, 44px);
          line-height: 1;
          font-weight: 950;
          letter-spacing: -0.055em;
        }
        .admin-title-block p {
          margin: 8px 0 0;
          color: ${PALETTE.softText};
          font-size: 14px;
          font-weight: 800;
        }
        .admin-logo {
          height: 74px;
          object-fit: contain;
        }
        .admin-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 18px;
        }
        .admin-stat {
          background: #fff;
          border: 1px solid rgba(60,74,95,0.08);
          border-radius: 22px;
          padding: 18px;
          box-shadow: 0 14px 30px rgba(60,74,95,0.06);
        }
        .admin-stat span {
          display: block;
          color: ${PALETTE.softText};
          font-size: 12px;
          font-weight: 900;
          margin-bottom: 8px;
        }
        .admin-stat strong {
          color: ${PALETTE.slate};
          font-size: 28px;
          line-height: 1;
          font-weight: 950;
          letter-spacing: -0.04em;
        }
        .admin-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          align-items: start;
        }
        .admin-panel {
          background: rgba(255,255,255,0.94);
          border: 1px solid rgba(60,74,95,0.08);
          border-radius: 26px;
          padding: 18px;
          box-shadow: 0 18px 42px rgba(60,74,95,0.08);
        }
        .admin-panel h2 {
          margin: 0 0 14px;
          color: ${PALETTE.slate};
          font-size: 22px;
          font-weight: 950;
          letter-spacing: -0.035em;
        }
        .admin-list {
          display: grid;
          gap: 12px;
        }
        .admin-job {
          background: linear-gradient(180deg, #fff 0%, #fbfcfd 100%);
          border: 1px solid rgba(60,74,95,0.08);
          border-radius: 18px;
          padding: 14px;
        }
        .admin-job-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 8px;
        }
        .admin-job-company {
          color: ${PALETTE.teal};
          font-size: 13px;
          font-weight: 950;
        }
        .admin-job h3 {
          margin: 3px 0 4px;
          color: ${PALETTE.slate};
          font-size: 17px;
          line-height: 1.15;
          font-weight: 950;
          letter-spacing: -0.03em;
        }
        .admin-job p {
          margin: 0;
          color: ${PALETTE.softText};
          font-size: 13px;
          font-weight: 750;
          line-height: 1.45;
        }
        .admin-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          padding: 7px 10px;
          background: #fff0eb;
          color: #ff4b2b;
          font-size: 11px;
          font-weight: 950;
          white-space: nowrap;
          border: 1px solid rgba(255,75,43,0.16);
        }
        .admin-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 12px;
        }
        .admin-mini-btn {
          border: none;
          border-radius: 12px;
          padding: 9px 11px;
          font-size: 12px;
          font-weight: 900;
          cursor: pointer;
          background: ${PALETTE.slate};
          color: #fff;
        }
        .admin-mini-btn.light {
          background: #fff;
          color: ${PALETTE.slate};
          border: 1px solid rgba(60,74,95,0.12);
        }
        .admin-mini-btn.danger {
          background: #dc2626;
          color: #fff;
        }
        .admin-empty {
          background: #fff;
          border: 1px dashed rgba(60,74,95,0.18);
          color: ${PALETTE.softText};
          border-radius: 18px;
          padding: 22px;
          text-align: center;
          font-weight: 850;
        }
        @media (max-width: 900px) {
          .admin-page { padding: 14px; }
          .admin-top { align-items: flex-start; flex-direction: column; }
          .admin-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .admin-grid { grid-template-columns: 1fr; }
        }
        .featured-list-modal-grid {
          display: grid;
          gap: 12px;
        }
        .featured-list-modal-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 16px 18px;
          border-radius: 18px;
          background: #fff;
          border: 1px solid rgba(60,74,95,0.08);
          box-shadow: 0 10px 22px rgba(60,74,95,0.05);
          cursor: pointer;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .featured-list-modal-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 28px rgba(60,74,95,0.09);
        }
        .featured-list-modal-card h4 {
          margin: 4px 0 4px;
          color: ${PALETTE.slate};
          font-size: 18px;
          line-height: 1.15;
          font-weight: 950;
          letter-spacing: -0.03em;
        }
        .featured-list-modal-card p {
          margin: 0;
          color: ${PALETTE.softText};
          font-size: 13px;
          font-weight: 800;
        }
        .featured-list-modal-card strong {
          color: #ff4b2b;
          font-size: 15px;
          font-weight: 950;
          white-space: nowrap;
        }
        .featured-list-modal-company {
          color: ${PALETTE.teal};
          font-size: 13px;
          font-weight: 950;
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


        /* --- Popup düzeltme: direkt iletişimli ferah iki kolon --- */
        .detail-modal {
          width: min(1040px, calc(100vw - 36px));
          max-height: min(88vh, 900px);
          border-radius: 28px;
          overflow: hidden;
          background: #fff;
        }
        .detail-panel-inner {
          padding: 0;
          overflow-y: auto;
        }
        .detail-shell {
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(320px, 0.75fr);
          min-height: 610px;
        }
        .detail-left {
          padding: 34px 38px 28px;
          background: linear-gradient(180deg, #fff 0%, #fcfdfe 100%);
        }
        .detail-right {
          padding: 34px 36px 28px;
          background:
            radial-gradient(circle at top right, rgba(255,75,43,0.12), transparent 34%),
            linear-gradient(180deg, #fff8f5 0%, #fff 100%);
          border-left: 1px solid rgba(255,75,43,0.10);
        }
        .detail-close {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 42px;
          height: 42px;
          border-radius: 999px;
          border: 1px solid rgba(60,74,95,0.12);
          background: #fff;
          color: #233044;
          font-size: 24px;
          font-weight: 900;
          line-height: 1;
          cursor: pointer;
          box-shadow: 0 10px 24px rgba(60,74,95,0.08);
          z-index: 2;
        }
        .detail-badge-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 34px;
          padding-right: 52px;
        }
        .detail-featured-badge,
        .detail-type-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 36px;
          padding: 0 16px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: -0.02em;
        }
        .detail-featured-badge {
          color: #fff;
          background: linear-gradient(180deg, #f65a45 0%, #f65a45 100%);
          box-shadow: 0 10px 20px rgba(255,75,43,0.18);
        }
        .detail-type-badge {
          color: #ff4b2b;
          background: #fff0eb;
          border: 1px solid rgba(255,75,43,0.16);
        }
        .detail-time-badge {
          color: #0f7778;
          background: rgba(88,173,173,0.13);
          border-color: rgba(88,173,173,0.18);
        }
        .detail-company {
          margin: 0 0 10px;
          color: #58ADAD;
          font-size: 17px;
          font-weight: 950;
          letter-spacing: -0.02em;
        }
        .detail-title {
          margin: 0 0 16px;
          max-width: 620px;
          font-size: clamp(32px, 4vw, 48px);
          line-height: 1.05;
          font-weight: 950;
          letter-spacing: -0.055em;
          color: #3C4A5F;
        }
        .detail-summary {
          max-width: 640px;
          margin: 0 0 26px;
          color: #3C4A5F;
          font-size: 17px;
          line-height: 1.65;
          font-weight: 550;
        }
        .detail-left-meta {
          display: flex;
          align-items: center;
          gap: 28px;
          flex-wrap: wrap;
          padding-bottom: 28px;
          border-bottom: 1px solid rgba(60,74,95,0.10);
          margin-bottom: 28px;
        }
        .detail-left-meta span {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: #3C4A5F;
          font-size: 15px;
          font-weight: 750;
        }
        .detail-left-meta svg {
          width: 18px;
          height: 18px;
          color: #233044;
        }
        .detail-address-grid {
          display: grid;
          gap: 14px;
          margin-bottom: 24px;
        }
        .detail-address-card {
          display: flex;
          align-items: center;
          gap: 14px;
          min-height: 70px;
          padding: 16px 18px;
          border-radius: 20px;
          background: #fff;
          border: 1px solid rgba(60,74,95,0.10);
          box-shadow: 0 12px 26px rgba(60,74,95,0.035);
        }
        .detail-address-icon {
          width: 42px;
          height: 42px;
          border-radius: 16px;
          background: #fff0eb;
          color: #ff4b2b;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .detail-address-card span {
          display: block;
          color: #5D6B7F;
          font-size: 13px;
          font-weight: 850;
          margin-bottom: 4px;
        }
        .detail-address-card strong {
          display: block;
          color: #233044;
          font-size: 16px;
          line-height: 1.35;
          font-weight: 950;
        }
        .detail-description-box {
          padding: 22px 24px;
          border-radius: 22px;
          background: #fff;
          border: 1px solid rgba(60,74,95,0.08);
          box-shadow: 0 12px 26px rgba(60,74,95,0.04);
        }
        .detail-description-title {
          margin: 0 0 12px;
          color: #3C4A5F;
          font-size: 19px;
          font-weight: 950;
          letter-spacing: -0.025em;
        }
        .detail-description {
          color: #233044;
          font-size: 15.5px;
          line-height: 1.75;
          white-space: pre-wrap;
        }
        .detail-salary-side {
          padding-bottom: 26px;
          border-bottom: 1px solid rgba(60,74,95,0.10);
          margin-bottom: 22px;
        }
        .detail-salary-side-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .detail-salary-label {
          color: #3C4A5F;
          font-size: 15px;
          font-weight: 950;
          margin-bottom: 10px;
        }
        .detail-salary {
          color: #ff4b2b;
          font-size: clamp(30px, 3vw, 42px);
          line-height: 1.12;
          font-weight: 950;
          letter-spacing: -0.05em;
        }
        .detail-salary-icon {
          width: 72px;
          height: 72px;
          border-radius: 999px;
          background: #fff0eb;
          color: #ff4b2b;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .detail-side-list {
          display: grid;
          gap: 0;
          margin-bottom: 22px;
        }
        .detail-side-row {
          display: grid;
          grid-template-columns: 52px 1fr;
          gap: 12px;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid rgba(60,74,95,0.10);
        }
        .detail-side-icon {
          width: 46px;
          height: 46px;
          border-radius: 999px;
          background: #f4f6f8;
          color: #3C4A5F;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .detail-side-row span {
          display: block;
          color: #5D6B7F;
          font-size: 13px;
          font-weight: 800;
          margin-bottom: 3px;
        }
        .detail-side-row strong {
          display: block;
          color: #233044;
          font-size: 16px;
          line-height: 1.35;
          font-weight: 950;
        }
        .detail-contact-box {
          padding: 18px 18px;
          border-radius: 22px;
          background: rgba(88,173,173,0.10);
          border: 1px solid rgba(88,173,173,0.14);
          margin-bottom: 16px;
        }
        .detail-contact-title {
          color: #0f7778;
          font-size: 16px;
          font-weight: 950;
          margin: 0 0 12px;
        }
        .detail-contact-line {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          padding: 8px 0;
          color: #3C4A5F;
          font-size: 14px;
          font-weight: 800;
          border-top: 1px solid rgba(88,173,173,0.13);
        }
        .detail-contact-line:first-of-type {
          border-top: none;
        }
        .detail-contact-line strong {
          color: #233044;
          text-align: right;
          font-weight: 950;
        }
        .detail-apply-note {
          color: #5D6B7F;
          font-size: 13px;
          font-weight: 750;
          line-height: 1.6;
          padding: 0;
          border: none;
          background: transparent;
        }


        .plan-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          margin-top: 10px;
        }
        .plan-card {
          border: 1px solid rgba(60,74,95,0.12);
          background: #fff;
          border-radius: 20px;
          padding: 18px;
          text-align: left;
          cursor: pointer;
          display: grid;
          gap: 6px;
          box-shadow: 0 10px 22px rgba(60,74,95,0.05);
          color: ${PALETTE.slate};
        }
        .plan-card.active {
          border-color: rgba(255,75,43,0.38);
          background: linear-gradient(180deg, #fff8f5 0%, #fff 100%);
          box-shadow: 0 16px 34px rgba(255,75,43,0.13);
        }
        .plan-card strong {
          font-size: 18px;
          font-weight: 950;
          letter-spacing: -0.03em;
        }
        .plan-card small {
          color: ${PALETTE.softText};
          font-size: 13px;
          font-weight: 800;
        }
        .plan-kicker {
          color: #ff4b2b;
          font-size: 12px;
          font-weight: 950;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }
        .detail-shell-clean {
          grid-template-columns: 390px 1fr;
          min-height: 700px;
        }
        .detail-side-clean {
          border-right: 1px solid rgba(255,75,43,0.10);
          padding: 34px 32px;
          background: linear-gradient(180deg, #fff 0%, #fbfcfd 100%);
        }
        .detail-main-clean {
          padding: 120px 44px 40px;
          background: #fff;
          border-left: none;
          border-top: none;
        }
        .compact-salary-card {
          margin-top: 26px;
          border-radius: 22px;
          border: 1px solid rgba(255,75,43,0.14);
          background: linear-gradient(180deg, #fff8f5 0%, #fff 100%);
          padding: 22px;
        }
        .compact-salary-card .detail-salary {
          font-size: 34px;
          line-height: 1.12;
        }
        .detail-contact-box-left {
          margin-top: 18px;
          padding: 22px;
          border-radius: 22px;
          background: rgba(88,173,173,0.10);
          border: 1px solid rgba(88,173,173,0.16);
        }
        .detail-contact-box-left .detail-contact-title {
          margin-bottom: 16px;
          color: #0f766e;
        }
        .contact-item {
          display: grid;
          grid-template-columns: 42px 1fr;
          gap: 12px;
          align-items: center;
          padding: 14px 0;
          border-bottom: 1px solid rgba(60,74,95,0.08);
        }
        .contact-item:last-of-type { border-bottom: none; }
        .contact-icon {
          width: 42px;
          height: 42px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          color: ${PALETTE.slate};
          box-shadow: 0 8px 18px rgba(60,74,95,0.06);
        }
        .contact-item span:not(.contact-icon) {
          display: block;
          color: ${PALETTE.softText};
          font-size: 12px;
          font-weight: 900;
          margin-bottom: 4px;
        }
        .contact-item strong {
          display: block;
          color: ${PALETTE.slate};
          font-size: 15px;
          font-weight: 950;
          line-height: 1.25;
        }
        .clean-note {
          margin: 18px 0 0;
          padding: 0;
          background: transparent;
          border: none;
          color: ${PALETTE.softText};
          font-size: 13px;
          line-height: 1.55;
        }
        .detail-meta-clean {
          margin-top: 28px;
          padding-bottom: 26px;
          border-bottom: 1px solid rgba(60,74,95,0.10);
        }
        .detail-meta-clean span strong {
          margin-left: 4px;
          color: ${PALETTE.slate};
        }
        .detail-description-clean {
          margin-top: 28px;
          padding: 24px 26px;
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

          .detail-shell { grid-template-columns: 1fr; min-height: auto; }
          .detail-left, .detail-right { padding: 22px 18px; }
          .detail-right { border-left: none; border-top: 1px solid rgba(255,75,43,0.10); }
          .detail-side-clean { border-right: none; border-bottom: 1px solid rgba(255,75,43,0.10); }
          .detail-main-clean { padding: 22px 18px; }
          .detail-title { font-size: 32px; }
          .detail-left-meta { gap: 14px; }
          .plan-grid { grid-template-columns: 1fr; }

        }

        .admin-compact-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 16px;
          align-items: start;
        }
        .admin-side {
          background: rgba(255,255,255,0.94);
          border: 1px solid rgba(60,74,95,0.08);
          border-radius: 26px;
          padding: 18px;
          box-shadow: 0 18px 42px rgba(60,74,95,0.08);
          position: sticky;
          top: 18px;
        }
        .admin-side-title {
          margin: 0 0 12px;
          color: ${PALETTE.slate};
          font-size: 18px;
          font-weight: 950;
          letter-spacing: -0.03em;
        }
        .admin-side-list {
          display: grid;
          gap: 8px;
        }
        .admin-side-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          width: 100%;
          border: 1px solid rgba(60,74,95,0.08);
          background: #fff;
          color: ${PALETTE.slate};
          border-radius: 16px;
          padding: 12px 13px;
          font-family: inherit;
          font-size: 13px;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 0 8px 18px rgba(60,74,95,0.04);
        }
        .admin-side-item span {
          color: ${PALETTE.coral};
          font-weight: 950;
        }
        .admin-main-panel {
          background: rgba(255,255,255,0.94);
          border: 1px solid rgba(60,74,95,0.08);
          border-radius: 26px;
          padding: 18px;
          box-shadow: 0 18px 42px rgba(60,74,95,0.08);
        }
        .admin-main-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 14px;
        }
        .admin-main-head h2 {
          margin: 0;
          color: ${PALETTE.slate};
          font-size: 24px;
          font-weight: 950;
          letter-spacing: -0.04em;
        }
        .admin-table {
          display: grid;
          gap: 10px;
        }
        .admin-table-row {
          display: grid;
          grid-template-columns: 1.4fr 1fr 0.8fr 0.9fr auto;
          align-items: center;
          gap: 12px;
          padding: 14px;
          border-radius: 18px;
          background: linear-gradient(180deg, #fff 0%, #fbfcfd 100%);
          border: 1px solid rgba(60,74,95,0.08);
        }
        .admin-table-row.header {
          background: transparent;
          border: none;
          box-shadow: none;
          color: ${PALETTE.softText};
          font-size: 12px;
          font-weight: 950;
          padding: 4px 14px;
        }
        .admin-table-title {
          min-width: 0;
        }
        .admin-table-title strong {
          display: block;
          color: ${PALETTE.slate};
          font-size: 15px;
          line-height: 1.15;
          font-weight: 950;
          letter-spacing: -0.02em;
        }
        .admin-table-title span,
        .admin-table-cell {
          display: block;
          color: ${PALETTE.softText};
          font-size: 12px;
          font-weight: 850;
          margin-top: 4px;
        }
        .admin-table-actions {
          display: flex;
          justify-content: flex-end;
          flex-wrap: wrap;
          gap: 7px;
        }
        .admin-tools {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 10px;
          margin-bottom: 14px;
        }
        .admin-tools input,
        .admin-tools select {
          height: 44px;
          border: 1px solid rgba(60,74,95,0.12);
          background: #fff;
          color: ${PALETTE.slate};
          border-radius: 14px;
          padding: 0 14px;
          font-size: 13px;
          font-weight: 850;
          outline: none;
        }
        .admin-expired {
          opacity: 0.68;
          background: #f7f8fa;
        }
        .admin-status-line {
          margin-top: 5px;
          color: ${PALETTE.softText};
          font-size: 12px;
          font-weight: 900;
        }
        .captcha-box {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 10px;
          align-items: end;
          grid-column: 1 / -1;
          padding: 14px;
          border-radius: 18px;
          background: rgba(88,173,173,0.08);
          border: 1px solid rgba(88,173,173,0.14);
        }
        .captcha-question {
          height: 46px;
          display: flex;
          align-items: center;
          padding: 0 14px;
          border-radius: 14px;
          background: #fff;
          color: ${PALETTE.slate};
          font-weight: 950;
          border: 1px solid rgba(60,74,95,0.10);
        }
        .admin-login-card {
          max-width: 460px;
          margin: 80px auto 0;
          background: #fff;
          border: 1px solid rgba(60,74,95,0.08);
          border-radius: 28px;
          padding: 28px;
          box-shadow: 0 24px 60px rgba(60,74,95,0.12);
        }
        .admin-login-card h1 {
          margin: 0 0 8px;
          color: ${PALETTE.slate};
          font-size: 34px;
          font-weight: 950;
          letter-spacing: -0.05em;
        }
        .admin-login-card p {
          margin: 0 0 18px;
          color: ${PALETTE.softText};
          font-size: 14px;
          font-weight: 800;
          line-height: 1.45;
        }
        .admin-login-card input {
          width: 100%;
          height: 50px;
          border: 1px solid rgba(60,74,95,0.12);
          border-radius: 16px;
          padding: 0 15px;
          color: ${PALETTE.slate};
          font-size: 15px;
          font-weight: 850;
          outline: none;
          margin-bottom: 12px;
        }
        .admin-login-error {
          color: ${PALETTE.coral};
          font-size: 13px;
          font-weight: 900;
          margin: 0 0 12px;
        }
        .admin-login-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        @media (max-width: 1000px) {
          .admin-compact-layout { grid-template-columns: 1fr; }
          .admin-side { position: static; }
          .admin-table-row {
            grid-template-columns: 1fr;
            align-items: start;
          }
          .admin-table-row.header { display: none; }
          .admin-table-actions { justify-content: flex-start; }
        }

        /* ADMIN FINAL COMFORT POLISH - sadece admin panel */
        .admin-page {
          padding: 14px !important;
        }

        .admin-shell {
          max-width: none !important;
          width: 100% !important;
          margin: 0 !important;
        }

        .admin-top {
          margin-bottom: 14px !important;
        }

        .admin-title-block {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .admin-logo {
          height: 78px !important;
          max-width: 150px !important;
          margin: 0 !important;
          object-fit: contain !important;
          filter: drop-shadow(0 10px 18px rgba(60,74,95,0.12));
        }

        .admin-title-block h1 {
          font-size: 38px !important;
          line-height: 1 !important;
          margin: 0 !important;
        }

        .admin-title-block p {
          width: 100%;
          margin: -4px 0 0 94px !important;
        }

        .admin-stats {
          gap: 14px !important;
          margin-bottom: 14px !important;
        }

        .admin-stat {
          border-radius: 24px !important;
          padding: 20px !important;
          background: #fff !important;
          box-shadow: 0 12px 28px rgba(60,74,95,0.06) !important;
        }

        .admin-stat span {
          font-size: 13px !important;
          font-weight: 900 !important;
          color: #5D6B7F !important;
        }

        .admin-stat strong {
          font-size: 38px !important;
          line-height: 1 !important;
        }

        .admin-compact-layout {
          grid-template-columns: 250px minmax(0, 1fr) !important;
          gap: 14px !important;
        }

        .admin-side,
        .admin-main-panel {
          border-radius: 26px !important;
          box-shadow: 0 12px 30px rgba(60,74,95,0.06) !important;
        }

        .admin-side {
          padding: 18px !important;
        }

        .admin-main-panel {
          padding: 18px !important;
        }

        .admin-side-title {
          margin-bottom: 12px !important;
        }

        .admin-side-list {
          gap: 10px !important;
        }

        .admin-side-item {
          min-height: 52px !important;
          border-radius: 18px !important;
        }

        .admin-main-head {
          margin-bottom: 14px !important;
        }

        .admin-main-head h2 {
          font-size: 28px !important;
        }

        .admin-tools {
          gap: 10px !important;
          margin-bottom: 12px !important;
        }

        .admin-tools input,
        .admin-tools select {
          height: 50px !important;
          border-radius: 16px !important;
        }

        .admin-table {
          gap: 8px !important;
        }

        .admin-table-row {
          border-radius: 18px !important;
          padding: 14px 16px !important;
          gap: 12px !important;
          grid-template-columns:
            minmax(240px, 1.4fr)
            minmax(130px, 0.75fr)
            minmax(92px, 0.5fr)
            minmax(116px, 0.58fr)
            minmax(290px, 1fr) !important;
        }

        .admin-table-row.header {
          padding-top: 12px !important;
          padding-bottom: 12px !important;
          background: rgba(60,74,95,0.045) !important;
        }

        .admin-badge {
          border-radius: 999px !important;
          background: rgba(246,90,69,0.10) !important;
          color: #f65a45 !important;
          font-weight: 950 !important;
        }

        .admin-status-line {
          margin-top: 5px !important;
          color: #7A8798 !important;
          font-size: 12px !important;
          font-weight: 850 !important;
        }

        .admin-table-actions {
          display: flex !important;
          flex-wrap: wrap !important;
          gap: 8px !important;
          justify-content: flex-end !important;
        }

        .admin-mini-btn,
        .admin-table-actions button {
          min-height: 38px !important;
          border: none !important;
          border-radius: 999px !important;
          padding: 0 13px !important;
          font-size: 12px !important;
          font-weight: 950 !important;
          cursor: pointer !important;
          box-shadow: none !important;
          white-space: nowrap !important;
        }

        .admin-mini-btn.light,
        .admin-table-actions button:nth-child(1) {
          background: #EAF2FF !important;
          color: #2563EB !important;
        }

        .admin-table-actions button:nth-child(2),
        .admin-mini-btn:not(.light):not(.danger) {
          background: rgba(16,185,129,0.12) !important;
          color: #059669 !important;
        }

        .admin-table-actions button:nth-child(3) {
          background: rgba(246,90,69,0.13) !important;
          color: #f65a45 !important;
        }

        .admin-mini-btn.danger,
        .admin-table-actions button:last-child {
          background: rgba(239,68,68,0.12) !important;
          color: #DC2626 !important;
        }

        .admin-mini-btn:hover,
        .admin-table-actions button:hover,
        .admin-side-item:hover {
          transform: translateY(-1px);
          filter: brightness(0.98);
        }

        @media (max-width: 1180px) {
          .admin-page {
            padding: 12px !important;
          }

          .admin-compact-layout {
            grid-template-columns: 1fr !important;
          }

          .admin-table-row {
            grid-template-columns: 1fr !important;
          }

          .admin-table-row.header {
            display: none !important;
          }

          .admin-table-actions {
            justify-content: flex-start !important;
          }

          .admin-title-block p {
            margin-left: 0 !important;
          }
        }

        @media (max-width: 760px) {
          .admin-page {
            padding: 10px !important;
          }

          .admin-title-block {
            align-items: flex-start;
            flex-direction: column;
            gap: 8px;
          }

          .admin-logo {
            height: 66px !important;
          }

          .admin-title-block h1 {
            font-size: 30px !important;
          }

          .admin-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }

          .admin-stat {
            padding: 15px !important;
          }

          .admin-stat strong {
            font-size: 30px !important;
          }

          .admin-main-panel {
            padding: 14px !important;
          }

          .admin-table-row {
            padding: 14px !important;
          }
        }

        /* ADMIN AUTOMATION NOTIFICATIONS */
        .admin-notification-box {
          min-width: 260px;
          max-width: 360px;
          border-radius: 22px;
          padding: 16px;
          background: #fff;
          border: 1px solid rgba(60,74,95,0.08);
          box-shadow: 0 12px 28px rgba(60,74,95,0.06);
        }

        .admin-notification-box strong {
          display: block;
          margin-bottom: 12px;
          color: #233044;
          font-size: 15px;
          font-weight: 950;
        }

        .admin-notification-box span {
          color: #7A8798;
          font-size: 13px;
          font-weight: 800;
        }

        .admin-notification-item {
          min-height: 42px;
          border-radius: 14px;
          padding: 10px 12px;
          margin-bottom: 8px;
          background: rgba(246,90,69,0.08);
          color: #f65a45;
          display: flex;
          align-items: center;
          font-size: 13px;
          font-weight: 900;
          line-height: 1.35;
        }

        @media (max-width: 1180px) {
          .admin-notification-box {
            width: 100%;
            max-width: none;
          }
        }

        .admin-notification-clear {
          width: 100%;
          min-height: 34px;
          border: none;
          border-radius: 12px;
          background: #F3F6FA;
          color: #5D6B7F;
          font-size: 12px;
          font-weight: 900;
          cursor: pointer;
        }

      `}</style>

      {isAdminRoute && (
        <div className="admin-page">
          {!adminAuthenticated ? (
            <div className="admin-login-card">
              <h1>Admin Girişi</h1>
              <p>Admin paneline devam etmek için şifre gir.</p>
    <input
  type="email"
  placeholder="E-posta adresiniz"
  value={adminEmail}
  onChange={(e) => setAdminEmail(e.target.value)}
  className="admin-input"
/>
<input
  type="password"
  placeholder="Admin şifresi"
  value={adminPassword}
  onChange={(e) => {
    setAdminPassword(e.target.value);
    setAdminLoginError("");
  }}
  onKeyDown={(e) => {
    if (e.key === "Enter") handleAdminLogin();
  }}
  className="admin-input"
/>
              {adminLoginError && <div className="admin-login-error">{adminLoginError}</div>}
              <div className="admin-login-actions">
                <button className="btn btn-primary" type="button" onClick={handleAdminLogin}>
                  Giriş Yap
                </button>
                <button className="btn btn-secondary" type="button" onClick={goHome}>
                  Siteye Dön
                </button>
              </div>
            </div>
          ) : (
          <div className="admin-shell">
            <div className="admin-top">
              <div className="admin-title-block">
                <img
                  className="admin-logo"
                  src={logoSrc}
                  alt="Ekiş logo"
                  onError={() => {
                    if (logoSrc !== "/logo-ekis.png") setLogoSrc("/logo-ekis.png");
                  }}
                />
                <h1>Admin Paneli</h1>
                <p>Daha sade yönetim ekranı: ilanları tek listeden kontrol et.</p>
              </div>

              <div className="admin-notification-box">
                <strong>Bildirimler</strong>
                {adminNotifications.length === 0 ? (
                  <span>Yeni bildirim yok</span>
                ) : (
                  <>
                    {adminNotifications.slice(0, 4).map((item) => (
                      <div className="admin-notification-item" key={item.id}>
                        {item.text}
                      </div>
                    ))}
                    <button
                      className="admin-notification-clear"
                      type="button"
                      onClick={() => setAdminNotifications([])}
                    >
                      Bildirimleri temizle
                    </button>
                  </>
                )}
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button className="btn btn-secondary" type="button" onClick={handleAdminLogout}>
                  Çıkış Yap
                </button>
                <button className="btn btn-secondary" type="button" onClick={goHome}>
                  Siteye Dön
                </button>
              </div>
            </div>

            <div className="admin-stats">
              <div className="admin-stat">
                <span>Toplam ilan</span>
                <strong>{jobs.filter(isJobActive).length + featuredJobs.filter(isJobActive).length + pendingJobs.filter(isJobActive).length}</strong>
              </div>
              <div className="admin-stat">
                <span>Standart ilan</span>
                <strong>{jobs.filter(isJobActive).length}</strong>
              </div>
              <div className="admin-stat">
                <span>Ekiş Acil</span>
                <strong>{featuredJobs.filter(isJobActive).length}</strong>
              </div>
              <div className="admin-stat">
                <span>Bekleyen işlem</span>
                <strong>{pendingJobs.filter(isJobActive).length}</strong>
              </div>
            </div>

            <div className="admin-compact-layout">
              <aside className="admin-side">
                <h2 className="admin-side-title">Hızlı İşlemler</h2>
                <div className="admin-side-list">
                  <button className="admin-side-item" type="button">
                    Toplam ilan <span>{jobs.filter(isJobActive).length + featuredJobs.filter(isJobActive).length + pendingJobs.filter(isJobActive).length}</span>
                  </button>
                  <button className="admin-side-item" type="button" onClick={() => setAdminFilter("pending")}>
                    Onay bekleyen <span>{pendingJobs.filter(isJobActive).length}</span>
                  </button>
                  <button className="admin-side-item" type="button">
                    Ekiş Acil <span>{featuredJobs.filter(isJobActive).length}</span>
                  </button>
                  <button className="admin-side-item" type="button">
                    Standart ilan <span>{jobs.filter(isJobActive).length}</span>
                  </button>
                  <button className="admin-side-item" type="button" onClick={() => setShowForm(true)}>
                    Yeni ilan ekle <span>+</span>
                  </button>
                </div>
              </aside>

              <section className="admin-main-panel">
                <div className="admin-main-head">
                  <h2>Tüm İlanlar</h2>
                  <span className="admin-badge">{adminJobs.length} kayıt</span>
                </div>

                <div className="admin-tools">
                  <input
                    type="text"
                    placeholder="İlan, firma, şehir veya telefon ara..."
                    value={adminSearch}
                    onChange={(e) => setAdminSearch(e.target.value)}
                  />
                  <select value={adminFilter} onChange={(e) => setAdminFilter(e.target.value)}>
                    <option value="all">Tümü</option>
                    <option value="pending">Onay bekleyen</option>
                    <option value="active">Aktif</option>
                    <option value="featured">Ekiş Acil</option>
                    <option value="standard">Standart</option>
                  </select>
                </div>

                <div className="admin-table">
                  <div className="admin-table-row header">
                    <div>İlan</div>
                    <div>Konum</div>
                    <div>Tip</div>
                    <div>Durum</div>
                    <div>İşlem</div>
                  </div>

                  {adminJobs.length === 0 ? (
                    <div className="admin-empty">Bu filtrelere uygun ilan yok.</div>
                  ) : adminJobs.map((job) => (
                    <article className={`admin-table-row ${!isJobActive(job) ? "admin-expired" : ""}`} key={`${job.adminStatus}-${job.id}`}>
                      <div className="admin-table-title">
                        <strong>{job.title}</strong>
                        <span>{job.company}</span>
                        <div className="admin-status-line">{job.adminStatus === "Onay Bekliyor" ? "Admin onayı bekliyor" : getDaysLeftLabel(job)}</div>
                      </div>

                      <div className="admin-table-cell">{job.location}</div>
                      <div className="admin-table-cell">{job.type}</div>
                      <div>
                        <span className="admin-badge">{job.adminStatus === "Onay Bekliyor" ? "Onay bekliyor" : isJobActive(job) ? job.adminStatus : "Süresi doldu"}</span>
                      </div>

                      <div className="admin-table-actions">
                        <button className="admin-mini-btn light" type="button" onClick={() => setSelectedJob(job)}>
                          Detay
                        </button>

                        {job.adminStatus === "Onay Bekliyor" ? (
                          <>
                            <button className="admin-mini-btn" type="button" onClick={() => approvePendingJob(job)}>
                              Onayla
                            </button>
                            <button className="admin-mini-btn danger" type="button" onClick={() => rejectPendingJob(job.id)}>
                              Reddet
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="admin-mini-btn light"
                              type="button"
                              onClick={() => toggleJobActive(job)}
                            >
                              {job.status === "passive" ? "Aktif Et" : "Pasif Yap"}
                            </button>

                            {job.adminStatus === "Ekiş Acil" ? (
                              <button
                                className="admin-mini-btn light"
                                type="button"
                                onClick={() => makeJobStandard(job)}
                              >
                                Standarta Al
                              </button>
                            ) : (
                              <button
                                className="admin-mini-btn"
                                type="button"
                                onClick={() => makeJobFeatured(job)}
                              >
                                Ekiş Acil Yap
                              </button>
                            )}

                            <button
                              className="admin-mini-btn danger"
                              type="button"
                              onClick={() => deleteJob(job)}
                            >
                              Sil
                            </button>
                          </>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </div>
          )}
        </div>
      )}

      <header className={`topbar ${headerSmall ? "small" : ""}`} style={{ opacity: headerOpacity }}>
        <div className="container topbar-inner">
          <div className="brand-wrap">
            <a
              className="brand-logo-link"
              href="/"
              onClick={(e) => {
                e.preventDefault();
                goHome();
              }}
            >
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
              Hemen İlan Ver
            </button>
            <a className="btn btn-secondary" href="#ilanlar">
              Hemen İş Bul
            </a>
          </div>
        </div>
      </header>

      <PostJobModal
        show={showForm}
        formData={formData}
        errors={errors}
        captcha={captcha}
        previewSalary={previewSalary}
        showPreview={showPreview}
        onClose={() => setShowForm(false)}
        onChange={handleFormChange}
        onRefreshCaptcha={() => {
          setCaptcha(generateCaptchaQuestion());
          setFormData((prev) => ({ ...prev, captchaAnswer: "" }));
        }}
        onTogglePreview={() => setShowPreview((prev) => !prev)}
        onPublish={handlePublishClick}
      />

      {showPlanModal && (
        <div className="post-modal-backdrop" onClick={() => setShowPlanModal(false)}>
          <div className="post-modal" onClick={(e) => e.stopPropagation()}>
            <div className="post-panel-inner">
              <h3 className="post-title">İlanını nasıl yayınlamak istersin?</h3>
              <p className="post-desc">
                İlanın admin onayına düşer. Onay sonrası standart listede veya Ekiş Acil alanında yayınlanır.
              </p>

              <div className="plan-grid">
                <button
                  type="button"
                  className={`plan-card ${selectedPlan === "free" ? "active" : ""}`}
                  onClick={() => setSelectedPlan("free")}
                >
                  <span className="plan-kicker">Standart</span>
                  <strong>Ücretsiz İlan</strong>
                  <small>Standart listede yayınlanır.</small>
                </button>

                <button
                  type="button"
                  className={`plan-card ${selectedPlan === "featured" ? "active" : ""}`}
                  onClick={() => setSelectedPlan("featured")}
                >
                  <span className="plan-kicker">Ekiş Acil</span>
                  <strong>Ekiş Acil İlanı</strong>
                  <small>Ekiş Acil alanında daha görünür olur.</small>
                </button>
              </div>

              <div className="modal-actions" style={{ marginTop: 18 }}>
                <button className="btn btn-primary" type="button" onClick={handlePlanContinue}>
                  {selectedPlan === "featured" ? "Ödeme Adımına Geç" : "Onaya Gönder"}
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
            <button className="detail-close" type="button" onClick={() => setSelectedJob(null)}>×</button>

            <div className="detail-panel-inner">
              <div className="detail-shell detail-shell-clean">
                <aside className="detail-left detail-side-clean">
                  <div className="detail-badge-row">
                    {selectedJob.plan === "featured" || selectedJob.featuredStatus === "live" ? (
                      <span className="detail-featured-badge">★ Öne Çıkan</span>
                    ) : (
                      <span className="detail-featured-badge">Yeni İlan</span>
                    )}
                    <span className="detail-type-badge">{selectedJob.type}</span>
                    <span className="detail-type-badge detail-time-badge">{getDaysAgoLabel(selectedJob.createdAt)}</span>
                  </div>

                  <div className="detail-salary-side compact-salary-card">
                    <div className="detail-salary-side-top">
                      <div>
                        <div className="detail-salary-label">Ücret bilgisi</div>
                        <div className="detail-salary">{selectedJob.salary}</div>
                      </div>
                      <div className="detail-salary-icon" aria-hidden="true">
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                          <path d="M4 7.5h16v10H4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                          <path d="M7 10.5h.01M17 14.5h.01M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="detail-contact-box detail-contact-box-left">
                    <h4 className="detail-contact-title">İletişim bilgileri</h4>
                    <div className="contact-item">
                      <span className="contact-icon">👤</span>
                      <div><span>Yetkili kişi</span><strong>{selectedJob.contactName || "İşveren"}</strong></div>
                    </div>
                    <div className="contact-item">
                      <span className="contact-icon">☎</span>
                      <div><span>Telefon / WhatsApp</span><strong>{selectedJob.contactPhone}</strong></div>
                    </div>
                    <div className="contact-item">
                      <span className="contact-icon">⌖</span>
                      <div><span>Adres</span><strong>{selectedJob.workAddress || selectedJob.location}</strong></div>
                    </div>
          <div className="detail-action-buttons">
                  <a className="detail-action-btn detail-action-call" href={`tel:${(selectedJob.contactPhone || "").replace(/\s/g, "")}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.88a16 16 0 0 0 6 6l1.77-1.77a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    Ara
                  </a>
                  <a className="detail-action-btn detail-action-whatsapp" href={`https://wa.me/90${(selectedJob.contactPhone || "").replace(/\D/g, "").replace(/^0/, "")}`} target="_blank" rel="noopener noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.133 1.528 5.877L.057 23.5l5.773-1.515A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.369l-.36-.214-3.424.898.916-3.334-.235-.374A9.818 9.818 0 1 1 12 21.818z"/></svg>
                    WhatsApp
                  </a>
                  <a className="detail-action-btn detail-action-map" href={`https://maps.google.com/?q=${encodeURIComponent(selectedJob.workAddress || selectedJob.location || "")}`} target="_blank" rel="noopener noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    Haritada Gör
                  </a>
                </div>
                    <p className="detail-apply-note clean-note">
                      Görüşme ve işe alım süreci işveren tarafından yürütülür. Ekiş yalnızca ilan ve iletişim bilgisini gösterir.
                    </p>
                  </div>
                </aside>

                <section className="detail-right detail-main-clean">
                  <p className="detail-company">{selectedJob.company}</p>
                  <h3 className="detail-title">{selectedJob.title}</h3>
                  <p className="detail-summary">
                    {selectedJob.description || "Bu ilan için açıklama bilgisi bulunmuyor."}
                  </p>

                  <div className="detail-left-meta detail-meta-clean">
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2"/>
                        <path d="M4 7h16v12H4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                      </svg>
                      Çalışma tipi: <strong>{selectedJob.type}</strong>
                    </span>
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 3 4 8l8 5 8-5-8-5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                        <path d="M4 13l8 5 8-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Kategori: <strong>{selectedJob.category || "Vitrin ilan"}</strong>
                    </span>
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M7 3v3M17 3v3M4 8h16M6 5h12a2 2 0 0 1 2 2v12H4V7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Yayın: <strong>{getDaysAgoLabel(selectedJob.createdAt)}</strong>
                    </span>
                  </div>

                  <div className="detail-description-box detail-description-clean">
                    <h4 className="detail-description-title">İş açıklaması</h4>
                    <div className="detail-description">
                      {selectedJob.description || "Bu ilan için açıklama bilgisi bulunmuyor."}
                    </div>
                  </div>
                </section>
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
            <h2 className="section-title section-title-vitrin">Ekiş Acil</h2>
            <div className="featured-head-actions">
              <span>{filteredFeaturedJobs.length} ilan</span>
              <a href="#one-cikanlar" onClick={(e) => { e.preventDefault(); setShowFeaturedList(true); }}>Tümünü Gör →</a>
            </div>
          </div>

          <div className="featured-grid">
            {visibleFeaturedJobs.map((job) => (
              <FeaturedJobCard key={job.id} job={job} onOpen={setSelectedJob} />
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
                  <JobCard key={job.id} job={job} onOpen={setSelectedJob} />
                ))}
              </div>
            )}
          </div>
        </section>

        <InfoModal
          modalKey={infoModal}
          content={footerInfoContent}
          onClose={() => setInfoModal(null)}
        />

        <FeaturedListModal
          show={showFeaturedList}
          jobs={filteredFeaturedJobs}
          onClose={() => setShowFeaturedList(false)}
          onOpen={(job) => {
            setShowFeaturedList(false);
            setSelectedJob(job);
          }}
        />

        <AdPlaceholder type="footer" />

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
                  <a className="footer-link" href="#one-cikanlar">Ekiş Acil</a>
                  <button className="footer-link footer-link-button" type="button" onClick={() => setInfoModal("cityJobs")}>Şehre göre işler</button>
                  <button className="footer-link footer-link-button" type="button" onClick={() => setInfoModal("faq")}>Sık sorulanlar</button>
                </div>
              </div>

              <div>
                <h3 className="footer-subheading">İşveren</h3>
                <div className="footer-links">
                  <a className="footer-link" href="#" onClick={(e) => { e.preventDefault(); setShowForm(true); }}>İlan ver</a>
                  <a className="footer-link" href="#" onClick={(e) => { e.preventDefault(); setShowForm(true); setSelectedPlan("featured"); }}>Ekiş Acil’e çıkar</a>
                  <button className="footer-link footer-link-button" type="button" onClick={() => setInfoModal("pricing")}>Fiyatlandırma</button>
                  <button className="footer-link footer-link-button" type="button" onClick={() => setInfoModal("support")}>Destek al</button>
                </div>
              </div>

              <div>
                <h3 className="footer-subheading">Bizi takip et</h3>
                <div className="footer-socials">
                  <a
                    className="footer-social"
                    href="https://www.instagram.com/ekis.official/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    title="Instagram"
                  >
                    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" aria-hidden="true">
                      <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="2" />
                      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
                      <circle cx="17" cy="7" r="1.2" fill="currentColor" />
                    </svg>
                  </a>
                  <a
                    className="footer-social"
                    href="https://www.facebook.com/ekisplatform"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    title="Facebook"
                  >
                    <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true">
                      <path d="M14 8.2h2V5h-2.4C10.8 5 9 6.8 9 9.6V12H7v3.2h2V21h3.4v-5.8H15l.5-3.2h-3.1V9.9c0-1 .4-1.7 1.6-1.7Z" />
                    </svg>
                  </a>
                </div>

                <div className="footer-boxes">
                  <div className="footer-app-box">
                    <span className="footer-app-icon">▶</span>
                    <span className="footer-app-text">
                      <strong>Mobil uygulama</strong>
                      <span>Yakında yayında</span>
                    </span>
                  </div>
                  <div className="footer-app-box">
                    <span className="footer-app-icon">★</span>
                    <span className="footer-app-text">
                      <strong>İşveren paketi</strong>
                      <span>Daha fazla görünürlük</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="footer-bottom">
              <div className="footer-bottom-links">
                <button className="footer-bottom-link" type="button" onClick={() => setInfoModal("about")}>Hakkımızda</button>
                <button className="footer-bottom-link" type="button" onClick={() => setInfoModal("terms")}>Kullanım şartları</button>
                <button className="footer-bottom-link" type="button" onClick={() => setInfoModal("kvkk")}>KVKK</button>
                <button className="footer-bottom-link" type="button" onClick={() => setInfoModal("privacy")}>Gizlilik</button>
                <button className="footer-bottom-link" type="button" onClick={() => setInfoModal("contact")}>İletişim</button>
              </div>
              <div className="footer-copy">Ekiş © 2026</div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
