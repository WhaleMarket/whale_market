import { keyframes } from 'styled-components';

const WhaleEvent = keyframes`
    0% {
        padding-top: 270px;
        transform: rotate( -25deg );
    }
    10% {
        padding-top: 230px;
        transform: rotate( 25deg );
    }
    20% {
        padding-top: 190px;
        transform: rotate( -20deg );
    }
    30% {
        padding-top: 150px;
        transform: rotate( 20deg );
    }
    40% {
        padding-top: 110px;
        transform: rotate( -15deg );
    }
    50% {
        padding-top: 70px;
        transform: rotate( 15deg );
    }
    60% {
        padding-top: 110px;
        transform: rotate( -10deg );
    }
    70% {
        padding-top: 150px;
        transform: rotate( 10deg );
    }
    80% {
        padding-top: 190px;
        transform: rotate( -5deg );
    }
    90% {
        padding-top: 230px;
        transform: rotate( 5deg );
    }
    100% {
        padding-top: 270px;
        transform: rotate( 0deg );
    }
`;

const WaveMoveEvent = keyframes`
    0% {
        padding-top: 500px;
    }
    50% {
        padding-top: 300px;
    }
    100% {
        padding-top: 500px;
    }
`;

export { WhaleEvent, WaveMoveEvent };
