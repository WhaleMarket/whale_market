import { Wrapper, ChatRoomImg, ChatPartnerName, ChatPreview, ChatDate } from './index.style';
import partnerProfileImage from '../../../../assets/basic-profile-img.png';


function ChatListItem(props) {
    // ChatList로부터 rooms과 onClick props 상속받음
    
    const { room, onClick } = props;
    
    return (
        <Wrapper onClick={onClick}>
                <div>
                    <ChatRoomImg src={partnerProfileImage} alt='' />
                </div>

                <div>
                    <ChatPartnerName>{room.partner}</ChatPartnerName>
                    <ChatPreview>{room.contents[2]}</ChatPreview>
                </div>

                <ChatDate>{room.date}</ChatDate>
        </Wrapper>
    );
}

export default ChatListItem;