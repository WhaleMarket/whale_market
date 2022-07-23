import { createContext, useState } from "react";

const UploadPostingContext = createContext();

export const UploadPostingProvider = ({ children }) => {
  const uploadPostingState = useState({
    required: [
      {
        label: "textarea",
        value: "",
      },
      {
        label: "image",
        file: [],
        prevUrl: [],
      },
    ],
  });
  return (
    <UploadPostingContext.Provider value={uploadPostingState}>
      {children}
    </UploadPostingContext.Provider>
  );
};

export default UploadPostingContext;
