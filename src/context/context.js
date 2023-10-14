import React, { useState } from "react";
 
export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
    const [broks, setBroks] = useState(null);
    const [query, setQuery] = useState(null);

    return (
      <Context.Provider value={{ broks, setBroks, query, setQuery }}>
        {children}
      </Context.Provider>
    );
};