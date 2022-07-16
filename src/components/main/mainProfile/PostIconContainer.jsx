import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import likeBtn from '../../../assets/icon-heart-fill.png';
import likeBtnOutline from '../../../assets/icon-heart.png';
import commentBtn from '../../../assets/icon-message-circle.png';

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

const CommentBtn = styled.button`
    width: 1.25rem;
    height: 1.25rem;
    padding: 0;
    margin-left: 2.313rem;
    border-style: none;
    background-color: inherit;
    background-image: url(${commentBtn});
    background-size:  1.25rem  1.25rem;
    &:hover{
        cursor: pointer;
    }
`

function PostIconContainer(props) {
    const { like, comment, liked } = props;
    const [isLiked, setIsLiked] = useState(0);
    const [likeCount, setLikeCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);

    const handleLike = () => {
        setIsLiked(true);
        setLikeCount(current => current + 1);
    };

    const handleUnLike = () => {
        setIsLiked(false);
        setLikeCount(current => current - 1);
    };

    const history = useHistory();

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
            <CommentBtn onClick={() => {history.push({
                pathname: '/Post',
                // state: {displays: displays}
            })}}>
                {/* <CommentCount>{commentCount}</CommentCount> */}
            </CommentBtn>
        </PostIconWrapper>
    )
}

export default PostIconContainer;