import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../features/movieSlice";

function MovieList() {
  const dispatch = useDispatch();
  const {
    entities: movies,
    loading,
    error,
  } = useSelector((state) => state.movies);
  const [newTitle, setNewTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [receivedAnOscar, setReceivedAnOscar] = useState(false);
  const [updatedTitles, setUpdatedTitles] = useState({}); // Håller uppdaterade titlar för varje film

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleAddMovie = () => {
    dispatch(
      addMovie({
        title: newTitle,
        releaseDate: parseInt(releaseDate, 10),
        receivedAnOscar,
      })
    );
    setNewTitle("");
    setReleaseDate("");
    setReceivedAnOscar(false);
  };

  const handleTitleChange = (id, title) => {
    setUpdatedTitles((prev) => ({ ...prev, [id]: title }));
  };

  const handleUpdateMovie = (id) => {
    if (updatedTitles[id]) {
      dispatch(updateMovie({ id, title: updatedTitles[id] }));
      setUpdatedTitles((prev) => ({ ...prev, [id]: "" })); // Rensa uppdaterad titel efter skickat
    }
  };

  return (
    <main>
      <h1>Movie List</h1>
      <input
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        value={releaseDate}
        onChange={(e) => setReleaseDate(e.target.value)}
        placeholder="Release Date"
      />
      <label>
        <input
          type="checkbox"
          checked={receivedAnOscar}
          onChange={(e) => setReceivedAnOscar(e.target.checked)}
        />
        Received an Oscar?
      </label>
      <button onClick={handleAddMovie}>Add Movie</button>
      {error && <p>Error loading movies: {error}</p>}
      {loading && <p>Loading...</p>}
      {!loading && !error && (
        <ul style={{ listStyle: "none" }}>
          {movies.map((movie) => (
            <li key={movie.id}>
              <h3>
                {movie.title} ({movie.releaseDate})
              </h3>
              <p>{movie.receivedAnOscar ? "Has an Oscar" : "No Oscar"}</p>
              <input
                value={updatedTitles[movie.id] || ""}
                onChange={(e) => handleTitleChange(movie.id, e.target.value)}
                placeholder="Update title"
              />
              <button onClick={() => handleUpdateMovie(movie.id)}>
                Update Title
              </button>
              <button onClick={() => dispatch(deleteMovie(movie.id))}>
                Delete Movie
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default MovieList;
