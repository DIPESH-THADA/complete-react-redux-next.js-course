import { useState, useEffect } from "react";
import "./App.css";
import { speakers as staticSpeakers } from "./speakers";
import { Header } from "./Header";
import { FeaturedSpeaker } from "./FeaturedSpeaker";
import { SpeakerCard } from "./SpeakerCard";
import { AddSpeakerForm } from "./AddSpeakerForm";
import { About } from "./About";
import { Contact } from "./Contact";
import { Footer } from "./Footer";

export default function App() {
  const [speakers, setSpeakers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [backendOnline, setBackendOnline] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme") === "dark";
    document.documentElement.setAttribute(
      "data-theme",
      saved ? "dark" : "light",
    );
    return saved;
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light",
    );
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
          <code>
            cd backend &amp;&amp; npm install &amp;&amp; node server.js
          </code>
        </div>
      )}
      <Header
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode((d) => !d)}
      />
      <Main
        speakers={speakers}
        searchQuery={searchQuery}
        onDelete={handleDeleteSpeaker}
      />
      <AddSpeakerForm onAdd={handleAddSpeaker} />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

function Main({ speakers, searchQuery, onDelete }) {
  const filtered = speakers.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const [selectedSpeaker, setSelectedSpeaker] = useState(speakers[0]);
  const effectiveSelected =
    filtered.find((s) => s.id === selectedSpeaker?.id) ?? filtered[0];

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
