import React, { createContext, useState } from "react";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [apiData, setApiData] = useState({});

  return (
    <ApiContext.Provider value={{ apiData, setApiData }}>
      {children}
    </ApiContext.Provider>
  );
};
