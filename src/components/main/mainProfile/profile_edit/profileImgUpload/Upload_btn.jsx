import { useContext, useRef } from 'react';
import styled from 'styled-components';
import { IMG_EXTENSION } from '../../../../../constants/defaultUrl';
import ProfileModificationContext from '../../../../../context/ProfileModification';
import upload_icon from '../../../../../assets/upload-file.png';

const Uploadbtn = styled.button`
    position: absolute;
    border: none;
    background-color: #00bcd4;
    width: 36px;
    height: 36px;
    border-radius: 100%;
    background-image: url(${upload_icon});
    background-size: 36px 36px;
    background-position: center center;
    background-repeat: no-repeat;
    bottom: 0px;
    right: 0px;
    &:hover {
        cursor: pointer;
    }
`;

const UploadInput = styled.input`
    display: none;
`;

function UploadBtn({ setUrl }) {
    const Upload_input = useRef();
    const [, setProfileModificationState] = useContext(
        ProfileModificationContext
    );

    const ImgUpload = (event) => {
        const Blob = event.target.files[0];
        if (
            Blob === undefined ||
            !IMG_EXTENSION.includes(Blob.name.split('.')[1])
        ) {
            event.target.value = '';
            return alert('올바른 형식의 파일을 넣어주세요.');
        } else if (Blob.size > 1024 * 1024 * 10) {
            event.target.value = '';
            return alert('파일의 용량이 10MB를 초과했습니다.');
        }
        const reader = new FileReader();
        reader.readAsDataURL(Blob);

        setProfileModificationState((ProfileModificationState) => {
            ProfileModificationState.profile[3] = {
                ...ProfileModificationState.profile[3],
                value: Blob,
                editPossible: true,
            };
            return { profile: ProfileModificationState.profile };
        });

        event.target.value = '';
        return new Promise((resolve) => {
            reader.onload = () => {
                setUrl(reader.result);
                resolve();
            };
        });
    };
    return (
        <>
            <UploadInput
                ref={Upload_input}
                type="file"
                accept="image/*"
                onChange={ImgUpload}
            />
            <Uploadbtn onClick={() => Upload_input.current.click()} />
        </>
    );
}

export default UploadBtn;
