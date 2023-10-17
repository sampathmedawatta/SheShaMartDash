import React from "react";
import { Link } from "react-router-dom";
const Home = () => {

  return (
    <div className="container-fluid">
      <span id="welcome">Welcome to Senshamart</span>
      <span id="select">Please select an option below</span>
      <div className="row g-3 my-5 justify-content-center align-items-center home-icon">
        <div className="col-md-3 p-1">
          <Link to={"/provider"} className="nav-link">
            <div className="provider shadow-sm d-flex justify-content-around align-items-center">
              <h1 className="fs-2">Provider</h1>
              <img className="icon-1" alt="" src="/provider.svg"></img>
            </div>
          </Link>
        </div>
        <div className="col-md-3 p-1">
          <Link to={"/broker"} className="nav-link">
            <div className="broker shadow-sm d-flex justify-content-around align-items-center">
              <h1 className="fs-2">Broker</h1>
              <img className="icon-1" alt="" src="/broker.svg"></img>
            </div>
          </Link>
        </div>
        <div className="col-md-3 p-1">
          <Link to={"/client"} className="nav-link">
            <div className="client shadow-sm d-flex justify-content-around align-items-center">
              <h1 className="fs-2 white">Client</h1>
              <img className="icon-1" alt="" src="/client.svg"></img>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
