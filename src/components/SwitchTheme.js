import React, { useContext, useEffect } from "react";
import { Switch } from "antd";
import { NavContext } from "../provider/NavProvider";

const SwitchTheme = () => {
  const { color, setColor, func } = useContext(NavContext);

  const { handleSetColor } = func;

  return (
    <div style={{ position: "absolute", right: 20, top: -4 }}>
      <Switch onClick={handleSetColor} checkedChildren="Light" unCheckedChildren="Dark" checked={color} />
    </div>
  );
};

export default SwitchTheme;
