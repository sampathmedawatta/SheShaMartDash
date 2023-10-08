import React, { useState, useEffect, useRef } from "react";
import BrokerService from "../services/broker.service";

const Broker = () => {
  const registerBroker = useState([]);

  const [rewardAmount, setRewardAmount] = useState("");
  const handleRewardAmountChange = (event) => {
    setRewardAmount(event.target.value);
    console.log("value is:", event.target.value);
  };

  const [brokerName, setBrokerName] = useState("");
  const handleBrokerNameChange = (event) => {
    setBrokerName(event.target.value);

    console.log("value is:", event.target.value);
  };

  const [endpoint, setEndpoint] = useState("");
  const handleEndpointChange = (event) => {
    setEndpoint(event.target.value);

    console.log("value is:", event.target.value);
  };

  const brokerRegister = (e) => {
    e.preventDefault();

    const params = {
      rewardAmount: +rewardAmount,
      brokerName: brokerName,
      endpoint: endpoint,
    };

    console.log(params);
    registerBroker = BrokerService.registerBroker(params);
    console.log(registerBroker);
  };

  const getBrokers = () => {
   const registeredBrokers = BrokerService.getBrokers();
    console.log(registeredBrokers);
  };

  //const registeredBrokers = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     registeredBrokers = BrokerService.getBrokers();
  //   }
  //   fetchData();
  // }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Broker</h3>
      </header>
      <div className="col-md-12">
        <div className="card card-container">
          <div className="form-group">
            <button className="btn btn-primary btn-block" onClick={getBrokers}>
              Get Broker List
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="rewardAmount">Reward Amount</label>
            <input
              type="number"
              min={0}
              id="rewardAmount"
              className="form-control"
              name="rewardAmount"
              onChange={handleRewardAmountChange}
              value={rewardAmount}
              autoComplete="off"
            />{" "}
          </div>
          <div className="form-group">
            <label htmlFor="brokerName">Broker Name </label>
            <input
              type="text"
              id="brokerName"
              className="form-control"
              name="brokerName"
              onChange={handleBrokerNameChange}
              value={brokerName}
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="endpoint">Endpoint </label>
            <input
              type="text"
              id="endpoint"
              className="form-control"
              name="endpoint"
              onChange={handleEndpointChange}
              value={endpoint}
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <button
              className="btn btn-primary btn-block"
              onClick={brokerRegister}
            >
              Click
            </button>
            <br></br>
            <span>rewardAmount: {rewardAmount}</span> <br></br>
            <span>brokerName: {brokerName}</span>
            <br></br>
            <span>endpoint: {endpoint}</span>
            <br></br>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Broker;
