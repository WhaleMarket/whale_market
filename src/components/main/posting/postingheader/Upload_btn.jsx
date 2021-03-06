import { useContext } from "react";
import styled from "styled-components";
import UploadContext from "../../../../context/UploadProvider";
import axios from "axios";
import { API_URL } from "../../../../constants/defaultUrl";
import UploadPostingContext from "../../../../context/UploadImageListProvider";

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
        alert("π³ μ±κ³΅μ μΌλ‘ μλ‘λ λμμ΅λλ€! π³");
        window.location.href = "./myprofile";
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Upload onClick={onSubmit} state={uploadState} disabled={!uploadState}>
        μλ‘λ
      </Upload>
    </>
  );
}

export default UploadButton;
