import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import SaveProductContext from "../../../../../context/SaveProductProvider";
import axios from "axios";
import { API_URL } from "../../../../../constants/defaultUrl";
import AuthContext from "../../../../../context/AuthProvider";
import ProductModificationContext from "../../../../../context/ProductModification";
import { useParams } from "react-router-dom";

const Edit = styled.button`
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

function EditButton() {
  const [InfoState] = useContext(AuthContext);
  const [saveStates] = useContext(SaveProductContext);
  const [save, setSave] = useState(false);
  const [ProductModificationState] = useContext(ProductModificationContext)
  const postId = useParams().postId

  useEffect(() => {
    let Error = saveStates.required.reduce((count, value) => {
      return value.error === false ? (count += 1) : count;
    }, 0);
    let SavePossible = saveStates.required.reduce((count, value) => {
      return value.savePossible === true ? (count += 1) : count;
    }, 0);
    if (Error === 4 && SavePossible > 0 ) {
      return setSave(true);
    } else {
      return setSave(false);
    }
  }, [saveStates]);

  const onSubmit = async () => {
    try {
        if(saveStates.required[0].file !== ""){
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
                itemName: saveStates.required[1].value !== "" ? saveStates.required[1].value : ProductModificationState.product[0].itemName,
                price: parseInt(saveStates.required[2].value.replace(/,/g, "")) !== "" ? parseInt(saveStates.required[2].value.replace(/,/g, "")) : parseInt(ProductModificationState.product[0].price),
                link: saveStates.required[3].value !== "" ? saveStates.required[3].value : ProductModificationState.product[0].url,
                itemImage: saveStates.required[0].file !== "" ? `${API_URL}/${imgResponse.data.filename}` : ProductModificationState.product[0].image,
              },
            };
      
            const response = await axios.put(
              `${API_URL}/product/${postId}`,
              postBodyData,
              headerData
            );
      
            if (response) {
              console.log(response)
              alert("🐳 성공적으로 수정 되었습니다! 🐳");
              window.location.href =
                "/main/profile/" + InfoState.MyInformations[0].myAccountname;
            }
        } else {
            const headerData = {
              headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                "Content-type": "application/json",
              },
            };
      
            const postBodyData = {
              product: {
                itemName: saveStates.required[1].value !== "" ? saveStates.required[1].value : ProductModificationState.product[0].itemName,
                price: saveStates.required[2].value !== "" ? parseInt(saveStates.required[2].value.replace(/,/g, "")) : parseInt(ProductModificationState.product[0].price),
                link: saveStates.required[3].value !== "" ? saveStates.required[3].value : ProductModificationState.product[0].url,
                itemImage: ProductModificationState.product[0].image,
              },
            };
            await axios.put(
              `${API_URL}/product/${postId}`,
              postBodyData,
              headerData
            );
              alert("🐳 성공적으로 수정 되었습니다! 🐳");
              window.location.href =
                "/main/profile/" + InfoState.MyInformations[0].myAccountname;
        }
    } catch (event) {
      console.error(event);
      alert("error");
    }
  };

  return (
    <>
      <Edit onClick={onSubmit} type="submit" state={save} disabled={!save}>
        수정
      </Edit>
    </>
  );
}

export default EditButton;