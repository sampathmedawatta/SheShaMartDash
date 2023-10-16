function Sidebar() {
  return (
    <div className="sidebar p-2">
      <div className="m-2">
        <span className="brand-name title fs-5">SenShaMart Dashboard</span>
      </div>
      <hr className="text-dark"></hr>
      <div className="list-group sidebar list-group-flush">
        <a className="list-group-item py-2">
          {/* <i className="bi bi-table fs-5 me-3"></i> */}
          <span className="fs-5">Dashboard</span>
        </a>
        <a className="list-group-item py-2">
          {/* <i className="bi bi-wallet fs-5 me-3"></i> */}
          <span className="fs-5">Wallet</span>
        </a>
        <a className="list-group-item py-2">
          {/* <i className="bi bi-key fs-5 me-3"></i> */}
          <span className="fs-5">Change Public Key</span>
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
