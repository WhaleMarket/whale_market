import { useRef, useState, useEffect, useContext } from 'react';
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

const Join = (props) => {
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
    }, []);

    useEffect(() => {
        setErrorMessage('');
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
            setSuccess(true);
            if (response?.data?.message === "이미 가입된 이메일 주소 입니다.") {
                setSuccess(false);
                setNotMatchError('*' + response.data.message);
            } else if (response?.data?.message === "사용 가능한 이메일 입니다.") {
                setSuccess(false);
                setNotMatchError('*' + response.data.message);
            }
        } catch (error) {
            console.error(error);
            errorRef.current.focus();
        }
    };

    // 버튼 활성상태 관리
    const [buttonOn, setButtonOn] = useState(false);
    const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    const isPassedJoin = () => {
        return emailRegex.test(email) && password.length > 5 ? setButtonOn(true) : setButtonOn(false);
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
                                {(email.length > 5) 
                                && !emailRegex.test(email) 
                                && <ErrorMessage>*올바르지 않은 이메일 형식입니다.</ErrorMessage>
                                }
                                {notMatchError && <ErrorMessage>{notMatchError}</ErrorMessage>}
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
                        style={{ backgroundColor: buttonOn ? '#00BCD4' : '#B2EBF2' , border: '0px', fontWeight: '500', fontSize: '14px', color: 'white'}}
                    />
                </Form>
            </Wrapper>
        </>
    );
}

export default Join;
