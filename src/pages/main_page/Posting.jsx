import ImageUploadButton from "../../components/main/posting/imageuploadbutton";
import PostingHeader from "../../components/main/posting/postingheader";
import PostingSection from "../../components/main/posting/postingsection";
import { UploadPostingProvider } from "../../context/UploadImageListProvider";
import { UploadProvider } from "../../context/UploadProvider";

function Posting() {
  return (
    <>
      <UploadProvider>
        <UploadPostingProvider>
          <PostingHeader />
          <PostingSection />
          <ImageUploadButton />
        </UploadPostingProvider>
      </UploadProvider>
    </>
  );
}

export default Posting;
