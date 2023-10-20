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

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const { broks, sensors } = useContext(Context);

  return (
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 sidebar">
          <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a
              href="/"
              class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <br></br>
              <span class="fs-5 d-none d-sm-inline ">
                <h3>SenShaMart</h3>
              </span>
            </a>
            <Sidebar />
          </div>
        </div>
        <div class="col py-3">
          <Routes>
            <Route exact path={"/"} element={<Home />} />
            <Route exact path={"/home"} element={<Home />} />
            <Route exact path="/broker" element={<Broker />} />
            <Route exact path="/provider" element={<Provider />} />
            <Route exact path="/sensor" element={<Sensor />} />
            <Route exact path="/sensorquery" element={<SensorQuery />} />

            <Route exact path="/client" element={<Client />} />
            <Route
              path="/BrokerDetails/:id"
              element={<BrokerDetails data={broks} />}
            />
            <Route path="/brokerList" element={<BrokerList />} />
            <Route path="/sensorList" element={<SensorList />} />
          </Routes>
        </div>
      </div>

      <footer class="footer text-center py-2">&copy; 2023 SenShaMart</footer>
    </div>
  );
};

export default App;
