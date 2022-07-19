import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 90vw;
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    justify-content: center;
    padding: 5px;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
        background-color: #B2EBF2;
    }
`;

export const ChatRoomImg = styled.img`
    width: 42px;
    height: 42px;
    margin-right: 12px;
`;

export const ChatPartnerName = styled.p`
    font-style: normal;
    font-weight: 800;
    font-size: 16px;
    line-height: 18px;
    margin-bottom: 4px;
    width: 60vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const ChatPreview = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 15px;
    color: #767676;
    width: 60vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const ChatDate = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 13px;
    color: #DBDBDB;
    margin-top: 24px;
`;