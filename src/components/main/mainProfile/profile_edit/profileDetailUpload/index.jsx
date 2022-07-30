import styled from "styled-components";
import Detail from "./Detail";

const Fieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
    margin-top: 30px;
`;

function ProfileDetail() {
  return (
    <>
      <Fieldset>
        <Detail />
      </Fieldset>
    </>
  );
}

export default ProfileDetail;
