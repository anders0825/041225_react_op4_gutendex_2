/* JS
useFavorites.js
*/

import { useAppState } from "../context/AppStateContext";

export function useFavorites() {
  const { favorites, setFavorites } = useAppState();

  function isFavorite(id) {
    return favorites.some((b) => b.id === id);
  }

  function toggleFavorite(book) {
    setFavorites((prev) =>
      prev.some((b) => b.id === book.id)
        ? prev.filter((b) => b.id !== book.id)
        : [...prev, book]
    );
  }

  return { favorites, isFavorite, toggleFavorite };
}
