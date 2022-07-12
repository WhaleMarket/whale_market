import { useContext, useRef } from "react";
import styled from "styled-components";
import UploadContext from "../../../../context/UploadProvider";

const TextArea = styled.textarea`
  margin: 10px 0 0 13px;
  border: none;
  font-size: 14px;
  resize: none;
  &:focus {
    outline: none;
  }
`;

function PostingArea() {
  const [, setUploadState] = useContext(UploadContext);
  const content = useRef();
  function con() {
    if (content) {
      if (content.current.value !== "") {
        return setUploadState(true);
      } else {
        return setUploadState(false);
      }
    }
  }
  return (
    <>
      <TextArea
        onChange={con}
        ref={content}
        placeholder="게시글 입력하기"
        rows="30"
        cols="500"
      ></TextArea>
    </>
  );
}

export default PostingArea;
