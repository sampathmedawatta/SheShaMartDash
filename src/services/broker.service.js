import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://136.186.108.239:4001/",
  withCredentials: false, // Allow cookies to be sent with requests (if applicable)
});

const headers = {
  "Content-Type": "application/json",
  //Authorization: "Bearer your-access-token", // Add any custom headers as needed
};

const getBrokers = () => {
  return axiosInstance
    .get("/Brokers", headers)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

const registerBroker = (params) => {
  axiosInstance
    .post("/BrokerRegistration", params, headers)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
};

const BrokerService = {
  getBrokers,
  registerBroker,
};

export default BrokerService;
