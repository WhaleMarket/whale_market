import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../../../context/AuthProvider';
import { API_URL } from '../../../../constants/defaultUrl';
import styled from 'styled-components';
import upload_icon from '../../../../assets/upload-file.png';

const Fieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
    margin-top: 30px;
`;

const Legend = styled.legend`
    overflow: hidden;
    position: block;
    font-size: 0;
    line-height: 0;
    text-indent: -9999px;
`;

const ProfileImgWrapper = styled.div`
    position: relative;
    width: 110px;
    height: 110px;
    background-image: url(${(props) => props.src});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 0 auto;
    border-radius: 50%;
`;

const ProfileImgLabel = styled.label`
    width: 6.875rem;
    margin: 0 auto;
`;

const Img = styled.img`
    position: absolute;
    width: 36px;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    cursor: pointer;
`;

const ProfileImgInput = styled.input`
    overflow: hidden;
    position: absolute;
    width: 0;
    height: 0;
    line-height: 0;
    text-indent: -9999px;
`;

const FormLabel = styled.label`
    margin: 16px 0 10px 0;
    color: #767676;
    font-size: 12px;
`;

const FormInput = styled.input`
    width: 322px;
    border: none;
    border-bottom: 1px solid #dbdbdb;
    color: #000000;
    font-size: 14px;
    &:focus {
        outline: none;
        border-bottom: 1px solid #00bcd4;
    }
    &::placeholder {
        color: #dbdbdb;
    }
`;

const ErrorMessage = styled.p`
    margin-top: 6px;
    color: #eb5757;
    font-size: 12px;
`;

function ProfileEditForm() {
    const [InfoState] = useContext(AuthContext);

    const usernameRef = useRef();
    const accountnameRef = useRef();
    const previewImage = useRef();

    const [username, setUsername] = useState(
        InfoState.MyInformations[0].myUsername
    );
    const [accountname, setAccountname] = useState(
        InfoState.MyInformations[0].myAccountname
    );
    const [intro, setIntro] = useState(InfoState.MyInformations[0].myIntro);
    const [image, setImage] = useState(InfoState.MyInformations[0].myImage);
    const [errMsgForUsername, setErrMsgForUsername] = useState('');
    const [errMsgForAccountname, setErrMsgForAccountname] = useState('');

    const accountnameRegex = /^[-._a-zA-Z0-9]+$/;
    const [isValidUsername, setIsValidUsername] = useState(false);
    const [isValidAccountname, setIsValidAccountname] = useState(false);

    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        if (image !== InfoState.MyInformations[0].myImage) {
            setIsDisabled(false);
        } else if (
            username !== InfoState.MyInformations[0].myUsername ||
            accountname !== InfoState.MyInformations[0].myAccountname ||
            intro !== InfoState.MyInformations[0].myIntro
        ) {
            isValidUsername && isValidAccountname
                ? setIsDisabled(true)
                : setIsDisabled(false);
        } else if (
            image === InfoState.MyInformations[0].myImage &&
            username === InfoState.MyInformations[0].myUsername &&
            accountname === InfoState.MyInformations[0].myAccountname &&
            intro === InfoState.MyInformations[0].myIntro
        ) {
            setIsDisabled(true);
        }
    }, [username, accountname, intro, image]);

    // 이미지 filename 응답 받기
    function handleImageChange(event) {
        const loadImage = event.target.files;
        const formData = new FormData();
        formData.append('image', loadImage[0]);
        onLoadImage(formData, loadImage);
    }

    async function onLoadImage(formData, loadImage) {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
            const response = await axios.post(
                `${API_URL}/image/uploadfile`,
                formData,
                config
            );
            if (response?.data?.filename) {
                setImage(`${API_URL}/` + response.data.filename);
                preview(loadImage);
            } else {
                alert(
                    '.jpg, .gif, .png, .jpeg, .bmp, .tif, .heic 파일만 업로드 가능합니다.'
                );
            }
        } catch (error) {
            console.error(error);
            alert('잘못된 접근입니다.');
        }
    }

    // preview 이미지 설정
    function preview(loadImage) {
        const reader = new FileReader();
        reader.readAsDataURL(loadImage[0]);
        reader.onload = () =>
            (previewImage.current.style.backgroundImage = `url(${reader.result})`);
    }

    // 사용자 이름 유효성 검사
    const handleOnBlurUsername = async (event) => {
        event.preventDefault();
        setErrMsgForUsername('');
        if (username !== InfoState.MyInformations[0].myUsername) {
            try {
                if (!(username.length > 1 && username.length < 11)) {
                    setErrMsgForUsername(
                        '*2글자 이상 10글자 미만이어야 합니다.'
                    );
                    setIsDisabled(true);
                }
                setIsValidUsername(true);
            } catch (error) {
                console.error(error);
            }
        }
    };

    // 사용자 ID 유효성 검사
    const handleOnBlur = async (event) => {
        event.preventDefault();
        setErrMsgForAccountname('');
        if (accountname !== InfoState.MyInformations[0].myAccountname) {
            try {
                const reqData = {
                    user: { accountname: accountname },
                };
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                const response = await axios.post(
                    `${API_URL}/user/accountnamevalid`,
                    reqData,
                    config
                );

                if (response?.data?.message === '이미 가입된 계정ID 입니다.') {
                    setErrMsgForAccountname('*' + response.data.message);
                    setIsDisabled(true);
                } else if (!accountname) {
                    setErrMsgForAccountname('*계정ID를 입력해주세요.');
                    setIsDisabled(true);
                } else if (!accountnameRegex.test(accountname)) {
                    setErrMsgForAccountname(
                        '*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.'
                    );
                    setIsDisabled(true);
                } else if (
                    response?.data?.message === '사용 가능한 계정ID 입니다.'
                ) {
                    setErrMsgForAccountname('*' + response.data.message);
                    setIsValidAccountname(true);
                    setIsDisabled(false);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    // 프로필 정보 제출
    const handleSubmit = async () => {
        try {
            const reqData = {
                user: {
                    username: username,
                    accountname: accountname,
                    intro: intro,
                    image: image,
                },
            };
            const config = {
                headers: {
                    Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                    'Content-Type': 'application/json',
                },
            };
            const res = await axios.put(`${API_URL}/user`, reqData, config);
            console.log(res);
            alert('🐳 프로필이 수정되었습니다. 🐳');
            window.location.href = `/main/profile/${accountname}`;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Fieldset>
                <Legend>개인정보 변경</Legend>
                <FormLabel htmlFor="username">사용자 이름</FormLabel>
                <FormInput
                    type="text"
                    id="username"
                    placeholder="2~10자 이내여야 합니다."
                    required
                    ref={usernameRef}
                    onChange={(event) => setUsername(event.target.value)}
                    onBlur={handleOnBlurUsername}
                    defaultValue={InfoState.MyInformations[0].myUsername}
                />
                {errMsgForUsername && (
                    <ErrorMessage>*2~10자 이내여야 합니다.</ErrorMessage>
                )}

                <FormLabel htmlFor="accountname">계정 ID</FormLabel>
                <FormInput
                    type="text"
                    id="accountname"
                    placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
                    required
                    ref={accountnameRef}
                    onChange={(event) => setAccountname(event.target.value)}
                    onBlur={handleOnBlur}
                    defaultValue={InfoState.MyInformations[0].myAccountname}
                />
                {errMsgForAccountname && (
                    <ErrorMessage>{errMsgForAccountname}</ErrorMessage>
                )}

                <FormLabel htmlFor="intro">소개</FormLabel>
                <FormInput
                    type="text"
                    id="intro"
                    placeholder="자신을 소개해 주세요!"
                    onChange={(event) => setIntro(event.target.value)}
                    defaultValue={InfoState.MyInformations[0].myIntro}
                    maxLength="150"
                />
            </Fieldset>
        </>
    );
}

export default ProfileEditForm;
