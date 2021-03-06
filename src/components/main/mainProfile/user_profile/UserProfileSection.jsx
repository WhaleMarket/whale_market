import React from 'react';
import styled from 'styled-components';
import UserProfileCard from './UserProfileContents';


const ProfileContainer = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-bottom: 0.031rem solid #DBDBDB;
    box-sizing: border-box;
`

function UserProfileSection() {
    return (
        <ProfileContainer>
            <UserProfileCard/>
        </ProfileContainer>
    )
}

export default UserProfileSection;
