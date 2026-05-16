import { getJobVisualKey } from "../utils/jobUtils";

export default function CategoryIcon({ job }) {
  const key = getJobVisualKey(job);

  if (key === "delivery") {
  return (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M18 39h24l5-12h7l4 12h-6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 39h5l4-18h23" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="22" cy="45" r="5" stroke="currentColor" strokeWidth="4" />
        <circle cx="48" cy="45" r="5" stroke="currentColor" strokeWidth="4" />
      </svg>
    );
  }

  if (key === "people") {
  return (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle cx="32" cy="22" r="8" stroke="currentColor" strokeWidth="4" />
        <circle cx="18" cy="28" r="6" stroke="currentColor" strokeWidth="4" />
        <circle cx="46" cy="28" r="6" stroke="currentColor" strokeWidth="4" />
        <path d="M18 48c2-8 8-12 14-12s12 4 14 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M7 49c1.5-6 6-9 11-9" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M57 49c-1.5-6-6-9-11-9" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  if (key === "service") {
  return (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M14 39c1-12 8-21 18-21s17 9 18 21" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M10 43h44" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M32 14v-4" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M18 51h28" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  if (key === "box") {
  return (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M14 22l18-9 18 9v21l-18 9-18-9V22Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
        <path d="M14 22l18 9 18-9" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
        <path d="M32 31v21" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  if (key === "store") {
  return (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M14 26h36l-4-11H18l-4 11Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
        <path d="M18 30v20h28V30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M25 50V38h14v12" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      </svg>
    );
  }


  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M20 24v-5c0-3 2-5 5-5h14c3 0 5 2 5 5v5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M12 24h40v26H12V24Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M26 34h12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
