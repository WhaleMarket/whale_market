import { useRef, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider";
import axios from '../../api/axios';
import styled from 'styled-components';
import Button from '../../components/login/Button';

const LOGIN_URL = '/user/login';

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

    :first-child {
        margin-bottom: 16px;
    }
    &:focus {
        border-bottom: 1px solid #00BCD4;
    }
`;

// const ErrorMessage = styled.strong`
//     display: inline-block;
//     color: #EB5757;
//     font-weight: 500;
//     font-size: 12px;
//     line-height: 1;
//     margin-top: 6px;
// `;

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
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('서버가 응답하지 않습니다.');
            } else if (err.response?.status === 400) {
                setErrMsg('사용자 이름 또는 비밀번호가 존재하지 않습니다.');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('로그인 실패');
            }
            errRef.current.focus();
        }
    }

    // 버튼 활성상태 관리
    const [isDisabled, setIsDisabled] = useState(true);
    const isPassedLogin = () => {
        return user.includes('@') && pwd.length > 4 ? setIsDisabled(false) : setIsDisabled(true);
    };

    return (
        <Wrapper>
            <Title>로그인</Title>
            {success ? (
                <Link to='/main' />
            ) : (
            <>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

                <Form onSubmit={handleSubmit}>
                    <div>
                            <Label htmlFor="email">이메일
                                <Input
                                    type="email"
                                    id="email"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setUser(e.target.value)}
                                    required
                                    onKeyUp={isPassedLogin}
                                />
                            </Label>
                    </div>
                    <div>
                            <Label htmlFor="password">비밀번호
                                <Input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                    onKeyUp={isPassedLogin}
                                />
                            </Label>
                    </div>

                    <Button 
                        type="submit" 
                        text="로그인"
                        disabled={isDisabled ? true : false}
                        style={{ backgroundColor: isDisabled ? '#B2EBF2' : '#00BCD4', border: '0px', fontWeight: '500', fontSize: '14px', color: 'white'}}
                    />
                </Form>
                    <StyledLink to='/join'>이메일로 회원가입</StyledLink>
            </>
            )}
        </Wrapper>
    );
}

export default EmailLogin;
