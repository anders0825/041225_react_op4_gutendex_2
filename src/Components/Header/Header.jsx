/* JSX
Header.jsx
*/

import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import CategoryMenu from "./CategoryMenu";
import FavoritesNav from "./FavoritesNav";

import homeIcon from "../../assets/icons/Home_icon.png";

export default function Header() {
  return (
    <header>
      <section className="item-cont" id="home-cont">
        <Link to="/">
          <img src={homeIcon} alt="Home Icon" id="home-icon" />
        </Link>
        <FavoritesNav />
      </section>

      <section className="item-cont" id="search-cont">
        <SearchBar />
      </section>
      <section className="item-cont" id="menu-cont">
        <CategoryMenu />
      </section>
    </header>
  );
}
