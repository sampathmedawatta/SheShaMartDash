import React, { useState } from "react";


const TurtleFileReader = ({onChange}) => {
  
  return (
    <div>
      <div className="form-group">
        <input
          type="file"
          name="turtleFile"
          class="form-control drop-down"
          accept=".ttl"
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default TurtleFileReader;
