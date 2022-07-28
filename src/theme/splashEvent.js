import { keyframes } from "styled-components";

const LoopEvent = keyframes`
    0% {
        left: 30px;
        transform: rotate( -50deg );
    }
    25% {
        left: 35vw;
        transform: rotate( 30deg );
    }
    50% {
        left: 75vw;
        transform: rotate( -20deg );
    }
    100% {
        left: 0px;
        transform: rotate( 0deg );
    }
`;

export default LoopEvent;
