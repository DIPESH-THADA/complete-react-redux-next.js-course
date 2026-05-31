const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const DB_PATH = path.join(__dirname, "db.json");

app.use(cors());
app.use(express.json());

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Root — API info page
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>Speaker App API</title>
        <style>
          body { font-family: sans-serif; max-width: 600px; margin: 60px auto; color: #1e293b; }
          h1 { color: #6366f1; }
          code { background: #f1f5f9; padding: 3px 8px; border-radius: 4px; }
          li { margin: 10px 0; }
          .note { background: #fef3c7; border-left: 4px solid #fcd34d; padding: 12px 16px; border-radius: 4px; margin-top: 24px; }
        </style>
      </head>
      <body>
        <h1>Split Speaker App — Backend API</h1>
        <p>Server is running on port ${PORT}. Available endpoints:</p>
        <ul>
          <li><code>GET  /api/speakers</code> — get all speakers</li>
          <li><code>POST /api/speakers</code> — add a new speaker</li>
          <li><code>DELETE /api/speakers/:id</code> — delete a speaker</li>
        </ul>
        <div class="note">
          Open your React app at <strong><a href="http://localhost:3000">http://localhost:3000</a></strong>
        </div>
      </body>
    </html>
  `);
});

// GET all speakers
app.get("/api/speakers", (req, res) => {
  res.json(readDB());
});

// POST a new speaker
app.post("/api/speakers", (req, res) => {
  const speakers = readDB();
  const newSpeaker = { ...req.body, id: Date.now() };
  speakers.push(newSpeaker);
  writeDB(speakers);
  res.status(201).json(newSpeaker);
});

// DELETE a speaker by id
app.delete("/api/speakers/:id", (req, res) => {
  const speakers = readDB();
  const updated = speakers.filter((s) => s.id !== Number(req.params.id));
  if (updated.length === speakers.length) {
    return res.status(404).json({ error: "Speaker not found" });
  }
  writeDB(updated);
  res.json({ message: "Speaker deleted" });
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Backend running at http://localhost:${PORT}`)
);
