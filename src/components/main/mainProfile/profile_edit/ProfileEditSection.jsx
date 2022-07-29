import React from 'react';
import styled from 'styled-components';
import ProfileEditForm from '../profile_edit/ProfileEditForm';

const ProfileEditContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
`

function ProfileEditSection() {
    return (
        <ProfileEditContainer>
        <ProfileEditForm/>
        </ProfileEditContainer>
    )
}

export default ProfileEditSection;