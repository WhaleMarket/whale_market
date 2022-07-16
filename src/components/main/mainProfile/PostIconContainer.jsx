import React, { useState } from 'react';
import styled from 'styled-components';
import likeBtn from '../../../assets/icon-heart-fill.png';
import likeBtnOutline from '../../../assets/icon-heart.png';

const PostIconWrapper = styled.div`
    display: flex;
`

const LikeBtn = styled.button`
    width: 1.25rem;
    height: 1.25rem;
    padding: 0;
    border-style: none;
    background-color: inherit;
    background-image: url(${likeBtn});
    background-size:  1.25rem  1.25rem;
    &:hover{
        cursor: pointer;
    }
`

const LikeBtnOutline =styled.button`
    width: 1.25rem;
    height: 1.25rem;
    padding: 0;
    border-style: none;
    background-color: inherit;
    background-image: url(${likeBtnOutline});
    background-size:  1.25rem  1.25rem;
    &:hover{
        cursor: pointer;
    }
`

const LikeCount = styled.p`
    margin-left: 1.625rem;
    color: #767676;
    font-size: 0.75rem;
`

function PostIconContainer(props) {
    const { like, comment, liked } = props;
    const [isLiked, setIsLiked] = useState(0);
    const [likeCount, setLikeCount] = useState(0);

    const handleLike = () => {
        setIsLiked(true);
        setLikeCount(current => current + 1);
    };

    const handleUnLike = () => {
        setIsLiked(false);
        setLikeCount(current => current - 1);
    };

    return(
        <PostIconWrapper>
            {isLiked ? (
                <LikeBtn onClick={handleUnLike}>
                    <LikeCount>{likeCount}</LikeCount>
                </LikeBtn>
            ) : (
                <LikeBtnOutline onClick={handleLike}>
                    <LikeCount>{likeCount}</LikeCount>
                </LikeBtnOutline>
            )}
        </PostIconWrapper>
    )
}

export default PostIconContainer;