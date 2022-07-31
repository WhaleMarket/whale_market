import { useRef, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../../context/AuthProvider';
import { API_URL } from '../../../constants/defaultUrl';
import { Link } from 'react-router-dom';
import LoadingPage from '../../../pages/LoadingPage';
import Button from '../../emaillogin/button/Button';
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

const Label = styled.label`
    display: block;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: #767676;
    margin-top: ${(props) => (props.id === 'labelPassword' ? '16px' : null)};
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
    display: inline-block;
    color: #eb5757;
    font-weight: 500;
    font-size: 12px;
    line-height: 1;
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

export function LoginForm() {
    const [, setInfoState] = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const emailRef = useRef();
    const errorRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [notMatchError, setNotMatchError] = useState('');

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setPassword('');
        setLoading(true);
        try {
            const reqData = {
                user: { email: email, password: password },
            };

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const response = await axios.post(
                `${API_URL}/user/login`,
                reqData,
                config
            );

            const token = response?.data?.user?.token;
            setInfoState((InfoState) => {
                InfoState.MyInformations[1] = {
                    ...InfoState.MyInformations[1],
                    email: email,
                    password: password,
                    token: token,
                };
                return { MyInformations: InfoState.MyInformations };
            });

            // 로컬스토리지 저장
            localStorage.setItem('token', response?.data?.user?.token);

            setSuccess(true);

            if (!emailRegex.test(email)) {
                setSuccess(false);
                setNotMatchError('*올바르지 않은 이메일 형식입니다.');
            } else if (response?.data?.status === 422) {
                setSuccess(false);
                setNotMatchError('*' + response?.data?.message);
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            errorRef.current.focus();
        }
    };

    // 버튼 활성상태 관리
    const [isDisabled, setIsDisabled] = useState(true);
    const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    const isPassedLogin = () => {
        return email.length > 0 && password.length > 0
            ? setIsDisabled(false)
            : setIsDisabled(true);
    };

    return loading ? (
        <LoadingPage />
    ) : (
        <>
            {success ? (
                (window.location.href = '/main/home')
            ) : (
                <Wrapper>
                    <Title>로그인</Title>
                    <Form onSubmit={handleSubmit}>
                        <fieldset>
                            <legend className="a11yhidden">로그인</legend>
                            <Label htmlFor="email">이메일</Label>
                            <Input
                                type="email"
                                id="email"
                                ref={emailRef}
                                autoComplete="off"
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                onKeyUp={isPassedLogin}
                                placeholder="이메일 주소를 입력해 주세요."
                                required
                            />

                            <Label htmlFor="password" id="labelPassword">
                                비밀번호
                            </Label>
                            <Input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                onKeyUp={isPassedLogin}
                                placeholder="비밀번호를 입력해 주세요."
                                required
                            />
                            {notMatchError && (
                                <ErrorMessage>{notMatchError}</ErrorMessage>
                            )}
                        </fieldset>
                        <Button
                            type="submit"
                            text="로그인"
                            disabled={isDisabled}
                        />
                    </Form>

                    <StyledLink to="/join">이메일로 회원가입</StyledLink>
                </Wrapper>
            )}
        </>
    );
}
