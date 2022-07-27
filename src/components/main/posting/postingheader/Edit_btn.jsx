import axios from "axios";
import { API_URL } from "../../../../constants/defaultUrl";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../../../context/AuthProvider";
import UploadContext from "../../../../context/UploadProvider";
import UploadPostingContext from "../../../../context/UploadImageListProvider";
import PostingModificationContext from "../../../../context/PostingModificationProvider";
import styled from "styled-components";

const Edit = styled.button`
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

function EditButton() {
  const [uploadState] = useContext(UploadContext);
  const [uploadPostingState] = useContext(UploadPostingContext);
  const [InfoState] = useContext(AuthContext);
  const [PostingModificationState] = useContext(PostingModificationContext)
  const params = useParams();
  const postId = params.postId;

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

      console.log(PostingModificationState.post[0].image.split(',').filter((value) => {return value !== ""})
      .map((img) => `${API_URL}/${img.filename}`)
      .join(","))
      const postBodyData = {
        post: {
          content: uploadPostingState.required[0].value !== "" ? uploadPostingState.required[0].value : PostingModificationState.post[0].content,
          image: imgResponse.data
            .map((img) => `${API_URL}/${img.filename}`).concat(PostingModificationState.post[0].image.split(',').filter((value) => {return value !== ""}))
            .join(","),
        },
      };

      const response = await axios.put(
        `${API_URL}/post/${postId}`,
        postBodyData,
        headerData
      );
      if (response) {
        alert("🚀 성공적으로 수정되었습니다!");
        window.location.href = "/main/profile/" + InfoState.MyInformations[0].myAccountname;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Edit onClick={onSubmit} state={uploadState} disabled={!uploadState}>
        수정하기
      </Edit>
    </>
  );
}

export default EditButton;
