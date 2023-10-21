import React, { useState } from "react";
import N3 from "n3";

const TurtleFileReader = () => {
  const [jsonResult, setJsonResult] = useState(null);
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

    const data1 = []; // Initialize an array to store data

    parser.parse(data, (error, triple, prefixes) => {
      if (triple) {
        const params = {
          s: triple.subject.value,
          p: triple.predicate.value,
          o: triple.object.value,
        };

        data1.push(params); // Push params into the data1 array
      } else {
        // All parsing is complete, convert data1 to a JSON object
        const jsonData = JSON.stringify(data1, null, 2);
        setJsonResult(jsonData);
      }
    });
  };

  console.log("qqq " + jsonResult);

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
      <pre>{ttlData}</pre>
      <pre>{jsonResult}</pre> {/* Display the JSON result */}
    </div>
  );
};

export default TurtleFileReader;
