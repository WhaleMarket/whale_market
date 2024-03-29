import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Icon404 from '../../assets/icon-404.png';

const NotFoundDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
`;

const NotFoundIcon = styled.img`
    width: 158px;
`;

const NotFoundSpan = styled.span`
    margin: 30px 0 20px;
    color: #767676;
    font-size: 14px;
`;

const NotFoundBtn = styled.button`
    width: 120px;
    height: 44px;
    border: none;
    border-radius: 44px;
    background-color: #00bcd4;
    color: #ffffff;
    font-size: 14px;
    &:hover {
        cursor: pointer;
    }
`;

function NotFound() {
    const history = useHistory();
    return (
        <NotFoundDiv>
            <NotFoundIcon src={Icon404} />
            <NotFoundSpan>페이지를 찾을 수 없습니다. :(</NotFoundSpan>
            <NotFoundBtn onClick={() => history.goBack()}>
                이전 페이지
            </NotFoundBtn>
        </NotFoundDiv>
    );
}

export default NotFound;
