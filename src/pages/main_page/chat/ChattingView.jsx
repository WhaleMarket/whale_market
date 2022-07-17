import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import chatData from '../../../components/main/chat/chatData.json';
import ChatProfileHeader from "../../../components/main/ChatProfileHeader";
import ChatContents from '../../../components/main/chat/chatContents/index.jsx';
import ChatForm from '../../../components/main/chat/chatForm';

function ChattingView(props) {
    const { chatId } = useParams();

    const chat = chatData.find((item) => {
        return item.id === parseInt(chatId);
    });
    
    const [myText, setMyText] = useState('');
    const sendMessage = (x) => {
        setMyText(x);
    };
    console.log(myText);

    return (
        <div>
            <ChatProfileHeader partner={chat.partner} />
            <ChatContents contents={chat.contents} myText={myText}></ChatContents>
            <ChatForm sendMessage={sendMessage} />
        </div>
    );
}

export default ChattingView;