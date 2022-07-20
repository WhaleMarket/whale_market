import React, { useState } from 'react';
import styled from 'styled-components';
import listIconOn from '../../../../assets/icon-post-list-on.png';
import listIconOff from '../../../../assets/icon-post-list-off.png';
import albumIconOn from '../../../../assets/icon-post-album-on.png';
import albumIconOff from '../../../../assets/icon-post-album-off.png';
import PostCard from './PostCard';

const ViewTypeNav = styled.nav`
    display: flex;
    justify-content: flex-end;
    height: 2.750rem;
    border-top: 0.5px solid #DBDBDB;
`

const ListIconBtn = styled.button`
    padding: 0;
    border-style: none;
    background-color: inherit;
    cursor: pointer;
`

const ListIcon = styled.img`
    width: 1.625rem;
    height: 1.625rem;
`

const AlbumIconBtn = styled.button`
    padding: 0;
    border-style: none;
    background-color: inherit;
    cursor: pointer;
`

const AlbumIcon = styled.img`
    width: 1.625rem;
    height: 1.625rem;
`

const PostContainer = styled.section`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    box-sizing: border-box;
`

function PostSection() {
    const [viewType, setviewType] = useState(true);

    return(
        <>
        <ViewTypeNav>
            <ListIconBtn onClick={() => {setviewType(true)}}>
                <ListIcon src={viewType ? listIconOn : listIconOff}/>
            </ListIconBtn>
            <AlbumIconBtn onClick={() => {setviewType(false)}}>
                <AlbumIcon src={viewType ? albumIconOff : albumIconOn}/>
            </AlbumIconBtn>
        </ViewTypeNav>
        <PostContainer>
            <PostCard/>
        </PostContainer>
        </>
    )
}

export default PostSection;