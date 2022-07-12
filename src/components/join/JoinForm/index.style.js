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

export const Label = styled.label`
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: #767676;
`;

export const Input = styled.input`
    outline: none;
    display: block;
    border : none;
    border-bottom: 1px solid #DBDBDB;
    width: 100%;
    height: 32px;
    padding: 0;

    &:first-child {
        margin-bottom: 6px;
    }
    &:focus {
        border-bottom: 1px solid #00BCD4;
    }
`;

export const ErrorMessage = styled.strong`
    display: inline-block;
    color: #EB5757;
    font-weight: 500;
    font-size: 12px;
    line-height: 1;
    margin-bottom: 16px;
`;