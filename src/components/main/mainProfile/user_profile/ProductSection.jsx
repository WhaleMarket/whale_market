import React from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";
import AuthContext from "../../../../context/AuthProvider";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../../constants/defaultUrl";
import PostingContext from "../../../../context/PostingProvider";
import LoadingPage from "../../../../pages/LoadingPage";

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
  const [productResult, setProductResult] = useState([]);
  const [PostingState] = useContext(PostingContext);
  const [loading, setLoading] = useState(false);

  async function getProduct() {
    setLoading(true);
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
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    PostingState.data[0].accountname && getProduct();
  }, [PostingState.data[0].accountname]);

  if (productResult.length > 0) {
    return loading ? (
      <LoadingPage />
    ) : (
      <ProductContainer>
        <ProductTitle>About {PostingState.data[0].accountname}</ProductTitle>
        <ProductList>
          <ProductCard id="product1" productResult={productResult} />
        </ProductList>
      </ProductContainer>
    );
  }
}

export default ProductSection;
