import styled from "styled-components";
import BackButton from "./Back_btn";
import UploadButton from "./Upload_btn";
import EditButton from "./Edit_btn";
import { useParams } from "react-router-dom";

const Head = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 54px;
  padding: 9px 12px 9px 16px;
  border-bottom: 0.5px solid #bdbdbd;
  background-color: #FFFFFF;
  box-sizing: border-box;
`;

function PostingHeader() {
    const params = useParams();
    const postId = params.postId;

    return (
        <Head>
        <BackButton />
        {postId ? <EditButton /> : <UploadButton />}
        </Head>
    );
}

export default PostingHeader;
