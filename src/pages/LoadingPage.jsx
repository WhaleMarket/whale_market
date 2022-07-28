import React from "react";
import styled from "styled-components";
import Loading from "../assets/loadingItem.gif";

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoadingPage = () => {
  return (
    <Background>
      <img src={Loading} alt="로딩중" width="20%" />
    </Background>
  );
};

export default LoadingPage;
