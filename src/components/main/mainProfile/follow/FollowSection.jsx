import React from 'react';
import styled from 'styled-components';
import FollowCard from './FollowCard';
const FollowerContainer = styled.section`
    width: 24.375rem;
    padding: 1.5rem 1rem;
    margin: 0 auto;
    box-sizing: border-box;
`

function FollowSection() {
    return(
        <FollowerContainer>
            <FollowCard/>
        </FollowerContainer>
    )
}

export default FollowSection;