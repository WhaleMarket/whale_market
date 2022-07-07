import styled from "styled-components";
import { useRef } from "react";
import ImageUpload from "../../../../assets/upload-file.png";

const ImgUploadBtn = styled.img`
  position: fixed;
  cursor: pointer;
  bottom: 16px;
  right: 16px;
  z-index: 100;
`;

const UploadInput = styled.input`
  display: none;
`;

function ImageUploadButton() {
  const Upload_Input = useRef();
  return (
    <>
      <UploadInput ref={Upload_Input} type="file" accept="image/*" />
      <ImgUploadBtn
        src={ImageUpload}
        alt="Image Upload Button"
        onClick={() => Upload_Input.current.click()}
      />
    </>
  );
}

export default ImageUploadButton;
