import { useHistory } from "react-router-dom";
import ChatProfileHeader from "../../../components/main/chat/ChatProfileHeader";
import ChatList from "../../../components/main/chat/ChatList";
import chatData from "../../../components/main/chat/chatData.json";

function Chatting(props) {
    const {} = props;
    const history = useHistory();
    console.log('props', props)
    return(
        <>
            <ChatProfileHeader />
            <ChatList 
                rooms={chatData}
                onClickItem={(item) => {
                    history.push(`/chatting/${item.id}`);
                }}
            />
        </>
    );
}

export default Chatting;