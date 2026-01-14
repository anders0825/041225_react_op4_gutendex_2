/* JSX
FavoritesNav
*/

import { useNavigate } from "react-router-dom";
import { useBooksData } from "../../hooks/useBooksData";

import starMenu from "../../assets/icons/starMenu_icon.png";

export default function FavoritesNav() {
  const navigate = useNavigate();
  const { byFavorites } = useBooksData();

  async function navFavorites() {
    navigate("/books");
    await byFavorites();
  }

  return (
    <>
      <img
        src={starMenu}
        alt="Star Icon"
        id="favorites-nav"
        onClick={() => navFavorites()}
      />
    </>
  );
}
