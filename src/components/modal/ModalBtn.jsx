import React from 'react';
import styled from 'styled-components';
import ModalIcon from '../../assets/icon-more-vertical.png';

const ModalButton = styled.button`
    position:${(props)=>(props.className !== 'comment' ?  null : 'absolute' )};
    margin-top:${(props)=>(props.className === 'null' ?  null : '4px' )};
    right: ${(props)=>(props.className === 'small' ?  '0' : null )};
    width : ${(props)=>(props.className === 'small' ?  '18px' : '24px' )};
    height : ${(props)=>(props.className === 'small' ?  '18px' : '24px' )};
    border: none;
    background-color: inherit;
    background-image: url(${ModalIcon});
    background-size : ${(props)=>(props.className === 'small' ?  '18px 18px' : '22px 22px' )};
    &:hover{
        cursor: pointer;
    }
`;

function ModalBtn({className, onClick}) {
    return <ModalButton className={className} onClick={onClick}/>
}

export default ModalBtn;