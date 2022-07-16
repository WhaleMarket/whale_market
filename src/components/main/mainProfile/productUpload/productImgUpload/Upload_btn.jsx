import Img_logo from "../../../../../assets/image_logo.png";
import styled from "styled-components";

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
`;

function UploadBtn() {
  return (
    <>
      <Uploadbtn />
    </>
  );
}

export default UploadBtn;
