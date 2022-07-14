import { useHistory } from 'react-router-dom';
import ChatProfileHeader from '../../../components/main/ChatProfileHeader';
import ChatList from '../../../components/main/chat/chatList/index';
import chatData from '../../../components/main/chat/chatData.json';
import styled from 'styled-components';

const Wrapper = styled.div`
    height: 100vh;
`;

function Chatting() {
    // 챗 데이터를 챗 리스트의 rooms props로 전달
    // 챗 리스트(아이템 모음)를 클릭하면 해당 아이템의 id의 페이지로 이동

    const history = useHistory();

    return(
        <Wrapper>
            <ChatProfileHeader />
            <ChatList 
                rooms={chatData}
                onClickItem={(item) => {
                    history.push(`/chatting/${item.id}`);
                }}
            />
        </Wrapper>
    );
}

export default Chatting;