import React, { useContext, useState } from "react";
import styled from "styled-components";
import likeBtn from "../../../../assets/icon-heart-fill.png";
import likeBtnOutline from "../../../../assets/icon-heart.png";
import commentBtn from "../../../../assets/icon-message-circle.png";
import AuthContext from "../../../../context/AuthProvider";
import axios from "axios";
import { API_URL } from "../../../../constants/defaultUrl";
import PostModal from "../../postDetail/PostModal";

const PostIconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LikeBtn = styled.button`
  width: 1.25rem;
  height: 1.25rem;
  padding: 0;
  border-style: none;
  background-color: inherit;
  background-image: ${(props) =>
    props.Liked === true ? `url(${likeBtn})` : `url(${likeBtnOutline})`};
  background-size: 1.25rem 1.25rem;
  &:hover {
    cursor: pointer;
  }
`;

const Count = styled.p`
  margin-left: 6px;
  color: #767676;
  font-size: 0.75rem;
`;

const CommentBtn = styled.button`
  width: 1.25rem;
  height: 1.25rem;
  padding: 0;
  margin-left: 2.313rem;
  border-style: none;
  background-color: inherit;
  background-image: url(${commentBtn});
  background-size: 1.25rem 1.25rem;
  &:hover {
    cursor: pointer;
  }
`;

function PostIconContainer({ like, comment, liked, id, index }) {
  const [InfoState, setInfoState] = useContext(AuthContext);
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
        const Postingconfig = {
          headers: {
            Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
            "Content-type": "application/json",
          },
        };
        const Postingresponse = await axios.get(
          `${API_URL}/post/${InfoState.MyInformations[0].myAccountname}/userpost`,
          Postingconfig
        );
        setInfoState((InfoState) => {
          InfoState.MyInformations[3] = {
            ...InfoState.MyInformations[3],
            hearted: Postingresponse.data.post.map((item) => {
              return item.hearted;
            }),
            heartCount: Postingresponse.data.post.map((item) => {
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
        const Postingconfig = {
          headers: {
            Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
            "Content-type": "application/json",
          },
        };
        const Postingresponse = await axios.get(
          `${API_URL}/post/${InfoState.MyInformations[0].myAccountname}/userpost`,
          Postingconfig
        );
        setInfoState((InfoState) => {
          InfoState.MyInformations[3] = {
            ...InfoState.MyInformations[3],
            hearted: Postingresponse.data.post.map((item) => {
              return item.hearted;
            }),
            heartCount: Postingresponse.data.post.map((item) => {
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

  const [postModal, setPostModal] = useState(false);

  function openPostModal() {
    setPostModal(true);
  }
  return (
    <>
      <PostIconWrapper>
        <LikeBtn
          Liked={liked}
          onClick={liked ? useHandleUnlike : useHandleLike}
        ></LikeBtn>
        <Count>{like}</Count>
        <CommentBtn
          onClick={() => {
            openPostModal();
          }}
        ></CommentBtn>
        <Count>{comment}</Count>
      </PostIconWrapper>
      <PostModal
        src={InfoState.MyInformations[0].myImage}
        index={index}
        id={id}
        postModal={postModal}
        setPostModal={setPostModal}
      />
    </>
  );
}

export default PostIconContainer;
