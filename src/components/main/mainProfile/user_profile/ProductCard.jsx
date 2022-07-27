import React, { useState, useContext } from "react";
import styled from "styled-components";
import Modal from "../../../modal/Modal";
import AlertModal from "../../../modal/AlertModal";
import axios from "axios";
import { API_URL } from "../../../../constants/defaultUrl";
import AuthContext from "../../../../context/AuthProvider";

const ProductWrapper = styled.li`
  display: flex;
  flex-direction: column;
  list-style: none;
  cursor: pointer;
`;
const ProductImg = styled.img`
  width: 8.75rem;
  height: 5.625rem;
  border-radius: 0.5rem;
  object-fit: cover;
`;

const ProductName = styled.strong`
  width: 8.75rem;
  margin: 0.375rem 0 0.25rem;
  font-size: 0.875rem;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ProductPrice = styled.p`
  width: 8.75rem;
  color: #00bcd4;
  font-size: 0.75rem;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function ProductCard({ productResult }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [targetProduct, setTargetProduct] = useState('');
  const [InfoState] = useContext(AuthContext);

  const modalItemList = [
    {
      content: "삭제",
      onClick: () => {
        setAlertModal(true);
      },
    },
    {
      content: "수정",
      onClick: () => {},
    },
  ];

  const removeProduct = async (id) => {
    try {
      const deleteConfig = {
        headers: {
          Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
          "Content-type": "application/json",
        },
      };
      await axios.delete(`${API_URL}/product/` + id, deleteConfig);
      alert("🐳 상품이 삭제되었습니다. 🐳");
      window.location.href = "./" + InfoState.MyInformations[0].myAccountname;
    } catch (error) {
      console.error(error);
      alert("error");
    }
  };

  return (
    <>
      {productResult.map((product, index) => {
        return (
          <ProductWrapper
            key={index}
            onClick={() => {
              setIsOpenModal(!isOpenModal);
              setTargetProduct(product.id);
            }}
          >
            <ProductImg src={product.itemImage} />
            <ProductName>{product.itemName}</ProductName>
            <ProductPrice>{`${product.price.toLocaleString(
              "ko-KR"
            )}원`}</ProductPrice>
          </ProductWrapper>
        );
      })}

      <Modal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        modalItemList={modalItemList}
      />
      <AlertModal
        alertModal={alertModal}
        setAlertModal={setAlertModal}
        setIsOpenModal={setIsOpenModal}
        content={"상품을 삭제할까요?"}
        deleteBtn={{
          content: "삭제",
          onClick: () => {
            removeProduct(targetProduct);
          }
        }}
      />
    </>
  );
}

export default ProductCard;