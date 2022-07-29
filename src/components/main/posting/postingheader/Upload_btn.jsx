import { useContext } from "react";
import styled from "styled-components";
import UploadContext from "../../../../context/UploadProvider";
import axios from "axios";
import { API_URL } from "../../../../constants/defaultUrl";
import UploadPostingContext from "../../../../context/UploadImageListProvider";
import AuthContext from "../../../../context/AuthProvider";
import upload_whale from '../../../../assets/upload-whale.png';
import upload_disabled_whale from '../../../../assets/upload-disabled-whale.png';

const Upload = styled.button`
  width: 100px;
  height: 52px;
  padding-left: 16px;
  border: none;
  background-color: transparent;
  background-position: 0px 0px;
  background-image: ${(props) => (props.state ? `url(${upload_whale})` : `url(${upload_disabled_whale})`)};
  background-size: 100px 52px;
  background-repeat: no-repeat;
  transition: 0.5s ease-in-out;
  vertical-align: top;
  &:hover {
    cursor: ${(props) => (props.state ? "pointer" : "auto")};
    outline: ${(props) => (props.state ? "1px solid #03a9f4" : "none")};
  }
`;

function UploadButton() {
  const [uploadState] = useContext(UploadContext);
  const [InfoState] = useContext(AuthContext);
  const [uploadPostingState] = useContext(UploadPostingContext);

  const onSubmit = async () => {
    try {
      const imgBodyData = new FormData();

      uploadPostingState.required[1].file.map((value) => {
        return imgBodyData.append("image", value);
      });

      const imgResponse = await axios.post(
        `${API_URL}/image/uploadfiles`,
        imgBodyData
      );

      const headerData = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          "Content-type": "application/json",
        },
      };

      const postBodyData = {
        post: {
          content: uploadPostingState.required[0].value,
          image: imgResponse.data
            .map((img) => `${API_URL}/${img.filename}`)
            .join(","),
        },
      };

      const response = await axios.post(
        `${API_URL}/post`,
        postBodyData,
        headerData
      );

      if (response) {
        alert("🐳 성공적으로 업로드 되었습니다! 🐳");
        window.location.href = "/main/profile/" + InfoState.MyInformations[0].myAccountname;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Upload onClick={onSubmit} state={uploadState} disabled={!uploadState}/>
    </>
  );
}

export default UploadButton;
