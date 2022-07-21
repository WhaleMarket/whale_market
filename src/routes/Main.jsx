import Navbar from "../components/main/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Chatting from "../pages/main_page/chat/Chatting";
import ChattingView from "../pages/main_page/chat/ChattingView";
import MainProfile from "../pages/main_page/mainProfile/MyProfile";
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> d0db107 (:truck: 프로필 수정 페이지 Route 추가)
=======

>>>>>>> cf03eddbc382255255bd048c984b7a71e85d8379
import ProfileModification from "../pages/main_page/mainProfile/ProfileEdit";
import Home from "../pages/main_page/Home";
import Posting from "../pages/main_page/Posting";
import { useLocation } from "react-router-dom";
import HomeSearch from "../pages/main_page/HomeSearch";
import Followers from "../pages/main_page/mainProfile/Followers";
import ProductUpload from "../pages/main_page/mainProfile/ProductUpload";

function MainRouter() {
  const location = useLocation();
  return (
    <>
      <Switch>
        <Route path="/chatting/:chatId" component={ChattingView} />
        <Route path="/posting" component={Posting} />
<<<<<<< HEAD
<<<<<<< HEAD
        <Route path="/mainprofile" component={MainProfile} />
=======
        <Route path="/myprofile" component={MainProfile} />
>>>>>>> ad5509f (:truck: myprofile 루트 추가 및 mainprofile 루트 변경)
=======
        <Route path="/mainprofile" component={MainProfile} />
>>>>>>> cf03eddbc382255255bd048c984b7a71e85d8379
        <Route path="/profileedit" component={ProfileModification} />
        <Route path="/followers" component={Followers} />
        <Route path="/productupload" component={ProductUpload} />

        <>
          <Navbar />
          <Route path="/home" exact component={Home} />
          <Route path="/chatting" component={Chatting} />
<<<<<<< HEAD
<<<<<<< HEAD
          <Route path="/myprofile" component={MainProfile} />
=======
          <Route path="/mainprofile" component={MainProfile} />
<<<<<<< HEAD
<<<<<<< HEAD
          <Route path="/profileedit" component={ProfileModification} />
>>>>>>> d0db107 (:truck: 프로필 수정 페이지 Route 추가)
=======
>>>>>>> ad5509f (:truck: myprofile 루트 추가 및 mainprofile 루트 변경)
          <Route path="/search" component={HomeSearch} />
=======
          <Route path="/home/search" component={HomeSearch}/>
          <Route path="/followers" component={Followers} />
>>>>>>> dcfb428 (:truck: HomeSearch 페이지 경로 수정)
=======
          <Route path="/myprofile" component={MainProfile} />
          <Route path="/search" component={HomeSearch} />
>>>>>>> cf03eddbc382255255bd048c984b7a71e85d8379
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
