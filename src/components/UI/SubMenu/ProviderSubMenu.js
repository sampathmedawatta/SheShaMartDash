import React from "react";
import { Link } from "react-router-dom";

function ProviderSubMenu() {
  return (
    <nav className="navbar navbar-expand-lg provider-menu navbar-dark">
      <Link to={"/"} className="navbar-brand prov">
        <div className="bi bi-house-door-fill logo-menu p">        Provider Mode</div>
      </Link>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="top-menu">
            <Link to={"/sensor"} className="">
              <div className="menu-space prov">Register Sensor</div>
            </Link>
          </li>
          <li className="top-menu">
            <Link to={"/sensorList"} className="">
              <div className="menu-space prov">Sensor List</div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default ProviderSubMenu;
