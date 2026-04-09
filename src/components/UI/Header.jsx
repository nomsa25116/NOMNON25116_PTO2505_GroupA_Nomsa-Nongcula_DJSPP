import styles from "./Header.module.css";
import { Link } from "react-router-dom";

/**
 * Header component for the Podcast Explorer app.
 *
 * @param {{ theme: string; onToggleTheme: () => void }} props
 * @param {string} props.theme The current theme mode.
 * @param {() => void} props.onToggleTheme Function to toggle the theme.
 * @returns {JSX.Element} The header element.
 */
export default function Header({ theme, onToggleTheme }) {
  return (
    <header className={styles.appHeader}>
      <h1>
        <Link to="/">🎙️ Podcast App</Link>
      </h1>
      <button
        type="button"
        className={styles.themeToggle}
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
      </button>
    </header>
  );
}
