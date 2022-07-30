import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { JoinForm } from '../../components/JoinForm';
import Profile from './Profile';

const Join = (props) => {
    const [nextPage, setNextPage] = useState(true);
    const history = useHistory();

    // 로컬스토리지에 토큰이 있으면 회원가입 페이지는 메인/홈으로 스킵하는 기능
    useEffect(() => {
        if (
            window.localStorage.getItem('token') !== 'undefined' &&
            window.localStorage.getItem('token')
        ) {
            history.push('/main/home');
        }
    }, [history]);

    return (
        <>{nextPage ? <JoinForm setNextPage={setNextPage} /> : <Profile />}</>
    );
};

export default Join;
