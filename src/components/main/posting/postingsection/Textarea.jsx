import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from '../../../../context/AuthProvider';
import UploadContext from "../../../../context/UploadProvider";
import UploadPostingContext from "../../../../context/UploadImageListProvider";
import PostingModificationContext from "../../../../context/PostingModificationProvider";
import { API_URL } from "../../../../constants/defaultUrl";
import styled from "styled-components";
import ImgWrapper from "./ImgArticle";

const EnterWrapper = styled.div``;

const TextArea = styled.textarea`
  margin: 10px 0 0 13px;
  border: none;
  font-size: 14px;
  resize: none;
  height: ${(props) => props.height};
  width: 1100px;
  line-height: 20px;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-word;
  &:focus {
    outline: none;
  }
`;

function PostingArea() {
  const [, setUploadState] = useContext(UploadContext);
  const [uploadPostingState, setUploadPostingState] =
    useContext(UploadPostingContext);
  const postId = useParams().postId;
  const [PostingModificationState, setPostingModificationState] = useContext(PostingModificationContext);
  const [value, setValue] = useState(false);
  const content = useRef();
  const [InfoState] = useContext(AuthContext);

  function con() {
    if (content) {
      setUploadPostingState((uploadPostingState) => {
        uploadPostingState.required[0] = {
          ...uploadPostingState.required[0],
          value: content.current.value,
        };
        return { required: uploadPostingState.required };
      });
      if (content.current.value === "") {
        setValue(false);
      }
      if (
        content.current.value === "" &&
        uploadPostingState.required[1].prevUrl.length === 0
      ) {
        return setUploadState(false);
      } else {
        setValue(true);
        return setUploadState(true);
      }
    }
  }

  useEffect(() => {
    async function getPost() {
        try {
            const updateConfig = {
              headers: {
                Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                "Content-type": "application/json",
              },
            };
            const response = await axios.get(`${API_URL}/post/`+ postId, updateConfig);
            setPostingModificationState((PostingModificationState) => {
                PostingModificationState.post[0] = {
                    ...PostingModificationState.post[0],
                    content: response.data.post.content
                };
                return { post: PostingModificationState.post }
            });
            
          } catch (error) {
            console.error(error);
            alert("error");
          }
    } 
    postId && getPost()
  }, [postId]);

  const [textareaHeight, setTextareaHeight] = useState("20px");
  const checkValue = (event) => {
    setTextareaHeight(
      (event.target.value.split("\n").length +
        Math.floor(event.target.value.split("").length / 150)) *
        20 +
        "px"
    );
  };

  return (
    <EnterWrapper>
      <TextArea
        onChange={con}
        ref={content}
        placeholder="게시글 입력하기"
        cols="150"
        maxLength="2400"
        height={textareaHeight}
        onInput={checkValue}
        defaultValue={postId && PostingModificationState.post[0].content}
      >
      </TextArea>
      <ImgWrapper text={value} />
    </EnterWrapper>

  );
}

export default PostingArea;
