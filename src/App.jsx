{% liquid
  assign accent = section.settings.accent_color | default: '#22c55e'
  assign accent_deep = section.settings.accent_deep | default: '#15803d'
  assign accent_soft = section.settings.accent_soft | default: '#dcfce7'
  assign ink = '#0f172a'
  assign muted = '#64748b'
  assign bg = '#f8fafc'
  assign card = '#ffffff'
%}

<section id="ekis-marketplace-{{ section.id }}" class="ekis-shell">
  <style>
    #ekis-marketplace-{{ section.id }}{
      --ekis-accent: {{ accent }};
      --ekis-accent-deep: {{ accent_deep }};
      --ekis-accent-soft: {{ accent_soft }};
      --ekis-ink: {{ ink }};
      --ekis-muted: {{ muted }};
      --ekis-bg: {{ bg }};
      --ekis-card: {{ card }};
      --ekis-line: rgba(15,23,42,.08);
      --ekis-shadow: 0 18px 44px rgba(15,23,42,.08);
      color:var(--ekis-ink);
      background:
        radial-gradient(circle at top left, rgba(34,197,94,.12), transparent 25%),
        radial-gradient(circle at top right, rgba(21,128,61,.10), transparent 24%),
        linear-gradient(180deg,#fbfffd 0%, #f7fafc 100%);
      padding: 28px 16px 46px;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    #ekis-marketplace-{{ section.id }} *{box-sizing:border-box}
    #ekis-marketplace-{{ section.id }} .ekis-container{max-width:1240px;margin:0 auto}
    #ekis-marketplace-{{ section.id }} .ekis-topbar,
    #ekis-marketplace-{{ section.id }} .ekis-card,
    #ekis-marketplace-{{ section.id }} .ekis-modal-panel{
      background:rgba(255,255,255,.96);
      border:1px solid rgba(15,23,42,.07);
      box-shadow:var(--ekis-shadow);
      border-radius:24px;
    }
    #ekis-marketplace-{{ section.id }} .ekis-topbar{
      display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;
      padding:16px 18px;margin-bottom:18px;position:sticky;top:12px;z-index:10;backdrop-filter: blur(10px);
    }
    #ekis-marketplace-{{ section.id }} .ekis-brand{display:flex;align-items:center;gap:14px;flex-wrap:wrap}
    #ekis-marketplace-{{ section.id }} .ekis-logo{
      font-size:31px;font-weight:900;letter-spacing:-.05em;line-height:1;color:var(--ekis-ink)
    }
    #ekis-marketplace-{{ section.id }} .ekis-sub{
      color:var(--ekis-muted);font-size:14px;line-height:1.5;max-width:680px
    }
    #ekis-marketplace-{{ section.id }} .ekis-chip,
    #ekis-marketplace-{{ section.id }} .ekis-badge{
      display:inline-flex;align-items:center;gap:8px;padding:9px 12px;border-radius:999px;
      font-weight:800;font-size:12px;line-height:1;background:var(--ekis-accent-soft);color:#166534;border:1px solid rgba(34,197,94,.18)
    }
    #ekis-marketplace-{{ section.id }} .ekis-header-actions{display:flex;gap:10px;flex-wrap:wrap}
    #ekis-marketplace-{{ section.id }} .ekis-btn{
      appearance:none;border:none;border-radius:16px;min-height:48px;padding:13px 18px;cursor:pointer;text-decoration:none;
      display:inline-flex;align-items:center;justify-content:center;gap:10px;font-weight:900;font-size:14px;transition:.18s ease;
    }
    #ekis-marketplace-{{ section.id }} .ekis-btn-primary{
      background:linear-gradient(180deg,var(--ekis-accent) 0%,var(--ekis-accent-deep) 100%);
      color:#052e16;box-shadow:0 16px 28px rgba(21,128,61,.22)
    }
    #ekis-marketplace-{{ section.id }} .ekis-btn-secondary{
      background:#fff;color:var(--ekis-ink);border:1px solid rgba(15,23,42,.1)
    }
    #ekis-marketplace-{{ section.id }} .ekis-btn-ghost{
      background:#f8fafc;color:var(--ekis-ink);border:1px solid rgba(15,23,42,.08)
    }
    #ekis-marketplace-{{ section.id }} .ekis-btn:hover{transform:translateY(-1px)}
    #ekis-marketplace-{{ section.id }} .ekis-hero{
      display:grid;grid-template-columns:1.4fr .84fr;gap:18px;align-items:start;margin-bottom:18px
    }
    #ekis-marketplace-{{ section.id }} .ekis-hero-main{padding:26px}
    #ekis-marketplace-{{ section.id }} .ekis-eyebrow{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px}
    #ekis-marketplace-{{ section.id }} .ekis-title{
      margin:0;font-size:clamp(30px,4.2vw,56px);line-height:.98;letter-spacing:-.05em;max-width:760px
    }
    #ekis-marketplace-{{ section.id }} .ekis-title span{color:var(--ekis-accent-deep)}
    #ekis-marketplace-{{ section.id }} .ekis-copy{margin:12px 0 0;color:#334155;font-size:16px;line-height:1.7;max-width:760px}
    #ekis-marketplace-{{ section.id }} .ekis-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}
    #ekis-marketplace-{{ section.id }} .ekis-inline-points{display:flex;gap:12px;flex-wrap:wrap;margin-top:14px}
    #ekis-marketplace-{{ section.id }} .ekis-inline-points span{color:var(--ekis-muted);font-size:13px;font-weight:700}
    #ekis-marketplace-{{ section.id }} .ekis-stat-stack{display:grid;gap:14px}
    #ekis-marketplace-{{ section.id }} .ekis-stat{padding:20px}
    #ekis-marketplace-{{ section.id }} .ekis-stat-top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}
    #ekis-marketplace-{{ section.id }} .ekis-stat-label{font-size:13px;color:var(--ekis-muted);font-weight:700}
    #ekis-marketplace-{{ section.id }} .ekis-stat-value{font-size:30px;font-weight:900;letter-spacing:-.04em}
    #ekis-marketplace-{{ section.id }} .ekis-stat-note{margin-top:8px;color:#475569;font-size:14px;line-height:1.6}
    #ekis-marketplace-{{ section.id }} .ekis-search-card{padding:18px 18px 12px;margin-bottom:18px}
    #ekis-marketplace-{{ section.id }} .ekis-search-head{display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap;margin-bottom:12px}
    #ekis-marketplace-{{ section.id }} .ekis-search-title{font-size:22px;font-weight:900;letter-spacing:-.03em}
    #ekis-marketplace-{{ section.id }} .ekis-search-note{font-size:14px;color:var(--ekis-muted)}
    #ekis-marketplace-{{ section.id }} .ekis-search-grid{display:grid;grid-template-columns:2.1fr 1fr 1fr auto;gap:10px}
    #ekis-marketplace-{{ section.id }} .ekis-field{display:grid;gap:6px}
    #ekis-marketplace-{{ section.id }} .ekis-label{font-size:13px;font-weight:800;color:#334155}
    #ekis-marketplace-{{ section.id }} .ekis-input,
    #ekis-marketplace-{{ section.id }} .ekis-select,
    #ekis-marketplace-{{ section.id }} .ekis-textarea{
      width:100%;border-radius:16px;border:1px solid rgba(15,23,42,.1);background:#fff;color:var(--ekis-ink);
      min-height:50px;padding:13px 14px;font-size:14px;outline:none;transition:.18s ease
    }
    #ekis-marketplace-{{ section.id }} .ekis-textarea{min-height:120px;resize:vertical}
    #ekis-marketplace-{{ section.id }} .ekis-input:focus,
    #ekis-marketplace-{{ section.id }} .ekis-select:focus,
    #ekis-marketplace-{{ section.id }} .ekis-textarea:focus{border-color:var(--ekis-accent);box-shadow:0 0 0 4px rgba(34,197,94,.12)}
    #ekis-marketplace-{{ section.id }} .ekis-filter-row{display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap;margin-top:12px}
    #ekis-marketplace-{{ section.id }} .ekis-filter-tags{display:flex;gap:8px;flex-wrap:wrap}
    #ekis-marketplace-{{ section.id }} .ekis-switch{display:flex;align-items:center;gap:10px;font-weight:800;color:#334155}
    #ekis-marketplace-{{ section.id }} .ekis-main-grid{display:grid;grid-template-columns:1fr 318px;gap:18px;align-items:start}
    #ekis-marketplace-{{ section.id }} .ekis-list{display:grid;gap:14px}
    #ekis-marketplace-{{ section.id }} .ekis-job{padding:18px;display:grid;grid-template-columns:1fr auto;gap:18px;align-items:start}
    #ekis-marketplace-{{ section.id }} .ekis-job.is-featured{border-color:rgba(245,158,11,.26);box-shadow:0 18px 34px rgba(245,158,11,.08)}
    #ekis-marketplace-{{ section.id }} .ekis-job-top{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:8px}
    #ekis-marketplace-{{ section.id }} .ekis-job-title{font-size:23px;font-weight:900;letter-spacing:-.03em}
    #ekis-marketplace-{{ section.id }} .ekis-company{font-size:15px;font-weight:800;color:#0f172a;margin-bottom:9px}
    #ekis-marketplace-{{ section.id }} .ekis-meta{display:flex;gap:14px;flex-wrap:wrap;color:var(--ekis-muted);font-size:13px;margin-bottom:10px}
    #ekis-marketplace-{{ section.id }} .ekis-meta span{display:inline-flex;align-items:center;gap:6px}
    #ekis-marketplace-{{ section.id }} .ekis-pay{color:#166534;font-weight:900}
    #ekis-marketplace-{{ section.id }} .ekis-desc{margin:0;color:#334155;line-height:1.65;font-size:14px}
    #ekis-marketplace-{{ section.id }} .ekis-tags{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
    #ekis-marketplace-{{ section.id }} .ekis-badge.secondary{background:#eff6ff;color:#1d4ed8;border-color:rgba(29,78,216,.12)}
    #ekis-marketplace-{{ section.id }} .ekis-badge.premium{background:#fffbeb;color:#b45309;border-color:rgba(245,158,11,.18)}
    #ekis-marketplace-{{ section.id }} .ekis-badge.urgent{background:#fef2f2;color:#b91c1c;border-color:rgba(239,68,68,.12)}
    #ekis-marketplace-{{ section.id }} .ekis-badge.dark{background:#f8fafc;color:#0f172a;border-color:rgba(15,23,42,.08)}
    #ekis-marketplace-{{ section.id }} .ekis-job-actions{display:grid;gap:10px;min-width:210px}
    #ekis-marketplace-{{ section.id }} .ekis-side{display:grid;gap:14px;position:sticky;top:90px}
    #ekis-marketplace-{{ section.id }} .ekis-side-card{padding:18px}
    #ekis-marketplace-{{ section.id }} .ekis-side-title{font-size:18px;font-weight:900;letter-spacing:-.03em;margin-bottom:10px}
    #ekis-marketplace-{{ section.id }} .ekis-side-copy{font-size:14px;color:#475569;line-height:1.7;margin-bottom:14px}
    #ekis-marketplace-{{ section.id }} .ekis-mini-list{display:grid;gap:10px}
    #ekis-marketplace-{{ section.id }} .ekis-mini{padding:13px;border-radius:16px;background:#f8fafc;border:1px solid rgba(15,23,42,.06)}
    #ekis-marketplace-{{ section.id }} .ekis-mini strong{display:block;margin-bottom:5px;font-size:14px}
    #ekis-marketplace-{{ section.id }} .ekis-section{margin-top:22px}
    #ekis-marketplace-{{ section.id }} .ekis-section-head{display:flex;align-items:end;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:12px}
    #ekis-marketplace-{{ section.id }} .ekis-h2{margin:0;font-size:28px;font-weight:900;letter-spacing:-.04em}
    #ekis-marketplace-{{ section.id }} .ekis-muted{color:var(--ekis-muted)}
    #ekis-marketplace-{{ section.id }} .ekis-feature-grid,
    #ekis-marketplace-{{ section.id }} .ekis-plan-grid,
    #ekis-marketplace-{{ section.id }} .ekis-employer-grid,
    #ekis-marketplace-{{ section.id }} .ekis-legal-grid,
    #ekis-marketplace-{{ section.id }} .ekis-footer-grid,
    #ekis-marketplace-{{ section.id }} .ekis-faq-grid{display:grid;gap:14px}
    #ekis-marketplace-{{ section.id }} .ekis-feature-grid{grid-template-columns:repeat(4,1fr)}
    #ekis-marketplace-{{ section.id }} .ekis-plan-grid{grid-template-columns:repeat(3,1fr)}
    #ekis-marketplace-{{ section.id }} .ekis-employer-grid{grid-template-columns:1.05fr .95fr}
    #ekis-marketplace-{{ section.id }} .ekis-legal-grid{grid-template-columns:repeat(3,1fr)}
    #ekis-marketplace-{{ section.id }} .ekis-footer-grid{grid-template-columns:1.35fr .9fr .9fr .95fr}
    #ekis-marketplace-{{ section.id }} .ekis-faq-grid{grid-template-columns:1fr 1fr}
    #ekis-marketplace-{{ section.id }} .ekis-block{padding:18px}
    #ekis-marketplace-{{ section.id }} .ekis-block h3{margin:0 0 10px;font-size:20px;letter-spacing:-.03em}
    #ekis-marketplace-{{ section.id }} .ekis-block p{margin:0;color:#475569;line-height:1.7;font-size:14px}
    #ekis-marketplace-{{ section.id }} .ekis-plan{padding:20px;display:grid;gap:12px;position:relative;overflow:hidden}
    #ekis-marketplace-{{ section.id }} .ekis-plan.highlight{border-color:rgba(34,197,94,.22);box-shadow:0 18px 38px rgba(34,197,94,.12)}
    #ekis-marketplace-{{ section.id }} .ekis-plan.highlight:before{content:'';position:absolute;inset:auto 18px 0 18px;height:4px;border-radius:999px;background:linear-gradient(90deg,var(--ekis-accent),var(--ekis-accent-deep))}
    #ekis-marketplace-{{ section.id }} .ekis-plan-top{display:flex;align-items:center;justify-content:space-between;gap:10px}
    #ekis-marketplace-{{ section.id }} .ekis-plan-name{font-size:20px;font-weight:900}
    #ekis-marketplace-{{ section.id }} .ekis-price{font-size:34px;font-weight:900;letter-spacing:-.05em}
    #ekis-marketplace-{{ section.id }} .ekis-price small{font-size:14px;color:var(--ekis-muted);font-weight:700}
    #ekis-marketplace-{{ section.id }} .ekis-plan-list{display:grid;gap:10px;margin:0;padding:0;list-style:none}
    #ekis-marketplace-{{ section.id }} .ekis-plan-list li{display:flex;gap:10px;align-items:flex-start;color:#334155;font-size:14px;line-height:1.6}
    #ekis-marketplace-{{ section.id }} .ekis-icon{width:18px;height:18px;display:inline-block;flex:0 0 18px}
    #ekis-marketplace-{{ section.id }} .ekis-form-card{padding:20px}
    #ekis-marketplace-{{ section.id }} .ekis-form-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
    #ekis-marketplace-{{ section.id }} .ekis-full{grid-column:1 / -1}
    #ekis-marketplace-{{ section.id }} .ekis-package-list{display:grid;gap:10px}
    #ekis-marketplace-{{ section.id }} .ekis-package{padding:14px;border-radius:18px;border:1px solid rgba(15,23,42,.07);background:#f8fafc;display:flex;justify-content:space-between;gap:12px;align-items:flex-start}
    #ekis-marketplace-{{ section.id }} .ekis-package strong{display:block;font-size:15px;margin-bottom:4px}
    #ekis-marketplace-{{ section.id }} .ekis-price-chip{font-size:13px;font-weight:900;padding:8px 10px;border-radius:999px;background:#fff;border:1px solid rgba(15,23,42,.07)}
    #ekis-marketplace-{{ section.id }} .ekis-legal-card{padding:18px;height:100%}
    #ekis-marketplace-{{ section.id }} .ekis-legal-card a{color:var(--ekis-accent-deep);font-weight:800;text-decoration:none}
    #ekis-marketplace-{{ section.id }} .ekis-footer{margin-top:22px;padding:20px}
    #ekis-marketplace-{{ section.id }} .ekis-footer-title{font-size:15px;font-weight:900;margin-bottom:10px}
    #ekis-marketplace-{{ section.id }} .ekis-footer p{margin:0;color:#475569;font-size:14px;line-height:1.75}
    #ekis-marketplace-{{ section.id }} .ekis-footer-links{display:grid;gap:8px}
    #ekis-marketplace-{{ section.id }} .ekis-footer a{color:#334155;text-decoration:none;font-size:14px}
    #ekis-marketplace-{{ section.id }} .ekis-footer a:hover{color:var(--ekis-accent-deep)}
    #ekis-marketplace-{{ section.id }} .ekis-empty{padding:20px;text-align:center;color:var(--ekis-muted);font-weight:700}
    #ekis-marketplace-{{ section.id }} .ekis-hidden{display:none !important}
    #ekis-marketplace-{{ section.id }} .ekis-modal{
      position:fixed;inset:0;background:rgba(2,6,23,.58);display:none;align-items:center;justify-content:center;z-index:999;padding:16px;
      backdrop-filter: blur(5px)
    }
    #ekis-marketplace-{{ section.id }} .ekis-modal.is-open{display:flex}
    #ekis-marketplace-{{ section.id }} .ekis-modal-panel{width:min(620px,100%);padding:22px;max-height:88vh;overflow:auto}
    #ekis-marketplace-{{ section.id }} .ekis-modal-head{display:flex;justify-content:space-between;gap:12px;align-items:start;margin-bottom:14px}
    #ekis-marketplace-{{ section.id }} .ekis-modal-title{font-size:28px;font-weight:900;letter-spacing:-.04em;margin:0}
    #ekis-marketplace-{{ section.id }} .ekis-close{border:none;background:#f1f5f9;border-radius:14px;width:42px;height:42px;cursor:pointer;font-size:18px;font-weight:900}
    #ekis-marketplace-{{ section.id }} .ekis-preview{padding:14px;border-radius:18px;background:#f8fafc;border:1px solid rgba(15,23,42,.06);margin-bottom:14px}
    #ekis-marketplace-{{ section.id }} .ekis-preview strong{display:block;font-size:16px;margin-bottom:4px}
    #ekis-marketplace-{{ section.id }} .ekis-success{margin-top:12px;padding:14px;border-radius:18px;background:#f0fdf4;border:1px solid rgba(34,197,94,.18);color:#166534;font-weight:800;display:none}
    #ekis-marketplace-{{ section.id }} .ekis-accordion{padding:18px}
    #ekis-marketplace-{{ section.id }} details{border:1px solid rgba(15,23,42,.08);border-radius:18px;background:#fff;padding:14px 16px}
    #ekis-marketplace-{{ section.id }} details + details{margin-top:10px}
    #ekis-marketplace-{{ section.id }} summary{cursor:pointer;font-weight:900;list-style:none}
    #ekis-marketplace-{{ section.id }} summary::-webkit-details-marker{display:none}
    #ekis-marketplace-{{ section.id }} details p{margin:10px 0 0;color:#475569;line-height:1.7;font-size:14px}
    @media (max-width: 1100px){
      #ekis-marketplace-{{ section.id }} .ekis-hero,
      #ekis-marketplace-{{ section.id }} .ekis-main-grid,
      #ekis-marketplace-{{ section.id }} .ekis-employer-grid,
      #ekis-marketplace-{{ section.id }} .ekis-footer-grid,
      #ekis-marketplace-{{ section.id }} .ekis-faq-grid{grid-template-columns:1fr}
      #ekis-marketplace-{{ section.id }} .ekis-side{position:static}
      #ekis-marketplace-{{ section.id }} .ekis-feature-grid{grid-template-columns:repeat(2,1fr)}
      #ekis-marketplace-{{ section.id }} .ekis-plan-grid,
      #ekis-marketplace-{{ section.id }} .ekis-legal-grid{grid-template-columns:1fr}
    }
    @media (max-width: 760px){
      #ekis-marketplace-{{ section.id }}{padding:18px 10px 32px}
      #ekis-marketplace-{{ section.id }} .ekis-hero-main,
      #ekis-marketplace-{{ section.id }} .ekis-stat,
      #ekis-marketplace-{{ section.id }} .ekis-card,
      #ekis-marketplace-{{ section.id }} .ekis-block,
      #ekis-marketplace-{{ section.id }} .ekis-plan,
      #ekis-marketplace-{{ section.id }} .ekis-form-card,
      #ekis-marketplace-{{ section.id }} .ekis-footer,
      #ekis-marketplace-{{ section.id }} .ekis-side-card{padding:16px}
      #ekis-marketplace-{{ section.id }} .ekis-search-grid,
      #ekis-marketplace-{{ section.id }} .ekis-form-grid,
      #ekis-marketplace-{{ section.id }} .ekis-feature-grid{grid-template-columns:1fr}
      #ekis-marketplace-{{ section.id }} .ekis-job{grid-template-columns:1fr}
      #ekis-marketplace-{{ section.id }} .ekis-job-actions{min-width:0}
      #ekis-marketplace-{{ section.id }} .ekis-topbar{position:static}
    }
  </style>

  <div class="ekis-container">
    <div class="ekis-topbar">
      <div class="ekis-brand">
        <div class="ekis-logo">{{ section.settings.brand_name }}</div>
        <div class="ekis-sub">{{ section.settings.topbar_text }}</div>
      </div>
      <div class="ekis-header-actions">
        <span class="ekis-chip">CV’siz başvuru</span>
        <span class="ekis-chip">Saatlik & günlük iş</span>
        <a href="#ekis-memberships-{{ section.id }}" class="ekis-btn ekis-btn-secondary">Üyelikler</a>
        <a href="#ekis-employer-{{ section.id }}" class="ekis-btn ekis-btn-primary">İş Ver</a>
      </div>
    </div>

    <div class="ekis-hero">
      <div class="ekis-card ekis-hero-main">
        <div class="ekis-eyebrow">
          <span class="ekis-badge">Bugün çalış, bugün kazan</span>
          <span class="ekis-badge dark">Tam zamanlı değil, esnek iş platformu</span>
        </div>
        <h1 class="ekis-title">{{ section.settings.hero_title }} <span>{{ section.settings.hero_highlight }}</span></h1>
        <p class="ekis-copy">{{ section.settings.hero_text }}</p>
        <div class="ekis-actions">
          <a href="#ekis-search-{{ section.id }}" class="ekis-btn ekis-btn-primary">İş Bul</a>
          <a href="#ekis-employer-{{ section.id }}" class="ekis-btn ekis-btn-secondary">İş Ver</a>
          <a href="#ekis-memberships-{{ section.id }}" class="ekis-btn ekis-btn-ghost">Üyelik Al</a>
        </div>
        <div class="ekis-inline-points">
          <span>✔ Kullanıcılar arası mesajlaşma yok</span>
          <span>✔ Hızlı başvuru akışı</span>
          <span>✔ Ödeme bağlantıları hazır</span>
        </div>
      </div>

      <div class="ekis-stat-stack">
        <div class="ekis-card ekis-stat">
          <div class="ekis-stat-top">
            <span class="ekis-stat-label">Aktif iş sayısı</span>
            <span class="ekis-chip" data-ekis-stat-jobs>0 ilan</span>
          </div>
          <div class="ekis-stat-value" data-ekis-stat-jobs-count>0</div>
          <div class="ekis-stat-note">Garsonluk, etkinlik, kurye, depo, mağaza desteği, tanıtım personeli gibi kısa süreli işler aynı ekranda.</div>
        </div>
        <div class="ekis-card ekis-stat">
          <div class="ekis-stat-top">
            <span class="ekis-stat-label">Öne çıkan paket</span>
            <span class="ekis-chip">Premium görünürlük</span>
          </div>
          <div class="ekis-stat-value">{{ section.settings.featured_plan_title }}</div>
          <div class="ekis-stat-note">İşveren paketleri için Shopify ürün linki ya da checkout bağlantısı tanımlayıp doğrudan satışa çıkabilirsin.</div>
        </div>
      </div>
    </div>

    <div id="ekis-search-{{ section.id }}" class="ekis-card ekis-search-card">
      <div class="ekis-search-head">
        <div>
          <div class="ekis-search-title">İşleri filtrele ve hemen başvur</div>
          <div class="ekis-search-note">Kullanıcı siteye girdiği anda arama, filtreleme ve başvuru aksiyonu önde olsun diye tasarlandı.</div>
        </div>
        <span class="ekis-badge dark" data-ekis-results>0 sonuç</span>
      </div>

      <div class="ekis-search-grid">
        <div class="ekis-field">
          <label class="ekis-label" for="ekis-search-input-{{ section.id }}">İş ara</label>
          <input id="ekis-search-input-{{ section.id }}" class="ekis-input" type="text" placeholder="Garson, etkinlik personeli, kurye, depo, mağaza desteği" data-ekis-search>
        </div>
        <div class="ekis-field">
          <label class="ekis-label" for="ekis-city-select-{{ section.id }}">Şehir</label>
          <select id="ekis-city-select-{{ section.id }}" class="ekis-select" data-ekis-city>
            <option value="all">Tüm şehirler</option>
          </select>
        </div>
        <div class="ekis-field">
          <label class="ekis-label" for="ekis-type-select-{{ section.id }}">İş türü</label>
          <select id="ekis-type-select-{{ section.id }}" class="ekis-select" data-ekis-type>
            <option value="all">Tüm türler</option>
          </select>
        </div>
        <div class="ekis-field">
          <label class="ekis-label">Hızlı işlem</label>
          <button type="button" class="ekis-btn ekis-btn-primary" data-ekis-clear>Filtreleri Temizle</button>
        </div>
      </div>

      <div class="ekis-filter-row">
        <div class="ekis-filter-tags">
          <span class="ekis-badge secondary">Ek iş</span>
          <span class="ekis-badge secondary">Günlük iş</span>
          <span class="ekis-badge secondary">Saatlik iş</span>
          <span class="ekis-badge secondary">Hafta sonu iş</span>
        </div>
        <label class="ekis-switch">
          <input type="checkbox" data-ekis-urgent>
          Sadece acil ilanları göster
        </label>
      </div>
    </div>

    <div class="ekis-main-grid">
      <div>
        <div class="ekis-section-head">
          <div>
            <h2 class="ekis-h2">Açık işler</h2>
            <div class="ekis-muted">Tam zamanlı değil; günlük, saatlik, vardiyalı ve ek gelir odaklı ilanlar.</div>
          </div>
          <a href="#ekis-memberships-{{ section.id }}" class="ekis-btn ekis-btn-ghost">Üyelikleri Gör</a>
        </div>
        <div class="ekis-list" data-ekis-list></div>
        <div class="ekis-card ekis-empty ekis-hidden" data-ekis-empty>Filtreye uygun ilan bulunamadı. Aramayı genişletmeyi dene.</div>
      </div>

      <div class="ekis-side">
        <div class="ekis-card ekis-side-card">
          <div class="ekis-side-title">Aday için akış</div>
          <div class="ekis-side-copy">Mesajlaşma özelliği olmadan hızlı başvuru akışı kuruldu: iş ara → ilana gir → ad/telefon bırak → başvuruyu tamamla.</div>
          <div class="ekis-mini-list">
            <div class="ekis-mini"><strong>1. İşi seç</strong><span class="ekis-muted">Filtrelerle uygun işi saniyeler içinde bul.</span></div>
            <div class="ekis-mini"><strong>2. Hızlı başvur</strong><span class="ekis-muted">CV zorunluluğu olmadan temel bilgini bırak.</span></div>
            <div class="ekis-mini"><strong>3. İşveren dönüş yapsın</strong><span class="ekis-muted">İletişim, senin belirlediğin kanal üzerinden yürüsün.</span></div>
          </div>
        </div>

        <div class="ekis-card ekis-side-card">
          <div class="ekis-side-title">İşveren için gelir modeli</div>
          <div class="ekis-package-list">
            <div class="ekis-package">
              <div>
                <strong>Standart ilan</strong>
                <div class="ekis-muted">Listeye normal sırada düşer.</div>
              </div>
              <span class="ekis-price-chip">Ücretsiz</span>
            </div>
            <div class="ekis-package">
              <div>
                <strong>Öne Çıkar</strong>
                <div class="ekis-muted">Daha görünür alan ve daha çok tıklama.</div>
              </div>
              <span class="ekis-price-chip">{{ section.settings.boost_price }}</span>
            </div>
            <div class="ekis-package">
              <div>
                <strong>Premium</strong>
                <div class="ekis-muted">Ana listede üst konum ve daha güçlü rozet.</div>
              </div>
              <span class="ekis-price-chip">{{ section.settings.premium_price }}</span>
            </div>
          </div>
          <div style="margin-top:14px;display:grid;gap:10px">
            <a href="{{ section.settings.boost_checkout_url }}" class="ekis-btn ekis-btn-secondary">Boost paketi sat</a>
            <a href="{{ section.settings.premium_checkout_url }}" class="ekis-btn ekis-btn-primary">Premium paketi sat</a>
          </div>
        </div>
      </div>
    </div>

    <div class="ekis-section">
      <div class="ekis-section-head">
        <div>
          <h2 class="ekis-h2">Neden bu yapı?</h2>
          <div class="ekis-muted">Kariyer sitesi hissi var ama kısa süreli iş modeline göre sadeleştirildi.</div>
        </div>
      </div>
      <div class="ekis-feature-grid">
        <div class="ekis-card ekis-block">
          <h3>Hızlı kullanım</h3>
          <p>Hero alanı uzun metin değil, arama ve filtreye hizmet ediyor. Kullanıcı içeri girer girmez aksiyona yönleniyor.</p>
        </div>
        <div class="ekis-card ekis-block">
          <h3>Mesajlaşma yok</h3>
          <p>Kullanıcılar arası chat kaldırıldı. Operasyon daha sade, yönetim daha kolay ve kurulum daha hızlı.</p>
        </div>
        <div class="ekis-card ekis-block">
          <h3>Ödeme hazır akış</h3>
          <p>Üyelik ve işveren paketleri Shopify ürün/checkout linklerine bağlanabiliyor. Kod içinde hazır CTA noktaları var.</p>
        </div>
        <div class="ekis-card ekis-block">
          <h3>Güven veren yasal alanlar</h3>
          <p>KVKK, gizlilik, kullanım şartları, biz kimiz ve iletişim alanları görünür şekilde footer ve içerik bloklarında yer alıyor.</p>
        </div>
      </div>
    </div>

    <div id="ekis-memberships-{{ section.id }}" class="ekis-section">
      <div class="ekis-section-head">
        <div>
          <h2 class="ekis-h2">Üyelikler ve paketler</h2>
          <div class="ekis-muted">Aday ve işveren tarafında satın alınabilir planlar için tek ekranda vitrin.</div>
        </div>
      </div>

      <div class="ekis-plan-grid">
        {% for block in section.blocks %}
          {% if block.type == 'plan' %}
            <div class="ekis-card ekis-plan{% if block.settings.highlight %} highlight{% endif %}" {{ block.shopify_attributes }}>
              <div class="ekis-plan-top">
                <div class="ekis-plan-name">{{ block.settings.name }}</div>
                {% if block.settings.highlight %}<span class="ekis-badge">Önerilen</span>{% endif %}
              </div>
              <div class="ekis-muted">{{ block.settings.audience }}</div>
              <div class="ekis-price">{{ block.settings.price }} <small>{{ block.settings.period }}</small></div>
              <ul class="ekis-plan-list">
                <li><span class="ekis-icon">✔</span><span>{{ block.settings.feature_1 }}</span></li>
                <li><span class="ekis-icon">✔</span><span>{{ block.settings.feature_2 }}</span></li>
                <li><span class="ekis-icon">✔</span><span>{{ block.settings.feature_3 }}</span></li>
                {% if block.settings.feature_4 != blank %}<li><span class="ekis-icon">✔</span><span>{{ block.settings.feature_4 }}</span></li>{% endif %}
              </ul>
              <a href="{{ block.settings.url }}" class="ekis-btn {% if block.settings.highlight %}ekis-btn-primary{% else %}ekis-btn-secondary{% endif %}">{{ block.settings.button_label }}</a>
            </div>
          {% endif %}
        {% endfor %}
      </div>
    </div>

    <div id="ekis-employer-{{ section.id }}" class="ekis-section">
      <div class="ekis-section-head">
        <div>
          <h2 class="ekis-h2">İşveren alanı</h2>
          <div class="ekis-muted">İlan toplama, paket seçme ve ödeme akışını başlatma tek yerde.</div>
        </div>
      </div>
      <div class="ekis-employer-grid">
        <div class="ekis-card ekis-form-card">
          <h3 style="margin-top:0">İlan verme formu</h3>
          <p class="ekis-muted" style="margin-top:0;margin-bottom:14px">Bu alanı gerçek operasyonda Shopify form uygulaması, Zapier, Airtable, Tally ya da özel backend ile bağlayabilirsin. Kod, ön yüz akışını hazır getirir.</p>
          <form id="ekis-employer-form-{{ section.id }}" class="ekis-form-grid">
            <div class="ekis-field">
              <label class="ekis-label">Firma adı</label>
              <input class="ekis-input" name="company" placeholder="Mavi Fincan Cafe">
            </div>
            <div class="ekis-field">
              <label class="ekis-label">Yetkili kişi</label>
              <input class="ekis-input" name="owner" placeholder="Nuri Karcı">
            </div>
            <div class="ekis-field">
              <label class="ekis-label">Telefon</label>
              <input class="ekis-input" name="phone" placeholder="05xx xxx xx xx">
            </div>
            <div class="ekis-field">
              <label class="ekis-label">E-posta</label>
              <input class="ekis-input" name="email" type="email" placeholder="firma@mail.com">
            </div>
            <div class="ekis-field">
              <label class="ekis-label">Şehir</label>
              <input class="ekis-input" name="city" placeholder="Eskişehir">
            </div>
            <div class="ekis-field">
              <label class="ekis-label">İş türü</label>
              <select class="ekis-select" name="type">
                <option>Günlük iş</option>
                <option>Saatlik iş</option>
                <option>Ek iş</option>
                <option>Hafta sonu işi</option>
                <option>Vardiyalı kısa süreli iş</option>
              </select>
            </div>
            <div class="ekis-field ekis-full">
              <label class="ekis-label">İlan başlığı</label>
              <input class="ekis-input" name="title" placeholder="Akşam vardiyası garson aranıyor">
            </div>
            <div class="ekis-field ekis-full">
              <label class="ekis-label">İş açıklaması</label>
              <textarea class="ekis-textarea" name="description" placeholder="Vardiya saati, ücret, beklenti ve lokasyon detaylarını yaz."></textarea>
            </div>
            <div class="ekis-field">
              <label class="ekis-label">Paket</label>
              <select class="ekis-select" name="package">
                <option value="standart">Standart - Ücretsiz</option>
                <option value="boost">Öne Çıkar - {{ section.settings.boost_price }}</option>
                <option value="premium">Premium - {{ section.settings.premium_price }}</option>
              </select>
            </div>
            <div class="ekis-field">
              <label class="ekis-label">Ödeme akışı</label>
              <a href="{{ section.settings.employer_form_url }}" class="ekis-btn ekis-btn-primary" style="width:100%">Başvuru / ödeme formuna git</a>
            </div>
          </form>
        </div>

        <div class="ekis-card ekis-form-card">
          <h3 style="margin-top:0">Kurulum notları</h3>
          <div class="ekis-package-list">
            <div class="ekis-package"><div><strong>1. Ürünleri oluştur</strong><div class="ekis-muted">Shopify’da üyelik ve işveren paketlerini ürün olarak aç.</div></div></div>
            <div class="ekis-package"><div><strong>2. Linkleri bağla</strong><div class="ekis-muted">Bu section ayarlarında ürün veya checkout URL’lerini ilgili CTA’lara gir.</div></div></div>
            <div class="ekis-package"><div><strong>3. Başvuru toplama</strong><div class="ekis-muted">İşveren formunu Tally / Google Form / özel backend’e bağlayarak operasyonu canlıya al.</div></div></div>
            <div class="ekis-package"><div><strong>4. Yasal metinleri tamamla</strong><div class="ekis-muted">KVKK, gizlilik ve kullanım şartlarını kendi şirket bilgilerinle güncelle.</div></div></div>
          </div>
          <div style="margin-top:14px;display:grid;gap:10px">
            <a href="{{ section.settings.membership_product_url }}" class="ekis-btn ekis-btn-secondary">Aday üyeliği satış linki</a>
            <a href="{{ section.settings.boost_checkout_url }}" class="ekis-btn ekis-btn-secondary">Boost ödeme linki</a>
            <a href="{{ section.settings.premium_checkout_url }}" class="ekis-btn ekis-btn-primary">Premium ödeme linki</a>
          </div>
        </div>
      </div>
    </div>

    <div class="ekis-section">
      <div class="ekis-section-head">
        <div>
          <h2 class="ekis-h2">Biz kimiz, güven ve yasal alanlar</h2>
          <div class="ekis-muted">Bu blokları görünür tuttum; footer içinde kaybolmasın diye içerikte de yer verdim.</div>
        </div>
      </div>
      <div class="ekis-legal-grid">
        <div class="ekis-card ekis-legal-card">
          <h3>Biz Kimiz</h3>
          <p>{{ section.settings.about_text }}</p>
          <p style="margin-top:12px"><a href="{{ section.settings.about_url }}">Detaylı sayfaya git</a></p>
        </div>
        <div class="ekis-card ekis-legal-card">
          <h3>KVKK & Gizlilik</h3>
          <p>Kullanıcı verilerinin hangi amaçla toplandığını, nasıl saklandığını ve hangi kanallarda kullanıldığını net anlatan alanlar hazır.</p>
          <p style="margin-top:12px"><a href="{{ section.settings.kvkk_url }}">KVKK</a> • <a href="{{ section.settings.privacy_url }}">Gizlilik Politikası</a></p>
        </div>
        <div class="ekis-card ekis-legal-card">
          <h3>Kullanım Şartları</h3>
          <p>İlan yayınlama kuralları, ödeme politikası, iptal süreçleri ve platform kullanım şartları için görünür bir bağlantı alanı tanımlandı.</p>
          <p style="margin-top:12px"><a href="{{ section.settings.terms_url }}">Kullanım Şartları</a></p>
        </div>
      </div>
    </div>

    <div class="ekis-section">
      <div class="ekis-section-head">
        <div>
          <h2 class="ekis-h2">Sık sorulanlar</h2>
          <div class="ekis-muted">Kullanıcı ve işveren tarafındaki temel sorular için hazır alan.</div>
        </div>
      </div>
      <div class="ekis-faq-grid">
        <div class="ekis-card ekis-accordion">
          {% assign faq_left = 0 %}
          {% for block in section.blocks %}
            {% if block.type == 'faq' and faq_left < 3 %}
              <details {{ block.shopify_attributes }}>
                <summary>{{ block.settings.question }}</summary>
                <p>{{ block.settings.answer }}</p>
              </details>
              {% assign faq_left = faq_left | plus: 1 %}
            {% endif %}
          {% endfor %}
        </div>
        <div class="ekis-card ekis-accordion">
          {% assign faq_right = 0 %}
          {% for block in section.blocks offset:3 %}
            {% if block.type == 'faq' and faq_right < 3 %}
              <details {{ block.shopify_attributes }}>
                <summary>{{ block.settings.question }}</summary>
                <p>{{ block.settings.answer }}</p>
              </details>
              {% assign faq_right = faq_right | plus: 1 %}
            {% endif %}
          {% endfor %}
        </div>
      </div>
    </div>

    <div class="ekis-card ekis-footer">
      <div class="ekis-footer-grid">
        <div>
          <div class="ekis-footer-title">{{ section.settings.brand_name }}</div>
          <p>{{ section.settings.footer_text }}</p>
        </div>
        <div>
          <div class="ekis-footer-title">Platform</div>
          <div class="ekis-footer-links">
            <a href="#ekis-search-{{ section.id }}">İş Bul</a>
            <a href="#ekis-memberships-{{ section.id }}">Üyelikler</a>
            <a href="#ekis-employer-{{ section.id }}">İş Ver</a>
          </div>
        </div>
        <div>
          <div class="ekis-footer-title">Kurumsal</div>
          <div class="ekis-footer-links">
            <a href="{{ section.settings.about_url }}">Biz Kimiz</a>
            <a href="{{ section.settings.contact_url }}">İletişim</a>
            <a href="{{ section.settings.faq_page_url }}">SSS</a>
          </div>
        </div>
        <div>
          <div class="ekis-footer-title">Yasal</div>
          <div class="ekis-footer-links">
            <a href="{{ section.settings.kvkk_url }}">KVKK</a>
            <a href="{{ section.settings.privacy_url }}">Gizlilik Politikası</a>
            <a href="{{ section.settings.terms_url }}">Kullanım Şartları</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="ekis-modal" data-ekis-modal>
    <div class="ekis-modal-panel">
      <div class="ekis-modal-head">
        <div>
          <h3 class="ekis-modal-title">Hızlı başvuru</h3>
          <div class="ekis-muted">Mesajlaşma yerine kısa başvuru bırak, işveren sana dönüş yapsın.</div>
        </div>
        <button class="ekis-close" type="button" data-ekis-close>×</button>
      </div>
      <div class="ekis-preview" data-ekis-preview>
        <strong>İlan seçilmedi</strong>
        <span class="ekis-muted">Önce bir ilana tıkla.</span>
      </div>
      <form data-ekis-apply-form>
        <div class="ekis-form-grid">
          <div class="ekis-field">
            <label class="ekis-label">Ad soyad</label>
            <input class="ekis-input" name="name" required placeholder="Ad Soyad">
          </div>
          <div class="ekis-field">
            <label class="ekis-label">Telefon</label>
            <input class="ekis-input" name="phone" required placeholder="05xx xxx xx xx">
          </div>
          <div class="ekis-field ekis-full">
            <label class="ekis-label">Kısa not</label>
            <textarea class="ekis-textarea" name="note" placeholder="Deneyimini, müsaitliğini veya vardiya durumunu yaz."></textarea>
          </div>
          <div class="ekis-field ekis-full">
            <button type="submit" class="ekis-btn ekis-btn-primary" style="width:100%">Başvuruyu Tamamla</button>
          </div>
        </div>
      </form>
      <div class="ekis-success" data-ekis-success>Başvurun alındı. Gerçek operasyonda bunu form entegrasyonuna veya CRM’e bağlaman gerekir.</div>
    </div>
  </div>

  <script type="application/json" data-ekis-jobs>
    [
      {% assign first_job = true %}
      {% for block in section.blocks %}
        {% if block.type == 'job' %}
          {% unless first_job %},{% endunless %}
          {
            "title": {{ block.settings.title | json }},
            "company": {{ block.settings.company | json }},
            "city": {{ block.settings.city | json }},
            "district": {{ block.settings.district | json }},
            "type": {{ block.settings.type | json }},
            "pay": {{ block.settings.pay | json }},
            "hours": {{ block.settings.hours | json }},
            "duration": {{ block.settings.duration | json }},
            "description": {{ block.settings.description | json }},
            "tags": {{ block.settings.tags | json }},
            "featured": {{ block.settings.featured | json }},
            "urgent": {{ block.settings.urgent | json }},
            "apply_url": {{ block.settings.apply_url | json }}
          }
          {% assign first_job = false %}
        {% endif %}
      {% endfor %}
    ]
  </script>

  <script>
    (() => {
      const root = document.getElementById('ekis-marketplace-{{ section.id }}');
      if (!root) return;

      const jobsDataNode = root.querySelector('[data-ekis-jobs]');
      let jobs = [];
      try { jobs = JSON.parse(jobsDataNode.textContent || '[]'); } catch(e) { jobs = []; }

      const list = root.querySelector('[data-ekis-list]');
      const empty = root.querySelector('[data-ekis-empty]');
      const resultsBadge = root.querySelector('[data-ekis-results]');
      const statJobs = root.querySelector('[data-ekis-stat-jobs]');
      const statJobsCount = root.querySelector('[data-ekis-stat-jobs-count]');
      const searchInput = root.querySelector('[data-ekis-search]');
      const citySelect = root.querySelector('[data-ekis-city]');
      const typeSelect = root.querySelector('[data-ekis-type]');
      const urgentToggle = root.querySelector('[data-ekis-urgent]');
      const clearBtn = root.querySelector('[data-ekis-clear]');
      const modal = root.querySelector('[data-ekis-modal]');
      const preview = root.querySelector('[data-ekis-preview]');
      const closeModal = root.querySelector('[data-ekis-close]');
      const applyForm = root.querySelector('[data-ekis-apply-form]');
      const success = root.querySelector('[data-ekis-success]');
      let selectedJob = null;

      const normalize = (value) => (value || '').toString().toLowerCase().trim();
      const tagsToArray = (value) => (value || '').split(',').map(item => item.trim()).filter(Boolean);
      const icon = {
        pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="ekis-icon"><path d="M12 21s-6-5.3-6-11a6 6 0 1 1 12 0c0 5.7-6 11-6 11Z"></path><circle cx="12" cy="10" r="2.4"></circle></svg>',
        clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="ekis-icon"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path></svg>',
        wallet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="ekis-icon"><path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5.5A2.5 2.5 0 0 1 3 16.5v-9Z"></path><path d="M16 12h5"></path><path d="M7 5V3.8a1.8 1.8 0 0 1 2.3-1.7L16 4"></path></svg>',
        spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="ekis-icon"><path d="m12 3 1.8 4.7L18.5 9l-4.7 1.8L12 15.5l-1.8-4.7L5.5 9l4.7-1.3L12 3Z"></path></svg>'
      };

      const uniqueValues = (key) => [...new Set(jobs.map(job => job[key]).filter(Boolean))].sort((a,b) => a.localeCompare(b, 'tr'));

      function hydrateFilters(){
        uniqueValues('city').forEach(city => {
          const option = document.createElement('option');
          option.value = city; option.textContent = city; citySelect.appendChild(option);
        });
        uniqueValues('type').forEach(type => {
          const option = document.createElement('option');
          option.value = type; option.textContent = type; typeSelect.appendChild(option);
        });
      }

      function cardTemplate(job){
        const tags = tagsToArray(job.tags);
        const badgeTags = [
          `<span class="ekis-badge secondary">${job.type || 'İş'}</span>`,
          job.featured ? `<span class="ekis-badge premium">${icon.spark} Öne Çıkan</span>` : '',
          job.urgent ? `<span class="ekis-badge urgent">Acil</span>` : ''
        ].join('');

        const chips = tags.map(tag => `<span class="ekis-badge dark">${tag}</span>`).join('');

        return `
          <article class="ekis-card ekis-job ${job.featured ? 'is-featured' : ''}">
            <div>
              <div class="ekis-job-top">
                <div class="ekis-job-title">${job.title || ''}</div>
                ${badgeTags}
              </div>
              <div class="ekis-company">${job.company || ''}</div>
              <div class="ekis-meta">
                <span>${icon.pin}${job.city || ''}${job.district ? ' / ' + job.district : ''}</span>
                <span>${icon.clock}${job.hours || ''}</span>
                <span class="ekis-pay">${icon.wallet}${job.pay || ''}</span>
                <span>${icon.spark}${job.duration || ''}</span>
              </div>
              <p class="ekis-desc">${job.description || ''}</p>
              <div class="ekis-tags">${chips}</div>
            </div>
            <div class="ekis-job-actions">
              <button type="button" class="ekis-btn ekis-btn-primary" data-ekis-apply='${JSON.stringify(job).replace(/'/g, '&apos;')}'>Hızlı Başvur</button>
              ${job.apply_url ? `<a href="${job.apply_url}" class="ekis-btn ekis-btn-secondary">Harici Form</a>` : `<button type="button" class="ekis-btn ekis-btn-secondary" data-ekis-apply='${JSON.stringify(job).replace(/'/g, '&apos;')}'>Detayı Gör</button>`}
            </div>
          </article>`;
      }

      function filteredJobs(){
        const q = normalize(searchInput.value);
        const city = citySelect.value;
        const type = typeSelect.value;
        const urgentOnly = urgentToggle.checked;

        return jobs.filter(job => {
          const searchMatch = !q || normalize([job.title, job.company, job.city, job.district, job.description, job.tags].join(' ')).includes(q);
          const cityMatch = city === 'all' || job.city === city;
          const typeMatch = type === 'all' || job.type === type;
          const urgentMatch = !urgentOnly || job.urgent;
          return searchMatch && cityMatch && typeMatch && urgentMatch;
        });
      }

      function render(){
        const data = filteredJobs();
        list.innerHTML = data.map(cardTemplate).join('');
        empty.classList.toggle('ekis-hidden', data.length !== 0);
        resultsBadge.textContent = `${data.length} sonuç`;
        if (statJobs) statJobs.textContent = `${jobs.length} ilan`;
        if (statJobsCount) statJobsCount.textContent = jobs.length;
        bindApplyButtons();
      }

      function openModal(job){
        selectedJob = job;
        preview.innerHTML = `<strong>${job.title || ''}</strong><span class="ekis-muted">${job.company || ''} • ${job.city || ''}${job.district ? ' / ' + job.district : ''} • ${job.pay || ''}</span>`;
        success.style.display = 'none';
        applyForm.reset();
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      }

      function closeModalFn(){
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
      }

      function bindApplyButtons(){
        root.querySelectorAll('[data-ekis-apply]').forEach(button => {
          button.addEventListener('click', () => {
            try {
              const job = JSON.parse(button.getAttribute('data-ekis-apply').replace(/&apos;/g, "'"));
              openModal(job);
            } catch(e){}
          });
        });
      }

      hydrateFilters();
      render();

      [searchInput, citySelect, typeSelect, urgentToggle].forEach(el => el.addEventListener('input', render));
      citySelect.addEventListener('change', render);
      typeSelect.addEventListener('change', render);
      urgentToggle.addEventListener('change', render);
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        citySelect.value = 'all';
        typeSelect.value = 'all';
        urgentToggle.checked = false;
        render();
      });
      closeModal.addEventListener('click', closeModalFn);
      modal.addEventListener('click', (e) => { if (e.target === modal) closeModalFn(); });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModalFn(); });
      applyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(applyForm);
        const submission = {
          job: selectedJob,
          name: formData.get('name'),
          phone: formData.get('phone'),
          note: formData.get('note'),
          createdAt: new Date().toISOString()
        };
        const key = 'ekisApplications';
        const oldData = JSON.parse(localStorage.getItem(key) || '[]');
        oldData.unshift(submission);
        localStorage.setItem(key, JSON.stringify(oldData));
        success.style.display = 'block';
      });
    })();
  </script>
</section>

{% schema %}
{
  "name": "EKIS Jobs Marketplace",
  "settings": [
    { "type": "text", "id": "brand_name", "label": "Marka adı", "default": "ekis" },
    { "type": "text", "id": "topbar_text", "label": "Üst bar açıklaması", "default": "Günlük, saatlik ve ek iş odaklı kariyer sitesi yapısı." },
    { "type": "text", "id": "hero_title", "label": "Hero başlık", "default": "İşe hemen bak," },
    { "type": "text", "id": "hero_highlight", "label": "Vurgulu başlık", "default": "boş vaktini kazanca çevir" },
    { "type": "textarea", "id": "hero_text", "label": "Hero metni", "default": "Kullanıcı girer girmez işleri görebilsin, filtreleyebilsin, üyelik alabilsin ve işveren tarafı paket seçip ödeme akışına geçebilsin diye tasarlanmış tek sayfalık yapı." },
    { "type": "text", "id": "featured_plan_title", "label": "Öne çıkan plan başlığı", "default": "Premium" },
    { "type": "text", "id": "boost_price", "label": "Boost fiyatı", "default": "99 TL" },
    { "type": "text", "id": "premium_price", "label": "Premium fiyatı", "default": "399 TL" },
    { "type": "url", "id": "membership_product_url", "label": "Aday üyelik ürün linki" },
    { "type": "url", "id": "boost_checkout_url", "label": "Boost checkout linki" },
    { "type": "url", "id": "premium_checkout_url", "label": "Premium checkout linki" },
    { "type": "url", "id": "employer_form_url", "label": "İşveren form / ödeme linki" },
    { "type": "textarea", "id": "about_text", "label": "Biz kimiz metni", "default": "EKIS, tam zamanlı kariyer sitesi modeli yerine esnek çalışanlarla kısa süreli personel arayan işletmeleri buluşturmak için kurgulanmış bir platform fikridir." },
    { "type": "url", "id": "about_url", "label": "Biz kimiz linki" },
    { "type": "url", "id": "contact_url", "label": "İletişim linki" },
    { "type": "url", "id": "faq_page_url", "label": "SSS sayfası linki" },
    { "type": "url", "id": "kvkk_url", "label": "KVKK linki" },
    { "type": "url", "id": "privacy_url", "label": "Gizlilik politikası linki" },
    { "type": "url", "id": "terms_url", "label": "Kullanım şartları linki" },
    { "type": "textarea", "id": "footer_text", "label": "Footer açıklaması", "default": "Kısa süreli iş arayanlarla hızlı personel bulmak isteyen işletmeleri aynı yerde toplayan sade ve aksiyon odaklı platform." },
    { "type": "color", "id": "accent_color", "label": "Ana renk", "default": "#22c55e" },
    { "type": "color", "id": "accent_deep", "label": "Koyu ana renk", "default": "#15803d" },
    { "type": "color", "id": "accent_soft", "label": "Yumuşak vurgu rengi", "default": "#dcfce7" }
  ],
  "blocks": [
    {
      "type": "job",
      "name": "İş ilanı",
      "settings": [
        { "type": "text", "id": "title", "label": "Başlık", "default": "Garson lazım" },
        { "type": "text", "id": "company", "label": "Firma", "default": "Mavi Fincan Cafe" },
        { "type": "text", "id": "city", "label": "Şehir", "default": "Eskişehir" },
        { "type": "text", "id": "district", "label": "İlçe", "default": "Tepebaşı" },
        { "type": "text", "id": "type", "label": "İş türü", "default": "Günlük iş" },
        { "type": "text", "id": "pay", "label": "Ücret", "default": "900 TL / gün" },
        { "type": "text", "id": "hours", "label": "Saat", "default": "17:00 - 23:00" },
        { "type": "text", "id": "duration", "label": "Süre", "default": "6 saat" },
        { "type": "textarea", "id": "description", "label": "Açıklama", "default": "Akşam yoğunluğunda servis desteği verecek, hızlı adapte olabilen ekip arkadaşı aranıyor." },
        { "type": "text", "id": "tags", "label": "Etiketler (virgülle ayır)", "default": "ACİL, Bugün başla" },
        { "type": "checkbox", "id": "featured", "label": "Öne çıkar", "default": true },
        { "type": "checkbox", "id": "urgent", "label": "Acil", "default": true },
        { "type": "url", "id": "apply_url", "label": "Harici başvuru linki" }
      ]
    },
    {
      "type": "plan",
      "name": "Plan kartı",
      "settings": [
        { "type": "text", "id": "name", "label": "Plan adı", "default": "Aday Plus" },
        { "type": "text", "id": "audience", "label": "Hedef kitle", "default": "Aday üyeliği" },
        { "type": "text", "id": "price", "label": "Fiyat", "default": "149 TL" },
        { "type": "text", "id": "period", "label": "Dönem", "default": "/ ay" },
        { "type": "text", "id": "feature_1", "label": "Özellik 1", "default": "Erken erişimli iş ilanları" },
        { "type": "text", "id": "feature_2", "label": "Özellik 2", "default": "Öne çıkan aday profili" },
        { "type": "text", "id": "feature_3", "label": "Özellik 3", "default": "Daha hızlı başvuru akışı" },
        { "type": "text", "id": "feature_4", "label": "Özellik 4", "default": "Haftalık fırsat bildirimi" },
        { "type": "text", "id": "button_label", "label": "Buton yazısı", "default": "Üyelik Al" },
        { "type": "url", "id": "url", "label": "Satın alma linki" },
        { "type": "checkbox", "id": "highlight", "label": "Öne çıkar", "default": false }
      ]
    },
    {
      "type": "faq",
      "name": "SSS maddesi",
      "settings": [
        { "type": "text", "id": "question", "label": "Soru", "default": "CV olmadan başvuru yapabilir miyim?" },
        { "type": "textarea", "id": "answer", "label": "Cevap", "default": "Evet. Bu yapı kısa süreli iş odaklı olduğu için hızlı başvuru akışı ad, telefon ve kısa notla ilerler." }
      ]
    }
  ],
  "presets": [
    {
      "name": "EKIS Jobs Marketplace",
      "blocks": [
        { "type": "job" },
        { "type": "job", "settings": { "title": "Etkinlik personeli", "company": "Delta Organizasyon", "city": "İstanbul", "district": "Şişli", "type": "Saatlik iş", "pay": "250 TL / saat", "hours": "14:00 - 20:00", "duration": "6 saat", "description": "Karşılama ve yönlendirme yapacak, iletişimi güçlü ekip arkadaşları aranıyor.", "tags": "Hafta sonu, Hızlı başlangıç", "featured": false, "urgent": false } },
        { "type": "job", "settings": { "title": "Depo paketleme desteği", "company": "HızlıSepet", "city": "Ankara", "district": "Yenimahalle", "type": "Günlük iş", "pay": "1400 TL / gün", "hours": "09:00 - 18:00", "duration": "1 gün", "description": "Sipariş yoğunluğu için ürün ayırma ve paketleme desteği verilecek.", "tags": "Ertesi gün ödeme, Yoğun dönem", "featured": true, "urgent": false } },
        { "type": "plan", "settings": { "name": "Aday Basic", "audience": "Aday üyeliği", "price": "79 TL", "period": "/ ay", "feature_1": "Standart başvuru erişimi", "feature_2": "Kayıtlı profil bilgisi", "feature_3": "Favori işler listesi", "feature_4": "E-posta güncellemeleri", "button_label": "Basic Al", "highlight": false } },
        { "type": "plan", "settings": { "name": "Aday Plus", "audience": "Aday üyeliği", "price": "149 TL", "period": "/ ay", "feature_1": "Erken erişimli iş ilanları", "feature_2": "Öne çıkan aday profili", "feature_3": "Daha hızlı başvuru akışı", "feature_4": "Haftalık fırsat bildirimi", "button_label": "Plus Al", "highlight": true } },
        { "type": "plan", "settings": { "name": "İşveren Premium", "audience": "İşveren paketi", "price": "399 TL", "period": "/ ilan", "feature_1": "Üst sıralı listeleme", "feature_2": "Öne çıkan rozet", "feature_3": "Daha görünür CTA", "feature_4": "Premium görünüm", "button_label": "Premium Satın Al", "highlight": false } },
        { "type": "faq" },
        { "type": "faq", "settings": { "question": "İşveren ilanı nasıl öne çıkarır?", "answer": "Boost veya Premium paketi satın alarak ilanı listede daha görünür hale getirebilir." } },
        { "type": "faq", "settings": { "question": "Kullanıcılar birbiriyle mesajlaşabiliyor mu?", "answer": "Hayır. Bu versiyonda kullanıcılar arası mesajlaşma özellikle kaldırıldı." } },
        { "type": "faq", "settings": { "question": "Ödemeyi nasıl alırım?", "answer": "Shopify ürünleri ve checkout linkleri üzerinden üyelik ve paket satışlarını doğrudan tahsil edebilirsin." } },
        { "type": "faq", "settings": { "question": "KVKK ve gizlilik alanları var mı?", "answer": "Evet. Footer ve içerik içinde görünür alanlar tanımlandı; kendi şirket bilgilerinle güncelleyebilirsin." } }
      ]
    }
  ]
}
{% endschema %}

