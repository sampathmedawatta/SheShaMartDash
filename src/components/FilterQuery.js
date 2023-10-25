import React, { useState } from "react";
import SensorService from "../services/sensor.service";

function FilterQuery() {
  const [searchText, setSearchText] = useState("");
  const [searchTextLat1, setSearchTextLat1] = useState("");
  const [searchTextLat2, setSearchTextLat2] = useState("");
  const [searchTextLong1, setSearchTextLong1] = useState("");
  const [searchTextLong2, setSearchTextLong2] = useState("");

  const [sparqlQuery, setSparqlQuery] = useState("");
  const [queryData, setQueryData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Select");



  const buildSparqlQuery = (searchText, selectedOption) => {
   // Implement your SPARQL query building logic here based on the search text.
    // Replace "test" with the user's input in the SPARQL query.
/*
    const querySensorType = `SELECT ?sensor ?lat ?long ?measures WHERE {?sensor <http://www.w3.org/ns/sosa/observes> ?observes. ?sensor <http://www.w3.org/ns/sosa/hasFeatureOfInterest> ?location. ?observes <http://www.w3.org/2000/01/rdf-schema#label> ?measures. ?location <http://www.w3.org/2003/01/geo/wgs84_pos#lat> ?lat. ?location <http://www.w3.org/2003/01/geo/wgs84_pos#long> ?long. ?observes <http://www.w3.org/2000/01/rdf-schema#label> "${searchText}"}`;

    const queryCountry = `{"query":"SELECT ?sensor ?lat ?long ?measures WHERE { ?sensor <http://www.w3.org/ns/sosa/observes> ?observes. ?sensor <http://www.w3.org/ns/sosa/hasFeatureOfInterest> ?location. ?observes <http://www.w3.org/2000/01/rdf-schema#label> ?measures . ?location <http://www.w3.org/2003/01/geo/wgs84_pos#lat> ?lat . ?location <http://www.w3.org/2003/01/geo/wgs84_pos#long> ?long . ?country <http://rdfs.co/juso/country> \"${searchText}"}`;

    const queryProvince = `SELECT ?sensor ?lat ?long ?measures WHERE { ?sensor <http://www.w3.org/ns/sosa/observes> ?observes. ?sensor <http://www.w3.org/ns/sosa/hasFeatureOfInterest> ?location. ?observes <http://www.w3.org/2000/01/rdf-schema#label> ?measures . ?location <http://www.w3.org/2003/01/geo/wgs84_pos#lat> ?lat . ?location <http://www.w3.org/2003/01/geo/wgs84_pos#long> ?long . ?Provenance <http://rdfs.co/juso/Provenance> \"${searchText}"}`;

    const queryCity = `{"query":"SELECT ?sensor ?lat ?long ?measures WHERE { ?sensor <http://www.w3.org/ns/sosa/observes> ?observes. ?sensor <http://www.w3.org/ns/sosa/hasFeatureOfInterest> ?location. ?observes <http://www.w3.org/2000/01/rdf-schema#label> ?measures . ?location <http://www.w3.org/2003/01/geo/wgs84_pos#lat> ?lat . ?location <http://www.w3.org/2003/01/geo/wgs84_pos#long> ?long . ?City <http://rdfs.co/juso/City>  \"${searchText}"}`;

    const queryPostalcode = `{"query":"SELECT ?sensor ?lat ?long ?measures WHERE { ?sensor <http://www.w3.org/ns/sosa/observes> ?observes. ?sensor <http://www.w3.org/ns/sosa/hasFeatureOfInterest> ?location. ?observes <http://www.w3.org/2000/01/rdf-schema#label> ?measures . ?location <http://www.w3.org/2003/01/geo/wgs84_pos#lat> ?lat . ?location <http://www.w3.org/2003/01/geo/wgs84_pos#long> ?long . ?Postcode <http://rdfs.co/juso/Postcode> \"${searchText}"}`;

    const queryLocation = `SELECT ?sensor ?lat ?long ?measures WHERE { ?sensor <http://www.w3.org/ns/sosa/observes> ?observes. ?sensor <http://www.w3.org/ns/sosa/hasFeatureOfInterest> ?location. ?observes <http://www.w3.org/2000/01/rdf-schema#label> ?measures . ?location <http://www.w3.org/2003/01/geo/wgs84_pos#lat> ?lat . ?location <http://www.w3.org/2003/01/geo/wgs84_pos#long> ?long . FILTER(xsd:decimal(?long) > 113.338953078 && xsd:decimal(?long) < 153.569469029 && xsd:decimal(?lat) > -43.6345972634 && xsd:decimal(?lat) < -10.6681857235)}`;
*/
    // Base query
    let query = `SELECT ?sensor ?lat ?long ?measures WHERE { ?sensor <http://www.w3.org/ns/sosa/observes> ?observes. ?sensor <http://www.w3.org/ns/sosa/hasFeatureOfInterest> ?location. ?observes <http://www.w3.org/2000/01/rdf-schema#label> ?measures . ?location <http://www.w3.org/2003/01/geo/wgs84_pos#lat> ?lat . ?location <http://www.w3.org/2003/01/geo/wgs84_pos#long> ?long . `;

    const option = "SensorType";
    if (option === "SensorType")
      query += `?observes <http://www.w3.org/2000/01/rdf-schema#label> "${searchText}"}`; // By SensorType
    if (option === "Country")
      query += `?country <http://rdfs.co/juso/country> \"${searchText}"}`; // By Country
    if (option === "Province")
      query += `?Provenance <http://rdfs.co/juso/Provenance> \"${searchText}"}`; // By Provenance
    if (option === "City")
      query += `?City <http://rdfs.co/juso/City>  \"${searchText}"}`; // By City
    if (option === "Postcode")
      query += `?Postcode <http://rdfs.co/juso/Postcode> \"${searchText}"}`; // By Postcode
    if (option === "Location")
      query += `FILTER(xsd:decimal(?long) > \"${searchTextLong1}" && xsd:decimal(?long) < \"${searchTextLong2}" && xsd:decimal(?lat) > \"${searchText}" && xsd:decimal(?lat) < \"${searchText}")}`; // By location

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
    const query = buildSparqlQuery(searchText, selectedOption); // Pass the selected option
    //setSparqlQuery(query);
  };
  

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const renderForm = () => {
    if (selectedOption === "Select") {
      return null;
    } else if (selectedOption === "SensorType") {
      return (
        <form>
           <div className="form-group">
            <label htmlFor="sensorType">Enter Sensor Type</label>
            <input
              type="text"
              id="sensorType"
              name="sensorType"
              className="form-control"
              onChange={(e) => setSearchText(e.target.value)}
              />
              <br></br> <br></br>
               <button
              type="button"
              className="btn btn-add bi bi-search"
              onClick={handleSearch} >
              Search
            </button>
              
          </div>
        </form>
      );
    } else if (selectedOption === "Country") {
      return (
        <form>
          <div className="form-group">
            <label htmlFor="country">Enter Country</label>
            <input
              type="text"
              id="country"
              name="country"
              className="form-control"
              onChange={(e) => setSearchText(e.target.value)}
              />
              <br></br> <br></br>
               <button
              type="button"
              className="btn btn-add bi bi-search"
              onClick={handleSearch} >
              Search
            </button>
              
          </div>
          {}
        </form>
      );
    } else if (selectedOption === "Province") {
      return (
        <form>
                    <div className="form-group">
            <label htmlFor="province">Enter Province</label>
            <input
              type="text"
              id="province"
              name="province"
              className="form-control"
              onChange={(e) => setSearchText(e.target.value)}
              />
              <br></br> <br></br>
               <button
              type="button"
              className="btn btn-add bi bi-search"
              onClick={handleSearch} >
              Search
            </button>
              
          </div>
        </form>
      );
    } else if (selectedOption === "City") {
      return (
        <form>
                    <div className="form-group">
            <label htmlFor="city">Enter City</label>
            <input
              type="text"
              id="city"
              name="city"
              className="form-control"
              onChange={(e) => setSearchText(e.target.value)}
              />
              <br></br> <br></br>
               <button
              type="button"
              className="btn btn-add bi bi-search"
              onClick={handleSearch} >
              Search
            </button>
              
          </div>
          {}
        </form>
      );
    } else if (selectedOption === "Postcode") {
      return (
        <form>
          <div className="form-group">
            <label htmlFor="sensorType">Enter Postcode</label>
            <input
              type="text"
              id="postcode"
              name="postcode"
              className="form-control"
              onChange={(e) => setSearchText(e.target.value)}
              />
              <br></br> <br></br>
               <button
              type="button"
              className="btn btn-add bi bi-search"
              onClick={handleSearch} >
              Search
            </button>
              
          </div>
          {}
        </form>
      );
    } else if (selectedOption === "Location") {
      return (
   <form>
  <div className="form-group">
    <label htmlFor="sensorType">Latitude</label>
    <div className="row">
      <div className="col">
        <input
          type="text"
          id="Lat1"
          name="Lat1"
          className="form-control"
          onChange={(e) => setSearchTextLat1(e.target.value)}
        />
      </div>
      <div className="col">
        <input
          type="text"
          id="Lat2"
          name="Lat2"
          className="form-control"
          onChange={(e) => setSearchTextLat2(e.target.value)}
        />
      </div>
    </div>
    <br></br>
    
    <label htmlFor="longitude">Longitude</label>
    <div className="row">
      <div className="col">
        <input
          type="text"
          id="long1"
          name="long1"
          className="form-control"
          onChange={(e) => setSearchTextLong1(e.target.value)}
        />
      </div>
      <div className="col">
        <input
          type="text"
          id="long2"
          name="long2"
          className="form-control"
          onChange={(e) => setSearchTextLong2(e.target.value)}
        />
      </div>
    </div>
    <br />
    <br />
    <button
      type="button"
      className="btn btn-add bi bi-search"
      onClick={handleSearch}
    >
      Search
    </button>
  </div>

        
          {}
        </form>
      );
    }
  
    return null;
  };
  
  return (
    <div className="row">
      <div className="col-10 sensor-form">
      
        <h5>Basic Search !</h5>
        <br /> 
        <form>
          <div className="form-group">
            <label htmlFor="querytype">Select Filter By</label>
            <select
              id="querytype"
              name="querytype"
              className="form-control"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <option value="Select">Select</option>
              <option value="SensorType">Sensor Type</option>
              <option value="Country">Country</option>
              <option value="Province">Province</option>
              <option value="City">City</option>
              <option value="Postcode">Postcode</option>
              <option value="Location">Location Range</option>
            </select>
          </div>
        </form>
  
        {renderForm()}
      </div>
    </div>
  );
}

export default FilterQuery;
