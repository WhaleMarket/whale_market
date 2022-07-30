import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../../../context/AuthProvider';
import { API_URL } from '../../../../constants/defaultUrl';
import styled from 'styled-components';
import Modal from '../../../modal/Modal';
import AlertModal from '../../../modal/AlertModal';
import PostingContext from '../../../../context/PostingProvider';
import error_image from '../../../../assets/error-img.png';

const ProductWrapper = styled.li`
    display: flex;
    flex-direction: column;
    list-style: none;
    cursor: pointer;
`;
const ProductImg = styled.img`
    width: 140px;
    height: 90px;
    border-radius: 8px;
    object-fit: cover;
`;

const ProductName = styled.strong`
    line-height: 18px;
    width: 140px;
    margin: 6px 0 4px;
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const ProductPrice = styled.p`
    width: 140px;
    color: #00bcd4;
    font-size: 12px;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
`;

function ProductCard({ productResult }) {
    const [PostingState] = useContext(PostingContext);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [alertModal, setAlertModal] = useState(false);
    const [targetProduct, setTargetProduct] = useState('');
    const [targetProductName, setTargetProductName] = useState('');
    const [InfoState] = useContext(AuthContext);
    const history = useHistory();

    const modalItemList =
        PostingState.data[0].accountname ===
        InfoState.MyInformations[0].myAccountname
            ? [
                  {
                      content: targetProductName,
                      onClick: () => {
                          return;
                      },
                  },
                  {
                      content: '삭제',
                      onClick: () => {
                          setAlertModal(true);
                      },
                  },
                  {
                      content: '수정',
                      onClick: () => {
                          const GetProduct = async (id) => {
                              history.push('/productedit/' + id);
                          };
                          GetProduct(targetProduct);
                      },
                  },
              ]
            : [
                  {
                      content: targetProductName,
                      onClick: () => {
                          return;
                      },
                  },
              ];

    const removeProduct = async (id) => {
        try {
            const deleteConfig = {
                headers: {
                    Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                    'Content-type': 'application/json',
                },
            };
            await axios.delete(`${API_URL}/product/` + id, deleteConfig);
            window.location.href =
                './' + InfoState.MyInformations[0].myAccountname;
        } catch (error) {
            console.error(error);
            alert('error');
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
                            setTargetProductName(product.itemName);
                        }}
                    >
                        <ProductImg src={product.itemImage.includes(API_URL) ? product.itemImage : error_image} />
                        <ProductName>{product.itemName}</ProductName>
                        <ProductPrice>{`${
                            isNaN(product.price)
                                ? product.price
                                : product.price.toLocaleString('ko-KR')
                        }원`}</ProductPrice>
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
                content={'상품을 삭제할까요?'}
                deleteBtn={{
                    content: '삭제',
                    onClick: () => {
                        removeProduct(targetProduct);
                    },
                }}
            />
        </>
    );
}

export default ProductCard;
