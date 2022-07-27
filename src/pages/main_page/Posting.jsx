import PostingHeader from "../../components/main/posting/postingheader";
import PostingSection from "../../components/main/posting/postingsection";
import ImageUploadButton from "../../components/main/posting/imageuploadbutton";
import { UploadPostingProvider } from "../../context/UploadImageListProvider";
import { UploadProvider } from "../../context/UploadProvider";
import {PostingModificationProvider} from "../../context/PostingModificationProvider"

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
