import React from 'react';
import { UploadProvider } from '../../../context/UploadProvider';
import { UploadPostingProvider } from '../../../context/UploadImageListProvider';
import { PostingModificationProvider } from '../../../context/PostingModificationProvider';
import PostingSection from '../../../components/main/posting/postingsection';
import PostingHeader from '../../../components/main/posting/postingheader';
import ImageUploadButton from '../../../components/main/posting/imageuploadbutton';

function PostingEdit() {
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
export default PostingEdit;
