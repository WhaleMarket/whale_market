import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import LogoSrc from "../../assets/Logo.png";
import Wave from "react-wavify";
import LoopEvent from "../../theme/splashEvent";

const Logo = styled.img`
  display: block;
  z-index: -1;
  width: 200px;
  /* margin: 27vh auto; */
  margin-top: 27vh;
  position: relative;
  transition: all ease 10s;

  animation: ${LoopEvent} 6s infinite;
`;

const SplashBody = styled.div`
  width: 100vw;
  height: 100vh;
`;

function Splash() {
  const history = useHistory();
  const timeOut = () => {
    setTimeout(() => {
      history.push("/login");
    }, 2000);
  };

  useEffect(() => {
    timeOut();
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  return (
    <SplashBody>
      <Logo src={LogoSrc} />
      <Wave
        style={{
          zIndex: 100,
          // paddingTop: "10px",
          marginTop: "-130px",
          height: "800px",
        }}
        options={{
          speed: 0.5,
          height: 70,
        }}
        fill="#00BCD4"
      />
    </SplashBody>
  );
}

export default Splash;
