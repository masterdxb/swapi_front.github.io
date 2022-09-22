import React from "react";
import { Router, Redirect } from "@reach/router";
import Home from "../Home";
import Page from "../Page";

function App(...args) {
  return (
    <Router>
      <Home path="/home" />
      <Page path="/page/:pageApi" />
      <Redirect from="/" to="/home" noThrow />
      {/*<NotFound default locale={lang} />*/}
    </Router>
  );
}
export default App;
