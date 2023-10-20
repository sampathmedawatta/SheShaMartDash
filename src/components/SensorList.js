import React, { useState, useEffect, useContext } from "react";
import SensorService from "../services/sensor.service";
import { Context } from "../context/context";
import { Link } from "react-router-dom";
import ProviderSubMenu from "../components/UI/SubMenu/ProviderSubMenu";

function SensorList() {
  const { setSensors } = useContext(Context);
  const [registeredSensors, setRegisteredSensors] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const registeredSensors = SensorService.getSensors();
      if (registeredSensors !== null) {
        setRegisteredSensors(registeredSensors);
        setSensors(registeredSensors);
      }
    }
    fetchData();
  }, []);

  const getSensors = () => {
    const registeredSensors = SensorService.getSensors();

    if (registeredSensors !== null) {
      setRegisteredSensors(registeredSensors);
      setSensors(registeredSensors);
    }

    console.log(registeredSensors);
  };

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <ProviderSubMenu />
        </div>

        <div className="col-12">
          <div class="title-heders">Provider</div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <br />
          <div className="col-10">
            <div className="page-title">Sensor List</div>
            <br></br>
            {registeredSensors !== null && (
              <table className="table table-light">
                <tr>
                  <th>Name</th>
                  <th>Cost Per Minute</th>
                  <th>Cost Per KB</th>
                  <th>Broker</th>
                  <th>Reward amount</th>
                </tr>
                {Object.keys(registeredSensors).map((item, key) => (
                  <tr key={key}>
                    <td>
                      <Link
                        to={`/sensorDetails/${registeredSensors[item].metadata.name}`}
                      >
                        {registeredSensors[item].metadata.name}
                      </Link>
                    </td>
                    <td>{registeredSensors[item].metadata.costPerMinute}</td>
                    <td>{registeredSensors[item].metadata.costPerKB}</td>
                    <td>{registeredSensors[item].integrationBroker}</td>
                    <td>{registeredSensors[item].rewardAmount}</td>
                  </tr>
                ))}
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SensorList;
