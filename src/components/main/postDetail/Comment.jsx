import styled from 'styled-components';
import ModalBtn from '../../modal/ModalBtn';

const CommentLi = styled.li`
    flex-direction: column;
    padding: 6px 16px;
    list-style: none;
    box-sizing: border-box;

    &:first-child {
        padding-top: 16px;
    }

    @media screen and (max-width: 768px) {
        width: 340px;
    }
`;

const ProfileWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

`;

const ProfileImg = styled.img`
    overflow: hidden;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: url(${(props) => props.src});
    background-size: 36px 36px;
    object-fit: cover;
`;
const UserName = styled.span`
    display: flex;
    margin-top: 4px;
    margin-left: 12px;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    text-align: left;
`;

const CommentContent = styled.p`
    width: 250px;
    margin-left: 48px;
    font-size: 14px;
    font-weight: 400;
    word-break: break-all;
    white-space: pre-wrap;
`;

const InfoWrapper = styled.div`
    display: flex;
    align-items: flex-start;
`;

function Comment({
    value,
    index,
    setIsOpenModal,
    isOpenModal,
    setTargetcomment,
    setTargetUser,
}) {
    return (
        <CommentLi key={index}>
            <ProfileWrapper>
                <InfoWrapper>
                    <ProfileImg src={value.author.image} />
                    <UserName>{value.author.username}</UserName>
                </InfoWrapper>
                <ModalBtn
                    className="small"
                    onClick={() => {
                        setIsOpenModal(!isOpenModal);
                        setTargetcomment(value.id);
                        setTargetUser(value.author.accountname);
                    }}
                />
            </ProfileWrapper>
            <CommentContent>{value.content}</CommentContent>
        </CommentLi>
    );
}

export default Comment;
