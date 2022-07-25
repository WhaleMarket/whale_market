import styled from "styled-components";
import back from "../../../../assets/icon-arrow-left.png";

const Head = styled.header`
  display: flex;
  align-items: center;
  position: relative;
  width: calc(100% - 28px);
  padding: 0.813rem 0.75rem 0.813rem 1rem;
  border-bottom: 0.031rem solid #bdbdbd;
  background-color: white;
`;

const BackBtn = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  background-color: inherit;
  background-image: url(${back});
  background-size: 1.375rem 1.375rem;
  &:hover {
    cursor: pointer;
  }
`;

const FollowTxt = styled.h1`
  margin-left: 0.5rem;
  font-size: 0.875rem;
`;

function FollowHeader() {
  return (
    <Head>
      <BackBtn onClick={() => (window.location.href = "./myprofile")} />
      <FollowTxt>
        {window.location.pathname === "/main/followers"
          ? "Followers"
          : "Followings"}
      </FollowTxt>
    </Head>
  );
}

export default FollowHeader;
