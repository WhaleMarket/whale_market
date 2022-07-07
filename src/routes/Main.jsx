import Navbar from "../components/main/Navbar";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Chatting from "../pages/main_page/chat/Chatting";
import ChattingView from "../pages/main_page/chat/ChattingView";
import MainProfile from "../pages/main_page/MainProfile";
import Home from "../pages/main_page/Home";
import Posting from "../pages/main_page/Posting";

function Main(){
    return(
        <>
            <BrowserRouter basename="/main">
                <Navbar />
                <Switch>
                    <Route path="/home" exact component={Home}/>
                    <Route path="/chatting" exact component={Chatting}/>
                    <Route path="/chatting/:chatId" component={ChattingView}/>
                    <Route path="/profile" component={MainProfile}/>
                    <Route path="/posting" component={Posting}/>
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default Main;