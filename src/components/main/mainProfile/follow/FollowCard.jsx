import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import profileImg from '../../../../assets/basic-profile-img.png';

import AuthContext from '../../../../context/AuthProvider';
import { API_URL } from '../../../../constants/defaultUrl';
import axios from 'axios';
import UserList from './UserList';

const FollowWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
`

function FollowCard() {
    // 희: 팔로워 리스트 불러오기
    const { token, myAccountname } = useContext(AuthContext);
    const [followerList, setFollowerList] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        async function getFollowerList() {
            try {
                const config = {
                    headers: {
                        "Authorization" : `Bearer ${token}`,
                        "Content-type" : "application/json"
                    },
                };
                const response = await axios.get(
                    `${API_URL}/profile/${myAccountname}/follower`,
                    config
                );
                // console.log(JSON.stringify(response.data));
                setFollowerList(response.data);
                setShow(true);
            } catch (error) {
                console.error(error);
                setShow(false);
            }
        }
        token && getFollowerList();
    }, [token, myAccountname]);
    return(
        <FollowWrapper>
            {show && (
                <>
                    <UserList followerList={followerList} />
                </>
            )}
        </FollowWrapper>
    )
}
export default FollowCard;