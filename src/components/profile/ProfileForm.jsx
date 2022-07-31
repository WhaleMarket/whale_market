import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthProvider';
import { API_URL } from '../../constants/defaultUrl';
import styled from 'styled-components';
import StartButton from './StartButton';
import profile_icon from '../../assets/basic-profile-img.png';
import upload_icon from '../../assets/upload-file.png';
import LoadingPage from '../../pages/LoadingPage';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 30px;
`;

const Fieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
`;

const ProfileImgWrapper = styled.div`
    width: 110px;
    height: 110px;
    margin: 0 auto;
    background-image: url(${profile_icon});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    border-radius: 9999px;
`;

const ProfileImgLabel = styled.label`
    width: 110px;
    margin: 0 auto;
`;

const Img = styled.img`
    position: absolute;
    width: 36px;
    right: 0;
    bottom: 0;
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
    margin: ${(props) =>
        props.htmlFor === 'username' ? '0 0 10px 0' : '16px 0 10px 0'};
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
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 14px;
        color: #dbdbdb;
    }
`;

const ErrorMessage = styled.p`
    margin-top: 6px;
    color: #eb5757;
    font-size: 12px;
`;

const SuccessMessage = styled.strong`
    margin-top: 6px;
    color: green;
    font-size: 12px;
`;

function ProfileForm() {
    const [InfoState] = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const usernameRef = useRef();
    const accountnameRef = useRef();

    const [username, setUsername] = useState('');
    const [accountname, setAccountname] = useState('');
    const [intro, setIntro] = useState('');
    const [success, setSuccess] = useState(false);

    const [errMsgForUsername, setErrMsgForUsername] = useState('');
    const [errMsgForAccountname, setErrMsgForAccountname] = useState('');
    const [successMsgForAccountname, setSuccessMsgForAccountname] =
        useState('');

    const [isValidUsername, setIsValidUsername] = useState(false);
    const [isValidAccountname, setIsValidAccountname] = useState(false);

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    useEffect(() => {
        if (username.length > 1 && username.length < 11) {
            setIsValidUsername(true);
        }
    }, [username, accountname]);

    useEffect(() => {
        if (isValidAccountname && isValidUsername) {
            setSuccess(true);
        }
    }, [usernameRef, accountnameRef]);

    // 프로필 이미지
    const [image, setImage] = useState(`${profile_icon}`);
    const previewImage = useRef();

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
                setImage(`${API_URL}/` + response?.data?.filename);
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

    function preview(loadImage) {
        const reader = new FileReader();
        reader.onload = () =>
            (previewImage.current.style.backgroundImage = `url(${reader.result})`);
        reader.readAsDataURL(loadImage[0]);
    }

    // username 검증
    const handleOnBlurUsername = async (event) => {
        event.preventDefault();
        setErrMsgForUsername('');
        try {
            if (!(username.length > 1 && username.length < 11)) {
                setErrMsgForUsername('*2글자 이상 10글자 미만이어야 합니다.');
                setIsDisabled(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // accountname 검증 요청 및 에러처리
    const handleOnBlur = async (event) => {
        event.preventDefault();
        setErrMsgForAccountname('');

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
            } else if (!accountnameRegex.test(accountname)) {
                setErrMsgForAccountname(
                    '*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.'
                );
            } else if (
                response?.data?.message === '사용 가능한 계정ID 입니다.'
            ) {
                setSuccessMsgForAccountname('*' + response.data.message);
                setIsValidAccountname(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // 소개
    function handleChangeIntro(event) {
        setIntro(event.target.value);
    }

    // 회원가입 정보 제출
    const handleSubmit = async (event) => {
        alert(
            '🎉 웨일마켓에 오신 것을 환영합니다. 로그인 화면으로 이동합니다.'
        );
        event.preventDefault();
        window.location.href = '/emaillogin';
        setLoading(true);
        try {
            const reqData = {
                user: {
                    username: username,
                    email: InfoState.MyInformations[1].email,
                    password: InfoState.MyInformations[1].password,
                    accountname: accountname,
                    intro: intro,
                    image: image,
                },
            };
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            await axios.post(`${API_URL}/user`, reqData, config);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    // 버튼 활성상태 관리
    const [isDisabled, setIsDisabled] = useState(true);
    const accountnameRegex = /^[a-zA-Z0-9_.]{4,}$/;
    const isPassedProfile = () => {
        return accountnameRegex.test(accountname) && isValidUsername
            ? setIsDisabled(false)
            : setIsDisabled(true);
    };

    return loading ? (
        <LoadingPage />
    ) : (
        <>
            {success ? (
                (window.location.href = '/emaillogin')
            ) : (
                <Form onSubmit={handleSubmit}>
                    <Fieldset>
                        <legend className="a11yhidden">프로필 사진 변경</legend>

                        <ProfileImgWrapper ref={previewImage}>
                            <ProfileImgLabel htmlFor="profileImg">
                                <Img
                                    src={upload_icon}
                                    alt="프로필 이미지 업로드"
                                />
                            </ProfileImgLabel>
                        </ProfileImgWrapper>
                        <ProfileImgInput
                            type="file"
                            accept="image/*"
                            id="profileImg"
                            onChange={handleImageChange}
                        />
                    </Fieldset>
                    <Fieldset>
                        <legend className="a11yhidden">개인정보 변경</legend>
                        <FormLabel htmlFor="username">사용자 이름</FormLabel>
                        <FormInput
                            type="text"
                            id="username"
                            placeholder="2~10자 이내여야 합니다."
                            required
                            ref={usernameRef}
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                            onKeyUp={isPassedProfile}
                            onBlur={handleOnBlurUsername}
                        />
                        {errMsgForUsername && (
                            <ErrorMessage>{errMsgForUsername}</ErrorMessage>
                        )}
                        <FormLabel htmlFor="accountname">계정 ID</FormLabel>
                        <FormInput
                            type="text"
                            id="accountname"
                            placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
                            required
                            ref={accountnameRef}
                            onChange={(event) =>
                                setAccountname(event.target.value)
                            }
                            onKeyUp={isPassedProfile}
                            onBlur={handleOnBlur}
                        />
                        {errMsgForAccountname
                            ? errMsgForAccountname && (
                                  <ErrorMessage>
                                      {errMsgForAccountname}
                                  </ErrorMessage>
                              )
                            : successMsgForAccountname && (
                                  <SuccessMessage>
                                      {successMsgForAccountname}
                                  </SuccessMessage>
                              )}
                        <FormLabel htmlFor="intro">소개</FormLabel>
                        <FormInput
                            type="text"
                            id="intro"
                            placeholder="자신과 판매할 상품에 대해 소개해 주세요!"
                            onChange={handleChangeIntro}
                            maxLength="150"
                        />
                    </Fieldset>
                    <StartButton disabled={isDisabled} />
                </Form>
            )}
        </>
    );
}

export default ProfileForm;
