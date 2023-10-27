import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <ul
      className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
      id="menu"
    >
      <li className="sidebar-menu">
        <Link
          to="/home"
          data-bs-toggle="collapse"
          className="nav-link px-0 align-middle"
        >
          <i className="fs-4 bi-speedometer "></i>{" "}
          <span className="ms-1 d-none d-sm-inline">Dashboard</span>{" "}
        </Link>
      </li>
      <li className="sidebar-menu">
        <Link to="/wallet" className="nav-link px-0 align-middle">
          <i className="fs-4 bi-wallet-fill"></i>{" "}
          <span className="ms-1 d-none d-sm-inline">Wallet</span>
        </Link>
      </li>
       <li className="sidebar-menu">
        <Link to="/MapComponent" className="nav-link px-0 align-middle">
        <i className="fs-4 bi-globe-americas"></i>{" "}
        <span className="ms-1 d-none d-sm-inline">Maps</span>
        </Link>

      </li>
      <li className="sidebar-menu">
        <Link
          to="/public-key"
          data-bs-toggle="collapse"
          className="nav-link px-0 align-middle "
        >
          <i className="fs-4 bi-key-fill"></i>{" "}
          <span className="ms-1 d-none d-sm-inline">Public Key</span>
        </Link>
      </li>
    </ul>
  );
}

export default Sidebar;
