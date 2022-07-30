import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import AuthContext from '../../../../../context/AuthProvider';
import SaveProductContext from '../../../../../context/SaveProductProvider';
import ProductModificationContext from '../../../../../context/ProductModification';
import { API_URL } from '../../../../../constants/defaultUrl';
import success_whale from '../../../../../assets/success-whale.png';
import disabled_whale from '../../../../../assets/disabled-whale.png';

const Edit = styled.button`
    width: 100px;
    height: 52px;
    padding-left: 16px;
    border: none;
    background-color: transparent;
    background-position: 0px 0px;
    background-image: ${(props) =>
        props.state ? `url(${success_whale})` : `url(${disabled_whale})`};
    background-size: 100px 52px;
    background-repeat: no-repeat;
    transition: 0.5s ease-in-out;
    vertical-align: top;
    &:hover {
        cursor: ${(props) => (props.state ? 'pointer' : 'auto')};
    }
`;

function EditButton() {
    const [InfoState] = useContext(AuthContext);
    const [saveStates] = useContext(SaveProductContext);
    const [save, setSave] = useState(false);
    const [ProductModificationState] = useContext(ProductModificationContext);
    const postId = useParams().postId;

    useEffect(() => {
        let Error = saveStates.required.reduce((count, value) => {
            return value.error === false ? (count += 1) : count;
        }, 0);
        let SavePossible = saveStates.required.reduce((count, value) => {
            return value.savePossible === true ? (count += 1) : count;
        }, 0);
        if (Error === 4 && SavePossible > 0) {
            return setSave(true);
        } else {
            return setSave(false);
        }
    }, [saveStates]);

    const onSubmit = async () => {
        try {
            if (saveStates.required[0].file !== '') {
                const imgBodyData = new FormData();

                imgBodyData.append('image', saveStates.required[0].file);

                const imgResponse = await axios.post(
                    `${API_URL}/image/uploadfile`,
                    imgBodyData
                );

                const headerData = {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem(
                            'token'
                        )}`,
                        'Content-type': 'application/json',
                    },
                };

                const postBodyData = {
                    product: {
                        itemName:
                            saveStates.required[1].value !== ''
                                ? saveStates.required[1].value
                                : ProductModificationState.product[0].itemName,
                        price:
                            saveStates.required[2].value !== ''
                                ? parseInt(
                                      saveStates.required[2].value.replace(
                                          /,/g,
                                          ''
                                      )
                                  )
                                : parseInt(
                                      ProductModificationState.product[0].price
                                  ),
                        link:
                            saveStates.required[3].value !== ''
                                ? saveStates.required[3].value
                                : ProductModificationState.product[0].url,
                        itemImage:
                            saveStates.required[0].file !== ''
                                ? `${API_URL}/${imgResponse.data.filename}`
                                : ProductModificationState.product[0].image,
                    },
                };

                const response = await axios.put(
                    `${API_URL}/product/${postId}`,
                    postBodyData,
                    headerData
                );

                if (response) {
                    window.location.href =
                        '/main/profile/' +
                        InfoState.MyInformations[0].myAccountname;
                }
            } else {
                const headerData = {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem(
                            'token'
                        )}`,
                        'Content-type': 'application/json',
                    },
                };

                const postBodyData = {
                    product: {
                        itemName:
                            saveStates.required[1].value !== ''
                                ? saveStates.required[1].value
                                : ProductModificationState.product[0].itemName,
                        price:
                            saveStates.required[2].value !== ''
                                ? parseInt(
                                      saveStates.required[2].value.replace(
                                          /,/g,
                                          ''
                                      )
                                  )
                                : parseInt(
                                      ProductModificationState.product[0].price
                                  ),
                        link:
                            saveStates.required[3].value !== ''
                                ? saveStates.required[3].value
                                : ProductModificationState.product[0].url,
                        itemImage: ProductModificationState.product[0].image,
                    },
                };
                await axios.put(
                    `${API_URL}/product/${postId}`,
                    postBodyData,
                    headerData
                );
                window.location.href =
                    '/main/profile/' +
                    InfoState.MyInformations[0].myAccountname;
            }
        } catch (event) {
            console.error(event);
            alert('error');
        }
    };

    return (
        <>
            <Edit
                onClick={onSubmit}
                type="submit"
                state={save}
                disabled={!save}
            />
        </>
    );
}

export default EditButton;
