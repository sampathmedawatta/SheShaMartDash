function Sidebar() {
  return (
    <ul
    class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
    id="menu"
  >
    <li class="sidebar-menu">
      <a
        href="#submenu1"
        data-bs-toggle="collapse"
        class="nav-link px-0 align-middle"
      >
        <i class="fs-4 bi-speedometer2 "></i>{" "}
        <span class="ms-1 d-none d-sm-inline">Dashboard</span>{" "}
      </a>
    </li>
    <li class="sidebar-menu">
      <a href="#" class="nav-link px-0 align-middle">
        <i class="fs-4 bi-wallet-fill"></i>{" "}
        <span class="ms-1 d-none d-sm-inline">Wallet</span>
      </a>
    </li>
    <li class="sidebar-menu">
      <a
        href="#submenu2"
        data-bs-toggle="collapse"
        class="nav-link px-0 align-middle "
      >
        <i class="fs-4 bi-key-fill"></i>{" "}
        <span class="ms-1 d-none d-sm-inline">Change Public Key</span>
      </a>
    </li>
  </ul>
  );
}

export default Sidebar;
