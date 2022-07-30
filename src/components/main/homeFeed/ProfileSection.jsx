import React, { useContext, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import defaultImg from '../../../assets/basic-profile-img.png';
import ModalBtn from '../../modal/ModalBtn';
import Modal from '../../modal/Modal';
import AlertModal from '../../modal/AlertModal';
import AuthContext from '../../../context/AuthProvider';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../constants/defaultUrl';

const ProfileContainer = styled.section`
    display: flex;
    justify-content: space-between;
    padding: 16px 0;
`;

const ProfileDiv = styled.div`
    display: flex;
    justify-content: space-around;
`;

const ProfileImg = styled.img`
    overflow: hidden;
    object-fit: cover;
    width: 42px;
    height: 42px;
    margin-right: 12px;
    border: 0.5px solid #dbdbdb;
    border-radius: 50%;
    background: url(${defaultImg});
`;

const UserInfoWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const UserName = styled.span`
    margin: 4px 0 2px;
    color: #000000;
    font-size: 14px;
    font-weight: 500;
    line-height: 17.53px;
`;

const UserId = styled.span`
    color: #767676;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
`;

function ProfileSection({ username, accountname, src, postId }) {
    const [InfoState] = useContext(AuthContext);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [alertModal, setAlertModal] = useState(false);
    const [targetPost, setTargetPost] = useState('');

    const modalItemList = [
        {
            content: '신고',
            onClick: () => {
                setAlertModal(true);
            },
        },
    ];

    const deleteBtn = {
        content: '신고',
        onClick: () => {
            reportPost(targetPost);
        },
    };

    const reportPost = async (id) => {
        try {
            const reportConfig = {
                headers: {
                    Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                    'Content-type': 'application/json',
                },
            };
            await axios.post(`${API_URL}/post/${id}/report`, {}, reportConfig);
            if (prompt('신고 사유를 적어주세요.') !== '') {
                alert('신고 되었습니다.');
            }
        } catch (error) {
            console.error(error);
            alert('error');
        }
    };

    return (
        <>
            <ProfileContainer>
                <ProfileDiv>
                    <Link to={`/profile/${accountname}`}>
                        <ProfileImg
                            src={src || defaultImg}
                            alt="프로필 이미지"
                        />
                    </Link>
                    <UserInfoWrapper>
                        <UserName>{username}</UserName>
                        <UserId>@{accountname}</UserId>
                    </UserInfoWrapper>
                </ProfileDiv>
                <ModalBtn
                    className="small"
                    onClick={() => {
                        setIsOpenModal(!isOpenModal);
                        setTargetPost(postId);
                    }}
                />
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
                content={'게시글을 신고하시겠어요?'}
                deleteBtn={deleteBtn}
            />
        </>
    );
}

export default ProfileSection;
