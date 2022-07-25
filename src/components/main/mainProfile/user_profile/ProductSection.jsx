import React from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";
import AuthContext from "../../../../context/AuthProvider";
import { useContext } from "react";

const ProductContainer = styled.section`
  width: 60vw;
  padding: 20px 4%;
  margin: 0 auto;
  box-sizing: border-box;
  @media screen and (max-width: 855px) {
    width: 100vw;
    }
`;

const ProductTitle = styled.h1`
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 700;
`;

const ProductList = styled.ul`
  display: flex;
  padding: 10px 0;
  gap: 10px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  &::-webkit-scrollbar {
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #b2ebf288;
    border-radius: 5px;
  }
`;

function ProductSection() {
  const [InfoState] = useContext(AuthContext);
  const rendering = () => {
    const result = [];
    for (let i = 0; i < InfoState.MyInformations[2].price.length; i++) {
      result.push(
        <ProductCard
          key={i}
          src={InfoState.MyInformations[2].itemImage[i]}
          name={InfoState.MyInformations[2].itemName[i]}
          price={parseInt(InfoState.MyInformations[2].price[i]).toLocaleString(
            "ko-KR"
          )}
        />
      );
    }
    return result;
  };

  return (
    <ProductContainer>
      <ProductTitle>판매 중인 상품</ProductTitle>
      <ProductList>{rendering()}</ProductList>
    </ProductContainer>
  );
}

export default ProductSection;
