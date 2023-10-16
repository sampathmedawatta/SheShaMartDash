import React, { useEffect, useState, useContext } from "react";
import Yasgui from "@triply/yasgui";
import { Context } from "../context/context";
import "@triply/yasgui/build/yasgui.min.css";

const SensorQuery = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [jsonPayload, setJsonPayload] = useState("");
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@triply/yasgui/build/yasgui.min.js";

    script.async = true;

    script.onload = () => {
      const yasgui = new Yasgui(document.getElementById("yasgui"), {
        requestConfig: { endpoint: "http://136.186.108.239:4001/sparql" },
        copyEndpointOnNewTab: true,
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
          console.log("query", instance.getValue());
          const payload = {
            query: inputQuery,
          };
          const queryPayload = JSON.stringify(payload);
          console.log(queryPayload);
          setJsonPayload(queryPayload)
          setShowAlert(false);
        }
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div id="yasgui"></div>
      <div id="result">
        {showAlert ? (
          <div className="alert alert-danger" role="alert">
            SPARQL compiler Error. Please fix the SPARQL query!
          </div>
        ) : (
          <div className="alert alert-success" role="alert">
          <pre>{jsonPayload}</pre></div>
        )}
        {}
      </div>
      
    </div>
  );
};

export default SensorQuery;
