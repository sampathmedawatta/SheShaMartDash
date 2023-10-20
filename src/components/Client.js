import React from 'react'
import ClientSubMenu from '../components/UI/SubMenu/ClientSubMenu'

function Client() {
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <ClientSubMenu />
        </div>

        <div className="col-12">
          <div className="title-heders">Client</div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <br />
          <div className="col-10">
            <div className="page-title">Wallet</div>
            <br></br>
            <div className="form-group"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Client
