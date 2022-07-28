import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import LogoSrc from "../../assets/Logo.png";
import Wave from "react-wavify";
import { WhaleEvent, WaveMoveEvent } from "../../theme/splashEvent";

const Logo = styled.img`
  display: block;
  z-index: 200;
  width: 200px;
  margin-top: 27vh;
  margin-left: 40vw;
  position: relative;
  animation: ${WhaleEvent} 3s linear forwards;
`;

const SplashBody = styled.div`
  background: #257;
  width: 100vw;
  height: 100vh;
`;

const WaveWrapper = styled.div`
  top: 0px;
  left: 0px;
  width: 100%;
  position: absolute;
  background: rgb(255, 255, 255);
  height: 130px;
  margin: 0px;
  padding-top: 250px;
  animation: ${WaveMoveEvent} 3s linear forwards;
`;

function Splash() {
  const history = useHistory();
  const timeOut = () => {
    setTimeout(() => {
      history.push("/login");
    }, 3000);
  };

  useEffect(() => {
    timeOut();
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  return (
    <>
      {/* <p>칭찬은 고래도 춤추게 한다</p> */}
      <SplashBody>
        <Logo src={LogoSrc} />
        <WaveWrapper>
          <Wave
            style={{ zIndex: 10 }}
            options={{ height: 50, speed: 0.8, points: 5 }}
            fill="#257"
          />
        </WaveWrapper>
      </SplashBody>
    </>
  );
}

export default Splash;
