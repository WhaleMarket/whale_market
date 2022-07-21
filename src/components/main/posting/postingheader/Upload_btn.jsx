import { useContext, useRef } from "react";
import styled from "styled-components";
import UploadContext from "../../../../context/UploadProvider";
import axios from "axios";
import { API_URL } from "../../../../constants/defaultUrl";
import UploadPostingContext from "../../../../context/UploadImageListProvider";
import { Link } from "react-router-dom";

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

  const uploadButton = useRef();

  if (uploadButton.current) {
    if (uploadState) {
      uploadButton.current.disabled = false;
    } else {
      uploadButton.current.disabled = true;
    }
  }

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
            .map((img) => `https://mandarin.api.weniv.co.kr/${img.filename}`)
            .join(","),
        },
      };

      const response = await axios.post(
        `${API_URL}/post`,
        postBodyData,
        headerData
      );

      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };

  const complete = (event) => {
    if (!uploadState) {
      event.preventDefault();
    }
  };

  return (
    <>
      <Link to="/mainprofile" onClick={complete}>
        <Upload onClick={onSubmit} ref={uploadButton} state={uploadState}>
          업로드
        </Upload>
      </Link>
    </>
  );
}

export default UploadButton;
