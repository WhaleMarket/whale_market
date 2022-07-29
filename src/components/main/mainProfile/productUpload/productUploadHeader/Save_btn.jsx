import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import AuthContext from "../../../../../context/AuthProvider";
import SaveProductContext from "../../../../../context/SaveProductProvider";
import { API_URL } from "../../../../../constants/defaultUrl";
import upload_whale from '../../../../../assets/upload-whale.png';
import upload_disabled_whale from '../../../../../assets/upload-disabled-whale.png';

const Save = styled.button`
  width: 100px;
  height: 52px;
  padding-left: 16px;
  border: none;
  background-color: transparent;
  background-position: 0px 0px;
  background-image: ${(props) => (props.state ? `url(${upload_whale})` : `url(${upload_disabled_whale})`)};
  background-size: 100px 52px;
  background-repeat: no-repeat;
  transition: 0.5s ease-in-out;
  vertical-align: top;
  &:hover {
    cursor: ${(props) => (props.state ? "pointer" : "auto")};
  }
`;

function SaveButton() {
  const [InfoState] = useContext(AuthContext);
  const [saveStates] = useContext(SaveProductContext);
  const [save, setSave] = useState(false);

  useEffect(() => {
    let Error = saveStates.required.reduce((count, value) => {
      return value.error === false ? (count += 1) : count;
    }, 0);
    let SavePossible = saveStates.required.reduce((count, value) => {
      return value.savePossible === true ? (count += 1) : count;
    }, 0);
    if (Error === 4 && SavePossible === 4) {
      return setSave(true);
    } else {
      return setSave(false);
    }
  }, [saveStates]);

  const onSubmit = async () => {
    try {
      const imgBodyData = new FormData();

      imgBodyData.append("image", saveStates.required[0].file);

      const imgResponse = await axios.post(
        `${API_URL}/image/uploadfile`,
        imgBodyData
      );

      const headerData = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          "Content-type": "application/json",
        },
      };

      const postBodyData = {
        product: {
          itemName: saveStates.required[1].value,
          price: parseInt(saveStates.required[2].value.replace(/,/g, "")),
          link: saveStates.required[3].value,
          itemImage: `${API_URL}/${imgResponse.data.filename}`,
        },
      };

      const response = await axios.post(
        `${API_URL}/product`,
        postBodyData,
        headerData
      );

      if (response) {
        alert("🐳 성공적으로 업로드 되었습니다! 🐳");
        window.location.href =
          "./profile/" + InfoState.MyInformations[0].myAccountname;
      }
    } catch (event) {
      console.error(event);
      alert("error");
    }
  };

  return (
    <>
      <Save onClick={onSubmit} type="submit" state={save} disabled={!save}/>
    </>
  );
}

export default SaveButton;
