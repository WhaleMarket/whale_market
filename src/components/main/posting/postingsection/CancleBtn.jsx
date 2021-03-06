import Cancle from "../../../../assets/cancle_Btn_icon.png";
import styled from "styled-components";
import { useContext } from "react";
import UploadPostingContext from "../../../../context/UploadImageListProvider";

const Btn = styled.button`
  background-image: url(${Cancle});
  background-repeat: no-repeat;
  background-color: transparent;
  margin: 15px 0 0 -20px;
  border: none;
  height: 20px;
  width: 20px;
`;

function CancleBtn({ src, index }) {
  const [, setUploadPostingState] = useContext(UploadPostingContext);
  const deleteImg = () => {
    setUploadPostingState((uploadPostingState) => {
      uploadPostingState.required[1] = {
        ...uploadPostingState.required[1],
        file: uploadPostingState.required[1].file.filter((file) => {
          return file !== uploadPostingState.required[1].file[index];
        }),
        prevUrl: uploadPostingState.required[1].prevUrl.filter((img) => {
          return img !== src;
        }),
      };
      return { required: uploadPostingState.required };
    });
  };

  return (
    <>
      <Btn onClick={deleteImg} />
    </>
  );
}

export default CancleBtn;
