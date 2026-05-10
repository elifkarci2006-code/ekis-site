export function getStyles(PALETTE) {
  return `
    * { box-sizing: border-box; }

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
  `;
}
