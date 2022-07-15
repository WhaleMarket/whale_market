import styled from 'styled-components';

export const Wrapper = styled.div`
    box-sizing: border-box;
    position: relative;
    margin-left: 16px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 12px;
`;

export const PreviewProfile = styled.a`
    width: 42px;
    height: 42px;
    margin-top: -10px;
`;

export const ProfileImg = styled.img`
    width: 42px;
    height: 42px;
`;

export const MessageBox = styled.div`
    box-sizing: border-box;
    /* width: 240px; */
    max-width: 240px;
    background: #ffffff;;
    border: 1px solid #C4C4C4;
    padding: 12px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
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
    color: #000000;
`;

export const Date = styled.p`
    position: absolute;
    bottom: 3px;
    right: 49px;
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 13px;
    color: #767676;
    margin-bottom: 9px;
`;