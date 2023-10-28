import React, { useState, useContext, useEffect } from "react";
import BrokerService from "../services/broker.service";
import BrokerSubMenu from "../components/UI/SubMenu/BrokerSubMenu";
import { Context } from "../context/context";
import ValidatePublicKey from "../components/ValidatePublicKey";

const Broker = () => {

  const { savedPublicKey } = useContext(Context);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!savedPublicKey) {
      setShowPopup(true);
    }
  }, []);

  const [formData, setFormData] = useState({
    rewardAmount: "",
    brokerName: "",
    endpoint: "",
  });

  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState({});

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

    if (!formData.brokerName.trim()) {
      validationErrors.brokerName = "Broker name is required";
    }

    if (!formData.endpoint.trim()) {
      validationErrors.endpoint = "Endpoint is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const params = {
        rewardAmount: +formData.rewardAmount,
        brokerName: formData.brokerName.trim(),
        endpoint: formData.endpoint.trim(),
      };

      BrokerService.registerBroker(params).then((response) => {
         if (response.status === 200 && response.data.result === true) {
           setFormData({ rewardAmount: "", brokerName: "", endpoint: "" });
           setResponse({ status: true, error: false });
         } else {
           setResponse({ status: false, error: true });
         }
      });
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <BrokerSubMenu />
        </div>

        <div className="col-12">
          <div className="title-heders">Broker</div>
        </div>
      </div>

      {showPopup && <ValidatePublicKey />}

      {!showPopup && (
        <div className="row">
          <div className="col-12">
            <br />
            <div className="col-10 brok">
              <div className="page-title history">Broker Registration</div>
              <br></br>
              <form onSubmit={handleSubmit}>
                {response.status && !response.error && (
                  <div
                    className="alert alert-success alert-dismissible fade show"
                    role="alert"
                  >
                    Broker Successfully Registered.
                  </div>
                )}
                {!response.status && response.error && (
                  <div
                    className="alert alert-danger alert-dismissible fade show"
                    role="alert"
                  >
                    Broker Registration Failed!
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="rewardAmount">Reward Amount</label>
                  <input
                    type="number"
                    min={0}
                    id="rewardAmount"
                    className="form-control"
                    name="rewardAmount"
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {errors.rewardAmount && (
                    <span className="form-error">{errors.rewardAmount}</span>
                  )}
                  <div className="invalid-feedback">
                    Please enter a reward Amount
                  </div>{" "}
                </div>
                <div className="form-group">
                  <label htmlFor="brokerName">Broker Name </label>
                  <input
                    type="text"
                    id="brokerName"
                    className="form-control"
                    name="brokerName"
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {errors.brokerName && (
                    <span className="form-error">{errors.brokerName}</span>
                  )}
                  <div className="invalid-feedback">
                    Please enter a Broker Name
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="endpoint">Endpoint</label>
                  <input
                    type="text"
                    id="endpoint"
                    className="form-control"
                    name="endpoint"
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {errors.endpoint && (
                    <span className="form-error">{errors.endpoint}</span>
                  )}
                  <div className="invalid-feedback">
                    Please enter an Endpoint
                  </div>
                </div>
                <div className="form-group button">
                  <button
                    type="submit"
                    className="btn btn-add bi-plus-circle-fill"
                  >
                    &nbsp; Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Broker;
