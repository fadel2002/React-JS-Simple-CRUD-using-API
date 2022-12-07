import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { GamesContext } from "../provider/GamesProvider";

const GamesForm = () => {
  const { dataGames, setDataGames, inputGames, setInputGames, functions } = useContext(GamesContext);
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
    // console.log(inputGames);

    setInputGames({ ...inputGames, [name]: value });
  };

  const handleSubmit = (event) => {
    // console.log(event.currentTarget);
    event.preventDefault();
    if (Id === undefined) {
      functionSubmitAdd();
    } else {
      functionSubmitUpdate(Id);
    }
    setInputGames([]);
    history.push("/games");
  };

  const hadleCheckedS = () => {
    setInputGames({ ...inputGames, singlePlayer: !inputGames.singlePlayer });
    // console.log(inputGames.singlePlayer);
  };

  const hadleCheckedM = () => {
    setInputGames({ ...inputGames, multiplayer: !inputGames.multiplayer });
    // console.log(inputGames.multiplayer);
  };

  return (
    <div className="wrap-paper card">
      <h1 className="text-header" style={{ textAlign: "center" }}>
        Form
      </h1>
      <form onSubmit={handleSubmit} className="formBox">
        <label htmlFor="name">
          <b>Name</b>
          <br />
        </label>
        <input id="name" type="text" name="name" value={inputGames.name} onChange={handleChange} required style={{ width: "100%" }} />

        <label htmlFor="release">
          <b>Release</b>
          <br />
        </label>
        <input id="release" type="number" name="release" value={inputGames.release} onChange={handleChange} required style={{ width: "100%" }} min="2000" max="2021" />

        <label htmlFor="genre">
          <b>Genre</b>
          <br />
        </label>
        <input id="genre" type="text" name="genre" value={inputGames.genre} onChange={handleChange} required style={{ width: "100%" }} />

        <label htmlFor="platform">
          <b>Platform</b>
          <br />
        </label>
        <input id="platform" type="text" name="platform" value={inputGames.platform} onChange={handleChange} required style={{ width: "100%" }} max="5" min="0" />

        <label htmlFor="image_url">
          <b>Image Url</b>
          <br />
        </label>
        <input id="image_url" type="text" name="image_url" value={inputGames.image_url} onChange={handleChange} required style={{ width: "100%" }} />

        <label>
          <b>Category</b>
          <br />
        </label>
        <input type="checkbox" id="singlePlayer" name="singlePlayer" value={inputGames.singlePlayer} onChange={hadleCheckedS} checked={inputGames.singlePlayer} />
        <label htmlFor="singlePlayer"> SinglePlayer</label>
        <br />
        {/* checked={}  */}
        <input type="checkbox" id="multiplayer" name="multiplayer" value={inputGames.multiplayer} onChange={hadleCheckedM} checked={inputGames.multiplayer} />
        <label htmlFor="multiplayer"> Multiplayer</label>

        <br />
        <br />
        <button id="submit" style={{ width: "80px" }}>
          Submit
        </button>
        <br />
        <br />
        <Link to="/games">Kembali Ke Tabel</Link>
      </form>
    </div>
  );
};

export default GamesForm;
