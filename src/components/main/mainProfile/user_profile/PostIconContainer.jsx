import React, { useContext, useState } from "react";
import styled from "styled-components";
import likeBtn from "../../../../assets/icon-heart-fill.png";
import likeBtnOutline from "../../../../assets/icon-heart.png";
import commentBtn from "../../../../assets/icon-message-circle.png";
import AuthContext from "../../../../context/AuthProvider";
import axios from "axios";
import { API_URL } from "../../../../constants/defaultUrl";
import PostModal from "../../postDetail/PostModal";
import PostingContext from "../../../../context/PostingProvider";
import HeartEvent from "../../../../theme/heartClickEvent";

const PostIconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LikeBtn = styled.button`
  width: 20px;
  height: 20px;
  padding: 0;
  border-style: none;
  background-color: inherit;
  background-image: ${(props) =>
    props.Liked === true ? `url(${likeBtn})` : `url(${likeBtnOutline})`};
  background-size: 1.25rem 1.25rem;
  transition: 0.5s ease-in-out;
  &.like {
    animation: ${HeartEvent} 0.5s ease-in-out;
  }
  &:hover {
    cursor: pointer;
  }
`;

const Count = styled.p`
  margin-left: 6px;
  color: #767676;
  font-size: 12px;
`;

const CommentBtn = styled.button`
  width: 20px;
  height: 20px;
  padding: 0;
  margin-left: 16px;
  border-style: none;
  background-color: inherit;
  background-image: url(${commentBtn});
  background-size: 20px 20px;
  &:hover {
    cursor: pointer;
  }
`;

function PostIconContainer({
  like,
  comment,
  liked,
  id,
  index,
  image,
  content,
}) {
  const [InfoState] = useContext(AuthContext);
  const [PostingState, setPostingState] = useContext(PostingContext);
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

        const postconfig = {
          headers: {
            Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
            "Content-type": "application/json",
          },
        };
        const response = await axios.get(
          `${API_URL}/post/${PostingState.data[0].user.accountname}/userpost`,
          postconfig
        );
        setPostingState((PostingState) => {
          PostingState.data[0] = {
            ...PostingState.data[0],
            postdata: response.data.post,
          };
          return { data: PostingState.data };
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

        const postconfig = {
          headers: {
            Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
            "Content-type": "application/json",
          },
        };
        const response = await axios.get(
          `${API_URL}/post/${PostingState.data[0].user.accountname}/userpost`,
          postconfig
        );
        setPostingState((PostingState) => {
          PostingState.data[0] = {
            ...PostingState.data[0],
            postdata: response.data.post,
          };
          return { data: PostingState.data };
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
          className={`${liked ? "like" : ""}`}
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
        src={PostingState.data[0].user.image}
        index={index}
        id={id}
        image={image}
        postModal={postModal}
        setPostModal={setPostModal}
        content={content}
        feed={false}
      />
    </>
  );
}

export default PostIconContainer;
