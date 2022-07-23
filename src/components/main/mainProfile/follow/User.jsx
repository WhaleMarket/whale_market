import React, { useState, useContext, useRef, useEffect } from 'react'
import AuthContext from '../../../../context/AuthProvider';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UserFollowButton from './UserFollowButton';

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const StyledLink = styled(Link)`
    width: 50px;
    height: 50px;
`

const UserImgDiv = styled.div`
    width: 50px;
    height: 50px;
    margin-left: 0;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative; 
    border-radius: 50%;
`

const FollowInfo = styled.div`
    width: calc(100% - 130px);
`

const FollowName = styled.strong`
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    color: #000000;
`

const FollowIntro = styled.p`
    margin-top: 6px;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #767676;
`

function User({ accountname, username, image, intro, isfollow }) {
    const { myAccountname } = useContext(AuthContext);
    const [user, setUser] = useState({
        accountname: accountname,
        username: username,
        image: image,
        intro: intro,
        isfollow: isfollow,
    });

    // user = 나를 팔로우 하는 사용자의 accountname 등 정보
    console.log(user);

    const userImgRef = useRef();
    useEffect(() => {
        userImgRef.current.style.backgroundImage = `url(${user.image})`;
    });

    return (
        <>
            <Wrapper>
                <StyledLink to={"/" + accountname}>
                    <UserImgDiv ref={userImgRef} />
                </StyledLink>
                <FollowInfo>
                    <FollowName>{username}</FollowName>
                    <FollowIntro>{intro}</FollowIntro>
                </FollowInfo>

                <UserFollowButton 
                    text={user.isfollow ? '취소' : '팔로우'}
                    user={user}
                    setUser={setUser}
                />

            </Wrapper>
        </>
    );
}

export default User;