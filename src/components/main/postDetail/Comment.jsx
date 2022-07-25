import React, { useState } from 'react';
import styled from 'styled-components';
import defaultImg from '../../../assets/basic-profile-img.png';
import ModalBtn from '../../modal/ModalBtn';

const CommentLi = styled.li`
    list-style: none;
    flex-direction: column;
    /* margin-bottom: 16px; */
    padding: 16px 16px 12px;
`
const ProfileWrapper = styled.div`
    display: flex;
    margin-bottom: 4px;
`

const ProfileImg = styled.img`
    min-width: 36px;
    min-height: 36px;
    border-radius: 50%;
    background: url(${defaultImg}) ;
    background-size: 36px 36px;
`
const UserName = styled.span`
    display: flex;
    width: 100%;
    margin-top: 4px;
    /* align-items: center; */
    margin-left: 12px;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    text-align: left;
`

const CommentContent = styled.p`
    font-size: 14px;
    font-weight: 400;
    /* line-height: 18px; */
    /* text-align: left; */
    margin-left: 48px;
`

function Comment() {
    // const [comment, setComment] = useState();
    return (
        <ul>
            <CommentLi>
                <ProfileWrapper>
                    <ProfileImg />
                    <UserName>서귀포시 무슨 농장</UserName>
                    <ModalBtn className="small" />
                </ProfileWrapper>
                <CommentContent>모달버튼 짱나..</CommentContent>
            </CommentLi>
        </ul>
    );
}

export default Comment;
