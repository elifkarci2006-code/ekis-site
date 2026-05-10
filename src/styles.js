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
