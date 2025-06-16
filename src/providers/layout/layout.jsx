import { Outlet, Link } from "react-router-dom";
import "./layout.css";

export default function Layout() {
  return (
    <div>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/redux-sync">Redux Sync</Link>
        <Link to="/redux-async">Redux Async</Link>
        <Link to="/zustand-sync">Zustand Sync</Link>
        <Link to="/zustand-async">Zustand Async</Link>
      </nav>
      <div className="container">
        <Outlet />
      </div>

      <footer className="footer">
        <div className="footer-links">
          <Link to="/">Home</Link>
          <a
            href="https://github.com/Kast69ro"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://github.com/Kast69ro/work-redux-zustand"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
        <p>© 2025 My React App . Using React, Redux & Zustand .</p>
        <p>made by kastro</p>
      </footer>
    </div>
  );
}
