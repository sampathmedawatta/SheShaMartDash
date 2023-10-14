import React from "react";
import styles from './Table.module.css'
import { Link } from "react-router-dom";

const Table = ({brokerList}) => (
    <div className={styles.app}>
    <table>
        <tr>
            <th>Name</th>
            <th>Endpoint</th>
            <th>Counter</th>
        </tr>
        { 
            Object.keys(brokerList).map((item, key) => (
                
                <tr key={key}>
                    <td><Link to={`/BrokerDetails/${brokerList[item].metadata.name}`} >{ brokerList[item].metadata.name }</Link></td>
                    <td>{ brokerList[item].metadata.endpoint }</td>
                    <td>{ brokerList[item].counter }</td>
                </tr>
            ))
        }
    </table>
</div>
);

export default Table;
