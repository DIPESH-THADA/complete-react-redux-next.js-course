export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="footer-logo">🎤</span>
          <h3>Split Speaker App</h3>
          <p>
            Connecting world-class speakers with audiences who matter. Discover,
            manage, and celebrate great minds.
          </p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#speakers">Speakers</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>

        <div className="footer-socials">
          <h4>Connect</h4>
          <div className="social-links">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
            >
              🐦 Twitter
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              💼 LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              💻 GitHub
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              ▶️ YouTube
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Split Speaker App. All rights reserved.</p>
        <p className="footer-tagline">Made with ❤️ for great speakers</p>
      </div>
    </footer>
  );
}
