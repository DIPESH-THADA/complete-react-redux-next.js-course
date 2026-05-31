import { useState, useEffect } from "react";
import "./App.css";
import { speakers as staticSpeakers } from "./speakers";
import { Header } from "./Header";
import { FeaturedSpeaker } from "./FeaturedSpeaker";
import { SpeakerCard } from "./SpeakerCard";
import { AddSpeakerForm } from "./AddSpeakerForm";
import { About } from "./About";
import { Contact } from "./Contact";

export default function App() {
  const [speakers, setSpeakers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [backendOnline, setBackendOnline] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme") === "dark";
    document.documentElement.setAttribute("data-theme", saved ? "dark" : "light");
    return saved;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    fetch("/api/speakers")
      .then((res) => {
        const ct = res.headers.get("content-type") || "";
        if (!ct.includes("application/json")) throw new Error("not-json");
        if (!res.ok) throw new Error("not-ok");
        return res.json();
      })
      .then((data) => {
        setSpeakers(data);
        setLoading(false);
      })
      .catch(() => {
        // Backend not running — fall back to static data
        setSpeakers(staticSpeakers);
        setBackendOnline(false);
        setLoading(false);
      });
  }, []);

  async function handleDeleteSpeaker(id) {
    if (!backendOnline) {
      setSpeakers((prev) => prev.filter((s) => s.id !== id));
      return;
    }
    const res = await fetch(`/api/speakers/${id}`, { method: "DELETE" });
    if (res.ok) {
      setSpeakers((prev) => prev.filter((s) => s.id !== id));
    }
  }

  async function handleAddSpeaker(newSpeaker) {
    if (!backendOnline) {
      setSpeakers((prev) => [...prev, { ...newSpeaker, id: Date.now() }]);
      return;
    }
    const res = await fetch("/api/speakers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSpeaker),
    });
    const saved = await res.json();
    setSpeakers((prev) => [...prev, saved]);
  }

  if (loading) return <div className="api-status">Loading speakers...</div>;

  return (
    <div className="App">
      {!backendOnline && (
        <div className="offline-banner">
          Backend not running — changes won't be saved. Start it with:{" "}
          <code>cd backend &amp;&amp; npm install &amp;&amp; node server.js</code>
        </div>
      )}
      <Header
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode((d) => !d)}
      />
      <Main speakers={speakers} searchQuery={searchQuery} onDelete={handleDeleteSpeaker} />
      <AddSpeakerForm onAdd={handleAddSpeaker} />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

function Main({ speakers, searchQuery, onDelete }) {
  const filtered = speakers.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [selectedSpeaker, setSelectedSpeaker] = useState(speakers[0]);
  const effectiveSelected = filtered.find((s) => s.id === selectedSpeaker?.id) ?? filtered[0];

  return (
    <main id="home">
      <div className="main-hero">
        <h1>Speaker Lineup</h1>
        <p>Click any speaker card to explore their full profile.</p>
      </div>

      <section id="speakers" className="grid">
        {filtered.length > 0 ? (
          <>
            <FeaturedSpeaker speaker={effectiveSelected} />
            <SpeakersList
              speakers={filtered}
              onSelect={setSelectedSpeaker}
              selectedId={effectiveSelected?.id}
              onDelete={onDelete}
            />
          </>
        ) : (
          <p className="no-results">No speakers found for "{searchQuery}".</p>
        )}
      </section>
    </main>
  );
}

function SpeakersList({ speakers, onSelect, selectedId, onDelete }) {
  return (
    <div className="speakers">
      {speakers.map((speaker) => (
        <SpeakerCard
          key={speaker.id}
          speaker={speaker}
          onSelect={onSelect}
          isSelected={speaker.id === selectedId}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="footer-logo">🎤</span>
          <h3>Split Speaker App</h3>
          <p>Connecting world-class speakers with audiences who matter. Discover, manage, and celebrate great minds.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#speakers">Speakers</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-socials">
          <h4>Connect</h4>
          <div className="social-links">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">🐦 Twitter</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">💼 LinkedIn</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">💻 GitHub</a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">▶️ YouTube</a>
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
