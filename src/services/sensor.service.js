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

const querySensor = async(payload) => {
     const response = await axiosInstance
       .post("/sparql", payload, headers);
       
       console.log(response);
       return response;

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
  const response = await axiosInstance.post(
    "/sensorRegistration",
    params,
    headers
  );

  console.log(response);
    return response;
};

const SensorService = {
  getSensors,
  registerSensor,
  querySensor,
};

export default SensorService;
