import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { JoinForm } from '../../components/join/JoinForm';
import Profile from './Profile';

const Join = (props) => {
    const [nextPage, setNextPage] = useState(true);
    const [userInfo, setUserInfo] = useState({ email: '', password: '' });
    const history = useHistory();

    useEffect(() => {
        if (window.localStorage.getItem("token")) {
            history.push("/main/home");
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
