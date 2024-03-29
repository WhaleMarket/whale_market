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
            } catch (error) {
                console.error(error);
            }
        }
        InfoState.MyInformations[0].token && getTokenIsValid();
        tokenIsValid && getAccountname();
    }, [InfoState.MyInformations, setInfoState, tokenIsValid]);
}
