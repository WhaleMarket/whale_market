import Navbar from "../components/main/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Chatting from "../pages/main_page/Chatting";
import MainProfile from "../pages/main_page/mainProfile/MyProfile";
import ProductUpload from "../pages/main_page/mainProfile/ProductUpload";
import ProfileModification from "../pages/main_page/mainProfile/ProfileEdit";
import Home from "../pages/main_page/Home";
import Posting from "../pages/main_page/Posting";
import HomeSearch from "../pages/main_page/HomeSearch";
import Followers from "../pages/main_page/mainProfile/Followers";
import useAccountInfo from "../hook/useAccountInfo";
import Followings from "../pages/main_page/mainProfile/Following";
import UserProfile from "../pages/main_page/mainProfile/UserProfile";
import PostingEdit from "../pages/main_page/mainProfile/PostingEdit";

function MainRouter() {
  useAccountInfo();
  return (
    <>
      <Switch>
        <Route path="/posting" component={Posting} />
        <Route path="/profileedit" component={ProfileModification} />
        <Route path="/followers/:accountname" component={Followers} />
        <Route path="/followings/:accountname" component={Followings} />
        <Route path="/productupload" component={ProductUpload} />
        <Route path="/userprofile" component={UserProfile} />
        <Route path="/postingedit/:postId" component={PostingEdit} />
        <>
          <Navbar />
          <Route path="/home" exact component={Home} />
          <Route path="/chatting" component={Chatting} />
          <Route path="/profile/:accountname" component={MainProfile} />
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
        <MainRouter />
      </BrowserRouter>
    </>
  );
}

export default Main;
