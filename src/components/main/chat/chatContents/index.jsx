import { Contents } from './index.style';
import PartnerConversation from '../partnerConversation/index.jsx';

function ChatContents(props) {
    return (
        <Contents>
            <PartnerConversation contents={props.contents[0]} />
            <PartnerConversation contents={props.contents[1]} />
            <PartnerConversation contents={props.contents[2]} />
        </Contents>
    );
}

export default ChatContents;