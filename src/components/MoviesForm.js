import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { MoviesContext } from "../provider/MoviesProvider";

const MoviesForm = () => {
  const { dataMovies, setDataMovies, inputMovies, setInputMovies, functions } = useContext(MoviesContext);

  const { fetchData, functionDelete, functionEdit, functionSubmitAdd, functionSubmitUpdate, fetchById } = functions;

  let history = useHistory();
  let { Id } = useParams();

  useEffect(() => {
    if (Id !== undefined) {
      fetchById(Id);
    }
  }, [Id]);

  const handleChange = (event) => {
    let name = event.currentTarget.name;
    let value = event.currentTarget.value;
    // console.log(name, value);
    // console.log(inputMovies);

    setInputMovies({ ...inputMovies, [name]: value });
  };

  const handleSubmit = (event) => {
    // console.log(event.currentTarget);
    event.preventDefault();
    if (Id === undefined) {
      functionSubmitAdd();
    } else {
      functionSubmitUpdate(Id);
    }
    setInputMovies([]);
    history.push("/movies");
  };

  return (
    <div className="wrap-paper card">
      <h1 className="text-header" style={{ textAlign: "center" }}>
        Form
      </h1>
      <form onSubmit={handleSubmit} className="formBox">
        <label htmlFor="title">
          <b>Title</b>
          <br />
        </label>
        <input id="title" type="text" name="title" value={inputMovies.title} onChange={handleChange} required style={{ width: "100%" }} />

        <label htmlFor="year">
          <b>Year</b>
          <br />
        </label>
        <input id="year" type="number" name="year" value={inputMovies.year} onChange={handleChange} required style={{ width: "100%" }} min="1980" max="2021" />

        <label htmlFor="genre">
          <b>Genre</b>
          <br />
        </label>
        <input id="genre" type="text" name="genre" value={inputMovies.genre} onChange={handleChange} required style={{ width: "100%" }} />

        <label htmlFor="rating">
          <b>Rating</b>
          <br />
        </label>
        <input id="rating" type="number" name="rating" value={inputMovies.rating} onChange={handleChange} required style={{ width: "100%" }} max="10" min="0" />

        <label htmlFor="duration">
          <b>Duration</b>
          <br />
        </label>
        <input id="duration" type="number" name="duration" value={inputMovies.duration} onChange={handleChange} required style={{ width: "100%" }} />

        <label htmlFor="review">
          <b>Review</b>
          <br />
        </label>
        <input id="review" type="text" name="review" value={inputMovies.review} onChange={handleChange} required style={{ width: "100%" }} />

        <label htmlFor="description">
          <b>Description</b>
          <br />
        </label>
        <textarea id="description" type="text" name="description" value={inputMovies.description} onChange={handleChange} required style={{ width: "100%" }} />

        <label htmlFor="image_url">
          <b>Image Url</b>
          <br />
        </label>
        <input id="image_url" type="text" name="image_url" value={inputMovies.image_url} onChange={handleChange} required style={{ width: "100%" }} />

        <br />
        <br />
        <button id="submit" style={{ width: "80px" }}>
          Submit
        </button>
        <br />
        <br />
        <Link to="/movies">Kembali Ke Tabel</Link>
      </form>
    </div>
  );
};

export default MoviesForm;
