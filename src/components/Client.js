import React from 'react'
import ClientSubMenu from '../components/UI/SubMenu/ClientSubMenu'

function Client() {
  return (
    <div>
      <div className="container-fluid">
        <ClientSubMenu></ClientSubMenu>
        <div className="row">
          <div className="col-8 my-3">
            <h3>Client</h3>
          </div>
          <div className="col-4 my-3">
            <div className="form-group"></div>
          </div>
          <div className="">
            <div className="form-group">
              <button className="btn btn-primary mr-1">Sensor Search</button>
              <button className="btn btn-primary mr-1">
                Purchased Sensors
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Client
