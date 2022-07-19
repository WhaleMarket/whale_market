import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import LogoSrc from '../../assets/Logo.png';

const Logo = styled.img`
    display: block;
    width: 200px;
    margin: 25vh auto;
`;

const SplashBody = styled.div`
    width: 100vw;
    height: 100vh;
    padding: 0;
    margin: 0;
    overflow: hidden;
    animation: change-background 3.1s ease;
    
    @keyframes change-background {
    0% {
        background: #FFFFFF;
    }
    100% {
        background: #00BCD4;
    }
}
`

function Splash(){
    const history = useHistory();
    const timeOut = () => {
        setTimeout(()=>{
            history.push('/login');
        },3000);
    };

    useEffect(()=>{
        timeOut();
        return ()=>{
            clearTimeout(timeOut);
        };
    },[]);

    return(
        <SplashBody>
            <Logo src={LogoSrc} />
        </SplashBody>
    )
}

export default Splash;