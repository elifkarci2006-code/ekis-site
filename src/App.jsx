import React, { useState } from "react";

export default function App() {
  const [logoSrc, setLogoSrc] = useState("/logo-ekis.png");
  const [showForm, setShowForm] = useState(false);

  return (
    <div style={{ fontFamily: "Arial", padding: 20 }}>

      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <img src={logoSrc} style={{ height: 60 }} />
        <div>
          <button style={{ marginRight: 10 }}>Ücretsiz İlan Ver</button>
          <button>Hemen İş Bul</button>
        </div>
      </div>

      {/* HERO (KÜÇÜK) */}
      <div style={{
        padding: 20,
        borderRadius: 16,
        background: "#f5f6f7",
        marginBottom: 20
      }}>
        <h1 style={{ margin: 0 }}>
          Günlük, saatlik ve part time işleri kolayca keşfet.
        </h1>

        <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
          <div className="bubble">1.200+ aktif aday</div>
          <div className="bubble">320+ ilan</div>
          <div className="bubble">81 bugün başvuru</div>
          <div className="bubble">Türkiye geneli</div>
        </div>
      </div>

      {/* VİTRİN */}
      <div style={{
        background: "#E45D50",
        padding: 20,
        borderRadius: 24,
        color: "#fff",
        marginBottom: 30
      }}>
        <h2>Vitrin ilanlar</h2>

        <div style={{ display: "flex", gap: 20 }}>
          {[1,2,3].map((i)=>(
            <div key={i} style={{
              background: "#fff",
              color: "#000",
              padding: 16,
              borderRadius: 16,
              flex: 1
            }}>
              <strong>Garson Aranıyor</strong>
              <div>Mavi Masa Kafe</div>
              <div style={{ fontSize: 12, color: "#888" }}>İstanbul / Kadıköy</div>
              <div style={{ marginTop: 8, color: "#E45D50", fontWeight: "bold" }}>
                Günlük 1.200 TL
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="site-footer">

        <div className="footer-topline" />

        <div className="footer-inner">
          <div className="footer-grid">

            <div>
              <img src={logoSrc} style={{ width: 120, filter: "invert(1)" }} />
              <p>
                Günlük ve saatlik iş fırsatlarını tek yerde buluşturan sade platform.
              </p>
            </div>

            <div>
              <h4>İş Arayan</h4>
              <a href="#">İlanları keşfet</a>
              <a href="#">Vitrin ilanlar</a>
            </div>

            <div>
              <h4>İşveren</h4>
              <a href="#">İlan ver</a>
              <a href="#">Vitrine çıkar</a>
            </div>

            <div>
              <h4>Sosyal</h4>
              <div style={{ display: "flex", gap: 10 }}>
                <div className="social">ig</div>
                <div className="social">x</div>
                <div className="social">tt</div>
              </div>
            </div>

          </div>

          <div className="footer-bottom">
            <span>© 2026 Ekiş</span>
          </div>
        </div>

      </footer>

      <style>{`
        .bubble {
          padding: 6px 10px;
          background: #eee;
          border-radius: 999px;
          font-size: 12px;
        }

        .site-footer {
          background:#2F3949;
          color:#fff;
          border-radius:20px 20px 0 0;
        }

        .footer-topline {
          height:6px;
          background:#E45D50;
        }

        .footer-inner {
          padding:20px;
        }

        .footer-grid {
          display:grid;
          grid-template-columns: repeat(4,1fr);
          gap:20px;
        }

        .footer-grid a {
          display:block;
          color:#ccc;
          text-decoration:none;
          margin-top:6px;
        }

        .social {
          width:32px;
          height:32px;
          background:#444;
          display:flex;
          align-items:center;
          justify-content:center;
          border-radius:999px;
        }

        .footer-bottom {
          margin-top:20px;
          font-size:12px;
          color:#aaa;
        }
      `}</style>

    </div>
  );
}
