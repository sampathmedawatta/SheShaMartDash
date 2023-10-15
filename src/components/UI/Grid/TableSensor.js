import React from "react";
import styles from "./Table.module.css";
import { Link } from "react-router-dom";

const TableSensor = ({ sensorList }) => (
  <div className="table-responsive">
    <table className="table table-striped table-sm">
      <tr>
        <th>Name</th>
        <th>Cost Per Minute</th>
        <th>Cost Per KB</th>
        <th>Broker</th>
        <th>Reward amount</th>
      </tr>
      {Object.keys(sensorList).map((item, key) => (
        <tr key={key}>
          <td>
            <Link to={`/sensorDetails/${sensorList[item].metadata.name}`}>
              {sensorList[item].metadata.name}
            </Link>
          </td>
          <td>{sensorList[item].metadata.costPerMinute}</td>
          <td>{sensorList[item].metadata.costPerKB}</td>
          <td>{sensorList[item].integrationBroker}</td>
          <td>{sensorList[item].rewardAmount}</td>
        </tr>
      ))}
    </table>
  </div>
);

export default TableSensor;
