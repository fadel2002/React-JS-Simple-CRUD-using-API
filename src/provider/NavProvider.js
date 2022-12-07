import Cookies from "js-cookie";
import React, { useState, createContext } from "react";

export const NavContext = createContext();

export const NavProvider = (props) => {
  const [color, setColor] = useState(1);

  const handleSetColor = () => {
    setColor(!color);
  };

  const func = {
    handleSetColor,
  };

  return <NavContext.Provider value={{ color, setColor, func }}>{props.children}</NavContext.Provider>;
};
