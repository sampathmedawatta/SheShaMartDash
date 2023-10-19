import React, { useState, useEffect, useRef } from "react";
import SensorService from "../services/sensor.service";
import { Context } from "../context/context";
import { Link } from "react-router-dom";
import ProviderSubMenu from "../components/UI/SubMenu/ProviderSubMenu";

const Sensor = () => {
  const registerSensor = useState([]);

  const [rewardAmount, setRewardAmount] = useState("");
  const handleRewardAmountChange = (event) => {
    setRewardAmount(event.target.value);
    console.log("value is:", event.target.value);
  };

  const [sensorName, setSensorName] = useState("");
  const handleSensorNameChange = (event) => {
    setSensorName(event.target.value);

    console.log("value is:", event.target.value);
  };

  const [costPerMinute, setCostPerMinute] = useState("");
  const handleCostPerMinuteChange = (event) => {
    setCostPerMinute(event.target.value);

    console.log("value is:", event.target.value);
  };

  const [costPerKB, setCostPerKB] = useState("");
  const handleCostPerKBChange = (event) => {
    setCostPerKB(event.target.value);

    console.log("value is:", event.target.value);
  };

  const [brokerName, setBrokerName] = useState("");
  const handleBrokerNameChange = (event) => {
    setBrokerName(event.target.value);

    console.log("value is:", event.target.value);
  };

  const sensorRegister = (e) => {
    e.preventDefault();

    const params = {
      rewardAmount: +rewardAmount,
      sensorName: sensorName,
      costPerMinute: +costPerMinute,
      costPerKB: +costPerKB,
      integrationBroker: brokerName,
    };

    console.log(params);
    registerSensor = SensorService.registerSensor(params);
    console.log(registerSensor);
  };

  const getSensors = () => {
    const registeredSensors = SensorService.getSensors();
    console.log(registeredSensors);
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row-8">
          <div className="col-8 my-3">
            <div class="title-heders">Provider</div>
          </div>
        </div>
        <ProviderSubMenu />
        <div className="row">
          <div className="col-12">
              <h3>Register Sensor</h3>
              <br />
              <div className="form-group">
                <label htmlFor="sensorName">Sensor Name </label>
                <input
                  type="text"
                  id="sensorName"
                  name="sensorName"
                  className="form-control"
                  onChange={handleSensorNameChange}
                  value={sensorName}
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label htmlFor="costPerMinute">Cost Per Minute </label>
                <input
                  type="number"
                  min={0}
                  id="costPerMinute"
                  name="costPerMinute"
                  className="form-control"
                  onChange={handleCostPerMinuteChange}
                  value={costPerMinute}
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label htmlFor="costPerKB">Cost Per KB </label>
                <input
                  type="number"
                  min={0}
                  id="costPerKB"
                  name="costPerKB"
                  className="form-control"
                  onChange={handleCostPerKBChange}
                  value={costPerKB}
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label htmlFor="brokerName">Broker Name </label>
                <input
                  type="text"
                  id="brokerName"
                  name="brokerName"
                  className="form-control"
                  onChange={handleBrokerNameChange}
                  value={brokerName}
                  autoComplete="off"
                />
              </div>

              <div className="form-group">
                <label htmlFor="rewardAmount">Reward Amount</label>
                <input
                  type="number"
                  min={0}
                  id="rewardAmount"
                  name="rewardAmount"
                  className="form-control"
                  onChange={handleRewardAmountChange}
                  value={rewardAmount}
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <button
                  className="btn btn-primary btn-block"
                  onClick={sensorRegister}
                >
                  Click
                </button>
                <br></br>
                <span>rewardAmount: {rewardAmount}</span>
                <br></br>
                <span>brokerName: {brokerName}</span>
                <br></br>
                <span>sensorName: {sensorName}</span>
                <br></br>
                <span>costPerMinute: {costPerMinute}</span>
                <br></br>
                <span>costPerKB: {costPerKB}</span>
                <br></br>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Sensor;
