import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { JoinForm } from '../../components/join/JoinForm';
import Profile from './Profile';

const Join = (props) => {
    const [nextPage, setNextPage] = useState(true);
    const [userInfo, setUserInfo] = useState({ email: '', password: '' });
    const history = useHistory();

    // 로컬스토리지에 토큰이 있으면 회원가입 페이지는 메인/홈으로 스킵하는 기능
    useEffect(() => {
        if (window.localStorage.getItem('token')) {
            history.push('/main/home');
        }
    }, [history]);

    return (
        <>
            {nextPage ? (
                <JoinForm setNextPage={setNextPage} setUserInfo={setUserInfo} />
                ) : (
                <Profile userInfo={userInfo} />
            )}
        </>
    );
}

export default Join;
