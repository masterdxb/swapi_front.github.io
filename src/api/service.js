import axios from "axios";
import ApplicationError from "../utils/ApplicationError";

// import request from 'request';
// import {
//   generateHeaders,
//   detectLocale,
//   getRequestConfigForLogging,
//   // getSummaryObjectForApiResponseTime,
//   getHistogramObjectForApiResponseTime,
// } from '../utils/Helpers';
// import Logger from '../utils/Logger';

// // const summary = getSummaryObjectForApiResponseTime();
// const histogram = getHistogramObjectForApiResponseTime();

// TODO: Intercept all responses for data and time logging purposes

class Service {
  /**
   * The base fetch method to get data from APIs
   * @param {Object} requestConfig
   * @param {String} requestConfig.method Method of request. Eg. GET, POST, PUT, DELETE, PATCH.
   * @param {String} requestConfig.base Base domain of the request. This is the part of the URL before the path.
   * @param {String} requestConfig.path Path of the request.
   * @param {String} requestConfig.timeout Timout of the request in milliseconds.
   * @param {Object} requestData
   * @param {Object} requestData.params The GET parameters for the request.
   * @param {Object} requestData.headers Custom headers that need to be part of the request.
   * @param {Object} requestData.postData The POST data for the request.
   * @return {Promise} Returns the promise object for the request.
   */
  static fetch(
    { method = "GET", base = "", path, timeout = 0 } = {},
    { params = {}, headers = {}, postData = {} } = {}
  ) {
    const defaultHeaders = {};
    const defaultParams = {};

    let requestData = {};
    if (Object.keys(postData).length > 0) {
      requestData.data = postData;
    }

    const requestHeaders = { ...defaultHeaders };
    const requestParams = { ...defaultParams, ...params };
    const requestEndpoint = base + path;
    const requestMethod = method.toUpperCase();
    const requestConfig = {
      url: requestEndpoint,
      method: requestMethod,
      headers: requestHeaders,
      params: requestParams,
      ...(requestMethod !== "GET" ? requestData : {}),
      responseType: "json",
      // proxy: {
      //   protocol: 'http',
      //   host: 'localhost',
      //   port: 8081,
      // },
    };

    return new Promise((resolve, reject) => {
      axios(requestConfig)
        .then((response) => {
          if (response.status === 200) {
            resolve({
              data: response.data,
              status: response.status,
              headers: response.headers,
            });
          } else {
            const error = new Error();
            error.data = response.data;
            error.status = response.status;
            error.headers = response.headers;

            reject(error);
          }
        })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status === 401) {
              console.log(error.response.status);
              //  handle401();
              error.response.handleRefresh = true;
            }
            reject(new ApplicationError({ error: error.response.data, status: error.response.status }));
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            reject(new ApplicationError({ message: "No response from server" }));
          } else {
            // Something happened in setting up the request that triggered an Error

            reject(
              new ApplicationError({
                message: "Something happened in setting up the request that triggered an Error",
              })
            );
          }
          reject(new ApplicationError({ error: error.response.data }));
        });
    });
  }
}

export default Service;
