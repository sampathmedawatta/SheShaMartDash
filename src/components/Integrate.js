import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context/context";
import ClientSubMenu from "../components/UI/SubMenu/ClientSubMenu";
import PaymentService from "../services/payment.service";
import ValidatePublicKey from "../components/ValidatePublicKey";

function Integrate() {
  const [response, setResponse] = useState({});
  const [rewAmount, setrewAmount] = useState(0);
  const { sensorList, setSensorList } = useContext(Context);
 const [errors, setErrors] = useState({});

   const [showPopup, setShowPopup] = useState(false);

   useEffect(() => {
     if (!localStorage.getItem("publicKey")) {
       setShowPopup(true);
     } 
   }, []);

  // Create a new array with the updated sensor
  const updatedSensorList = [...sensorList];

  const handleAmountChange = (sensor, newAmount) => {
    const sensorIndex = sensorList.findIndex(
      (sen) => sen.sensorHash === sensor.sensorHash
    );

    if (sensorIndex !== -1) {
      // Create a new sensor object with the updated amount
      const updatedSensor = {
        ...sensorList[sensorIndex],
        amount: +newAmount,
      };

      updatedSensorList[sensorIndex] = updatedSensor;

      // Update the context with the new sensor list
      setSensorList(updatedSensorList);
    }
  };

  const handleRewardAmountChange = (newAmount) => {
    setrewAmount(newAmount);
  };

  const handleIntegrate = (e) => {
    // TODO update amount for each sensor
    const params = {
      rewardAmount: +rewAmount,
      witnessCount: 0,
      outputs: sensorList,
    };

    const validationErrors = {};
    if (rewAmount < 0) {
      validationErrors.rewardAmount = "Reward amount is required";
    }

    setErrors(validationErrors);
    PaymentService.Integration(params).then((response) => {
      if (response.status === 200 && response.data.result === true) {
        setSensorList([]);

        setResponse({ status: "saved" });
        console.log("Integration completed.");
      } else {
        console.log("Integration failed.");
      }
    });
  };

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <ClientSubMenu />
        </div>

        <div className="col-12">
          <div className="title-heders">Client</div>
          <div className="cpopup">{showPopup && <ValidatePublicKey />}</div>
        </div>
      </div>

      {!showPopup && (
        <div className="row">
          <div className="col-12">
            <br />
            <div className="col-7">
              {response.status && (
                <div
                  className="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  Sensor Integrated Successfully.
                </div>
              )}

              {sensorList.length == 0 && (
                <div className="error-checkout">
                  <div className="page-title">Checkout Error</div>
                  <span>Please select sensor first.</span>
                </div>
              )}
              {sensorList.length > 0 && (
                <form>
                  <table className="table table-light checkout">
                    <br></br>
                    <div className="page-title checkout">Checkout Sensors</div>
                    <tbody>
                      <th>Sensor Name</th>
                      <th>Amount</th>
                      {sensorList &&
                        Object.keys(sensorList).map((item, key) => (
                          <tr key={key}>
                            <td>{sensorList[item].sensorName}</td>
                            <td>
                              <div className="form-group">
                                <input
                                  type="number"
                                  min={0}
                                  className="form-control"
                                  name="sensorAmount"
                                  value={updatedSensorList[item].sensoramount}
                                  onChange={(e) => {
                                    handleAmountChange(
                                      sensorList[item],
                                      e.target.value
                                    );
                                  }}
                                ></input>
                                {errors.sensoramount && (
                                  <span className="form-error">
                                    {errors.sensoramount}
                                  </span>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}

                      <th>Reward Amount</th>
                      <td>
                        <div className="form-group">
                          <input
                            type="number"
                            min={1}
                            className="form-control"
                            name="rewardAmount"
                            id="rewardAmount"
                            onChange={(e) => {
                              handleRewardAmountChange(e.target.value);
                            }}
                          />
                          {errors.rewardAmount && (
                            <span className="form-error">
                              {errors.rewardAmount}
                            </span>
                          )}
                        </div>
                      </td>
                    </tbody>
                  </table>
                  <div className="form-group">
                    <button
                      type="submit"
                      onClick={handleIntegrate}
                      className="btn btn-add bi-plus-circle-fill"
                    >
                      &nbsp; Integrate
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Integrate;
