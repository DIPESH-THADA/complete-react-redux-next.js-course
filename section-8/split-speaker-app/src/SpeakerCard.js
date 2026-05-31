export function SpeakerCard({ speaker, onSelect, isSelected, onDelete }) {
  return (
    <div
      className={`speaker-card${isSelected ? " speaker-card--active" : ""}`}
      onClick={() => onSelect(speaker)}
    >
      <img src={speaker.profilePicture} alt={speaker.name} />
      <div className="card-body">
        <h3>{speaker.name}</h3>
        <span className="card-role">{speaker.role}</span>
        <p className="card-topic">{speaker.topic}</p>
        <p className="card-time">{speaker.speakingTime}</p>
      </div>
      <button
        className="btn-delete"
        onClick={(e) => { e.stopPropagation(); onDelete(speaker.id); }}
        aria-label={`Remove ${speaker.name}`}
        title="Remove speaker"
      >
        ✕
      </button>
    </div>
  );
}
