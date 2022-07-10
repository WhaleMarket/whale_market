import styled from "styled-components";
import { useHistory } from "react-router-dom";
import back from "../../../../assets/icon-arrow-left.png";

const Back = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  background-color: inherit;
  background-image: url(${back});
  &:hover {
    cursor: pointer;
  }
`;

function BackButton() {
  const history = useHistory();
  return (
    <>
      <Back onClick={() => history.goBack()}></Back>
    </>
  );
}

export default BackButton;
