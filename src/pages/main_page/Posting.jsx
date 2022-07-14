import ImageUploadButton from "../../components/main/posting/imageuploadbutton";
import PostingHeader from "../../components/main/posting/postingheader";
import PostingSection from "../../components/main/posting/postingsection";
import { UploadImageProvider } from "../../context/UploadImageListProvider";
import { UploadProvider } from "../../context/UploadProvider";

function Posting() {
  return (
    <>
      <UploadProvider>
        <UploadImageProvider>
          <PostingHeader />
          <PostingSection />
          <ImageUploadButton />
        </UploadImageProvider>
      </UploadProvider>
    </>
  );
}

export default Posting;
