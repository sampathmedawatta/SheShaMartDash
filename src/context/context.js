import React, { useState } from "react";
 
export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
    const [broks, setBroks] = useState(null);
     const [sensorList, setSensorList] = useState([]);
     const [sensors, setSensors] = useState(null);
    const [query, setQuery] = useState(null);

    return (
      <Context.Provider
        value={{
          broks,
          setBroks,
          sensors,
          setSensors,
          query,
          setQuery,
          sensorList,
          setSensorList,
        }}
      >
        {children}
      </Context.Provider>
    );
};