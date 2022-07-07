import styled from 'styled-components';
import partnerProfileImage from '../../../assets/basic-profile-img.png';

const Wrapper = styled.div`
    width: 90vw;
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    justify-content: center;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
`;

const ChatRoomImg = styled.img`
    width: 42px;
    height: 42px;
    margin-right: 12px;
`;

const ChatPartnerName = styled.p`
    font-style: normal;
    font-weight: 800;
    font-size: 16px;
    line-height: 18px;
    margin-bottom: 4px;
    width: 60vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ChatPreview = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 15px;
    color: #767676;
    width: 60vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ChatDate = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 13px;
    color: #DBDBDB;
    margin-top: 24px;
`;

function ChatListItem(props) {
    const { room, onClick } = props;
    
    return (
        <Wrapper onClick={onClick}>
                <div>
                    <ChatRoomImg src={partnerProfileImage} alt='' />
                </div>

                <div>
                    <ChatPartnerName>{room.partner}</ChatPartnerName>
                    <ChatPreview>{room.content}</ChatPreview>
                </div>

                <ChatDate>{room.date}</ChatDate>
        </Wrapper>
    );
}

export default ChatListItem;