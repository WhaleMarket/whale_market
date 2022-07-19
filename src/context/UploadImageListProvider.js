import { createContext, useState } from "react";

const UploadImageContext = createContext();

export const UploadImageProvider = ({ children }) => {
  const uploadImageState = useState([]);
  return (
    <UploadImageContext.Provider value={uploadImageState}>
      {children}
    </UploadImageContext.Provider>
  );
};

export default UploadImageContext;
