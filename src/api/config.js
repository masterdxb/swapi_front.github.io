import get from "lodash/get";
const apiBaseURL = "http://localhost:3002";
const apiConfig = {
  getlist: {
    method: "GET",
    base: apiBaseURL,
    path: "/api/getapilist",
  },
  getApiData: {
    method: "POST",
    base: apiBaseURL,
    path: "/api/getapiData",
  },
};

export const getAPIConfig = (path, { pathVariables = {} } = {}) => {
  let config = get(apiConfig, path);
  if (!config) {
    throw new Error("Config not found");
  }

  config = { ...config };
  config.originalPath = config.path;
  Object.entries(pathVariables).map((pathEntry) => {
    config.path = config.path.replace(pathEntry[0], pathEntry[1]);
    return pathEntry;
  });
  return config;
};

export default apiConfig;
