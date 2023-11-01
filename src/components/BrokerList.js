import React, { useState, useEffect, useContext } from "react";
import BrokerService from "../services/broker.service";
import { Context } from "../context/context";
import HashLoader from "react-spinners/HashLoader";
import BrokerSubMenu from "../components/UI/SubMenu/BrokerSubMenu";

function BrokerList() {
  const [loading, setLoading] = useState(true);
  const { setBroks } = useContext(Context);
  const [registeredBrokers, setRegisteredBrokers] = useState(null);

  useEffect(() => {

     setLoading(true);
     setTimeout(() => {
       setLoading(false);
     }, 15000);

    async function fetchData() {
      const getList = await BrokerService.getBrokers();
      if (getList !== null) {
        setLoading(false);
        setRegisteredBrokers(getList);
        setBroks(getList);
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

            {loading && (
              <div className="spinner">
                <HashLoader color="#47c4df" size={60} speedMultiplier={1} />
              </div>
            )}

            {registeredBrokers !== null && (
              <div className="table-responsive">
                <table className="table table-light">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Endpoint</th>
                      <th>Counter</th>
                      <th>Reward Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(registeredBrokers).map((item, key) => (
                      <tr key={key}>
                        <td>
                          {registeredBrokers[item].metadata.name}
                          {/* <Link
                            to={`/BrokerDetails/${registeredBrokers[item].metadata.name}`}
                          >
                            {registeredBrokers[item].metadata.name}
                          </Link> */}
                        </td>
                        <td>{registeredBrokers[item].metadata.endpoint}</td>
                        <td>{registeredBrokers[item].counter}</td>
                        <td>{registeredBrokers[item].rewardAmount}</td>
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
