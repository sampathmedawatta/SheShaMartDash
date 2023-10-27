import React from "react";
import { Link } from "react-router-dom";

function MapMenu() {
  return (
    <nav className="navbar navbar-expand-lg provider-menu navbar-dark">
      <Link to={"/"} className="navbar-brand wall">
        <div className="bi bi-house-door-fill logo-menu p">&nbsp; Home</div>
      </Link>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="top-menu">
            <Link to={"/MapComponent"} className="">
              <div className="menu-space prov">Sensor Map</div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default MapMenu;
