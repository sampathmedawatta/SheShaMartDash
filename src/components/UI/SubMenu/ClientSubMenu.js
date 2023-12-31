import React from "react";
import { Link } from "react-router-dom";

function ClientSubMenu() {
  return (
    <nav className="navbar navbar-expand-lg client-menu navbar-dark">
      <Link to={"/"} className="navbar-brand clnt">
        <div className="bi bi-house-door-fill logo-menu c">      Client Mode</div>
      </Link>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="top-menu">
            <Link to={"/sensorquery"} className="">
              <div className="menu-space clnt">Sensor Query</div>
            </Link>
          </li>
          <li className="top-menu">
            <Link to={"/sensor-history"} className="">
              <div className="menu-space clnt"> Sensor History</div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default ClientSubMenu;
