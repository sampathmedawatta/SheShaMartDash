import React, { useState } from "react";
import rdflib from "rdflib";

const RDFConverter = () => {
  const [jsonResult, setJsonResult] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const g = rdflib.graph();
    const fetcher = new rdflib.Fetcher(g);

    const reader = new FileReader();

    reader.onload = () => {
      const ttlData = reader.result;
      rdflib.parse(ttlData, g, "your_file.ttl", "text/turtle"); // Replace 'your_file.ttl' with a meaningful URI or name

      const data = {};
      g.statements.forEach((triple) => {
        const subject = triple.subject.value;
        const predicate = triple.predicate.value;
        const object = triple.object.value;

        if (!data[subject]) {
          data[subject] = {};
        }

        data[subject][predicate] = object;
      });

      setJsonResult(JSON.stringify(data, null, 2));
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" accept=".ttl" onChange={handleFileChange} />
      <pre>{jsonResult}</pre>
    </div>
  );
};

export default RDFConverter;
