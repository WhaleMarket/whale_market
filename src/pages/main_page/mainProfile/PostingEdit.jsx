import React from "react";
import PostingHeader from "../../../components/main/posting/postingheader";
import PostingSection from "../../../components/main/posting/postingsection";
import ImageUploadButton from "../../../components/main/posting/imageuploadbutton";
import { UploadPostingProvider } from "../../../context/UploadImageListProvider";
import { UploadProvider } from "../../../context/UploadProvider";

function PostingEdit() {
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
export default PostingEdit;
