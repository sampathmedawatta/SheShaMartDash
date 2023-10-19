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
      
        <div className="row">
        <div className="col-6">
        <BrokerSubMenu />
          </div>
       
          <div className="col-12">
            <div class="title-heders">Broker</div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-12">

              <br />
              <div className="col-10">
              <div className="page-title">Broker Registration</div>
              <br></br>
              <form class="needs-validation" id="form-registration" novalidate method="post">
              <div class="alert alert-success alert-dismissible fade show" role="alert">
              Broker Registered Successfully</div>
              <div className="form-group">
                <label htmlFor="rewardAmount">Reward Amount*</label>
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
                />
                <div class="invalid-feedback">Please enter a reward Amount</div>
                {" "}
              </div>
              <div className="form-group">
                <label htmlFor="brokerName">Broker Name* </label>
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
                 <div class="invalid-feedback">Please enter a Broker Name</div>
              </div>
              <div className="form-group">
                <label htmlFor="endpoint">Endpoint*</label>
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
                <div class="invalid-feedback">Please enter a Endpoint</div>
              </div>
              <div className="form-group ">
                <button
                  className="btn btn-add bi-file-plus-fill"
                  onClick={brokerRegister}
                >
                  Register
                </button>
              </div>
              </form>
              </div></div>
            </div>
          </div>
        
  );
};

export default Broker;
