import { useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PodcastContext } from "../../context/PodcastContext";
import GenreTags from "../UI/GenreTags";
import styles from "./RecommendedCarousel.module.css";

/**
 * A horizontal carousel component that displays featured podcast shows.
 *
 * The component pulls the first eight podcasts from context, renders each
 * item with an image, title, and genre tags, and provides side navigation
 * buttons for scrolling the carousel left and right.
 *
 * @returns {JSX.Element|null} The recommended shows carousel section.
 */
export default function RecommendedCarousel() {
  const { podcasts } = useContext(PodcastContext);
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const visibleShows = podcasts.slice(0, 8);

  /**
   * Scroll the carousel content by a relative offset.
   *
   * @param {'left'|'right'} direction - The scroll direction.
   */
  const scroll = (direction) => {
    if (!carouselRef.current) return;
    const carousel = carouselRef.current;
    const offset = carousel.offsetWidth * 0.8;
    const itemWidth = 220 + 16;
    const setWidth = visibleShows.length * itemWidth;
    let newScroll = carousel.scrollLeft + (direction === "left" ? -offset : offset);

    // Adjust for endless loop
    if (newScroll < setWidth) {
      newScroll += setWidth;
    } else if (newScroll >= 2 * setWidth) {
      newScroll -= setWidth;
    }

    carousel.scrollTo({
      left: newScroll,
      behavior: "smooth",
    });
  };

  /**
   * Navigate to the show detail page for the selected podcast.
   *
   * @param {Object} podcast - The selected podcast item.
   * @param {string|number} podcast.id - The podcast identifier.
   * @param {string[]} podcast.genres - The podcast genre list.
   */
  const handleShowClick = (podcast) => {
    navigate(`/show/${podcast.id}`, { state: { genres: podcast.genres } });
  };

  /**
   * Sets up endless scrolling behavior for the carousel by duplicating content
   * and managing scroll position to create a seamless loop.
   */
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const itemWidth = 220 + 16; // card width + gap
    const setWidth = visibleShows.length * itemWidth;

    // Set initial scroll to the middle set
    carousel.scrollLeft = setWidth;

    const handleScroll = () => {
      const { scrollLeft } = carousel;

      if (scrollLeft >= 2 * setWidth) {
        carousel.scrollLeft = setWidth;
      } else if (scrollLeft <= 0) {
        carousel.scrollLeft = setWidth;
      }
    };

    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, [visibleShows]);

  if (!visibleShows.length) return null;

  return (
    <section className={styles.carouselSection} aria-label="Recommended shows">
      <div className={styles.headingRow}>
        <div>
          <h2>Shows you may like</h2>
        </div>
      </div>

      <div className={styles.carouselWrapper}>
        <button
          type="button"
          className={`${styles.navButton} ${styles.leftButton}`}
          onClick={() => scroll("left")}
          aria-label="Scroll carousel left"
        >
          ‹
        </button>
        <div className={styles.carousel} ref={carouselRef}>
        {[...visibleShows, ...visibleShows, ...visibleShows].map((podcast, index) => (
          <article
            key={`${podcast.id}-${index}`}
            className={styles.showCard}
            onClick={() => handleShowClick(podcast)}
            tabIndex={0}
            role="button"
            onKeyDown={(event) => {
              if (event.key === "Enter") handleShowClick(podcast);
            }}
          >
            <div className={styles.imageWrapper}>
              <img src={podcast.image} alt={podcast.title} />
            </div>
            <div className={styles.cardContent}>
              <h3>{podcast.title}</h3>
              <GenreTags genres={podcast.genres} />
            </div>
          </article>
        ))}
      </div>
      <button
        type="button"
        className={`${styles.navButton} ${styles.rightButton}`}
        onClick={() => scroll("right")}
        aria-label="Scroll carousel right"
      >
        ›
      </button>
    </div>
  </section>
  );
}
