import React, { useState, useEffect, useRef, useContext } from "react";
import BrokerService from "../services/broker.service";

import { Context } from "../context/context";

import BrokerSubMenu from "../components/UI/SubMenu/BrokerSubMenu";

const Broker = () => {
  const registerBroker = useState([]);

  const [rewardAmount, setRewardAmount] = useState("");
  const handleRewardAmountChange = (event) => {
    setRewardAmount(event.target.value);
  };

  const [brokerName, setBrokerName] = useState("");
  const handleBrokerNameChange = (event) => {
    setBrokerName(event.target.value);
  };

  const [endpoint, setEndpoint] = useState("");
  const handleEndpointChange = (event) => {
    setEndpoint(event.target.value);
  };

  const brokerRegister = (e) => {
    e.preventDefault();

    const params = {
      rewardAmount: +rewardAmount,
      brokerName: brokerName,
      endpoint: endpoint,
    };

    registerBroker = BrokerService.registerBroker(params);

  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-8 my-3">
            <h3>Broker</h3>
          </div>
        </div>
        <BrokerSubMenu />
        <div className="row">
          <div className="col-12">
            <div className="card">
              <h3>Register Broker</h3>
              <br />
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
                  required
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
                  required
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
                  required
                />
              </div>
              <div className="form-group col-3 mt-3">
                <button
                  className="btn btn-primary btn-block"
                  onClick={brokerRegister}
                >
                  Click
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Broker;
