import Navbar from "../components/main/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Chatting from "../pages/main_page/chat/Chatting";
import ChattingView from "../pages/main_page/chat/ChattingView";
import MainProfile from "../pages/main_page/mainProfile/UserProfile";
import Home from "../pages/main_page/Home";
import Posting from "../pages/main_page/Posting";
import { useLocation } from "react-router-dom";
import HomeSearch from "../pages/main_page/HomeSearch";

function Test() {
    const location = useLocation();
    return (
        <>
            <Switch>
                <Route path="/chatting/:chatId" component={ChattingView}/>
                <div>
                    {location.pathname !== "/posting" && <Navbar />}
                    <Route path="/home" exact component={Home} />
                    <Route path="/chatting" exact component={Chatting}/>
                    <Route path="/mainprofile" component={MainProfile} />
                    <Route path="/posting" component={Posting} />
                    <Route path="/search" component={HomeSearch}/>
                </div>
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
