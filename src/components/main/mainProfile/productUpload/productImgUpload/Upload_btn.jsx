import Img_logo from "../../../../../assets/image_logo.png";
import styled from "styled-components";
import { useContext, useRef } from "react";
import SaveProductContext from "../../../../../context/SaveProductProvider";
import { IMG_EXTENSION } from "../../../../../constants/defaultUrl";

const Uploadbtn = styled.button`
  position: absolute;
  border: none;
  background-color: #c4c4c4;
  width: 36px;
  height: 36px;
  border-radius: 100%;
  background-image: url(${Img_logo});
  background-position: center center;
  background-repeat: no-repeat;
  bottom: 12px;
  right: 12px;
  &:hover {
    cursor: pointer;
  }
`;

const UploadInput = styled.input`
  display: none;
`;

function UploadBtn({ setUrl }) {
  const [, setSaveStates] = useContext(SaveProductContext);
  const Upload_input = useRef();
  const ImgUpload = (event) => {
    const Blob = event.target.files[0];
    if (
      Blob === undefined ||
      !IMG_EXTENSION.includes(Blob.name.split(".")[1])
    ) {
      event.target.value = "";
      return alert("올바른 형식의 파일을 넣어주세요.");
    }
    const reader = new FileReader();
    reader.readAsDataURL(Blob);
    setSaveStates((saveStates) => {
      saveStates.required[0] = {
        ...saveStates.required[0],
        file: Blob,
        savePossible: true,
      };
      return { required: saveStates.required };
    });
    event.target.value = "";
    return new Promise((resolve) => {
      reader.onload = () => {
        setUrl(reader.result);
        resolve();
      };
    });
  };
  return (
    <>
      <UploadInput
        ref={Upload_input}
        type="file"
        accept="image/*"
        onChange={ImgUpload}
      />
      <Uploadbtn onClick={() => Upload_input.current.click()} />
    </>
  );
}

export default UploadBtn;
