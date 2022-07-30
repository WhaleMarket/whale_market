import styled from 'styled-components';

const Error = styled.p`
    margin-top: 6px;
    color: #eb5757;
    font-size: 12px;
`;

function ErrorMessage({ message }) {
    return (
        <>
            <Error>{message}</Error>
        </>
    );
}

export default ErrorMessage;
