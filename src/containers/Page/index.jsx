import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Service from "../../api/service";
import { getAPIConfig } from "../../api/config";
import css from "./index.module.scss";
function Page({ pageApi }) {
  const [pageLinks, setPageLinks] = useState({});
  const [pageData, setPageData] = useState({});
  useEffect(() => {
    const resp = Service.fetch(getAPIConfig("getlist"))
      .then((resp) => {
        setPageLinks(resp.data);
      })
      .catch((error) => {
        throw error;
      });
  }, []);
  useEffect(() => {
    const resp = Service.fetch(getAPIConfig("getApiData"), {
      postData: { apiPath: `/${pageApi}` },
    })
      .then((resp) => {
        setPageData(resp.data);
      })
      .catch((error) => {
        throw error;
      });
  }, [pageApi]);
  console.log(pageData.results, "pagedata");
  const firstRow = pageData?.results?.length && pageData?.results[0];

  return (
    <React.Fragment>
      <Header pageLinks={pageLinks} selectedPage={pageApi} />
      <div className={css.root}>
        <h3>Information about {pageApi}</h3>
        <table id="customers">
          <tr>
            {firstRow &&
              Object.entries(firstRow).map((itm) => {
                return <th>{itm[0]}</th>;
              })}
          </tr>

          {pageData?.results?.length &&
            pageData.results.map((val) => {
              return (
                <>
                  <tr>
                    {Object.entries(val).map((itm) => {
                      console.log(itm[1]);
                      return <td className={css.sub}>{itm[1]}</td>;
                    })}
                  </tr>
                </>
              );
            })}
        </table>
      </div>
    </React.Fragment>
  );
}

export default Page;
