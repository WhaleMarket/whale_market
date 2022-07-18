import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SaveProductContext from "../../../../../context/SaveProductProvider";

const Save = styled.button`
  width: 90px;
  height: 32px;
  border: none;
  border-radius: 32px;
  background-color: ${(props) => (props.state ? "#00bcd4" : "#B2EBF2")};
  color: white;
  font-size: 14px;
  &:hover {
    cursor: ${(props) => (props.state ? "pointer" : "auto")};
    outline: ${(props) => (props.state ? "1px solid #03a9f4" : "none")};
  }
`;

function SaveButton() {
  const [saveStates] = useContext(SaveProductContext);
  const [save, setSave] = useState(false)
  const saveButton = useRef();

  // useEffect(()=>{
  //   const SavePossible = saveStates.required.reduce((count, value) => (value.savePossible === true ? count++ : count), 0)
  //   if(SavePossible === 4){
  //     return setSave(true)
  //   } else {
  //     return setSave(false)
  //   }
  // },[saveStates])

  console.log(saveStates.required.reduce((count, value) => (value.savePossible === true ? count++ : count), 0))

  if (saveButton.current) {
    if (save) {
      saveButton.current.disabled = false;
    } else {
      saveButton.current.disabled = true;
    }
  }

  return (
    <>
      <Save ref={saveButton} state={save}>
        저장
      </Save>
    </>
  );
}

export default SaveButton;
