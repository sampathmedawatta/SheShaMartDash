import React from 'react'
import { Link } from "react-router-dom";

function ClientSubMenu() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark Provider-submenu">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="Provider-Submenu navbar-nav me-auto mb-2 mb-lg-0">
            <Link to={"/"} className="nav-link ">
              Home
            </Link>
            <Link to={"/sensorquery"} className="nav-link">
              Sensor Query
            </Link>
            <Link to={"/sensorList"} className="nav-link ">
              List Sensors
            </Link>
            <Link to={"/sensorHistory"} className="nav-link ">
              Sensor History
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default ClientSubMenu
