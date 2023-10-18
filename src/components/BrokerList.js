import React, { useState, useEffect, useContext } from "react";
import BrokerService from "../services/broker.service";
import { Context } from "../context/context";
import { Link } from "react-router-dom";
import BrokerSubMenu from "../components/UI/SubMenu/BrokerSubMenu";

function BrokerList() {
  const { setBroks } = useContext(Context);
const [registeredBrokers, setRegisteredBrokers] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const getList = BrokerService.getBrokers();
      if (getList !== null) {
        setRegisteredBrokers(getList);
        setBroks(getList);
        console.log(getList);
      }
    }
    fetchData();
  }, []);


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-8 my-3">
          <h3>Broker List</h3>
        </div>
      </div>
      <BrokerSubMenu />

      <div className="row">
        <div className="col-12">
          <div className="card">
            {registeredBrokers !== null && (
              <div className="table-responsive">
                <table className="table table-light">
                  <tr>
                    <th>Name</th>
                    <th>Endpoint</th>
                    <th>Counter</th>
                  </tr>
                  {Object.keys(registeredBrokers).map((item, key) => (
                    <tr key={key}>
                      <td>
                        <Link
                          to={`/BrokerDetails/${registeredBrokers[item].metadata.name}`}
                        >
                          {registeredBrokers[item].metadata.name}
                        </Link>
                      </td>
                      <td>{registeredBrokers[item].metadata.endpoint}</td>
                      <td>{registeredBrokers[item].counter}</td>
                    </tr>
                  ))}
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrokerList;
