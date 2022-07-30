import { keyframes } from 'styled-components';

const HeartEvent = keyframes`
    0% {
        transform: rotate(0) scale(0);
    }
    20%{
        transform: rotate(-10deg) scale(1.1);
    }
    40%{
        transform: rotate(10deg) scale(1.2);
    }
    60%{
        transform: rotate(-5deg) scale(1.2);
    }
    80%{
        transform: rotate(5deg) scale(1.1);
    }
    100% {
        transform: rotate(0) scale(1.0);
    }
`;

export default HeartEvent;
