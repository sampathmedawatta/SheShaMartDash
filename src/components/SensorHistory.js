import React, { useState, useContext, useEffect } from "react";
import { Context } from "../context/context";
import ClientSubMenu from '../components/UI/SubMenu/ClientSubMenu'
import ValidatePublicKey from "../components/ValidatePublicKey";
import PaymentService from "../services/payment.service";

function SensorHistory() {

     const { savedPublicKey } = useContext(Context);
     const [showPopup, setShowPopup] = useState(false);
const [registeredSensors, setRegisteredSensors] = useState(null);
     useEffect(() => {
       if (!savedPublicKey) {
         setShowPopup(true);
       }

        async function fetchIntergrationsData() {
          const response = await PaymentService.getIntegrations();
          setRegisteredSensors(response);
          console.log(response);
        }

        fetchIntergrationsData();

       
     }, []);
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <ClientSubMenu />
        </div>

        <div className="col-12">
          <div className="title-heders">Sensor History</div>
        </div>
      </div>

      {showPopup && <ValidatePublicKey />}
      {!showPopup && (
        <div className="row">
          <div className="col-12">
            <br />
            <div className="col-10">
              <div className="page-title">View Your Wallet</div>
              <br></br>
              {registeredSensors !== null && (
                <div>
                  <table className="table table-light">
                    <thead>
                      <tr>
                        <th>Cost Per Minute</th>
                        <th>Cost Per KB</th>
                        <th>Broker</th>
                        <th>Reward amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(registeredSensors).map((item, key) => (
                        <tr key={key}>
                          <td>
                            {registeredSensors[item].metadata.costPerMinute}
                          </td>
                          <td>{registeredSensors[item].metadata.costPerKB}</td>
                          <td>
                            {registeredSensors[item].metadata.integrationBroker}
                          </td>
                          <td>{registeredSensors[item].rewardAmount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SensorHistory;
