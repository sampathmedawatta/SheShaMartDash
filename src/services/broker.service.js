import { useEffect } from "react";
import axios from "./axios";

const headers = {
  "Content-Type": "application/json",
  //Authorization: "Bearer your-access-token", // Add any custom headers as needed
};

const getBrokers = () => {

      return axios
        .get("/Brokers", {
          headers,
        })
        .then((response) => {
          return response.data;
        });
};

const registerBroker = (parms) => {
  return axios
    .post("/BrokerRegistration", parms, {
      headers,
    })
    .then((response) => {
      return response.data;
    });
};

const BrokerService = {
  getBrokers,
  registerBroker,
};

export default BrokerService;
