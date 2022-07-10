import { useState } from "react";
import { createContext } from "react";
import ImageUploadButton from "../../components/main/posting/imageuploadbutton";
import PostingHeader from "../../components/main/posting/postingheader";
import PostingSection from "../../components/main/posting/postingsection";

export const UploadContext = createContext();

function Posting() {
  const uploadState = useState(false);
  return (
    <>
      <UploadContext.Provider value={uploadState}>
        <PostingHeader />
        <PostingSection />
        <ImageUploadButton />
      </UploadContext.Provider>
    </>
  );
}

export default Posting;
