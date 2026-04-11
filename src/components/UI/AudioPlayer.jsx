import { useContext, useEffect, useRef } from "react";
import { PodcastContext } from "../../context/PodcastContext";
import styles from "./AudioPlayer.module.css";

/**
 * Persistent audio player that stays mounted across page navigation.
 *
 * It uses the current track from `PodcastContext` and renders native audio
 * controls outside the route-specific pages so playback can continue.
 *
 * @returns {JSX.Element|null} The persistent audio player UI.
 */
export default function AudioPlayer() {
  const { currentTrack, setIsPlaying, isPlaying } = useContext(PodcastContext);
  const audioRef = useRef(null);

  /**
   * Advance the browser audio element to the current track and attempt playback.
   */
  useEffect(() => {
    if (!audioRef.current || !currentTrack?.src) {
      return;
    }

    const audio = audioRef.current;
    audio.load();

    const tryPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        // Autoplay may be blocked by browser policies, but the player is still available.
      }
    };

    tryPlay();
  }, [currentTrack, setIsPlaying]);

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleEnded = () => setIsPlaying(false);

  return (
    <div className={styles.playerBar}>
      <div className={styles.trackInfo}>
        {currentTrack ? (
          <>
            <div className={styles.trackTitle}>{currentTrack.episodeTitle}</div>
            <div className={styles.trackMeta}>
              {currentTrack.podcastTitle} · {currentTrack.seasonTitle} ·{' '}
              {isPlaying ? "Playing now" : "Paused"}
            </div>
          </>
        ) : (
          <div className={styles.noTrack}>
            Select an episode to start listening. Playback will continue across
            pages.
          </div>
        )}
      </div>

      {currentTrack && (
        <audio
          ref={audioRef}
          controls
          preload="metadata"
          className={styles.audioPlayer}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
        >
          <source src={currentTrack.src} />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}
