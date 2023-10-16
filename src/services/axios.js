// axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://136.186.108.239:4001/",
  withCredentials: false, // Allow cookies to be sent with requests (if applicable)
});

const headers = {
  "Content-Type": "application/json",
  //Authorization: "Bearer your-access-token", // Add any custom headers as needed
};

// Set up default headers for all requests
// axiosInstance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
// axiosInstance.defaults.headers.common["Access-Control-Allow-Methods"] =
//   "GET, POST, PUT, DELETE";
// axiosInstance.defaults.headers.common["Access-Control-Allow-Headers"] =
//   "Authorization, Content-Type";

const get = (path, getData) => {
  return axiosInstance
    .get(path, getData, headers)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

const post = (path, postData) => {
  axiosInstance
    .post(path, postData, headers)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

const AxiosService = {
  get,
  post,
};

export default AxiosService;