import Img_logo from "../../../../../assets/image_logo.png";
import styled from "styled-components";
import { useContext, useEffect, useRef } from "react";
import SaveProductContext from "../../../../../context/SaveProductProvider";
import { IMG_EXTENSION } from "../../../../../constants/defaultUrl";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductModificationContext from "../../../../../context/ProductModification";
import { API_URL } from "../../../../../constants/defaultUrl";
import AuthContext from "../../../../../context/AuthProvider";


const Uploadbtn = styled.button`
  position: absolute;
  border: none;
  background-color: #c4c4c4;
  width: 36px;
  height: 36px;
  border-radius: 100%;
  background-image: url(${Img_logo});
  background-position: center center;
  background-repeat: no-repeat;
  bottom: 12px;
  right: 12px;
  &:hover {
    cursor: pointer;
  }
`;

const UploadInput = styled.input`
  display: none;
`;

function UploadBtn({ setUrl }) {
  const [, setSaveStates] = useContext(SaveProductContext);
  const Upload_input = useRef();
  const postId = useParams().postId;
  const [, setProductModificationState] = useContext(ProductModificationContext);
  const [InfoState] = useContext(AuthContext)

  useEffect(() => {
    async function getProduct() {
      try {
        const editConfig = {
          headers: {
            Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
            "Content-type": "application/json",
          },
        };
        const response = await axios.get(`${API_URL}/product/detail/${postId}`, editConfig);
        setProductModificationState((ProductModificationState) => {
          ProductModificationState.product[0] = {
            ...ProductModificationState.product[0],
            itemName: response.data.product.itemName,
            image: response.data.product.itemImage,
            price: response.data.product.price,
            url: response.data.product.link
          };
          return { product: ProductModificationState.product }
        });
      } catch (error) {
        console.error(error);
        alert("error");
      }
    }
    postId && getProduct()
  }, [postId]);


  const ImgUpload = (event) => {
    const Blob = event.target.files[0];
    if (
      Blob === undefined ||
      !IMG_EXTENSION.includes(Blob.name.split(".")[1])
    ) {
      event.target.value = "";
      return alert("올바른 형식의 파일을 넣어주세요.");
    } else if (Blob.size > 1024 * 1024 * 10) {
      event.target.value = "";
      return alert("파일의 용량이 10MB를 초과했습니다.");
    }
    const reader = new FileReader();
    reader.readAsDataURL(Blob);
    setSaveStates((saveStates) => {
      saveStates.required[0] = {
        ...saveStates.required[0],
        file: Blob,
        savePossible: true,
      };
      return { required: saveStates.required };
    });
    event.target.value = "";
    return new Promise((resolve) => {
      reader.onload = () => {
        setUrl(reader.result);
        resolve();
      };
    });
  };
  return (
    <>
      <UploadInput
        ref={Upload_input}
        type="file"
        accept="image/*"
        onChange={ImgUpload}
      />
      <Uploadbtn onClick={() => Upload_input.current.click()} />
    </>
  );
}

export default UploadBtn;
