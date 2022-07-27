import { createContext, useState } from "react";

const PostingModificationContext = createContext();

export const PostingModificationProvider = ({ children }) => {
  const PostingModificationState = useState({
    post: [
      {
        content: "",
        image: "",
      },
    ],
  });
  return (
    <PostingModificationContext.Provider value={PostingModificationState}>
      {children}
    </PostingModificationContext.Provider>
  );
};

export default PostingModificationContext;
