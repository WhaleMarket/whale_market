import React, {useState} from 'react';
import styled from 'styled-components';
import heart_icon from '../../../assets/icon-heart.png';
import heart_icon_fill from '../../../assets/icon-heart-fill.png';
import comment_icon from '../../../assets/icon-message-circle.png';

const IconWrapper = styled.div`
    display: flex;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    align-items: center;
    margin: 12px 0 16px;
`

const ActiveHeart = styled.button`
    background-color: inherit;
    margin-right: 6px;
    width: 20px;
    height: 20px;
    border: none;
    background: url(${heart_icon_fill}) no-repeat center / 20px 20px;
    &:hover{
        cursor: pointer;
    }
`

const InActiveHeart = styled.button`
    margin-right: 6px;
    background-color: inherit;
    width: 20px;
    height: 20px;
    border: none;
    padding: 0;
    background: url(${heart_icon}) no-repeat center / 20px 20px;
    color: #767676;
    &:hover{
        cursor: pointer;
    }
`

const HeartCount = styled.span`
    font-size: 12px;
    line-height: 20px;
    color: #767676;
`

const CommentBtn = styled.a`
    margin-right: 6px;
    background-color: inherit;
    display: inline-block;
    margin-left: 16px;
    width: 20px;
    height: 20px;
    border: none;
    background: url(${comment_icon}) no-repeat center / 20px 20px;
    &:hover{
        cursor: pointer;
    }
`

const CommentCount = styled.span`
    line-height: 20px;
    font-size: 12px;
    color: #767676;
`

function IconGroup({hearted, comment, heartCount}) {
    const [isLikeAction, setIsLikeAction] = useState(hearted);
    const [likeCount, setLikeCount] = useState(heartCount);

const disLike = () => {
    setIsLikeAction(false);
    setLikeCount(current => current - 1);
};

const Like = () => {
    setIsLikeAction(true);
    setLikeCount(current => current + 1);
}

    return (
        <IconWrapper>
            {isLikeAction? (
                <>
                    <ActiveHeart onClick={()=>disLike()}/>
                    <HeartCount>{likeCount}</HeartCount>
                </>
            ):(
                <>
                    <InActiveHeart onClick={()=>Like()}/>
                    <HeartCount>{likeCount}</HeartCount>
                </>
            )}
            
            <CommentBtn />
                <CommentCount>{comment}</CommentCount>
        </IconWrapper>
    )
}

export default IconGroup;
