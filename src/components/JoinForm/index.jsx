import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthProvider';
import { API_URL } from '../../constants/defaultUrl';
import Button from '../emaillogin/button/Button';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 30px;
`;

const Title = styled.h2`
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
    margin-bottom: 40px;
`;

const Form = styled.form`
    width: 322px;
`;

const Legend = styled.legend`
    display: none;
`;

const Label = styled.label`
    display: block;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: #767676;
    margin-top: ${(props) => (props.className === 'password' ? '16px' : null)};
`;

const Input = styled.input`
    outline: none;
    display: block;
    border: none;
    border-bottom: 1px solid #dbdbdb;
    width: 100%;
    height: 32px;
    padding: 0;
    margin-bottom: 6px;
    &:focus {
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

const ErrorMessage = styled.strong`
    display: block;
    color: #eb5757;
    font-weight: 500;
    font-size: 12px;
    line-height: 1;
`;

const SuccessMessage = styled.strong`
    display: block;
    color: green;
    font-weight: 500;
    font-size: 12px;
    line-height: 1;
`;

export function JoinForm({ setNextPage }) {
    const [, setInfoState] = useContext(AuthContext);
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordRecheckRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRecheck, setPasswordRecheck] = useState('');

    const [success, setSuccess] = useState(false);
    const [notMatchError, setNotMatchError] = useState('');
    const [possibleEmailMessage, setPossibleEmailMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [passwordMatch, setPasswordMatch] = useState('');
    const [passwordNotMatch, setPasswordNotMatch] = useState('');

    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        if (password.length > 5 && password === passwordRecheck) {
            setIsValidPassword(true);
        }
    }, [email, password, passwordRecheck]);

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
                        password: password,
                    };
                    return { MyInformations: InfoState.MyInformations };
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
                    email: email,
                },
            };
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await axios.post(
                `${API_URL}/user/emailvalid`,
                reqData,
                config
            );
            if (response?.data?.message === '이미 가입된 이메일 주소 입니다.') {
                setNotMatchError('*' + response.data.message);
            } else if (!email) {
                setNotMatchError('*이메일을 입력해주세요.');
            } else if (
                response?.data?.message === '사용 가능한 이메일 입니다.'
            ) {
                setPossibleEmailMessage('*' + response.data.message);
                setIsValidEmail(true);
            }
        } catch (error) {
            if (error.response.data.message === '잘못된 이메일 형식입니다.') {
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

    const handleOnBlurForPasswordRecheck = (event) => {
        event.preventDefault();
        setPasswordMatch('');
        setPasswordNotMatch('');
        try {
            if (password.length > 5 && password === passwordRecheck) {
                setPasswordMatch('*비밀번호가 일치합니다.');
            } else {
                setPasswordNotMatch('*비밀번호를 다시 확인해주세요.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    // 버튼 활성상태 관리
    const [isDisabled, setIsDisabled] = useState(true);
    const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const isPassedJoin = () => {
        return emailRegex.test(email) &&
            password.length > 5 &&
            password === passwordRecheck
            ? setIsDisabled(false)
            : setIsDisabled(true);
    };

    return (
        <>
            <Wrapper>
                <Title>이메일로 회원가입</Title>
                <Form onSubmit={handleNextButton}>
                    <fieldset>
                        <Legend>회원가입</Legend>
                        <Label htmlFor="email">이메일</Label>
                        <Input
                            type="email"
                            id="email"
                            ref={emailRef}
                            autoComplete="off"
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            onKeyUp={isPassedJoin}
                            onBlur={handleOnBlurForEmail}
                            placeholder="이메일 주소를 입력해 주세요."
                        />
                        {notMatchError && (
                            <ErrorMessage>{notMatchError}</ErrorMessage>
                        )}
                        {possibleEmailMessage && (
                            <SuccessMessage>
                                {possibleEmailMessage}
                            </SuccessMessage>
                        )}

                        <Label
                            htmlFor="password"
                            id="labelPassword"
                            className="password"
                        >
                            비밀번호
                        </Label>
                        <Input
                            type="password"
                            id="password"
                            ref={passwordRef}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                            onKeyUp={isPassedJoin}
                            onBlur={handleOnBlurForPassword}
                            placeholder="비밀번호를 설정해 주세요."
                        />
                        {passwordMessage && (
                            <ErrorMessage>{passwordMessage}</ErrorMessage>
                        )}

                        <Label
                            htmlFor="passwordRecheck"
                            id="labelPasswordRecheck"
                            className="password"
                        >
                            비밀번호 재확인
                        </Label>
                        <Input
                            type="password"
                            id="passwordRecheck"
                            ref={passwordRecheckRef}
                            onChange={(event) =>
                                setPasswordRecheck(event.target.value)
                            }
                            required
                            onKeyUp={isPassedJoin}
                            onBlur={handleOnBlurForPasswordRecheck}
                            placeholder="비밀번호를 다시 입력해 주세요."
                        />
                        {passwordMatch && (
                            <SuccessMessage>{passwordMatch}</SuccessMessage>
                        )}
                        {passwordNotMatch && (
                            <ErrorMessage>{passwordNotMatch}</ErrorMessage>
                        )}

                        <Button
                            type="submit"
                            text="다음"
                            disabled={isDisabled}
                        />
                    </fieldset>
                </Form>
            </Wrapper>
        </>
    );
}
