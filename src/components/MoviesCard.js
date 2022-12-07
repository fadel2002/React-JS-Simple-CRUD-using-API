import React, { useContext, useEffect } from "react";
import { MoviesContext } from "../provider/MoviesProvider";

const MoviesCard = () => {
  const { dataMovies, setDataMovies, inputMovies, setInputMovies, functions } = useContext(MoviesContext);

  const { fetchData, functionDelete, functionEdit, functionSubmitAdd, functionSubmitUpdate, fetchById } = functions;

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="wrap-paper card" id="movies-card">
      <div style={{ border: "2px solid black", marginBottom: "10px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "0px" }}>
          <b>MOVIES LIST</b>
        </h1>
        <h5 style={{ textAlign: "center" }}>Between 1980 - 2021</h5>
      </div>
      {dataMovies.map((item, index) => {
        return (
          <React.Fragment key={item.id}>
            <div className="card-desc">
              <span>
                <img src={item.image_url} style={{ width: "60%", marginTop: "10px" }} />
              </span>
              <span>
                <h2 style={{ marginBottom: "0px" }}>{item.title}</h2>
                <span style={{ width: "80%" }}>
                  <p style={{ marginBottom: "5px" }}>{item.description}</p>
                  <div class="grid-container">
                    <div>Release Year</div>
                    <div>:</div>
                    <div>{item.year}</div>
                    <div>Genre</div>
                    <div>:</div>
                    <div>{item.genre}</div>
                    <div>Duration</div>
                    <div>:</div>
                    <div>{item.duration}</div>
                    <div>Rating</div>
                    <div>:</div>
                    <div>{item.rating}</div>
                    <div>Review</div>
                    <div>:</div>
                    <div>{item.review}</div>
                  </div>
                </span>
              </span>
            </div>
            <hr />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default MoviesCard;
