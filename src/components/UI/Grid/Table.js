import React from "react";
import { Link } from "react-router-dom";

const Table = ({ brokerList }) => (
  <div className="table-responsive">
    <table className="table table-light">
      <tr>
        <th>Name</th>
        <th>Endpoint</th>
        <th>Counter</th>
      </tr>
      {Object.keys(brokerList).map((item, key) => (
        <tr key={key}>
          <td>
            <Link to={`/BrokerDetails/${brokerList[item].metadata.name}`}>
              {brokerList[item].metadata.name}
            </Link>
          </td>
          <td>{brokerList[item].metadata.endpoint}</td>
          <td>{brokerList[item].counter}</td>
        </tr>
      ))}
    </table>
  </div>
);

export default Table;
