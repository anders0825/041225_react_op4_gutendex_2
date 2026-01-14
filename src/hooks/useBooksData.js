/* JS
useBooksData.js
*/

import { useAppState } from "../context/AppStateContext";
import booksAPI from "../services/API/booksAPI";

export function useBooksData() {
  const { setBooks, setError, setIsLoading, setIsLoadingMore, setNextUrl } =
    useAppState();

  async function bySearch(query) {
    setIsLoading(true);
    setError(null);

    const result = await booksAPI.fetchBooksBySearch(query);
    setBooks(result.books);
    setNextUrl(result.nextUrl);

    sessionStorage.setItem("books", JSON.stringify(result.books));

    setIsLoading(false);
  }

  async function byCategory(category) {
    setIsLoading(true);
    setError(null);

    const result = await booksAPI.fetchBooksByTopic(category);
    setBooks(result.books);
    setNextUrl(result.nextUrl);

    sessionStorage.setItem("books", JSON.stringify(result.books));

    setIsLoading(false);
  }

  async function byId(id) {
    setIsLoading(true);
    setError(null);

    const cached = sessionStorage.getItem("books");
    const cachedBook = JSON.parse(cached)?.find((b) => b.id === Number(id));

    if (cachedBook) {
      setIsLoading(false);
      return cachedBook;
    }

    const result = await booksAPI.fetchBookById(id);

    setIsLoading(false);
    return result;
  }

  async function byFavorites() {
    setIsLoading(true);
    setError(null);

    const cached = localStorage.getItem("favorites");
    const cachedBooks = JSON.parse(cached);

    if (cachedBooks) {
      setIsLoading(false);
      setBooks(cachedBooks);
      setNextUrl(null);
    } else {
      setIsLoading(false);
      console.log("no favorites");
    }
  }

  async function loadMore(currentNextUrl) {
    if (!currentNextUrl) return;

    setIsLoadingMore(true);
    setError(null);

    const result = await booksAPI.fetchNextPage(currentNextUrl);

    if (result) {
      setBooks((prev) => [...prev, ...result.books]);
      setNextUrl(result.nextUrl);
    }

    setIsLoadingMore(false);
  }

  return { bySearch, byCategory, byId, byFavorites, loadMore };
}
