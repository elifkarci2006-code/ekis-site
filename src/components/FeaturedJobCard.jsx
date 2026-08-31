import { MapPin, Wallet, Eye } from "lucide-react";
import { getSalaryDisplay } from "../utils/jobUtils";

const TYPE_COLORS = {
  "Günlük": "#0F8F7D",
  "Saatlik": "#FF5A3C",
  "Part Time": "#8B5CF6",
  "Tam Zamanlı": "#2F6FED",
};

function getTypeColor(type) {
  return TYPE_COLORS[type] || "#5D6B7F";
}

export default function FeaturedJobCard({ job, onOpen }) {
  const typeColor = getTypeColor(job.type);

  return (
    <article className="soft-job-card" onClick={() => onOpen(job)}>
      <div className="soft-top soft-top-end">
        <div className="soft-badge" style={{ color: typeColor, backgroundColor: `${typeColor}1A` }}>
          {job.type}
        </div>
      </div>

      <div className="soft-company">{job.company}</div>
      <h3 className="soft-title">{job.title}</h3>

      <div className="soft-detail">
        <MapPin size={13} color="#FF5A3C" strokeWidth={2.5} />
        <span>{job.location}</span>
      </div>

      <div className="soft-divider" />

      <div className="soft-footer">
        <div className="soft-salary">
          <Wallet size={15} color="#111827" strokeWidth={2.4} />
          <span>{getSalaryDisplay(job)}</span>
        </div>

        <div className="soft-view-row">
          <Eye size={13} color="#7A8798" strokeWidth={2.2} />
          <span>{job.viewCount || job.view_count || 0}</span>
        </div>
      </div>
    </article>
  );
}
