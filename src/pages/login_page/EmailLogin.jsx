import React, { useState } from 'react';
import Button from '../../components/login/Button';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 30px;

    h2 {
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 30px;
        margin-bottom: 40px;
    }
`;

const StyledForm = styled.form`
    width: 322px;
`;

const StyledLabel = styled.label`
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: #767676;
`;

const StyledInput = styled.input`
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


function EmailLogin(props) {
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    
    const handleEmailInput = (event) => {
        setEmailInput(event.target.value);
    };
    
    const handlePasswordInput = (event) => {
        setPasswordInput(event.target.value);
    };
    
    const handleSubmit = (event) => {
        alert('?');
        event.preventDefault();
    };

    // 로그인 버튼 활성상태 변경: 이메일인풋에 @, 비밀번호 5자이상 입력시 활성화
    const [isDisabled, setIsDisabled] = useState(true);
    const isPassedLogin = () => {
        return emailInput.includes('@') && passwordInput.length > 4 ? setIsDisabled(false) : setIsDisabled(true);
    };

    // TODO: 유효성 검사
    // 버튼 클릭 시 이메일주소 및 비밀번호에 대한 유효성 검사 진행하는 기능
    // 비밀번호가 일치하지 않는 경우 경고 문구보이는 기능 
    

    return (
        <Wrapper>
            <h2>로그인</h2>
            <StyledForm onSubmit={handleSubmit}>
                <div>
                    <StyledLabel htmlFor="email">이메일
                        <StyledInput 
                            id="email" 
                            type="email" 
                            onChange={handleEmailInput}
                            onKeyUp={isPassedLogin}
                            // className={emailInput}
                        />
                    </StyledLabel>
                </div>

                <div>
                    <StyledLabel htmlFor="password">비밀번호
                        <StyledInput 
                            id="password" 
                            type="password" 
                            onChange={handlePasswordInput}
                            onKeyUp={isPassedLogin}
                            // className={passwordInput}
                        />
                    </StyledLabel>
                </div>

                <Button 
                    type="submit" 
                    text="로그인"
                    disabled={isDisabled ? true : false}
                    style={{ backgroundColor: isDisabled ? '#B2EBF2' : '#00BCD4', border: '0px', fontWeight: '500', fontSize: '14px', color: 'white'}}
                />
            </StyledForm>
            <StyledLink to='/join'>이메일로 회원가입</StyledLink>
            
        </Wrapper>
    );
}

export default EmailLogin;