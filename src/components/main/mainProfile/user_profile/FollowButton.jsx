import React, { useState } from 'react';
import styled from 'styled-components';

const FollowBtn = styled.button`
    padding: 8px 40px 8px 41px;
    border-style: none;
    border-radius: 1.875rem;
    background-color: #00BCD4;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
`

const UnFollowBtn = styled.button`
    padding: 7px 33px;
    border: 0.063rem solid #DBDBDB;
    border-radius: 1.875rem;
    background-color: #fff;
    color: #767676;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
`

function FollowButton() {
    const [isFollowed, setisFollowed] = useState(0);
    const handleFollowBtn = () => {
        setisFollowed(true);
    };

    const handleUnFollowBtn = () => {
        setisFollowed(false);
    };

    return(
        <>
        {isFollowed ? (
            <FollowBtn type="submit" onClick={handleUnFollowBtn}>팔로우</FollowBtn>
        ) : (
            <UnFollowBtn type="submit" onClick={handleFollowBtn}>언팔로우</UnFollowBtn>
        )}
        </>
    )
}

export default FollowButton;