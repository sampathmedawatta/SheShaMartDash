import React, { useState, useEffect } from "react";
import SensorService from "../services/sensor.service";
import HashLoader from "react-spinners/HashLoader";
import ProviderSubMenu from "../components/UI/SubMenu/ProviderSubMenu";
import ValidatePublicKey from "../components/ValidatePublicKey";

function SensorList() {
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("publicKey")) {
      setShowPopup(true);
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 8000);
  }, []);

  const [registeredSensors, setRegisteredSensors] = useState(null);

  useEffect(() => {
    async function fetchSensorData() {
      const registeredSensors = await SensorService.getSensors();
      if (registeredSensors !== null) {
        const filteredSensor = Object.values(registeredSensors).filter(
          (sensor) => {
           setLoading(false);
            return sensor.input.includes(localStorage.getItem("publicKey"));
          }
        );

        setRegisteredSensors(filteredSensor);
      }
    }
    fetchSensorData();
  }, []);

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
            <div className="col-10">
              <div className="page-title">Sensor List</div>

              {loading && (
                <div className="spinner">
                  <HashLoader color="#74cb97" size={60} speedMultiplier={1} />
                </div>
              )}

              {registeredSensors !== null && (
                <div>
                  <table className="table table-light">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Cost Per Minute</th>
                        <th>Cost Per KB</th>
                        <th>Broker</th>
                        <th>Reward amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(registeredSensors).map((item, key) => (
                        <tr key={key}>
                          <td>
                            {registeredSensors[item].metadata.name}
                            {/* <Link
                              to={`/sensorDetails/${registeredSensors[item].metadata.name}`}
                            >
                              {registeredSensors[item].metadata.name}
                            </Link> */}
                          </td>
                          <td>
                            {registeredSensors[item].metadata.costPerMinute}
                          </td>
                          <td>{registeredSensors[item].metadata.costPerKB}</td>
                          <td>
                            {registeredSensors[item].metadata.integrationBroker}
                          </td>
                          <td>{registeredSensors[item].rewardAmount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SensorList;
