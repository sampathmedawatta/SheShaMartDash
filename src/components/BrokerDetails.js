import React from "react";
import {useParams} from 'react-router-dom';
import BrokerSubMenu from "../components/UI/SubMenu/BrokerSubMenu";

const BrokerDetails = ({data}) => {
    const { id } = useParams();
  
  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-8 my-3">
          <div class="title-heders">Broker</div>
        </div>
      </div>
      <BrokerSubMenu />

      <div className="row">
        <div className="col-12">
          <div className="card">
            <h3>Broker Details</h3>

            {Object.keys(data).map(
              (item, key) =>
                data[item].metadata.name === id && (
                  <table className="table table-light" key={key}>
                    <tr>
                      <th>Name</th>
                      <th>Endpoint</th>
                      <th>Counter</th>
                      <th>Hash</th>
                    </tr>
                    <tr>
                      <td>{data[item].metadata.name}</td>
                      <td>{data[item].metadata.endpoint}</td>
                      <td>{data[item].counter}</td>
                      <td>{data[item].hash}</td>
                    </tr>
                  </table>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerDetails;
