import styled from 'styled-components';

export const Fieldset = styled.fieldset`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    padding: 0 13px;
`;

export const UpLoadImg = styled.img`
    width: 36px;
    height: 36px;
    cursor: pointer;
`;

export const HiddenUpLoadInput = styled.input`
    display: none;
`;

export const Input = styled.input`
    width: calc(100% - 100px);
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
    color: ${(props) => props.disabled ? '#C4C4C4' : '#00BCD4'};
    cursor: ${(props) => props.disabled ? "default" : "pointer"};
`;