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
  const [saveStates, setSaveStates] = useContext(SaveProductContext);
  const [save, setSave] = useState(false);
  const saveButton = useRef();

  useEffect(() => {
    let SavePossible = saveStates.required.reduce((count, value) => {
      return value.savePossible === true ? (count += 1) : count;
    }, 0);
    if (SavePossible === 4) {
      return setSave(true);
    } else {
      return setSave(false);
    }
  }, [saveStates]);

  if (saveButton.current) {
    if (save) {
      saveButton.current.disabled = false;
    } else {
      saveButton.current.disabled = true;
    }
  }

  const errorState = () => {
    const nameState =
      saveStates.required[1].value.split("").length < 2 ||
      saveStates.required[1].value.split("").length > 15;

    const numberpattern = /^[0-9]*$/
    const priceState = !numberpattern.test(saveStates.required[2].value);

    const urlpattern =
      /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    const urlState = !urlpattern.test(saveStates.required[3].value);

    if (nameState) {
      setSaveStates((saveStates) => {
        saveStates.required[1] = {
          ...saveStates.required[1],
          error: true,
        };
        return { required: saveStates.required };
      });
    } else {
      setSaveStates((saveStates) => {
        saveStates.required[1] = {
          ...saveStates.required[1],
          error: false,
        };
        return { required: saveStates.required };
      });
      if(priceState){
        setSaveStates((saveStates) => {
          saveStates.required[2] = {
            ...saveStates.required[2],
            error: true,
          };
          return { required: saveStates.required };
        });
      } else {
        setSaveStates((saveStates) => {
          saveStates.required[2] = {
            ...saveStates.required[2],
            error: false,
          };
          return { required: saveStates.required };
        });
        if(urlState){
          setSaveStates((saveStates) => {
            saveStates.required[3] = {
              ...saveStates.required[3],
              error: true,
            };
            return { required: saveStates.required };
          });
        } else {
          setSaveStates((saveStates) => {
            saveStates.required[3] = {
              ...saveStates.required[3],
              error: false,
            };
            return { required: saveStates.required };
          });
        }
      }
    }
  };

  return (
    <>
      <Save ref={saveButton} state={save} onClick={errorState}>
        저장
      </Save>
    </>
  );
}

export default SaveButton;
