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
    .post(path, postData)
    .then((response) => {
      console.log(response);
      return response;
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
