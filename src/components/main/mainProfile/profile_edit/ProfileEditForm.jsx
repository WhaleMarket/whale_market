import React, { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import ProfileEditHeader from './ProfileEditHeader';
import profile_icon from '../../../../assets/basic-profile-img.png';
import upload_icon from '../../../../assets/upload-file.png';
import axios from 'axios';
import { API_URL } from '../../../../constants/defaultUrl';


const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin: 78px 34px;
`

const Fieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
    margin-top: 1.875rem;
`

const Legend = styled.legend`
    overflow: hidden;
    position: block;
    font-size: 0;
    line-height: 0;
    text-indent: -9999px;
`

const ProfileImgWrapper = styled.div`
    position:relative; 
    width: 110px;
    height: 110px;
    background-image: url(${profile_icon});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin:0 auto;
    border-radius: 50%;
`

const ProfileImgLable = styled.label`
    width: 6.875rem;
    margin: 0 auto;
`

const Img = styled.img`
    position: absolute;
    width: 2.250rem;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    cursor: pointer;
`

const ProfileImgInput = styled.input`
    overflow: hidden;
    position: absolute;
    width: 0;
    height: 0;
    line-height: 0;
    text-indent: -9999px;
`
const FormLabel = styled.label`
    margin: 1rem 0 0.625rem 0;
    color: #767676;
    font-size: 0.750rem;
`

const FormInput = styled.input`
    width: 20.125rem;
    border: none;
    border-bottom: 1px solid #DBDBDB;
    color: #000000;
    font-size: 0.875rem;
    &:focus {
        outline: none;
        border-bottom: 1px solid #00BCD4;
    }
    &::placeholder {
        color: #DBDBDB;
    }
`

const ErrorMessage = styled.p`
    margin-top: 0.375rem;
    color: #EB5757;
    font-size: 0.750rem;
`

function ProfileEditForm() {
    const usernameRef = useRef();
    const accountnameRef = useRef();
    const imgRef = useRef();
    const previewImage = useRef();
    
    const [username, setUsername] = useState('');
    const [accountname, setAccountname] = useState('');
    const [intro, setIntro] = useState('');
    const [image, setImage] = useState('https://mandarin.api.weniv.co.kr/1658318303337.png')
    const [success, setSuccess] = useState(false);

    const [errMsgForUsername, setErrMsgForUsername] = useState('');
    const [errMsgForAccountname, setErrMsgForAccountname] = useState('');

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
        if (isValidUsername && isValidAccountname) {
            setSuccess(true);
        }
    }, [usernameRef, accountnameRef]);

    // ????????? filename ?????? ??????
    function handleImageChange (event) {
        const loadImage = event.target.files;
        const formData = new FormData();
        formData.append('image', loadImage[0]);
        onLoadImage(formData, loadImage);
    }

    async function onLoadImage (formData, loadImage) {
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
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
                alert('.jpg, .gif, .png, .jpeg, .bmp, .tif, .heic ????????? ????????? ???????????????.');
            }
        } catch (error) {
            console.error(error);
            alert('????????? ???????????????.');
        }
    };

    function preview(loadImage) {
        const reader = new FileReader();
        reader.onload = () => (
            previewImage.current.style.backgroundImage = `url(${reader.result})`
        );
        reader.readAsDataURL(loadImage[0]);
    };

    function preview(loadImage) {
        const reader = new FileReader();
        reader.onload = () => (
            previewImage.current.style.backgroundImage = `url(${reader.result})`
        );
        reader.readAsDataURL(loadImage[0]);
    };

    const handleOnBlurUsername = async (event) => {
        event.preventDefault();
        setErrMsgForUsername('');
        try {
            if (!(username.length > 1 && username.length < 11)) {
                setErrMsgForUsername('*2?????? ?????? 10?????? ??????????????? ?????????.');
                setIsDisabled(true);
            }
        } catch(error) {
            console.error(error);
        }
    };

    const handleOnBlur = async (event) => {
        event.preventDefault();
        setErrMsgForAccountname('');

        try {
            const reqData = {
                user: { accountname: accountname }
            };
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await axios.post(
                `${API_URL}/user/accountnamevalid`,
                reqData,
                config
            );

            if (response?.data?.message === "?????? ????????? ??????ID ?????????.") {
                setErrMsgForAccountname('*' + response.data.message);
                setIsDisabled(true);
            } else if (!accountname) {
                setErrMsgForAccountname('*??????ID??? ??????????????????.');
            } else if (!accountnameRegex.test(accountname)) {
                setErrMsgForAccountname('*??????, ??????, ?????? ??? ???????????? ????????? ??? ????????????.');
            } else if (response?.data?.message === '?????? ????????? ??????ID ?????????.') {
                setErrMsgForAccountname('*' + response.data.message);
                setIsValidAccountname(true);
            }            
        } catch (error) {
            console.error(error);
        }
    };

    // ??????
    function handleChangeIntro(event) {
        setIntro(event.target.value);
    };

    // ????????? ?????? ??????
    const handleSubmit = async (event) => {
        alert('???? ???????????? ?????????????????????. ????');
        event.preventDefault();
        window.location.href = '/main/myprofile';
        try {
            const token = window.localStorage.getItem('token');
            const reqData = {
                user: {
                    username: username,
                    accountname: accountname,
                    intro: intro,
                    image: image
                }
            };
            const config = {
                headers: {
                    "Authorization" : `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };
            const response = await axios.post(
                `${API_URL}/user`,
                reqData,
                config
            );
            console.log(JSON.stringify(response));
        } catch(error) {
            console.error(error);
            }
        };
        
        const [isDisabled, setIsDisabled] = useState(true);
        const accountnameRegex = /^[-._a-zA-Z0-9]+$/;
        const isPassedProfile = () => {
            return accountnameRegex.test(accountname) && isValidUsername ? setIsDisabled(false) : setIsDisabled(true);
        };

        return (
            <>
            {success ? (
                window.location.href = '/main/myprofile'
            ): (
            <Form onSubmit={handleSubmit}>
            <Fieldset>
            <Legend>????????? ?????? ??????</Legend>
            <ProfileImgWrapper ref={previewImage}>
            <ProfileImgLable htmlFor="profileImg">
                <Img src={upload_icon} alt="????????? ????????? ?????????"/>
            </ProfileImgLable>
            </ProfileImgWrapper>
            <ProfileImgInput ref={imgRef} type="file" onChange={handleImageChange} accept="image/*" id="profileImg"/>
            </Fieldset>
    
            <Fieldset>
            <Legend>???????????? ??????</Legend>
            <FormLabel htmlFor="username">????????? ??????</FormLabel>
            <FormInput type="text" id="username" placeholder="2~10??? ???????????? ?????????." required ref={usernameRef} onChange={(event) => setUsername(event.target.value)} onKeyUp={isPassedProfile} onBlur={handleOnBlurUsername}/>
            {errMsgForUsername && <ErrorMessage>*2~10??? ???????????? ?????????.</ErrorMessage>}
    
            <FormLabel htmlFor="accountname">?????? ID</FormLabel>
            <FormInput type="text" id="accountname" placeholder="??????, ??????, ????????????(.),(_)??? ?????? ???????????????." required ref={accountnameRef} onChange={(event) => setAccountname(event.target.value)} onKeyUp={isPassedProfile} onBlur={handleOnBlur}/>
            {errMsgForAccountname && <ErrorMessage>{errMsgForAccountname}</ErrorMessage>}
    
            <FormLabel htmlFor="intro">??????</FormLabel>
            <FormInput type="text" id="intro" placeholder="????????? ????????? ????????? ?????? ????????? ?????????!" onChange={handleChangeIntro}/>
            </Fieldset>
            <ProfileEditHeader type="submit" disabled={isDisabled}/>
            </Form>
            )}
            </>
        );
};


export default ProfileEditForm;