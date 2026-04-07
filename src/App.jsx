import { useState } from "react";

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [featured, setFeatured] = useState(false);

  const SHOPIFY_FEATURED_LINK = "https://your-shopify-link.com";

  return (
    <div style={{ fontFamily: "sans-serif", background: "#f6f7fb", minHeight: "100vh" }}>
      
      {/* HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        background: "#fff"
      }}>
        
        {/* LOGO */}
        <img
          src="/logo-ekis.png"
          alt="logo"
          style={{ height: "40px" }}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              background: "#0f172a",
              color: "#fff",
              border: "none",
              padding: "10px 16px",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Ücretsiz İlan Ver
          </button>

          <button style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            background: "#fff"
          }}>
            Admin
          </button>
        </div>
      </div>

      {/* FORM */}
      {showForm && (
        <div style={{
          background: "#fff",
          margin: "20px",
          padding: "20px",
          borderRadius: "12px"
        }}>
          <h3>İlan Ver</h3>

          <label>
            <input
              type="checkbox"
              onChange={(e) => setFeatured(e.target.checked)}
            />
            {" "}İlanı öne çıkar
          </label>

          {featured && (
            <div style={{ marginTop: "10px" }}>
              <a href={SHOPIFY_FEATURED_LINK} target="_blank">
                Öne çıkarmak için ödeme yap
              </a>
            </div>
          )}
        </div>
      )}

      {/* HERO */}
      <div style={{ padding: "20px 24px" }}>
        <h1 style={{ marginBottom: "10px" }}>
          Eskişehir’de ek iş ilanları
        </h1>
        <p style={{ color: "#555" }}>
          Günlük, saatlik ve part time iş ilanlarını incele.
        </p>
      </div>

      {/* ÖNE ÇIKAN */}
      <div style={{ padding: "0 24px" }}>
        <h2>Öne çıkan ilanlar</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px"
        }}>
          {["Garson", "Etkinlik", "Kurye"].map((job, i) => (
            <div key={i} style={{
              background: "#fff",
              padding: "16px",
              borderRadius: "12px"
            }}>
              <strong>{job} Aranıyor</strong>
              <p>Eskişehir</p>
            </div>
          ))}
        </div>
      </div>

      {/* TÜM İLANLAR */}
      <div style={{ padding: "24px" }}>
        <h2>Tüm ilanlar</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px"
        }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} style={{
              background: "#fff",
              padding: "16px",
              borderRadius: "12px"
            }}>
              <strong>İlan {i}</strong>
              <p>Detay</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
