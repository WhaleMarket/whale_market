import React from 'react';
import styled from 'styled-components';

const StartBtn = styled.button`
    padding: 13px 107px 13px 108px;
    border-style: none;
    border-radius: 44px;
    background-color: ${(props) => props.disabled ? '#B2EBF2' : '#00BCD4'};
    color: #fff;
    font-size: 0.875em;
    cursor: ${(props) => props.disabled ? "default" : "pointer"};
`;

function StartButton({disabled}) {
    return(
        <StartBtn type="submit" disabled={disabled}>
            웨일마켓 시작하기
        </StartBtn>
    );
};

export default StartButton;