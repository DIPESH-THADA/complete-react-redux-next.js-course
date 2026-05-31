export function About() {
  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">About the Event</span>
          <h2>What is Split Speaker?</h2>
          <p className="section-subtitle">
            The premier React developer conference bringing together the world's
            top frontend minds under one roof.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-card">
            <span className="about-icon">🎯</span>
            <h3>Our Mission</h3>
            <p>
              Split Speaker is dedicated to advancing the React ecosystem by
              connecting developers, sharing knowledge, and inspiring the next
              generation of frontend engineers worldwide.
            </p>
          </div>
          <div className="about-card">
            <span className="about-icon">📅</span>
            <h3>Event Details</h3>
            <p>
              Join us for a full day of talks, workshops, and networking
              sessions. The conference features expert speakers covering
              everything from React basics to advanced patterns.
            </p>
          </div>
          <div className="about-card">
            <span className="about-icon">🌍</span>
            <h3>Who Attends</h3>
            <p>
              Frontend developers, React enthusiasts, engineering leads, and
              anyone passionate about modern web development. All skill levels
              are welcome.
            </p>
          </div>
        </div>

        <div className="about-stats">
          <div className="stat">
            <span className="stat-number">7+</span>
            <span className="stat-label">Expert Speakers</span>
          </div>
          <div className="stat">
            <span className="stat-number">500+</span>
            <span className="stat-label">Attendees</span>
          </div>
          <div className="stat">
            <span className="stat-number">8h</span>
            <span className="stat-label">Of Content</span>
          </div>
          <div className="stat">
            <span className="stat-number">3</span>
            <span className="stat-label">Session Halls</span>
          </div>
        </div>
      </div>
    </section>
  );
}
