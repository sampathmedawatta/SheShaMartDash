import React, { useState, useEffect, useContext } from "react";
import SensorService from "../services/sensor.service";
import { Link, useNavigate } from "react-router-dom";
import ProviderSubMenu from "../components/UI/SubMenu/ProviderSubMenu";
import BrokerService from "../services/broker.service";
import { Context } from "../context/context";
import ValidatePublicKey from "../components/ValidatePublicKey";

function SensorList() {

   const { savedPublicKey } = useContext(Context);
   const [showPopup, setShowPopup] = useState(false);

   useEffect(() => {
     if (!savedPublicKey) {
       setShowPopup(true);
     }
   }, []);

  const [registeredSensors, setRegisteredSensors] = useState(null);

  useEffect(() => {
   
     async function fetchSensorData() {
       const registeredSensors = await SensorService.getSensors();
       if (registeredSensors !== null) {
        
         setRegisteredSensors(registeredSensors);
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
                            <Link
                              to={`/sensorDetails/${registeredSensors[item].metadata.name}`}
                            >
                              {registeredSensors[item].metadata.name}
                            </Link>
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
