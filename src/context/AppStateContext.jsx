/* JSX
AppStateContext.jsx
*/

import { createContext, useContext, useState, useEffect } from "react";

const AppStateContext = createContext();

export function AppStateProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [nextUrl, setNextUrl] = useState(null);

  // Session Storage:
  useEffect(() => {
    const cached = sessionStorage.getItem("books");
    if (cached) {
      setBooks(JSON.parse(cached));
    }
  }, []);

  // Load favorites once
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  // Persist favorites
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <AppStateContext.Provider
      value={{
        books,
        setBooks,

        favorites,
        setFavorites,

        error,
        setError,

        isLoading,
        setIsLoading,

        isLoadingMore,
        setIsLoadingMore,

        nextUrl,
        setNextUrl,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return context;
}
