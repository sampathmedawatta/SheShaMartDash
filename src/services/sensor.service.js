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

  const params = {

      "result": true,
      "values": [
          {
              "lat": {
                  "termType": "Literal",
                  "value": "-37.821658",
                  "language": "",
                  "datatype": {
                      "termType": "NamedNode",
                      "value": "http://www.w3.org/2001/XMLSchema#string"
                  }
              },
              "long": {
                  "termType": "Literal",
                  "value": "145.03904",
                  "language": "",
                  "datatype": {
                      "termType": "NamedNode",
                      "value": "http://www.w3.org/2001/XMLSchema#string"
                  }
              },
              "measures": {
                  "termType": "Literal",
                  "value": "video",
                  "language": "",
                  "datatype": {
                      "termType": "NamedNode",
                      "value": "http://www.w3.org/2001/XMLSchema#string"
                  }
              },
              "sensor": {
                  "termType": "NamedNode",
                  "value": "test sensor"
              }
          }
      ]
  }
 /* const params = {
    query: payload,
  };
console.log(params)
  return axiosInstance
    .post("/sparql", params, headers)
    .then((response) => {
      console.log(response);
      return response;
     
    })
    .catch((error) => {
      console.error(error);
      throw error; // Optionally re-throw the error to be handled later
    });*/
    return params
};
/*
//   const params = {
//     query: payload,
//   };
//   const tempres = {
//     result: true,
//     values: [],
//   };
//   return tempres;
};*/

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
