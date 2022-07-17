import React from 'react';
import styled from 'styled-components';
import PostCard from './PostCard';

const PostContainer = styled.section`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border-top: 1px solid #DBDBDB;
    box-sizing: border-box;
`

function PostSection() {
    return(
        <PostContainer>
            <PostCard/>
        </PostContainer>
    )
}

export default PostSection;