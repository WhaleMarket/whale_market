import { useRef, useContext } from "react";
import SaveProductContext from "../../../../../context/SaveProductProvider";
import styled from "styled-components";

const Input = styled.input`
  border: none;
  border-bottom: 1px solid #dbdbdb;
  display: block;
  padding: 10px 0 8px 0;
  width: ${(props) => props.width + "px"};
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #dbdbdb;
  }
`;

function DetailInput({ id, type, placeholder, setValue, value, index }) {
  const [saveStates ,setSaveStates] = useContext(SaveProductContext);
  const input_ref = useRef();
  const inputstate = () => {
    if(input_ref){
      setValue((value) => {value[index] = input_ref.current.value
      return value
      })
    }
    if(value[index] !== ""){
      setSaveStates((saveStates) => {saveStates.required[parseInt(index)+1] = {
        ...saveStates.required[parseInt(index)+1],
        error: true
        }
        return saveStates
      });
    } else {
      setSaveStates((saveStates) => {saveStates.required[parseInt(index)+1] = {
        ...saveStates.required[parseInt(index)+1],
        error: false
        }
        return saveStates
      });
    }
  }
  
  return (
    <>
      <Input ref={input_ref} onChange={inputstate} id={id} type={type} placeholder={placeholder}/>
    </>
  );
}

export default DetailInput;
