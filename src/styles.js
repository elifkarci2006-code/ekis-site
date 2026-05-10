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

    .section-title-vitrin {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      color: #fff;
    }

    .section-title-vitrin::before {
      content: "★";
      font-size: 18px;
      color: #fff;
    }

    .section-sub {
      color: ${PALETTE.softText};
      font-size: 14px;
      font-weight: 800;
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

    .featured-card::after {
      content: "";
      position: absolute;
      right: -20px;
      bottom: -24px;
      width: 130px;
      height: 130px;
      border-radius: 50%;
      background: rgba(246,90,69,0.12);
    }

    .card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 16px;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      min-height: 34px;
      padding: 0 12px;
      border-radius: 999px;
      background: ${PALETTE.coral};
      color: #fff;
      font-size: 12px;
      font-weight: 900;
      letter-spacing: -0.01em;
      box-shadow: 0 10px 18px rgba(246,90,69,0.18);
    }

    .type-tag {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 34px;
      padding: 0 12px;
      border-radius: 999px;
      background: ${PALETTE.warm};
      color: ${PALETTE.coral};
      border: 1px solid rgba(246,90,69,0.16);
      font-size: 12px;
      font-weight: 900;
    }

    .featured-company,
    .job-company {
      color: ${PALETTE.teal};
      font-size: 14px;
      font-weight: 950;
      margin-bottom: 6px;
    }

    .featured-title,
    .job-title {
      margin: 0 0 10px;
      color: ${PALETTE.slate};
      font-size: 20px;
      line-height: 1.08;
      letter-spacing: -0.04em;
      font-weight: 950;
    }

    .featured-location,
    .job-location {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: ${PALETTE.softText};
      font-size: 14px;
      font-weight: 700;
    }

    .featured-divider,
    .job-divider {
      width: min(76%, 360px);
      height: 1px;
      background: rgba(246,90,69,0.18);
      margin: 18px 0 14px;
    }

    .featured-salary-row,
    .job-salary-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .featured-salary,
    .job-salary {
      margin: 0;
      color: ${PALETTE.coral};
      font-size: 20px;
      line-height: 1;
      font-weight: 950;
      letter-spacing: -0.04em;
    }

    .jobs-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 16px;
    }

    .empty-box {
      background:
        linear-gradient(
          180deg,
          #fff 0%,
          #fbfcfd 100%
        );
      border: 1px dashed rgba(60,74,95,0.14);
      border-radius: 24px;
      padding: 34px;
      color: ${PALETTE.softText};
      text-align: center;
      box-shadow: 0 14px 24px rgba(60,74,95,0.04);
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

    .detail-panel-inner,
    .post-panel-inner {
      overflow-y: auto;
      padding: 0;
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
      background:
        linear-gradient(
          180deg,
          rgba(255,255,255,0.50),
          rgba(255,255,255,0.34)
        ),
        radial-gradient(
          circle at 4% 20%,
          rgba(88,173,173,0.10),
          transparent 38%
        );
      backdrop-filter: blur(18px);
    }

    .detail-modern-side {
      padding: 42px 26px 32px;
      background:
        linear-gradient(
          180deg,
          rgba(255,255,255,0.40),
          rgba(245,247,248,0.55)
        ),
        radial-gradient(
          circle at 92% 0%,
          rgba(246,90,69,0.09),
          transparent 44%
        );
      border-left: 1px solid rgba(255,255,255,0.72);
      backdrop-filter: blur(18px);
    }

    .detail-modern-title {
      max-width: 620px;
      color: #102142;
      font-size: clamp(44px, 5vw, 64px);
      line-height: 0.98;
      letter-spacing: -0.075em;
      text-shadow:
        0 14px 34px rgba(60,74,95,0.08);
      margin-bottom: 20px;
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
      box-shadow:
        0 20px 44px rgba(60,74,95,0.07),
        inset 0 1px 0 rgba(255,255,255,0.74);
      backdrop-filter: blur(16px);
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
        ),
        radial-gradient(
          circle at 0% 0%,
          rgba(246,90,69,0.055),
          transparent 36%
        );
      border: 1px solid rgba(255,255,255,0.88);
      box-shadow:
        0 28px 66px rgba(60,74,95,0.09),
        inset 0 1px 0 rgba(255,255,255,0.76);
      backdrop-filter: blur(18px);
    }

    .detail-modern-desc-card h4 {
      color: #233044;
      font-size: 22px;
      font-weight: 950;
      margin-bottom: 16px;
    }

    .detail-modern-desc-card p {
      color: #334155;
      font-size: 16px;
      line-height: 1.85;
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
      box-shadow:
        0 24px 52px rgba(246,90,69,0.22);
    }

    .detail-modern-salary-card span {
      color: rgba(255,255,255,0.92);
      font-size: 14px;
      font-weight: 850;
    }

    .detail-modern-salary-card strong {
      color: #fff;
      font-size: 34px;
      font-weight: 950;
      letter-spacing: -0.05em;
    }

    .detail-modern-contact-card {
      padding: 24px;
      border-radius: 30px;
      background: rgba(255,255,255,0.62);
      border: 1px solid rgba(255,255,255,0.88);
      box-shadow:
        0 28px 68px rgba(60,74,95,0.13),
        inset 0 1px 0 rgba(255,255,255,0.74);
      backdrop-filter: blur(18px);
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
      box-shadow:
        0 18px 34px rgba(246,90,69,0.22);
    }

    @media (max-width: 900px) {
      .detail-modern-grid {
        grid-template-columns: 1fr;
      }

      .detail-modern-side {
        border-left: none;
        border-top: 1px solid rgba(255,255,255,0.72);
      }

      .detail-modern-main,
      .detail-modern-side {
        padding: 28px 20px;
      }

      .detail-modern-title {
        font-size: 40px;
      }

      .featured-grid,
      .jobs-grid {
        grid-template-columns: 1fr;
      }

      .filter-grid {
        grid-template-columns: 1fr;
      }

      .hero-title {
        font-size: clamp(34px, 13vw, 48px);
      }

      .topbar-inner {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `;
}
