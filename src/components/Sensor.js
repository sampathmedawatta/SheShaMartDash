import React, { useState, useEffect } from "react";
import SensorService from "../services/sensor.service";
import BrokerService from "../services/broker.service";
import ProviderSubMenu from "../components/UI/SubMenu/ProviderSubMenu";
import DropDown from "../components/UI/DropDown";

const Sensor = () => {

  const [registeredBrokers, setRegisteredBrokers] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const getList = BrokerService.getBrokers();
      if (getList !== null) {
        setRegisteredBrokers(getList);
      }
    }
    fetchData();
  }, []);

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

  const [selectedOption, setSelectedOption] = useState("");

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
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

    if (!selectedOption) {
      validationErrors.brokerName = "Broker name is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const params = {
        rewardAmount: +formData.rewardAmount,
        sensorName: formData.sensorName,
        costPerMinute: +formData.costPerMinute,
        costPerKB: +formData.costPerKB,
        integrationBroker: selectedOption,
      };

      const response = SensorService.registerSensor(params);
      console.log(response);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <ProviderSubMenu />
        </div>

        <div className="col-12">
          <div className="title-heders">Provider</div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <br />
          <div className="col-10">
            <div className="page-title">Sensor Registration</div>
            <br></br>
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

                {registeredBrokers && (
                  <DropDown
                    onChange={handleDropdownChange}
                    data={registeredBrokers}
                  />
                )}

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
                  className="form-control drop-down"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-3 mt-3">
                <button type="submit" className="btn btn-add bi-file-plus-fill">
                  Register
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
