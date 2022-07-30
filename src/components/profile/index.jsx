import React from 'react';
import styled from 'styled-components';
import ProfileTitle from './ProfileTitle';
import ProfileForm from './ProfileForm';

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 34px 314px;
    box-sizing: border-box;
`;

function ProfileSection() {
    return (
        <Section>
            <ProfileTitle />
            <ProfileForm />
        </Section>
    );
}

export default ProfileSection;
