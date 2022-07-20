import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import chatData from '../../../components/main/chat/chatData.json';
import ChatProfileHeader from "../../../components/main/ChatProfileHeader";
import ChatContents from '../../../components/main/chat/chatContents/index.jsx';
import ChatForm from '../../../components/main/chat/chatForm';
import styled from 'styled-components';

const Wrapper = styled.div`
    height: 100%;
`;

function ChattingView(props) {
    const { chatId } = useParams();

    const chat = chatData.find((item) => {
        return item.id === parseInt(chatId);
    });
    
    const [myText, setMyText] = useState('');
    const sendMessage = (messageFromChatForm) => {
        setMyText(messageFromChatForm);
    };

    const [pop, setPop] = useState(false);
    const popMessage = () => {
        setPop(true);
    }

    return (
        <Wrapper>
            <ChatProfileHeader partner={chat.partner} />
            <ChatContents contents={chat.contents} myText={myText} pop={pop}></ChatContents>
            <ChatForm sendMessage={sendMessage} popMessage={popMessage}/>
        </Wrapper>
    );
}

export default ChattingView;