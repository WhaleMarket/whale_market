import styled from "styled-components";
import FollowingUser from "./FollowingUser";
import FollowUser from "./FollowUser";

const FollowWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function FollowCard() {
  return (
    <FollowWrapper>
      {window.location.pathname === "/main/followers" ? (
        <FollowUser />
      ) : (
        <FollowingUser />
      )}
    </FollowWrapper>
  );
}
export default FollowCard;
