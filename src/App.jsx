import React, { useState } from "react";

export default function App() {
  const [isVitrin, setIsVitrin] = useState(false);

  const handleSubmit = () => {
    if (isVitrin) {
      alert("🚀 Vitrin ilan seçildi! Ödeme sayfasına yönlendiriliyorsun...");
    } else {
      alert("İlan ücretsiz olarak yayınlandı.");
    }
  };

  return (
    <div style={{padding:40,fontFamily:"Arial"}}>

      <h2>İlan Ver</h2>

      <div style={{marginTop:20}}>
        <label>İlan Başlığı</label>
        <input style={{display:"block",width:"100%",padding:10,marginTop:5}} />
      </div>

      <div style={{marginTop:20}}>
        <label>Şehir</label>
        <input style={{display:"block",width:"100%",padding:10,marginTop:5}} />
      </div>

      <div style={{
        marginTop:30,
        padding:20,
        border:"2px solid #E45D50",
        borderRadius:16,
        background:"rgba(228,93,80,0.05)"
      }}>
        <label style={{display:"flex",gap:10,alignItems:"center"}}>
          <input
            type="checkbox"
            checked={isVitrin}
            onChange={() => setIsVitrin(!isVitrin)}
          />
          <div>
            <strong>🔥 Vitrine çıkar (49 TL)</strong>
            <div style={{fontSize:13}}>
              Daha fazla görünürlük, daha hızlı dönüş
            </div>
          </div>
        </label>
      </div>

      <button
        onClick={handleSubmit}
        style={{
          marginTop:30,
          padding:"14px 20px",
          background:"#3C4A5F",
          color:"#fff",
          border:"none",
          borderRadius:12,
          fontWeight:"bold",
          cursor:"pointer"
        }}
      >
        🚀 İlanı Yayınla
      </button>

    </div>
  );
}

