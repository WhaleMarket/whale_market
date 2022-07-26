import styled from "styled-components";
import ModalBtn from "../../modal/ModalBtn";

const CommentLi = styled.li`
  list-style: none;
  flex-direction: column;
  padding: 16px 16px 12px;
`;
const ProfileWrapper = styled.div`
  display: flex;
  margin-bottom: 4px;
  justify-content: space-between;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: url(${(props) => props.src});
  background-size: 36px 36px;
  overflow: hidden;
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
  font-size: 14px;
  font-weight: 400;
  margin-left: 48px;
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
