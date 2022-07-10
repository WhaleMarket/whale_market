import React from 'react';
import styled from 'styled-components';
import LogoKakao from '../../assets/kakao-logo.png';
import LogoGoogle from '../../assets/google-logo.png';
import LogoFacebook from '../../assets/facebook-logo.png';

const StyledButton = styled.button`
box-sizing: border-box;
    width: 100%;
    border: 1px solid ${(props) => (
        props.account === 'kakao' && '#F2C94C') 
        || (props.account === 'google' && '#767676;') 
        || (props.account === 'facebook' && '#2D9CDB;')
    };
    border-radius: 44px;
    background-color: white;
    padding: 12px 86px;

    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #767676;
    position: relative;

    background-image: url(${(props) => (
        props.account === 'kakao' && `${LogoKakao}`) 
        || (props.account === 'google' && `${LogoGoogle}`) 
        || (props.account === 'facebook' && `${LogoFacebook}`)
    });
    background-repeat: no-repeat;
    background-size: 24px 24px;
    background-position: 14px 10px;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    
    @media (max-width: 768px) {
        padding: 12px 50px
    }
    
    @media (max-width: 540px) {
    }
`;

function Button(props) {
    return (
        <StyledButton account={props.account} disabled={props.disabled} style={props.style}>{props.text}</StyledButton>
    );
}

export default Button;