import { createContext, useState } from "react";

const SaveProductContext = createContext();

export const SaveProductProvider = ({ children }) => {
  const saveState = useState({
    required: [
      {
        label: "img",
        error: false,
        savePossible: false,
        file: "",
      },
      {
        label: "name",
        error: false,
        savePossible: false,
        value: "",
      },
      {
        label: "price",
        error: false,
        savePossible: false,
        value: "",
      },
      {
        label: "url",
        error: false,
        savePossible: false,
        value: "",
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
