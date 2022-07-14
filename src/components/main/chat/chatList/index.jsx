import ChatListItem from '../chatListItem/index.jsx';
import { Wrapper } from './index.style';

function ChatList(props) {
    // Chatting에서 props 받아옴
    // ChatList는 각방(item)에 key, room을 props로 전달
    // 채팅 각방(item)을 클릭하면 room이 나옴
    const { rooms, onClickItem } = props;

    return (
        <Wrapper>
            {rooms.map((room, index) => {
                return (
                    <ChatListItem 
                        key={room.id}
                        room={room}
                        onClick={() => {onClickItem(room)}}
                    />
                );
            })}
        </Wrapper>
    );
}

export default ChatList;