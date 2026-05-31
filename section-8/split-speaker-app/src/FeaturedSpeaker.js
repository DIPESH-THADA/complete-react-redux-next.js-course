export function FeaturedSpeaker({ speaker }) {
  return (
    <div className="featured-speaker">
      <p className="featured-label">Featured Speaker</p>

      <div className="featured-header">
        <img
          src={speaker.profilePicture}
          alt={speaker.name}
          className="featured-img"
        />
        <div className="featured-identity">
          <h2 className="featured-name">{speaker.name}</h2>
          <span className="featured-role">{speaker.role}</span>
          <span className="featured-exp">
            {speaker.experience} of experience
          </span>
        </div>
      </div>

      <p className="featured-bio">{speaker.bio}</p>

      <div className="featured-info-grid">
        <div className="info-card">
          <span className="info-icon">📢</span>
          <span className="info-label">Topic</span>
          <span className="info-value">{speaker.topic}</span>
        </div>
        <div className="info-card">
          <span className="info-icon">🕐</span>
          <span className="info-label">Speaking Time</span>
          <span className="info-value">{speaker.speakingTime}</span>
        </div>
        <div className="info-card">
          <span className="info-icon">📍</span>
          <span className="info-label">Room</span>
          <span className="info-value">{speaker.sessionRoom}</span>
        </div>
        <div className="info-card">
          <span className="info-icon">🎓</span>
          <span className="info-label">Qualification</span>
          <span className="info-value">{speaker.qualifications}</span>
        </div>
      </div>

      <div className="featured-skills">
        <span className="skills-heading">Skills</span>
        <div className="skills-list">
          {speaker.skills.map((skill) => (
            <span key={skill} className="skill-badge">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
