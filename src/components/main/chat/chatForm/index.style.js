import styled from 'styled-components';
import UpLoadFile from '../../../../assets/upload-file.png';

export const Form = styled.form`
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    width: 100vw;
`;

export const ButtonUpLoad = styled.button`
    width: 36px;
    height: 36px;
    background: no-repeat url(${UpLoadFile});
    background-size: contain;
    border:none; 
    box-shadow:none; 
    border-radius: 0; 
    cursor: pointer;
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
    color: ${(props) => props.disabled ? '#C4C4C4' : '#00BCD4'};
    cursor: ${(props) => props.disabled ? "default" : "pointer"};
`;