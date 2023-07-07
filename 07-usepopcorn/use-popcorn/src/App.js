import { useState, useEffect, useRef } from "react";
import StarRating from "./StarRating";
import { useMovies } from "./useMovies.js";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function Search({ setQuery }) {
  const [input, setInput] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(input);
  };
  const inputElement = useRef(null);

  const focusSearchBar = () => {
    if (document.activeElement === inputElement.current) return;
    inputElement.current.focus();
    setInput("");
    setQuery("");
  };

  useKey("Enter", focusSearchBar);

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        ref={inputElement}
      />
    </form>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen ? children : null}
    </div>
  );
}

function MovieList({ movies, setSelectedMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MovieListItem
          movie={movie}
          key={movie.imdbID}
          setSelectedMovie={setSelectedMovie}
        />
      ))}
    </ul>
  );
}

function MovieListItem({ movie, setSelectedMovie }) {
  return (
    <li key={movie.imdbID} onClick={() => setSelectedMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedMoviesList({ watched, onDelete }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} onDelete={onDelete} />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDelete }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button className="btn-delete" onClick={() => onDelete(movie.imdbID)}>
          &times;
        </button>
      </div>
    </li>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(
    watched.map((movie) => movie.imdbRating)
  ).toFixed(1);
  const avgUserRating = average(
    watched.map((movie) => movie.userRating)
  ).toFixed(1);
  const avgRuntime = average(watched.map((movie) => movie.runtime)).toFixed(0);
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  updateMovie,
  watched,
  defaultRating,
  defaultRatingCount,
  isInList,
}) {
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState(
    defaultRating ? defaultRating : 0
  );

  const countRef = useRef(defaultRatingCount ? defaultRatingCount : 0);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Genre: genre,
    Director: director,
  } = movie;

  useEffect(
    function () {
      const controller = new AbortController();
      const fetchMovieData = async () => {
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("Check your connection.");
          const data = await res.json();
          setMovie(data);
        } catch (err) {
          if (err.name !== "AbortError") setErr(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchMovieData();
      return function () {
        controller.abort();
      };
    },
    [selectedId]
  );

  useEffect(
    function () {
      document.title = `Movie | ${title}`;
      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  useEffect(
    function () {
      countRef.current = userRating ? countRef.current + 1 : 0;
    },
    [userRating]
  );

  useKey("Escape", onCloseMovie);

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      Title: title,
      Year: year,
      Poster: poster,
      imdbRating: imdbRating !== "N/A" ? Number(imdbRating) : 0,
      runtime: runtime !== "N/A" ? Number(runtime.split(" ").at(0)) : 0,
      userRating,
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  };

  const handleUpdate = () => {
    const updatedMovie = {
      imdbID: selectedId,
      Title: title,
      Year: year,
      Poster: poster,
      imdbRating: imdbRating !== "N/A" ? Number(imdbRating) : 0,
      runtime: runtime !== "N/A" ? Number(runtime.split(" ").at(0)) : 0,
      userRating,
      countRatingDecisions: countRef.current,
    };
    updateMovie(updatedMovie);
    onCloseMovie();
  };

  return (
    <div className="details">
      {isLoading ? <Loader /> : null}
      {!isLoading && !err ? (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title}`} />

            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isInList ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                    defaultRating={userRating}
                  />

                  <button className="btn-add" onClick={handleUpdate}>
                    + Add Rating
                  </button>
                </>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 ? (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add Rating
                    </button>
                  ) : null}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      ) : null}
      {err ? <ErrorMessage msg={err} /> : null}
    </div>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ msg }) {
  return <p className="error">⛔{msg}⛔</p>;
}

const KEY = "3592dc3a";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query, () =>
    setSelectedId(null)
  );

  const [watched, setWatched] = useLocalStorageState([], "watched");

  const handleSelectMovie = (id) => {
    setSelectedId(id === selectedId ? null : id);
  };

  const resetSelectedMovie = () => {
    setSelectedId(null);
  };

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
    //localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  };

  const handleDelete = (id) => {
    setWatched((w) => {
      return w.filter((mv) => mv.imdbID !== id);
    });
  };

  const handleUpdateWatched = (movie) => {
    setWatched((watched) =>
      watched.map((mv) => (mv.imdbID === movie.imdbID ? movie : mv))
    );
  };

  const isInWatched = (id) => {
    return watched.some((mv) => mv.imdbID === id);
  };

  const getUserRating = (id) => {
    for (let i = 0; i < watched.length; ++i) {
      if (id === watched[i].imdbID) return watched[i].userRating;
    }
    return null;
  };

  const getUserRatingCount = (id) => {
    for (let i = 0; i < watched.length; ++i) {
      if (id === watched[i].imdbID) return watched[i].countRatingDecisions;
    }
    return null;
  };

  return (
    <>
      <NavBar>
        <Logo />
        <Search setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading ? <Loader /> : null} {/* Loading*/}
          {!isLoading && !error ? (
            <MovieList movies={movies} setSelectedMovie={handleSelectMovie} />
          ) : null}
          {/* No load, no err*/}
          {error ? <ErrorMessage msg={error} /> : null} {/* err */}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={resetSelectedMovie}
              onAddWatched={handleAddWatched}
              updateMovie={handleUpdateWatched}
              watched={watched}
              defaultRating={getUserRating(selectedId)}
              defaultRatingCount={getUserRatingCount(selectedId)}
              isInList={isInWatched(selectedId)}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} onDelete={handleDelete} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
