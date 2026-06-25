import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function AuthModal({ onClose, onAuthSuccess }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setMessage("");

    if (!email.trim() || !password.trim()) {
      setMessage("E-posta ve şifre zorunludur.");
      return;
    }

    if (password.length < 6) {
      setMessage("Şifre en az 6 karakter olmalı.");
      return;
    }

    setLoading(true);

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            company_name: companyName.trim(),
            role: "employer",
          },
        },
      });

      setLoading(false);

      if (error) {
        setMessage(error.message);
        return;
      }

      setMessage("Kayıt başarılı! E-postanızı doğrulayın.");
      setTimeout(() => {
        onAuthSuccess && onAuthSuccess();
        onClose && onClose();
      }, 2000);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (error) {
      setMessage("E-posta veya şifre hatalı.");
      return;
    }

    onAuthSuccess && onAuthSuccess();
    onClose && onClose();
  };

  return (
    <div style={overlay}>
      <div style={backdrop} onClick={onClose} />
      <div style={sheet}>
        {/* Kapat butonu */}
        <button style={closeBtn} onClick={onClose}>×</button>

        <h2 style={title}>İşveren Girişi</h2>
        <p style={subtitle}>
          İlan vermek ve ilanlarını yönetmek için işveren hesabıyla giriş yap.
          İş arayanlar ilanlara üyeliksiz ulaşmaya devam eder.
        </p>

        {/* Sekmeler */}
        <div style={tabs}>
          <button
            style={mode === "login" ? { ...tab, ...tabActive } : tab}
            onClick={() => setMode("login")}
          >
            Giriş Yap
          </button>
          <button
            style={mode === "signup" ? { ...tab, ...tabActive } : tab}
            onClick={() => setMode("signup")}
          >
            Kayıt Ol
          </button>
        </div>

        {mode === "signup" && (
          <input
            style={input}
            type="text"
            placeholder="Firma adı"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        )}

        <input
          style={input}
          type="email"
          placeholder="E-posta"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={input}
          type="password"
          placeholder="Şifre"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAuth()}
        />

        {message && (
          <div style={messageBox}>
            <span style={messageText}>{message}</span>
          </div>
        )}

        <button style={authBtn} onClick={handleAuth} disabled={loading}>
          {loading ? "İşleniyor..." : mode === "login" ? "Giriş Yap" : "Kayıt Ol"}
        </button>
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
  padding: "32px 28px",
  width: "100%",
  maxWidth: "420px",
  margin: "16px",
  boxShadow: "0 20px 60px rgba(35,48,68,0.2)",
};

const closeBtn = {
  position: "absolute",
  top: "16px",
  right: "16px",
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  border: "none",
  backgroundColor: "#F5F7F8",
  fontSize: "22px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#1F2937",
};

const title = {
  fontSize: "22px",
  fontWeight: "900",
  color: "#1F2937",
  margin: "0 0 8px 0",
};

const subtitle = {
  fontSize: "13px",
  color: "#5D6B7F",
  lineHeight: "1.6",
  margin: "0 0 20px 0",
};

const tabs = {
  display: "flex",
  backgroundColor: "#F5F7F8",
  borderRadius: "12px",
  padding: "4px",
  marginBottom: "20px",
};

const tab = {
  flex: 1,
  padding: "10px",
  border: "none",
  borderRadius: "10px",
  backgroundColor: "transparent",
  fontSize: "14px",
  fontWeight: "800",
  color: "#5D6B7F",
  cursor: "pointer",
};

const tabActive = {
  backgroundColor: "#fff",
  color: "#FF5A3C",
  boxShadow: "0 2px 8px rgba(35,48,68,0.1)",
};

const input = {
  width: "100%",
  height: "52px",
  borderRadius: "12px",
  border: "1.5px solid rgba(31,41,55,0.12)",
  padding: "0 16px",
  fontSize: "14px",
  fontWeight: "600",
  color: "#1F2937",
  marginBottom: "12px",
  outline: "none",
  boxSizing: "border-box",
  backgroundColor: "#FAFAFA",
};

const messageBox = {
  backgroundColor: "rgba(255,90,60,0.08)",
  borderRadius: "10px",
  padding: "10px 14px",
  marginBottom: "12px",
};

const messageText = {
  color: "#FF5A3C",
  fontSize: "13px",
  fontWeight: "700",
};

const authBtn = {
  width: "100%",
  height: "52px",
  borderRadius: "12px",
  border: "none",
  backgroundColor: "#FF5A3C",
  color: "#fff",
  fontSize: "15px",
  fontWeight: "900",
  cursor: "pointer",
  marginTop: "4px",
};
