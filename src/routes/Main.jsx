import Navbar from "../components/main/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Chatting from "../pages/main_page/chat/Chatting";
import ChattingView from "../pages/main_page/chat/ChattingView";
import MainProfile from "../pages/main_page/mainProfile/MyProfile";
<<<<<<< HEAD

=======
>>>>>>> d0db107 (:truck: 프로필 수정 페이지 Route 추가)
import ProfileModification from "../pages/main_page/mainProfile/ProfileEdit";
import Home from "../pages/main_page/Home";
import Posting from "../pages/main_page/Posting";
import { useLocation } from "react-router-dom";
import HomeSearch from "../pages/main_page/HomeSearch";
import Followers from "../pages/main_page/mainProfile/Followers";
import ProductUpload from "../pages/main_page/mainProfile/ProductUpload";

function Test() {
  const location = useLocation();
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
<<<<<<< HEAD
          <Route path="/myprofile" component={MainProfile} />
=======
          <Route path="/mainprofile" component={MainProfile} />
          <Route path="/profileedit" component={ProfileModification} />
>>>>>>> d0db107 (:truck: 프로필 수정 페이지 Route 추가)
          <Route path="/search" component={HomeSearch} />
        </>
      </Switch>
    </>
  );
}

function Main() {
  return (
    <>
      <BrowserRouter basename="/main">
        <Test />
      </BrowserRouter>
    </>
  );
}

export default Main;
