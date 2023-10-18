import React, { useState, useEffect, useContext } from "react";
import SensorService from "../services/sensor.service";
import { Context } from "../context/context";
import Grid from "./UI/Grid/TableSensor";
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
    <div className="container-fluid">
      <ProviderSubMenu></ProviderSubMenu>
      <div className="row-8">
        <div>
        <div class="title-heders">Sensor List</div>
        </div>
        <div>
          <div className="form-group">
            {/* <button className="btn btn-primary btn-block" onClick={getSensors}>
              Get Sensor List
            </button> */}
          </div>
        </div>

        <div>
          {registeredSensors !== null && (
            <Grid sensorList={registeredSensors} />
          )}
        </div>
      </div>
    </div>
  );
}

export default SensorList;
