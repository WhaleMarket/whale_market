import React from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";
import AuthContext from "../../../../context/AuthProvider";
import { useContext } from "react";

const ProductContainer = styled.section`
  width: 24.375rem;
  padding: 1.25rem 1rem;
  margin: 0 auto;
  box-sizing: border-box;
`;

const ProductTitle = styled.h1`
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 700;
`;

const ProductList = styled.ul`
  display: flex;
  gap: 0.625rem;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
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
