import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 30px;
`;

export const Title = styled.h2`
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
    margin-bottom: 40px;
`;

export const Form = styled.form`
    width: 322px;
`;

export const Legend = styled.legend`
    display: none;
`;

export const Label = styled.label`
    display: block;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: #767676;
    margin-top: ${(props) => (props.className === 'password' ? '16px' : null)};
`;

export const Input = styled.input`
    outline: none;
    display: block;
    border: none;
    border-bottom: 1px solid #dbdbdb;
    width: 100%;
    height: 32px;
    padding: 0;
    margin-bottom: 6px;
    &:focus {
        border-bottom: 1px solid #00bcd4;
    }
    &::placeholder {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 14px;
        color: #dbdbdb;
    }
`;

export const ErrorMessage = styled.strong`
    display: inline-block;
    color: #eb5757;
    font-weight: 500;
    font-size: 12px;
    line-height: 1;
`;

export const SuccessMessage = styled.strong`
    display: inline-block;
    color: green;
    font-weight: 500;
    font-size: 12px;
    line-height: 1;
`;
