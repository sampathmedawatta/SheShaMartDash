import React, { useEffect, useState, useContext } from "react";
import Yasgui from "@triply/yasgui";
import "@triply/yasgui/build/yasgui.min.css";
import SensorService from "../services/sensor.service";
import BrokerService from "../services/broker.service";
import ClientSubMenu from "../components/UI/SubMenu/ClientSubMenu";
import { Context } from "../context/context";
import { useNavigate } from "react-router-dom";
import FilterQuery from "../components/FilterQuery";

const SensorQuery = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [showNoResultFound, setShowNoResultFound] = useState(false);
  const [sensorData, setSensorData] = useState([]);
  const [isAdvanceSearchChecked, setIsAdvanceSearchChecked] = useState(false);
  const navigate = useNavigate();

  const [shouldShowMapButton, setShouldShowMapButton] = useState(false);
  const [shouldTabular, setShouldTabular] = useState(false);
  let yasguiInstance = null;

  useEffect(() => {
    const loadYasgui = () => {
      if (yasguiInstance) {
        yasguiInstance.destroy(); // Destroy the existing Yasgui
      }

      const yasgui = new Yasgui(document.getElementById("yasgui"), {
        requestConfig: { endpoint: "http://136.186.108.239:4001/sparql" },
        copyEndpointOnNewTab: true,
        resizeable: true,
        tabSize: 2,
      });
     

      yasguiInstance = yasgui;
      yasgui.getTab().yasqe.setSize(1070, 200);

      yasguiInstance.getTab().yasqe.on("query", (instance, req) => {
        var elements = document.getElementsByClassName("parseErrorIcon");
        if (elements.length > 0) {
          console.log("SPARQL compiler Error. Please fix the SPARQL query!");
          setShowAlert(true);
          setSensorData([]);
          setShowNoResultFound(false);
        } else {
          const inputQuery = instance.getValue();
          setShowAlert(false);

          SensorService.querySensor(inputQuery).then((response) => {
            if (response.status === 200 && response.data.result === true) {
             
              setSensorData(response.data.values);
              setSensorList(response.data.values);
              setShouldTabular(true);
            
              if (sensorData.length === 0) {
                setShowNoResultFound(true);
              } else {
                setShowNoResultFound(false);
              }

              if (
                response.data.values[0].lat.value &&
                response.data.values[0].long.value
              ) {
                setShouldShowMapButton(true);
              }
            } else {
              console.log(response);
            }
          });
        }
      });
    };

    const checkbox = document.getElementById("advanceSearch");
    checkbox.addEventListener("change", () => {
      setIsAdvanceSearchChecked(checkbox.checked);
      // document.querySelector(".alert-warning").style.display = "none";
      if (checkbox.checked) {
        setSensorData([]); // Clear the data
        setShowAlert(false);
        setShowNoResultFound(false);
        loadYasgui();
    
        document.querySelector(".yasgui .yasr").style.display = "none";
        document.querySelector(".yasgui .tabsList").style.display = "none";
        document.querySelector(".yasgui .yasqe_share").style.display = "none";
        document.querySelector(".yasgui .closeTab").style.display = "none";
        document.querySelector(".addTab").style.display = "none";
        document.querySelector(".controlbar").style.display = "none";

        // Initialize Yasgui when the checkbox is checked.
      } else {
        setSensorData([]); // Clear the data
        setShowAlert(false);
        setShowNoResultFound(false);
        document.querySelector(".yasqe").style.display = "none";
        //document.querySelector("div.alert.alert-warning").style.display = "none";

      }
    });
  }, []);

  const renderTableHeaders = () => {
    if (sensorData.length === 0) {
      return null;
    }

    const headers = Object.keys(sensorData[0]);

    return (
      <tr>
        {headers.map((header, index) => (
          <th key={index}>
            {header
              .toLowerCase()
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </th>
        ))}
        <th>Select</th>
      </tr>
    );
  };

  const handleViewMapClick = () => {
    // Handle the logic to display the map here
  };

  const { sensorList, setSensorList } = useContext(Context);
  const [registeredSensors, setRegisteredSensors] = useState([]);
  const [registeredBrokers, setRegisteredBrokers] = useState([]);

  useEffect(() => {
    async function fetchBrokerData() {
      const getList = await BrokerService.getBrokers();
      if (getList !== null) {
        setRegisteredBrokers(getList);
      }
    }
    async function fetchSensorData() {
      const getRegisteredSensors = await SensorService.getSensors();
      if (getRegisteredSensors !== null) {
        setRegisteredSensors(getRegisteredSensors);
      }
    }

    fetchBrokerData();
    fetchSensorData();
  }, []);

  const sensorExists = (index) => {
    const val = sensorData[index];

    const sensor = sensorList.filter(
      (snr) => snr.sensorName === val.sensor.value
    );

    if (sensor.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const toggleCheckbox = (index) => {
    const exists = sensorExists(index);
    if (exists) {
      setSensorList(
        sensorList.filter(
          (snr) => snr.sensorName !== sensorData[index].sensor.value
        )
      );
    } else {
      const filteredSensor = Object.values(registeredSensors).filter(
        (sensor) => {
          return sensor.metadata.name
            .toLowerCase()
            .includes(sensorData[index].sensor.value.toLowerCase());
        }
      );

      const filteredBroker = Object.values(registeredBrokers).filter(
        (broker) => {
          return broker.metadata.name
            .toLowerCase()
            .includes(
              filteredSensor[0].metadata.integrationBroker.toLowerCase()
            );
        }
      );

      setSensorList([
        ...sensorList,
        {
          amount: 0,
          sensorName: sensorData[index].sensor.value,
          sensorHash: filteredSensor[0].hash,
          brokerHash: filteredBroker[0].hash,
        },
      ]);
    }
  };

  const handleCheckout = () => {
    if (sensorList.length > 0) {
      navigate("/integrate");
    } else {
      // Show error please select sensors to inegrate
    }
  };

  const renderTableRows = () => {
    return sensorData.map((data, index) => (
      <tr key={index}>
        {Object.values(data).map((value, idx) => (
          <td key={idx}>{value.value}</td>
        ))}

        <td>
          <input
            type="checkbox"
            id={`checkbox-${index}`}
            checked={sensorExists(index)}
            onChange={() => toggleCheckbox(index)}
          />
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <ClientSubMenu />
        </div>
        <div className="col-12">
          <div className="title-heders">Client</div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <br />
          <div className="col-10">
            <div className="page-title">Sensor Query</div>
            <br></br>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="advanceSearch"
                  checked={isAdvanceSearchChecked}
                  onChange={(e) => setIsAdvanceSearchChecked(e.target.checked)}
                />

                <label className="form-check-label">
                  Select for Advance Search
                </label>
              </div>
            </div>
            <br></br>
            <div id="result">
              {showAlert ? (
                <div className="alert alert-danger" role="alert">
                  SPARQL compiler Error. Please fix the SPARQL query!
                </div>
              ) : null}

              {isAdvanceSearchChecked ? (
                <div id="yasgui"></div>
              ) : (
                <div id="query-builder">
                  <FilterQuery />
                </div>
              )}
              <div className="title-heders2">Results</div>
              <br></br>
          
              <button
                type="submit"
                className="btn btn-map bi bi-geo-alt-fill float-left"
                onClick={handleViewMapClick}
                style={{ display: shouldShowMapButton ? "block" : "none" }}
              >
                View on Map
              </button>

              {sensorList.length > 0 && (
                <button
                  onClick={handleCheckout}
                  className="btn btn-add bi-file-plus-fill"
                >
                  Integrate Sensors
                </button>
              )}
              <br></br>
              <br></br>
              <span className="tabularview tabular" style={{ display: shouldShowMapButton ? "block" : "none" }}>Query Results in Tabular Format</span>
              {showNoResultFound && sensorData.length === 0 ? (
                <div className="alert alert-warning" role="alert">
                  No result found.
                </div>
              ) : (
                sensorData.length > 0 && (
                  <div className="table-responsive">
                    <table className="table table-light">
                      <thead>{renderTableHeaders()}</thead>
                      <tbody>{renderTableRows()}</tbody>
                    </table>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorQuery;
