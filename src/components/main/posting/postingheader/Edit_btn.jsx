import { useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../../../context/AuthProvider";
import UploadContext from "../../../../context/UploadProvider";
import UploadPostingContext from "../../../../context/UploadImageListProvider";
import PostingModificationContext from "../../../../context/PostingModificationProvider";
import { API_URL } from "../../../../constants/defaultUrl";
import styled from "styled-components";
import success_whale from '../../../../assets/success-whale.png';
import disabled_whale from '../../../../assets/disabled-whale.png';

const Edit = styled.button`
  width: 100px;
  height: 52px;
  padding-left: 16px;
  border: none;
  background-color: transparent;
  background-position: 0px 0px;
  background-image: ${(props) => (props.state ? `url(${success_whale})` : `url(${disabled_whale})`)};
  background-size: 100px 52px;
  background-repeat: no-repeat;
  transition: 0.5s ease-in-out;
  vertical-align: top;
  &:hover {
    cursor: ${(props) => (props.state ? "pointer" : "auto")};
  }
`;

function EditButton() {
  const [uploadPostingState] = useContext(UploadPostingContext);
  const [uploadState] = useContext(UploadContext);
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
      <Edit onClick={onSubmit} state={uploadState} disabled={!uploadState}/>
    </>
  );
}

export default EditButton;
