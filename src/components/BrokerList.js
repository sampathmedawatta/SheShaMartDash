import React, { useState, useContext } from "react";
import BrokerService from "../services/broker.service";
import { Context } from "../context/context";
import Grid from "./UI/Grid/Table";

function BrokerList() {
  const { setBroks } = useContext(Context);
const [registeredBrokers, setRegisteredBrokers] = useState(null);


  const getBrokers = async () => {
    const getList = BrokerService.getBrokers();
    if (getList !== null) {
      setRegisteredBrokers(getList);
      setBroks(getList);
      console.log(getList);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-8 my-3">
          <h3>Broker List</h3>
        </div>
        <div className="col-4 my-3">
          <div className="form-group">
            <button className="btn btn-primary btn-block" onClick={getBrokers}>
              Get Broker List
            </button>
          </div>
        </div>

        <div>
          {registeredBrokers !== null && (
            <Grid brokerList={registeredBrokers} />
          )}
        </div>
      </div>
    </div>
  );
}

export default BrokerList;
