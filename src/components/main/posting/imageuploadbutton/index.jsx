import styled from "styled-components";
import { useContext, useRef } from "react";
import ImageUpload from "../../../../assets/upload-file.png";
import UploadImageContext from "../../../../context/UploadImageListProvider";

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
  const [uploadImgState, setUploadImgState] = useContext(UploadImageContext);
  const Upload_Input = useRef();
  const ImgUpload = (event) => {
    const Blob = event.target.files[0];
    if (Blob === undefined) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(Blob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setUploadImgState((uploadImgState) => [
          ...uploadImgState,
          reader.result,
        ]);
        resolve();
      };
    });
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
        onClick={() =>
          uploadImgState.length === 3
            ? alert("이미지는 3개까지만 업로드할 수 있습니다.")
            : Upload_Input.current.click()
        }
      />
    </>
  );
}

export default ImageUploadButton;
