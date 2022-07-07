import React from 'react';
import { useParams } from "react-router-dom";
import chatData from '../../../components/main/chat/chatData.json';
import ChatProfileHeader from "../../../components/main/chat/ChatProfileHeader";
import styled from 'styled-components';

const Wrapper = styled.div`
    height: 100vh;
    background-color: #F2F2F2;
`;

function ChattingView(props) {
    const { chatId } = useParams();

    const chat = chatData.find((item) => {
        return item.id === parseInt(chatId);
    });
    
    // TODO: 채팅내용을 변수로 담아서 대화 구현하기

    return (
        <Wrapper>
            <ChatProfileHeader partner={chat.partner}/>
            <p>{chat.content}</p>
        </Wrapper>
    );
}

export default ChattingView;