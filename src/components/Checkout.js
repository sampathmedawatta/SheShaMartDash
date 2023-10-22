import React, { useContext, useState } from "react";
import { Context } from "../context/context";
import ProviderSubMenu from "../components/UI/SubMenu/ProviderSubMenu";
import PaymentService from "../services/payment.service";

function Checkout() {

  const [response, setResponse] = useState({});
  const [rewAmount, setrewAmount] = useState(0);
  const { sensorList, setSensorList } = useContext(Context);
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

  const handleIntergrate = (e) => {

    // TODO update amount for each sensor
    const params = {
      rewardAmount: +rewAmount,
      witnessCount: 0,
      outputs: sensorList,
    };

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
          <ProviderSubMenu />
        </div>

        <div className="col-12">
          <div className="title-heders">Provider</div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <br />
          <div className="col-4">
            <div className="page-title">Checkout Sensors</div>
            <br></br>

            {response.status && (
              <div
                className="alert alert-success alert-dismissible fade show"
                role="alert"
              >
                Sensor Intergrated Successfully.
              </div>
            )}
            <table className="table table-light">
              <thead>
                <tr>
                  <th>Sensor Name</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {sensorList &&
                  Object.keys(sensorList).map((item, key) => (
                    <tr key={key}>
                      <td>{sensorList[item].sensorName}</td>
                      <td>
                        <input
                          type="number"
                          min={0}
                          name="sensorAmount"
                          value={updatedSensorList[item].sensoramount}
                          onChange={(e) => {
                            handleAmountChange(
                              sensorList[item],
                              e.target.value
                            );
                          }}
                        ></input>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <div className="form-group">
              <label htmlFor="rewardAmount">reward Amount</label>
              <input
                type="number"
                min={1}
                name="rewardAmount"
                id="rewardAmount"
                onChange={(e) => {
                  handleRewardAmountChange( e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              onClick={handleIntergrate}
              className="btn btn-add bi-file-plus-fill"
            >
              Intergrate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
