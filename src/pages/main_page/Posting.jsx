import ImageUploadButton from "../../components/main/posting/imageuploadbutton";
import PostingHeader from "../../components/main/posting/postingheader";
import PostingSection from "../../components/main/posting/postingsection";
import { UploadProvider } from "../../context/UploadProvider";

function Posting() {
  return (
    <>
      <UploadProvider>
        <PostingHeader />
        <PostingSection />
        <ImageUploadButton />
      </UploadProvider>
    </>
  );
}

export default Posting;
