import styled from "styled-components";

const Input = styled.input`
  border: none;
  border-bottom: 1px solid #dbdbdb;
  display: block;
  padding: 10px 0 8px 0;
  margin-bottom: 16px;
  width: ${(props) => props.width + "px"};
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #dbdbdb;
  }
`;

function DetailInput({ id, type, placeholder }) {
  return (
    <>
      <Input id={id} type={type} placeholder={placeholder} />
    </>
  );
}

export default DetailInput;
