import React, { useState } from "react";
import SensorService from "../services/sensor.service";
import ProviderSubMenu from "../components/UI/SubMenu/ProviderSubMenu";

const Sensor = () => {
  const registerSensor = useState([]);

  const [formData, setFormData] = useState({
    rewardAmount: "",
    sensorName: "",
    costPerMinute: "",
    costPerKB: "",
    brokerName: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!formData.rewardAmount) {
      validationErrors.rewardAmount = "Reward amount is required";
    }

    if (!formData.sensorName.trim()) {
      validationErrors.sensorName = "Sensor name is required";
    }

    if (!formData.costPerMinute.trim()) {
      validationErrors.costPerMinute = "Cost per minute is required";
    }

    if (!formData.costPerKB.trim()) {
      validationErrors.costPerKB = "Cost per KB is required";
    }

    if (!formData.brokerName.trim()) {
      validationErrors.brokerName = "Broker name is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const params = {
        rewardAmount: +formData.rewardAmount,
        sensorName: formData.sensorName,
        costPerMinute: +formData.costPerMinute,
        costPerKB: +formData.costPerKB,
        integrationBroker: formData.brokerName,
      };

    registerSensor = SensorService.registerSensor(params);
    }
  };

  // const [rewardAmount, setRewardAmount] = useState("");
  // const handleRewardAmountChange = (event) => {
  //   setRewardAmount(event.target.value);
  //   console.log("value is:", event.target.value);
  // };

  // const [sensorName, setSensorName] = useState("");
  // const handleSensorNameChange = (event) => {
  //   setSensorName(event.target.value);

  //   console.log("value is:", event.target.value);
  // };

  // const [costPerMinute, setCostPerMinute] = useState("");
  // const handleCostPerMinuteChange = (event) => {
  //   setCostPerMinute(event.target.value);

  //   console.log("value is:", event.target.value);
  // };

  // const [costPerKB, setCostPerKB] = useState("");
  // const handleCostPerKBChange = (event) => {
  //   setCostPerKB(event.target.value);

  //   console.log("value is:", event.target.value);
  // };

  // const [brokerName, setBrokerName] = useState("");
  // const handleBrokerNameChange = (event) => {
  //   setBrokerName(event.target.value);

  //   console.log("value is:", event.target.value);
  // };

  // const sensorRegister = (e) => {
  //   e.preventDefault();

  //   const params = {
  //     rewardAmount: +rewardAmount,
  //     sensorName: sensorName,
  //     costPerMinute: +costPerMinute,
  //     costPerKB: +costPerKB,
  //     integrationBroker: brokerName,
  //   };

  //   console.log(params);
  //   registerSensor = SensorService.registerSensor(params);
  //   console.log(registerSensor);
  // };

  // const getSensors = () => {
  //   const registeredSensors = SensorService.getSensors();
  //   console.log(registeredSensors);
  // };

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
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="sensorName">Sensor Name </label>
                  <input
                    type="text"
                    id="sensorName"
                    name="sensorName"
                    className="form-control"
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {errors.sensorName && (
                    <span className="form-error">{errors.sensorName}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="costPerMinute">Cost Per Minute </label>
                  <input
                    type="number"
                    min={0}
                    id="costPerMinute"
                    name="costPerMinute"
                    className="form-control"
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {errors.costPerMinute && (
                    <span className="form-error">{errors.costPerMinute}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="costPerKB">Cost Per KB </label>
                  <input
                    type="number"
                    min={0}
                    id="costPerKB"
                    name="costPerKB"
                    className="form-control"
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {errors.costPerKB && (
                    <span className="form-error">{errors.costPerKB}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="brokerName">Broker Name </label>
                  <input
                    type="text"
                    id="brokerName"
                    name="brokerName"
                    className="form-control"
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {errors.brokerName && (
                    <span className="form-error">{errors.brokerName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="rewardAmount">Reward Amount</label>
                  <input
                    type="number"
                    min={0}
                    id="rewardAmount"
                    name="rewardAmount"
                    className="form-control"
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {errors.rewardAmount && (
                    <span className="form-error">{errors.rewardAmount}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="metaData">Extra metadata:</label>
                  <input
                    type="file"
                    name="metaData"
                    id="metaData"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group col-3 mt-3">
                  <button type="submit" className="btn btn-primary btn-block">
                    Click
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Sensor;
