import { Button } from "antd";
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import photo from "../profile.jpg";

const About = () => {
  let history = useHistory();

  const backToHome = (event) => {
    history.push("/");
  };

  return (
    <div className="wrap-paper card">
      <div className="about">
        <h1>Data Profile</h1> <br />
        <li style={{ listStyle: "none" }}>
          <img src={photo} className="about-img" />
        </li>
        <li>
          <b>Nama</b>: Fadel Pramaputra Maulana
        </li>
        <li>
          <b>Email</b>: fadelpm2002@gmail.com
        </li>
        <li>
          <b>Gitlab</b>: <a href="https://gitlab.com/fadelpm2002">fadelpm2002</a>
        </li>
        <li>
          <b>Github</b>: <a href="https://github.com/fadel2002">fadel2002</a>
        </li>
        <li>
          <b>Instagram</b>: <a href="https://www.instagram.com/pmfadel/">@pmfadel</a>
        </li>
        <br />
      </div>
      <Button type="primary" onClick={backToHome}>
        Back To Home
      </Button>
    </div>
  );
};

export default About;
