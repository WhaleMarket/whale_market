import React from 'react';
import styled from 'styled-components';
import ProfileForm from '../../profile/ProfileForm';

const ProfileEditContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
`

function ProfileEditSection() {
    return (
        <ProfileEditContainer>
        <ProfileForm/>
        </ProfileEditContainer>
    )
}

export default ProfileEditSection;