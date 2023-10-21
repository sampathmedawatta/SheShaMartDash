import React, { useState } from "react";
import N3 from "n3";

const TurtleFileReader = () => {
  const [jsonExtraLiteralMetadata, setExtraLiteralMetadata] = useState(null);
  const [jsonExtraNodeMetadata, setExtraNodeMetadata] = useState(null);
  const [ttlData, setTtlData] = useState(null);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        setTtlData(data);
        parseTurtle(data);
      };
      reader.readAsText(file);
    }
  };

  const parseTurtle = (data) => {
    const parser = new N3.Parser();
    const store = new N3.Store();

    const dataExtraLiteralMetadata = []; // Initialize an array to store data
    const dataExtraNodeMetadata = [];

    parser.parse(data, (error, triple, prefixes) => {
      if (triple) {

        // Create the parameter object
        const params = {
          s: triple.subject.value,
          p: triple.predicate.value,
          o: triple.object.value,
        };

       if (triple.object.termType === "Literal") { // Check the object is a Literal
         dataExtraLiteralMetadata.push(params); // Push params into the dataExtraLiteralMetadata array
       } else if (triple.object.termType === "NamedNode") { // Check the object is a NamedNode
         dataExtraNodeMetadata.push(params); // Push params into the dataExtraNodeMetadata array
       }
      } else {
        // All parsing is complete, convert dataExtraLiteralMetadata to a JSON object
        const extraLiteralMetadata = JSON.stringify(
          dataExtraLiteralMetadata,
          null,
          2
        );
        setExtraLiteralMetadata(extraLiteralMetadata);

        // All parsing is complete, convert dataExtraNodeMetadata to a JSON object
        const extraNodeMetadata = JSON.stringify(
          dataExtraNodeMetadata,
          null,
          2
        );
        setExtraNodeMetadata(extraNodeMetadata);
      }
    });
  };

  console.log("jsonExtraLiteralMetadata:  " + jsonExtraLiteralMetadata);
  console.log("jsonExtraNodeMetadata: " + jsonExtraNodeMetadata);

  return (
    <div>
      <div className="form-group">
        <input
          type="file"
          name="turtleFile"
          accept=".ttl"
          onChange={handleFileInput}
        />
      </div>
      {/* <pre>{ttlData}</pre> */}
      <pre>{jsonExtraLiteralMetadata}</pre> {/* Display the JSON result */}
      <pre>{jsonExtraNodeMetadata}</pre> {/* Display the JSON result */}
    </div>
  );
};

export default TurtleFileReader;
