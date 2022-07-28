import React, { useState, useContext } from "react";
import ModalBtn from "../../../modal/ModalBtn";
import Modal from "../../../modal/Modal";
import AlertModal from "../../../modal/AlertModal";
import styled from "styled-components";
import PostIconContainer from "./PostIconContainer";
import AuthContext from "../../../../context/AuthProvider";
import axios from "axios";
import { API_URL } from "../../../../constants/defaultUrl";
import PostingContext from "../../../../context/PostingProvider";
import { useHistory  } from 'react-router-dom';

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  margin-bottom: 0 auto 34px;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    width: 400px;
  }
`;

const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
`;

const UserImgDiv = styled.div`
  display: inline-block;
  width: 42px;
  height: 42px;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
`;

const PostInfoUser = styled.div`
  display: inline-block;
  margin-left: 12px;
  padding-top: 4px;
  vertical-align: top;
`;

const PostInfoName = styled.strong`
  font-size: 14px;
  font-weight: 500;
`;

const PostInfoId = styled.p`
  margin-top: 2px;
  font-size: 12px;
  color: #767676;
`;

const PostContentList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const PostContent = styled.li`
  padding: 36px 50px 32px;
  border: solid #DBDBDB 1px;
  border-radius: 10px;
  margin-bottom: 30px;
  word-break: break-word;
  box-sizing: border-box;
  white-space: pre-wrap;

  @media screen and (max-width: 768px) {
    width: 400px;
    padding: 26px 30px 25px;
  }
`;

const PostTxt = styled.p`
  margin-bottom: 16px;
  font-size: 14px;
  line-height: 18px;
  @media screen and (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

const PostImgWrapper = styled.div`
  margin: 0 auto 24px auto;
  margin-bottom: 16px;
`;

const PostImg = styled.img`
  overflow: hidden;
  width: 502px;
  height: 401px;
  border-radius: 10px;
  object-fit: cover;

  @media screen and (max-width: 768px) {
    width: 338px;
    height: 270px;
  }
`;

const PostDate = styled.p`
  margin-top: 16px;
  color: #767676;
  font-size: 10px;
  @media screen and (max-width: 768px) {
  }
`;

function PostCard() {
  const [PostingState] = useContext(PostingContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [InfoState] = useContext(AuthContext);
  const [targetPost, setTargetPost] = useState('');
  const history = useHistory();

  const modalItemList = [
    {
      content: "삭제",
      onClick: () => {
        setAlertModal(true);
      },
    },
    {
      content: "수정",
      onClick: () => {
        const GetPost = async (id) => {
          history.push('/postingedit/'+id);
        };
        GetPost(targetPost);
      },
    },
  ];

  const removePost = async (id) => {
    try {
      const deleteConfig = {
        headers: {
          Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
          "Content-type": "application/json",
        },
      };
      await axios.delete(`${API_URL}/post/` + id, deleteConfig);
      alert("🐳 게시글이 삭제되었습니다. 🐳");
      window.location.href = "./" + InfoState.MyInformations[0].myAccountname;
    } catch (error) {
      console.error(error);
      alert("error");
    }
  };
  
  return (
    <>
      <PostWrapper>
        <PostContentList>
          {PostingState.data[0].postdata?.map((post, index) => {
            let createAt = post.createdAt;
            let timeGap = parseInt(Date.now() - new Date(createAt));
            let hoursGap = Math.floor(timeGap / 3600000);
            let minsGap = Math.floor(timeGap / 60000);
            let secsGap = Math.floor(timeGap / 1000);
            return (
              <PostContent key={index}>
                <PostInfo>
                  <div>
                    <UserImgDiv src={PostingState.data[0].user.image} />
                    <PostInfoUser>
                      <PostInfoName>{post.author.username}</PostInfoName>
                      <PostInfoId>{`@${post.author.accountname}`}</PostInfoId>
                    </PostInfoUser>
                  </div>
                  <ModalBtn
                    className="small"
                    onClick={() => {
                      setIsOpenModal(!isOpenModal);
                      setTargetPost(post.id);
                    }}
                  />
                </PostInfo>
                <PostTxt>{post.content}</PostTxt>
                <PostImgWrapper>
                  {post.image !== "" &&
                    post.image.split(",").map((value, key) => {
                      return <PostImg key={key} src={value} />;
                    })}
                </PostImgWrapper>
                <PostIconContainer
                  index={index}
                  id={post.id}
                  like={post.heartCount}
                  liked={post.hearted}
                  comment={post.commentCount}
                  image={post.image}
                  content={post.content}
                />
                <PostDate>
                  {hoursGap < 24
                    ? minsGap < 60
                      ? secsGap < 60
                        ? `방금 전`
                        : `${minsGap}분 전`
                      : `${hoursGap}시간 전`
                    : `${createAt.substr(0, 10).split("-")[0]}년 ${
                        createAt.substr(0, 10).split("-")[1]
                      }월 ${createAt.substr(0, 10).split("-")[2]}일`}
                </PostDate>
              </PostContent>
            );
          })}
        </PostContentList>
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
          deleteBtn={{
            content: "삭제",
            onClick: () => {
              removePost(targetPost);
            },
          }}
        />
      </PostWrapper>
    </>
  );
}

export default PostCard;
