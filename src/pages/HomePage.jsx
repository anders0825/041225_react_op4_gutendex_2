/* JSX
HomePage.jsx
*/

import { Link } from "react-router-dom";

import { useAppState } from "../context/AppStateContext";
import FavoriteBtn from "../Components/FavoriteBtn";

export default function HomePage() {
  const { favorites } = useAppState();

  return (
    <section id="HomePage-cont">
      <h1>HomePage</h1>
      <p>Use the search bar above to find books!</p>

      <section id="favorite-display">
        {!favorites[0] ? <h2>No Favorites Added...</h2> : <h2>Favorites:</h2>}
        <ul id="favorites-list">
          {favorites.map((book) => (
            <li className="card" key={book.id}>
              <FavoriteBtn book={book} />

              <Link
                to={`/041225_react_op4_gutendex_2/books${book.id}`}
                className="card-link"
                aria-label={`View details for ${book.title}`}
              />

              <section className="favorites-item">
                <section className="img-cont">
                  <img src={book.coverImage} alt={book.title} />
                </section>

                <section className="text-cont">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">{book.author}</p>
                </section>
              </section>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
