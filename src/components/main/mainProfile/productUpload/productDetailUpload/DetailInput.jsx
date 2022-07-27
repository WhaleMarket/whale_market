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

function DetailInput({ id, type, placeholder, index, errorName, defaultValue }) {
  const [, setSaveStates] = useContext(SaveProductContext);
  const input_ref = useRef();

  const inputstate = () => {
    if (input_ref) {
      setSaveStates((saveStates) => {
        saveStates.required[parseInt(index) + 1] = {
          ...saveStates.required[parseInt(index) + 1],
          value: input_ref.current.value,
        };
        return { required: saveStates.required };
      });
    }
    if (input_ref.current.value !== "") {
      setSaveStates((saveStates) => {
        saveStates.required[parseInt(index) + 1] = {
          ...saveStates.required[parseInt(index) + 1],
          savePossible: true,
        };
        return { required: saveStates.required };
      });
      if (id === "price") {
        const KRmoney = parseInt(
          input_ref.current.value.replace(/,/g, "")
        ).toLocaleString("ko-KR");
        input_ref.current.value = KRmoney;
      }
    } else {
      setSaveStates((saveStates) => {
        saveStates.required[parseInt(index) + 1] = {
          ...saveStates.required[parseInt(index) + 1],
          savePossible: false,
        };
        return { required: saveStates.required };
      });
    }
  };

  const errorState = () => {
    if (errorName) {
      setSaveStates((saveStates) => {
        saveStates.required[parseInt(index) + 1] = {
          ...saveStates.required[parseInt(index) + 1],
          error: true,
        };
        return { required: saveStates.required };
      });
    } else {
      setSaveStates((saveStates) => {
        saveStates.required[parseInt(index) + 1] = {
          ...saveStates.required[parseInt(index) + 1],
          error: false,
        };
        return { required: saveStates.required };
      });
    }
  };

  return (
    <>
      <Input
        ref={input_ref}
        onChange={inputstate}
        id={id}
        type={type}
        placeholder={placeholder}
        onBlur={errorState}
        defaultValue={defaultValue}
      />
    </>
  );
}

export default DetailInput;
