import React, { useState, useContext } from "react";
import ModalBtn from "../../../modal/ModalBtn";
import Modal from "../../../modal/Modal";
import AlertModal from "../../../modal/AlertModal";
import styled from "styled-components";
import PostIconContainer from "./PostIconContainer";
import AuthContext from "../../../../context/AuthProvider";
import axios from 'axios';
import { API_URL } from '../../../../constants/defaultUrl';

const PostWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 60vw;
    margin-bottom: 34px;
    padding: 0 4%;
    box-sizing: border-box;
    @media screen and (max-width: 500px) {
    width: 100%;
  } 
`;

const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
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
  margin-left: 0.75rem;
  padding-top: 0.25rem;
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
  padding: 0 8% 30px;
  border: solid #DBDBDB 1px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const PostTxt = styled.p`
  margin-bottom: 28px;
  font-size: 14px;
  line-height: 18px;
  @media screen and (max-width: 855px) {
    margin-bottom: 16px;
  } 
`;

const PostImgWrapper = styled.div`
  width: 100%;
  margin: 0 auto 24px auto;
  text-align: center;
  @media screen and (max-width: 855px) {
    margin-bottom: 12px;
  } 
  `;

const PostImg = styled.img`
  overflow: hidden;
  width: 100%;
  height: 400px;
  border-radius: 10px;
  object-fit: cover;
  @media screen and (max-width: 855px) {
    height: 228px;
  }
`;

const PostDate = styled.p`
  margin-top: 24px;
  color: #767676;
  font-size: 10px;
  @media screen and (max-width: 855px) {
    margin-top: 16px;
  }
`;

function PostCard() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [InfoState, setInfoState] = useContext(AuthContext);

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



  const rendering = () => {
    const result = [];

    for (let i = 0; i < InfoState.MyInformations[3].content.length; i++) {
      const deleteBtn = {
        content: "삭제",
        onClick: async () => {
            try{
              const deleteConfig = {
                headers: {
                  "Authorization": `Bearer ${InfoState.MyInformations[0].token}`,
                  "Content-type": "application/json",
                },
              };
              await axios.delete(
                `${API_URL}/post/${InfoState.MyInformations[3].id[i]}`,
                deleteConfig
              );

                setInfoState((InfoState) => {
                  InfoState.MyInformations[3] = {
                    ...InfoState.MyInformations[3],
                    id: InfoState.MyInforMations[3].id.filter((value) => {
                      return value !== InfoState.MyInforMations[3].id[i];
                    }),
                    content: InfoState.MyInforMations[3].content.filter((value) => {
                      return value !== InfoState.MyInforMations[3].content[i];
                    }),
                    image: InfoState.MyInforMations[3].image.filter((value) => {
                      return value !== InfoState.MyInforMations[3].image[i];
                    }),
                    createdAt: InfoState.MyInforMations[3].createdAt.filter((value) => {
                      return value !== InfoState.MyInforMations[3].createdAt[i];
                    }),
                    updatedAt: InfoState.MyInforMations[3].updatedAt.filter((value) => {
                      return value !== InfoState.MyInforMations[3].updatedAt[i];
                    }),
                    hearted: InfoState.MyInforMations[3].hearted.filter((value) => {
                      return value !== InfoState.MyInforMations[3].hearted[i];
                    }),
                    heartCount: InfoState.MyInforMations[3].heartCount.filter((value) => {
                      return value !== InfoState.MyInforMations[3].heartCount[i];
                    }),
                    commentCount: InfoState.MyInforMations[3].commentCount.filter((value) => {
                      return value !== InfoState.MyInforMations[3].commentCount[i];
                    }),
                  };
                  return { MyInformations: InfoState.MyInformations };
                });  
            alert('🐳 게시글이 삭제되었습니다. 🐳');
            window.location.href = '/main/myprofile';
            } catch(error) {
              console.error(error)
              alert('error');
            }
          }
        };

      const createAt = InfoState.MyInformations[3].createdAt[i];
      const timeGap = parseInt(Date.now() - new Date(createAt));
      const hoursGap = Math.floor(timeGap /3600000);
      const minsGap = Math.floor(timeGap / 60000);
      const secsGap = Math.floor(timeGap / 1000);

      result.push(
        <PostContent key={i}>
          <PostInfo>
            <div>
            <UserImgDiv src={InfoState.MyInformations[0].myImage} />
            <PostInfoUser>
              <PostInfoName>
                {InfoState.MyInformations[0].myUsername}
              </PostInfoName>
              <PostInfoId>
                {`@${InfoState.MyInformations[0].myAccountname}`}
              </PostInfoId>
            </PostInfoUser>
            </div>
            <ModalBtn
              className="small"
              onClick={() => setIsOpenModal(!isOpenModal)}
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
          <PostDate>{hoursGap < 24 ? (minsGap < 60 ? (secsGap < 60 ? `방금 전` : `${minsGap}분 전`) : `${hoursGap}시간 전`) : `${createAt.substr(0,10).split("-")[0]}년 ${createAt.substr(0,10).split("-")[1]}월 ${createAt.substr(0,10).split("-")[2]}일`}</PostDate>

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
