import React, { useEffect, useState, useContext } from "react";
import Yasgui from "@triply/yasgui";
import "@triply/yasgui/build/yasgui.min.css";
import SensorService from "../services/sensor.service";
import BrokerService from "../services/broker.service";
import ClientSubMenu from "../components/UI/SubMenu/ClientSubMenu";
import { Context } from "../context/context";
import { useNavigate } from "react-router-dom";

const SensorQuery = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [showNoResultFound, setShowNoResultFound] = useState(false);
  const [sensorData, setSensorData] = useState([]);
  const [isAdvanceSearchChecked, setIsAdvanceSearchChecked] = useState(false);
  const navigate = useNavigate();
  const { sensorList, setSensorList } = useContext(Context);
  const [registeredSensors, setRegisteredSensors] = useState([]);
  const [registeredBrokers, setRegisteredBrokers] = useState([]);

  const [shouldShowMapButton, setShouldShowMapButton] = useState(false);
  const [shouldTabular, setShouldTabular] = useState(false);
  let yasguiInstance = null;

  useEffect(() => {
    setSensorList([]);
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
    // get date from "sensorData"
  };

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

  /*
  Filter Query Functions : Started
  */

  const [searchText, setSearchText] = useState("");
  const [searchTextLat1, setSearchTextLat1] = useState("");
  const [searchTextLat2, setSearchTextLat2] = useState("");
  const [searchTextLong1, setSearchTextLong1] = useState("");
  const [searchTextLong2, setSearchTextLong2] = useState("");

  const [selectedOption, setSelectedOption] = useState("Select");

  const renderForm = () => {
    if (selectedOption === "Select") {
      return null;
    } else if (
      selectedOption === "SensorType" ||
      selectedOption === "Country" ||
      selectedOption === "Province" ||
      selectedOption === "City" ||
      selectedOption === "Postcode"
    ) {
      return (
        <form>
          <div className="form-group">
            {selectedOption && selectedOption === "SensorType" && (
              <label htmlFor="sensorType">Enter Sensor Type </label>
            )}
            {selectedOption && selectedOption === "Country" && (
              <label htmlFor="sensorType">Enter Country </label>
            )}
            {selectedOption && selectedOption === "Province" && (
              <label htmlFor="sensorType">Enter Province </label>
            )}
            {selectedOption && selectedOption === "City" && (
              <label htmlFor="sensorType">Enter City </label>
            )}
            {selectedOption && selectedOption === "Postcode" && (
              <label htmlFor="sensorType">Enter Postcode </label>
            )}
            <input
              type="text"
              id="sensorType"
              name="sensorType"
              className="form-control"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <br></br> <br></br>
            <button
              type="button"
              className="btn btn-add bi bi-search"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </form>
      );
    } else if (selectedOption === "Location") {
      return (
        <form>
          <div className="form-group">
            <label htmlFor="sensorType">Latitude</label>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  id="Lat1"
                  name="Lat1"
                  className="form-control"
                  onChange={(e) => setSearchTextLat1(e.target.value)}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  id="Lat2"
                  name="Lat2"
                  className="form-control"
                  onChange={(e) => setSearchTextLat2(e.target.value)}
                />
              </div>
            </div>
            <br></br>

            <label htmlFor="longitude">Longitude</label>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  id="long1"
                  name="long1"
                  className="form-control"
                  onChange={(e) => setSearchTextLong1(e.target.value)}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  id="long2"
                  name="long2"
                  className="form-control"
                  onChange={(e) => setSearchTextLong2(e.target.value)}
                />
              </div>
            </div>
            <br />
            <br />
            <button
              type="button"
              className="btn btn-add bi bi-search"
              onClick={handleSearch}
            >
              &nbsp; Search
            </button>
          </div>

          {}
        </form>
      );
    }

    return null;
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSearch = (e) => {
    const file = e.target.value;
    const query = buildSparqlQuery(); // Pass the selected option
  };

  const buildSparqlQuery = () => {
    // Base query
    let query = `SELECT ?sensor ?lat ?long ?measures WHERE { ?sensor <http://www.w3.org/ns/sosa/observes> ?observes. ?sensor <http://www.w3.org/ns/sosa/hasFeatureOfInterest> ?location. ?observes <http://www.w3.org/2000/01/rdf-schema#label> ?measures . ?location <http://www.w3.org/2003/01/geo/wgs84_pos#lat> ?lat . ?location <http://www.w3.org/2003/01/geo/wgs84_pos#long> ?long . `;

    if (selectedOption === "SensorType")
      query += `?observes <http://www.w3.org/2000/01/rdf-schema#label> "${searchText}"}`; // By SensorType
    if (selectedOption === "Country")
      query += `?country <http://rdfs.co/juso/country> \"${searchText}"}`; // By Country
    if (selectedOption === "Province")
      query += `?Provenance <http://rdfs.co/juso/Provenance> \"${searchText}"}`; // By Provenance
    if (selectedOption === "City")
      query += `?City <http://rdfs.co/juso/City>  \"${searchText}"}`; // By City
    if (selectedOption === "Postcode")
      query += `?Postcode <http://rdfs.co/juso/Postcode> \"${searchText}"}`; // By Postcode
    if (selectedOption === "Location")
      query += `FILTER(xsd:decimal(?long) > \"${searchTextLong1}" && xsd:decimal(?long) < \"${searchTextLong2}" && xsd:decimal(?lat) > \"${searchTextLat1}" && xsd:decimal(?lat) < \"${searchTextLat2}")}`; // By location

    console.log(query);

    SensorService.querySensor(query).then((response) => {
      if (response.status === 200 && response.data.result === true) {
        console.log(response.data.values);
        setSensorData(response.data.values);

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
  };

  /*
  Filter Query Functions : Ended
  */

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
            <div className="page-title sensor-query">Sensor Query</div>
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
                  <div className="row">
                    <div className="col-10 query-form">
                      <h5>Basic Search</h5>
                      <form>
                        <div className="form-group">
                          <label htmlFor="querytype">Select Filter By</label>
                          <select
                            id="querytype"
                            name="querytype"
                            className="form-control"
                            value={selectedOption}
                            onChange={handleOptionChange}
                          >
                            <option value="Select">Select</option>
                            <option value="SensorType">Sensor Type</option>
                            <option value="Country">Country</option>
                            <option value="Province">Province</option>
                            <option value="City">City</option>
                            <option value="Postcode">Postcode</option>
                            <option value="Location">Location Range</option>
                          </select>
                        </div>
                      </form>

                      {renderForm()}
                    </div>
                  </div>

                  {/* <FilterQuery
                    onClick={handleSearch}
                    onChange={handleOptionChange}
                  /> */}
                </div>
              )}
              <div className="title-heders2 results">Results</div>
              <br></br>

              
          
              <span
                className="tabularview tabular"
                style={{ display: shouldShowMapButton ? "block" : "none" }}
              >
                Query Results in Tabular Format

                <button
                type="submit"
                className="btn btn-map bi bi-geo-alt-fill"
                onClick={handleViewMapClick}
                style={{ display: shouldShowMapButton ? "block" : "none" }}
                >
                &nbsp; Map View
                </button>
              </span>
              <br/>
              {showNoResultFound && sensorData.length === 0 ? (
                <div className="alert alert-warning" role="alert">
                  No results found.
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
              

              {sensorList.length > 0 && (
                <button
                  onClick={handleCheckout}
                  className="btn btn-add bi-plus-circle-fill"
                >
                 &nbsp; Integrate Sensors
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorQuery;