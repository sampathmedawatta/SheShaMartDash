import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

import Sidebar from "./components/UI/Sidebar";
import Home from "./components/Home";
import Broker from "./components/Broker";
import Provider from "./components/Provider";
import EventBus from "./common/EventBus";
import BrokerList from "./components/BrokerList";
import BrokerDetails from "./components/BrokerDetails";
import Sensor from "./components/Sensor";
import SensorQuery from "./components/SensorQuery";
import SensorList from "./components/SensorList";
import { Context } from "./context/context";
import Client from "./components/Client";
import Checkout from "./components/Checkout";
import Integrate from "./components/Integrate";
import PublicKey from "./components/PublicKey";
import Wallet from "./components/Wallet";
import SensorHistory from "./components/SensorHistory";
import FilterQuery from "./components/FilterQuery";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const { broks, sensors } = useContext(Context);
 
  return (
    <div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 sidebar">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <Link
                to="/"
                className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
              >
                <br></br>
                <span className="fs-5 d-none d-sm-inline ">
                  <h3>SenShaMart</h3>
                </span>
              </Link>
              <Sidebar />
            </div>
          </div>
          <div className="col py-3">
            <Routes>
              <Route exact path={"/dashboard"} element={<Home />} />
              <Route exact path={"/"} element={<Home />} />
              <Route exact path={"/home"} element={<Home />} />
              <Route exact path="/broker" element={<Broker />} />
              <Route exact path="/provider" element={<Provider />} />
              <Route exact path="/sensor" element={<Sensor />} />
              <Route exact path="/sensorquery" element={<SensorQuery />} />
              <Route exact path="/client" element={<Client />} />
              <Route exact path="/filterquery" element={<FilterQuery />} />
            <Route
                path="/BrokerDetails/:id"
                element={<BrokerDetails data={broks} />}
              />
              <Route path="/brokerList" element={<BrokerList />} />
              <Route path="/sensorList" element={<SensorList />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/integrate" element={<Integrate />} />

            <Route path="/wallet" element={<Wallet />} />
            <Route path="/public-key" element={<PublicKey />} />
          </Routes>
        </div>
      </div>
    </div>
    <footer className="footer text-center py-2">
        &copy; 2023 SenShaMart
      </footer>
    </div>
  );
};

export default App;
