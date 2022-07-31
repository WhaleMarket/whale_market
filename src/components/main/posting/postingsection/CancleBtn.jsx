import { useContext } from 'react';
import UploadPostingContext from '../../../../context/UploadImageListProvider';
import PostingModificationContext from '../../../../context/PostingModificationProvider';
import { API_URL } from '../../../../constants/defaultUrl';
import styled from 'styled-components';
import Cancle from '../../../../assets/cancle_Btn_icon.png';
import UploadContext from '../../../../context/UploadProvider';

const Btn = styled.button`
    background-image: url(${Cancle});
    background-repeat: no-repeat;
    background-color: transparent;
    margin: 15px 0 0 -30px;
    border: none;
    height: 20px;
    width: 20px;

    @media screen and (max-width: 390px) {
        margin: -40px 15px 20px;
    }
`;

function CancleBtn({ src, index }) {
    const [, setUploadPostingState] = useContext(UploadPostingContext);
    const [, setPostingModificationState] = useContext(
        PostingModificationContext
    );
    const [, setUploadState] = useContext(UploadContext);

    const deleteImg = () => {
        setUploadPostingState((uploadPostingState) => {
            uploadPostingState.required[1] = {
                ...uploadPostingState.required[1],
                file: uploadPostingState.required[1].file.filter((file) => {
                    return file !== uploadPostingState.required[1].file[index];
                }),
                prevUrl: uploadPostingState.required[1].prevUrl.filter(
                    (img) => {
                        return img !== src;
                    }
                ),
            };
            return { required: uploadPostingState.required };
        });
    };

    const EditImage = () => {
        setPostingModificationState((PostingModificationState) => {
            PostingModificationState.post[0] = {
                ...PostingModificationState.post[0],
                image: PostingModificationState.post[0].image.replace(src, ''),
            };
            return { post: PostingModificationState.post };
        });
        setUploadState(true);
    };

    return (
        <>
            <Btn onClick={src.includes(`${API_URL}`) ? EditImage : deleteImg} />
        </>
    );
}

export default CancleBtn;
