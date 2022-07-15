import { Contents } from './index.style';
import PartnerConversation from '../partnerConversation/index.jsx';
import MyConversation from '../myConversation/index.jsx';

function ChatContents(props) {
    return (
        <Contents>
            <PartnerConversation contents={props.contents[0]} />
            <PartnerConversation contents={props.contents[1]} />
            <PartnerConversation contents={props.contents[2]} />
            <MyConversation />
        </Contents>
    );
}

export default ChatContents;