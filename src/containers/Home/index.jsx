import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Service from "../../api/service";
import { getAPIConfig } from "../../api/config";
import css from "./index.module.scss";
import Link from "../../components/Link";
function Home() {
  const [pageLinks, setPageLinks] = useState({});
  useEffect(() => {
    const resp = Service.fetch(getAPIConfig("getlist"))
      .then((resp) => {
        setPageLinks(resp.data);
      })
      .catch((error) => {
        throw error;
      });
  }, []);
  const handleNavigate = () => {};
  return (
    <React.Fragment>
      <Header pageLinks={pageLinks} selectedPage={"home"} />
      <div className={css.root}>
        <h3>Welcome to Star Wars Information Center</h3>
        <p>Click on following Tabs to get Information about topics</p>
        <ul>
          {Object.entries(pageLinks).map((link) => {
            return <Link pageLink={link[0]} />;
          })}
        </ul>
      </div>
    </React.Fragment>
  );
}

export default Home;
