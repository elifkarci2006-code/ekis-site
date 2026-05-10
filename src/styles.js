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
