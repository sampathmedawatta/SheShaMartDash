import axios from "./axios";

const getWallet = () => {
  return axios
    .get("/Balance")
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
