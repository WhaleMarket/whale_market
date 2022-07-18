import Cancle from "../../../../assets/cancle_Btn_icon.png";
import styled from "styled-components";
import { useContext } from "react";
import UploadImageContext from "../../../../context/UploadImageListProvider";

const Btn = styled.button`
  background-image: url(${Cancle});
  background-repeat: no-repeat;
  background-color: transparent;
  margin: 15px 0 0 -20px;
  border: none;
  height: 20px;
  width: 20px;
`;

function CancleBtn({ src }) {
  const [UploadImgState, setUploadImgState] = useContext(UploadImageContext);
  return (
    <>
      <Btn
        onClick={() =>
          setUploadImgState(
            UploadImgState.filter(function (img) {
              return img !== src;
            })
          )
        }
      />
    </>
  );
}

export default CancleBtn;
