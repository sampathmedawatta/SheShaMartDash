import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://136.186.108.239:4001/",
  withCredentials: false, // Allow cookies to be sent with requests (if applicable)
});

const headers = {
  "Content-Type": "application/json",
  //Authorization: "Bearer your-access-token", // Add any custom headers as needed
};

const getIntegrations = async() => {
  return await axiosInstance
    .get("/Integrations", headers)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

const prms = {
  rewardAmount: 0,
  witnessCount: 0,
  outputs: [
    {
      amount: 1,
      sensorName: "Camera Sensor 1",
      sensorHash:
        "ab3f54d910eaa51208a5c10e362967df6b288825ab8e3ebacf919ad8720cfe9e",
      brokerHash:
        "dd934ef395a4a9210c5318f51f9e8cdd25906eeecafb84cb40a8ffba9d9bc045",
    },
    {
      amount: 1,
      sensorName: "Camera Sensor 1",
      sensorHash:
        "ab3f54d910eaa51208a5c10e362967df6b288825ab8e3ebacf919ad8720cfe9e",
      brokerHash:
        "dd934ef395a4a9210c5318f51f9e8cdd25906eeecafb84cb40a8ffba9d9bc045",
    },
  ],
};

const Integration = async (params) => {

  console.log(params);
  const response = await axiosInstance.post("/integration", params, headers);
console.log(response);
  return response;
};

const PaymentService = {
  Integration,
  getIntegrations,
};

export default PaymentService;
