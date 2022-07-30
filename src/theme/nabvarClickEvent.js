import { keyframes } from 'styled-components';

const NavbarClickEvent = keyframes`
    0% {
        transform: rotate(0) scale(0);
    }
    20%{
        transform: rotate(-20deg) scale(1.1);
    }
    40%{
        transform: rotate(20deg) scale(1.2);
    }
    60%{
        transform: rotate(-10deg) scale(1.3);
    }
    80%{
        transform: rotate(10deg) scale(1.4);
    }
    100% {
        transform: rotate(0) scale(1.5);
    }
`;

export default NavbarClickEvent;
