import { useContext, useRef } from 'react';
import UploadPostingContext from '../../../../context/UploadImageListProvider';
import PostingModificationContext from '../../../../context/PostingModificationProvider';
import { IMG_EXTENSION } from '../../../../constants/defaultUrl';
import styled from 'styled-components';
import ImageUpload from '../../../../assets/upload-file.png';

const ImgUploadBtn = styled.img`
    position: fixed;
    cursor: pointer;
    bottom: 16px;
    right: 16px;
    z-index: 100;
`;

const UploadInput = styled.input`
    display: none;
`;

function ImageUploadButton() {
    const [uploadPostingState, setUploadPostingState] =
        useContext(UploadPostingContext);
    const [PostingModificationState] = useContext(PostingModificationContext);
    const Upload_Input = useRef();
    const ImgUpload = (event) => {
        const Blob = event.target.files[0];
        if (
            Blob === undefined ||
            !IMG_EXTENSION.includes(Blob.name.split('.')[1].toLowerCase())
        ) {
            event.target.value = '';
            return alert('올바른 형식의 파일을 넣어주세요.');
        } else if (Blob.size > 1024 * 1024 * 10) {
            event.target.value = '';
            return alert('파일의 용량이 10MB를 초과했습니다.');
        }
        setUploadPostingState((uploadPostingState) => {
            uploadPostingState.required[1] = {
                ...uploadPostingState.required[1],
                file: [...uploadPostingState.required[1].file, Blob],
            };
            return { required: uploadPostingState.required };
        });
        const reader = new FileReader();
        reader.readAsDataURL(Blob);
        event.target.value = '';
        return new Promise((resolve) => {
            reader.onload = () => {
                setUploadPostingState((uploadPostingState) => {
                    uploadPostingState.required[1] = {
                        ...uploadPostingState.required[1],
                        prevUrl: [
                            ...uploadPostingState.required[1].prevUrl,
                            reader.result,
                        ],
                    };
                    return { required: uploadPostingState.required };
                });
                resolve();
            };
        });
    };

    console.log(uploadPostingState.required[1])
    return (
        <>
            <UploadInput
                ref={Upload_Input}
                type="file"
                accept="image/*"
                onChange={ImgUpload}
            />
            <ImgUploadBtn
                src={ImageUpload}
                alt="Image Upload Button"
                onClick={() =>
                    uploadPostingState.required[1].prevUrl.length +
                        PostingModificationState.post[0].image
                            .split(',')
                            .filter((index) => {
                                return index !== '';
                            }).length ===
                    3
                        ? alert('이미지는 3개까지만 업로드할 수 있습니다.')
                        : Upload_Input.current.click()
                }
            />
        </>
    );
}

export default ImageUploadButton;
