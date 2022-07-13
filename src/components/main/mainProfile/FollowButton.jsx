import React from 'react';
import styled from 'styled-components';

const FollowBtn = styled.button`
    padding: 0.5rem 2.5rem;
    border-style: none;
    border-radius: 1.875rem;
    background-color: #00BCD4;
    color: #fff;
    font-size: 0.875em;
    font-weight: 500;
    cursor: pointer;
`

const UnFollowBtn = styled.button`
    padding: 0.5rem 2.125rem;
    border: 0.063rem solid #DBDBDB;
    border-radius: 1.875rem;
    background-color: #fff;
    color: #767676;
    font-size: 0.875em;
    font-weight: 500;
    cursor: pointer;
`

function FollowButton() {
    if (window.location.pathname === '/mainprofile') return null;

    return(
        <>
        <FollowBtn type="submit">
            팔로우
        </FollowBtn>
        <UnFollowBtn type="submit">
            언팔로우
        </UnFollowBtn>
        </>
    )
}

export default FollowButton;