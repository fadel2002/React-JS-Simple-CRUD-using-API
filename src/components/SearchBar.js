import React, { useState, createContext, useContext, useEffect } from "react";

export const SearchContext = createContext();

export const SearchProvider = (props) => {
  const { dataGames, setDataGames, inputGames, setInputGames } = useContext(GamesContext);

  const { dataMovies, setDataMovies, inputMovies, setInputMovies } = useContext(MoviesContext);

  const [input, setInput] = useState();
  const [output, setOutput] = useState([]);

  const funcSearch = (str, num) => {
    if (num === 1) {
      const filtered = dataGames.filter((data) => {
        return data.name.toLowerCase().includes(str.toLowerCase());
      });
    } else {
      const filtered = dataMovies.filter((data) => {
        return data.name.toLowerCase().includes(str.toLowerCase());
      });
    }

    setOutput(filtered);
  };

  const searchFunctions = {
    funcSearch,
  };

  return <SearchContext.Provider value={{ input, setInput, output, setOutput, searchFunctions }}>{props.children}</SearchContext.Provider>;
};
