import styled from "styled-components";
import ModalBtn from "../../modal/ModalBtn";

const CommentLi = styled.li`
  list-style: none;
  flex-direction: column;
  /* margin-bottom: 16px; */
  padding: 16px 16px 12px;
`;
const ProfileWrapper = styled.div`
  display: flex;
  margin-bottom: 4px;
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
  width: 100%;
  margin-top: 4px;
  /* align-items: center; */
  margin-left: 12px;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  text-align: left;
`;

const CommentContent = styled.p`
  font-size: 14px;
  font-weight: 400;
  /* line-height: 18px; */
  /* text-align: left; */
  margin-left: 48px;
`;

function Comment({ value, index }) {
  return (
    <CommentLi key={index}>
      <ProfileWrapper>
        <ProfileImg src={value.author.image} />
        <UserName>{value.author.username}</UserName>
        <ModalBtn className="small" />
      </ProfileWrapper>
      <CommentContent>{value.content}</CommentContent>
    </CommentLi>
  );
}

export default Comment;
