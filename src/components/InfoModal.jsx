export default function InfoModal({ modalKey, content, onClose }) {
  if (!modalKey) return null;

  const modalContent = content[modalKey];

  if (!modalContent) return null;

  return (
    <div className="post-modal-backdrop" onClick={onClose}>
      <div className="info-modal" onClick={(e) => e.stopPropagation()}>
        <div className="info-modal-head">
          <h3 className="info-modal-title">{modalContent.title}</h3>
          <button className="info-modal-close" type="button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="info-modal-body">
          {modalContent.blocks.map((block, index) => {
            if (block.type === "list") {
              return (
                <ul key={index}>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            }

            if (block.type === "note") {
              return (
                <div className="info-modal-note" key={index}>
                  {block.text}
                </div>
              );
            }

            return <p key={index}>{block.text}</p>;
          })}
        </div>
      </div>
    </div>
  );
}
