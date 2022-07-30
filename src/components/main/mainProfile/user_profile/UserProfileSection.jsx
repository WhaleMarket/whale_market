import React from 'react';
import styled from 'styled-components';
import UserProfileCard from '../user_profile/UserProfileContents';

const ProfileContainer = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-bottom: 0.5px solid #dbdbdb;
    box-sizing: border-box;
`;

function UserProfileSection() {
    return (
        <ProfileContainer>
            <UserProfileCard />
        </ProfileContainer>
    );
}

export default UserProfileSection;
