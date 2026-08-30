import React, { useState, useEffect } from "react";
import { Cookie } from "lucide-react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("ekisCookieConsent");
    if (!consent) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("ekisCookieConsent", "accepted");
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("ekisCookieConsent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "#1a1a2e",
      color: "#fff",
      padding: "16px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "12px",
      zIndex: 9999,
      boxShadow: "0 -2px 16px rgba(0,0,0,0.2)",
    }}>
      <p style={{ margin: 0, fontSize: "14px", maxWidth: "700px", lineHeight: "1.5", display: "flex", alignItems: "flex-start", gap: "8px" }}>
        <Cookie size={18} style={{ flexShrink: 0, marginTop: "2px" }} />
        <span>
          Bu site, daha iyi bir deneyim sunmak ve reklam hizmetleri için çerezler kullanmaktadır.
          Devam ederek{" "}
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{ color: "#FF5A3C", textDecoration: "underline" }}
          >
            Çerez Politikamızı
          </a>{" "}
          kabul etmiş sayılırsınız.
        </span>
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={handleReject}
          style={{
            padding: "8px 18px",
            borderRadius: "8px",
            border: "1px solid #ffffff44",
            backgroundColor: "transparent",
            color: "#fff",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Reddet
        </button>
        <button
          onClick={handleAccept}
          style={{
            padding: "8px 18px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#FF5A3C",
            color: "#fff",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          Kabul Et
        </button>
      </div>
    </div>
  );
}
