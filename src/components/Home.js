import React from "react";
import { Link } from "react-router-dom";
const Home = () => {

  return (
    <div className="container-fluid">
      <div className="row g-3 my-5 justify-content-center  align-items-center">
        <div className="col-md-3 p-1">
          <div className="p-5 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
            <Link to={"/provider"} className="nav-link">
              <div>
                <h1 className="fs-2">Provider</h1>
              </div>
            </Link>
          </div>
        </div>
        <div className="col-md-3 p-1">
          <div className="p-5 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
            <Link to={"/broker"} className="nav-link">
              <div>
                <h1 className="fs-2">Broker</h1>
              </div>
            </Link>
          </div>
        </div>
        <div className="col-md-3 p-1">
          <div className="p-5 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
            <Link to={"/client"} className="nav-link">
              <div>
                <h1 className="fs-2">Client</h1>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
