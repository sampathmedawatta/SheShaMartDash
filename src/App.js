import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";
import User from "./components/User";
import Broker from "./components/Broker";
import Sensor from "./components/Sensor";
import EventBus from "./common/EventBus";
import BrokerDetails from "./components/BrokerDetails";
import { Context } from "./context/context";
import Yasg from "./components/Yasg";

const App = () => {
  
  const [currentUser, setCurrentUser] = useState(undefined);
  const { broks } = useContext(Context);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          LOGO
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/user"} className="nav-link">
              User
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/broker"} className="nav-link">
              Broker
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/sensor"} className="nav-link">
              Sensor
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/query"} className="nav-link">
              Yash
            </Link>
          </li>
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/user" element={<User />} />
          <Route exact path="/broker" element={<Broker />} />
          <Route exact path="/sensor" element={<Sensor />} />
          <Route exact path="/query" element={<Yasg />} />
          <Route
            path="/BrokerDetails/:id"
            element={<BrokerDetails data={broks} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
