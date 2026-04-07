import React, { useEffect, useMemo, useState } from "react";

const ADMIN_PASSWORD = "1234";
const SHOPIFY_FEATURED_LINK = "https://your-shopify-link.com/one-cikan-ilan";

const seedJobs = [
  {
    id: crypto.randomUUID(),
    title: "Garson Aranıyor",
    company: "Odunpazarı Kafe",
    category: "Kafe & Restoran",
    location: "Eskişehir / Odunpazarı",
    salary: "Günlük 1.200 TL + yemek",
    type: "Günlük",
    description:
      "Yoğun saatlerde servis desteği verecek, güler yüzlü ve hızlı çalışabilecek ekip arkadaşı aranıyor. Deneyim tercih sebebidir.",
    phone: "05321234567",
    whatsapp: "905321234567",
    mapUrl: "https://maps.google.com/?q=Odunpazari+Eskisehir",
    createdAt: new Date().toISOString(),
    featured: true,
    active: true,
  },
  {
    id: crypto.randomUUID(),
    title: "Depo Düzenleme Personeli",
    company: "Tepebaşı Lojistik",
    category: "Depo & Lojistik",
    location: "Eskişehir / Tepebaşı",
    salary: "Saatlik 180 TL",
    type: "Saatlik",
    description:
      "Depo düzenleme, ürün yerleştirme ve paketleme işlerinde destek olacak personel aranıyor. Fiziksel çalışmaya uygun adaylar tercih edilir.",
    phone: "05329876543",
    whatsapp: "905329876543",
    mapUrl: "https://maps.google.com/?q=Tepebasi+Eskisehir",
    createdAt: new Date().toISOString(),
    featured: false,
    active: true,
  },
  {
    id: crypto.randomUUID(),
    title: "Etkinlik Karşılama Elemanı",
    company: "Fuar Organizasyon",
    category: "Etkinlik & Organizasyon",
    location: "Eskişehir / Merkez",
    salary: "Günlük 1.500 TL",
    type: "Part Time",
    description:
      "Etkinlik alanında ziyaretçi karşılama, yönlendirme ve kayıt desteği sağlayacak takım arkadaşları aranıyor.",
    phone: "05441112233",
    whatsapp: "905441112233",
    mapUrl: "https://maps.google.com/?q=Eskisehir+Merkez",
    createdAt: new Date().toISOString(),
    featured: true,
    active: true,
  },
  {
    id: crypto.randomUUID(),
    title: "Kurye Aranıyor",
    company: "Hızlı Paket",
    category: "Kurye & Dağıtım",
    location: "Eskişehir / Yenibağlar",
    salary: "Günlük 1.350 TL",
    type: "Günlük",
    description:
      "Teslimat süreçlerinde görev alacak, bölgeye hakim, hızlı ve güvenilir kurye aranıyor.",
    phone: "05556667788",
    whatsapp: "905556667788",
    mapUrl: "https://maps.google.com/?q=Yenibaglar+Eskisehir",
    createdAt: new Date().toISOString(),
    featured: true,
    active: true,
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

const jobTypes = ["Tümü", "Günlük", "Saatlik", "Part Time"];

function loadJobs() {
  try {
    const stored = localStorage.getItem("eskisehir_jobs_demo");
    if (!stored) {
      localStorage.setItem("eskisehir_jobs_demo", JSON.stringify(seedJobs));
      return seedJobs;
    }
    return JSON.parse(stored);
  } catch {
    return seedJobs;
  }
}

function saveJobs(jobs) {
  localStorage.setItem("eskisehir_jobs_demo", JSON.stringify(jobs));
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function normalizePhone(phone) {
  return phone.replace(/[^\d]/g, "");
}

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tümü");
  const [jobType, setJobType] = useState("Tümü");

  const [adminOpen, setAdminOpen] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [adminError, setAdminError] = useState("");

  const [postOpen, setPostOpen] = useState(false);
  const [promoteChecked, setPromoteChecked] = useState(false);

  const [form, setForm] = useState({
    title: "",
    company: "",
    category: "Kafe & Restoran",
    location: "",
    salary: "",
    type: "Günlük",
    description: "",
    phone: "",
    whatsapp: "",
    mapUrl: "",
    featured: false,
  });

  useEffect(() => {
    setJobs(loadJobs());
  }, []);

  useEffect(() => {
    if (jobs.length) saveJobs(jobs);
  }, [jobs]);

  const activeJobs = useMemo(() => jobs.filter((j) => j.active), [jobs]);

  const filteredJobs = useMemo(() => {
    return activeJobs
      .filter((job) => {
        const text = `${job.title} ${job.company} ${job.location} ${job.description}`.toLowerCase();
        const matchesSearch = text.includes(search.toLowerCase());
        const matchesCategory = category === "Tümü" ? true : job.category === category;
        const matchesType = jobType === "Tümü" ? true : job.type === jobType;
        return matchesSearch && matchesCategory && matchesType;
      })
      .sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  }, [activeJobs, search, category, jobType]);

  const featuredJobs = useMemo(
    () => filteredJobs.filter((j) => j.featured).slice(0, 3),
    [filteredJobs]
  );

  function handleAdminLogin(e) {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setAdminLoggedIn(true);
      setAdminError("");
    } else {
      setAdminError("Şifre hatalı.");
    }
  }

  function handleAddJob(e) {
    e.preventDefault();
    if (
      !form.title ||
      !form.company ||
      !form.location ||
      !form.salary ||
      !form.description ||
      !form.phone ||
      !form.whatsapp ||
      !form.mapUrl
    ) {
      alert("Lütfen tüm zorunlu alanları doldur.");
      return;
    }

    const newJob = {
      id: crypto.randomUUID(),
      ...form,
      phone: normalizePhone(form.phone),
      whatsapp: normalizePhone(form.whatsapp),
      createdAt: new Date().toISOString(),
      active: true,
    };

    setJobs((prev) => [newJob, ...prev]);
    setForm({
      title: "",
      company: "",
      category: "Kafe & Restoran",
      location: "",
      salary: "",
      type: "Günlük",
      description: "",
      phone: "",
      whatsapp: "",
      mapUrl: "",
      featured: false,
    });

    alert("İlan eklendi.");
  }

  function toggleFeatured(id) {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, featured: !job.featured } : job))
    );
  }

  function toggleActive(id) {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, active: !job.active } : job))
    );
  }

  function deleteJob(id) {
    if (!window.confirm("Bu ilanı silmek istediğine emin misin?")) return;
    setJobs((prev) => prev.filter((job) => job.id !== id));
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brandWrap}>
          <div style={styles.brandBadge}>
            <div style={styles.brandIconHead} />
            <div style={styles.brandIconBody} />
            <div style={styles.brandIconBag} />
          </div>
          <div>
            <div style={styles.logo}>İş İlan</div>
            <div style={styles.logoSub}>Eskişehir odaklı hızlı ilan platformu</div>
          </div>
        </div>

        <div style={styles.headerActions}>
          <button style={styles.adminBtn} onClick={() => setAdminOpen(true)}>
            Admin
          </button>
        </div>
      </header>

      <section style={styles.hero}>
        <div style={styles.heroBadge}>Eskişehir odaklı</div>
        <h1 style={styles.heroTitle}>CV’siz iş bul</h1>
        <p style={styles.heroText}>
          Günlük, saatlik ve part time iş ilanlarını incele. İlanı aç, işverenle
          direkt iletişime geç.
        </p>

        <div style={styles.heroButtons}>
          <button style={styles.primaryBtn} onClick={() => setPostOpen(true)}>
            Ücretsiz İlan Ver
          </button>
        </div>

        <div style={styles.searchBox}>
          <input
            style={styles.searchInput}
            placeholder="İş ara, firma ara, konum ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Meslek seç</label>
            <select style={styles.select} value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Çalışma tipi seç</label>
            <select style={styles.select} value={jobType} onChange={(e) => setJobType(e.target.value)}>
              {jobTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {featuredJobs.length > 0 && (
        <section style={styles.section}>
          <div style={styles.sectionHead}>
            <h2 style={styles.sectionTitle}>Öne çıkan ilanlar</h2>
          </div>
          <div style={styles.featuredGrid}>
            {featuredJobs.map((job) => (
              <button
                key={job.id}
                style={{ ...styles.featuredCard, textAlign: "left" }}
                onClick={() => setSelectedJob(job)}
              >
                <div style={styles.featuredTag}>Öne Çıkan</div>
                <div style={styles.cardTitle}>{job.title}</div>
                <div style={styles.cardCompany}>{job.company}</div>
                <div style={styles.cardMeta}>{job.location}</div>
                <div style={styles.cardSalary}>{job.salary}</div>
              </button>
            ))}
          </div>
        </section>
      )}

      <section style={styles.section}>
        <div style={styles.sectionHead}>
          <h2 style={styles.sectionTitle}>Tüm ilanlar</h2>
          <div style={styles.resultCount}>{filteredJobs.length} ilan bulundu</div>
        </div>

        {filteredJobs.length === 0 ? (
          <div style={styles.emptyState}>Aramana uygun ilan bulunamadı.</div>
        ) : (
          <div style={styles.jobsGrid}>
            {filteredJobs.map((job) => (
              <article key={job.id} style={styles.jobCard}>
                <div style={styles.jobTop}>
                  <div>
                    <div style={styles.jobTitleRow}>
                      <h3 style={styles.jobTitle}>{job.title}</h3>
                      {job.featured && <span style={styles.badge}>Öne Çıkan</span>}
                    </div>
                    <div style={styles.jobCompany}>{job.company}</div>
                  </div>
                  <div style={styles.jobType}>{job.type}</div>
                </div>

                <div style={styles.jobInfoList}>
                  <div style={styles.infoItem}>📍 {job.location}</div>
                  <div style={styles.infoItem}>💰 {job.salary}</div>
                  <div style={styles.infoItem}>🗂️ {job.category}</div>
                  <div style={styles.infoItem}>🕒 {formatDate(job.createdAt)}</div>
                </div>

                <p style={styles.jobDesc}>
                  {job.description.length > 120 ? job.description.slice(0, 120) + "..." : job.description}
                </p>

                <div style={styles.cardActions}>
                  <button style={styles.primaryBtn} onClick={() => setSelectedJob(job)}>
                    İlanı İncele
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer style={styles.footer}>
        <div>© {new Date().getFullYear()} İş İlan</div>
      </footer>

      {selectedJob && (
        <div style={styles.overlay} onClick={() => setSelectedJob(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHead}>
              <div>
                <div style={styles.modalTitle}>{selectedJob.title}</div>
                <div style={styles.modalCompany}>{selectedJob.company}</div>
              </div>
              <button style={styles.closeBtn} onClick={() => setSelectedJob(null)}>
                ✕
              </button>
            </div>

            <div style={styles.detailGrid}>
              <div style={styles.detailItem}><strong>Konum:</strong> {selectedJob.location}</div>
              <div style={styles.detailItem}><strong>Ücret:</strong> {selectedJob.salary}</div>
              <div style={styles.detailItem}><strong>Kategori:</strong> {selectedJob.category}</div>
              <div style={styles.detailItem}><strong>Çalışma tipi:</strong> {selectedJob.type}</div>
              <div style={styles.detailItem}><strong>İlan tarihi:</strong> {formatDate(selectedJob.createdAt)}</div>
            </div>

            <div style={styles.detailText}>{selectedJob.description}</div>

            <div style={styles.contactBar}>
              <a href={`https://wa.me/${selectedJob.whatsapp}`} target="_blank" rel="noreferrer" style={styles.successBtn}>
                WhatsApp
              </a>
              <a href={`tel:${selectedJob.phone}`} style={styles.secondaryBtn}>Ara</a>
              <a href={selectedJob.mapUrl} target="_blank" rel="noreferrer" style={styles.secondaryBtn}>Konum</a>
            </div>
          </div>
        </div>
      )}

      {postOpen && (
        <div style={styles.overlay} onClick={() => setPostOpen(false)}>
          <div style={styles.postModal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHead}>
              <div>
                <div style={styles.modalTitle}>Ücretsiz ilan ver</div>
                <div style={styles.modalCompany}>İlanını ekletmek için bizimle iletişime geç.</div>
              </div>
              <button style={styles.closeBtn} onClick={() => setPostOpen(false)}>
                ✕
              </button>
            </div>

            <div style={styles.postBox}>
              <p style={styles.postText}>
                Ücretsiz ilan yayını için WhatsApp veya telefon üzerinden bize ilan detaylarını iletebilirsin.
              </p>

              <div style={styles.contactBar}>
                <a href="https://wa.me/905321234567" target="_blank" rel="noreferrer" style={styles.successBtn}>
                  WhatsApp ile Gönder
                </a>
                <a href="tel:05321234567" style={styles.secondaryBtn}>Telefonla Ulaş</a>
              </div>

              <div style={styles.checkboxCard}>
                <label style={styles.checkboxWrap}>
                  <input
                    type="checkbox"
                    checked={promoteChecked}
                    onChange={(e) => setPromoteChecked(e.target.checked)}
                  />
                  <span>İlanı öne çıkar</span>
                </label>

                {promoteChecked && (
                  <div style={styles.shopifyBox}>
                    <div style={styles.shopifyTitle}>Öne çıkarma bağlantısı</div>
                    <a href={SHOPIFY_FEATURED_LINK} target="_blank" rel="noreferrer" style={styles.primaryBtnLink}>
                      Shopify ödeme linkine git
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {adminOpen && (
        <div style={styles.overlay} onClick={() => setAdminOpen(false)}>
          <div style={styles.adminModal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHead}>
              <div style={styles.modalTitle}>Admin Paneli</div>
              <button style={styles.closeBtn} onClick={() => setAdminOpen(false)}>
                ✕
              </button>
            </div>

            {!adminLoggedIn ? (
              <form onSubmit={handleAdminLogin} style={styles.adminLoginBox}>
                <label style={styles.label}>Şifre</label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  style={styles.input}
                  placeholder="Admin şifresi"
                />
                {adminError ? <div style={styles.errorText}>{adminError}</div> : null}
                <button type="submit" style={styles.primaryBtn}>Giriş Yap</button>
              </form>
            ) : (
              <div style={styles.adminContent}>
                <div style={styles.adminColumns}>
                  <div style={styles.adminLeft}>
                    <h3 style={styles.adminTitle}>Yeni ilan ekle</h3>
                    <form onSubmit={handleAddJob} style={styles.formGrid}>
                      <div style={styles.field}>
                        <label style={styles.label}>İlan başlığı</label>
                        <input style={styles.input} value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} />
                      </div>
                      <div style={styles.field}>
                        <label style={styles.label}>Firma adı</label>
                        <input style={styles.input} value={form.company} onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))} />
                      </div>
                      <div style={styles.field}>
                        <label style={styles.label}>Kategori</label>
                        <select style={styles.input} value={form.category} onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}>
                          {categories.filter((c) => c !== "Tümü").map((c) => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                      <div style={styles.field}>
                        <label style={styles.label}>Çalışma tipi</label>
                        <select style={styles.input} value={form.type} onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}>
                          {jobTypes.filter((t) => t !== "Tümü").map((t) => <option key={t}>{t}</option>)}
                        </select>
                      </div>
                      <div style={styles.field}>
                        <label style={styles.label}>Konum</label>
                        <input style={styles.input} placeholder="Eskişehir / Tepebaşı" value={form.location} onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))} />
                      </div>
                      <div style={styles.field}>
                        <label style={styles.label}>Ücret</label>
                        <input style={styles.input} placeholder="Günlük 1.200 TL" value={form.salary} onChange={(e) => setForm((prev) => ({ ...prev, salary: e.target.value }))} />
                      </div>
                      <div style={styles.field}>
                        <label style={styles.label}>Telefon</label>
                        <input style={styles.input} placeholder="0532..." value={form.phone} onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))} />
                      </div>
                      <div style={styles.field}>
                        <label style={styles.label}>WhatsApp numarası</label>
                        <input style={styles.input} placeholder="90532..." value={form.whatsapp} onChange={(e) => setForm((prev) => ({ ...prev, whatsapp: e.target.value }))} />
                      </div>
                      <div style={styles.fieldFull}>
                        <label style={styles.label}>Konum linki</label>
                        <input style={styles.input} placeholder="https://maps.google.com/..." value={form.mapUrl} onChange={(e) => setForm((prev) => ({ ...prev, mapUrl: e.target.value }))} />
                      </div>
                      <div style={styles.fieldFull}>
                        <label style={styles.label}>Açıklama</label>
                        <textarea style={styles.textarea} rows={5} value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} />
                      </div>
                      <div style={styles.checkboxRow}>
                        <input id="featured" type="checkbox" checked={form.featured} onChange={(e) => setForm((prev) => ({ ...prev, featured: e.target.checked }))} />
                        <label htmlFor="featured" style={styles.checkboxLabel}>Öne çıkan ilan olarak işaretle</label>
                      </div>
                      <button type="submit" style={styles.primaryBtn}>İlanı Kaydet</button>
                    </form>
                  </div>

                  <div style={styles.adminRight}>
                    <h3 style={styles.adminTitle}>İlan yönetimi</h3>
                    <div style={styles.adminList}>
                      {jobs.map((job) => (
                        <div key={job.id} style={styles.adminCard}>
                          <div style={styles.adminCardTop}>
                            <div>
                              <div style={styles.adminJobTitle}>{job.title}</div>
                              <div style={styles.adminJobMeta}>{job.company} • {job.location}</div>
                            </div>
                            <div>
                              {job.active ? <span style={styles.stateActive}>Aktif</span> : <span style={styles.statePassive}>Pasif</span>}
                            </div>
                          </div>
                          <div style={styles.adminActions}>
                            <button style={styles.smallBtn} onClick={() => toggleFeatured(job.id)}>
                              {job.featured ? "Öne Çıkanı Kaldır" : "Öne Çıkar"}
                            </button>
                            <button style={styles.smallBtn} onClick={() => toggleActive(job.id)}>
                              {job.active ? "Pasife Al" : "Aktifleştir"}
                            </button>
                            <button style={styles.smallDangerBtn} onClick={() => deleteJob(job.id)}>Sil</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f7fb",
    color: "#111827",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  header: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "20px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brandWrap: { display: "flex", alignItems: "center", gap: 12 },
  brandBadge: {
    width: 46,
    height: 46,
    borderRadius: 14,
    background: "#111827",
    position: "relative",
    flexShrink: 0,
  },
  brandIconHead: {
    width: 9,
    height: 9,
    borderRadius: "50%",
    background: "#fff",
    position: "absolute",
    top: 9,
    left: 13,
  },
  brandIconBody: {
    width: 10,
    height: 18,
    borderRadius: 6,
    background: "#fff",
    position: "absolute",
    top: 18,
    left: 12,
  },
  brandIconBag: {
    width: 14,
    height: 10,
    borderRadius: 3,
    border: "2px solid #fff",
    position: "absolute",
    right: 8,
    bottom: 10,
  },
  logo: { fontSize: 20, fontWeight: 800, lineHeight: 1.1 },
  logoSub: { fontSize: 12, color: "#6b7280", marginTop: 2 },
  headerActions: { display: "flex", gap: 10, alignItems: "center" },
  adminBtn: {
    border: "1px solid #d1d5db",
    background: "#fff",
    borderRadius: 12,
    padding: "10px 16px",
    cursor: "pointer",
    fontWeight: 600,
  },
  hero: { maxWidth: 1200, margin: "0 auto", padding: "12px 16px 28px" },
  heroBadge: {
    display: "inline-block",
    padding: "6px 10px",
    background: "#e5eefc",
    color: "#1d4ed8",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 14,
  },
  heroTitle: {
    fontSize: "clamp(32px, 5vw, 56px)",
    lineHeight: 1,
    margin: 0,
    fontWeight: 900,
    letterSpacing: "-0.03em",
  },
  heroText: {
    maxWidth: 680,
    color: "#4b5563",
    fontSize: 17,
    lineHeight: 1.6,
    marginTop: 14,
    marginBottom: 20,
  },
  heroButtons: { display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 22 },
  searchBox: {
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr 1fr",
    gap: 12,
    background: "#fff",
    border: "1px solid #e5e7eb",
    padding: 12,
    borderRadius: 18,
    boxShadow: "0 10px 30px rgba(17,24,39,0.05)",
    alignItems: "end",
  },
  filterGroup: { display: "grid", gap: 6 },
  filterLabel: { fontSize: 13, fontWeight: 700, color: "#6b7280", paddingLeft: 2 },
  searchInput: {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: "14px 14px",
    fontSize: 15,
    outline: "none",
  },
  select: {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: "14px 14px",
    fontSize: 15,
    outline: "none",
    background: "#fff",
  },
  section: { maxWidth: 1200, margin: "0 auto", padding: "12px 16px 28px" },
  sectionHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
  },
  sectionTitle: { fontSize: 24, margin: 0, fontWeight: 800 },
  resultCount: { color: "#6b7280", fontSize: 14 },
  featuredGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 16,
  },
  featuredCard: {
    border: "1px solid #dbeafe",
    background: "linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)",
    borderRadius: 20,
    padding: 18,
    cursor: "pointer",
    boxShadow: "0 8px 24px rgba(59,130,246,0.08)",
  },
  featuredTag: {
    display: "inline-block",
    fontSize: 12,
    fontWeight: 800,
    color: "#1d4ed8",
    background: "#dbeafe",
    padding: "6px 10px",
    borderRadius: 999,
    marginBottom: 14,
  },
  jobsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 16,
  },
  jobCard: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 18,
    padding: 18,
    boxShadow: "0 8px 20px rgba(17,24,39,0.04)",
  },
  jobTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "flex-start",
    marginBottom: 14,
  },
  jobTitleRow: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" },
  jobTitle: { margin: 0, fontSize: 20, fontWeight: 800 },
  badge: {
    fontSize: 11,
    fontWeight: 800,
    color: "#1d4ed8",
    background: "#dbeafe",
    padding: "5px 8px",
    borderRadius: 999,
  },
  jobCompany: { marginTop: 6, color: "#4b5563", fontWeight: 600 },
  jobType: {
    fontSize: 12,
    padding: "7px 10px",
    borderRadius: 999,
    background: "#f3f4f6",
    fontWeight: 700,
    whiteSpace: "nowrap",
  },
  jobInfoList: { display: "grid", gap: 8, marginBottom: 14 },
  infoItem: { color: "#374151", fontSize: 14 },
  cardTitle: { fontSize: 20, fontWeight: 800, marginBottom: 6 },
  cardCompany: { fontWeight: 700, color: "#374151", marginBottom: 8 },
  cardMeta: { color: "#6b7280", marginBottom: 8 },
  cardSalary: { fontWeight: 800, fontSize: 16 },
  jobDesc: { color: "#6b7280", fontSize: 14, lineHeight: 1.6, minHeight: 66 },
  cardActions: { marginTop: 12 },
  primaryBtn: {
    border: "none",
    background: "#111827",
    color: "#fff",
    borderRadius: 12,
    padding: "12px 16px",
    fontWeight: 700,
    cursor: "pointer",
  },
  primaryBtnLink: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    border: "none",
    background: "#111827",
    color: "#fff",
    borderRadius: 12,
    padding: "12px 16px",
    fontWeight: 700,
    cursor: "pointer",
    width: "fit-content",
  },
  secondaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    border: "1px solid #d1d5db",
    background: "#fff",
    color: "#111827",
    borderRadius: 12,
    padding: "12px 16px",
    fontWeight: 700,
    cursor: "pointer",
  },
  successBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    border: "none",
    background: "#16a34a",
    color: "#fff",
    borderRadius: 12,
    padding: "12px 16px",
    fontWeight: 700,
    cursor: "pointer",
  },
  footer: { maxWidth: 1200, margin: "0 auto", padding: "18px 16px 32px", color: "#6b7280", fontSize: 14 },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(17,24,39,0.55)",
    display: "grid",
    placeItems: "center",
    zIndex: 999,
    padding: 16,
  },
  modal: {
    width: "100%",
    maxWidth: 760,
    background: "#fff",
    borderRadius: 24,
    padding: 22,
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
  },
  postModal: {
    width: "100%",
    maxWidth: 620,
    background: "#fff",
    borderRadius: 24,
    padding: 22,
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
  },
  adminModal: {
    width: "100%",
    maxWidth: 1180,
    maxHeight: "90vh",
    overflow: "auto",
    background: "#fff",
    borderRadius: 24,
    padding: 22,
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
  },
  modalHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 18,
  },
  modalTitle: { fontSize: 26, fontWeight: 900, lineHeight: 1.1 },
  modalCompany: { color: "#6b7280", marginTop: 8, fontWeight: 700 },
  closeBtn: {
    border: "1px solid #e5e7eb",
    background: "#fff",
    width: 40,
    height: 40,
    borderRadius: 12,
    cursor: "pointer",
    fontSize: 16,
  },
  detailGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 10,
    marginBottom: 18,
  },
  detailItem: {
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: 14,
    padding: 12,
    fontSize: 14,
    lineHeight: 1.5,
  },
  detailText: { fontSize: 15, lineHeight: 1.8, color: "#374151", marginBottom: 22 },
  contactBar: { display: "flex", gap: 10, flexWrap: "wrap" },
  postBox: { display: "grid", gap: 18 },
  postText: { margin: 0, color: "#374151", lineHeight: 1.7, fontSize: 15 },
  checkboxCard: {
    border: "1px solid #e5e7eb",
    borderRadius: 18,
    padding: 16,
    background: "#f9fafb",
    display: "grid",
    gap: 14,
  },
  checkboxWrap: { display: "flex", alignItems: "center", gap: 10, fontWeight: 700, color: "#111827" },
  shopifyBox: { display: "grid", gap: 10 },
  shopifyTitle: { fontWeight: 700, color: "#374151" },
  adminLoginBox: { maxWidth: 360, display: "grid", gap: 10 },
  errorText: { color: "#dc2626", fontSize: 14, fontWeight: 600 },
  adminContent: { marginTop: 10 },
  adminColumns: { display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 24 },
  adminLeft: { background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 18, padding: 18 },
  adminRight: { background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 18, padding: 18 },
  adminTitle: { marginTop: 0, marginBottom: 16, fontSize: 20, fontWeight: 800 },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
  field: { display: "grid", gap: 8 },
  fieldFull: { gridColumn: "1 / -1", display: "grid", gap: 8 },
  label: { fontSize: 14, fontWeight: 700, color: "#374151" },
  input: {
    border: "1px solid #d1d5db",
    borderRadius: 12,
    padding: "12px 14px",
    fontSize: 14,
    outline: "none",
    background: "#fff",
  },
  textarea: {
    border: "1px solid #d1d5db",
    borderRadius: 12,
    padding: "12px 14px",
    fontSize: 14,
    outline: "none",
    background: "#fff",
    resize: "vertical",
    fontFamily: "inherit",
  },
  checkboxRow: { gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 10 },
  checkboxLabel: { fontSize: 14, color: "#374151", fontWeight: 600 },
  adminList: { display: "grid", gap: 12 },
  adminCard: { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: 14 },
  adminCardTop: { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", marginBottom: 12 },
  adminJobTitle: { fontWeight: 800, fontSize: 16, marginBottom: 4 },
  adminJobMeta: { fontSize: 13, color: "#6b7280", lineHeight: 1.5 },
  stateActive: { fontSize: 12, fontWeight: 800, color: "#166534", background: "#dcfce7", padding: "6px 8px", borderRadius: 999 },
  statePassive: { fontSize: 12, fontWeight: 800, color: "#991b1b", background: "#fee2e2", padding: "6px 8px", borderRadius: 999 },
  adminActions: { display: "flex", gap: 8, flexWrap: "wrap" },
  smallBtn: {
    border: "1px solid #d1d5db",
    background: "#fff",
    color: "#111827",
    borderRadius: 10,
    padding: "10px 12px",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 13,
  },
  smallDangerBtn: {
    border: "1px solid #fecaca",
    background: "#fff1f2",
    color: "#b91c1c",
    borderRadius: 10,
    padding: "10px 12px",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 13,
  },
  emptyState: {
    background: "#fff",
    border: "1px dashed #d1d5db",
    borderRadius: 18,
    padding: 28,
    color: "#6b7280",
    textAlign: "center",
  },
};

