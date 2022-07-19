import React from 'react';
import styled from 'styled-components';

const StartBtn = styled.button`
    margin-top: 2.125rem;
    padding: 0.813rem 6.688rem 0.813rem 6.75em;
    border-style: none;
    border-radius: 2.750rem;
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