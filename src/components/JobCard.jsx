import { getDaysAgoLabel } from "../utils/jobUtils";

export default function JobCard({ job, onOpen }) {
  return (
    <article className="soft-job-card" onClick={() => onOpen(job)}>
      <div className="soft-top">
        <div className="soft-company">{job.company}</div>
        <div className="soft-days">{getDaysAgoLabel(job.createdAt)}</div>
      </div>

      <h3 className="soft-title">{job.title}</h3>

      <div className="soft-details">
        <div className="soft-detail">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 21s6-5.33 6-11a6 6 0 1 0-12 0c0 5.67 6 11 6 11Z"
              fill="currentColor"
              opacity="0.20"
            />
            <circle cx="12" cy="10" r="2.6" fill="currentColor" />
          </svg>
          <span>{job.location}</span>
        </div>

        <div className="soft-detail">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 3 4 8l8 5 8-5-8-5Z"
              fill="currentColor"
              opacity="0.18"
            />
            <path
              d="m4 12 8 5 8-5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{job.category}</span>
        </div>
      </div>

      <div className="soft-divider" />

      <div className="soft-footer">
        <div className="soft-salary">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
          <span>{job.salary}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              color: "#94a3b8",
              fontSize: 13,
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <path
                d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
            <span>{job.view_count || 0}</span>
          </div>

          <div className="soft-badge">{job.type}</div>
        </div>
      </div>
    </article>
  );
}
