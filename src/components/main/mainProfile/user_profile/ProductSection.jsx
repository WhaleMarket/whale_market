import React from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";
import AuthContext from "../../../../context/AuthProvider";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../../constants/defaultUrl";
import PostingContext from "../../../../context/PostingProvider";

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
  margin-bottom: 16px;
  font-size: 16px;
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

function ProductSection({ accountname }) {
  const [InfoState] = useContext(AuthContext);
  const [productResult, setProductResult] = useState([]);
  const [PostingState] = useContext(PostingContext);

  async function getProduct() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
          "Content-type": "application/json",
        },
      };
      const response = await axios.get(
        `${API_URL}/product/${PostingState.data[0].accountname}/?limit=100&skip=0`,
        config
      );
      setProductResult(response.data.product);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    PostingState.data[0].accountname && getProduct();
  }, [PostingState.data[0].accountname]);

  if (productResult.length > 0) {
    return (
      <ProductContainer>
        <ProductTitle>판매 중인 상품</ProductTitle>
        <ProductList>
          <ProductCard id="product1" productResult={productResult} />
        </ProductList>
      </ProductContainer>
    );
  }
}

export default ProductSection;
