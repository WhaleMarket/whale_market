import React, { useState } from 'react';
import styled from 'styled-components';
import profile_icon from '../../assets/basic-profile-img.png';
import upload_icon from '../../assets/upload-file.png';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin: 1.875rem 2.125rem;
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
    margin:0 auto;
`

const ProfileImg = styled.img`
    width: 6.875rem;
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

function ProfileForm() {
    const [nameInput, setNameInput] = useState('');
    const [nameInputError, setNameInputError] = useState(false);
    const [idInput, setIdInPut] = useState('');
    const [idInputError, setIdInputError] = useState(false);

    // 프로필 사진 선택시 적용되는 기능 추가

    const handleNameInput = (event) => {
        if ((event.target.value.length < 2 || event.target.value.length > 10))
        setNameInputError(true);
        else setNameInputError(false);
        setNameInput(event.target.value);
    }

    const handleIdInput = (event) => {
        const idRegex = /^[-._a-z0-9]+$/;
        if ((!event.target.value || !(idRegex.test(event.target.value)))) setIdInputError(true);
        else setIdInputError(false);
        setIdInPut(event.target.value);
    }

    // 이름, 아이디 올바르게 입력하면 버튼 활성화 기능 추가

    return (
        <Form>
        <Fieldset>
        <Legend>프로필 사진 변경</Legend>
        <ProfileImgWrapper>
        <ProfileImg src={profile_icon}/>
        <ProfileImgLable htmlFor="profileImg"><Img src={upload_icon} alt="프로필 이미지 업로드"/></ProfileImgLable>
        </ProfileImgWrapper>
        <ProfileImgInput type="file" accept="image/*" id="profileImg"/>
        </Fieldset>

        <Fieldset>
        <Legend>개인정보 변경</Legend>
        <FormLabel for="name" style={{marginTop:'0'}}>사용자 이름</FormLabel>
        <FormInput type="text" id="name" placeholder="2~10자 이내여야 합니다." onChange={handleNameInput} value={nameInput}/>
        {nameInputError && <ErrorMessage>*2글자 이상 10글자 미만이어야 합니다.</ErrorMessage>}

        <FormLabel for="id">계정 ID</FormLabel>
        <FormInput type="text" id="id" placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다." onChange={handleIdInput} value={idInput}/>
        {idInputError && <ErrorMessage>*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.</ErrorMessage>}

        <FormLabel for="introduction">소개</FormLabel>
        <FormInput type="text" id="introduction" placeholder="자신과 판매할 상품에 대해 소개해 주세요!"/>
        </Fieldset>
        </Form>
    );
};

export default ProfileForm;