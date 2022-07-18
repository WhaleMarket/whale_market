import styled from "styled-components";

const Error = styled.p`
    margin-top: 0.375rem;
    color: #EB5757;
    font-size: 0.750rem;
`

function ErrorMessage({ message }) {
  return (
    <>
      <Error>{message}</Error>
    </>
  );
}

export default ErrorMessage;
