import styled from "styled-components";
import { useRef, useState } from "react";
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
  const [uploadLoading, setUploadLoading] = useState(false);
  const Upload_Input = useRef();
  const ImgUpload = async (event) => {
    setUploadLoading(true);
    const formData = new FormData();
    formData.append("Image", event.target.files[0]);
    console.log(formData);
  };
  return (
    <>
      <UploadInput
        ref={Upload_Input}
        type="file"
        accept="image/*"
        onChange={ImgUpload}
      />
      <ImgUploadBtn
        src={ImageUpload}
        alt="Image Upload Button"
        onClick={() => Upload_Input.current.click()}
      />
    </>
  );
}

export default ImageUploadButton;
