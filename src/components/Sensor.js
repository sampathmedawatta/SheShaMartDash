import React, { useState, useContext, useEffect } from "react";
import SensorService from "../services/sensor.service";
import BrokerService from "../services/broker.service";
import ProviderSubMenu from "../components/UI/SubMenu/ProviderSubMenu";
import DropDown from "../components/UI/DropDown";
import TurtleFileReader from "../components/UI/TurtleFileReader";
import N3 from "n3";
import { Context } from "../context/context";
import ValidatePublicKey from "../components/ValidatePublicKey";

const Sensor = () => {
  const { savedPublicKey } = useContext(Context);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!savedPublicKey) {
      setShowPopup(true);
    }
  }, []);
  const [dataExtraLiteralMetadata, setDataExtraLiteralMetadata] = useState([]);
  const [dataExtraNodeMetadata, setDataExtraNodeMetadata] = useState([]);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileName = file.name;
      const fileExtension = fileName.split(".").pop().toLowerCase();
      if (fileExtension === "ttl") {
        const reader = new FileReader();
        reader.onload = (e) => {
          parseTurtle(e.target.result);
        };
        reader.readAsText(file);
      } else {
        // TODO Show error File format not supported
      }
    }
  };

  const parseTurtle = (data) => {
    const parser = new N3.Parser();

    const dataLiteralMetadata = [];
    const dataNodeMetadata = [];

    parser.parse(data, (error, triple, prefixes) => {
      if (triple) {
        // Create the parameter object
        const params = {
          s: triple.subject.value,
          p: triple.predicate.value,
          o: triple.object.value,
        };

        if (triple.object.termType === "Literal") {
          // Check the object is a Literal
          dataLiteralMetadata.push(params); // Push params into the dataExtraLiteralMetadata array
        } else if (triple.object.termType === "NamedNode") {
          // Check the object is a NamedNode
          dataNodeMetadata.push(params); // Push params into the dataExtraNodeMetadata array
        }
      } else {
        setDataExtraLiteralMetadata(dataLiteralMetadata);
        setDataExtraNodeMetadata(dataNodeMetadata);
      }
    });
  };

  const [registeredBrokers, setRegisteredBrokers] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const getList = await BrokerService.getBrokers();
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
  const [response, setResponse] = useState({});

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

      if (dataExtraLiteralMetadata.length > 0) {
        params.extraLiteralMetadata = dataExtraLiteralMetadata;
      }

      if (dataExtraNodeMetadata.length > 0) {
        params.extraNodeMetadata = dataExtraNodeMetadata;
      }

      SensorService.registerSensor(params).then((response) => {
        if (response.status === 200 && response.data.result === true) {
          setFormData({
            rewardAmount: "",
            sensorName: "",
            costPerMinute: "",
            costPerKB: "",
            brokerName: "",
          });
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
          <ProviderSubMenu />
        </div>

        <div className="col-12">
          <div className="title-heders">Provider</div>
        </div>
      </div>

      {showPopup && <ValidatePublicKey />}

      {!showPopup && (
        <div className="row">
          <div className="col-12">
            <br />
            <div className="col-10 sensor-form">
              <div className="page-title">Sensor Registration</div>
              <form onSubmit={handleSubmit}>
                {response.status && !response.error && (
                  <div
                    className="alert alert-success alert-dismissible fade show"
                    role="alert"
                  >
                    Sensor Successfully Registered.
                  </div>
                )}
                {!response.status && response.error && (
                  <div
                    className="alert alert-danger alert-dismissible fade show"
                    role="alert"
                  >
                    Sensor Registration Failed!
                  </div>
                )}
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
                  <label htmlFor="rewardAmount">Reward Amount </label>
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
                <div className="form-group meta">
                  <label htmlFor="turtleFile">Extra Metadata</label>
                  <TurtleFileReader onChange={handleFileInput} />
                </div>
                  <button
                    type="submit"
                    className="btn btn-add bi-file-plus-fill"
                  >
                    Register
                  </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sensor;
