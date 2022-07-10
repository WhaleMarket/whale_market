import Navbar from "../components/main/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Chatting from "../pages/main_page/Chatting";
import MainProfile from "../pages/main_page/mainProfile/UserProfile";
import Home from "../pages/main_page/Home";
import Posting from "../pages/main_page/Posting";
import { useLocation } from "react-router-dom";
import HomeSearch from "../pages/main_page/HomeSearch";

function Test() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/posting" && <Navbar />}
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/chatting" component={Chatting} />
        <Route path="/profile" component={MainProfile} />
        <Route path="/posting" component={Posting} />
        <Route path="/search" component={HomeSearch}/>
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
