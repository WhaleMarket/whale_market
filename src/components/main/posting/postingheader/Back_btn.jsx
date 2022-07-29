import { useHistory } from "react-router-dom";
import styled from "styled-components";
import back from "../../../../assets/icon-arrow-left.png";

const Back = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  background-color: inherit;
  background-image: url(${back});
  background-size: 22px 22px;
  &:hover {
    cursor: pointer;
  }
`;

function BackButton() {
  const history = useHistory();
  return (
    <>
      <Back type="button" onClick={() => history.goBack()}></Back>
    </>
  );
}

export default BackButton;
