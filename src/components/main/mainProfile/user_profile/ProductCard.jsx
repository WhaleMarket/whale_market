import React from 'react';
import styled from 'styled-components';
import img from '../../../../assets/product-img.png';

const ProductWrapper = styled.li`
    display: flex;
    flex-direction: column;
    list-style: none;
    width: 24.375rem;
    cursor:pointer;
`
const ProductImg = styled.img`
    width: 8.75rem;
    height: 5.625rem;
    border-radius: 0.5rem;
    object-fit: cover;
`

const ProductName = styled.strong`
    margin: 0.375rem 0 0.25rem;
    font-size: 0.875rem;
`

const ProductPrice = styled.p`
    color: #00BCD4;
    font-size: 0.75rem;
    font-weight: 700;
`

function ProductCard({productPrice}) {
    return(
        <ProductWrapper>
            <ProductImg src={img}/>
            <ProductName>고래밥</ProductName>
            <ProductPrice>{productPrice}원</ProductPrice>
        </ProductWrapper>
    )
}

export default ProductCard;