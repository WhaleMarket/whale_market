import Navbar from "../components/main/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Chatting from "../pages/main_page/chat/Chatting";
import ChattingView from "../pages/main_page/chat/ChattingView";
import MainProfile from "../pages/main_page/mainProfile/MyProfile";
import ProductUpload from "../pages/main_page/mainProfile/ProductUpload";

import ProfileModification from "../pages/main_page/mainProfile/ProfileEdit";
import Home from "../pages/main_page/Home";
import Posting from "../pages/main_page/Posting";
import HomeSearch from "../pages/main_page/HomeSearch";
import Followers from "../pages/main_page/mainProfile/Followers";

import axios from "axios";
import { useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthProvider";
import { API_URL } from '../constants/defaultUrl';

function MainRouter() {
  const { setAuth, token, setMyImage, setMyUsername, setMyAccountname, setMyIntro, setMyFollowerCount, setMyFollowingCount } = useContext(AuthContext);
  const [tokenIsValid, setTokenIsValid] = useState();


  useEffect(() => {
    // 나의 accountname 받아오기
    async function getAccountname() {
      try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json",
            },
        };
        const response = await axios.get(
            `${API_URL}/user/myinfo`,
            config
        );
        setMyImage(response.data.user.image);
        setMyUsername(response.data.user.username);
        setMyAccountname(response.data.user.accountname);
        setMyIntro(response.data.user.intro);
        setMyFollowerCount(response.data.user.followerCount);
        setMyFollowingCount(response.data.user.followingCount);
        // TODO: 사용자가 팔로잉하는 유저의 포스트를 받아오는 기능 자리
      } catch (error) {
        console.error(error);
      }
    }
    token && getTokenIsValid();
    tokenIsValid && getAccountname();
  }, [token, setMyAccountname, setMyImage, tokenIsValid]);

  // 토큰 검증
  async function getTokenIsValid() {
      try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json",
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

  // TODO: 내가 팔로잉하는 사용자의 게시글 목록 불러오기


  return (
    <>
      <Switch>
        <Route path="/chatting/:chatId" component={ChattingView} />
        <Route path="/posting" component={Posting} />
        <Route path="/mainprofile" component={MainProfile} />
        <Route path="/profileedit" component={ProfileModification} />
        <Route path="/followers" component={Followers} />
        <Route path="/productupload" component={ProductUpload} />
        <>
          <Navbar />
          <Route path="/home" exact component={Home} />
          <Route path="/chatting" component={Chatting} />
          <Route path="/myprofile" component={MainProfile} />
          <Route path="/mainprofile" component={MainProfile} />
          <Route path="/mainprofile" component={MainProfile} />
          <Route path="/profileedit" component={ProfileModification} />
          <Route path="/search" component={HomeSearch} />
          <Route path="/home/search" component={HomeSearch}/>
          <Route path="/followers" component={Followers} />
        </>
      </Switch>
    </>
  );
}

function Main() {
  return (
    <>
      <BrowserRouter basename="/main">
        <MainRouter />
      </BrowserRouter>
    </>
  );
}

export default Main;
