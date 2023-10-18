import React, { useEffect, useState, useContext } from "react";
import Yasgui from "@triply/yasgui";
import { Context } from "../context/context";
import "@triply/yasgui/build/yasgui.min.css";
import ProviderSubMenu from "../components/ProviderSubMenu";
import SensorService from "../services/sensor.service";

const SensorQuery = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [jsonPayload, setJsonPayload] = useState("");
  const [sensorData, setSensorData] = useState([]);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@triply/yasgui/build/yasgui.min.js";

    script.async = true;

    script.onload = () => {
      const yasgui = new Yasgui(document.getElementById("yasgui"), {
        requestConfig: { endpoint: "http://136.186.108.239:4001/sparql" },
        copyEndpointOnNewTab: true,
        resizeable: true,
        tabSize:2, 
      });
      document.querySelector(".yasr").style.display = "none";
      document.querySelector(".yasr_btn").style.display = "none";
      document.querySelector(".yasqe_share").style.display = "none";
      document.querySelector(".closeTab").style.display = "none";
      document.querySelector(".addTab").style.display = "none";
      document.querySelector(".controlbar").style.display = "none";

      const yasqeInstance = yasgui.getTab().yasqe;
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
          setJsonPayload(inputQuery)
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
  console.log("leeenrh"+sensorData.length);
  if (sensorData.length === 0) {
    console.log("innnnn");
  }else{
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
                  .split(' ')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
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
    <div className="container-fluid">
      <ProviderSubMenu></ProviderSubMenu>
      <div className="row">
        <div className="col-12">
          <br></br>
          <div id="result">
            {showAlert ? (
              <div className="alert alert-danger" role="alert">
                SPARQL compiler Error. Please fix the SPARQL query!
              </div>
            ) : null}
            <div id="yasgui"></div>
            <br></br>
            <div className="table-responsive">
              <div><h2>Results</h2></div>
              <table className="table">
                <thead>{renderTableHeaders()}</thead>
                <tbody>{renderTableRows()}</tbody>
              </table>
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorQuery;
