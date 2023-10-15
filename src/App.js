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
import BrokerDetails from "./components/BrokerDetails";
import { Context } from "./context/context";
import Client from "./components/Client";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const { broks } = useContext(Context);

  return (
    <div>
      <div className="container-fluid bg-color min-vh-100">
        <div className="row">
          <div className="col-2 sidebar vh-100">
            <Sidebar />
          </div>
          <div className="col-10">
            <div className="row">
              <div className="col-12">
                <nav className="navbar navbar-expand navbar-white bg-white">
                  <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <Link to={"/home"} className="nav-link">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={"/broker"} className="nav-link">
                        Broker
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={"/provider"} className="nav-link">
                        Provider
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={"/client"} className="nav-link">
                        Client
                      </Link>
                    </li>
                  </div>
                </nav>
              </div>
            </div>
            <Routes>
              <Route exact path={"/"} element={<Home />} />
              <Route exact path={"/home"} element={<Home />} />
              <Route exact path="/broker" element={<Broker />} />
              <Route exact path="/provider" element={<Provider />} />
              <Route exact path="/client" element={<Client />} />
              <Route
                path="/BrokerDetails/:id"
                element={<BrokerDetails data={broks} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
