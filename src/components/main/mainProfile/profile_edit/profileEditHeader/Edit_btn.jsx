import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import AuthContext from "../../../../../context/AuthProvider";
import { API_URL } from "../../../../../constants/defaultUrl";
import success_whale from '../../../../../assets/success-whale.png';
import disabled_whale from '../../../../../assets/disabled-whale.png';
import ProfileModificationContext from "../../../../../context/ProfileModification";


const Edit = styled.button`
  width: 100px;
  height: 52px;
  padding-left: 16px;
  border: none;
  background-color: transparent;
  background-position: 0px 0px;
  background-image: ${(props) => (props.state ? `url(${success_whale})` : `url(${disabled_whale})`)};
  background-size: 100px 52px;
  background-repeat: no-repeat;
  transition: 0.5s ease-in-out;
  vertical-align: top;
  &:hover {
    cursor: ${(props) => (props.state ? "pointer" : "auto")};
  }
`;

function EditButton() {
  const [InfoState] = useContext(AuthContext);
  const [ProfileModificationState] = useContext(ProfileModificationContext);
  const [edit , setEdit] = useState(false);

  useEffect(() => {
    let Error = ProfileModificationState.profile.reduce((count, value) => {
      return value.error === false ? (count += 1) : count;
    }, 0);
    let editPossible = ProfileModificationState.profile.reduce((count, value) => {
      return value.editPossible === true ? (count += 1) : count;
    }, 0);
    if (Error === 4 && editPossible > 0 ) {
      return setEdit(true);
    } else {
      return setEdit(false);
    }
  }, [ProfileModificationState]);

  const onSubmit = async () => {
    try {
        if(ProfileModificationState.profile[3].value !== ""){
            const imgBodyData = new FormData();

            imgBodyData.append("image", ProfileModificationState.profile[3].value);
      
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
      
            const profileEditData = {
              user: {
                  username: ProfileModificationState.profile[0].value !== '' ? ProfileModificationState.profile[0].value : InfoState.MyInformations[0].myUsername,
                  accountname: ProfileModificationState.profile[1].value !== '' ? ProfileModificationState.profile[1].value : InfoState.MyInformations[1].myAccountname,
                  intro: ProfileModificationState.profile[2].value !== '' ? ProfileModificationState.profile[2].value : InfoState.MyInformations[2].myIntro,
                  image: `${API_URL}/${imgResponse.data.filename}`,
              },
            };
      
            const res = await axios.put(
              `${API_URL}/user`,
              profileEditData,
              headerData
            );
              alert("🐳 성공적으로 수정 되었습니다! 🐳");
              window.location.href =
                "/main/profile/" + res.data.user.accountname;
        } else {
            const headerData = {
              headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                "Content-type": "application/json",
              },
            };
      
            const profileEditData = {
              user: {
                username: ProfileModificationState.profile[0].value !== '' ? ProfileModificationState.profile[0].value : InfoState.MyInformations[0].myUsername,
                accountname: ProfileModificationState.profile[1].value !== '' ? ProfileModificationState.profile[1].value : InfoState.MyInformations[1].myAccountname,
                intro: ProfileModificationState.profile[2].value !== '' ? ProfileModificationState.profile[2].value : InfoState.MyInformations[2].myIntro,
                image: ProfileModificationState.profile[3].value,
              },
            };
            const res = await axios.put(
              `${API_URL}/user`,
              profileEditData,
              headerData
            );
            alert("🐳 성공적으로 수정 되었습니다! 🐳");
            window.location.href =
              "/main/profile/" + res.data.user.accountname;
        }
    } catch (event) {
      console.error(event);
      alert("error");
    }
  };
  
  return (
    <>
      <Edit onClick={onSubmit} state={edit} disabled={!edit}/>
    </>
  );
}

export default EditButton;