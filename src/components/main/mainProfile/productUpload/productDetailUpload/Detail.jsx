import styled from "styled-components";
import DetailInput from "./DetailInput";
import DetailLabel from "./DetailLabel";

const Legend = styled.legend`
  position: absolute;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
`;

function Detail() {
  return (
    <>
      <Legend>Product</Legend>
      <DetailLabel id="name" title="상품명" />
      <DetailInput
        id="name"
        type="text"
        placeholder="2~15자 이내여야 합니다."
      />
      <DetailLabel id="price" title="가격" />
      <DetailInput
        id="price"
        type="text"
        placeholder="숫자만 입력 가능합니다."
      />
      <DetailLabel id="link" title="판매 링크" />
      <DetailInput id="link" type="url" placeholder="URL을 입력해 주세요." />
    </>
  );
}

export default Detail;
