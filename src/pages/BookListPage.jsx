/* JSX
BookListPage.jsx
*/



import { useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAppState } from "../context/AppStateContext";
import { useBooksData } from "../hooks/useBooksData";

import Loading from "../Components/Loading.jsx";
import FavoriteBtn from "../Components/FavoriteBtn.jsx";

export default function BookListPage() {

  const { books, isLoading, isLoadingMore, nextUrl } = useAppState();
  const { loadMore } = useBooksData();

  // BookMark: Les mer om useRef, useCallback
  const observerRef = useRef();

  const lastBookRef = useCallback(
    (node) => {
      if (isLoadingMore) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextUrl) {
          loadMore(nextUrl);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isLoadingMore, nextUrl, loadMore]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  if (isLoading) return <Loading />;

  return (
    <section id="BookList-cont">
      {!books[0] ? <h2>No Results Found...</h2> : <h2>Results:</h2>}
      <ul id="results-cont">
        {books.map((book, index) => (
          <li
            className="card"
            key={book.id}
            ref={index === books.length - 1 ? lastBookRef : null}
          >
            <FavoriteBtn book={book} />

            <Link
              to={`/books/${book.id}`}
              className="card-link"
              aria-label={`View details for ${book.title}`}
            />

            <section className="BookList-item">
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
      {isLoadingMore && (
        <div>
          <Loading />
        </div>
      )}
      {!nextUrl && books.length > 0 && <p>No more books to load</p>}
    </section>
  );
}
