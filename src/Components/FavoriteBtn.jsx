/* JSX
FavoriteBtn
*/



import { useFavorites } from "../hooks/useFavorites";

import starEmpty from "../assets/icons/starEmpty_icon.png";
import starFill from "../assets/icons/starFill_icon.png";

export default function FavoriteButton({ book }) {
  // Javascript:
  const { isFavorite, toggleFavorite } = useFavorites();

  const active = isFavorite(book.id);

  return (
    <button
      className="favorite-btn"
      onClick={() => toggleFavorite(book)}
      aria-label="Toggle favorite"
    >
      <img src={active ? starFill : starEmpty} alt="Favorite Icon" />
    </button>
  );
}
