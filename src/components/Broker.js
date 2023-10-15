import React, { useState, useEffect, useRef, useContext } from "react";
import BrokerService from "../services/broker.service";
import Grid from "./UI/Grid/Table";
import { Context } from "../context/context";
import { Link } from "react-router-dom";

const Broker = () => {
  const registerBroker = useState([]);

  const [rewardAmount, setRewardAmount] = useState("");
  const [registeredBrokers, setRegisteredBrokers] = useState(null);
  const { setBroks } = useContext(Context);

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

  const getBrokers = async () => {
    const getList = BrokerService.getBrokers();
    if(getList !== null){
      setRegisteredBrokers(getList);
      setBroks(getList);
    }
  };
  console.log(registeredBrokers);

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-8 my-3">
            <h3>Broker</h3>
          </div>
          <div className="col-4 my-3">
            <div className="form-group">
              <Link className="btn btn-primary btn-block" to={`/brokerList`}>
                Get Broker List
              </Link>
              {/* <button
                className="btn btn-primary btn-block"
                onClick={getBrokers}
              >
                Get Broker List
              </button> */}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <h3>Register Broker</h3>
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
                {/* <br></br>
                <span>rewardAmount: {rewardAmount}</span> <br></br>
                <span>brokerName: {brokerName}</span>
                <br></br>
                <span>endpoint: {endpoint}</span>
                <br></br> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {registeredBrokers !== null && <Grid brokerList={registeredBrokers} />}
    </div>
  );
};

export default Broker;
