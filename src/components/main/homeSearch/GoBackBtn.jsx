import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import BackBtnIcon from '../../../assets/icon-arrow-left.png';

const BackBtn = styled.button`
    width: 1.375rem;
    height: 1.375rem;
    border: none;
    background-color: inherit;
    background-image: url(${BackBtnIcon});
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
