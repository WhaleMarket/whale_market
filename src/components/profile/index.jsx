import React from 'react';
import styled from 'styled-components';
import ProfileTitle from './ProfileTitle';
import ProfileForm from './ProfileForm';
import StartButton from './StartButton';

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.875rem 2.125rem 19.625rem;
`

function ProfileSection() {
    return (
        <Section>
        <ProfileTitle/>
        <ProfileForm/>
        <StartButton/>
        </Section>
    );
}

export default ProfileSection;