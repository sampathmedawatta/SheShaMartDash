import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <ul
      className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
      id="menu"
    >
      <li className="sidebar-menu">
        <Link
          to="#submenu1"
          data-bs-toggle="collapse"
          className="nav-link px-0 align-middle"
        >
          <i className="fs-4 bi-speedometer2 "></i>{" "}
          <span className="ms-1 d-none d-sm-inline">Dashboard</span>{" "}
        </Link>
      </li>
      <li className="sidebar-menu">
        <Link to="#" className="nav-link px-0 align-middle">
          <i className="fs-4 bi-wallet-fill"></i>{" "}
          <span className="ms-1 d-none d-sm-inline">Wallet</span>
        </Link>
      </li>
      <li className="sidebar-menu">
        <Link
          to="#submenu2"
          data-bs-toggle="collapse"
          className="nav-link px-0 align-middle "
        >
          <i className="fs-4 bi-key-fill"></i>{" "}
          <span className="ms-1 d-none d-sm-inline">Change Public Key</span>
        </Link>
      </li>
    </ul>
  );
}

export default Sidebar;
