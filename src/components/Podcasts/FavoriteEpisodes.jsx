import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PodcastContext } from "../../context/PodcastContext";
import styles from "./FavoriteEpisodes.module.css";

export default function FavoriteEpisodes() {
  const { allPodcasts, favorites, getEpisodeKey, setFavoriteFilter } = useContext(PodcastContext);
  const navigate = useNavigate();

  const favoriteEpisodes = allPodcasts.flatMap((podcast) =>
    podcast.seasons.flatMap((season, seasonIndex) =>
      season.episodes
        .map((episode, episodeIndex) => ({
          podcast,
          season,
          seasonIndex,
          episode,
          episodeIndex,
          key: getEpisodeKey(podcast.id, seasonIndex, episodeIndex),
        }))
        .filter((item) => favorites.includes(item.key))
    )
  );

  const handleNavigate = (podcastId) => {
    navigate(`/show/${podcastId}`);
  };

  const handleBack = () => {
    setFavoriteFilter("all");
  };

  if (favoriteEpisodes.length === 0) {
    return (
      <div className={styles.container}>
        <button className={styles.backButton} onClick={handleBack}>
          Back to All
        </button>
        <p>No favourite episodes yet.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={handleBack}>
        Back to All
      </button>
      <h2>Your Favourite Episodes</h2>
      <div className={styles.episodeList}>
        {favoriteEpisodes.map((item) => (
          <div
            key={item.key}
            className={styles.episodeCard}
            onClick={() => handleNavigate(item.podcast.id)}
          >
            <img
              src={item.season.image}
              alt={item.podcast.title}
              className={styles.episodeCover}
            />
            <div className={styles.episodeInfo}>
              <h3>{item.podcast.title}</h3>
              <p className={styles.episodeTitle}>
                Season {item.seasonIndex + 1}: {item.episode.title}
              </p>
              <p className={styles.episodeDesc}>{item.episode.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}