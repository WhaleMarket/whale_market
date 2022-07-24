import React, { useState, useContext } from "react";
import ModalBtn from "../../../modal/ModalBtn";
import Modal from "../../../modal/Modal";
import AlertModal from "../../../modal/AlertModal";
import styled from "styled-components";
import PostIconContainer from "./PostIconContainer";
import AuthContext from "../../../../context/AuthProvider";

const PostWrapper = styled.div`
  width: 24.375rem;
  margin: 0 auto 3.75rem auto;
`;

const PostInfo = styled.div`
  display: flex;
  padding: 1rem 0;
`;

const UserImgDiv = styled.div`
  width: 2.625rem;
  height: 2.625rem;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
`;

const PostInfoUser = styled.div`
  margin-left: 0.75rem;
  padding-top: 0.25rem;
  margin-right: 175px;
`;

const PostInfoName = styled.strong`
  font-size: 0.875rem;
  font-weight: 500;
`;

const PostInfoId = styled.p`
  margin-top: 2px;
  font-size: 0.75rem;
  color: #767676;
`;

const PostContentList = styled.ul``;

const PostContent = styled.li`
  margin-left: 3.375rem;
  padding-left: 0.75rem;
  padding-bottom: 20px;
  border: solid black 1px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const PostTxt = styled.p`
  margin-bottom: 1rem;
  font-size: 0.875rem;
  line-height: 1.125rem;
`;

const PostImgWrapper = styled.div``;
const PostImg = styled.img`
  width: 19rem;
  margin-bottom: 0.75rem;
  border-radius: 10px;
`;

const PostDate = styled.p`
  margin-top: 1rem;
  color: #767676;
  font-size: 0.625em;
`;

function PostCard() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);

  const modalItemList = [
    {
      content: "삭제",
      onClick: () => {
        setAlertModal(true);
      },
    },
    {
      content: "수정",
      onClick: () => {},
    },
  ];

  const deleteBtn = {
    content: "삭제",
    onClick: () => {},
  };

  const [InfoState] = useContext(AuthContext);

  const rendering = () => {
    const result = [];
    for (let i = 0; i < InfoState.MyInformations[3].content.length; i++) {
      result.push(
        <PostContent key={i}>
          <PostInfo>
            <UserImgDiv src={InfoState.MyInformations[0].myImage} />
            <PostInfoUser>
              <PostInfoName>
                {InfoState.MyInformations[0].myUsername}
              </PostInfoName>
              <PostInfoId>
                {`@${InfoState.MyInformations[0].myAccountname}`}
              </PostInfoId>
            </PostInfoUser>
            <ModalBtn onClick={() => setIsOpenModal(!isOpenModal)} />
            <Modal
              isOpenModal={isOpenModal}
              setIsOpenModal={setIsOpenModal}
              modalItemList={modalItemList}
            />
            <AlertModal
              alertModal={alertModal}
              setAlertModal={setAlertModal}
              setIsOpenModal={setIsOpenModal}
              content={"게시글을 삭제할까요?"}
              deleteBtn={deleteBtn}
            />
          </PostInfo>
          <PostTxt>{InfoState.MyInformations[3].content[i]}</PostTxt>
          <PostImgWrapper>
            {InfoState.MyInformations[3].image[i]
              ?.split(",")
              .map((value, key) => {
                return <PostImg key={key} src={value} />;
              })}
          </PostImgWrapper>
          <PostIconContainer
            id={InfoState.MyInformations[3].id[i]}
            like={InfoState.MyInformations[3].heartCount[i]}
            liked={InfoState.MyInformations[3].hearted[i]}
            comment={InfoState.MyInformations[3].commentCount[i]}
          />
          <PostDate>{InfoState.MyInformations[3].createdAt[i]}</PostDate>
        </PostContent>
      );
    }
    return result;
  };

  return (
    <>
      <PostWrapper>
        <PostContentList>{rendering()}</PostContentList>
      </PostWrapper>
    </>
  );
}

export default PostCard;
