import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function MyJobsModal({ currentUser, onClose }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
