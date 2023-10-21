import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://136.186.108.239:4001/",
  withCredentials: false, // Allow cookies to be sent with requests (if applicable)
});

const headers = {
  "Content-Type": "application/json",
  //Authorization: "Bearer your-access-token", // Add any custom headers as needed
};

const getSensors = () => {
  return axiosInstance
    .get("/Sensors", headers)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

const querySensor = (payload) => {
     axiosInstance
       .post("/sparql", payload, headers)
       .then((response) => {
         console.log(response);
         return response;
       })
       .catch((error) => {
         console.error(error);
       });

//   const params = {
//     query: payload,
//   };
//   const tempres = {
//     result: true,
//     values: [],
//   };
//   return tempres;
};

const registerSensor = async (params) => {
  await axiosInstance
    .post("/sensorRegistration", params, headers)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
};

const SensorService = {
  getSensors,
  registerSensor,
  querySensor,
};

export default SensorService;
