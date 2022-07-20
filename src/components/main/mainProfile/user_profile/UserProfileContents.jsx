import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import basicProfileImg from '../../../../assets/basic-profile-img.png';
import messageIcon from '../../../../assets/icon-message-circle.png';
import shareIcon from '../../../../assets/icon-share.png';
import FollowButton from './FollowButton';

const UserProfileContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    width: 24.375rem;
    padding: 1.875rem 3.438rem 1.625rem;
    margin: 3rem auto 0 auto;
    box-sizing: border-box;
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

const UserIntro = styled.span`
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

const IconWrapper = styled.div`
    display: flex;
    gap: 10px;
`

const MessageButton = styled(Link)`
    width: 34px;
    height: 34px;
    border: 1px solid #DBDBDB;
    border-radius: 30px;
    background-image: url(${messageIcon});
    background-position: center center;
    background-size: 20px 20px;
    background-repeat: no-repeat;
`

const ShareButton = styled.button`
    width: 34px;
    height: 34px;
    border: 1px solid #DBDBDB;
    border-radius: 30px;
    background-color: inherit;
    background-image: url(${shareIcon});
    background-position: center center;
    background-size: 20px 20px;
    background-repeat: no-repeat;
    cursor: pointer;
`

function UserProfileCard(props) {
    const {username, userid, userintroduction, followers, followerCount, followingCount} = props;

    return ( 
        <>    
        <UserProfileContainer>
            <ProfileImg src={basicProfileImg} alt="프로필 이미지"/>
            <UserName>{username}</UserName>
            <UserId>{userid}</UserId>
            <UserIntro>{userintroduction}</UserIntro>
            <Followers to = '/followers'>
                <FollowCount>{followerCount}</FollowCount>
                <FollowTxt>followers</FollowTxt>
            </Followers>
            <Followings>
                <FollowCount>{followingCount}</FollowCount>
                <FollowTxt>followings</FollowTxt>
            </Followings>
            <IconWrapper>
            <MessageButton to = '/Chatting'/>
            <FollowButton/>
            <ShareButton/>
            </IconWrapper>
        </UserProfileContainer>
        </>    
    )
}

export default UserProfileCard;