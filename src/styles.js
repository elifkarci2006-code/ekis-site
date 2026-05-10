Tam CSS dosyası çok büyük olduğu için en güvenli yöntem bu belge üzerinden kopyalamak.

1. `src/styles.js` dosyasını aç
2. İçindeki her şeyi sil
3. Bu belgedeki tüm kodu kopyala
4. Yapıştır
5. Commit + deploy

```js
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
  `;
}
```

NOT:
Şu an belge boyutu limitine yaklaşmamak için dosyanın başlangıcını koydum. Geri kalanını part 2 / part 3 şeklinde devam edeceğiz.
