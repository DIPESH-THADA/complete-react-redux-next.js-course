import { useState } from "react";

const EMPTY_FORM = {
  name: "",
  role: "",
  topic: "",
  bio: "",
  speakingTime: "",
  sessionRoom: "",
  experience: "",
  qualifications: "",
  skills: "",
  profilePicture: "",
};

export function AddSpeakerForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAdd({
      ...form,
      skills: form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      profilePicture:
        form.profilePicture ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=6366f1&color=fff&size=200`,
    });
    setForm(EMPTY_FORM);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <section id="add-speaker" className="add-speaker-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">Join The Stage</span>
          <h2>Add a Speaker</h2>
          <p className="section-subtitle">
            Know someone amazing? Add them to the lineup and let the community
            discover them.
          </p>
        </div>

        {submitted && (
          <div className="add-success">
            ✅ Speaker added! Scroll up to see them in the lineup.
          </div>
        )}

        <form className="add-speaker-form" onSubmit={handleSubmit}>
          <div className="add-form-grid">
            <div className="form-group">
              <label htmlFor="as-name">Full Name *</label>
              <input
                id="as-name"
                name="name"
                type="text"
                placeholder="Jane Doe"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="as-role">Role / Title *</label>
              <input
                id="as-role"
                name="role"
                type="text"
                placeholder="Senior React Developer"
                value={form.role}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="as-topic">Talk Topic *</label>
              <input
                id="as-topic"
                name="topic"
                type="text"
                placeholder="React Server Components"
                value={form.topic}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="as-time">Speaking Time</label>
              <input
                id="as-time"
                name="speakingTime"
                type="text"
                placeholder="10:00 AM – 10:45 AM"
                value={form.speakingTime}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="as-room">Session Room</label>
              <input
                id="as-room"
                name="sessionRoom"
                type="text"
                placeholder="Hall A"
                value={form.sessionRoom}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="as-exp">Experience</label>
              <input
                id="as-exp"
                name="experience"
                type="text"
                placeholder="5 years"
                value={form.experience}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="as-qual">Qualifications</label>
              <input
                id="as-qual"
                name="qualifications"
                type="text"
                placeholder="B.Sc. Computer Science, MIT"
                value={form.qualifications}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="as-skills">Skills (comma-separated)</label>
              <input
                id="as-skills"
                name="skills"
                type="text"
                placeholder="React, TypeScript, Next.js"
                value={form.skills}
                onChange={handleChange}
              />
            </div>

            <div className="form-group form-group--full">
              <label htmlFor="as-pic">Profile Picture URL</label>
              <input
                id="as-pic"
                name="profilePicture"
                type="url"
                placeholder="https://... (leave blank for auto-generated avatar)"
                value={form.profilePicture}
                onChange={handleChange}
              />
            </div>

            <div className="form-group form-group--full">
              <label htmlFor="as-bio">Bio *</label>
              <textarea
                id="as-bio"
                name="bio"
                rows={4}
                placeholder="Tell us about this speaker..."
                value={form.bio}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary">
            Add to Lineup
          </button>
        </form>
      </div>
    </section>
  );
}
