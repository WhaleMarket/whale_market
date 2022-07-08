import React from 'react';
import styled from 'styled-components';
import ProfileForm from '../../profile/ProfileForm'

const ProfileEditContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.875rem 2.125rem 19.625rem;
`

function ProfileEditSection() {
    return (
        <ProfileEditContainer>
        <ProfileForm/>
        </ProfileEditContainer>
    )
}

export default ProfileEditSection;