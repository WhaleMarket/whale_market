import React from 'react';
import styled from 'styled-components';
import defaultImg from '../../../assets/basic-profile-img.png';
import moreBtn from '../../../assets/icon-more-vertical.png';

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
    /* background: url(${defaultImg}) ; // 수정 */
    /* background-size: 42px 42px; // 수정 */
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

const MoreBtn = styled.button`
    margin-top: 4px;
    width: 18px;
    height: 21px; // 이미지 파일 변경후 18px로 변경 필요
    border: none;
    background-color: inherit;
    background-image: url(${moreBtn});
    &:hover{
        cursor: pointer;
    }
`

function FeedProfile({profileImg, username, accountname}) {
    return (
        <ProfileContainer>
            <ProfileDiv>
            <ProfileImg src={profileImg || defaultImg} alt="프로필 이미지"/>
                <UserInfoWrapper>
                    <UserName>{username}</UserName>
                    <UserId>{accountname}</UserId>
                </UserInfoWrapper>
            </ProfileDiv>
            <MoreBtn />
        </ProfileContainer>
    );
}

export default FeedProfile;