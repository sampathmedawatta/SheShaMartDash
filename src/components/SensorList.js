import React, { useState, useEffect, useContext } from "react";
import SensorService from "../services/sensor.service";
import { Context } from "../context/context";
import { Link, useNavigate } from "react-router-dom";
import ProviderSubMenu from "../components/UI/SubMenu/ProviderSubMenu";

function SensorList() {
  const { setSensors } = useContext(Context);
  const [registeredSensors, setRegisteredSensors] = useState(null);
  const [selectedSensors, setSelectedSensors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const registeredSensors = await SensorService.getSensors();
      if (registeredSensors !== null) {
        setRegisteredSensors(registeredSensors);
        setSensors(registeredSensors);
      }
    }
    fetchData();
  }, []);

  const toggleCheckbox = (hash) => {
    if (selectedSensors.includes(hash)) {
      setSelectedSensors(selectedSensors.filter((hash) => hash !== hash));
    } else {
      setSelectedSensors([...selectedSensors, hash]);
    }
  };

  const handleCheckout = () => {
    // You can handle the checkout logic here using the selectedSensors array.
    console.log("Selected Sensors:", selectedSensors);
     navigate("/checkout", { selectedSensors });
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
            <div className="page-title">Sensor List</div>
            <br></br>
            {registeredSensors !== null && (
              <div>
                <button
                  onClick={handleCheckout}
                  className="btn btn-add bi-file-plus-fill"
                >
                  Checkout
                </button>
                <br /> <br />
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
                            checked={selectedSensors.includes(
                              registeredSensors[item].hash
                            )}
                            onChange={() =>
                              toggleCheckbox(registeredSensors[item].hash)
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SensorList;
