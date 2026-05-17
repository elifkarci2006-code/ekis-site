export default function FeaturedListModal({ show, jobs, onClose, onOpen }) {
  if (!show) return null;

  return (
    <div className="post-modal-backdrop" onClick={onClose}>
      <div className="info-modal" onClick={(e) => e.stopPropagation()}>
        <div className="info-modal-head">
          <h3 className="info-modal-title">Tüm Ekiş Acil İlanları</h3>
          <button className="info-modal-close" type="button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="info-modal-body">
          {jobs.length === 0 ? (
            <div className="empty-box">
              Seçili filtrelere uygun Ekiş Acil ilanı bulunamadı.
            </div>
          ) : (
            <div className="featured-list-modal-grid">
              {jobs.map((job) => (
                <article
                  key={job.id}
                  className="featured-list-modal-card"
                  onClick={() => onOpen(job)}
                >
                  <div>
                    <div className="featured-list-modal-company">
                      {job.company}
                    </div>
                    <h4>{job.title}</h4>
                    <p>{job.location}</p>
                  </div>

                  <strong>{job.salary}</strong>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
