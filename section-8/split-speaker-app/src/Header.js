import logo from "./logo.png";

export function Header({ searchQuery, onSearch, darkMode, onToggleDark }) {
  return (
    <div className="header">
      <img src={logo} alt="Logo" className="logo" />
      <div className="header-search">
        <span className="search-icon">&#128269;</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search speakers..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
        />
        {searchQuery && (
          <button className="search-clear" onClick={() => onSearch("")}>
            &#10005;
          </button>
        )}
      </div>
      <button
        className="theme-toggle"
        onClick={onToggleDark}
        aria-label="Toggle dark mode"
      >
        {darkMode ? "🌞" : "🌛"}
      </button>
      <nav>
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#speakers">Speakers</a>
          </li>
          <li>
            <a href="#add-speaker">Add Speaker</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
