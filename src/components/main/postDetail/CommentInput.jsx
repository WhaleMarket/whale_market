import React, { useState, useRef, useContext } from "react";
import styled from "styled-components";
import heart_icon from "../../../assets/icon-heart.png";
import heart_icon_fill from "../../../assets/icon-heart-fill.png";
import axios from "axios";
import AuthContext from "../../../context/AuthProvider";
import { API_URL } from "../../../constants/defaultUrl";
import PostingContext from "../../../context/PostingProvider";

const CommentForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 16px;
  border-top: 0.5px solid #dbdbdb;
  border-radius: 0 0 10px 10px;
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

const Input = styled.input`
  width: calc(100% - 90px);
  border-style: none;
  outline: none;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #c4c4c4;
  }
`;

const SendBtn = styled.button`
  background: inherit;
  border: none;
  box-shadow: none;
  border-radius: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 17.53px;
  color: ${(props) => (props.disabled ? "#C4C4C4" : "#00BCD4")};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;

function CommentInput({ index, Liked, id, setComments }) {
  // 댓글 작성 api 확인
  const [InfoState, setInfoState] = useContext(AuthContext);
  const [, setPostingState] = useContext(PostingContext);
  const [comment, setComment] = useState("");
  const commentinput = useRef();

  async function UploadComment() {
    const commentData = {
      comment: {
        content: comment,
      },
    };
    try {
      await axios.post(`${API_URL}/post/${id}/comments`, commentData, {
        headers: {
          Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
          "Content-type": "application/json",
        },
      });
      const commentconfig = {
        headers: {
          Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
          "Content-type": "application/json",
        },
      };
      const res = await axios.get(
        `${API_URL}/post/${id}/comments/?limit=100&skip=0`,
        commentconfig
      );
      setComments([res.data.comments]);

      if (index === "5") {
        const feedConfig = {
          headers: {
            Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
            "Content-type": "application/json",
          },
        };
        const feedResponse = await axios.get(
          `${API_URL}/post/feed/?limit=100&skip=0`,
          feedConfig
        );
        setInfoState((InfoState) => {
          InfoState.MyInformations[5] = {
            ...InfoState.MyInformations[5],
            commentCount: feedResponse.data.posts.map((value) => {
              return value.commentCount;
            }),
          };
          return { MyInformations: InfoState.MyInformations };
        });
      } else {
        const Postingconfig = {
          headers: {
            Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
            "Content-type": "application/json",
          },
        };
        const Postingresponse = await axios.get(
          `${API_URL}/post/${InfoState.MyInformations[0].myAccountname}/userpost/?limit=100&skip=0`,
          Postingconfig
        );
        setPostingState((PostingState) => {
          PostingState.data[0] = {
            ...PostingState.data[0],
            postdata: Postingresponse.data.post,
          };
          return { data: PostingState.data };
        });
        console.log("good")
      }
    } catch (error) {
      console.error(error);
    }
  }

  // 버튼 활성화  // 기본값은 비활성화 , 길이 0 이상되면 false되면서 버튼 활성화
  const [isDisabled, setIsDisabled] = useState(true);

  const isPassedComment = () => {
    return comment.length > 0 ? setIsDisabled(false) : setIsDisabled(true);
  };

  // submit -> 버튼 활성화 되어있으면 업로드 코멘트 실행, 코멘트 빈값으로 바꾸기
  const handleSubmit = (event) => {
    event.preventDefault();
    !isDisabled && UploadComment();
    setIsDisabled(true);
    setComment("");
    commentinput.current.value = "";
  };

  return (
    <CommentForm method="POST" onSubmit={handleSubmit}>
      <Heart Liked={Liked} />
      <label htmlFor="text"></label>
      <Input
        id="text"
        type="text"
        placeholder="댓글 입력하기..."
        ref={commentinput}
        onChange={(event) => setComment(event.target.value)}
        onKeyUp={isPassedComment}
      />
      <SendBtn type="submit" disabled={isDisabled}>
        게시
      </SendBtn>
    </CommentForm>
  );
}

export default CommentInput;
