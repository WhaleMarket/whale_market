import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import LogoSrc from '../../assets/Logo.png';
import Wave from 'react-wavify';
import { WhaleEvent, WaveMoveEvent } from '../../theme/splashEvent';

const Logo = styled.img`
    display: block;
    z-index: 200;
    width: 200px;
    margin: 27vh auto 0;
    position: relative;
    animation: ${WhaleEvent} 3s linear forwards;
`;

const SplashBody = styled.div`
    background: white;
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
            history.push('/login');
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
                        fill="url(#gradient)"
                    >
                        <defs>
                            <linearGradient
                                id="gradient"
                                gradientTransform="rotate(90)"
                            >
                                <stop offset="20%" stopColor="#80deea" />
                                <stop offset="80%" stopColor="#fff" />
                            </linearGradient>
                        </defs>
                    </Wave>
                </WaveWrapper>
            </SplashBody>
        </>
    );
}

export default Splash;
