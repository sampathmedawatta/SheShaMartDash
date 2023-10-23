import React from "react";
import { Link } from "react-router-dom";

function GeneralMenu() {
  return (
    <nav className="navbar navbar-expand-lg broker-menu navbar-dark">
      <Link to={"/"} className="navbar-brand wall">
        <i className="bi bi-house-door-fill"></i>
      </Link>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="top-menu">
            <Link to={"/public-key"} className="">
              <div className="menu-space wall"> Public Key</div>
            </Link>
          </li>
          <li className="top-menu">
            <Link to={"/wallet"} className="">
              <div className="menu-space wall"> Wallet</div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default GeneralMenu;
