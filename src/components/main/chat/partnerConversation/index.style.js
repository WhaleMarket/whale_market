import styled from 'styled-components';

export const Wrapper = styled.div`
    box-sizing: border-box;
    margin-left: 16px;
    margin-bottom: 15px;
`;

export const PreviewProfile = styled.a`
    display: inline-block;
    vertical-align: top;
    margin-top: -15px;
    width: 42px;
    height: 42px;
`;

export const ProfileImg = styled.img`
    width: 42px;
    height: 42px;
`;

export const MessageBox = styled.div`
    display: inline-block;
    margin-left: 5px;
    margin-right: 3px;
    box-sizing: border-box;
    /* width: 240px; */
    max-width: 240px;
    background: #ffffff;
    border: 1px solid #C4C4C4;
    padding: 12px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
    word-wrap: break-word;
    word-break: keep-all;
`;

export const Text = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: #000000;
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