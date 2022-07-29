import { UploadProvider } from "../../context/UploadProvider";
import { UploadPostingProvider } from "../../context/UploadImageListProvider";
import {PostingModificationProvider} from "../../context/PostingModificationProvider"
import PostingHeader from "../../components/main/posting/postingheader";
import PostingSection from "../../components/main/posting/postingsection";
import ImageUploadButton from "../../components/main/posting/imageuploadbutton";

function Posting() {
  return (
    <>
      <UploadProvider>
        <UploadPostingProvider>
          <PostingModificationProvider>
            <PostingHeader />
            <PostingSection />
            <ImageUploadButton />
          </PostingModificationProvider>
        </UploadPostingProvider>
      </UploadProvider>
    </>
  );
}

export default Posting;
