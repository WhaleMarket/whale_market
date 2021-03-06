import React, { useState, useEffect, useRef, useContext } from 'react';
import Button from '../../emaillogin/button/Button';
import AuthContext from "../../../context/AuthProvider";
import axios from 'axios';
import { API_URL } from '../../../constants/defaultUrl';
import { Wrapper, Title, Form, Fieldset, Legend, Label, Input, ErrorMessage } from './index.style';

export function JoinForm({ setNextPage }) {
    const [, setInfoState] = useContext(AuthContext);
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
        try {
            if (success) {
                setInfoState((InfoState) => {
                    InfoState.MyInformations[1] = {
                        ...InfoState.MyInformations[1],
                        email: email,
                        password: password
                    };
                    return { MyInformations: InfoState.MyInformations }
                });
                // setAuth({ email, password });
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
            if (response?.data?.message === "?????? ????????? ????????? ?????? ?????????.") {
                setNotMatchError('*' + response.data.message);
            } else if (!email) {
                setNotMatchError('*???????????? ??????????????????.');
            } else if (response?.data?.message === "?????? ????????? ????????? ?????????.") {
                setNotMatchError('*' + response.data.message);
                setIsValidEmail(true);
            } 
        } catch (error) {
            if (error.response.data.message === "????????? ????????? ???????????????.") {
                setNotMatchError('*' + error.response.data.message);
            }
        }
    };

    const handleOnBlurForPassword = async (event) => {
        event.preventDefault();
        setPasswordMessage('');
        try {
            if (!(password.length > 5)) {
                setPasswordMessage('*??????????????? 6??? ??????????????? ?????????.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    // ?????? ???????????? ??????
    const [isDisabled, setIsDisabled] = useState(true);
    const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const isPassedJoin = () => {
        return emailRegex.test(email) && password.length > 5 ? setIsDisabled(false) : setIsDisabled(true);
    };
    
    return (
        <>
            <Wrapper>
                <Title>???????????? ????????????</Title>
                <Form onSubmit={handleNextButton}>
                    <Fieldset>
                        <Legend>????????????</Legend>
                        <Label htmlFor='email'>?????????</Label>
                        <Input
                            type='email'
                            id='email'
                            ref={emailRef}
                            autoComplete='off'
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            onKeyUp={isPassedJoin}
                            onBlur={handleOnBlurForEmail}
                            placeholder='????????? ????????? ????????? ?????????.'
                        />
                        {notMatchError && <ErrorMessage>{notMatchError}</ErrorMessage>}

                        <Label htmlFor='password' id='labelPassword'>????????????</Label>
                        <Input
                            type='password'
                            id='password'
                            ref={passwordRef}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                            value={password}
                            onKeyUp={isPassedJoin}
                            onBlur={handleOnBlurForPassword}
                            placeholder='??????????????? ????????? ?????????.'
                        />
                        {passwordMessage && <ErrorMessage>{passwordMessage}</ErrorMessage>}
                        
                        <Button 
                            type='submit' 
                            text='??????'
                            disabled={isDisabled}
                        />
                    </Fieldset>
                </Form>
            </Wrapper>
        </>
    );
}