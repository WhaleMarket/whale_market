import React from 'react';
import styled from 'styled-components';
import ProductCard from './ProductCard';

const ProductContainer = styled.section`
    padding: 1.250rem 1rem;
`

const ProductTitle = styled.h1`
    margin-bottom: 1rem;
    font-size: 1rem;
    font-weight: 700;
`

const ProductList = styled.ul`
    display: flex;
    gap: 0.625rem;
    overflow-x: scroll;
`

function ProductSection() {
    return(
        <ProductContainer>
            <ProductTitle>판매 중인 상품</ProductTitle>
            <ProductList>
                <ProductCard/>
            </ProductList>
        </ProductContainer>
    )
}

export default ProductSection;