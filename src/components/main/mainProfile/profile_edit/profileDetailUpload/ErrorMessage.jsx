import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Error = styled.p`
    margin-top: 6px;
    color: ${(props) => (props.green ? 'green' : '#eb5757')};
    font-size: 12px;
`;

function ErrorMessage({ message }) {
    const [green, setGreen] = useState(false);

    useEffect(() => {
        if (message === '*사용 가능한 계정ID 입니다.') {
            setGreen(true);
        } else {
            setGreen(false);
        }
    }, [message]);

    return (
        <>
            <Error green={green}>{message}</Error>
        </>
    );
}

export default ErrorMessage;
