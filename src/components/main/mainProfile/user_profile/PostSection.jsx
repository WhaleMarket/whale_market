import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import listIconOn from '../../../../assets/icon-post-list-on.png';
import listIconOff from '../../../../assets/icon-post-list-off.png';
import albumIconOn from '../../../../assets/icon-post-album-on.png';
import albumIconOff from '../../../../assets/icon-post-album-off.png';
import PostCard from './PostCard';
import postImg from '../../../../assets/postImg.png';

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
    box-sizing: border-box;
`

const AlbumContainer = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: 1fr;
    gap: 8px;
    width: 24.375rem;
    margin: 16px auto;
`

const AlbumCard = styled.div`
    text-align: center;
    cursor: pointer;
`

const AlbumImg = styled.img`
    width: 114px;
    height: 114px;
    object-fit: cover;
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
        {viewType ? (
            <PostContainer>
                <PostCard/>
            </PostContainer>
        ) : (
            <AlbumContainer>
                <AlbumCard>
                    <Link to = '/'>
                        <AlbumImg src={postImg}/>
                    </Link>
                </AlbumCard>
            </AlbumContainer>
        )}
        </>
    )
}

export default PostSection;