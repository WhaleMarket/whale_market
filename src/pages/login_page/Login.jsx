import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import Button from '../../components/login/Button';
import styled from 'styled-components';
import Logo from '../../assets/Logo.png';

const Wrapper = styled.main`
    width: 100vw;
    background-color: #00BCD4;
    text-align: center;
    padding-top: 25vh;
`;

const LogoImage = styled.img`
    width: 200px;
`;

const Container = styled.section`
    height: 100%;
    margin-top: 200px;
    padding: 50px 30px 125px;
    background-color: white;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    animation: loginbar 1s;

    @keyframes loginbar {
        from {
            margin-top: 400px;
        }
        to {
            margin-top: 200px;
        }
    }
`;

const ButtonList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    gap: 10px;
    margin-bottom: 20px;
`;

const LinkList = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 24px;
`;

const StyledLink = styled(Link)`
    position: relative;
    flex-direction: row;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #767676;
    text-decoration: none;

    :last-child::before {
        content: "|";
        display: block;
        position: absolute;
        top: 0;
        left: -12px;
    }
`;

function Login(){
    const history = useHistory();
    useEffect(() => {
        if (window.localStorage.getItem('token') !== 'undefined' && window.localStorage.getItem('token')) {
            history.push('/main/home');
        }
    }, [history]);
    
    
    return(
        <Wrapper>
        <LogoImage src={Logo} alt='로고' />
        <Container>
            <ButtonList>
                <Button account='kakao' text='카카오톡 계정으로 로그인' />
                <Button account='google' text='구글 계정으로 로그인' />
                <Button account='facebook' text='페이스북 계정으로 로그인' />
            </ButtonList>
            <LinkList>
                <StyledLink to='/emaillogin'>이메일로 로그인</StyledLink>
                <StyledLink to='/join'>회원가입</StyledLink>
            </LinkList>
        </Container>
        </Wrapper>
    );
}

export default Login;