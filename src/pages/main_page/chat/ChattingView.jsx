import React from 'react';
import { useParams } from "react-router-dom";
import chatData from '../../../components/main/chat/chatData.json';
import ChatProfileHeader from "../../../components/main/ChatProfileHeader";
import ChatContents from '../../../components/main/chat/ChatContents';
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

    return (
        <Wrapper>
            <ChatProfileHeader partner={chat.partner} />
            <ChatContents content={chat.content}></ChatContents>
        </Wrapper>
    );
}

export default ChattingView;