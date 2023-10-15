import axios from "./axios";

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
    ],
  };

  const Integration = (params) => {
    return axios.post("/integration", prms).then((response) => {
      console.log(params);
      return response.data;
    });
  };

const PaymentService = {
  Integration,
};

export default PaymentService;
