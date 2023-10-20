import React, { useState} from "react";
import BrokerService from "../services/broker.service";
import BrokerSubMenu from "../components/UI/SubMenu/BrokerSubMenu";

const Broker = () => {

  const [formData, setFormData] = useState({
    rewardAmount: "",
    brokerName: "",
    endpoint: "",
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
      const registerBroker = BrokerService.registerBroker(params);

    }
  };


  // const registerBroker = useState([]);

  // const [rewardAmount, setRewardAmount] = useState("");
  // const handleRewardAmountChange = (event) => {
  //   setRewardAmount(event.target.value);
  // };

  // const [brokerName, setBrokerName] = useState("");
  // const handleBrokerNameChange = (event) => {
  //   setBrokerName(event.target.value);
  // };

  // const [endpoint, setEndpoint] = useState("");
  // const handleEndpointChange = (event) => {
  //   setEndpoint(event.target.value);
  // };

  // const brokerRegister = (e) => {

  //    var forms = document.querySelectorAll(".needs-validation");
  //   e.preventDefault();

  //   const params = {
  //     rewardAmount: +rewardAmount,
  //     brokerName: brokerName,
  //     endpoint: endpoint,
  //   };

  //   registerBroker = BrokerService.registerBroker(params);

  // };

  return (
    <div>
      <div className="row">
        <div className="col-12">
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
            <form onSubmit={handleSubmit}>
              {/* class="needs-validation" id="form-registration" novalidate
              method="post" */}
              <div
                class="alert alert-success alert-dismissible fade show"
                role="alert"
              >
                Broker Registered Successfully
              </div>
              <div className="form-group">
                <label htmlFor="rewardAmount">Reward Amount*</label>
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
                <div class="invalid-feedback">Please enter a reward Amount</div>{" "}
              </div>
              <div className="form-group">
                <label htmlFor="brokerName">Broker Name* </label>
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
                <div class="invalid-feedback">Please enter a Broker Name</div>
              </div>
              <div className="form-group">
                <label htmlFor="endpoint">Endpoint*</label>
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
                <div class="invalid-feedback">Please enter a Endpoint</div>
              </div>
              <div className="form-group ">
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

export default Broker;
