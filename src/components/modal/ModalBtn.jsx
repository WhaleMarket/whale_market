import React from 'react';
import styled from 'styled-components';
import ModalIcon from '../../assets/icon-more-vertical.png';

const ModalButton = styled.button`
    position: ${(props)=>(props.className === 'small' ?  'absolute' : null )};
    top: ${(props)=>(props.className === 'small' ?  '1.5rem' : null )};
    right: ${(props)=>(props.className === 'small' ?  '0' : null )};
    width : ${(props)=>(props.className === 'small' ?  '1.125rem' : '1.5rem' )};
    height : ${(props)=>(props.className === 'small' ?  '1.125rem' : '1.5rem' )};
    border: none;
    background-color: inherit;
    background-image: url(${ModalIcon});
    background-size : ${(props)=>(props.className === 'small' ?  '1.125rem 1.125rem' : '1.375rem 1.375rem' )};
    &:hover{
        cursor: pointer;
    }
`;

function ModalBtn({className, onClick}) {
    return <ModalButton className={className} onClick={onClick}/>
}

export default ModalBtn;