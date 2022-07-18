import styled from "styled-components";
import CancleBtn from "./CancleBtn";

const PostImage = styled.img`
  display: block;
  margin: 10px 0 0 15px;
  width: 200px;
  height: auto;
  border-radius: 10px;
`;

function PostingImg({ src, alt }) {
  return (
    <>
      <PostImage src={src} alt={alt} />
      <CancleBtn src={src} />
    </>
  );
}

export default PostingImg;
