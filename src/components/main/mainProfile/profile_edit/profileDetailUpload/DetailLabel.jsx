import styled from "styled-components";

const Label = styled.label`
    margin: 16px 0 10px 0;
    color: #767676;
    font-size: 12px;
`;

function DetailLabel({ id, title }) {
  return (
    <>
      <Label htmlFor={id}>{title}</Label>
    </>
  );
}

export default DetailLabel;
