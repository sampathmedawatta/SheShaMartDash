import React from "react";
import { Link } from "react-router-dom";

function BrokerSubMenu() {
  return (
    <div className="row justify-content-left align-items-left">
      <div className="col-md-1 p-1">
        <Link to={"/"} className="nav-link broker-sub-menu-link">
          <div className="broker-sub-menu shadow-sm d-flex justify-content-around align-items-center">
            <img alt="" src="/icon-1.svg"></img>
          </div>
        </Link>
      </div>
      <div className="col-md-2 p-1">
        <Link to={"/broker"} className="nav-link broker-sub-menu-link">
          <div className="broker-sub-menu shadow-sm d-flex justify-content-around align-items-center">
            Register Broker
          </div>
        </Link>
      </div>
      <div className="col-md-2 p-1">
        <Link to={"/brokerList"} className="nav-link broker-sub-menu-link">
          <div className="broker-sub-menu shadow-sm d-flex justify-content-around align-items-center">
            Broker List
          </div>
        </Link>
      </div>
    </div>
  );
}

export default BrokerSubMenu;
