import { useRef, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider";
import axios from 'axios';
import { API_URL } from '../../constants/defaultUrl';
import styled from 'styled-components';
import Button from '../../components/login/Button';

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

const Label = styled.label`
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: #767676;
`;

const Input = styled.input`
    outline: none;
    display: block;
    border : none;
    border-bottom: 1px solid #DBDBDB;
    width: 100%;
    height: 32px;
    padding: 0;
    &:first-child {
        margin-bottom: 6px;
    }
    &:focus {
        border-bottom: 1px solid #00BCD4;
    }
`;

const ErrorMessage = styled.strong`
    display: inline-block;
    color: #EB5757;
    font-weight: 500;
    font-size: 12px;
    line-height: 1;
    margin-bottom: 16px;
`;

const StyledLink = styled(Link)`
    position: relative;
    flex-direction: row;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #767676;
    text-decoration: none;
    margin-top: 20px;
`;


const EmailLogin = (props) => {
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
                user: { email: email, password: password},
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
            
            // 로그인 데이터 확인용 콘솔로그
            // console.log(JSON.stringify(response?.data));
            // console.log(JSON.stringify(response));

            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ email, password, roles, accessToken });
            setEmail('');
            setPassword('');
            setSuccess(true);

            if (response?.data?.status === 422) {
                setSuccess(false);
                setNotMatchError(response.data.message);
            }

        } catch (error) {
            if (!error?.response) {
                setErrorMessage('서버가 응답하지 않습니다.');
            } else if (error.response?.status === 400) {
                setErrorMessage('이메일 또는 비밀번호가 일치하지 않습니다.');
            } else if (error.response?.status === 401) {
                setErrorMessage('Unauthorized');
            } else {
                setErrorMessage('로그인 실패');
            }
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
                            disabled={isDisabled ? true : false}
                            style={{ backgroundColor: isDisabled ? '#B2EBF2' : '#00BCD4', border: '0px', fontWeight: '500', fontSize: '14px', color: 'white'}}
                        />
                    </Form>
                    <StyledLink to='/join'>이메일로 회원가입</StyledLink>
                </Wrapper>
            )}
        </>
    );
}

export default EmailLogin;