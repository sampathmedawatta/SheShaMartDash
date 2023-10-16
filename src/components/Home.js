import React from "react";
import { Link } from "react-router-dom";
const Home = () => {

  return (
    <div className="container-fluid">
      <div className="row g-3 my-5 justify-content-center  align-items-center">
        <div className="col-md-3 p-1">
            <Link to={"/provider"} className="nav-link">
             <div className="provider shadow-sm d-flex justify-content-around align-items-center">
                <h1 className="fs-2">Provider</h1>
              </div>
            </Link>
          
        </div>
        <div className="col-md-3 p-1">
            <Link to={"/broker"} className="nav-link">
              <div className="broker shadow-sm d-flex justify-content-around align-items-center">
                <h1 className="fs-2">Broker</h1>
              </div>
            </Link>
        </div>
        <div className="col-md-3 p-1">
            <Link to={"/client"} className="nav-link">
              <div className="client shadow-sm d-flex justify-content-around align-items-center">
                <h1 className="fs-2 white">Client</h1>
              </div>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
