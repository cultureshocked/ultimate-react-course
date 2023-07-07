import { useState, useEffect } from "react";

const KEY = "3592dc3a";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      callback?.();
      const controller = new AbortController();
      async function fetchMovieList() {
        setError("");
        if (query === "") return;
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) {
            throw new Error("Something went wrong. Check your connection.");
          }
          const data = await res.json();

          if (data.Response === "False")
            throw new Error("No results for the provided search.");
          setMovies(data.Search);
          return function () {
            controller.abort();
          };
        } catch (err) {
          console.log(err);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovieList();
    },
    [query]
  );

  return { movies, isLoading, error };
}
