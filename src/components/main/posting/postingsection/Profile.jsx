import styled from "styled-components";
import basicImg from "../../../../assets/basic-profile-img.png";

const Image = styled.img`
  width: 42px;
  height: auto;
`;

function Profile() {
  return (
    <>
      <Image src={basicImg} alt="profile image" />
    </>
  );
}

export default Profile;
