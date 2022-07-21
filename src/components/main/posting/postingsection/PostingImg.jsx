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
<<<<<<< HEAD
<<<<<<< HEAD
      <CancleBtn src={src} index={alt.substr(0, 1)} />
=======
      <CancleBtn src={src} />
>>>>>>> b96d93e (:lipstick: 닫기 버튼 추가 구현)
=======
      <CancleBtn src={src} index={alt.substr(0, 1)} />
>>>>>>> 99b55aa (:recycle: context변경 후 취소 버튼 활성화)
    </>
  );
}

export default PostingImg;
