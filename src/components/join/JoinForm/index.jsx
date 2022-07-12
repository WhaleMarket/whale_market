import React from 'react';
import Button from '../../emaillogin/button/Button';
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../../../context/AuthProvider";
import axios from 'axios';
import { API_URL } from '../../../constants/defaultUrl';
import { Wrapper, Title, Form, Label, Input, ErrorMessage } from './index.style';

export function JoinForm({ setNextPage, setUserInfo }) {
    const { setAuth } = useContext(AuthContext);
    const emailRef = useRef();
    const errorRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [notMatchError, setNotMatchError] = useState('');

    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    
    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMessage('');

        if (password.length > 5) {
            setIsValidPassword(true);
        }

        if(isValidEmail && isValidPassword) {
            setSuccess(true)
        }

    }, [email, password]);

    const handleSubmit = async (event) => {
        event.preventDefault();
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
            // 로그인 데이터 확인용 콘솔로그
            console.log(JSON.stringify(response?.data));
            // console.log(JSON.stringify(response));
    
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ email, password, roles, accessToken });

            if (response?.data?.message === "이미 가입된 이메일 주소 입니다.") {
                setSuccess(false);
            } else if (response?.data?.message === "사용 가능한 이메일 입니다.") {
                setNotMatchError('*' + response.data.message);
                setNextPage(false);
                setUserInfo({ email, password });
            } 
        } catch (error) {
            console.error(error);
            errorRef.current.focus();
        }
    };

    const handleOnBlur = async (event) => {
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
            } else if (response?.data?.message === "사용 가능한 이메일 입니다.") {
                setNotMatchError('*' + response.data.message);
                setIsValidEmail(true);
            }
        } catch (error) {
            console.error(error);
            errorRef.current.focus();
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
                <p ref={errorRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive">{errorMessage}</p>

                <Form onSubmit={handleSubmit}>
                    <div>
                            <Label htmlFor='email'>이메일
                                <Input
                                    type='email'
                                    id='email'
                                    ref={emailRef}
                                    autoComplete='off'
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                    onKeyUp={isPassedJoin}
                                    onBlur={handleOnBlur}
                                />
                                {!emailRegex.test(email) && <ErrorMessage>*올바르지 않은 이메일 형식입니다.</ErrorMessage> || notMatchError && <ErrorMessage>{notMatchError}</ErrorMessage>}
                            </Label>
                    </div>
                    <div>
                            <Label htmlFor='password'>비밀번호
                                <Input
                                    type='password'
                                    id='password'
                                    onChange={(event) => setPassword(event.target.value)}
                                    require
                                    value={password}
                                    required
                                    onKeyUp={isPassedJoin}
                                />
                                {(password.length < 6) && <ErrorMessage>*비밀번호는 6자 이상이어야 합니다.</ErrorMessage>}
                            </Label>
                    </div>
                    <Button 
                        type='submit' 
                        text='다음'
                        disabled={isDisabled}
                    />
                </Form>
            </Wrapper>
        </>
    );
}