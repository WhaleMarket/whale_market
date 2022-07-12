import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    box-sizing: border-box;
    width: 100%;
    border-style: none;
    border-radius: 44px;
    background-color: ${(props) => props.disabled ? '#B2EBF2' : '#00BCD4'};
    padding: 12px 86px;

    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: white;
    position: relative;

    background-repeat: no-repeat;
    background-size: 24px 24px;
    background-position: 14px 10px;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

function Button(props) {
    return (
        <StyledButton disabled={props.disabled}>{props.text}</StyledButton>
    );
}

export default Button;