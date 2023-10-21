import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://136.186.108.239:4001/",
  withCredentials: false, // Allow cookies to be sent with requests (if applicable)
});

const headers = {
  "Content-Type": "application/json",
  //Authorization: "Bearer your-access-token", // Add any custom headers as needed
};

const getWallet = () => {
  return axiosInstance
    .get("/Balance", headers)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

const WalletService = {
  getWallet,
};

export default WalletService;
