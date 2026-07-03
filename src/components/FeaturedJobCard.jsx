import CategoryIcon from "./CategoryIcon";
import { getDaysAgoLabel } from "../utils/jobUtils";

export default function FeaturedJobCard({ job, onOpen }) {
  return (
    <article className="featured-card" onClick={() => onOpen(job)}>
      <div className="card-top">
        <div className="pill">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: "8px", verticalAlign: "middle", flexShrink: 0}}>
  <path d="M12 2v1"/>
  <path d="M4.2 4.2l.7.7"/>
  <path d="M19.8 4.2l-.7.7"/>
  <path d="M2 13h1"/>
  <path d="M21 13h1"/>
  <path d="M7 13a5 5 0 0110 0v2H7v-2z"/>
  <rect x="6" y="15" width="12" height="3" rx="1"/>
  <path d="M10 18.5a2 2 0 004 0"/>
</svg> Öne Çıkan
        </div>

        <div className="card-top-right">
          <div className="job-days">{getDaysAgoLabel(job.createdAt)}</div>
          <div className="type-tag">{job.type}</div>
        </div>
      </div>

      <div className="job-company featured-company">{job.company}</div>
      <h3 className="job-title featured-title">{job.title}</h3>

      <div className="featured-location">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 21s6-5.33 6-11a6 6 0 1 0-12 0c0 5.67 6 11 6 11Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="12"
            cy="10"
            r="2.5"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        <span>{job.location}</span>
      </div>

      <div className="featured-divider" />

      <div
        className="featured-salary-row"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="salary-wallet" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M4 8.5h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M4 8.5 17 5v3.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 13h3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="job-salary featured-salary">{job.salary}</div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            color: "#94a3b8",
            fontSize: 13,
            fontWeight: 700,
            // Clears the 82px decorative category-icon circle absolutely
            // positioned at the card's bottom-right corner.
            marginRight: 60,
          }}
        >
          👁 {job.viewCount || job.view_count || 0}
        </div>
      </div>

      <div className="featured-icon-circle">
        <CategoryIcon job={job} />
      </div>
    </article>
  );
}
