import React, { useState, createContext } from "react";

export const MenuKeysContext = createContext();

export const MenuKeysProvider = (props) => {
  const rootSubmenuKeys = ["sub1", "sub2", "sub3", "sub4", "sub5"];
  const [openKeys, setOpenKeys] = useState([]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return <MenuKeysContext.Provider value={{ openKeys, setOpenKeys, onOpenChange }}>{props.children}</MenuKeysContext.Provider>;
};
