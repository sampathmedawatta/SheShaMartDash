import React from "react";
import { Link } from "react-router-dom";

function ProviderSubMenu() {
  return (
    <nav className="navbar navbar-expand-lg broker-menu navbar-dark">
      <Link to={"/"} className="navbar-brand">
        <i className="bi bi-house-door-fill"></i>
      </Link>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="top-menu">
            <Link to={"/sensor"} className="">
              <div className="">Register Sensor</div>
            </Link>
          </li>
          <li className="top-menu">
            <Link to={"/sensorList"} className="">
              <div className="">Sensor List</div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default ProviderSubMenu;
