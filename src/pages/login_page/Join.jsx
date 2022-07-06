import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import JoinMember from "../../components/join/joinMember/JoinMember";
import JoinProfile from "../../components/join/joinProfile/JoinProfile";
// import JoinProfile from "../components/join/JoinProfile";

function Join(props){
    // 다음 페이지로 넘어가는 여부 State 적용
    const [nextPage, setNextPage] = useState(true);

    // 유저 정보를 담기 위해 State 적용
    const [userInfo, setUserInfo] = useState({ email: "", password: "" });

    // history 객체(페이지 이동내역)를 사용하기 위해 useHistory 사용
    const history = useHistory();

    // 변수 history의 변경 여부를 감시
    useEffect(() => {
        if (window.localStorage.getItem("token")) { // 토큰의 value가 있으면
        history.push("/home");                      // home페이지 주소 push
        }
    }, [history]);

    // 다음 페이지로 넘어가면 setNextPage, setUserInfo 반환
    // 다음 페이지로 안넘어가면 userInfo 반환
    return (
        <>
            {nextPage ? (
                <JoinMember setNextPage={setNextPage} setUserInfo={setUserInfo} />
            ) : (
                // <JoinProfile userInfo={userInfo} />
                <JoinProfile/>
            )}
        </>
    );
}

export default Join;