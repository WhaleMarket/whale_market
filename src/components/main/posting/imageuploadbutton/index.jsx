import styled from "styled-components";
import { useContext, useRef } from "react";
<<<<<<< HEAD
import { IMG_EXTENSION } from "../../../../constants/defaultUrl";
import ImageUpload from "../../../../assets/upload-file.png";
import UploadPostingContext from "../../../../context/UploadImageListProvider";
=======
import ImageUpload from "../../../../assets/upload-file.png";
<<<<<<< HEAD
import UploadImageContext from "../../../../context/UploadImageListProvider";
>>>>>>> b795e89 (:sparkles: 이미지 업로드 및 업로드 갯수 제한 기능 구현)
=======
import UploadPostingContext from "../../../../context/UploadImageListProvider";
>>>>>>> c426f97 (♻️ useContext 리팩토링)

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
<<<<<<< HEAD
<<<<<<< HEAD
  const [uploadPostingState, setUploadPostingState] =
    useContext(UploadPostingContext);
  const Upload_Input = useRef();
  const ImgUpload = (event) => {
    const Blob = event.target.files[0];
    if (
      Blob === undefined ||
      !IMG_EXTENSION.includes(Blob.name.split(".")[1])
    ) {
      event.target.value = "";
      return alert("올바른 형식의 파일을 넣어주세요.");
    }
    setUploadPostingState((uploadPostingState) => {
      uploadPostingState.required[1] = {
        ...uploadPostingState.required[1],
        file: [...uploadPostingState.required[1].file, Blob],
      };
      return { required: uploadPostingState.required };
    });
    const reader = new FileReader();
    reader.readAsDataURL(Blob);
    event.target.value = "";
    return new Promise((resolve) => {
      reader.onload = () => {
        setUploadPostingState((uploadPostingState) => {
          uploadPostingState.required[1] = {
            ...uploadPostingState.required[1],
            prevUrl: [...uploadPostingState.required[1].prevUrl, reader.result],
          };
          return { required: uploadPostingState.required };
        });
=======
  const [uploadImgState, setUploadImgState] = useContext(UploadImageContext);
=======
    const [uploadPostingState, setUploadPostingState] = useContext(UploadPostingContext);
>>>>>>> c426f97 (♻️ useContext 리팩토링)
  const Upload_Input = useRef();
  const ImgUpload = (event) => {
    const Blob = event.target.files[0];
    if (Blob === undefined) {
      return;
    }
    setUploadPostingState((uploadPostingState) => {
        uploadPostingState.required[1] = {
            ...uploadPostingState.required[1],
            file: [...uploadPostingState.required[1].file, Blob]
        }
        return {required : uploadPostingState.required}
    });
    const reader = new FileReader();
    reader.readAsDataURL(Blob);
    event.target.value = "";
    return new Promise((resolve) => {
      reader.onload = () => {
<<<<<<< HEAD
        setUploadImgState((uploadImgState) => [
          ...uploadImgState,
          reader.result,
        ]);
>>>>>>> b795e89 (:sparkles: 이미지 업로드 및 업로드 갯수 제한 기능 구현)
=======
        setUploadPostingState((uploadPostingState) => {
            uploadPostingState.required[1] = {
                ...uploadPostingState.required[1],
                prevUrl: [...uploadPostingState.required[1].prevUrl, reader.result]
            }
            return {required : uploadPostingState.required}
        });
>>>>>>> c426f97 (♻️ useContext 리팩토링)
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
<<<<<<< HEAD
<<<<<<< HEAD
          uploadPostingState.required[1].prevUrl.length === 3
=======
          uploadImgState.length === 3
>>>>>>> b795e89 (:sparkles: 이미지 업로드 및 업로드 갯수 제한 기능 구현)
=======
          uploadPostingState.required[1].prevUrl.length === 3
>>>>>>> c426f97 (♻️ useContext 리팩토링)
            ? alert("이미지는 3개까지만 업로드할 수 있습니다.")
            : Upload_Input.current.click()
        }
      />
    </>
  );
}

export default ImageUploadButton;
