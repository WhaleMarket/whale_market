import styled from 'styled-components';

export const Form = styled.form`
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    width: 100vw;
`;

export const ButtonUpLoad = styled.img`
    width: 36px;
    `;

export const Input = styled.input`
    border-style: none;
    outline: none;
    font-size:16px;
    height: 61px;
    &::placeholder {
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #C4C4C4
    }
    `;

export const SendButton = styled.button`
    background: inherit; 
    border:none; 
    box-shadow:none; 
    border-radius: 0; 
    font-size: 16px;
    color: #C4C4C4;
    cursor: pointer;
`;