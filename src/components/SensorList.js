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

  const { setSensors } = useContext(Context);
  const [registeredSensors, setRegisteredSensors] = useState(null);
  const { sensorList, setSensorList } = useContext(Context);
  const navigate = useNavigate();

  const [registeredBrokers, setRegisteredBrokers] = useState(null);
  useEffect(() => {
    async function fetchBrokerData() {
      const getList = await BrokerService.getBrokers();
      if (getList !== null) {
        setRegisteredBrokers(getList);
      }
    }
     async function fetchSensorData() {
       const registeredSensors = await SensorService.getSensors();
       if (registeredSensors !== null) {
        
      //  const filteredSensors = registeredSensors.filter(
      //    (sensor) => sensor.hash === savedPublicKey
      //  );
      //  console.log(registeredSensors);
      //   console.log(filteredSensors);

         setRegisteredSensors(registeredSensors);
         setSensors(registeredSensors);
       }
     }

     fetchBrokerData();
     fetchSensorData();
  }, []);

  const sensorExists = (sensor) => {
    return sensorList.some((snr) => snr.sensorHash === sensor.hash);
  };

  const getBroker = (name) => {
    if (registeredBrokers !== null) {
      const foundBroker = Object.values(registeredBrokers).find(
        (broker) => broker.metadata.name === name
      );
      return foundBroker.hash;
    }
  };
  const toggleCheckbox = (sensor) => {

    const exists = sensorExists(sensor);
    if (exists) {
      setSensorList(sensorList.filter((snr) => snr.sensorHash !== sensor.hash));
    } else {

      setSensorList([
        ...sensorList,
        {
          amount: 0,
          sensorName: sensor.metadata.name,
          sensorHash: sensor.hash,
          brokerHash: getBroker(sensor.metadata.integrationBroker), 
        },
      ]);
    }
  };

  const handleCheckout = () => {
     navigate("/checkout");
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
            <div className="col-10">
              <div className="page-title">Sensor List</div>
            
              {registeredSensors !== null && (
                <div>
                  <table className="table table-light">
                    <thead>
                      <tr>
                        <th>Select</th>
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
                            <input
                              type="checkbox"
                              checked={
                                sensorList &&
                                sensorExists(registeredSensors[item])
                              }
                              onChange={() =>
                                toggleCheckbox(registeredSensors[item])
                              }
                            />
                          </td>
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
                  <button
                    onClick={handleCheckout}
                    className="btn btn-add bi-file-plus-fill"
                  >
                    Checkout
                  </button>
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
