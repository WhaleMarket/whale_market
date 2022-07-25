import React from 'react';
import CommentInput from './CommentInput';
import styled from 'styled-components';
import defaultImg from '../../../assets/basic-profile-img.png'
import Comment from './Comment';

const LayOut = styled.div`
    display: flex;
    flex-direction: column;
`

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    /* padding: 10px 4px 10px 16px; */
    padding: 10px 4px 0 16px;
    /* border-bottom: 0.5px solid #BDBDBD; */
`

const UserProfile = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 15px ;
    background: url(${defaultImg}) ;
    background-size: 36px 36px;
`

const UserAccount = styled.span`
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
`

const Wrapper = styled.div`
    height: 100%;
`

const TextContent = styled.p`
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
    padding: 16px;
`

const CommentWrapper = styled.div`
    border-top: 0.5px solid #BDBDBD;
    overflow: auto;
`

function PostContent() {
    return (
        <LayOut>
            <UserInfo>
                <UserProfile />
                <UserAccount>감귤러버</UserAccount>
            </UserInfo>
            <Wrapper>
                <TextContent>안녕하세요. 사진이 너무 멋있어요. 한라봉 언제 먹을 수 있나요? 기다리기 지쳤어요 땡뻘땡뻘...</TextContent>
                <CommentWrapper>
                    <Comment/>
                    <Comment/>
                    {/* <Comment/>
                    <Comment/> */}

                </CommentWrapper>
            </Wrapper>
            
            <CommentInput />
        </LayOut>
    );
}

export default PostContent;
