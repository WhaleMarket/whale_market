import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../../../context/AuthProvider";
import axios from 'axios';
import { API_URL } from '../../../constants/defaultUrl';
import Button from '../../emaillogin/button/Button';
import { Wrapper, Title, Form, Label, Input, ErrorMessage, StyledLink } from './index.style';

export function LoginForm(props) {
    const { setAuth } = useContext(AuthContext);
    const emailRef = useRef();
    const errorRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [notMatchError, setNotMatchError] = useState('');

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrorMessage('');
    }, [email, password])

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const reqData = {
                user: { email: email, password: password },
            };

            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const response = await axios.post(
                `${API_URL}/user/login`,
                reqData,
                config
            );
            
            // 로그인 데이터 확인
            // console.log(JSON.stringify(response?.data));
            console.log(JSON.stringify(response));

            const token = response?.data?.token;
            setAuth({ email, password, token });

            setSuccess(true);

            if (response?.data?.status === 422) {
                setSuccess(false);
                setNotMatchError('*' + response.data.message);
            }

        } catch (error) {
            console.error(error);
            errorRef.current.focus();
        }
    }

    // 버튼 활성상태 관리
    const [isDisabled, setIsDisabled] = useState(true);
    const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    const isPassedLogin = () => {
        return emailRegex.test(email) && password.length > 5 ? setIsDisabled(false) : setIsDisabled(true);
    };

    return (
        <>
            {success ? (
                window.location.href = '/main/home'
            ) : (
                <Wrapper>
                    <Title>로그인</Title>
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
                                        onKeyUp={isPassedLogin}
                                    />
                                    {(email.length > 5) 
                                    && !emailRegex.test(email) 
                                    && <ErrorMessage>*올바르지 않은 이메일 형식입니다.</ErrorMessage>
                                    }
                                </Label>
                        </div>
                        <div>
                                <Label htmlFor='password'>비밀번호
                                    <Input
                                        type='password'
                                        id='password'
                                        onChange={(event) => setPassword(event.target.value)}
                                        value={password}
                                        required
                                        onKeyUp={isPassedLogin}
                                    />
                                    {notMatchError && <ErrorMessage>{notMatchError}</ErrorMessage>}
                                </Label>
                        </div>
                        <Button 
                            type='submit' 
                            text='로그인'
                            disabled={isDisabled}
                        />
                    </Form>

                    <StyledLink to='/join'>이메일로 회원가입</StyledLink>
                </Wrapper>
            )}
        </>
    );
};