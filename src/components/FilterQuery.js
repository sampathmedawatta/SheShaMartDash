import React, { useState } from 'react';

import SensorService from "../services/sensor.service";

function FilterQuery() {
  const [searchText, setSearchText] = useState('');
  const [sparqlQuery, setSparqlQuery] = useState('');
  const [queryData, setQueryData] = useState([]);


  const buildSparqlQuery = (searchText) => {
    // Implement your SPARQL query building logic here based on the search text.
    // Replace "test" with the user's input in the SPARQL query.
    const query = `SELECT ?sensor ?lat ?long ?measures WHERE {?sensor <http://www.w3.org/ns/sosa/observes> ?observes. ?sensor <http://www.w3.org/ns/sosa/hasFeatureOfInterest> ?location. ?observes <http://www.w3.org/2000/01/rdf-schema#label> ?measures. ?location <http://www.w3.org/2003/01/geo/wgs84_pos#lat> ?lat. ?location <http://www.w3.org/2003/01/geo/wgs84_pos#long> ?long. ?observes <http://www.w3.org/2000/01/rdf-schema#label> "${searchText}"}`;


    const queryCountry = `SELECT ?sensor ?lat ?long ?measures WHERE {?sensor <http://www.w3.org/ns/sosa/observes> ?observes. ?sensor <http://www.w3.org/ns/sosa/hasFeatureOfInterest> ?location. ?observes <http://www.w3.org/2000/01/rdf-schema#label> ?measures. ?location <http://www.w3.org/2003/01/geo/wgs84_pos#lat> ?lat. ?location <http://www.w3.org/2003/01/geo/wgs84_pos#long> ?long. ?observes <http://www.w3.org/2000/01/rdf-schema#label> "${searchText}"}`;

    console.log(query);

    SensorService.querySensor(query).then((response) => {
      if (response.status === 200 && response.data.result === true) {
        console.log(response);
        setQueryData(response.data.values);
      } else {
        console.log(response);
      }
    });
};



  
  
  const handleSearch = () => {
    // Build the SPARQL query based on the user's input.
    const query = buildSparqlQuery(searchText);
    setSparqlQuery(query);
  };

  return (
    <div className="row">
      <div className="col-10">
        <br />
        <form>
          <div className="form-group">
            <label htmlFor="querytype">Query On</label>
            <input
              type="text"
              id="querytype"
              name="querytype"
              className="form-control"
              autoComplete="off"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              type="button" 
              className="btn btn-add bi-file-plus-fill"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FilterQuery;
