import React from "react";
import { Link } from "react-router-dom";

function ProviderSubMenu() {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark Provider-submenu">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarColor02">
          <ul class="Provider-Submenu navbar-nav me-auto mb-2 mb-lg-0">
            <Link to={"/"} className="nav-link ">
              Home
            </Link>
            <Link to={"/sensor"} className="nav-link ">
              Registor Sensor
            </Link>
            <Link to={"/sensorList"} className="nav-link ">
              List Sensors
            </Link>
            <Link to={"/broker"} className="nav-link ">
              Register Broker
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default ProviderSubMenu;
