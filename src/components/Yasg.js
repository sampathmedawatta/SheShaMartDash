import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import Yasgui from "@triply/yasgui";
import { Context } from "../context/context";
import "@triply/yasgui/build/yasgui.min.css";

const Yasg = () => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://unpkg.com/@triply/yasgui/build/yasgui.min.js";

    script.async = true;

    script.onload = () => {
      const yasgui = new Yasgui(document.getElementById("yasgui"), {
        requestConfig: { endpoint: "http://136.186.108.239:4001/sparql" },

        copyEndpointOnNewTab: true,
      });

      // Add an event listener to capture the query and print it to the console

      yasgui.getTab().on("queryChange", (query) => {
        console.log("Query:", query);
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
    </div>
  );
}

export default Yasg;
