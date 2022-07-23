import React from 'react';
import styled from 'styled-components';
import ModalPortal from '../../../src/Portal';

const ModalBg = styled.section`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    visibility: ${(props) => props.alertModal === false ? 'hidden' : 'visible'};
`

const ModalContent = styled.div`
    display: inline-block;
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    background-color: #FFFFFF;
`

const AlertQuestion = styled.p`
    display: inline-block;
    width: 252px;
    padding: 22px 0;
    border-bottom: 0.5px solid #DBDBDB;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 100%;
    text-align: center;
`

const AlertUl = styled.ul`
    display: flex;
`

const AlertLi = styled.li`
    width: 50%;
    :first-child {
        border-right: 0.5px solid #DBDBDB;
    }
`

const CancelBtn = styled.button`
    width: 100%;
    padding: 14px 0;
    border:none;
    background-color: #FFFFFF;
    &:hover{
        cursor: pointer;
    }
`

const DeleteBtn = styled(CancelBtn)`
    color: #00BCD4;
`

function AlertModal({alertModal, content ,setIsOpenModal , setAlertModal ,deleteBtn}) {
    return (
        <ModalPortal>
            <ModalBg 
                alertModal={alertModal}
                // onClick={() => {
                //     setIsOpenModal(false)
                //     setAlertModal(false)}} 
            >
                <ModalContent>
                    <AlertQuestion>{content}</AlertQuestion>
                    <AlertUl>
                        <AlertLi>
                            {/* 취소버튼 - 모달, alert모달 모두 내림 */}
                            <CancelBtn 
                                onClick={() => {
                                    setIsOpenModal(false)
                                    setAlertModal(false)}}
                            >
                                취소
                            </CancelBtn>
                        </AlertLi>
                        <AlertLi>
                            <DeleteBtn onClick={deleteBtn.onClick}>{deleteBtn.content}</DeleteBtn>
                        </AlertLi>
                    </AlertUl>
                </ModalContent>
            </ModalBg>
        </ModalPortal>
    )
}

export default AlertModal;