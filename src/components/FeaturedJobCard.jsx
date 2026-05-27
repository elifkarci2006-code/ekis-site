import CategoryIcon from "./CategoryIcon";
import { getDaysAgoLabel } from "../utils/jobUtils";

export default function FeaturedJobCard({ job, onOpen }) {
  return (
    <article className="featured-card" onClick={() => onOpen(job)}>
      <div className="card-top">
        <div className="pill">
          <span>★</span> Öne Çıkan
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
          }}
        >
          👁 {job.view_count || 0}
        </div>
      </div>

      <div className="featured-icon-circle">
        <CategoryIcon job={job} />
      </div>
    </article>
  );
}
