import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { categories, types } from "../data/constants";

const editableCategories = categories.filter((c) => c !== "Tümü");
const editableTypes = types.filter((t) => t !== "Tümü");

export default function MyJobsModal({ currentUser, onClose }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [editError, setEditError] = useState("");

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("job_posts")
      .select("*")
      .eq("user_id", currentUser.id)
      .order("created_at", { ascending: false });

    if (error) {
      setError("İlanlar yüklenirken hata oluştu.");
    } else {
      setJobs(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu ilanı silmek istediğinize emin misiniz?")) return;
    const { error } = await supabase.from("job_posts").delete().eq("id", id);
    if (!error) {
      setJobs((prev) => prev.filter((j) => j.id !== id));
    }
  };

  const toggleActive = async (job) => {
    const nextStatus = job.status === "passive" ? "pending" : "passive";

    const payload =
      nextStatus === "pending"
        ? {
            status: "pending",
            // Refresh the 30-day lifetime so a reactivated listing doesn't
            // immediately re-expire on the next auto-expiry pass.
            expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          }
        : { status: "passive" };

    const { error } = await supabase.from("job_posts").update(payload).eq("id", job.id);
    if (!error) {
      setJobs((prev) => prev.map((j) => (j.id === job.id ? { ...j, ...payload } : j)));
    }
  };

  const startEdit = (job) => {
    setEditingId(job.id);
    setEditError("");
    setEditForm({
      company_name: job.company_name || "",
      job_title: job.job_title || "",
      city: job.city || "",
      district: job.district || "",
      category: job.category || editableCategories[0],
      work_type: job.work_type || editableTypes[0],
      salary: job.salary || "",
      description: job.description || "",
      work_address: job.work_address || "",
      phone: job.phone || job.contact_phone || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
    setEditError("");
  };

  const saveEdit = async () => {
    if (!editForm) return;

    if (!editForm.company_name.trim() || !editForm.job_title.trim() || !editForm.city.trim() ||
        !editForm.district.trim() || !editForm.work_address.trim()) {
      setEditError("Zorunlu alanları doldurun.");
      return;
    }

    if (editForm.job_title.trim().length < 5) {
      setEditError("İlan başlığı en az 5 karakter olmalıdır.");
      return;
    }

    if (editForm.description.trim().length < 30) {
      setEditError("İş açıklaması en az 30 karakter olmalıdır.");
      return;
    }

    setEditSubmitting(true);
    setEditError("");

    const { error } = await supabase
      .from("job_posts")
      .update({
        company_name: editForm.company_name.trim(),
        job_title: editForm.job_title.trim(),
        city: editForm.city.trim(),
        district: editForm.district.trim(),
        category: editForm.category,
        work_type: editForm.work_type,
        salary: editForm.salary.trim(),
        description: editForm.description.trim(),
        work_address: editForm.work_address.trim(),
        phone: editForm.phone.trim(),
      })
      .eq("id", editingId);

    setEditSubmitting(false);

    if (error) {
      setEditError("İlan güncellenemedi. Lütfen tekrar dene.");
      return;
    }

    setJobs((prev) =>
      prev.map((j) => (j.id === editingId ? { ...j, ...editForm } : j))
    );
    cancelEdit();
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "approved": return { text: "Yayında", color: "#22C55E" };
      case "pending": return { text: "Onay Bekliyor", color: "#F59E0B" };
      case "rejected": return { text: "Reddedildi", color: "#EF4444" };
      case "passive": return { text: "Süresi Doldu", color: "#9CA3AF" };
      default: return { text: status, color: "#9CA3AF" };
    }
  };

  return (
    <div style={overlay}>
      <div style={backdrop} onClick={onClose} />
      <div style={sheet}>
        {/* Header */}
        <div style={header}>
          <div>
            <h2 style={title}>İlanlarım</h2>
            <p style={subtitle}>{currentUser.email}</p>
          </div>
          <button style={closeBtn} onClick={onClose}>×</button>
        </div>

        {/* İçerik */}
        <div style={content}>
          {loading ? (
            <div style={centerBox}>
              <p style={grayText}>İlanlar yükleniyor...</p>
            </div>
          ) : error ? (
            <div style={centerBox}>
              <p style={{ color: "#EF4444" }}>{error}</p>
            </div>
          ) : jobs.length === 0 ? (
            <div style={centerBox}>
              <p style={grayText}>Henüz ilan vermediniz.</p>
              <p style={{ ...grayText, fontSize: "13px" }}>
                "Hemen İlan Ver" butonuyla ilk ilanınızı oluşturun.
              </p>
            </div>
          ) : (
            <div style={jobList}>
              {jobs.map((job) => {
                const statusInfo = getStatusLabel(job.status);

                if (editingId === job.id && editForm) {
                  return (
                    <div key={job.id} style={jobCard}>
                      <div style={editGrid}>
                        <input style={editInput} placeholder="Firma adı" value={editForm.company_name}
                          onChange={(e) => setEditForm((prev) => ({ ...prev, company_name: e.target.value }))} />
                        <input style={editInput} placeholder="İlan başlığı" value={editForm.job_title}
                          onChange={(e) => setEditForm((prev) => ({ ...prev, job_title: e.target.value }))} />
                        <input style={editInput} placeholder="Şehir" value={editForm.city}
                          onChange={(e) => setEditForm((prev) => ({ ...prev, city: e.target.value }))} />
                        <input style={editInput} placeholder="İlçe" value={editForm.district}
                          onChange={(e) => setEditForm((prev) => ({ ...prev, district: e.target.value }))} />
                        <select style={editInput} value={editForm.category}
                          onChange={(e) => setEditForm((prev) => ({ ...prev, category: e.target.value }))}>
                          {editableCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <select style={editInput} value={editForm.work_type}
                          onChange={(e) => setEditForm((prev) => ({ ...prev, work_type: e.target.value }))}>
                          {editableTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <input style={editInput} placeholder="Ücret" value={editForm.salary}
                          onChange={(e) => setEditForm((prev) => ({ ...prev, salary: e.target.value }))} />
                        <input style={editInput} placeholder="Telefon" value={editForm.phone}
                          onChange={(e) => setEditForm((prev) => ({ ...prev, phone: e.target.value }))} />
                        <input style={{ ...editInput, gridColumn: "1 / -1" }} placeholder="İş adresi / buluşma noktası"
                          value={editForm.work_address}
                          onChange={(e) => setEditForm((prev) => ({ ...prev, work_address: e.target.value }))} />
                        <textarea style={{ ...editInput, gridColumn: "1 / -1", minHeight: 80 }} placeholder="İş açıklaması"
                          value={editForm.description}
                          onChange={(e) => setEditForm((prev) => ({ ...prev, description: e.target.value }))} />
                      </div>

                      {editError ? <p style={{ color: "#EF4444", fontSize: 12, margin: "8px 0 0" }}>{editError}</p> : null}

                      <div style={{ ...jobBottom, borderTop: "none", paddingTop: 12 }}>
                        <div style={jobActions}>
                          <button style={saveBtn} disabled={editSubmitting} onClick={saveEdit}>
                            {editSubmitting ? "Kaydediliyor..." : "Kaydet"}
                          </button>
                          <button style={cancelBtn} onClick={cancelEdit}>Vazgeç</button>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={job.id} style={jobCard}>
                    <div style={jobTop}>
                      <div style={{ flex: 1 }}>
                        <div style={jobTitle}>{job.job_title}</div>
                        <div style={jobCompany}>{job.company_name}</div>
                        <div style={jobMeta}>
                          📍 {job.city}{job.district ? ` / ${job.district}` : ""}
                          {" · "}
                          💰 {job.salary}
                          {" · "}
                          🕐 {job.work_type}
                        </div>
                      </div>
                      <span style={{ ...statusBadge, backgroundColor: statusInfo.color + "20", color: statusInfo.color }}>
                        {statusInfo.text}
                      </span>
                    </div>

                    <div style={jobBottom}>
                      <span style={dateText}>
                        {new Date(job.created_at).toLocaleDateString("tr-TR", {
                          day: "2-digit", month: "long", year: "numeric"
                        })}
                      </span>
                      <div style={jobActions}>
                        <button style={editBtn} onClick={() => startEdit(job)}>
                          ✎ Düzenle
                        </button>
                        <button style={toggleBtn} onClick={() => toggleActive(job)}>
                          {job.status === "passive" ? "▶ Aktife Al" : "⏸ Pasife Al"}
                        </button>
                        <button
                          style={deleteBtn}
                          onClick={() => handleDelete(job.id)}
                        >
                          🗑 Sil
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Stiller
const overlay = {
  position: "fixed",
  inset: 0,
  zIndex: 10000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const backdrop = {
  position: "absolute",
  inset: 0,
  backgroundColor: "rgba(35,48,68,0.5)",
};

const sheet = {
  position: "relative",
  backgroundColor: "#fff",
  borderRadius: "24px",
  width: "100%",
  maxWidth: "580px",
  margin: "16px",
  maxHeight: "85vh",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 20px 60px rgba(35,48,68,0.2)",
};

const header = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  padding: "24px 24px 16px",
  borderBottom: "1px solid rgba(31,41,55,0.08)",
};

const title = {
  fontSize: "20px",
  fontWeight: "900",
  color: "#1F2937",
  margin: 0,
};

const subtitle = {
  fontSize: "13px",
  color: "#9CA3AF",
  margin: "4px 0 0",
};

const closeBtn = {
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  border: "none",
  backgroundColor: "#F5F7F8",
  fontSize: "22px",
  cursor: "pointer",
  color: "#1F2937",
  flexShrink: 0,
};

const content = {
  overflowY: "auto",
  padding: "16px 24px 24px",
  flex: 1,
};

const centerBox = {
  textAlign: "center",
  padding: "48px 0",
};

const grayText = {
  color: "#9CA3AF",
  fontSize: "15px",
  margin: "0 0 8px",
};

const jobList = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const jobCard = {
  backgroundColor: "#F9FAFB",
  borderRadius: "16px",
  padding: "16px",
  border: "1px solid rgba(31,41,55,0.07)",
};

const jobTop = {
  display: "flex",
  gap: "12px",
  alignItems: "flex-start",
  marginBottom: "12px",
};

const jobTitle = {
  fontSize: "15px",
  fontWeight: "900",
  color: "#1F2937",
  marginBottom: "4px",
};

const jobCompany = {
  fontSize: "13px",
  fontWeight: "700",
  color: "#58ADAD",
  marginBottom: "6px",
};

const jobMeta = {
  fontSize: "12px",
  color: "#6B7280",
  fontWeight: "600",
};

const statusBadge = {
  padding: "4px 10px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: "800",
  whiteSpace: "nowrap",
  flexShrink: 0,
};

const jobBottom = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderTop: "1px solid rgba(31,41,55,0.06)",
  paddingTop: "12px",
};

const dateText = {
  fontSize: "12px",
  color: "#9CA3AF",
  fontWeight: "600",
};

const jobActions = {
  display: "flex",
  gap: "8px",
};

const deleteBtn = {
  padding: "6px 12px",
  borderRadius: "8px",
  border: "1px solid rgba(239,68,68,0.2)",
  backgroundColor: "rgba(239,68,68,0.06)",
  color: "#EF4444",
  fontSize: "12px",
  fontWeight: "700",
  cursor: "pointer",
};

const editBtn = {
  padding: "6px 12px",
  borderRadius: "8px",
  border: "1px solid rgba(88,173,173,0.25)",
  backgroundColor: "rgba(88,173,173,0.08)",
  color: "#58ADAD",
  fontSize: "12px",
  fontWeight: "700",
  cursor: "pointer",
};

const toggleBtn = {
  padding: "6px 12px",
  borderRadius: "8px",
  border: "1px solid rgba(246,90,69,0.25)",
  backgroundColor: "rgba(246,90,69,0.08)",
  color: "#F65A45",
  fontSize: "12px",
  fontWeight: "700",
  cursor: "pointer",
};

const editGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "8px",
};

const editInput = {
  padding: "8px 10px",
  borderRadius: "8px",
  border: "1px solid rgba(31,41,55,0.15)",
  fontSize: "13px",
  fontFamily: "inherit",
};

const saveBtn = {
  padding: "6px 14px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#22C55E",
  color: "#fff",
  fontSize: "12px",
  fontWeight: "800",
  cursor: "pointer",
};

const cancelBtn = {
  padding: "6px 14px",
  borderRadius: "8px",
  border: "1px solid rgba(31,41,55,0.15)",
  backgroundColor: "#fff",
  color: "#6B7280",
  fontSize: "12px",
  fontWeight: "700",
  cursor: "pointer",
};
