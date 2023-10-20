import React from "react";
import {useParams} from 'react-router-dom';
import BrokerSubMenu from "../components/UI/SubMenu/BrokerSubMenu";

const BrokerDetails = ({data}) => {
    const { id } = useParams();
  
  
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
            <div className="page-title">Broker Details</div>
            <br></br>

            {Object.keys(data).map(
              (item, key) =>
                data[item].metadata.name === id && (
                  <table className="table table-light" key={key}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Endpoint</th>
                        <th>Counter</th>
                        <th>Hash</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{data[item].metadata.name}</td>
                        <td>{data[item].metadata.endpoint}</td>
                        <td>{data[item].counter}</td>
                        <td>{data[item].hash}</td>
                      </tr>
                    </tbody>
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
