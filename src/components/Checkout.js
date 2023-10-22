import React, { useContext } from "react";
import { Context } from "../context/context";
import ProviderSubMenu from "../components/UI/SubMenu/ProviderSubMenu";

function Checkout() {
  const { sensorList } = useContext(Context);

  console.log(sensorList);
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
                {sensorList &&
                  sensorList.map((sensor) => (
                    <tr key={sensor}>
                      <td>{sensor}</td>
                      <td>{sensor}</td>
                      <td>{sensor}</td>
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
