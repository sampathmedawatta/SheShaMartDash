import React from "react";

function DropDown({ onChange, data }) {
  return (
    <select
      id="brokerName"
      name="brokerName"
      className="form-control drop-down"
      onChange={onChange}
    >
      <option key="select" value="select">
        Select
      </option>
      {Object.keys(data).map((key) => (
        <option key={key} value={key}>
          {data[key].metadata.name}
        </option>
      ))}
    </select>
  );
}

export default DropDown;
