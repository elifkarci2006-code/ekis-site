export function getStyles(PALETTE) {
  return `
    * {
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      margin: 0;
      font-family:
        Inter,
        ui-sans-serif,
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;
      background: ${PALETTE.bg};
      color: ${PALETTE.text};
    }

    a {
      color: inherit;
    }

    button,
    input,
    select,
    textarea {
      font-family: inherit;
    }

    img {
      max-width: 100%;
      display: block;
    }

    .container {
      width: min(1180px, calc(100vw - 40px));
      margin: 0 auto;
    }

    .topbar {
      position: sticky;
      top: 0;
      z-index: 60;
      padding: 10px 0 4px;
      background:
        linear-gradient(
          180deg,
          rgba(245,247,248,0.96) 0%,
          rgba(245,247,248,0.82) 72%,
          rgba(245,247,248,0) 100%
        );
      backdrop-filter: blur(14px);
    }

    .topbar-inner {
      min-height: 72px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      transition: min-height 0.22s ease;
    }

    .topbar.small .topbar-inner {
      min-height: 60px;
    }

    .brand-wrap {
      display: flex;
      align-items: center;
      min-width: 0;
    }

    .brand-logo-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      padding: 0;
      margin: 0;
    }

    .brand-logo {
      height: 108px;
      width: auto;
      display: block;
      object-fit: contain;
      transition:
        height 0.22s ease,
        opacity 0.18s ease;
    }

    .topbar.small .brand-logo {
      height: 102px;
    }

    .top-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    .btn {
      border: none;
      outline: none;
      border-radius: 15px;
      padding: 13px 18px;
      font-size: 15px;
      font-weight: 800;
      cursor: pointer;
      transition:
        transform 0.18s ease,
        box-shadow 0.18s ease,
        border-color 0.18s ease,
        background 0.18s ease;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
    }

    .btn:hover {
      transform: translateY(-1px);
    }

    .btn-primary {
      color: #fff;
      background: ${PALETTE.coral};
      box-shadow: 0 12px 24px rgba(246,90,69,0.28);
    }

    .btn-secondary {
      color: ${PALETTE.slate};
      background: #fff;
      border: 1px solid rgba(60,74,95,0.12);
      box-shadow: 0 8px 18px rgba(60,74,95,0.05);
    }

    /* CSS devam ediyor... */

.top-search {
  padding: 2px 0 10px;
}

.filter-wrap {
  background: ${PALETTE.teal};
  border: 1px solid rgba(60,74,95,0.08);
  border-radius: 24px;
  padding: 16px;
  box-shadow: 0 14px 30px rgba(60,74,95,0.05);
}

.filter-grid {
  display: grid;
  grid-template-columns:
    1.45fr
    1fr
    1fr
    1fr
    0.9fr
    0.9fr;
  gap: 12px;
  align-items: end;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field label {
  font-size: 13px;
  font-weight: 800;
  color: #fff;
  padding-left: 2px;
}

.field input,
.field select {
  height: 56px;
  width: 100%;
  border-radius: 18px;
  border: 1px solid rgba(60,74,95,0.12);
  background: #fff;
  padding: 0 16px;
  font-size: 15px;
  color: ${PALETTE.text};
  outline: none;
}

.search-action {
  display: flex;
  align-items: end;
}

.search-btn {
  width: 100%;
  height: 56px;
  border-radius: 18px;
  font-size: 15px;
  font-weight: 900;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    background 0.18s ease;
}

.search-btn:hover {
  transform: translateY(-1px);
}

.search-btn-primary {
  border: 1px solid rgba(255,255,255,0.35);
  background: ${PALETTE.coral};
  color: #fff;
  box-shadow: 0 14px 28px rgba(246,90,69,0.24);
}

.search-btn-clear {
  border: 1px solid rgba(255,255,255,0.62);
  background: rgba(255,255,255,0.08);
  color: #fff;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.18);
}

.hero {
  padding: 4px 0 6px;
}

.hero-card {
  background: ${PALETTE.white};
  border: 1px solid rgba(60,74,95,0.08);
  border-radius: 24px;
  box-shadow: 0 12px 24px rgba(60,74,95,0.06);
  padding: 14px 18px;
  margin-bottom: 10px;
}

.hero-title {
  margin: 0;
  font-size: clamp(20px, 2.5vw, 30px);
  line-height: 1.08;
  letter-spacing: -0.04em;
  font-weight: 900;
  color: ${PALETTE.slate};
  max-width: 760px;
}

.hero-stats-inline {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.hero-stat-bubble {
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(60,74,95,0.06);
  border: 1px solid rgba(60,74,95,0.08);
  font-size: 12px;
  font-weight: 800;
  color: ${PALETTE.slate};
}

.section {
  padding: 0 0 16px;
}

.section-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.section-title {
  margin: 0;
  color: ${PALETTE.slate};
  font-size: clamp(22px, 3vw, 34px);
  line-height: 1;
  letter-spacing: -0.05em;
  font-weight: 950;
}

.featured-section {
  background: ${PALETTE.coral};
  border-radius: 28px;
  padding: 30px 22px 26px;
  margin-bottom: 28px;
  box-shadow: 0 22px 44px rgba(246,90,69,0.20);
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.featured-card,
.job-card {
  position: relative;
  background: #fff;
  border: 1px solid rgba(60,74,95,0.08);
  border-radius: 26px;
  padding: 22px;
  box-shadow: 0 14px 28px rgba(60,74,95,0.05);
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    border-color 0.18s ease;
}

.featured-card:hover,
.job-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 36px rgba(60,74,95,0.10);
}

.jobs-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.post-modal-backdrop,
.detail-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(35,48,68,0.38);
  backdrop-filter: blur(14px);
  z-index: 90;
  display: grid;
  place-items: center;
  padding: 18px;
}

.post-modal,
.detail-modal {
  width: min(980px, calc(100vw - 24px));
  max-height: min(88vh, 900px);
  border-radius: 34px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.82);
  background:
    linear-gradient(
      135deg,
      rgba(255,255,255,0.78),
      rgba(245,247,248,0.62)
    ),
    radial-gradient(
      circle at 0% 0%,
      rgba(88,173,173,0.12),
      transparent 32%
    ),
    radial-gradient(
      circle at 100% 0%,
      rgba(246,90,69,0.10),
      transparent 30%
    );
  box-shadow:
    0 42px 100px rgba(35,48,68,0.28),
    inset 0 1px 0 rgba(255,255,255,0.78);
  backdrop-filter: blur(28px);
}

.detail-modern-grid {
  display: grid;
  grid-template-columns:
    minmax(0, 1fr)
    348px;
  min-height: 660px;
}

.detail-modern-main {
  padding: 42px 40px 32px;
}

.detail-modern-side {
  padding: 42px 26px 32px;
  border-left: 1px solid rgba(255,255,255,0.72);
}

.detail-modern-title {
  max-width: 620px;
  color: #102142;
  font-size: clamp(44px, 5vw, 64px);
  line-height: 0.98;
  letter-spacing: -0.075em;
  font-weight: 950;
}

.detail-modern-summary {
  max-width: 620px;
  color: ${PALETTE.softText};
  font-size: 18px;
  line-height: 1.65;
  margin-bottom: 28px;
  font-weight: 700;
}

.detail-modern-meta {
  display: grid;
  grid-template-columns:
    repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 28px;
  max-width: 620px;
}

.detail-modern-meta div {
  min-height: 92px;
  padding: 20px 22px;
  border-radius: 26px;
  background: rgba(255,255,255,0.54);
  border: 1px solid rgba(255,255,255,0.84);
}

.detail-modern-desc-card {
  max-width: 620px;
  min-height: 250px;
  padding: 30px;
  border-radius: 30px;
  background:
    linear-gradient(
      180deg,
      rgba(255,255,255,0.58),
      rgba(255,255,255,0.42)
    );
  border: 1px solid rgba(255,255,255,0.88);
}

.detail-modern-salary-card {
  margin-bottom: 18px;
  padding: 26px 24px;
  border-radius: 28px;
  background:
    linear-gradient(
      135deg,
      rgba(246,90,69,0.94),
      rgba(246,90,69,0.78)
    );
}

.detail-modern-contact-card {
  padding: 24px;
  border-radius: 30px;
  background: rgba(255,255,255,0.62);
  border: 1px solid rgba(255,255,255,0.88);
}

.modern-whatsapp-btn {
  min-height: 58px;
  border-radius: 17px;
  background: ${PALETTE.coral};
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-decoration: none;
  font-size: 17px;
  font-weight: 950;
}

.admin-compact-layout {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: 18px;
  align-items: start;
}

.admin-side,
.admin-main-panel {
  background: rgba(255,255,255,0.94);
  border: 1px solid rgba(60,74,95,0.08);
  border-radius: 26px;
  box-shadow: 0 18px 42px rgba(60,74,95,0.08);
}

.admin-main-panel {
  padding: 20px;
  min-width: 0;
}

.admin-tools {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 160px;
  gap: 10px;
  margin-bottom: 14px;
}

.admin-table {
  display: grid;
  gap: 10px;
}

.admin-table-row {
  display: grid;
  grid-template-columns: minmax(220px, 1.45fr) minmax(130px, 0.8fr) minmax(95px, 0.6fr) minmax(120px, 0.65fr) minmax(260px, 1fr);
  gap: 12px;
  align-items: center;
  padding: 15px 16px;
  border: 1px solid rgba(60,74,95,0.08);
  border-radius: 18px;
  background: #fff;
}

@media (max-width: 900px) {
  .detail-modern-grid {
    grid-template-columns: 1fr;
  }

  .detail-modern-side {
    border-left: none;
    border-top: 1px solid rgba(255,255,255,0.72);
  }

  .featured-grid,
  .jobs-grid {
    grid-template-columns: 1fr;
  }

  .filter-grid {
    grid-template-columns: 1fr;
  }

  .admin-compact-layout {
    grid-template-columns: 1fr;
  }
}
 /* ADMIN PANEL FIX */

    .admin-page {
      position: fixed;
      inset: 0;
      z-index: 120;
      background:
        radial-gradient(circle at top left, rgba(246,90,69,0.08), transparent 28%),
        radial-gradient(circle at top right, rgba(88,173,173,0.12), transparent 24%),
        #F5F7F8;
      overflow-y: auto;
      padding: 24px;
    }

    .admin-shell {
      max-width: 1280px;
      margin: 0 auto;
    }

    .admin-logo {
      height: 74px !important;
      width: auto !important;
      max-width: 130px !important;
      object-fit: contain !important;
      margin-bottom: 12px;
    }

    .admin-top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 18px;
    }

    .admin-title-block h1 {
      margin: 0;
      color: #3C4A5F;
      font-size: clamp(28px, 3vw, 44px);
      line-height: 1;
      font-weight: 950;
      letter-spacing: -0.055em;
    }

    .admin-title-block p {
      margin: 8px 0 0;
      color: #5D6B7F;
      font-size: 14px;
      font-weight: 800;
    }

    .admin-stats {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 14px;
      margin-bottom: 18px;
    }

    .admin-stat {
      background: #fff;
      border: 1px solid rgba(60,74,95,0.08);
      border-radius: 22px;
      padding: 18px;
      box-shadow: 0 14px 30px rgba(60,74,95,0.06);
    }

    .admin-stat span {
      display: block;
      color: #5D6B7F;
      font-size: 12px;
      font-weight: 900;
      margin-bottom: 8px;
    }

    .admin-stat strong {
      color: #3C4A5F;
      font-size: 28px;
      line-height: 1;
      font-weight: 950;
    }

    .admin-side {
      padding: 18px;
    }

    .admin-side-title {
      margin: 0 0 14px;
      color: #3C4A5F;
      font-size: 20px;
      font-weight: 950;
    }

    .admin-side-list {
      display: grid;
      gap: 10px;
    }

    .admin-side-item {
      width: 100%;
      border: 1px solid rgba(60,74,95,0.10);
      background: #fff;
      color: #3C4A5F;
      border-radius: 16px;
      padding: 13px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      font-size: 14px;
      font-weight: 900;
      cursor: pointer;
    }

    .admin-main-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      margin-bottom: 14px;
    }

    .admin-main-head h2 {
      margin: 0;
      color: #3C4A5F;
      font-size: 24px;
      font-weight: 950;
    }
/* ADMIN PANEL PREMIUM FIX */

.admin-main-panel {
  padding: 24px;
  border-radius: 30px;
  overflow: hidden;
}

.admin-tools {
  grid-template-columns: minmax(0, 1fr) 160px;
  gap: 12px;
}

.admin-tools input,
.admin-tools select {
  height: 52px;
  border-radius: 18px;
  border: 1px solid rgba(60,74,95,0.14);
  background: #fff;
  padding: 0 16px;
  color: #3C4A5F;
  font-size: 15px;
  font-weight: 800;
  outline: none;
}

.admin-table {
  gap: 14px;
}

.admin-table-row {
  grid-template-columns:
    minmax(220px, 1.35fr)
    minmax(130px, 0.8fr)
    minmax(90px, 0.55fr)
    minmax(105px, 0.6fr)
    minmax(230px, 0.9fr);
  gap: 14px;
  padding: 20px;
  border-radius: 24px;
  background: #fff;
  border: 1px solid rgba(60,74,95,0.08);
  box-shadow: 0 12px 26px rgba(60,74,95,0.06);
  align-items: center;
}

.admin-table-row > div:last-child {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.admin-table-row button {
  border: none;
  min-height: 38px;
  border-radius: 999px;
  padding: 9px 13px;
  margin: 0;
  font-size: 12px;
  font-weight: 950;
  cursor: pointer;
  white-space: nowrap;
}

.admin-table-row button:nth-child(1) {
  background: #EAF2FF;
  color: #2563EB;
}

.admin-table-row button:nth-child(2) {
  background: #F1F5F9;
  color: #475569;
}

.admin-table-row button:nth-child(3) {
  background: rgba(246,90,69,0.13);
  color: #D94B36;
}

.admin-table-row button:nth-child(4) {
  background: rgba(220,38,38,0.10);
  color: #B91C1C;
}

/* SITE ANA SAYFA DÜZELTME */

.topbar-inner {
  min-height: 72px;
}

.brand-logo {
  height: 82px !important;
}

.topbar.small .brand-logo {
  height: 74px !important;
}

.filter-wrap {
  margin-top: 8px;
  margin-bottom: 16px;
}

/* HERO */

.hero {
  padding: 4px 0 12px;
}

.hero-card {
  padding: 24px 26px;
  margin-bottom: 18px;
  min-height: auto !important;
  overflow: hidden;
}

.hero-title {
  margin: 0 0 18px;
  max-width: 760px;
  font-size: clamp(30px, 3.6vw, 46px);
  line-height: 1.05;
  letter-spacing: -0.05em;
  font-weight: 950;
}

/* Eski küçük baloncukları kapat */
.hero-stats-inline,
.hero-stat-bubble {
  display: none !important;
}

/* Yeni güven rozetleri */
.hero-trust-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.hero-trust-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 54px;
  padding: 9px 14px;
  border-radius: 18px;
  background: rgba(60,74,95,0.045);
  border: 1px solid rgba(60,74,95,0.08);
}

.hero-trust-icon {
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #f65a45;
}

.hero-trust-icon svg {
  width: 42px !important;
  height: 42px !important;
  max-width: 42px !important;
  max-height: 42px !important;
  display: block !important;
  margin: 0 !important;
}

.hero-trust-pill strong {
  display: block;
  color: #233044;
  font-size: 14px;
  line-height: 1.1;
  font-weight: 950;
  white-space: nowrap;
}

.hero-trust-pill small {
  display: block;
  margin-top: 4px;
  color: #5D6B7F;
  font-size: 12px;
  line-height: 1.1;
  font-weight: 800;
  white-space: nowrap;
}

/* Ekiş Acil arkadaki dev sembol taşmasın */
.featured-section {
  overflow: hidden;
}

.featured-section::before,
.featured-section::after {
  max-width: 180px !important;
  max-height: 180px !important;
  opacity: 0.12;
}

@media (max-width: 1180px) {
  .admin-table-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .admin-table-row:first-child {
    display: none;
  }

  .admin-tools {
    grid-template-columns: 1fr;
  }

  .admin-stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .hero-card {
    padding: 20px 18px;
  }

  .hero-title {
    font-size: 32px;
  }

  .hero-trust-pill {
    width: 100%;
  }

  .filter-grid {
    grid-template-columns: 1fr;
  }

  .admin-stats {
    grid-template-columns: 1fr;
  }
}
`;
}
