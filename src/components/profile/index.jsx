import React from 'react';
import styled from 'styled-components';
import ProfileTitle from './ProfileTitle';
import ProfileForm from './ProfileForm';

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.875rem 2.125rem 19.625rem;
    box-sizing: border-box;
`

function ProfileSection({ userInfo }) {
    return (
        <Section>
        <ProfileTitle />
        <ProfileForm userInfo={userInfo} />
        </Section>
    );
}

export default ProfileSection;