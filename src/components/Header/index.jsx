import React, { useEffect, useState } from "react";

import { useNavigate } from "@reach/router";

import logo from "./logo.png";
import css from "./index.module.scss";
export default function Header(props) {
  const navigate = useNavigate();

  const { selectedPage, pageLinks } = props;
  const handleNavigate = (path) => {
    navigate(`/page/${path.toLowerCase()}`);
  };

  console.log(props);
  // const pageLinks = ["Movies", "Characters", "Planets", "Species", "Vehicles", "Starships"];
  return (
    <header className={css.root}>
      <div className={css.logo} onClick={() => navigate("/")}>
        <img src={logo} alt="logo" />
      </div>
      <div className={css.nav}>
        <ul>
          {pageLinks &&
            Object.entries(pageLinks).map((link) => {
              return (
                <li
                  className={selectedPage.toLowerCase() === link[0].toLowerCase() ? css.active : ""}
                  onClick={(e) => handleNavigate(link[0])}
                >
                  {link[0].toUpperCase()}
                </li>
              );
            })}
        </ul>
      </div>
    </header>
  );
}
