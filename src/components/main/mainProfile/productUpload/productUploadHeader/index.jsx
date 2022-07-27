import { useParams } from "react-router-dom";
import styled from "styled-components";
import EditButton from "./Edit_btn";
import BackButton from "./Back_btn";
import SaveButton from "./Save_btn";

const Head = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: calc(100% - 28px);
  padding: 9px 12px 9px 16px;
  border-bottom: 0.5px solid #bdbdbd;
  background-color: white;
`;

function ProductUploadHeader() {
  return (
    <Head>
      <BackButton />
      {useParams().postId ? <EditButton/> : <SaveButton/>}
    </Head>
  );
}

export default ProductUploadHeader;
