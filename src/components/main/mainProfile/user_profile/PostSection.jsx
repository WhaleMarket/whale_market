import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import listIconOn from "../../../../assets/icon-post-list-on.png";
import listIconOff from "../../../../assets/icon-post-list-off.png";
import albumIconOn from "../../../../assets/icon-post-album-on.png";
import albumIconOff from "../../../../assets/icon-post-album-off.png";
import PostCard from "./PostCard";
import AuthContext from "../../../../context/AuthProvider";
import { API_URL } from "../../../../constants/defaultUrl";
import axios from "axios";
import PostingContext from "../../../../context/PostingProvider";
import LoadingPage from "../../../../pages/LoadingPage";
import whale from '../../../../assets/Logo.png';

const ViewTypeNav = styled.nav`
  display: flex;
  justify-content: flex-end;
  height: 60px;
  padding-right: 20px;
  border-top: 0.5px solid #dbdbdb;

`;

const ListIconBtn = styled.button`
  padding: 0;
  border-style: none;
  background-color: inherit;
  cursor: pointer;
`;

const ListIcon = styled.img`
  width: 26px;
  height: 26px;
`;

const AlbumIconBtn = styled.button`
  padding: 0;
  border-style: none;
  background-color: inherit;
  cursor: pointer;
`;

const AlbumIcon = styled.img`
  width: 26px;
  height: 26px;
`;

const PostContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px;
  box-sizing: border-box;
`;

const AlbumContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-auto-rows: 1fr 1fr 1fr 1fr;
  gap: 8px;
  width: 600px;
  padding-bottom: 70px;
  margin: 16px auto;
`;

const AlbumReward = styled.div`
`

const AlbumImg = styled.img`
    grid-area: 1/2/5/3;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

function PostSection() {
  const [viewType, setviewType] = useState(true);
  const [InfoState] = useContext(AuthContext);
  const [PostingState, setPostingState] = useContext(PostingContext);
  const [loading, setLoading] = useState(false);

  async function getPost() {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
          "Content-type": "application/json",
        },
      };
      const response = await axios.get(
        `${API_URL}/post/${PostingState.data[0].user.accountname}/userpost/?limit=100&skip=0`,
        config
      );
      setPostingState((PostingState) => {
        PostingState.data[0] = {
          ...PostingState.data[0],
          postdata: response.data.post,
        };
        return { data: PostingState.data };
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    PostingState.data[0].user.accountname && getPost();
  }, [PostingState.data[0].user.accountname]);

  if (PostingState.data[0].postdata.length > 0) {
    return (
        loading ? <LoadingPage /> :
      <>
        <ViewTypeNav>
          <ListIconBtn
            onClick={() => {
              setviewType(true);
            }}
          >
            <ListIcon src={viewType ? listIconOn : listIconOff} />
          </ListIconBtn>
          <AlbumIconBtn
            onClick={() => {
              setviewType(false);
            }}
          >
            <AlbumIcon src={viewType ? albumIconOff : albumIconOn} />
          </AlbumIconBtn>
        </ViewTypeNav>
        {viewType ? (
          <PostContainer>
            <PostCard />
          </PostContainer>
        ) : (
          <AlbumContainer>
            <AlbumReward/>
            <AlbumImg src={whale} />
          </AlbumContainer>
        )}
      </>
    );
  }
}
export default PostSection;
