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
    <div>
      <div className="row">
        <div className="col-12">
          <BrokerSubMenu />
        </div>

        <div className="col-12">
          <div className="title-heders">Broker</div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <br />
          <div className="col-10">
            <div className="page-title">Broker List</div>
            <br></br>
            {registeredBrokers !== null && (
              <div className="table-responsive">
                <table className="table table-light">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Endpoint</th>
                      <th>Counter</th>
                    </tr>
                  </thead>
                  <tbody>
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
                  </tbody>
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
