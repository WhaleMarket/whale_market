import styled from "styled-components";

const Label = styled.label`
  font-size: 12px;
  color: #767676;
`;

function DetailLabel({ id, title }) {
  return (
    <>
      <Label htmlFor={id}>{title}</Label>
    </>
  );
}

export default DetailLabel;
