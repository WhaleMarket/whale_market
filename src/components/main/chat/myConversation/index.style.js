import styled from 'styled-components';

export const Wrapper = styled.div`
    box-sizing: border-box;
    float: right;
    padding-bottom: 100px;
    margin-right: 16px;
`;

export const Date = styled.p`
    display: inline-block;
    vertical-align: bottom;
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 13px;
    color: #767676;
`;

export const MessageBox = styled.div`
    display: inline-block;
    margin-left: 5px;
    margin-right: 3px;
    box-sizing: border-box;
    /* width: 240px; */
    max-width: 240px;
    background: #00BCD4;
    border: 1px solid #C4C4C4;
    padding: 12px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    border-top-left-radius: 20px;
    word-wrap: break-word;
    word-break: keep-all;
`;

export const Text = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: #FFFFFF;
`;