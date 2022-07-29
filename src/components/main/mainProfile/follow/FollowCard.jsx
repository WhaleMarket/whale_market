import styled from "styled-components";
import FollowingUser from "../follow/FollowingUser";
import FollowUser from "../follow/FollowerUser";

const FollowWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function FollowCard() {
  return (
    <FollowWrapper>
      {window.location.pathname.includes("follower") ? (
        <FollowUser />
      ) : (
        <FollowingUser />
      )}
    </FollowWrapper>
  );
}
export default FollowCard;
