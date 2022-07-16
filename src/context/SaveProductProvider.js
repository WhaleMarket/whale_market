import { createContext, useState } from "react";

const SaveProductContext = createContext();

export const SaveProductProvider = ({ children }) => {
  const saveState = useState(false);
  return (
    <SaveProductContext.Provider value={saveState}>
      {children}
    </SaveProductContext.Provider>
  );
};

export default SaveProductContext;
