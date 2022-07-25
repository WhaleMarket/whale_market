import React, { useContext, useState } from "react";
import styled from "styled-components";
import heart_icon from "../../../assets/icon-heart.png";
import heart_icon_fill from "../../../assets/icon-heart-fill.png";
import comment_icon from "../../../assets/icon-message-circle.png";
import AuthContext from "../../../context/AuthProvider";
import axios from "axios";
import { API_URL } from "../../../constants/defaultUrl";
import PostModal from "../postDetail/PostModal";

const IconWrapper = styled.div`
  display: flex;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  align-items: center;
  margin: 24px 0 24px;
  @media screen and (max-width: 855px) {
    margin-top: 12px 0 16px 0;
  }
`;

const Heart = styled.button`
  background-color: inherit;
  margin-right: 6px;
  width: 20px;
  height: 20px;
  border: none;
  background-image: ${(props) =>
    props.Liked ? `url(${heart_icon_fill})` : `url(${heart_icon})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: 20px 20px;
  &:hover {
    cursor: pointer;
  }
`;

const HeartCount = styled.span`
  font-size: 12px;
  line-height: 20px;
  color: #767676;
`;

const CommentBtn = styled.a`
  margin-right: 6px;
  background-color: inherit;
  display: inline-block;
  margin-left: 16px;
  width: 20px;
  height: 20px;
  border: none;
  background: url(${comment_icon}) no-repeat center / 20px 20px;
  &:hover {
    cursor: pointer;
  }
`;

const CommentCount = styled.span`
  line-height: 20px;
  font-size: 12px;
  color: #767676;
`;

function IconGroup({ like, comment, liked, id }) {
  const [InfoState, setInfoState] = useContext(AuthContext);
  const [postModal, setPostModal] = useState(false);

  const useHandleLike = () => {
    async function fetchData() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
            "Content-type": "application/json",
          },
        };
        await axios.post(`${API_URL}/post/${id}/heart`, {}, config);

        const Feedconfig = {
          headers: {
            Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
            "Content-type": "application/json",
          },
        };
        const Feedresponse = await axios.get(
          `${API_URL}/post/feed`,
          Feedconfig
        );

        setInfoState((InfoState) => {
          InfoState.MyInformations[5] = {
            ...InfoState.MyInformations[5],
            hearted: Feedresponse.data.posts.map((item) => {
              return item.hearted;
            }),
            heartCount: Feedresponse.data.posts.map((item) => {
              return item.heartCount;
            }),
          };
          return { MyInformations: InfoState.MyInformations };
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  };

  const useHandleUnlike = () => {
    async function fetchData() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
            "Content-type": "application/json",
          },
        };
        await axios.delete(`${API_URL}/post/${id}/unheart`, config);

        const Feedconfig = {
          headers: {
            Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
            "Content-type": "application/json",
          },
        };
        const Feedresponse = await axios.get(
          `${API_URL}/post/feed`,
          Feedconfig
        );

        setInfoState((InfoState) => {
          InfoState.MyInformations[5] = {
            ...InfoState.MyInformations[5],
            hearted: Feedresponse.data.posts.map((item) => {
              return item.hearted;
            }),
            heartCount: Feedresponse.data.posts.map((item) => {
              return item.heartCount;
            }),
          };
          return { MyInformations: InfoState.MyInformations };
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  };


  function openPostModal (){
    setPostModal(true);
  }

  return (
    <>
      <IconWrapper>
        <Heart Liked={liked} onClick={liked ? useHandleUnlike : useHandleLike} />
        <HeartCount>{like}</HeartCount>
        <CommentBtn 
          onClick={()=>{
            openPostModal();
          }} 
        />
        <CommentCount>{comment}</CommentCount>
      </IconWrapper>
      
      <PostModal 
        postModal={postModal}
        setPostModal={setPostModal}
        />
    </>
  );
}

export default IconGroup;
