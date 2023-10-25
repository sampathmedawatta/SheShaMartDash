import React from "react";
import { Link } from "react-router-dom";

function BrokerSubMenu() {
  return (
    <nav className="navbar navbar-expand-lg broker-menu navbar-dark">
      <Link to={"/"} className="navbar-brand brok">
        <div className="bi bi-house-door-fill logo-menu b">        Broker Mode</div>
      </Link>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
          <li className="top-menu">
            <Link to={"/broker"} className="">
              <div className="menu-space brok">Register Broker</div>
            </Link>
          </li>
          <li className="top-menu">
            <Link to={"/brokerList"} className="">
              <div className="menu-space brok">Broker List</div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>

  );
}

export default BrokerSubMenu;
