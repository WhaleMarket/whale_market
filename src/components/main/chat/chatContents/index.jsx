import { useEffect } from 'react';
import { Contents } from './index.style';
import PartnerConversation from '../partnerConversation/index.jsx';
import MyConversation from '../myConversation/index.jsx';

function ChatContents(props) {
    useEffect(() => {
        document.body.style.width = '100%';
        document.body.style.height = '100%';
        document.body.style.backgroundColor = '#F2F2F2';
    }, []);
    
    return (
        <Contents>
            <PartnerConversation contents={props.contents[0]} />
            <PartnerConversation contents={props.contents[1]} />
            <PartnerConversation contents={props.contents[2]} />
            <MyConversation myText={props.myText} />
        </Contents>
    );
}

export default ChatContents;