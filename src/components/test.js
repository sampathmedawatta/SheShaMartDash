import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import Yasgui from "@triply/yasgui";
import { Context } from "../context/context";

const Yasg = () => {
  const { setQuery } = useContext(Context);

  useEffect(() => {
    // Initialize Yasgui when the component mounts

    const script = document.createElement("script");
    script.src = "https://unpkg.com/@triply/yasgui/build/yasgui.min.js";
    script.async = true;

    script.onload = () => {
      const yasgui = new Yasgui(document.getElementById("yasgui"), {
        requestConfig: { endpoint: "http://136.186.108.239:4001/sparql" },
        copyEndpointOnNewTab: true,
      });
      // setQuery();
      const yasqe = yasgui.getTab().yasqe;
      console.log("1" + yasqe.getValue());

      yasqe.on("query", (instance, req) => {
        console.log("2" + req);
      });

      console.log("3" + yasqe);
    };

    document.body.appendChild(script);

    return () => {
      // Clean up the script tag when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* Add external CSS to the head */}
      <Helmet>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://unpkg.com/@triply/yasgui/build/yasgui.min.css"
        />
      </Helmet>

      {/* Create the yasgui container */}

      <div id="yasgui"></div>
    </div>
  );
};

export default Yasg;
