import React from "react";
import {useParams} from 'react-router-dom';


const BrokerDetails = ({data}) => {
    const { id } = useParams();
  
  
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Broker Details - {id} </h3>
      </header>
      {  Object.keys(data).map((item, key) => (
        
         data[item].metadata.name === id &&
         <table key={key}>
        <tr>
            <th>Name</th>
            <th>Endpoint</th>
            <th>Counter</th>
            <th>Hash</th>
        </tr>
        <tr >
            <td>{ data[item].metadata.name }</td>
            <td>{ data[item].metadata.endpoint }</td>
            <td>{ data[item].counter }</td>
            <td>{ data[item].hash }</td>
        </tr>
    </table>
        
    ))}
    </div>
  );
};

export default BrokerDetails;
