import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import basicProfileImg from '../../../assets/basic-profile-img.png';

const UserProfileContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    width: 24.375rem;
    padding: 1.875rem 3.438rem 1.625rem;
    margin: 0 auto;
`

const ProfileImg = styled.img`
    width: 6.875rem;
`

const UserName = styled.h1`
    font-weight: 700;
    margin: 1rem 0 0.375rem 0;
`

const UserId = styled.span`
    color: #767676;
    font-size: 0.750rem;
`

const UserInfoMsg = styled.span`
    margin: 1rem 0 1.5rem;
    color: #767676;
    font-size: 0.750rem;
`

const Followers = styled(Link)`
    position: absolute;
    left: 3.5rem;
    top: 4.063rem;
    text-align: center;
    text-decoration: none;
`

const FollowCount = styled.span`
    display: block;
    color: #000000;
    font-size: 1.125rem;
    font-weight: 700;
`

const FollowTxt = styled.span`
    color: #767676;
    font-size: 0.625rem;
`

const Followings = styled(Link)`
    position: absolute;
    right: 3.5rem;
    top: 4.063rem;
    text-align: center;
    text-decoration-line: none;
`

function UserProfileCard() {

    return ( 
        <>    
        <UserProfileContainer>
            <ProfileImg src={basicProfileImg} alt="프로필 이미지"/>
            <UserName>김웨일</UserName>
            <UserId>@weniv_Whale</UserId>
            <UserInfoMsg>안녕하세요, 김웨일입니다.</UserInfoMsg>
            <Followers>
                <FollowCount>2950</FollowCount>
                <FollowTxt>followers</FollowTxt>
            </Followers>
            <Followings>
                <FollowCount>128</FollowCount>
                <FollowTxt>followings</FollowTxt>
            </Followings>
        </UserProfileContainer>
        </>    
    )
}

export default UserProfileCard;