import { useContext } from "react";
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
    cursor: pointer;
  }
`;

function UploadButton() {
  const [uploadState] = useContext(UploadContext);
  return (
    <>
      <Upload state={uploadState}>업로드</Upload>
    </>
  );
}

export default UploadButton;
