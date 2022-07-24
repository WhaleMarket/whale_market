import React, { useState } from 'react';
import styled from 'styled-components';
import defaultImg from '../../../assets/basic-profile-img.png';
import ModalBtn from '../../modal/ModalBtn';
import Modal from '../../modal/Modal';
import AlertModal from '../../modal/AlertModal';

const ProfileContainer = styled.section`
    display: flex;
    justify-content: space-between;
    height: 42px;
`

const ProfileDiv = styled.div`
    display: flex;
    justify-content: space-around;
`

const ProfileImg = styled.img`
    width: 42px;
    height: 42px;
    margin-right: 12px;
    border: 0.5px solid #DBDBDB;
    border-radius: 50%;
    background: url(${defaultImg}) ;
    background-size: 42px 42px;
`

const UserInfoWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`

const UserName = styled.span`
    margin: 4px 0 2px;
    color: #000000;
    font-size: 14px;
    font-weight: 500;
    line-height: 17.53px;
`

const UserId = styled.span`
    color: #767676;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
`

function ProfileSection({username, accountname, src}) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [alertModal, setAlertModal] = useState(false);

    const modalItemList = [
        {
            content: "삭제",
            onClick: () => {
                setAlertModal(true);
            },

        },
        {
            content: "수정",
            onClick: () => {},
        }
    ];

    const deleteBtn = {
        content: "삭제",
        onClick: () => {},
    };

    return (
        <>
            <ProfileContainer>
                <ProfileDiv>
                <ProfileImg src={src || defaultImg} alt="프로필 이미지"/>
                    <UserInfoWrapper>
                        <UserName>{username}</UserName>
                        <UserId>{accountname}</UserId>
                    </UserInfoWrapper>
                </ProfileDiv>
                <ModalBtn className='small' onClick={()=>setIsOpenModal(!isOpenModal)}/>
            </ProfileContainer>

            <Modal 
            isOpenModal={isOpenModal} 
            setIsOpenModal={setIsOpenModal} 
            modalItemList={modalItemList} 
            />
            <AlertModal
            alertModal={alertModal}
            setAlertModal={setAlertModal}
            setIsOpenModal={setIsOpenModal}
            content={"게시글을 삭제할까요?"}
            deleteBtn={deleteBtn}
            />
        </>
    );
}

export default ProfileSection;