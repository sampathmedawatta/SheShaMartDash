import React from 'react'
import ClientSubMenu from '../components/UI/SubMenu/ClientSubMenu'

function Client() {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-8 my-3">
            <div class="title-heders">Client</div>
          </div>
        </div>
        <ClientSubMenu></ClientSubMenu>
        <div className="row">
          <div className="col-12">

              <h3>Wallet</h3>
              <br />
              <div className="form-group"></div>
            </div>
          </div>
        </div>
      </div>
  
  );
}

export default Client
