import React, { useEffect, useState, useContext } from "react";
import Yasgui from "@triply/yasgui";
import { Context } from "../context/context";
import "@triply/yasgui/build/yasgui.min.css";
import ProviderSubMenu from "../components/UI/SubMenu/ProviderSubMenu";
import SensorService from "../services/sensor.service";

const SensorQuery = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [jsonPayload, setJsonPayload] = useState("");
  const [sensorData, setSensorData] = useState([]);
  const [isAdvanceSearchChecked, setIsAdvanceSearchChecked] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@triply/yasgui/build/yasgui.min.js";

    script.async = true;

    script.onload = () => {
      const yasgui = new Yasgui(document.getElementById("yasgui"), {
        requestConfig: { endpoint: "http://136.186.108.239:4001/sparql" },
        copyEndpointOnNewTab: true,
        resizeable: true,
        tabSize: 2,

      });
     
      document.querySelector(".yasr").style.display = "none";
      document.querySelector(".yasr_btn").style.display = "none";
      document.querySelector(".yasqe_share").style.display = "none";
      document.querySelector(".closeTab").style.display = "none";
      document.querySelector(".addTab").style.display = "none";
      document.querySelector(".controlbar").style.display = "none";
      document.querySelector("#yasgui").style.display = "none";
      
const checkbox = document.getElementById("advanceSearch");
    checkbox.addEventListener("change", () => {
      setIsAdvanceSearchChecked(checkbox.checked);
    });
      const yasqeInstance = yasgui.getTab().yasqe;
     
      //yasgui.
      let inputQuery = "";

      yasqeInstance.on("query", (instance, req) => {
        var elements = document.getElementsByClassName("parseErrorIcon");

        if (elements.length > 0) {
          console.log("SPARQL compiler Error. Please fix the SPARQL query!");
          setShowAlert(true);
        } else {
          inputQuery = instance.getValue();
          const res = SensorService.querySensor(inputQuery);
          console.log(res.values);
          setJsonPayload(inputQuery);
          setShowAlert(false);
          setSensorData(res.values);
        }
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  console.log("leeenrh" + sensorData.length);
  if (sensorData.length === 0) {
    console.log("innnnn");
  } else {
    console.log("inooo");
  }

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
      </tr>
    );
  };

  const renderTableRows = () => {
    return sensorData.map((data, index) => (
      <tr key={index}>
        {Object.values(data).map((value, idx) => (
          <td key={idx}>{value.value}</td>
        ))}
      </tr>
    ));
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-8 my-3">
            <div class="title-heders">Client</div>
          </div>
        </div>
        <ProviderSubMenu></ProviderSubMenu>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <h3>Sensor Quesry</h3>
              <br />
              <div>
                <br></br>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="advanceSearch"
                    checked={isAdvanceSearchChecked} // Set the checked state of the checkbox
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

                {isAdvanceSearchChecked ? ( // Display yasgui if the checkbox is checked
                  <div id="yasgui"></div>
                ) : (
                  // Display query-bulider if the checkbox is unchecked
                  <div id="query-bulider">query-bulider</div>
                )}

                <br></br>
                <div className="title-heders">Results</div>
                <br></br>
                {sensorData.length === 0 ? (
                  <div className="alert alert-warning" role="alert">
                    No result found.
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-light">
                      <thead>{renderTableHeaders()}</thead>
                      <tbody>{renderTableRows()}</tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorQuery;
