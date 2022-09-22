import React, { useEffect, useState } from "react";
import { useNavigate } from "@reach/router";
import css from "./index.module.scss";
export default function Link(props) {
  const navigate = useNavigate();
  const { pageLink } = props;
  const handleNavigate = (path) => {
    navigate(`/page/${path.toLowerCase()}`);
  };

  return <li onClick={(e) => handleNavigate(pageLink)}>{pageLink.toUpperCase()}</li>;
}
