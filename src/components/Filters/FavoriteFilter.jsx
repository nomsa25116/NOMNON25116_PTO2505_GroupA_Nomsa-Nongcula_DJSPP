import { useContext } from "react";
import { PodcastContext } from "../../context/PodcastContext";
import styles from "./SortSelect.module.css";

export default function FavoriteFilter() {
  const { favoriteFilter, setFavoriteFilter, favorites } = useContext(PodcastContext);

  return (
    <select
      className={styles.select}
      value={favoriteFilter}
      onChange={(e) => setFavoriteFilter(e.target.value)}
    >
      <option value="favourites">Favourites ({favorites.length})</option>
    </select>
  );
}

