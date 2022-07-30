import { keyframes } from 'styled-components';

const MarqueeEvent = keyframes`
    0% {
        left: 0;
    }
    100% {
        left: -100%;
    }
`;

export default MarqueeEvent;
