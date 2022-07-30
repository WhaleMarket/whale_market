import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import { API_URL } from '../constants/defaultUrl';

export default function useAccountInfo() {
    const [InfoState, setInfoState] = useContext(AuthContext);
    const [tokenIsValid, setTokenIsValid] = useState();

    useEffect(() => {
        // 토큰 검증
        async function getTokenIsValid() {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                        'Content-type': 'application/json',
                    },
                };
                const response = await axios.get(
                    `${API_URL}/user/checktoken`,
                    config
                );
                setTokenIsValid(response?.data?.isValid);
            } catch (error) {
                console.error(error);
            }
        }

        // Information 받아오기
        async function getAccountname() {
            try {
                //login 정보
                const config = {
                    headers: {
                        Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
                        'Content-type': 'application/json',
                    },
                };
                const response = await axios.get(
                    `${API_URL}/user/myinfo`,
                    config
                );
                setInfoState((InfoState) => {
                    InfoState.MyInformations[0] = {
                        ...InfoState.MyInformations[0],
                        myImage: response.data.user.image,
                        myUsername: response.data.user.username,
                        myAccountname: response.data.user.accountname,
                        myIntro: response.data.user.intro,
                        myFollowerCount: response.data.user.followerCount,
                        myFollowingCount: response.data.user.followingCount,
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
                        InfoState.MyInformations[4] = {
                            ...InfoState.MyInformations[4],
                            accountname: [
                                ...InfoState.MyInformations[4].accountname,
                                value.accountname,
                            ],
                            image: [
                                ...InfoState.MyInformations[4].image,
                                value.image,
                            ],
                        };
                        return { MyInformations: InfoState.MyInformations };
                    });
                });

                //피드 정보
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
                        InfoState.MyInformations[5] = {
                            ...InfoState.MyInformations[5],
                            id: [...InfoState.MyInformations[5].id, value.id],
                            username: [
                                ...InfoState.MyInformations[5].username,
                                value.author.username,
                            ],
                            accountname: [
                                ...InfoState.MyInformations[5].accountname,
                                value.author.accountname,
                            ],
                            content: [
                                ...InfoState.MyInformations[5].content,
                                value.content,
                            ],
                            image: [
                                ...InfoState.MyInformations[5].image,
                                value.image,
                            ],
                            heartCount: [
                                ...InfoState.MyInformations[5].heartCount,
                                value.heartCount,
                            ],
                            commentCount: [
                                ...InfoState.MyInformations[5].commentCount,
                                value.commentCount,
                            ],
                            hearted: [
                                ...InfoState.MyInformations[5].hearted,
                                value.hearted,
                            ],
                            updatedAt: [
                                ...InfoState.MyInformations[5].updatedAt,
                                value.updatedAt,
                            ],
                            createdAt: [
                                ...InfoState.MyInformations[5].createdAt,
                                value.createdAt,
                            ],
                        };
                        return { MyInformations: InfoState.MyInformations };
                    });
                });
            } catch (error) {
                console.error(error);
            }
        }
        InfoState.MyInformations[0].token && getTokenIsValid();
        tokenIsValid && getAccountname();
    }, [InfoState.MyInformations, setInfoState, tokenIsValid]);
}
