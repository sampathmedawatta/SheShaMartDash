import axios from "./axios";

const headers = {
  "Content-Type": "application/json",
  //Authorization: "Bearer your-access-token", // Add any custom headers as needed
};
const getSensors = () => {
  return axios
    .get("/Sensors", {
      headers,
    })
    .then((response) => {
      return response.data;
    });
};

const parms = {
  rewardAmount: 0,
  sensorName: "TDP Sensor with meta",
  costPerMinute: 1,
  costPerKB: 2,
  integrationBroker: "broker1",
};

const registerSensor = () => {
  return axios
    .post("/SensorRegistration", parms, {
      headers,
    })
    .then((response) => {
      return response.data;
    });
};

const SensorService = {
  getSensors,
  registerSensor,
};

export default SensorService;
