import styled from "styled-components";
import PostingImg from "./PostingImg";
import UploadPostingContext from "../../../../context/UploadImageListProvider";
import UploadContext from "../../../../context/UploadProvider";
// import AuthContext from '../../../../context/AuthProvider';
import { useContext, useEffect } from "react";

const Wrapper = styled.article`
  display: flex;
  justify-content: left;
  align-items: flex-start;
`;

function ImgWrapper({ text }) {
  const [uploadPostingState] = useContext(UploadPostingContext);
  const [, setUploadState] = useContext(UploadContext);
  // const [InfoState, setInfoState] = useContext(AuthContext);

  useEffect(() => {
    if (uploadPostingState.required[1].prevUrl.length === 0 && !text) {
      setUploadState(false);
    } else {
      setUploadState(true);
    }
  }, [uploadPostingState, setUploadState, text]);
  return (
    <>
      <Wrapper>
        {uploadPostingState.required[1].prevUrl.length !== 0
          ? uploadPostingState.required[1].prevUrl.map((index, key) => (
              <PostingImg key={key} src={index} alt={`${key} Image`} />
            ))
          : ""}

        {/* {InfoState.MyInformations[10].image.length !== 0
          ? InfoState.MyInformations[10].image.map((index, key) => (
              <PostingImg key={key} src={index} alt={`${key} Image`} />
            ))
          : ""} */}
      </Wrapper>
    </>
  );
}

export default ImgWrapper;
