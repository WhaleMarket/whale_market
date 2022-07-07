import styled from "styled-components";

const Upload = styled.button`
  width: 90px;
  height: 32px;
  border: none;
  border-radius: 32px;
  background-color: #00bcd4;
  color: white;
  font-size: 14px;
  &:hover {
    cursor: pointer;
  }
`;

function UploadButton() {
  return (
    <>
      <Upload>업로드</Upload>
    </>
  );
}

export default UploadButton;
