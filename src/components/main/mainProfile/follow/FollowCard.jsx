import React from 'react';
import styled from 'styled-components';
import profileImg from '../../../../assets/basic-profile-img.png';

const FollowWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`

const FollowProfileImg = styled.img`
    width: 3.125rem;
    height: 3.125rem;
`

const FollowInfo = styled.div`
    display: block;
    margin-left: 0.750rem;
`

const FollowName = styled.strong`
    font-size: 0.875rem;
    font-weight: 500;
`

const FollowIntro = styled.p`
    margin-top: 6px;
    font-size: 0.750rem;
    color: #767676;
`

const FollowBtn = styled.button`
    position: absolute;
    right: 0;
    padding: 0.438rem 0.688rem;
    border-radius: 1.625rem;
    border-style: none;
    background-color: #00BCD4;
    font-size: 0.75rem;
    color: #fff;
`

function FollowCard() {
    return(
        <FollowWrapper>
            <FollowProfileImg src={profileImg}/>
            <FollowInfo>
                <FollowName>박웨일</FollowName>
                <FollowIntro>I love Whale Market!</FollowIntro>
            </FollowInfo>
            <FollowBtn>팔로우</FollowBtn>
        </FollowWrapper>
    )
}
export default FollowCard;