import { useEffect, useRef, useState } from "react";
import { supabase } from "../supabaseClient";

const ADMIN_EMAILS = ["nkarci95@gmail.com", "ekissosyal@gmail.com"];

export default function AccountMenu({ currentUser, onLogout, onNewPost, onMyPosts, onAdminPanel }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const isAdmin = currentUser && ADMIN_EMAILS.includes(currentUser.email);

  // Dışarı tıklayınca kapat
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
    setOpen(false);
  };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        style={triggerBtn}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span style={avatar}>
          {currentUser?.email?.[0]?.toUpperCase() || "K"}
        </span>
        Hesabım
        <span style={{ fontSize: "10px", marginLeft: "2px" }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div style={dropdown}>
          {/* Kullanıcı bilgisi */}
          <div style={userInfo}>
            <span style={badge}>İşveren hesabı</span>
            <span style={email}>{currentUser?.email}</span>
          </div>

          <div style={divider} />

          {/* Menü öğeleri */}
          <button style={menuItem} onClick={() => { onNewPost(); setOpen(false); }}>
            <span>➕</span> Yeni İlan Ver
          </button>

          <button style={menuItem} onClick={() => { onMyPosts(); setOpen(false); }}>
            <span>📋</span> İlanlarım
          </button>

          {isAdmin && (
            <button style={menuItem} onClick={() => { onAdminPanel(); setOpen(false); }}>
              <span>⚙️</span> Admin Panel
            </button>
          )}

          <div style={divider} />

          <button style={{ ...menuItem, color: "#FF5A3C" }} onClick={handleLogout}>
            <span>🚪</span> Çıkış Yap
          </button>
        </div>
      )}
    </div>
  );
}

// Stiller
const triggerBtn = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "8px 16px",
  borderRadius: "10px",
  border: "1.5px solid rgba(31,41,55,0.15)",
  backgroundColor: "#fff",
  fontSize: "14px",
  fontWeight: "800",
  color: "#1F2937",
  cursor: "pointer",
};

const avatar = {
  width: "26px",
  height: "26px",
  borderRadius: "50%",
  backgroundColor: "#FF5A3C",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  fontWeight: "900",
};

const dropdown = {
  position: "absolute",
  top: "calc(100% + 8px)",
  right: 0,
  backgroundColor: "#fff",
  borderRadius: "16px",
  boxShadow: "0 8px 30px rgba(35,48,68,0.15)",
  border: "1px solid rgba(31,41,55,0.08)",
  minWidth: "220px",
  zIndex: 9999,
  overflow: "hidden",
};

const userInfo = {
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
};

const badge = {
  fontSize: "11px",
  fontWeight: "900",
  color: "#FF5A3C",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const email = {
  fontSize: "13px",
  fontWeight: "700",
  color: "#5D6B7F",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const divider = {
  height: "1px",
  backgroundColor: "rgba(31,41,55,0.07)",
  margin: "0",
};

const menuItem = {
  width: "100%",
  padding: "12px 16px",
  border: "none",
  backgroundColor: "transparent",
  textAlign: "left",
  fontSize: "14px",
  fontWeight: "700",
  color: "#1F2937",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "10px",
};
