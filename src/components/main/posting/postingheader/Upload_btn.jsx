import { useContext, useRef } from "react";
import styled from "styled-components";
import UploadContext from "../../../../context/UploadProvider";

const Upload = styled.button`
  width: 90px;
  height: 32px;
  border: none;
  border-radius: 32px;
  background-color: ${(props) => (props.state ? "#00bcd4" : "#B2EBF2")};
  color: white;
  font-size: 14px;
  &:hover {
    cursor: ${(props) => (props.state ? "pointer" : "auto")};
    outline: ${(props) => (props.state ? "1px solid #03a9f4" : "none")};
  }
`;

function UploadButton() {
  const [uploadState] = useContext(UploadContext);
  const uploadButton = useRef();
  if (uploadButton.current) {
    if (uploadState) {
      uploadButton.current.disabled = false;
    } else {
      uploadButton.current.disabled = true;
    }
  }
  return (
    <>
      <Upload ref={uploadButton} state={uploadState}>
        업로드
      </Upload>
    </>
  );
}

export default UploadButton;
