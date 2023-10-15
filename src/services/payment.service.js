import axios from "./axios";

const Integration = () => {
  return axios
    .get("/Integration")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

const PaymentService = {
  Integration,
};

export default PaymentService;
