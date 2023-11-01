import React, { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";
import ClientSubMenu from "../components/UI/SubMenu/ClientSubMenu";
import ValidatePublicKey from "../components/ValidatePublicKey";
import PaymentService from "../services/payment.service";

function SensorHistory() {
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [registeredSensors, setRegisteredSensors] = useState(null);
 
  useEffect(() => {

     setLoading(true);
     setTimeout(() => {
       setLoading(false);
     }, 15000);

    if (!localStorage.getItem("publicKey")) {
      setShowPopup(true);
    }
    else{
    function fetchIntergrationsData() {
      PaymentService.getIntegrations().then((response) => {
        if (response) {

          const filter = Object.values(response).filter((sensor) => {
            return sensor.input.includes(localStorage.getItem("publicKey"));
          });
          setLoading(false);
          setRegisteredSensors(filter);
          
        }
      });
    }

    fetchIntergrationsData();
  }
  }, []);

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

      {showPopup && <ValidatePublicKey />}
      {!showPopup && (
        <div className="row">
          <div className="col-12">
            <br />
            <div className="col-10">
              <div className="page-title history">
                Sensor Integration History
              </div>
              <br></br>

              {loading && (
                <div className="spinner">
                  <HashLoader color="#808fe1" size={60} speedMultiplier={1} />
                </div>
              )}

              {registeredSensors !== null && (
                <div>
                  <table className="table table-light">
                    <thead>
                      <tr>
                        <th>Compensation Count</th>
                        <th>Witness Count</th>
                        <th>Witnesses</th>
                        <th>Counter</th>
                        <th>Reward Amount</th>
                        <th>Sensor Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(registeredSensors).map((item, index) => (
                        <tr key={index}>
                          <td>{registeredSensors[item].compensationCount}</td>
                          <td>{registeredSensors[item].witnessCount}</td>
                          <td>
                            <ul>
                              {Object.keys(
                                registeredSensors[item].witnesses
                              ).map((witnessKey, witnessIndex) => (
                                <li key={witnessIndex}>
                                  {witnessKey}:{" "}
                                  {
                                    registeredSensors[item].witnesses[
                                      witnessKey
                                    ]
                                  }
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td>{registeredSensors[item].counter}</td>
                          <td>{registeredSensors[item].rewardAmount}</td>
                          <td>
                            <table className="table table-light mini">
                              <thead>
                                <tr>
                                  <th>Sensor Name</th>
                                  <th>Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                {registeredSensors[item].outputs.map(
                                  (output, subIndex) => (
                                    <React.Fragment key={subIndex}>
                                      <tr key={subIndex}>
                                        <td>{output.sensorName}</td>
                                        <td>{output.amount}</td>
                                      </tr>
                                    </React.Fragment>
                                  )
                                )}
                              </tbody>
                            </table>
                          </td>
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
}

export default SensorHistory;
