import { useMemo, useState } from "react";
import { supabase } from "../supabaseClient";
import { isJobActive, getDaysLeftLabel } from "../utils/jobUtils";

const ADMIN_EMAILS = ["nkarci95@gmail.com", "ekissosyal@gmail.com"];

const S = {
  page: {
    position: "fixed", inset: 0, zIndex: 120,
    background: "#fafaf8", overflowY: "auto",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  nav: {
    background: "#fff", borderBottom: "0.5px solid #e7e5e4",
    padding: "10px 20px", display: "flex", alignItems: "center",
    justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10,
  },
  navLeft: { display: "flex", alignItems: "center", gap: 10 },
  logo: { fontSize: 15, fontWeight: 800, color: "#1c1917" },
  badge: {
    background: "#FF5A3C", color: "#fff", fontSize: 10,
    fontWeight: 800, padding: "2px 7px", borderRadius: 5,
  },
  search: {
    width: 200, padding: "6px 10px", borderRadius: 7,
    border: "0.5px solid #e7e5e4", background: "#f5f5f4",
    fontSize: 12, color: "#1c1917", outline: "none",
  },
  navBtn: {
    padding: "6px 12px", borderRadius: 7, border: "0.5px solid #e7e5e4",
    background: "#fff", fontSize: 12, fontWeight: 600,
    color: "#78716c", cursor: "pointer",
  },
  navBtnDanger: {
    padding: "6px 12px", borderRadius: 7, border: "0.5px solid #fecaca",
    background: "#fff", fontSize: 12, fontWeight: 600,
    color: "#ef4444", cursor: "pointer",
  },
  statsRow: {
    display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
    gap: 12, padding: "16px 20px",
  },
  stat: {
    background: "#fff", borderRadius: 10, padding: "12px 14px",
    border: "0.5px solid #e7e5e4",
  },
  statVal: { fontSize: 22, fontWeight: 800, color: "#1c1917" },
  statLbl: { fontSize: 11, color: "#a8a29e", marginTop: 3 },
  filterBar: {
    padding: "0 20px 12px", display: "flex", gap: 6, flexWrap: "wrap",
  },
  filter: {
    padding: "5px 12px", borderRadius: 6, border: "0.5px solid #e7e5e4",
    background: "#fff", fontSize: 11, fontWeight: 600,
    color: "#78716c", cursor: "pointer",
  },
  filterActive: {
    padding: "5px 12px", borderRadius: 6, border: "0.5px solid #1c1917",
    background: "#1c1917", fontSize: 11, fontWeight: 600,
    color: "#fff", cursor: "pointer",
  },
  searchBar: {
    padding: "0 20px 12px",
  },
  searchInput: {
    width: "100%", padding: "8px 12px", borderRadius: 8,
    border: "0.5px solid #e7e5e4", background: "#fff",
    fontSize: 13, color: "#1c1917", outline: "none",
  },
  table: {
    margin: "0 20px 20px", borderRadius: 10,
    border: "0.5px solid #e7e5e4", overflow: "hidden",
    background: "#fff",
  },
  tableHead: {
    display: "grid", gridTemplateColumns: "auto 2fr 1fr 1fr 1fr 1.4fr",
    gap: 10, padding: "9px 14px",
    background: "#fafaf8", borderBottom: "0.5px solid #e7e5e4",
    fontSize: 10, fontWeight: 700, color: "#a8a29e",
    textTransform: "uppercase", letterSpacing: "0.06em",
  },
  tableRow: {
    display: "grid", gridTemplateColumns: "auto 2fr 1fr 1fr 1fr 1.4fr",
    gap: 10, padding: "11px 14px",
    borderBottom: "0.5px solid #f5f5f4", alignItems: "center",
  },
  num: {
    width: 22, height: 22, borderRadius: 6, background: "#f5f5f4",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 11, fontWeight: 700, color: "#a8a29e",
  },
  rowTitle: { fontSize: 13, fontWeight: 700, color: "#1c1917" },
  rowSub: { fontSize: 11, color: "#a8a29e", marginTop: 1 },
  rowCell: { fontSize: 12, color: "#78716c" },
  actions: { display: "flex", gap: 4, flexWrap: "wrap" },
  btn: {
    padding: "4px 8px", borderRadius: 5, border: "0.5px solid #e7e5e4",
    background: "#fff", fontSize: 10, fontWeight: 600,
    color: "#78716c", cursor: "pointer",
  },
  btnGreen: {
    padding: "4px 8px", borderRadius: 5, border: "0.5px solid #bbf7d0",
    background: "#f0fdf4", fontSize: 10, fontWeight: 700,
    color: "#16a34a", cursor: "pointer",
  },
  btnRed: {
    padding: "4px 8px", borderRadius: 5, border: "0.5px solid #fecaca",
    background: "#fff5f5", fontSize: 10, fontWeight: 700,
    color: "#ef4444", cursor: "pointer",
  },
  btnOrange: {
    padding: "4px 8px", borderRadius: 5, border: "0.5px solid #fed7aa",
    background: "#fff7ed", fontSize: 10, fontWeight: 700,
    color: "#ea580c", cursor: "pointer",
  },
  empty: {
    textAlign: "center", padding: "40px 0",
    fontSize: 13, color: "#a8a29e",
  },

  // Login
  loginWrap: {
    display: "flex", alignItems: "center", justifyContent: "center",
    minHeight: "100vh",
  },
  loginCard: {
    background: "#fff", borderRadius: 16, padding: "32px 28px",
    border: "0.5px solid #e7e5e4", width: "100%", maxWidth: 380,
    margin: 16,
  },
  loginTitle: { fontSize: 20, fontWeight: 800, color: "#1c1917", margin: "0 0 6px" },
  loginSub: { fontSize: 13, color: "#a8a29e", margin: "0 0 20px" },
  loginInput: {
    width: "100%", padding: "10px 12px", borderRadius: 8,
    border: "0.5px solid #e7e5e4", fontSize: 13, color: "#1c1917",
    outline: "none", marginBottom: 10, boxSizing: "border-box",
    background: "#fafaf8",
  },
  loginError: {
    fontSize: 12, color: "#ef4444", fontWeight: 600,
    marginBottom: 10,
  },
  loginBtn: {
    width: "100%", padding: "10px", borderRadius: 8,
    border: "none", background: "#FF5A3C", color: "#fff",
    fontSize: 14, fontWeight: 700, cursor: "pointer", marginBottom: 8,
  },
  loginBtnSecondary: {
    width: "100%", padding: "10px", borderRadius: 8,
    border: "0.5px solid #e7e5e4", background: "#fff",
    color: "#78716c", fontSize: 14, fontWeight: 600, cursor: "pointer",
  },

  // Detail Modal
  detailOverlay: {
    position: "fixed", inset: 0, zIndex: 200,
    background: "rgba(0,0,0,0.4)", display: "flex",
    alignItems: "center", justifyContent: "center", padding: 16,
  },
  detailModal: {
    background: "#fff", borderRadius: 16, padding: "24px",
    width: "100%", maxWidth: 520, maxHeight: "85vh",
    overflowY: "auto", border: "0.5px solid #e7e5e4",
  },
  detailTitle: { fontSize: 18, fontWeight: 800, color: "#1c1917", margin: "0 0 4px" },
  detailSub: { fontSize: 13, color: "#a8a29e", margin: "0 0 16px" },
  detailGrid: {
    display: "grid", gridTemplateColumns: "1fr 1fr",
    gap: 10, marginBottom: 14,
  },
  detailItem: {
    background: "#fafaf8", borderRadius: 8, padding: "10px 12px",
    border: "0.5px solid #e7e5e4",
  },
  detailLabel: { fontSize: 10, color: "#a8a29e", fontWeight: 700, marginBottom: 3, textTransform: "uppercase" },
  detailValue: { fontSize: 13, color: "#1c1917", fontWeight: 600 },
  detailDesc: {
    background: "#fafaf8", borderRadius: 8, padding: "12px",
    border: "0.5px solid #e7e5e4", fontSize: 13, color: "#374151",
    lineHeight: 1.6, marginBottom: 14,
  },
  detailActions: { display: "flex", gap: 8, flexWrap: "wrap" },
  detailBtn: {
    flex: 1, padding: "9px", borderRadius: 8, border: "0.5px solid #e7e5e4",
    background: "#fff", fontSize: 12, fontWeight: 600,
    color: "#78716c", cursor: "pointer",
  },
  detailBtnGreen: {
    flex: 1, padding: "9px", borderRadius: 8, border: "0.5px solid #bbf7d0",
    background: "#f0fdf4", fontSize: 12, fontWeight: 700,
    color: "#16a34a", cursor: "pointer",
  },
  detailBtnRed: {
    flex: 1, padding: "9px", borderRadius: 8, border: "0.5px solid #fecaca",
    background: "#fff5f5", fontSize: 12, fontWeight: 700,
    color: "#ef4444", cursor: "pointer",
  },
};

function getBadge(status) {
  if (status === "Onay Bekliyor") return { text: "Onay Bekliyor", bg: "#fef3c7", color: "#92400e" };
  if (status === "Ekiş Acil") return { text: "Ekiş Acil", bg: "#fee2e2", color: "#991b1b" };
  return { text: "Standart", bg: "#d1fae5", color: "#065f46" };
}

export default function AdminPanel({ jobs, featuredJobs, pendingJobs, onGoHome, onNewPost, setJobs, setFeaturedJobs, setPendingJobs }) {
  const [authenticated, setAuthenticated] = useState(
    () => window.localStorage.getItem("ekisAdminAuth") === "true"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [detailJob, setDetailJob] = useState(null);
  const [notifications, setNotifications] = useState(() => {
    try { return JSON.parse(localStorage.getItem("ekisAdminNotifications") || "[]"); }
    catch { return []; }
  });

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setLoginError("E-posta veya şifre hatalı."); return; }
    localStorage.setItem("ekisAdminAuth", "true");
    setAuthenticated(true);
    setLoginError("");
    setEmail("");
    setPassword("");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("ekisAdminAuth");
    setAuthenticated(false);
  };

  const updateDb = async (job, changes, errMsg) => {
    if (!job.dbId) return true;
    const { error } = await supabase.from("job_posts").update(changes).eq("id", job.dbId);
    if (error) { alert(errMsg); return false; }
    return true;
  };

  const approve = async (job) => {
    if (job.dbId) {
      const { error } = await supabase.from("job_posts").update({ status: "active" }).eq("id", job.dbId);
      if (error) { alert("İlan onaylanamadı."); return; }
    }
    setPendingJobs(prev => prev.filter(i => i.id !== job.id));
    const approved = { ...job, status: "active" };
    if (job.plan === "featured") setFeaturedJobs(prev => [approved, ...prev]);
    else setJobs(prev => [approved, ...prev]);
    addNotif(`${job.title} yayına alındı.`);
    setDetailJob(null);
  };

  const reject = async (jobId) => {
    const job = pendingJobs.find(i => i.id === jobId);
    if (job?.dbId) {
      const { error } = await supabase.from("job_posts").update({ status: "rejected" }).eq("id", job.dbId);
      if (error) { alert("İlan reddedilemedi."); return; }
    }
    setPendingJobs(prev => prev.filter(i => i.id !== jobId));
    setDetailJob(null);
  };

  const toggleActive = async (job) => {
    const next = job.status === "passive" ? "active" : "passive";
    const ok = await updateDb(job, { status: next }, "İlan durumu güncellenemedi.");
    if (!ok) return;
    const toggle = i => i.id === job.id ? { ...i, status: next } : i;
    if (job.adminStatus === "Ekiş Acil") setFeaturedJobs(prev => prev.map(toggle));
    else setJobs(prev => prev.map(toggle));
  };

  const makeFeatured = async (job) => {
    const ok = await updateDb(job, { plan_type: "featured", status: "active" }, "Ekiş Acil yapılamadı.");
    if (!ok) return;
    setJobs(prev => prev.filter(i => i.id !== job.id));
    setFeaturedJobs(prev => [{ ...job, plan: "featured", status: "active", featuredStatus: "live" }, ...prev]);
  };

  const makeStandard = async (job) => {
    const ok = await updateDb(job, { plan_type: "normal", status: "active" }, "Standarda alınamadı.");
    if (!ok) return;
    setFeaturedJobs(prev => prev.filter(i => i.id !== job.id));
    setJobs(prev => [{ ...job, plan: "free", status: "active", featuredStatus: null }, ...prev]);
  };

  const deleteJob = async (job) => {
    if (!window.confirm("Bu ilanı silmek istediğinize emin misiniz?")) return;
    const ok = await updateDb(job, { status: "rejected" }, "İlan silinemedi.");
    if (!ok) return;
    if (job.adminStatus === "Ekiş Acil") setFeaturedJobs(prev => prev.filter(i => i.id !== job.id));
    else if (job.adminStatus === "Onay Bekliyor") setPendingJobs(prev => prev.filter(i => i.id !== job.id));
    else setJobs(prev => prev.filter(i => i.id !== job.id));
    setDetailJob(null);
  };

  const addNotif = (text) => {
    const next = [{ id: Date.now(), text }, ...notifications].slice(0, 20);
    setNotifications(next);
    localStorage.setItem("ekisAdminNotifications", JSON.stringify(next));
  };

  const allJobs = useMemo(() => [
    ...pendingJobs.map(j => ({ ...j, adminStatus: "Onay Bekliyor" })),
    ...featuredJobs.map(j => ({ ...j, adminStatus: "Ekiş Acil" })),
    ...jobs.map(j => ({ ...j, adminStatus: "Standart" })),
  ], [jobs, featuredJobs, pendingJobs]);

  const filtered = useMemo(() => {
    return allJobs.filter(job => {
      if (!isJobActive(job) && job.adminStatus !== "Onay Bekliyor") return false;
      const txt = `${job.title} ${job.company} ${job.location} ${job.contactPhone || ""}`.toLocaleLowerCase("tr-TR");
      const matchSearch = txt.includes(search.toLocaleLowerCase("tr-TR"));
      if (filter === "pending") return matchSearch && job.adminStatus === "Onay Bekliyor";
      if (filter === "featured") return matchSearch && job.adminStatus === "Ekiş Acil";
      if (filter === "standard") return matchSearch && job.adminStatus === "Standart";
      return matchSearch;
    });
  }, [allJobs, search, filter]);

  const totalActive = jobs.filter(isJobActive).length + featuredJobs.filter(isJobActive).length;
  const totalPending = pendingJobs.length;
  const totalFeatured = featuredJobs.filter(isJobActive).length;
  const totalStandard = jobs.filter(isJobActive).length;

  if (!authenticated) {
    return (
      <div style={S.page}>
        <div style={S.loginWrap}>
          <div style={S.loginCard}>
            <h2 style={S.loginTitle}>Admin Girişi</h2>
            <p style={S.loginSub}>Ekiş yönetim paneline erişmek için giriş yapın.</p>
            <input style={S.loginInput} type="email" placeholder="E-posta" value={email} onChange={e => setEmail(e.target.value)} />
            <input style={S.loginInput} type="password" placeholder="Şifre" value={password}
              onChange={e => { setPassword(e.target.value); setLoginError(""); }}
              onKeyDown={e => e.key === "Enter" && handleLogin()} />
            {loginError && <div style={S.loginError}>{loginError}</div>}
            <button style={S.loginBtn} onClick={handleLogin}>Giriş Yap</button>
            <button style={S.loginBtnSecondary} onClick={onGoHome}>Siteye Dön</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={S.page}>
      {/* Navbar */}
      <div style={S.nav}>
        <div style={S.navLeft}>
          <span style={S.logo}>Ekiş</span>
          <span style={S.badge}>Admin</span>
          {totalPending > 0 && (
            <span style={{ fontSize: 11, color: "#ef4444", fontWeight: 700 }}>
              {totalPending} onay bekliyor
            </span>
          )}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {notifications.length > 0 && (
            <button style={S.navBtn} onClick={() => { setNotifications([]); localStorage.removeItem("ekisAdminNotifications"); }}>
              Bildirimleri Temizle ({notifications.length})
            </button>
          )}
          <button style={S.navBtn} onClick={onGoHome}>Siteye Dön</button>
          <button style={S.navBtnDanger} onClick={handleLogout}>Çıkış Yap</button>
        </div>
      </div>

      {/* Stats */}
      <div style={S.statsRow}>
        <div style={S.stat}>
          <div style={S.statVal}>{totalActive + totalPending}</div>
          <div style={S.statLbl}>Toplam İlan</div>
        </div>
        <div style={S.stat}>
          <div style={{ ...S.statVal, color: totalPending > 0 ? "#ef4444" : "#1c1917" }}>{totalPending}</div>
          <div style={S.statLbl}>Onay Bekleyen</div>
        </div>
        <div style={S.stat}>
          <div style={S.statVal}>{totalFeatured}</div>
          <div style={S.statLbl}>Ekiş Acil</div>
        </div>
        <div style={S.stat}>
          <div style={S.statVal}>{totalStandard}</div>
          <div style={S.statLbl}>Standart</div>
        </div>
      </div>

      {/* Filters */}
      <div style={S.filterBar}>
        {[
          { key: "all", label: `Tümü (${filtered.length})` },
          { key: "pending", label: `Onay Bekleyen (${totalPending})` },
          { key: "featured", label: `Ekiş Acil (${totalFeatured})` },
          { key: "standard", label: `Standart (${totalStandard})` },
        ].map(f => (
          <button key={f.key} style={filter === f.key ? S.filterActive : S.filter} onClick={() => setFilter(f.key)}>
            {f.label}
          </button>
        ))}
        <button style={{ ...S.filter, marginLeft: "auto", color: "#FF5A3C", borderColor: "#FF5A3C" }} onClick={onNewPost}>
          + Yeni İlan Ekle
        </button>
      </div>

      {/* Search */}
      <div style={S.searchBar}>
        <input style={S.searchInput} placeholder="İlan, firma, şehir veya telefon ara..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Table */}
      <div style={S.table}>
        <div style={S.tableHead}>
          <div>#</div><div>İlan</div><div>Konum</div><div>Tip</div><div>Durum</div><div>İşlem</div>
        </div>

        {filtered.length === 0 ? (
          <div style={S.empty}>Bu filtreye uygun ilan bulunamadı.</div>
        ) : filtered.map((job, idx) => {
          const badge = getBadge(job.adminStatus);
          return (
            <div key={`${job.adminStatus}-${job.id}`} style={S.tableRow}>
              <div style={S.num}>{idx + 1}</div>
              <div>
                <div style={S.rowTitle}>{job.title}</div>
                <div style={S.rowSub}>{job.company} · {job.adminStatus === "Onay Bekliyor" ? "Onay bekliyor" : getDaysLeftLabel(job)}</div>
              </div>
              <div style={S.rowCell}>{job.location}</div>
              <div style={S.rowCell}>{job.type}</div>
              <div>
                <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 5, background: badge.bg, color: badge.color }}>
                  {badge.text}
                </span>
              </div>
              <div style={S.actions}>
                <button style={S.btn} onClick={() => setDetailJob(job)}>Detay</button>
                {job.adminStatus === "Onay Bekliyor" ? (
                  <>
                    <button style={S.btnGreen} onClick={() => approve(job)}>Onayla</button>
                    <button style={S.btnRed} onClick={() => reject(job.id)}>Reddet</button>
                  </>
                ) : (
                  <>
                    <button style={S.btn} onClick={() => toggleActive(job)}>
                      {job.status === "passive" ? "Aktif Et" : "Pasif Yap"}
                    </button>
                    {job.adminStatus === "Ekiş Acil"
                      ? <button style={S.btn} onClick={() => makeStandard(job)}>Standarta Al</button>
                      : <button style={S.btnOrange} onClick={() => makeFeatured(job)}>Ekiş Acil Yap</button>
                    }
                    <button style={S.btnRed} onClick={() => deleteJob(job)}>Sil</button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {detailJob && (
        <div style={S.detailOverlay} onClick={() => setDetailJob(null)}>
          <div style={S.detailModal} onClick={e => e.stopPropagation()}>
            <h3 style={S.detailTitle}>{detailJob.title}</h3>
            <p style={S.detailSub}>{detailJob.company} · {detailJob.location}</p>

            <div style={S.detailGrid}>
              {[
                { label: "Çalışma Tipi", value: detailJob.type },
                { label: "Ücret", value: detailJob.salary },
                { label: "Durum", value: detailJob.adminStatus },
                { label: "Plan", value: detailJob.plan === "featured" ? "Ekiş Acil" : "Ücretsiz" },
                { label: "İletişim", value: detailJob.contactName || "-" },
                { label: "Telefon", value: detailJob.contactPhone || "-" },
              ].map(item => (
                <div key={item.label} style={S.detailItem}>
                  <div style={S.detailLabel}>{item.label}</div>
                  <div style={S.detailValue}>{item.value}</div>
                </div>
              ))}
            </div>

            {detailJob.description && (
              <div style={S.detailDesc}>{detailJob.description}</div>
            )}

            <div style={S.detailActions}>
              {detailJob.adminStatus === "Onay Bekliyor" ? (
                <>
                  <button style={S.detailBtnGreen} onClick={() => approve(detailJob)}>Onayla</button>
                  <button style={S.detailBtnRed} onClick={() => reject(detailJob.id)}>Reddet</button>
                </>
              ) : (
                <>
                  <button style={S.detailBtn} onClick={() => { toggleActive(detailJob); setDetailJob(null); }}>
                    {detailJob.status === "passive" ? "Aktif Et" : "Pasif Yap"}
                  </button>
                  <button style={S.detailBtnRed} onClick={() => deleteJob(detailJob)}>Sil</button>
                </>
              )}
              <button style={S.detailBtn} onClick={() => setDetailJob(null)}>Kapat</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
