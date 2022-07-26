import React from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";
import AuthContext from "../../../../context/AuthProvider";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../../constants/defaultUrl";

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

function ProductSection({ accountname }) {
  const [InfoState] = useContext(AuthContext);
//   const rendering = () => {
//     const result = [];
//     for (let i = 0; i < InfoState.MyInformations[2].price.length; i++) {
//       result.push(
//         <ProductCard
//           key={i}
//           src={InfoState.MyInformations[2].itemImage[i]}
//           name={InfoState.MyInformations[2].itemName[i]}
//           price={parseInt(InfoState.MyInformations[2].price[i]).toLocaleString(
//             "ko-KR"
//           )}
//         />
//       );
//     }
//     return result;
//   };

  // 희: 유저 상품 정보 받아오기
  const [productResult, setProductResult] = useState([]);

  useEffect(() => {
    async function getProduct() {
        try {
            const config = {
                headers: {
                  Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                  "Content-type": "application/json",
                },
              };
            const response = await axios.get(
                `${ API_URL }/product/${accountname}`,
                config,
            );

            console.log(JSON.stringify(response.data.product));
            setProductResult(response.data.product);

        } catch (error) {
            console.error(error);
        }
    }
    getProduct();

}, [accountname]);

if (productResult.length > 0) {
    return (
        <ProductContainer>
        <ProductTitle>판매 중인 상품</ProductTitle>
        {/* <ProductList>{rendering()}</ProductList> */}
        <ProductList>
            <ProductCard
                id='product1'
                productResult={productResult}
                accountname={accountname}
            />
        </ProductList>
        </ProductContainer>
    );
}

//   return (
//     <ProductContainer>
//       <ProductTitle>판매 중인 상품</ProductTitle>
//       {/* <ProductList>{rendering()}</ProductList> */}
//       <ProductList>
//       <ProductCard
//           key={i}
//           src={InfoState.MyInformations[2].itemImage[i]}
//           name={InfoState.MyInformations[2].itemName[i]}
//           price={parseInt(InfoState.MyInformations[2].price[i]).toLocaleString(
//             "ko-KR"
//           )}
//         />
//       </ProductList>
//     </ProductContainer>
//   );
}

export default ProductSection;
