import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ProfileSection from '../../components/profile/index';

function Profile({ userInfo }) {
    // 로그인 기록이 있으면 main/home으로 가는 기능
    const history = useHistory();
    useEffect(() => {
        if (window.localStorage.getItem('token') !== 'undefined' && window.localStorage.getItem('token')) {
            history.push('/main/home');
        }
    }, [history]);

    return (
        <>
            <ProfileSection userInfo={userInfo} />
        </>
    );
}

export default Profile;