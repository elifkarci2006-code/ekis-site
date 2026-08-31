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
    <article className="featured-card" onClick={() => onOpen(job)}>
      <div className="card-top">
        <div className="type-tag" style={{ color: typeColor, backgroundColor: `${typeColor}1A`, borderColor: `${typeColor}33` }}>
          {job.type}
        </div>
      </div>

      <div className="featured-company">{job.company}</div>
      <h3 className="featured-title">{job.title}</h3>

      <div className="featured-location">
        <MapPin size={13} color="#FF5A3C" strokeWidth={2.5} />
        <span>{job.location}</span>
      </div>

      <div className="featured-divider" />

      <div className="featured-footer">
        <div className="featured-salary">
          <Wallet size={16} color="#111827" strokeWidth={2.4} />
          <span>{getSalaryDisplay(job)}</span>
        </div>
        <div className="featured-views">
          <Eye size={13} color="#7A8798" strokeWidth={2.2} />
          <span>{job.viewCount || job.view_count || 0}</span>
        </div>
      </div>
    </article>
  );
}
