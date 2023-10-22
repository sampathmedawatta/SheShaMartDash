import React from "react";
import ProviderSubMenu from "../components/UI/SubMenu/ProviderSubMenu";

function Checkout({ selectedSensors }) {

     console.log(selectedSensors);
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <ProviderSubMenu />
        </div>

        <div className="col-12">
          <div className="title-heders">Provider</div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <br />
          <div className="col-10">
            <div className="page-title">Checkout Sensors</div>
            <br></br>

            <table className="table table-light">
              <thead>
                <tr>
                  <th>Sensor Name</th>
                  <th>Broker</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {selectedSensors &&
                  selectedSensors.map((sensor) => (
                    <tr key={sensor.name}>
                      <td>{sensor.name}</td>
                      <td>{sensor.broker}</td>
                      <td>{sensor.amount}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* Add a "Pay Now" button or any additional payment processing logic here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
