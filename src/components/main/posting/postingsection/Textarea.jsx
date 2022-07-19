import { useContext, useRef, useState } from "react";
import styled from "styled-components";
import UploadPostingContext from "../../../../context/UploadImageListProvider";
import UploadContext from "../../../../context/UploadProvider";
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
  const [uploadPostingState, setUploadPostingState] = useContext(UploadPostingContext);
  const [value, setValue] = useState(false);
  const content = useRef();
  function con() {
    if (content) { 
        setUploadPostingState((uploadPostingState) => {
            uploadPostingState.required[0] = {
                ...uploadPostingState.required[0],
                value: content.current.value
            }
            return { required: uploadPostingState.required }
        });
      if (content.current.value === "") {
        setValue(false);
      }
      if (content.current.value === "" && uploadPostingState.required[1].prevUrl.length === 0) {
        return setUploadState(false);
      } else {
        setValue(true);
        return setUploadState(true);
      }
    }
  }

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
      ></TextArea>
      <ImgWrapper text={value} />
    </EnterWrapper>
  );
}

export default PostingArea;
