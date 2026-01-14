/* JSX
CategoryMenu
*/

import { useNavigate } from "react-router-dom";
import { useBooksData } from "../../hooks/useBooksData";

import menuIcon from "../../assets/icons/Menu_icon.png";

export default function CategoryMenu() {
  const navigate = useNavigate();
  const { byCategory } = useBooksData();

  const categories = [
    "Fiction",
    "Adventure",
    "Romance",
    "War",
    "Philosophy",
    "Society",
    "Mystery",
    "Tragedy",
    "Fantasy",
    "Thriller",
    "Justice",
    "Power",
    "Morality",
  ];

  async function selectCategory(cat) {
    navigate("/books");
    await byCategory(cat);
  }

  return (
    <>
      <nav id="dropdown-cont">
        <img src={menuIcon} alt="Menu Icon" id="dropdown-btn" />

        <ul id="dropdown-content">
          {categories.map((cat) => {
            return (
              <li key={cat} onClick={() => selectCategory(cat)}>
                {cat}
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
