import ChatListItem from "./ChatListItem";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    & > * {
        :not(:last-child) {
        margin-bottom: 20px;
        }
    }
`;

function ChatList(props) {
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