import styled from "styled-components";
import PostingImg from "./PostingImg";
import UploadImageContext from "../../../../context/UploadImageListProvider";
import UploadContext from "../../../../context/UploadProvider";
import { useContext, useEffect } from "react";

const Wrapper = styled.article`
  display: flex;
  justify-content: left;
  align-items: flex-start;
`;

function ImgWrapper({ text }) {
  const [uploadImgState] = useContext(UploadImageContext);
  const [, setUploadState] = useContext(UploadContext);
  useEffect(() => {
    if (uploadImgState.length === 0 && !text) {
      setUploadState(false);
    } else {
      setUploadState(true);
    }
  }, [uploadImgState, setUploadState, text]);
  return (
    <>
      <Wrapper>
        {uploadImgState.length !== 0
          ? uploadImgState.map((index, key) => (
              <PostingImg key={key} src={index} alt={`${key} Image`} />
            ))
          : ""}
      </Wrapper>
    </>
  );
}

export default ImgWrapper;
