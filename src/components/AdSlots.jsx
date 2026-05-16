import { ADS_ENABLED } from "../data/constants";

export function AdPlaceholder({ type = "banner" }) {
  if (!ADS_ENABLED) return null;

  return (
    <div className={`ad-slot ad-slot-${type}`}>
      <span>Reklam Alanı</span>
    </div>
  );
}

export function InlineAdCard() {
  if (!ADS_ENABLED) return null;

  return (
    <div className="inline-ad-card">
      <div className="inline-ad-badge">Sponsorlu</div>
      <div className="inline-ad-content">
        <strong>Reklam Alanı</strong>
        <span>Google Adsense veya manuel sponsor alanı</span>
      </div>
    </div>
  );
}
