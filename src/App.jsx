import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/UI/Header";
import AudioPlayer from "./components/UI/AudioPlayer";
import Home from "./pages/Home";
import ShowDetail from "./pages/ShowDetail";
import { PodcastProvider } from "./context/PodcastContext";

/**
 * Root component of the Podcast Explorer app.
 *
 * - Wraps the application in `PodcastProvider` for global state.
 * - Renders the `Header` with theme toggle controls.
 * - Defines application routes for home and show detail pages.
 * - Includes a persistent audio player that remains mounted across route changes.
 *
 * @returns {JSX.Element} The root application element.
 */
export default function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" || savedTheme === "light" ? savedTheme : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  /**
   * Toggle between light and dark themes.
   */
  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <PodcastProvider>
        <div style={{ paddingBottom: "6rem" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/show/:id" element={<ShowDetail />} />
          </Routes>
          <AudioPlayer />
        </div>
      </PodcastProvider>
    </>
  );
}
