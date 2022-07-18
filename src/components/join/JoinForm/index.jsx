import React, { useState, useEffect, useRef, useContext } from 'react';
import Button from '../../emaillogin/button/Button';
import AuthContext from "../../../context/AuthProvider";
import axios from 'axios';
import { API_URL } from '../../../constants/defaultUrl';
import { Wrapper, Title, Form, Fieldset, Legend, Label, Input, ErrorMessage } from './index.style';

export function JoinForm({ setNextPage }) {
    const { setAuth } = useContext(AuthContext);
    const emailRef = useRef();
    const passwordRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [notMatchError, setNotMatchError] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');

    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    
    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        if (password.length > 5) {
            setIsValidPassword(true);
        }
    }, [email, password]);

    useEffect(() => {
        if (isValidEmail && isValidPassword) {
            setSuccess(true);
        }
    }, [isValidEmail, isValidPassword]);

    const handleNextButton = async (event) => {
        event.preventDefault();
        console.log(email, isValidEmail, isValidPassword, success);
        try {
            if (success) {
                setAuth({ email, password });
                setNextPage(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleOnBlurForEmail = async (event) => {
        event.preventDefault();
        setNotMatchError('');
        try {
            const reqData = {
                user: { 
                    email: email
                }
            };
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await axios.post(
                `${API_URL}/user/emailvalid`,
                reqData,
                config
            );
            if (response?.data?.message === "이미 가입된 이메일 주소 입니다.") {
                setNotMatchError('*' + response.data.message);
            } else if (!email) {
                setNotMatchError('*이메일을 입력해주세요.');
            } else if (response?.data?.message === "사용 가능한 이메일 입니다.") {
                setNotMatchError('*' + response.data.message);
                setIsValidEmail(true);
            } 
        } catch (error) {
            if (error.response.data.message === "잘못된 이메일 형식입니다.") {
                setNotMatchError('*' + error.response.data.message);
            }
        }
    };

    const handleOnBlurForPassword = async (event) => {
        event.preventDefault();
        setPasswordMessage('');
        try {
            if (!(password.length > 5)) {
                setPasswordMessage('*비밀번호는 6자 이상이어야 합니다.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    // 버튼 활성상태 관리
    const [isDisabled, setIsDisabled] = useState(true);
    const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const isPassedJoin = () => {
        return emailRegex.test(email) && password.length > 5 ? setIsDisabled(false) : setIsDisabled(true);
    };

    return (
        <>
            <Wrapper>
                <Title>이메일로 회원가입</Title>
                <Form onSubmit={handleNextButton}>
                    <Fieldset>
                        <Legend>회원가입</Legend>
                        <Label htmlFor='email'>이메일</Label>
                        <Input
                            type='email'
                            id='email'
                            ref={emailRef}
                            autoComplete='off'
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            onKeyUp={isPassedJoin}
                            onBlur={handleOnBlurForEmail}
                            placeholder='이메일 주소를 입력해 주세요.'
                        />
                        {notMatchError && <ErrorMessage>{notMatchError}</ErrorMessage>}

<<<<<<< HEAD
                        <Label htmlFor='password' id='labelPassword'>비밀번호</Label>
=======
                        <Label htmlFor='password'>비밀번호</Label>
>>>>>>> f709333 (💄 폼태그 레이아웃 수정으로 인한 값 수정)
                        <Input
                            type='password'
                            id='password'
                            ref={passwordRef}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                            value={password}
                            onKeyUp={isPassedJoin}
                            onBlur={handleOnBlurForPassword}
                            placeholder='비밀번호를 설정해 주세요.'
                        />
                        {passwordMessage && <ErrorMessage>{passwordMessage}</ErrorMessage>}
                        <Button 
                            type='submit' 
                            text='다음'
                            disabled={isDisabled}
                        />
                    </Fieldset>
                </Form>
            </Wrapper>
        </>
    );
}