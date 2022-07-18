import { createContext, useState } from "react";

const SaveProductContext = createContext();

export const SaveProductProvider = ({ children }) => {
  const saveState = useState({
    required: [
      {
        id: 1,
        label: "img",
        error: false,
        savePossible: false,
      },
      {
        id: 2,
        label: "name",
        error: false,
        savePossible: false,
      },
      {
        id: 3,
        label: "price",
        error: false,
        savePossible: false,
      },
      {
        id: 4,
        label: "url",
        error: false,
        savePossible: false,
      },
    ],
  });
  return (
    <SaveProductContext.Provider value={saveState}>
      {children}
    </SaveProductContext.Provider>
  );
};

export default SaveProductContext;
