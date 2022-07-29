import React from "react";
import styled from "styled-components";
import FollowCard from "./FollowCard";

const FollowerContainer = styled.section`
  margin: 0 auto;
  box-sizing: border-box;
`;

function FollowSection() {
  return (
    <FollowerContainer>
      <FollowCard />
    </FollowerContainer>
  );
}

export default FollowSection;
