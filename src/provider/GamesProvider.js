import React, { useState, createContext } from "react";
import axios from "axios";
import { message } from "antd";
import Cookies from "js-cookie";

export const GamesContext = createContext();

export const GamesProvider = (props) => {
  const [dataGames, setDataGames] = useState([]);
  const [inputGames, setInputGames] = useState({
    singlePlayer: false,
    multiplayer: false,
    genre: "",
    image_url: "",
    name: "",
    platform: "",
    release: "",
  });

  const toStringCategory = (single, multi) => {
    if (single && !multi) {
      return "SinglePlayer";
    } else if (multi && !single) {
      return "Multiplayer";
    } else {
      return "SinglePlayer & Multiplayer";
    }
  };

  const fetchData = async () => {
    const result = await axios.get(`https://backendexample.sanbersy.com/api/data-game`);
    setDataGames(
      result.data.map((data, index) => {
        return {
          no: index + 1,
          id: data.id,
          singlePlayer: data.singlePlayer,
          multiplayer: data.multiplayer,
          genre: data.genre,
          image_url: data.image_url,
          name: data.name,
          platform: data.platform,
          release: data.release,
          category: toStringCategory(data.singlePlayer, data.multiplayer),
        };
      })
    );
  };

  const fetchById = async (Id) => {
    const result = await axios.get(`https://backendexample.sanbersy.com/api/data-game/${Id}`);
    let data = result.data;
    if ((data.singlePlayer == false && data.multiplayer == false) || (data.singlePlayer == null && data.multiplayer == null)) {
      data.singlePlayer = true;
      data.multiplayer = true;
    }
    setInputGames({
      id: Id,
      singlePlayer: data.singlePlayer,
      multiplayer: data.multiplayer,
      genre: data.genre,
      image_url: data.image_url,
      name: data.name,
      platform: data.platform,
      release: data.release,
      category: toStringCategory(data.singlePlayer, data.multiplayer),
    });
  };

  const functionDelete = (id) => {
    axios
      .delete(`https://backendexample.sanbersy.com/api/data-game/${id}`, { headers: { Authorization: "Bearer " + Cookies.get("token") } })
      .then(() => {
        let newData = dataGames.filter((el) => {
          return el.id !== id;
        });
        newData.map((map, index) => {
          newData[index].no = index + 1;
        });
        setDataGames(newData);
        message.success("Delete Successful!");
      })
      .catch(() => {
        message.warning("Delete Failed!");
      });
  };

  const functionEdit = (id) => {
    axios.get(`https://backendexample.sanbersy.com/api/data-game/${id}`).then((res) => {
      let data = res.data;
      setInputGames({
        id: data.id,
        singlePlayer: data.singlePlayer,
        multiplayer: data.multiplayer,
        genre: data.genre,
        image_url: data.image_url,
        name: data.name,
        platform: data.platform,
        release: data.release,
        category: toStringCategory(data.singlePlayer, data.multiplayer),
      });
    });
  };

  const functionSubmitAdd = () => {
    axios
      .post(
        `https://backendexample.sanbersy.com/api/data-game`,
        {
          singlePlayer: inputGames.singlePlayer,
          multiplayer: inputGames.multiplayer,
          genre: inputGames.genre,
          image_url: inputGames.image_url,
          name: inputGames.name,
          platform: inputGames.platform,
          release: inputGames.release,
        },
        { headers: { Authorization: "Bearer " + Cookies.get("token") } }
      )
      .then((res) => {
        setDataGames([
          ...dataGames,
          {
            no: dataGames.at(-1).no + 1,
            id: res.data.id,
            singlePlayer: inputGames.singlePlayer,
            multiplayer: inputGames.multiplayer,
            genre: inputGames.genre,
            image_url: inputGames.image_url,
            name: inputGames.name,
            platform: inputGames.platform,
            release: inputGames.release,
            category: toStringCategory(inputGames.singlePlayer, inputGames.multiplayer),
          },
        ]);
        message.success("Data Has Been Added!");
      })
      .catch(() => {
        message.warning("Data Add Failed!");
      });
  };

  const functionSubmitUpdate = (id) => {
    axios
      .put(
        `https://backendexample.sanbersy.com/api/data-game/${id}`,
        {
          singlePlayer: inputGames.singlePlayer,
          multiplayer: inputGames.multiplayer,
          genre: inputGames.genre,
          image_url: inputGames.image_url,
          name: inputGames.name,
          platform: inputGames.platform,
          release: inputGames.release,
        },
        { headers: { Authorization: "Bearer " + Cookies.get("token") } }
      )
      .then(() => {
        let singleData = dataGames.find((el) => el.id == id);
        singleData.id = id;
        singleData.singlePlayer = inputGames.singlePlayer;
        singleData.multiplayer = inputGames.multiplayer;
        singleData.genre = inputGames.genre;
        singleData.image_url = inputGames.image_url;
        singleData.name = inputGames.name;
        singleData.platform = inputGames.platform;
        singleData.release = inputGames.release;
        singleData.category = toStringCategory(inputGames.singlePlayer, inputGames.multiplayer);
        setDataGames([...dataGames]);
        message.success("Data Has Been Edited!");
      })
      .catch(() => {
        message.warning("Data Edit Failed!");
      });
  };

  const functions = {
    fetchData,
    functionDelete,
    functionEdit,
    functionSubmitAdd,
    functionSubmitUpdate,
    fetchById,
  };

  return <GamesContext.Provider value={{ dataGames, setDataGames, inputGames, setInputGames, functions }}>{props.children}</GamesContext.Provider>;
};
