import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext from '../../../../context/AuthProvider';
import PostingContext from '../../../../context/PostingProvider';
import { API_URL } from '../../../../constants/defaultUrl';
import styled from 'styled-components';
import listIconOn from '../../../../assets/icon-post-list-on.png';
import listIconOff from '../../../../assets/icon-post-list-off.png';
import albumIconOn from '../../../../assets/icon-post-album-on.png';
import albumIconOff from '../../../../assets/icon-post-album-off.png';
import PostCard from '../user_profile/PostCard';
import LoadingPage from '../../../../pages/LoadingPage';
import whale from '../../../../assets/Logo.png';
import { WhaleLaughEvent } from '../../../../theme/whaleEvent';
import AlbumReward from './AlbumReward';

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
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-rows: 25px 120px 1fr;
    gap: 8px;
    width: 600px;
    height: 600px;
    padding-bottom: 70px;
    margin: 16px auto;
    place-items: center;
`;

const AlbumImg = styled.img`
    grid-area: 3/1/4/5;
    width: ${(props) => `${5 + props.Eaten}%`};
    object-fit: cover;
    &.eat {
        animation: ${WhaleLaughEvent} 1s ease-in-out;
    }
`;

const Whaleget = styled.p`
    grid-area: 1/1/2/5;
    padding-bottom: 16px;
`;

const Highlight = styled.strong`
    font-size: 20px;
    color: #00bcd4;
`;

function PostSection({ List }) {
    const [viewType, setviewType] = useState(true);
    const [InfoState] = useContext(AuthContext);
    const [PostingState, setPostingState] = useContext(PostingContext);
    const [loading, setLoading] = useState(false);
    const [eat, setEat] = useState(false);
    const [eaten, setEaten] = useState([0]);

    async function getPost() {
        setLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                    'Content-type': 'application/json',
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

    const confirmList = List.slice(0, 4);
    const deleteList = List.slice(4);

    async function acquiredFeed() {
        try {
            let getFeed = [];
            confirmList.map(async (value) => {
                const feedres = await axios.get(
                    `${API_URL}/post/${value.id}/comments`,
                    {
                        headers: {
                            Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                            'Content-type': 'application/json',
                        },
                    }
                );
                let feed = 0;
                feed += feedres.data.comments.filter((value) => {
                    return (
                        value.author.accountname ===
                        InfoState.MyInformations[0].myAccountname
                    );
                }).length;
                getFeed = [...getFeed, feed];
                setEaten(getFeed);
            });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        acquiredFeed();
    }, [viewType]);

    if (PostingState.data[0].postdata.length > 0) {
        return loading ? (
            <LoadingPage />
        ) : (
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
                        <AlbumIcon
                            src={viewType ? albumIconOff : albumIconOn}
                        />
                    </AlbumIconBtn>
                </ViewTypeNav>
                {viewType ? (
                    <PostContainer>
                        <PostCard />
                    </PostContainer>
                ) : (
                    <AlbumContainer>
                        <Whaleget>
                            고래에게 <Highlight>먹이</Highlight>를 주세요!
                            고래가 <Highlight>행복</Highlight>해 하는 모습을 볼
                            수 있어요!
                        </Whaleget>
                        {deleteList.map((value, key) => {
                            return (
                                <AlbumReward
                                    key={key}
                                    post={value}
                                    changePost={confirmList[key]}
                                    setEat={setEat}
                                    acquiredFeed={acquiredFeed}
                                />
                            );
                        })}
                        <AlbumImg
                            Eaten={eaten?.reduce((a, b) => a + b) * 5}
                            className={`${eat ? 'eat' : ''}`}
                            src={whale}
                            onAnimationEnd={() => {
                                setEat(false);
                            }}
                        />
                    </AlbumContainer>
                )}
            </>
        );
    }
}
export default PostSection;
