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
        <div className="soft-detail">📍 <span>{job.location}</span></div>
        <div className="soft-detail">⌄ <span>{job.category}</span></div>
      </div>

      <div className="soft-divider" />

      <div className="soft-footer">
        <div className="soft-salary">
          💼 <span>{job.salary}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ color: "#94a3b8", fontSize: 13, fontWeight: 700 }}>
            👁 {job.view_count || 0}
          </div>
          <div className="soft-badge">{job.type}</div>
        </div>
      </div>
    </article>
  );
}
