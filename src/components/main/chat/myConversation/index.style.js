import styled from 'styled-components';

export const Wrapper = styled.div`
    box-sizing: border-box;
    position: relative;
    margin-right: 16px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 12px;
`;

export const Date = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 13px;
    color: #767676;
    position: absolute;
    top: 55px;
    left: 104px;
`;

export const MessageBox = styled.div`
    box-sizing: border-box;
    /* width: 240px; */
    max-width: 240px;
    background: #00BCD4;;
    border: 1px solid #C4C4C4;
    padding: 12px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    border-top-left-radius: 20px;
    margin-bottom: 9px;
    word-break: keep-all;
`;

export const Text = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    display: flex;
    align-items: flex-end;
    color: #FFFFFF;
`;