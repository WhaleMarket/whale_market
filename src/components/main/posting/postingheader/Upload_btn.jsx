import { useContext } from "react";
import styled from "styled-components";
import UploadContext from "../../../../context/UploadProvider";
import axios from "axios";
import { API_URL } from "../../../../constants/defaultUrl";
import UploadPostingContext from "../../../../context/UploadImageListProvider";
import AuthContext from "../../../../context/AuthProvider";

const Upload = styled.button`
  width: 90px;
  height: 32px;
  border: none;
  border-radius: 32px;
  background-color: ${(props) => (props.state ? "#00bcd4" : "#B2EBF2")};
  color: white;
  font-size: 14px;
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
      <Upload onClick={onSubmit} state={uploadState} disabled={!uploadState}>
        업로드
      </Upload>
    </>
  );
}

export default UploadButton;
