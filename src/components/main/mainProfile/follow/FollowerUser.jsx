import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import AuthContext from '../../../../context/AuthProvider';
import { API_URL } from '../../../../constants/defaultUrl';
import PostingContext from '../../../../context/PostingProvider';
import LoadingPage from '../../../../pages/LoadingPage';
import basicProfileImage from '../../../../assets/basic-profile-img.png';

const Wrapper = styled.li`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
`;

const StyledLink = styled(Link)`
    width: 50px;
    height: 50px;
`;

const UserImgDiv = styled.div`
    width: 50px;
    height: 50px;
    margin-left: 0;
    background-image: url(${(props) => props.src});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    border-radius: 50%;
`;

const FollowInfo = styled.div`
    margin-left: 10px;

    @media screen and (max-width: 390px) {
        width: 200px;
    }
`;

const FollowName = styled.strong`
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    color: #000000;
`;

const FollowIntro = styled.p`
    margin-top: 6px;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    width: 200px;
    line-height: 15px;
    color: #767676;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    height: 15px;

    @media screen and (max-width: 390px) {
        width: 120px;
    }
`;

const FollowButton = styled.button`
    width: 100px;
    padding: 10px 0;
    border-radius: 26px;
    font-size: 12px;
    vertical-align: baseline;
    margin-right: 16px;
    border: ${(props) => (props.follow ? 'solid 1px #dbdbdb' : 'none')};
    background-color: ${(props) => (props.follow ? '#ffffff' : '#00bcd4')};
    color: ${(props) => (props.follow ? '#515151' : '#ffffff')};
    &:hover {
        cursor: pointer;
    }

    @media screen and (max-width: 390px) {
        width: 100px;
    }
`;

const InfoWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-left: 16px;

    @media screen and (max-width: 390px) {
        width: 150px;
    }
`;

function FollowUser() {
    const [InfoState, setInfoState] = useContext(AuthContext);
    const [PostingState, setPostingState] = useContext(PostingContext);
    const [loading, setLoading] = useState(false);

    return (
        <>
            {PostingState.data[0].followeruser?.map((value, key) => {
                const useHandleFollow = () => {
                    async function fetchData() {
                        setLoading(true);
                        try {
                            const config = {
                                headers: {
                                    Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                                    'Content-type': 'application/json',
                                },
                            };
                            await axios.post(
                                `${API_URL}/profile/${value.accountname}/follow`,
                                {},
                                config
                            );

                            const Followerconfig = {
                                headers: {
                                    Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                                    'Content-type': 'application/json',
                                },
                            };
                            const Followerresponse = await axios.get(
                                `${API_URL}/profile/${PostingState.data[0].accountname}/follower`,
                                Followerconfig
                            );
                            setPostingState((PostingState) => {
                                PostingState.data[0] = {
                                    ...PostingState.data[0],
                                    followeruser: Followerresponse.data,
                                };
                                return { data: PostingState.data };
                            });

                            setInfoState((InfoState) => {
                                InfoState.MyInformations[2] = {
                                    ...InfoState.MyInformations[2],
                                    accountname: [],
                                    image: [],
                                };
                                return { MyInformations: InfoState.MyInformations };
                            });

                            setInfoState((InfoState) => {
                                InfoState.MyInformations[3] = {
                                    ...InfoState.MyInformations[3],
                                    id: [],
                                    username: [],
                                    accountname: [],
                                    content: [],
                                    image: [],
                                    heartCount: [],
                                    commentCount: [],
                                    hearted: [],
                                    updatedAt: [],
                                    createdAt: [],
                                };
                                return { MyInformations: InfoState.MyInformations };
                            });

                            // 팔로잉 정보
                            const FollowingConfig = {
                                headers: {
                                    Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                                    'Content-type': 'application/json',
                                },
                            };
                            const FollowingResponse = await axios.get(
                                `${API_URL}/profile/${InfoState.MyInformations[0].myAccountname}/following?limit=100&skip=0`,
                                FollowingConfig
                            );
                            FollowingResponse.data.map((value) => {
                                return setInfoState((InfoState) => {
                                    InfoState.MyInformations[2] = {
                                        ...InfoState.MyInformations[2],
                                        accountname: [
                                            ...InfoState.MyInformations[2].accountname,
                                            value.accountname,
                                        ],
                                        image: [
                                            ...InfoState.MyInformations[2].image,
                                            value.image,
                                        ],
                                    };
                                    return { MyInformations: InfoState.MyInformations };
                                });
                            });

                            const feedConfig = {
                                headers: {
                                    Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                                    'Content-type': 'application/json',
                                },
                            };
                            const feedResponse = await axios.get(
                                `${API_URL}/post/feed/?limit=100&skip=0`,
                                feedConfig
                            );
                            feedResponse.data.posts.map((value) => {
                                return setInfoState((InfoState) => {
                                    InfoState.MyInformations[3] = {
                                        ...InfoState.MyInformations[3],
                                        id: [...InfoState.MyInformations[3].id, value.id],
                                        username: [
                                            ...InfoState.MyInformations[3].username,
                                            value.author.username,
                                        ],
                                        accountname: [
                                            ...InfoState.MyInformations[3].accountname,
                                            value.author.accountname,
                                        ],
                                        content: [
                                            ...InfoState.MyInformations[3].content,
                                            value.content,
                                        ],
                                        image: [
                                            ...InfoState.MyInformations[3].image,
                                            value.image,
                                        ],
                                        heartCount: [
                                            ...InfoState.MyInformations[3].heartCount,
                                            value.heartCount,
                                        ],
                                        commentCount: [
                                            ...InfoState.MyInformations[3].commentCount,
                                            value.commentCount,
                                        ],
                                        hearted: [
                                            ...InfoState.MyInformations[3].hearted,
                                            value.hearted,
                                        ],
                                        updatedAt: [
                                            ...InfoState.MyInformations[3].updatedAt,
                                            value.updatedAt,
                                        ],
                                        createdAt: [
                                            ...InfoState.MyInformations[3].createdAt,
                                            value.createdAt,
                                        ],
                                    };
                                    return { MyInformations: InfoState.MyInformations };
                                });
                            });
                            setLoading(false);
                        } catch (error) {
                            console.error(error);
                        }
                    }
                    fetchData();
                };

                const useHandleUnfollow = () => {
                    async function fetchData() {
                        setLoading(true);
                        try {
                            const config = {
                                headers: {
                                    Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                                    'Content-type': 'application/json',
                                },
                            };
                            await axios.delete(
                                `${API_URL}/profile/${value.accountname}/unfollow`,
                                config
                            );

                            //follower 변경
                            const Followerconfig = {
                                headers: {
                                    Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                                    'Content-type': 'application/json',
                                },
                            };
                            const Followerresponse = await axios.get(
                                `${API_URL}/profile/${PostingState.data[0].accountname}/follower`,
                                Followerconfig
                            );
                            setPostingState((PostingState) => {
                                PostingState.data[0] = {
                                    ...PostingState.data[0],
                                    followeruser: Followerresponse.data,
                                };
                                return { data: PostingState.data };
                            });

                            setInfoState((InfoState) => {
                                InfoState.MyInformations[2] = {
                                    ...InfoState.MyInformations[2],
                                    accountname: [],
                                    image: [],
                                };
                                return { MyInformations: InfoState.MyInformations };
                            });

                            setInfoState((InfoState) => {
                                InfoState.MyInformations[3] = {
                                    ...InfoState.MyInformations[3],
                                    id: [],
                                    username: [],
                                    accountname: [],
                                    content: [],
                                    image: [],
                                    heartCount: [],
                                    commentCount: [],
                                    hearted: [],
                                    updatedAt: [],
                                    createdAt: [],
                                };
                                return { MyInformations: InfoState.MyInformations };
                            });

                            // 팔로잉 정보
                            const FollowingConfig = {
                                headers: {
                                    Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                                    'Content-type': 'application/json',
                                },
                            };
                            const FollowingResponse = await axios.get(
                                `${API_URL}/profile/${InfoState.MyInformations[0].myAccountname}/following?limit=100&skip=0`,
                                FollowingConfig
                            );
                            FollowingResponse.data.map((value) => {
                                return setInfoState((InfoState) => {
                                    InfoState.MyInformations[2] = {
                                        ...InfoState.MyInformations[2],
                                        accountname: [
                                            ...InfoState.MyInformations[2].accountname,
                                            value.accountname,
                                        ],
                                        image: [
                                            ...InfoState.MyInformations[2].image,
                                            value.image,
                                        ],
                                    };
                                    return { MyInformations: InfoState.MyInformations };
                                });
                            });

                            const feedConfig = {
                                headers: {
                                    Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                                    'Content-type': 'application/json',
                                },
                            };
                            const feedResponse = await axios.get(
                                `${API_URL}/post/feed/?limit=100&skip=0`,
                                feedConfig
                            );
                            feedResponse.data.posts.map((value) => {
                                return setInfoState((InfoState) => {
                                    InfoState.MyInformations[3] = {
                                        ...InfoState.MyInformations[3],
                                        id: [...InfoState.MyInformations[3].id, value.id],
                                        username: [
                                            ...InfoState.MyInformations[3].username,
                                            value.author.username,
                                        ],
                                        accountname: [
                                            ...InfoState.MyInformations[3].accountname,
                                            value.author.accountname,
                                        ],
                                        content: [
                                            ...InfoState.MyInformations[3].content,
                                            value.content,
                                        ],
                                        image: [
                                            ...InfoState.MyInformations[3].image,
                                            value.image,
                                        ],
                                        heartCount: [
                                            ...InfoState.MyInformations[3].heartCount,
                                            value.heartCount,
                                        ],
                                        commentCount: [
                                            ...InfoState.MyInformations[3].commentCount,
                                            value.commentCount,
                                        ],
                                        hearted: [
                                            ...InfoState.MyInformations[3].hearted,
                                            value.hearted,
                                        ],
                                        updatedAt: [
                                            ...InfoState.MyInformations[3].updatedAt,
                                            value.updatedAt,
                                        ],
                                        createdAt: [
                                            ...InfoState.MyInformations[3].createdAt,
                                            value.createdAt,
                                        ],
                                    };
                                    return { MyInformations: InfoState.MyInformations };
                                });
                            });
                            setLoading(false);
                        } catch (error) {
                            console.error(error);
                        }
                    }
                    fetchData();
                };
                return loading ? (
                    <LoadingPage key={key} />
                ) : (
                    <Wrapper key={key}>
                        <InfoWrapper>
                            <StyledLink to={'/profile/' + value.accountname}>
                                <UserImgDiv
                                    src={
                                        value.image?.includes(API_URL) &&
                                        value.image !== `${API_URL}/undefined`
                                            ? value.image
                                            : basicProfileImage
                                    }
                                />
                            </StyledLink>
                            <FollowInfo>
                                <FollowName>{value.username}</FollowName>
                                <FollowIntro>{value.intro}</FollowIntro>
                            </FollowInfo>
                        </InfoWrapper>

                        {value.accountname !==
                            InfoState.MyInformations[0].myAccountname && (
                            <FollowButton
                                type="button"
                                follow={value.isfollow}
                                onClick={
                                    value.isfollow
                                        ? useHandleUnfollow
                                        : useHandleFollow
                                }
                            >
                                {value.isfollow ? '팔로우 취소' : '팔로우'}
                            </FollowButton>
                        )}
                    </Wrapper>
                );
            })}
        </>
    );
}

export default FollowUser;
