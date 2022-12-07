import React, { useContext, useEffect } from "react";
import { GamesContext } from "../provider/GamesProvider";

const GamesCard = () => {
  const { dataGames, setDataGames, inputGames, setInputGames, functions } = useContext(GamesContext);

  const { fetchData, functionDelete, functionEdit, functionSubmitAdd, functionSubmitUpdate, fetchById } = functions;

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="wrap-paper card" id="games-card">
      <div style={{ border: "2px solid black", marginBottom: "10px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "0px" }}>
          <b>GAMES LIST</b>
        </h1>
        <h5 style={{ textAlign: "center" }}>Between 2000 - 2021</h5>
      </div>
      {dataGames.map((item, index) => {
        return (
          <React.Fragment key={item.id}>
            <div className="card-desc">
              <span>
                <img src={item.image_url} style={{ width: "60%", marginTop: "10px" }} />
              </span>
              <span>
                <h2 style={{ marginBottom: "0px" }}>{item.name}</h2>
                <span style={{ width: "80%" }}>
                  <div class="grid-container">
                    <div>Release Year</div>
                    <div>:</div>
                    <div>{item.release}</div>
                    <div>Genre</div>
                    <div>:</div>
                    <div>{item.genre}</div>
                    <div>Category</div>
                    <div>:</div>
                    <div>{item.category}</div>
                    <div>Platform</div>
                    <div>:</div>
                    <div>{item.platform}</div>
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

export default GamesCard;
