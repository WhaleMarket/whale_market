import styled from "styled-components";
import EditButton from "../profileEditHeader/Edit_btn";
import BackButton from "../profileEditHeader/Back_btn";

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

function ProfileEditHeader() {
  return (
    <Head>
      <BackButton />
      <EditButton />
    </Head>
  );
}

export default ProfileEditHeader;
