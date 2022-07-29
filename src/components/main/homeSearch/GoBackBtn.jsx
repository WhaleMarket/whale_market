import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import BackBtnIcon from '../../../assets/icon-arrow-left.png';

const BackBtn = styled.button`
    width: 22px;
    height: 22px;
    border: none;
    background-color: inherit;
    background-image: url(${BackBtnIcon});
    background-size: 22px 22px;
    &:hover{
        cursor: pointer;
    }
`

function GoBackBtn () {
    const history = useHistory();

    return (
        <BackBtn onClick={()=>history.goBack()} />
    );
}

export default GoBackBtn;
