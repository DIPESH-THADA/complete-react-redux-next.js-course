import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const user = {
  name: "Dipesh Thada Magar",
  birthday: "1997-02-17",
  profilePicture: "/profile-photo.JPG",
  jobs: "Software Engineer",
  intro:
    "I am a software engineer with a passion for building web applications. I have experience with JavaScript, React, and Node.js. I enjoy learning new technologies and improving my skills.",
};

const skills = [
  {
    skill: "Web Design",
    emoji: "💻",
    color: "blue",
    level: "Intermediate",
  },
  {
    skill: "JavaScript",
    emoji: "💪",
    color: "red",
    level: "Advanced",
  },

  {
    skill: "React",
    emoji: "⚛️",
    color: "cyan",
    level: "beginner",
  },
  {
    skill: "Node.js",
    emoji: "🟢",
    color: "green",
    level: "Intermediate",
  },

  {
    skill: "HTML/CSS",
    emoji: "🎨",
    color: "orange",
    level: "Advanced",
  },

  {
    skill: "Git and Version Control",
    emoji: "🔧",
    color: "purple",
    level: "Intermediate",
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      {skillList()}
      <Footer />
    </div>
  );
}

function skillList() {
  return (
    <div className="skill-list">
      {skills.map((skill) => (
        <Skill
          key={skill.skill}
          skill={skill.skill}
          emoji={skill.emoji}
          color={skill.color}
        />
      ))}
    </div>
  );
}

function Skill({ skill, emoji, color, level }) {
  return (
    <div className="skill" style={{ backgroundColor: color }}>
      <span className="skill-name">{skill}</span>
      <span>{emoji}</span>
      <span className="skill-level">
        {level === "Beginner"
          ? "Beginner 😊"
          : level === "Intermediate"
            ? "Intermediate 😐"
            : "Advanced 😎"}
      </span>
      <span className="skill-emoji">{emoji}</span>
    </div>
  );
}

function Menu() {
  return (
    <main className="menu">
      <img src={user.profilePicture} alt={user.name} className="profile" />
      <div className="profile-info">
        <h2>{user.name}</h2>
        <span>Birthday: {user.birthday}</span>
        <span>Jobs: {user.jobs}</span>
        <span className="skill">Skills:</span>
        <span className="intro">{user.intro}</span>
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>My Profile Info</h1>
    </header>
  );
}

function Footer() {
  // return React.createElement("footer", null, "We're currently open!");
  return (
    <footer className="footer">
      <span>{new Date().toLocaleTimeString()} currently avilable!</span>
    </footer>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
