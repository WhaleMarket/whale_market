import React from 'react';
import { useParams } from "react-router-dom";
import chatData from "../../../components/main/chat/chatData.json";

function ChattingView(props) {
    let { chatId } = useParams();
    const chat = chatData.find((item) => {
        return item.id === chatId;
    });
    
    console.log('????????????');
    return (
        <div>
            <p>{chat}</p>
            <p>{chat}</p>
            <p>{chat}</p>
            <p>{chat}</p>
            <p>{chat}</p>
            <p>{chat}</p>
            <p>{chat}</p>
            <p>{chat}</p>
            <p>{chat}</p>
            <p>{chat}</p>
            <p>{chat}</p>
            <p>{chat}</p>
        </div>
    );
}

export default ChattingView;