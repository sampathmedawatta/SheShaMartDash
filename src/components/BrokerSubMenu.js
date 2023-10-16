import React from "react";
import { Link } from "react-router-dom";

function BrokerSubMenu() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark Provider-submenu">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="Provider-Submenu navbar-nav me-auto mb-2 mb-lg-0">
            <Link to={"/"} className="nav-link ">
              Home
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

export default BrokerSubMenu;
