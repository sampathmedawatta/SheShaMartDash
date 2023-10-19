import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center">
    <h4 className="welcome-message text-gray">Welcome to SenShaMart</h4>
    <p className="tagline">Sensing the Future: Secure IoT Sensor Sharing and Monetization</p>
      
      <div className="row g-3 my-5 justify-content-center align-items-center">
        <div className="col-md-3 p-1">
          <Link to={"/sensor"} className="nav-link">
           
            <div className="provider shadow-sm d-flex flex-column justify-content-start align-items-center">
            <div><img className="icon-1 mb-2" alt="" src="/icon-1.svg"></img></div>
     
              <h1 className="fs-2">Provider</h1>
             
            </div>
          </Link>
        </div>
        <div className="col-md-3 p-1">
  <Link to={"/broker"} className="nav-link">
    <div className="broker shadow-sm d-flex flex-column justify-content-start align-items-center">
      <img className="icon-3 mb-2" alt="" src="/icon-3.svg"></img>
      <h1 className="fs-2">Broker</h1>
    </div>
  </Link>
</div>

        <div className="col-md-3 p-1">
          <Link to={"/client"} className="nav-link">
          <div className="client shadow-sm d-flex flex-column justify-content-start align-items-center">
            <img className="icon-4 mb-2" alt="" src="/icon-4.svg"></img>
              <h1 className="fs-2 white">Client</h1>
              
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
