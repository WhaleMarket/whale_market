import React from 'react';
import styled from 'styled-components';
import PostIconContainer from './PostIconContainer';
import profileImg from '../../../../assets/basic-profile-img.png';
import menubtn from '../../../../assets/s-icon-more-vertical.png';
import postImg from '../../../../assets/postImg.png'

const PostWrapper = styled.div`
    width: 24.375rem;
    margin: 0  auto 3.750rem auto;
`

const PostInfo = styled.div`
    display: flex;
    position: relative;
    padding: 1rem 1rem;
`

const PostInfoImg = styled.img`
    width: 2.625rem;
    height: 2.625rem;
`

const PostInfoUser = styled.div`
    margin-left: 0.750rem;
    padding-top: 0.25rem;
`

const PostInfoName = styled.strong`
    font-size: 0.875rem;
    font-weight: 500;
`

const PostMenuBtn = styled.button`
    position: absolute;
    top: 1.5rem;
    right: 0;
    width: 1.125rem;
    height: 1.125rem;
    border: none;
    background-color: inherit;
    background-image: url(${menubtn});
    background-size:  1.125rem  1.125rem;
    &:hover{
        cursor: pointer;
    }
`

const PostInfoId = styled.p` 
    margin-top: 2px;
    font-size: 0.75rem;
    color: #767676;
`  
const PostContent = styled.div`
    margin-left: 3.375rem;
    padding-left: 0.75rem;
`

const PostTxt = styled.p`
    margin-bottom: 1rem;
    font-size: 0.875rem;
    line-height: 1.125rem;
`

const PostImgWrapper = styled.div`
`
const PostImg = styled.img`
    width: 19rem;
    margin-bottom: 0.750rem;
`

const PostDate = styled.p`
    margin-top: 1rem;
    color: #767676;
    font-size: 0.625em;
`

function PostCard() {

    return(
        <>
        <PostWrapper>
            <PostInfo>
                <PostInfoImg src={profileImg}/>
                <PostInfoUser>
                    <PostInfoName>김웨일</PostInfoName>
                    <PostInfoId>@sosoheehee_whale</PostInfoId>
                    <PostMenuBtn/>
                </PostInfoUser>
            </PostInfo>
            <PostContent>
                <PostTxt>반짝이는 방황하여도, 간에 속에서 없으면, 고동을 모래뿐일 풀이 있는 황금시대다. 소담스러운 가슴에 그것은 인생을 뜨고, 돋고, 찬미를 같으며, 것이다. 청춘의 어디 인생에 스며들어 우리 바이며, 이상의 얼음 것은 것이다.</PostTxt>
                <PostImgWrapper>
                    <PostImg src={postImg}/>
                </PostImgWrapper>
            <PostIconContainer/>
            <PostDate>2022년 07월 15일</PostDate>
            </PostContent>
        </PostWrapper>
        </>
    )
}

export default PostCard;